import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { activeSocials, company, fullAddress } from "@/data/company";
import { Year } from "@/components/ui/Year";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const socials = activeSocials();
  return (
    <footer className="tone-dark border-t border-paper/10">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-[32ch] font-serif text-[1.35rem] leading-snug text-paper/90">{company.tagline}</p>
        </div>
        <nav aria-label="Navigation du pied de page" className="lg:col-span-4">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/75 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-paper/75 lg:col-span-4 lg:text-right">
          <p>
            <a href={`tel:${company.phoneHref}`} className="link-u">
              {company.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${company.email}`} className="link-u">
              {company.email}
            </a>
          </p>
          <address className="not-italic">{fullAddress()}</address>
          {socials.length ? (
            <ul className="flex gap-6 pt-3 lg:justify-end">
              {socials.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-u">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-paper/10 py-6 text-[0.85rem] text-fog sm:flex-row sm:justify-between">
        <p>
          © <Year /> {company.name}
        </p>
        <Link href="/mentions-legales" className="link-u self-start">
          Mentions légales et données personnelles
        </Link>
      </div>
    </footer>
  );
}
