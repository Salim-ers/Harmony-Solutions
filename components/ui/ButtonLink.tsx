import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  tone?: "dark" | "light";
  download?: string | boolean;
  newTab?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  download,
  newTab,
  className,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn("btn", `btn-${variant}`, tone === "dark" ? "btn-on-dark" : "btn-on-light", className);
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="btn-wire">
        <span />
      </span>
    </>
  );
  const isRaw = /^(https?:|mailto:|tel:)/.test(href) || /\.[a-z0-9]{2,4}$/i.test(href) || download || newTab;

  if (isRaw) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        download={download === true ? "" : download || undefined}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
