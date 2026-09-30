import { offers } from "@/data/offers";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactLink } from "@/components/ui/ContactLink";

function Check() {
  return <span aria-hidden="true" className="mt-[0.7em] block h-px w-3 shrink-0 bg-gold-deep" />;
}

export function Offers() {
  return (
    <section id="offres" aria-labelledby="offres-title" className="bg-paper py-24 lg:py-36">
      <div className="container-x">
        <SectionHeader
          label="Nos offres"
          titleId="offres-title"
          title="Quatre formules, du site vitrine à la vente en ligne."
          intro="Des solutions adaptées à vos besoins, avec un design moderne et des technologies fiables. Chaque formule reprend la précédente et y ajoute ce dont votre activité a besoin."
        />

        <ol className="mt-16 border-b border-night/15 lg:mt-24">
          {offers.map((offer) => (
            <li key={offer.id} className="group relative">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-night/80" />
              <article aria-labelledby={`offre-${offer.id}`} className="grid gap-x-10 gap-y-8 py-12 lg:grid-cols-12 lg:py-14">
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-5">
                    <span aria-hidden="true" className="font-serif text-[2.4rem] leading-none tabular-nums text-gold-deep">
                      {offer.number}
                    </span>
                    <h3 id={`offre-${offer.id}`} className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.05]">
                      {offer.name}
                    </h3>
                  </div>
                  <p className="t-body mt-5 max-w-[40ch] text-ink-soft sm:pl-[3.6rem]">{offer.pitch}</p>
                  <p className="mt-7 sm:pl-[3.6rem]">
                    <span className="sr-only">Tarif : </span>
                    {offer.priceNote ? <span className="t-small mr-2 text-ink-soft">À partir de</span> : null}
                    <span className="font-serif text-[2.5rem] leading-none">{offer.price}</span>
                    <span className="t-small ml-2 font-semibold text-ink-soft">TTC</span>
                  </p>
                  {offer.priceNote ? <p className="t-small mt-2 text-ink-soft sm:pl-[3.6rem]">{offer.priceNote}</p> : null}
                </div>

                <div className="flex flex-col gap-8 lg:col-span-7">
                  <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {offer.includesBase ? (
                      <li className="flex gap-3 font-semibold sm:col-span-2">
                        <Check />
                        Tout le pack vitrine inclus
                      </li>
                    ) : null}
                    {offer.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <ContactLink type={offer.contactType}>Demander cette formule</ContactLink>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-10">
          <p className="t-small text-ink-soft lg:col-span-9 lg:col-start-4">
            Tarifs TTC. Les frais d’hébergement et de nom de domaine sont à la charge du client. Un besoin qui sort de ces formules, comme une application ou un logiciel métier ? Parlons-en : nous
            travaillons aussi sur mesure.
          </p>
        </div>
      </div>
    </section>
  );
}
