import { tools } from "@/data/offers";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { ContactLink } from "@/components/ui/ContactLink";

export function Tools() {
  return (
    <section id="outils" aria-labelledby="outils-title" className="bg-mist py-24 lg:py-36">
      <div className="container-x">
        <SectionHeader
          label="Autres solutions"
          titleId="outils-title"
          title="Des outils simples pour booster votre activité."
          intro="Pas besoin d’un site complet pour être plus visible : ces deux outils se consultent directement sur le téléphone de vos clients."
        />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-2 lg:gap-10">
          {tools.map((tool) => (
            <article key={tool.id} aria-labelledby={`${tool.id}-title`} className="grid gap-10 border-t border-night/80 pt-10 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <h3 id={`${tool.id}-title`} className="font-serif text-[clamp(1.7rem,2.6vw,2.1rem)] leading-[1.05]">
                  {tool.name}
                </h3>
                <p className="mt-4">
                  <span className="sr-only">Tarif : </span>
                  <span className="font-serif text-[2.2rem] leading-none">{tool.price}</span>
                  <span className="t-small ml-2 font-semibold text-ink-soft">TTC</span>
                </p>
                <p className="t-body mt-5 max-w-[34ch] text-ink-soft">{tool.pitch}</p>
                <ul className="mt-6 space-y-2.5">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] block h-px w-3 shrink-0 bg-gold-deep" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ContactLink type="Carte de visite ou fidélité">Commander</ContactLink>
                </div>
              </div>
              <figure>
                <PhoneMockup variant={tool.mockup} />
                <figcaption className="t-small mt-3 text-center text-ink-soft">Maquette de principe</figcaption>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
