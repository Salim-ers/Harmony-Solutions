import { company } from "@/data/company";

const split = [
  { title: "À votre nom", items: ["Nom de domaine", "Hébergement"] },
  { title: "Avec nous", items: ["Conception et développement", "Aide à l’acquisition et à la configuration", "Formation à l’utilisation"] },
];

export function Ownership() {
  return (
    <section id="propriete" aria-labelledby="propriete-title" className="bg-paper py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="t-label flex items-center gap-3 text-ink-soft">
            <span aria-hidden="true" className="inline-block size-[7px] bg-gold" />
            Notre engagement
          </p>
          <h2 id="propriete-title" className="t-h2 mt-6 max-w-[14ch]">
            {company.ownership.title}
          </h2>
          <p className="t-lead mt-7 max-w-[46ch] text-ink-soft">{company.ownership.text}</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
          <div className="grid border border-night/15 sm:grid-cols-2">
            {split.map((col, i) => (
              <div key={col.title} className={i === 0 ? "border-b border-night/15 p-7 sm:border-b-0 sm:border-r" : "p-7"}>
                <h3 className={i === 0 ? "t-label text-gold-deep" : "t-label text-ink-soft"}>{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span aria-hidden="true" className={i === 0 ? "size-2 shrink-0 bg-gold-deep" : "size-2 shrink-0 border border-night/40"} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
