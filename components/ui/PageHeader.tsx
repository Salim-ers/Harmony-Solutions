import type { ReactNode } from "react";

/** En-tête sombre des pages secondaires (la navbar reste transparente au-dessus). */
export function PageHeader({ label, title, intro, children }: { label: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="tone-dark relative overflow-hidden">
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div className="container-x relative pb-16 pt-36 lg:pb-24 lg:pt-44">
        <p className="t-label flex items-center gap-3 text-fog">
          <span aria-hidden="true" className="inline-block size-[7px] bg-gold" />
          {label}
        </p>
        <h1 className="t-h1 mt-6 max-w-[18ch]">{title}</h1>
        {intro ? <div className="t-lead mt-7 max-w-[58ch] text-paper/75">{intro}</div> : null}
        {children}
      </div>
    </header>
  );
}
