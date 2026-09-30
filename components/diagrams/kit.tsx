"use client";

import { createContext, useContext, useId, useRef, type ReactNode } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface DiagramState {
  drawn: boolean;
  still: boolean;
}

const DiagramContext = createContext<DiagramState>({ drawn: true, still: true });
export const useDiagram = () => useContext(DiagramContext);

interface DiagramProps {
  viewBox: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}

/** Conteneur SVG : les liaisons se tracent une seule fois, à l’entrée dans l’écran. */
export function Diagram({ viewBox, title, description, tone = "light", className, children }: DiagramProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion() ?? false;
  const id = useId();
  return (
    <DiagramContext.Provider value={{ drawn: inView || reduce, still: reduce }}>
      <svg
        ref={ref}
        viewBox={viewBox}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className={cn("dg block h-auto w-full", tone === "dark" ? "dg-dark" : "dg-light", className)}
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{description}</desc>
        {children}
      </svg>
    </DiagramContext.Provider>
  );
}

/** Fondu d’un groupe d’éléments. */
export function Appear({ delay = 0, children, className }: { delay?: number; children: ReactNode; className?: string }) {
  const { drawn, still } = useDiagram();
  return (
    <m.g
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: drawn ? 1 : 0 }}
      transition={still ? { duration: 0 } : { duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </m.g>
  );
}

interface WireProps {
  d: string;
  delay?: number;
  active?: boolean;
  dashed?: boolean;
  strong?: boolean;
  className?: string;
}

/** Liaison entre deux nœuds, tracée progressivement. */
export function Wire({ d, delay = 0, active = false, dashed = false, strong = false, className }: WireProps) {
  const { drawn, still } = useDiagram();
  const classes = cn("dg-wire", dashed && "is-dashed", strong && "is-strong", active && "is-active", className);
  if (dashed) {
    return (
      <m.path
        d={d}
        className={classes}
        initial={{ opacity: 0 }}
        animate={{ opacity: drawn ? 1 : 0 }}
        transition={still ? { duration: 0 } : { duration: 0.5, delay }}
      />
    );
  }
  return (
    <m.path
      d={d}
      className={classes}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={drawn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={still ? { duration: 0 } : { duration: 0.55, delay, ease: EASE }}
    />
  );
}

/** Tracé ponctuel (micro-interaction) : une ligne qui parcourt plusieurs nœuds. */
export function Trace({ d, duration = 1.1 }: { d: string; duration?: number }) {
  const { still } = useDiagram();
  return (
    <m.path
      d={d}
      className="dg-trace"
      initial={still ? false : { pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={still ? { duration: 0 } : { duration, ease: [0.45, 0, 0.2, 1] }}
    />
  );
}

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  variant?: "default" | "strong" | "ghost";
  active?: boolean;
  delay?: number;
}

/** Équipement ou service : cadre fin, libellé et précision. */
export function Box({ x, y, w, h, label, sub, variant = "default", active = false, delay = 0 }: BoxProps) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <Appear delay={delay}>
      <g className={cn("dg-box", variant !== "default" && `is-${variant}`, active && "is-active")}>
        <rect x={x} y={y} width={w} height={h} rx={1.5} />
        <text x={cx} y={sub ? cy - 2 : cy + 5} textAnchor="middle" className={cn("dg-label", sub && "has-sub")}>
          {label}
        </text>
        {sub ? (
          <text x={cx} y={cy + 15} textAnchor="middle" className="dg-sub">
            {sub}
          </text>
        ) : null}
      </g>
    </Appear>
  );
}

interface ZoneProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  labelPosition?: "top" | "bottom";
  active?: boolean;
  delay?: number;
}

/** Périmètre logique : site, bâtiment, hyperviseur, laboratoire. */
export function Zone({ x, y, w, h, label, labelPosition = "top", active = false, delay = 0 }: ZoneProps) {
  return (
    <Appear delay={delay}>
      <g className={cn("dg-zone", active && "is-active")}>
        <rect x={x} y={y} width={w} height={h} rx={2} />
        <text x={x + 14} y={labelPosition === "top" ? y + 22 : y + h - 12} className="dg-zone-label">
          {label}
        </text>
      </g>
    </Appear>
  );
}

interface MarkerProps {
  x: number;
  y: number;
  label: string;
  sub?: string;
  kind?: "major" | "minor" | "endpoint";
  active?: boolean;
  delay?: number;
}

/** Nœud abstrait (schéma d’accueil) : un repère et son libellé à droite. */
export function Marker({ x, y, label, sub, kind = "minor", active = false, delay = 0 }: MarkerProps) {
  return (
    <Appear delay={delay}>
      <g className={cn("dg-marker", active && "is-active")}>
        {kind === "major" ? (
          <>
            <rect x={x - 8} y={y - 8} width={16} height={16} className="dg-mark-ring" />
            <rect x={x - 3} y={y - 3} width={6} height={6} className="dg-mark" />
          </>
        ) : kind === "endpoint" ? (
          <circle cx={x} cy={y} r={6.5} className="dg-mark-ring" />
        ) : (
          <rect x={x - 4.5} y={y - 4.5} width={9} height={9} className="dg-mark" />
        )}
        <text x={x + 18} y={sub ? y + 1 : y + 5} className={cn("dg-label", sub && "has-sub")}>
          {label}
        </text>
        {sub ? (
          <text x={x + 18} y={y + 18} className="dg-sub">
            {sub}
          </text>
        ) : null}
      </g>
    </Appear>
  );
}

/** Annotation technique courte. */
export function Note({ x, y, children, anchor = "start", minor = false }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end"; minor?: boolean }) {
  return (
    <Appear delay={0.6}>
      <text x={x} y={y} textAnchor={anchor} className={cn("dg-note", minor && "is-minor")}>
        {children}
      </text>
    </Appear>
  );
}
