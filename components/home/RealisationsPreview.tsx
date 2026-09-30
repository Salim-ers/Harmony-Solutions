import { realisations } from "@/data/realisations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Txt } from "@/components/ui/Txt";

export function RealisationsPreview() {
  return (
    <section id="realisations" aria-labelledby="realisations-title" className="bg-paper py-24 lg:py-36">
      <div className="container-x">
        <SectionHeader
          label="Réalisations"
          titleId="realisations-title"
          title="Des sites pensés pour chaque métier."
          intro="Commerces de proximité, restaurants, services, professionnels : chaque projet part d’une situation concrète et d’un problème précis à résoudre."
        />

        <ul className="mt-16 grid gap-px border border-night/15 bg-night/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {realisations.map((item, i) => (
            <li key={item.slug} className="flex flex-col bg-paper p-7 sm:p-8">
              <span aria-hidden="true" className="font-serif text-[1.6rem] leading-none text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="t-label mt-5 text-ink-soft">{item.sector}</p>
              <h3 className="t-h3 mt-2">
                <Txt>{item.client}</Txt>
              </h3>
              <p className="t-small mt-4 text-ink-soft">
                <Txt>{item.solution}</Txt>
              </p>
            </li>
          ))}
          <li className="flex flex-col justify-end bg-night p-7 text-paper sm:p-8">
            <p className="font-serif text-[1.6rem] leading-tight">Avant, problème, solution, résultat : chaque projet en détail.</p>
            <div className="mt-8">
              <ButtonLink href="/realisations" tone="dark" variant="secondary">
                Voir les réalisations
              </ButtonLink>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
