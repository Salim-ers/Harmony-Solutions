import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/data/company";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${company.name} : ${company.headline}`;

/** Image de partage : logo, accroche en serif et fragment de schéma. */
export async function renderOgImage() {
  const [serif, logo] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/og/instrument-serif-latin-400-normal.woff")),
    readFile(join(process.cwd(), "lib/og-logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const nodes = [
    { x: 940, y: 150, label: "Vos clients" },
    { x: 940, y: 280, label: "Votre site", gold: true },
    { x: 860, y: 410, label: "Gestion" },
    { x: 1020, y: 410, label: "Paiement" },
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#071426", color: "#F6F5F1", position: "relative" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <path d="M940 162 V268 M940 292 V340 H860 V398 M940 340 H1020 V398" stroke="rgba(246,245,241,0.35)" strokeWidth="1.5" fill="none" />
          <path d="M940 162 V268" stroke="#C9A35D" strokeWidth="1.5" fill="none" />
          {nodes.map((n) => (
            <rect key={n.label} x={n.x - 9} y={n.y - 9} width="18" height="18" fill="#071426" stroke={n.gold ? "#C9A35D" : "rgba(246,245,241,0.8)"} strokeWidth="1.5" />
          ))}
        </svg>
        {nodes.map((n) => (
          <div key={n.label} style={{ position: "absolute", left: n.x + 22, top: n.y - 12, fontSize: 20, color: "#A3AEBF", display: "flex" }}>
            {n.label}
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px", width: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={64} height={64} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "Instrument Serif", fontSize: 34, letterSpacing: 1 }}>Harmony</div>
              <div style={{ fontSize: 14, letterSpacing: 6, color: "rgba(246,245,241,0.7)" }}>SOLUTIONS</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Instrument Serif", fontSize: 76, lineHeight: 1, letterSpacing: -1.5, display: "flex", flexWrap: "wrap" }}>
              Des solutions digitales pour développer&nbsp;<span style={{ color: "#C9A35D" }}>votre activité.</span>
            </div>
            <div style={{ marginTop: 30, fontSize: 24, color: "rgba(246,245,241,0.8)" }}>Sites internet, applications et outils sur mesure</div>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#A3AEBF" }}>
            {company.address.city}, {company.address.region}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Instrument Serif", data: serif, weight: 400, style: "normal" }] },
  );
}
