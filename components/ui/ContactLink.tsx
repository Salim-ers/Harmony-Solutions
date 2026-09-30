"use client";

import type { ReactNode } from "react";
import type { ContactType } from "@/data/company";
import { cn } from "@/lib/utils";

export const CONTACT_TYPE_EVENT = "harmony:contact-type";

/**
 * Lien vers le formulaire qui présélectionne le type de demande.
 * Sans JavaScript, c’est une simple ancre vers #contact (à utiliser sur la page d’accueil).
 */
export function ContactLink({
  type,
  children,
  className,
  tone = "light",
}: {
  type: ContactType;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <a
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent<ContactType>(CONTACT_TYPE_EVENT, { detail: type }))}
      className={cn("btn btn-secondary", tone === "dark" ? "btn-on-dark" : "btn-on-light", className)}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="btn-wire">
        <span />
      </span>
    </a>
  );
}
