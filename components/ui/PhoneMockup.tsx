import type { ReactNode } from "react";
import { Globe, Mail, Phone, Share2 } from "lucide-react";
import { company } from "@/data/company";

/** Maquette de principe (pas une capture) : un téléphone dessiné au trait. */
function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-[13.5rem] border border-night/70 bg-paper p-2.5 shadow-[0_1px_0_rgba(7,20,38,0.08)]">
      <div className="mx-auto mb-2 h-1 w-10 bg-night/15" />
      <div aria-hidden="true" className="flex min-h-[21rem] flex-col border border-night/12 bg-paper px-4 py-5">
        {children}
      </div>
    </div>
  );
}

export function PhoneMockup({ variant }: { variant: "vcard" | "loyalty" }) {
  if (variant === "vcard") {
    return (
      <Frame label="Maquette de principe d’une carte de visite virtuelle : nom, activité, boutons d’appel, d’email, de site et de réseaux, et un QR code.">
        <div className="mx-auto flex size-14 items-center justify-center bg-night font-serif text-2xl text-gold">H</div>
        <p className="mt-4 text-center font-serif text-[1.25rem] leading-tight">Votre nom</p>
        <p className="mt-1 text-center text-[0.72rem] text-ink-soft">Votre activité</p>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {[Phone, Mail, Globe, Share2].map((Icon, i) => (
            <span key={i} className="flex aspect-square items-center justify-center border border-night/20">
              <Icon className="size-4" strokeWidth={1.5} />
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between pt-6">
          <div className="space-y-1.5">
            <span className="block h-1.5 w-20 bg-night/15" />
            <span className="block h-1.5 w-14 bg-night/15" />
          </div>
          <span className="grid size-14 grid-cols-4 gap-px border border-night/30 p-1">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className={[0, 1, 3, 4, 6, 9, 10, 12, 13, 15].includes(i) ? "bg-night" : ""} />
            ))}
          </span>
        </div>
      </Frame>
    );
  }
  return (
    <Frame label="Maquette de principe d’une carte de fidélité digitale : une grille de tampons, dont six obtenus, et une récompense à débloquer.">
      <p className="text-[0.7rem] font-semibold text-ink-soft">{company.name}</p>
      <p className="mt-1 font-serif text-[1.35rem] leading-tight">Carte fidélité</p>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={i < 6 ? "aspect-square bg-gold" : "aspect-square border border-night/25"} />
        ))}
      </div>
      <p className="mt-4 text-[0.75rem] text-ink-soft">6 tampons sur 10</p>
      <div className="mt-auto border-t border-night/15 pt-4">
        <p className="text-[0.72rem] text-ink-soft">Prochaine récompense</p>
        <span className="mt-2 block h-1.5 w-24 bg-night/15" />
        <span className="mt-4 flex h-9 items-center justify-center bg-night text-[0.72rem] font-semibold text-paper">Voir ma carte</span>
      </div>
    </Frame>
  );
}
