"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RouteStep {
  title: string;
  text?: string;
  stateLabel: string;
  emphasis: "done" | "current" | "next";
}

/** Parcours en étapes : une ligne se trace, chaque nœud porte un état explicite. Horizontal sur desktop, vertical sur mobile. */
export function RouteSteps({ steps, tone = "light", columns }: { steps: RouteStep[]; tone?: "light" | "dark"; columns: 4 | 5 | 6 }) {
  const dark = tone === "dark";
  return (
    <div className="relative">
      <m.span
        aria-hidden="true"
        className={cn("absolute left-[5px] top-2 hidden h-px origin-left lg:block", dark ? "bg-paper/25" : "bg-night/25")}
        style={{ right: 0, top: 5 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <span aria-hidden="true" className={cn("absolute bottom-2 left-[5px] top-2 w-px lg:hidden", dark ? "bg-paper/25" : "bg-night/25")} />
      <ol className={cn("relative grid gap-8 lg:gap-6", columns === 4 ? "lg:grid-cols-4" : columns === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6")}>
        {steps.map((step) => (
          <li key={step.title} className="relative pl-8 lg:pl-0 lg:pt-9">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-1 block size-[11px] border lg:top-0",
                step.emphasis === "done" && (dark ? "border-paper bg-paper" : "border-night bg-night"),
                step.emphasis === "current" && "border-gold bg-gold outline outline-1 outline-offset-[3px] outline-gold/60",
                step.emphasis === "next" && (dark ? "border-paper/50 bg-night" : "border-night/40 bg-paper"),
              )}
            />
            <p className={cn("t-label", step.emphasis === "current" ? (dark ? "text-gold" : "text-gold-deep") : dark ? "text-fog" : "text-ink-soft")}>
              {step.stateLabel}
            </p>
            <h3 className="mt-2 font-serif text-[1.45rem] leading-[1.15]">{step.title}</h3>
            {step.text ? <p className={cn("t-small mt-2 max-w-[30ch]", dark ? "text-paper/70" : "text-ink-soft")}>{step.text}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
