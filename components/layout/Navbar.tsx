"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { company } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,border-color,backdrop-filter] duration-300",
        solid ? "border-b border-paper/10 bg-night/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
      style={{ ["--focus" as string]: "var(--color-gold)" }}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${company.name}, retour à l’accueil`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.9rem] font-medium transition-colors hover:text-paper",
                      active ? "text-paper" : "text-paper/70",
                    )}
                  >
                    {item.label}
                    {active ? <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full bg-gold" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="btn btn-secondary btn-on-dark hidden !min-h-10 !px-4 text-[0.875rem] sm:inline-flex"
          >
            <span>Demander un devis</span>
            <span aria-hidden="true" className="btn-wire">
              <span />
            </span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center border border-paper/25 xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => (open ? close(false) : setOpen(true))}
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={panelRef}
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-night xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-x flex min-h-full flex-col justify-between gap-10 py-10">
              <nav aria-label="Navigation mobile">
                <ul className="border-t border-paper/10">
                  {mainNav.map((item, index) => (
                    <m.li
                      key={item.href}
                      className="border-b border-paper/10"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.03 * index, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => close(false)}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className="flex items-center justify-between py-4 font-serif text-[2rem] leading-none"
                      >
                        {item.label}
                        <span aria-hidden="true" className={cn("size-2", isActive(pathname, item.href) ? "bg-gold" : "border border-paper/30")} />
                      </Link>
                    </m.li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col gap-6">
                <Link href="/#contact" onClick={() => close(false)} className="btn btn-primary btn-on-dark self-start">
                  <span>Demander un devis</span>
                  <span aria-hidden="true" className="btn-wire">
                    <span />
                  </span>
                </Link>
                <ul className="flex flex-col gap-2 text-paper/75">
                  <li>
                    <a href={`tel:${company.phoneHref}`} className="link-u">
                      {company.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${company.email}`} className="link-u">
                      {company.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
