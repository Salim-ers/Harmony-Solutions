"use client";

import { useState } from "react";
import { Diagram, Marker, Trace, Wire, Zone } from "./kit";
import { offers } from "@/data/offers";
import { cn } from "@/lib/utils";

type Focus = "vitrine" | "seo" | "crm" | "complet" | "maintenance" | null;

const offerPrice = Object.fromEntries(offers.map((o) => [o.id, `${o.name}, ${o.price} TTC`]));

const choices: { id: Exclude<Focus, null>; label: string; hint: string }[] = [
  { id: "vitrine", label: "Vitrine", hint: offerPrice.vitrine },
  { id: "seo", label: "+ SEO", hint: offerPrice.seo },
  { id: "crm", label: "+ Dashboard", hint: offerPrice.crm },
  { id: "complet", label: "Complet", hint: `${offerPrice.complet} (selon les besoins)` },
  { id: "maintenance", label: "Maintenance", hint: "Formules de 25 € à 79 € TTC par mois" },
];

/**
 * Schéma d’accueil : l’anatomie d’un projet client.
 * Chaque formule éclaire les briques qu’elle comprend.
 */
export function SolutionMap() {
  const [focus, setFocus] = useState<Focus>(null);
  const site = focus !== null;
  const seo = focus === "seo";
  const admin = focus === "crm" || focus === "complet";
  const board = focus === "crm";
  const shop = focus === "complet";
  const care = focus === "maintenance";
  const owned = focus !== null && focus !== "maintenance";

  return (
    <figure className="relative">
      <Diagram
        viewBox="0 0 440 500"
        tone="dark"
        title="Anatomie d’un projet Harmony Solutions"
        description="Vos clients et la recherche Google mènent à votre site. Le site s’appuie sur un espace d’administration et un tableau de bord d’un côté, sur la vente en ligne et le paiement sécurisé de l’autre. En dessous, le nom de domaine et l’hébergement sont à votre nom, et la maintenance assure sauvegardes et mises à jour."
      >
        <Zone x={34} y={368} w={188} h={112} label="À votre nom" active={owned} delay={1.0} />
        <Zone x={244} y={368} w={188} h={112} label="Maintenance" active={care} delay={1.05} />

        <Wire d="M110 44 V80 H220 V108" delay={0.15} active={seo} />
        <Wire d="M290 44 V80 H220" delay={0.15} active={site} strong />
        <Wire d="M220 124 V164 H110 V204" delay={0.35} active={admin} />
        <Wire d="M220 164 H290 V204" delay={0.35} active={shop} />
        <Wire d="M110 220 V292" delay={0.6} active={board || shop} />
        <Wire d="M290 220 V292" delay={0.6} active={shop} />
        <Wire d="M220 164 V340 H128 V368" delay={0.85} active={owned} dashed />
        <Wire d="M220 340 H338 V368" delay={0.85} active={care} dashed />

        <Marker x={110} y={36} label="Google" sub="Recherche locale" kind="endpoint" delay={0} active={seo} />
        <Marker x={290} y={36} label="Vos clients" kind="endpoint" delay={0} active={site} />
        <Marker x={220} y={116} label="Votre site" sub="Sur mesure, responsive" kind="major" delay={0.25} active={site} />
        <Marker x={110} y={212} label="Administration" sub="Clients, devis" kind="major" delay={0.5} active={admin} />
        <Marker x={290} y={212} label="Vente en ligne" sub="Boutique, réservation" kind="major" delay={0.5} active={shop} />
        <Marker x={110} y={300} label={shop ? "Commandes" : "Tableau de bord"} sub={shop ? "Espace client" : "Suivi, notifications"} kind="major" delay={0.75} active={board || shop} />
        <Marker x={290} y={300} label="Paiement" sub="Sécurisé (Stripe)" kind="major" delay={0.75} active={shop} />
        <Marker x={56} y={420} label="Nom de domaine" delay={1.1} active={owned} />
        <Marker x={56} y={456} label="Hébergement" delay={1.15} active={owned} />
        <Marker x={266} y={420} label="Sauvegardes" delay={1.1} active={care} />
        <Marker x={266} y={456} label="Mises à jour" delay={1.15} active={care} />

        {care ? <Trace d="M266 456 V420 M220 340 V164 V124" duration={0.9} /> : null}
      </Diagram>

      <figcaption className="mt-8">
        <p className="t-small text-fog" id="hero-explore">
          Ce que comprend chaque formule
        </p>
        <div role="group" aria-labelledby="hero-explore" className="mt-3 flex flex-wrap gap-2">
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              aria-pressed={focus === choice.id}
              onMouseEnter={() => setFocus(choice.id)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(choice.id)}
              onBlur={() => setFocus(null)}
              onClick={() => setFocus(choice.id)}
              className={cn(
                "flex min-h-10 items-center gap-2 border px-3.5 text-[0.875rem] font-semibold transition-colors duration-200",
                focus === choice.id ? "border-gold text-paper" : "border-paper/20 text-paper/75 hover:text-paper",
              )}
            >
              <span aria-hidden="true" className={cn("size-1.5", focus === choice.id ? "bg-gold" : "bg-paper/40")} />
              {choice.label}
            </button>
          ))}
        </div>
        <p className="t-small mt-3 min-h-[1.5em] text-fog" aria-live="polite">
          {focus ? choices.find((c) => c.id === focus)?.hint : "\u00a0"}
        </p>
      </figcaption>
    </figure>
  );
}
