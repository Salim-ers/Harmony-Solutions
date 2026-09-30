import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SolutionMap } from "@/components/diagrams/SolutionMap";

export function Hero() {
  return (
    <section id="accueil" aria-labelledby="hero-title" className="tone-dark relative overflow-hidden">
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div className="container-x relative grid gap-16 pb-16 pt-32 sm:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-44">
        <div className="lg:col-span-7">
          <p className="t-label flex items-center gap-3 text-fog">
            <span aria-hidden="true" className="inline-block size-[7px] bg-gold" />
            {company.baseline}
          </p>
          <h1 id="hero-title" className="mt-8 max-w-[13ch] font-serif text-[clamp(2.9rem,6.6vw,5.9rem)] leading-[0.95] tracking-[-0.02em]">
            Des solutions digitales pour développer <span className="text-gold">votre activité.</span>
          </h1>

          <p className="t-lead mt-9 max-w-[46ch] text-paper/80">{company.lead}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="#contact" tone="dark">
              Parler de votre projet
            </ButtonLink>
            <ButtonLink href="#offres" tone="dark" variant="secondary">
              Voir les offres
            </ButtonLink>
          </div>
          <a href={`tel:${company.phoneHref}`} className="link-u mt-6 inline-block text-[0.95rem] font-semibold text-paper/85 hover:text-paper">
            Ou appelez le {company.phone}
          </a>
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <div className="mx-auto max-w-[27rem] lg:ml-auto lg:mr-0">
            <SolutionMap />
          </div>
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-px bg-paper/10 lg:grid-cols-4">
            {company.domains.map((domain) => (
              <li
                key={domain.title}
                className="bg-night py-7 pl-5 pr-4 [&:nth-child(odd)]:pl-0 lg:[&:nth-child(odd)]:pl-6 lg:first:!pl-0 lg:pl-6"
              >
                <p className="font-serif text-[1.45rem] leading-tight">{domain.title}</p>
                <p className="t-small mt-1 text-fog">{domain.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
