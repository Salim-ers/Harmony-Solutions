import type { Metadata } from "next";
import Image from "next/image";
import { realisations } from "@/data/realisations";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Txt } from "@/components/ui/Txt";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Sites internet et outils réalisés par Harmony Solutions pour des commerçants, restaurants, artisans et professionnels : situation de départ, problématique, solution et résultat.",
  alternates: { canonical: "/realisations" },
  openGraph: { url: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        label="Réalisations"
        title="Des sites pensés pour des commerces et des professionnels."
        intro="Chaque fiche suit la même lecture : la situation de départ, le problème à résoudre, la solution livrée et le résultat."
      />

      <section aria-label="Liste des réalisations" className="bg-paper py-20 lg:py-28">
        <div className="container-x">
          <ol className="space-y-20 lg:space-y-28">
            {realisations.map((item, index) => (
              <li key={item.slug}>
                <article aria-labelledby={`${item.slug}-title`} className="grid gap-10 border-t border-night/80 pt-10 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <span aria-hidden="true" className="font-serif text-[2rem] leading-none text-gold-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="t-label mt-5 text-ink-soft">{item.sector}</p>
                    <h2 id={`${item.slug}-title`} className="t-h3 mt-2">
                      <Txt>{item.client}</Txt>
                    </h2>
                    {item.url ? (
                      <div className="mt-8">
                        <ButtonLink href={item.url} newTab variant="secondary" ariaLabel={`Visiter le site (${item.sector}, nouvel onglet)`}>
                          Visiter le site
                        </ButtonLink>
                      </div>
                    ) : null}
                  </div>

                  <div className="lg:col-span-8">
                    <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                      {[
                        { label: "Avant", value: item.before },
                        { label: "Problématique", value: item.problem },
                        { label: "Solution", value: item.solution },
                        { label: "Résultat", value: item.result },
                      ].map((row) => (
                        <div key={row.label} className="border-t border-night/15 pt-4">
                          <dt className="t-label text-ink-soft">{row.label}</dt>
                          <dd className="t-body mt-2">
                            <Txt>{row.value}</Txt>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {item.image ? (
                      <figure className="mt-10">
                        <div className="frame-ticks overflow-hidden border border-night/10">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width}
                            height={item.image.height}
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            className="h-auto w-full"
                          />
                        </div>
                      </figure>
                    ) : (
                      <div className="mt-10 flex aspect-[16/7] items-center justify-center border border-dashed border-night/25 bg-mist/60">
                        <p className="t-small px-6 text-center text-ink-soft">
                          <span className="todo">
                            <span className="todo-tag">À compléter</span>
                            Capture du site livré
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ol>
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
