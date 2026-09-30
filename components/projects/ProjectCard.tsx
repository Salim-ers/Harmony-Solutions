import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Realisation } from "@/data/realisations";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Realisation;
  index: number;
  featured?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  children?: ReactNode;
}

/** Carte projet façon portfolio : grande capture, nom et lieu, étiquettes. Toute la carte ouvre le site livré. */
export function ProjectCard({ project, index, featured, priority, headingLevel = "h3", children }: ProjectCardProps) {
  const Heading = headingLevel;
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="group relative rounded-[2px] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-signal has-[a:focus-visible]:outline"
    >
      <div className={cn("relative overflow-hidden bg-night", featured ? "aspect-[16/10] lg:aspect-[16/8]" : "aspect-[16/10]")}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          sizes={featured ? "(min-width: 1216px) 1136px, 100vw" : "(min-width: 1216px) 552px, (min-width: 1024px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.035]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-2 bg-paper px-3.5 py-2 text-[0.85rem] font-semibold text-night opacity-0 transition duration-500 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-5 sm:left-5"
        >
          Voir le site
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true" className="font-serif text-[1.15rem] leading-none tabular-nums text-gold-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Heading id={`${project.slug}-title`} className={cn("font-serif leading-[1.05]", featured ? "text-[clamp(1.9rem,3.2vw,2.8rem)]" : "text-[clamp(1.7rem,2.4vw,2.15rem)]")}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {project.client}
              <span className="sr-only"> : voir le site (nouvel onglet)</span>
            </a>
          </Heading>
        </div>
        <p className="t-small shrink-0 text-right text-ink-soft">{project.location}</p>
      </div>

      <ul aria-label="Prestations" className="mt-4 flex flex-wrap gap-2">
        <li className="bg-night px-2.5 py-1 text-[0.78rem] font-semibold text-paper">{project.sector}</li>
        {project.tags.map((tag) => (
          <li key={tag} className="border border-night/20 px-2.5 py-1 text-[0.78rem] font-semibold text-ink-soft">
            {tag}
          </li>
        ))}
      </ul>

      {children}
    </article>
  );
}
