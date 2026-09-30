import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/** Logo Harmony Solutions : le H doré et le nom, composé en serif. */
export function Logo({ className, withName = true }: { className?: string; withName?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image src="/images/harmony-h.png" alt="" width={36} height={36} className="size-9" priority />
      {withName ? (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.3rem] tracking-[0.04em]">Harmony</span>
          <span className="mt-0.5 text-[0.62rem] font-semibold tracking-[0.32em] text-paper/70">SOLUTIONS</span>
        </span>
      ) : (
        <span className="sr-only">{company.name}</span>
      )}
    </span>
  );
}
