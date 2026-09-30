import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LocalTime } from "@/components/ui/LocalTime";

/** Accueil volontairement court : une phrase, puis les réalisations juste en dessous. */
export function Hero() {
  return (
    <section id="accueil" aria-labelledby="hero-title" className="tone-dark relative overflow-hidden">
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div className="container-x relative pb-12 pt-32 sm:pt-36 lg:pb-14 lg:pt-40">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="t-label flex items-center gap-3 text-fog">
            <span aria-hidden="true" className="inline-block size-[7px] bg-gold" />
            {company.baseline}
          </p>
          <p className="t-label text-fog">
            {company.address.city}, {company.address.region} · <LocalTime />
          </p>
        </div>

        <h1 id="hero-title" className="mt-8 max-w-[19ch] font-serif text-[clamp(3rem,6.4vw,6.2rem)] leading-[0.93] tracking-[-0.022em]">
          Des solutions digitales pour développer <span className="text-gold">votre activité.</span>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-paper/15 pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="t-lead max-w-[46ch] text-paper/80">{company.lead}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 t-small text-fog">
              {company.domains.map((domain) => (
                <li key={domain.title}>{domain.title}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-6 lg:items-end">
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="#realisations" tone="dark">
                Voir les réalisations
              </ButtonLink>
              <ButtonLink href="#contact" tone="dark" variant="secondary">
                Parler de votre projet
              </ButtonLink>
            </div>
            <a href={`tel:${company.phoneHref}`} className="link-u inline-block text-[0.95rem] font-semibold text-paper/85 hover:text-paper">
              Ou appelez le {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
