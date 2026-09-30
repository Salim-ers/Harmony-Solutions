import { company } from "@/data/company";
import { SectionHeader } from "@/components/ui/SectionHeader";

const commitments = [
  { title: "Sur mesure", text: "Un design moderne, pensé pour votre activité, et non un modèle générique." },
  { title: "Fiable", text: "Des technologies éprouvées, des sites rapides et adaptés au mobile." },
  { title: "Transparent", text: "Des formules claires, des tarifs affichés, un projet qui reste le vôtre." },
  { title: "Durable", text: "Formation à l’utilisation, puis mises à jour, sauvegardes et sécurité avec la maintenance." },
];

export function About() {
  const { founder } = company;
  return (
    <section id="a-propos" aria-labelledby="a-propos-title" className="bg-paper py-24 lg:py-36">
      <div className="container-x">
        <SectionHeader
          label="À propos"
          titleId="a-propos-title"
          title="Le digital, avec une vraie culture de l’infrastructure."
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="t-lead space-y-6 lg:col-span-7 lg:col-start-4">
            <p>
              {company.name} accompagne les commerçants, artisans, entreprises et indépendants dans la création de sites internet,
              d’applications et d’outils sur mesure, depuis {company.address.city}, dans l’{company.address.region}.
            </p>
            <p className="text-ink-soft">
              L’entreprise a été fondée par {founder.name}, administrateur systèmes, réseaux et sécurité. Cette double compétence se retrouve dans
              chaque projet : l’hébergement, les sauvegardes, les mises à jour et la sécurité sont pensés dès le départ, pas ajoutés après coup.
            </p>
          </div>

          <aside aria-label="Fondateur" className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
            <div className="frame-ticks border border-night/15 p-6">
              <p className="t-label text-gold-deep">{founder.role}</p>
              <p className="mt-3 font-serif text-[1.6rem] leading-tight">{founder.name}</p>
              <p className="t-small mt-2 text-ink-soft">{founder.expertise}</p>
              {founder.portfolioUrl ? (
                <a href={founder.portfolioUrl} target="_blank" rel="noopener noreferrer" className="link-u t-small mt-5 inline-block font-semibold">
                  Son portfolio<span className="sr-only"> (nouvel onglet)</span>
                </a>
              ) : null}
            </div>
          </aside>
        </div>

        <ol className="mt-20 grid gap-x-10 gap-y-10 border-t border-night/80 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <li key={c.title}>
              <span aria-hidden="true" className="font-serif text-[1.6rem] text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h3 mt-3">{c.title}</h3>
              <p className="t-small mt-2 text-ink-soft">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
