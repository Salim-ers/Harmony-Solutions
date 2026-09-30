import { contactTypes, type ContactType } from "@/data/company";

/** Validation partagée client / serveur. Le serveur reste la seule autorité. */

export const contactLimits = {
  name: { min: 2, max: 80 },
  company: { max: 120 },
  phone: { max: 25 },
  email: { max: 160 },
  subject: { min: 3, max: 140 },
  message: { min: 20, max: 4000 },
  maxLinks: 3,
  /** Délai minimum entre l’affichage du formulaire et l’envoi (anti-robot). */
  minFillMs: 3000,
};

export interface ContactPayload {
  name: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  type: ContactType;
}

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<ContactField, string>>;

const allowedTypes: readonly string[] = contactTypes;
const PHONE_RE = /^\+?[\d\s.()-]{8,25}$/;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const LINK_RE = /(https?:\/\/|www\.)/gi;

/** Supprime les caractères de contrôle (hors retours à la ligne et tabulations) et normalise les espaces. */
export function sanitizeText(value: unknown, multiline = false) {
  if (typeof value !== "string") return "";
  const cleaned = value.normalize("NFC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E]/g, "");
  return multiline ? cleaned.replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim() : cleaned.replace(/\s+/g, " ").trim();
}

export function normalizePayload(input: Record<string, unknown>): ContactPayload {
  return {
    name: sanitizeText(input.name),
    company: sanitizeText(input.company),
    phone: sanitizeText(input.phone),
    email: sanitizeText(input.email).toLowerCase(),
    subject: sanitizeText(input.subject),
    message: sanitizeText(input.message, true),
    type: (allowedTypes.includes(String(input.type)) ? input.type : "Autre") as ContactType,
  };
}

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  const { name, company, phone, email, subject, message } = contactLimits;

  if (data.name.length < name.min) errors.name = "Indiquez votre nom.";
  else if (data.name.length > name.max) errors.name = `${name.max} caractères maximum.`;

  if (data.company.length > company.max) errors.company = `${company.max} caractères maximum.`;

  if (data.phone && (data.phone.length > phone.max || !PHONE_RE.test(data.phone))) errors.phone = "Ce numéro de téléphone ne semble pas valide.";

  if (!data.email) errors.email = "Indiquez votre adresse email.";
  else if (data.email.length > email.max || !EMAIL_RE.test(data.email)) errors.email = "Cette adresse email ne semble pas valide.";

  if (data.subject.length < subject.min) errors.subject = "Précisez le sujet de votre message.";
  else if (data.subject.length > subject.max) errors.subject = `${subject.max} caractères maximum.`;

  if (data.message.length < message.min) errors.message = `Votre message doit contenir au moins ${message.min} caractères.`;
  else if (data.message.length > message.max) errors.message = `${message.max} caractères maximum.`;
  else if ((data.message.match(LINK_RE)?.length ?? 0) > contactLimits.maxLinks)
    errors.message = `Merci de limiter votre message à ${contactLimits.maxLinks} liens.`;

  return errors;
}
