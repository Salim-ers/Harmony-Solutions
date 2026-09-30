import type { Metadata } from "next";
import type { ReactNode } from "react";
import { company, fullAddress } from "@/data/company";
import { PageHeader } from "@/components/ui/PageHeader";
import { Txt } from "@/components/ui/Txt";

export const metadata: Metadata = {
  title: "Mentions légales et données personnelles",
  description: `Mentions légales du site ${company.name} et informations sur le traitement des données personnelles.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

function Part({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid gap-6 border-t border-night/15 py-12 lg:grid-cols-12 lg:gap-10">
      <h2 id={`${id}-title`} className="t-h3 lg:col-span-4">
        {title}
      </h2>
      <div className="t-body max-w-[64ch] space-y-4 lg:col-span-8">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-night/10 py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
      <dt className="t-label text-ink-soft">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function LegalPage() {
  const { legal } = company;
  return (
    <>
      <PageHeader label="Informations légales" title="Mentions légales et données personnelles." />
      <div className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <Part id="editeur" title="Éditeur du site">
            <dl>
              <Row label="Raison sociale">{company.name}</Row>
              <Row label="Forme juridique">
                <Txt>{legal.legalForm}</Txt>
              </Row>
              <Row label="SIRET">
                <Txt>{legal.siret}</Txt>
              </Row>
              <Row label="TVA">
                <Txt>{legal.vat}</Txt>
              </Row>
              <Row label="Adresse">{fullAddress()}</Row>
              <Row label="Téléphone">{company.phone}</Row>
              <Row label="Email">
                <a href={`mailto:${company.email}`} className="link-u">
                  {company.email}
                </a>
              </Row>
              <Row label="Directeur de la publication">{legal.publicationDirector}</Row>
            </dl>
          </Part>

          <Part id="hebergement" title="Hébergement">
            <p>
              <Txt>{legal.host}</Txt>
            </p>
          </Part>

          <Part id="propriete-intellectuelle" title="Propriété intellectuelle">
            <p>
              Les textes, visuels, logos et éléments graphiques de ce site sont la propriété de {company.name}, sauf mention contraire. Toute
              reproduction sans autorisation préalable est interdite.
            </p>
          </Part>

          <Part id="donnees" title="Données personnelles">
            <p>
              Les informations transmises via le formulaire de contact (nom, entreprise, téléphone, email, sujet et message) sont utilisées
              uniquement pour répondre à votre demande et, le cas échéant, établir une proposition commerciale. Elles ne sont ni vendues ni
              cédées à des tiers.
            </p>
            <p>
              Responsable du traitement : {company.name}, {fullAddress()}. Base légale : les mesures précontractuelles prises à votre demande.
              Durée de conservation : {legal.dataRetention}.
            </p>
            <p>
              Les messages sont acheminés par un prestataire d’envoi d’emails, qui agit uniquement pour le compte de {company.name}.
            </p>
            <p>
              Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur vos
              données. Pour l’exercer, écrivez à{" "}
              <a href={`mailto:${company.email}`} className="link-u">
                {company.email}
              </a>
              . Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).
            </p>
          </Part>

          <Part id="cookies" title="Cookies">
            <p>
              Ce site n’utilise ni cookie publicitaire ni outil de mesure d’audience. Aucun bandeau de consentement n’est donc nécessaire. Si un
              outil de mesure est ajouté, cette section devra être mise à jour.
            </p>
          </Part>
        </div>
      </div>
    </>
  );
}
