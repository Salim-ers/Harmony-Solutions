"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { company, contactTypes, type ContactType } from "@/data/company";
import { CONTACT_TYPE_EVENT } from "@/components/ui/ContactLink";
import {
  contactLimits,
  normalizePayload,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-validation";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const fields: { name: Exclude<ContactField, "type" | "message">; label: string; type: string; autoComplete: string; required: boolean; max: number }[] = [
  { name: "name", label: "Nom", type: "text", autoComplete: "name", required: true, max: contactLimits.name.max },
  { name: "company", label: "Entreprise", type: "text", autoComplete: "organization", required: false, max: contactLimits.company.max },
  { name: "phone", label: "Téléphone", type: "tel", autoComplete: "tel", required: false, max: contactLimits.phone.max },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true, max: contactLimits.email.max },
  { name: "subject", label: "Sujet", type: "text", autoComplete: "off", required: true, max: contactLimits.subject.max },
];

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [type, setType] = useState<ContactType>(contactTypes[0]);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    startedAt.current = Date.now();
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<ContactType>).detail;
      if (contactTypes.includes(detail)) setType(detail);
    };
    window.addEventListener(CONTACT_TYPE_EVENT, onSelect);
    return () => window.removeEventListener(CONTACT_TYPE_EVENT, onSelect);
  }, []);

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, unknown>;
    const data = normalizePayload({ ...raw, type });
    const found = validateContact(data);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as ContactField[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setStatus({ kind: "error", message: "Certains champs sont à corriger." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: raw.website ?? "", startedAt: startedAt.current }),
      });
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (res.ok && result.ok) {
        form.reset();
        setType(contactTypes[0]);
        setErrors({});
        setStatus({ kind: "success" });
        startedAt.current = Date.now();
        return;
      }
      if (result.errors) setErrors(result.errors);
      setStatus({ kind: "error", message: result.error ?? "L’envoi a échoué. Réessayez dans un instant." });
    } catch {
      setStatus({ kind: "error", message: `Connexion impossible. Vous pouvez nous écrire à ${company.email}.` });
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-status`} className="space-y-9">
      <fieldset>
        <legend className="t-label text-fog">Type de demande</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {contactTypes.map((option) => (
            <label
              key={option}
              className={cn(
                "t-small cursor-pointer border px-3.5 py-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                type === option ? "border-gold bg-gold text-night" : "border-paper/25 text-paper/85 hover:border-paper/60",
              )}
            >
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.name === "subject" ? "sm:col-span-2" : undefined}>
            <label htmlFor={fieldId(field.name)} className="t-label text-fog">
              {field.label}
              {field.required ? (
                <span aria-hidden="true" className="text-gold">
                  {" "}
                  *
                </span>
              ) : (
                <span className="font-normal text-fog/80"> (facultatif)</span>
              )}
            </label>
            <input
              id={fieldId(field.name)}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              maxLength={field.max}
              inputMode={field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined}
              aria-invalid={errors[field.name] ? true : undefined}
              aria-describedby={errors[field.name] ? errorId(field.name) : undefined}
              className="field-input mt-1"
            />
            {errors[field.name] ? (
              <p id={errorId(field.name)} className="t-small mt-2 text-[#f0b4a6]">
                {errors[field.name]}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor={fieldId("message")} className="t-label text-fog">
          Message
          <span aria-hidden="true" className="text-gold">
            {" "}
            *
          </span>
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          maxLength={contactLimits.message.max}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className="field-input mt-1 resize-y"
        />
        {errors.message ? (
          <p id={errorId("message")} className="t-small mt-2 text-[#f0b4a6]">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Pot de miel : invisible et ignoré par les humains et les lecteurs d’écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Ne pas remplir ce champ</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-primary btn-on-dark disabled:cursor-wait disabled:opacity-70">
          <span>{status.kind === "sending" ? "Envoi en cours…" : "Envoyer le message"}</span>
          <span aria-hidden="true" className="btn-wire">
            <span />
          </span>
        </button>
        <p className="t-small text-fog">
          <span aria-hidden="true">* </span>Champs obligatoires
        </p>
      </div>

      <p className="t-small max-w-[60ch] text-fog">
        Vos informations servent uniquement à répondre à votre demande.{" "}
        <Link href="/mentions-legales#donnees" className="link-u text-paper/85">
          En savoir plus sur vos données
        </Link>
        .
      </p>

      <p
        id={`${uid}-status`}
        role={status.kind === "error" ? "alert" : "status"}
        aria-live="polite"
        className={cn(
          "t-small min-h-[1.5em]",
          status.kind === "success" && "text-gold",
          status.kind === "error" && "text-[#f0b4a6]",
        )}
      >
        {status.kind === "success" ? "Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement." : null}
        {status.kind === "error" ? status.message : null}
      </p>
    </form>
  );
}
