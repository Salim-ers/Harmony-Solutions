import { statusDescriptions, type ProductStatus } from "@/data/products";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, tone = "light" }: { status: ProductStatus; tone?: "light" | "dark" }) {
  return (
    <span
      title={statusDescriptions[status]}
      className={cn(
        "t-label inline-flex items-center gap-2 border px-2.5 py-1",
        tone === "dark" ? "border-paper/25 text-paper/85" : "border-night/20 text-ink-soft",
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5", status === "Production" ? "bg-gold" : "border border-current")} />
      <span className="sr-only">Statut : </span>
      {status}
    </span>
  );
}
