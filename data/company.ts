/**
 * Identité, coordonnées et informations légales de Harmony Solutions.
 * Source : plaquette commerciale. Convention : une valeur qui commence par "TODO:" s’affiche
 * comme un placeholder identifié sur le site ; un lien vide ("") est masqué.
 */

export const company = {
  name: "Harmony Solutions",
  baseline: "Création de sites internet, applications & solutions digitales",
  tagline: "Votre projet, notre expertise.",
  headline: "Des solutions digitales pour développer votre activité.",
  lead: "Nous accompagnons les commerçants, artisans, entreprises et indépendants dans la création de sites internet, d’applications et d’outils sur mesure.",

  domains: [
    { title: "Sites internet", detail: "Vitrines et e-commerce" },
    { title: "Applications", detail: "Mobiles" },
    { title: "SaaS", detail: "Sur mesure" },
    { title: "Logiciels métier", detail: "ERP, gestion, CRM" },
  ],

  email: "contact@harmony-solutions.fr",
  phone: "06 51 08 08 33",
  phoneHref: "+33651080833",
  address: {
    street: "66 Avenue Jean Jaurès",
    postalCode: "60290",
    city: "Rantigny",
    region: "Oise",
    country: "FR",
  },

  // Renseignez les URL complètes ; les liens vides sont masqués.
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
  ],

  founder: {
    name: "Salim El Rhalmani",
    role: "Fondateur",
    expertise: "Administrateur systèmes, réseaux & sécurité",
    // URL du portfolio personnel du fondateur, masquée si vide.
    portfolioUrl: "",
  },

  ownership: {
    title: "Votre projet vous appartient.",
    text: "Le nom de domaine et l’hébergement sont créés à votre nom et restent votre propriété. Les frais d’hébergement et de nom de domaine sont à la charge du client. Nous vous accompagnons dans leur acquisition et leur configuration si besoin.",
  },

  // ⚠️ Informations obligatoires des mentions légales : à compléter avant la mise en ligne.
  legal: {
    legalForm: "TODO: Forme juridique (micro-entreprise, SASU, EURL…)",
    siret: "TODO: Numéro SIRET",
    vat: "TODO: TVA intracommunautaire, ou « TVA non applicable, art. 293 B du CGI »",
    publicationDirector: "Salim El Rhalmani",
    host: "TODO: Hébergeur du site (raison sociale, adresse, téléphone)",
    // Durée proposée, conforme aux recommandations de la CNIL pour un contact commercial : à valider.
    dataRetention: "3 ans à compter du dernier échange",
  },

  seo: {
    description:
      "Harmony Solutions, à Rantigny (Oise) : création de sites internet, référencement local, espaces de gestion, boutiques en ligne, cartes de visite et de fidélité digitales, maintenance. Pour commerçants, artisans et indépendants.",
    keywords: [
      "Harmony Solutions",
      "création site internet",
      "site vitrine",
      "création site internet Oise",
      "site internet Rantigny",
      "référencement local",
      "fiche Google Business",
      "site e-commerce",
      "site de réservation",
      "carte de visite virtuelle",
      "carte de fidélité digitale",
      "maintenance site internet",
      "site internet artisan",
      "site internet commerçant",
    ],
  },
};

export const contactTypes = [
  "Site vitrine",
  "Site + SEO",
  "Site + dashboard / CRM",
  "Site complet",
  "Carte de visite ou fidélité",
  "Maintenance",
  "Application ou logiciel sur mesure",
  "Autre",
] as const;

export type ContactType = (typeof contactTypes)[number];

export function fullAddress() {
  const { street, postalCode, city } = company.address;
  return `${street}, ${postalCode} ${city}`;
}

export function activeSocials() {
  return company.socials.filter((s) => s.href);
}
