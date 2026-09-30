import { maintenancePlans } from "@/data/offers";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactLink } from "@/components/ui/ContactLink";
import { cn } from "@/lib/utils";

export function Maintenance() {
  return (
    <section id="maintenance" aria-labelledby="maintenance-title" className="tone-dark-2 py-24 lg:py-36">
      <div className="container-x">
        <SectionHeader
          label="Formules de maintenance"
          titleId="maintenance-title"
          tone="dark"
          title="Un site toujours à jour, sécurisé et performant."
          intro="Un site se met à jour, se sauvegarde et se surveille. Choisissez le niveau de suivi qui vous convient, sans vous en occuper vous-même."
        />

        <ul className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-3">
          {maintenancePlans.map((plan) => (
            <li
              key={plan.id}
              className={cn("frame-ticks flex flex-col border p-7 sm:p-9", plan.highlighted ? "border-gold/70 bg-night" : "border-paper/15")}
            >
              <h3 className="font-serif text-[2rem] leading-none">{plan.name}</h3>
              <p className="mt-5">
                <span className="sr-only">Tarif : </span>
                <span className="font-serif text-[2.6rem] leading-none text-gold">{plan.price}</span>
                <span className="t-small ml-2 font-semibold text-paper/75">TTC par mois</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-paper/15 pt-6">
                {plan.features.map((feature, i) => (
                  <li key={feature} className={cn("flex gap-3 text-paper/85", i === 0 && feature.startsWith("Tout le pack") && "font-semibold text-paper")}>
                    <span aria-hidden="true" className="mt-[0.7em] block h-px w-3 shrink-0 bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <ContactLink type="Maintenance" tone="dark">
                  Choisir {plan.name}
                </ContactLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
