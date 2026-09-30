import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Destination réseau inaccessible",
  robots: { index: false, follow: true },
};

/** Clin d’œil réseau : une route qui s’interrompt avant sa destination. */
function BrokenRoute() {
  return (
    <svg viewBox="0 0 420 120" role="img" aria-labelledby="broken-route-title" className="h-auto w-full max-w-[30rem]">
      <title id="broken-route-title">Une route réseau qui part de votre poste et s’interrompt avant la ressource demandée.</title>
      <g fill="none" strokeWidth="1">
        <path d="M30 60 H190" stroke="rgb(246 245 241 / 0.55)" />
        <path d="M232 60 H390" stroke="rgb(246 245 241 / 0.22)" strokeDasharray="3 6" />
        <path d="M200 50 L220 70 M220 50 L200 70" stroke="#C9A35D" />
      </g>
      <rect x="22" y="52" width="16" height="16" fill="#071426" stroke="rgb(246 245 241 / 0.8)" />
      <rect x="104" y="54" width="12" height="12" fill="#071426" stroke="rgb(246 245 241 / 0.6)" />
      <rect x="382" y="52" width="16" height="16" fill="#071426" stroke="rgb(246 245 241 / 0.25)" strokeDasharray="2 3" />
      <g fontSize="11" fill="rgb(163 174 191)" style={{ fontFamily: "var(--font-sans)" }}>
        <text x="30" y="96" textAnchor="middle">Vous</text>
        <text x="110" y="96" textAnchor="middle">Passerelle</text>
        <text x="210" y="96" textAnchor="middle" fill="#C9A35D">
          Aucune route
        </text>
        <text x="390" y="96" textAnchor="middle">Ressource</text>
      </g>
    </svg>
  );
}

export default function NotFound() {
  return (
    <section aria-labelledby="notfound-title" className="tone-dark relative flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div className="container-x relative pb-20 pt-36">
        <p className="t-label flex items-center gap-3 text-fog">
          <span aria-hidden="true" className="inline-block size-[7px] bg-gold" />
          Erreur 404
        </p>
        <h1 id="notfound-title" className="t-h1 mt-6 max-w-[14ch]">
          Destination réseau inaccessible.
        </h1>
        <p className="t-lead mt-7 max-w-[46ch] text-paper/75">Cette ressource n’est plus disponible ou n’a jamais été routée.</p>
        <div className="mt-14">
          <BrokenRoute />
        </div>
        <div className="mt-14 flex flex-wrap gap-3">
          <ButtonLink href="/" tone="dark">
            Retour à l’accueil
          </ButtonLink>
          <ButtonLink href="/#offres" tone="dark" variant="secondary">
            Voir nos offres
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
