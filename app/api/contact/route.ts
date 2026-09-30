import { NextResponse, type NextRequest } from "next/server";
import { contactLimits, normalizePayload, validateContact, type ContactPayload } from "@/lib/contact-validation";
import { rateLimit } from "@/lib/rate-limit";
import { company } from "@/data/company";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;

function json(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "inconnu";
}

/** Refuse les requêtes provenant d’une autre origine que le site lui-même. */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

async function sendWithResend(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || company.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Site Harmony Solutions <onboarding@resend.dev>";

  const lines = [
    `Type : ${data.type}`,
    `Nom : ${data.name}`,
    `Entreprise : ${data.company || "-"}`,
    `Téléphone : ${data.phone || "-"}`,
    `Email : ${data.email}`,
    `Sujet : ${data.subject}`,
    "",
    data.message,
  ];

  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#071426">
<p><strong>Type :</strong> ${escapeHtml(data.type)}<br><strong>Nom :</strong> ${escapeHtml(data.name)}<br><strong>Entreprise :</strong> ${escapeHtml(data.company || "-")}<br><strong>Téléphone :</strong> ${escapeHtml(data.phone || "-")}<br><strong>Email :</strong> ${escapeHtml(data.email)}<br><strong>Sujet :</strong> ${escapeHtml(data.subject)}</p>
<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p></div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[Site] ${data.type} : ${data.subject}`.slice(0, 200),
      text: lines.join("\n"),
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json({ ok: false, error: "Requête refusée." }, 403);

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return json({ ok: false, error: "Format non pris en charge." }, 415);

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "Message trop volumineux." }, 413);

  const limit = rateLimit(`contact:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return json(
      { ok: false, error: "Trop d’envois rapprochés. Réessayez dans quelques minutes." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "Message trop volumineux." }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Requête invalide." }, 400);
  }

  // Pot de miel : un champ invisible pour les humains. Réponse neutre pour ne pas renseigner les robots.
  if (typeof body.website === "string" && body.website.trim() !== "") return json({ ok: true });

  // Formulaire envoyé trop vite après son affichage.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < contactLimits.minFillMs) {
    return json({ ok: false, error: "Envoi trop rapide. Relisez votre message puis réessayez." }, 400);
  }

  const data = normalizePayload(body);
  const errors = validateContact(data);
  if (Object.keys(errors).length) return json({ ok: false, error: "Certains champs sont à corriger.", errors }, 422);

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY absente : message non envoyé (mode développement).", { ...data, message: `${data.message.slice(0, 80)}…` });
      return json({ ok: true, dev: true });
    }
    return json({ ok: false, error: `Le formulaire est momentanément indisponible. Écrivez-nous directement à ${company.email}.` }, 503);
  }

  try {
    const sent = await sendWithResend(data);
    if (!sent) throw new Error("Resend a refusé l’envoi");
    return json({ ok: true });
  } catch (error) {
    console.error("[contact] Échec de l’envoi", error instanceof Error ? error.message : error);
    return json({ ok: false, error: `L’envoi a échoué. Vous pouvez nous écrire directement à ${company.email}.` }, 502);
  }
}

export function GET() {
  return json({ ok: false, error: "Méthode non autorisée." }, 405, { Allow: "POST" });
}
