import { activeSocials, company, fullAddress } from "@/data/company";
import { ContactForm } from "@/components/contact/ContactForm";

export function Contact() {
  const rows = [
    { label: "Téléphone", value: company.phone, href: `tel:${company.phoneHref}` },
    { label: "Email", value: company.email, href: `mailto:${company.email}` },
    { label: "Adresse", value: fullAddress() },
    ...activeSocials().map((s) => ({ label: s.label, value: s.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: s.href })),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="tone-dark relative overflow-hidden py-24 lg:py-36">
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="t-label flex items-center gap-3 text-fog">
            <span aria-hidden="true" className="inline-block size-[7px] bg-gold" />
            Contact
          </p>
          <h2 id="contact-title" className="t-h1 mt-6 max-w-[12ch]">
            Parlons de votre projet.
          </h2>
          <p className="t-lead mt-8 max-w-[40ch] text-paper/75">
            Un site, un outil ou une question sur nos formules ? Décrivez votre besoin, nous revenons vers vous rapidement.
          </p>

          <dl className="mt-12 border-t border-paper/15">
            {rows.map((row) => {
              const external = row.href?.startsWith("http");
              return (
                <div key={row.label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-paper/15 py-4">
                  <dt className="t-label text-fog">{row.label}</dt>
                  <dd className="min-w-0">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="link-u break-words font-semibold text-paper"
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        {row.value}
                        {external ? <span className="sr-only"> (nouvel onglet)</span> : null}
                      </a>
                    ) : (
                      <address className="not-italic text-paper/85">{row.value}</address>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
