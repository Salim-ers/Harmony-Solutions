"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RailItem {
  id: string;
  label: string;
}

/**
 * Fil de progression : une ligne fine qui traverse la page comme un flux réseau,
 * avec un nœud par section. Visible sur grands écrans uniquement.
 */
export function FlowRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Sections de la page" className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:left-8">
      <div className="relative py-1">
        <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px bg-fog/40" />
        <span
          ref={fillRef}
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-gold"
          style={{ transform: "scaleY(0)" }}
        />
        <ol className="relative flex flex-col gap-[18px]">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="group relative flex items-center"
                  style={{ ["--focus" as string]: "var(--color-gold)" }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block size-[11px] border transition-colors duration-300",
                      isActive ? "border-gold bg-gold" : "border-fog/80 bg-paper group-hover:border-gold",
                    )}
                  />
                  <span
                    className={cn(
                      "pointer-events-none absolute left-6 whitespace-nowrap bg-night px-2 py-1 text-[0.78rem] font-semibold text-paper opacity-0 transition-opacity duration-200",
                      "group-hover:opacity-100 group-focus-visible:opacity-100",
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
