import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { sans, serif } from "./fonts";
import { activeSocials, company } from "@/data/company";
import { siteUrl } from "@/lib/site";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";const title = `${company.name} | Création de sites internet à Rantigny (Oise)`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${company.name}` },
  description: company.seo.description,
  keywords: company.seo.keywords,
  applicationName: company.name,
  authors: [{ name: company.name, url: siteUrl }],
  creator: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: company.name,
    title,
    description: company.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: company.seo.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#071426",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

function StructuredData() {
  const sameAs = activeSocials().map((l) => l.href);
  const { address } = company;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: company.name,
        slogan: company.tagline,
        description: company.lead,
        url: siteUrl,
        logo: `${siteUrl}/images/harmony-solutions-logo.webp`,
        image: `${siteUrl}/opengraph-image`,
        email: company.email,
        telephone: company.phoneHref,
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          postalCode: address.postalCode,
          addressLocality: address.city,
          addressRegion: address.region,
          addressCountry: address.country,
        },
        priceRange: "€€",
        founder: { "@type": "Person", name: company.founder.name, jobTitle: company.founder.expertise },
        knowsAbout: ["Création de sites internet", "Référencement local", "E-commerce", "Applications", "Maintenance de sites"],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: company.name,
        description: company.seo.description,
        inLanguage: "fr-FR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // Données statiques issues de /data : échappement de "<" par précaution.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-3 focus:font-semibold focus:text-night"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Navbar />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <StructuredData />
      </body>
    </html>
  );
}
