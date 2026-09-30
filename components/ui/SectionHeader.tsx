import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  titleId?: string;
  as?: "h1" | "h2";
  className?: string;
}

/** En-tête éditorial : annotation dans la marge gauche, titre serif, introduction optionnelle. */
export function SectionHeader({ label, title, intro, tone = "light", titleId, as = "h2", className }: SectionHeaderProps) {
  const Heading = as;
  return (
    <div className={cn("grid gap-y-5 lg:grid-cols-12 lg:gap-x-10", className)}>
      <p className={cn("t-label flex items-center gap-3 lg:col-span-3 lg:pt-3", tone === "dark" ? "text-fog" : "text-ink-soft")}>
        <span aria-hidden="true" className="inline-block size-[7px] shrink-0 bg-gold" />
        {label}
      </p>
      <div className="lg:col-span-9">
        <Heading id={titleId} className={cn(as === "h1" ? "t-h1" : "t-h2", "max-w-[20ch]")}>
          {title}
        </Heading>
        {intro ? (
          <div className={cn("t-lead mt-6 max-w-[58ch]", tone === "dark" ? "text-paper/75" : "text-ink-soft")}>{intro}</div>
        ) : null}
      </div>
    </div>
  );
}
