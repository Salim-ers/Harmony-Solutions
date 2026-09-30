import Link from "next/link";
import { realisations } from "@/data/realisations";
import { ProjectCard } from "@/components/projects/ProjectCard";

/** Le travail d’abord : placé juste après l’accueil, la première réalisation en pleine largeur. */
export function RealisationsPreview() {
  return (
    <section id="realisations" aria-labelledby="realisations-title" className="bg-paper pb-24 pt-14 lg:pb-36 lg:pt-20">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 border-b border-night/80 pb-5">
          <h2 id="realisations-title" className="t-h3 flex items-start gap-2">
            Réalisations
            <span className="font-sans text-[0.8rem] font-semibold tabular-nums text-gold-deep">
              ({String(realisations.length).padStart(2, "0")})
            </span>
          </h2>
          <Link href="/realisations" className="link-u t-label">
            Toutes les réalisations
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-16 lg:mt-12 lg:grid-cols-2 lg:gap-y-20">
          {realisations.map((project, i) => (
            <li key={project.slug} className={i === 0 ? "lg:col-span-2" : undefined}>
              <ProjectCard project={project} index={i} featured={i === 0} priority={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
