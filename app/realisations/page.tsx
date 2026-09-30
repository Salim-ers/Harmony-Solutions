import type { Metadata } from "next";
import { realisations } from "@/data/realisations";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Sites internet et outils réalisés par Harmony Solutions : station de lavage, boulangerie, auto-école, coffee shop, carte de visite digitale.",
  alternates: { canonical: "/realisations" },
  openGraph: { url: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        label="Réalisations"
        title="Des sites pensés pour chaque métier."
        intro="Commerces de proximité, restaurants, services, professionnels : chaque site part de l’activité du client et de ce que ses clients viennent y chercher."
      />

      <section aria-label="Liste des réalisations" className="bg-paper py-20 lg:py-28">
        <div className="container-x">
          <ul className="grid gap-x-8 gap-y-20 lg:grid-cols-2 lg:gap-y-24">
            {realisations.map((project, i) => {
              const details = [
                { label: "Avant", value: project.before },
                { label: "Problématique", value: project.problem },
                { label: "Résultat", value: project.result },
              ].filter((row): row is { label: string; value: string } => Boolean(row.value));
              return (
                <li key={project.slug} id={project.slug} className={i === 0 ? "lg:col-span-2" : undefined}>
                  <ProjectCard project={project} index={i} featured={i === 0} priority={i === 0} headingLevel="h2">
                    <p className="t-body mt-5 max-w-[60ch] text-ink-soft">{project.solution}</p>
                    {details.length ? (
                      <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                        {details.map((row) => (
                          <div key={row.label} className="border-t border-night/15 pt-3">
                            <dt className="t-label text-ink-soft">{row.label}</dt>
                            <dd className="t-small mt-1.5">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </ProjectCard>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="realisations-cta" className="bg-mist py-20">
        <div className="container-x flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="realisations-cta" className="t-h2 max-w-[18ch]">
            Un projet de site ou d’outil ?
          </h2>
          <ButtonLink href="/#contact">Parler de votre projet</ButtonLink>
        </div>
      </section>
    </>
  );
}
