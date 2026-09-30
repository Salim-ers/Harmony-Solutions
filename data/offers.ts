import type { ContactType } from "./company";

/**
 * Offres, outils et formules de maintenance, tels qu’ils figurent sur la plaquette.
 * ⚠️ Tarifs TTC : vérifiez-les avant chaque mise à jour du site.
 */

export type OfferId = "vitrine" | "seo" | "crm" | "complet";

export interface Offer {
  id: OfferId;
  number: string;
  name: string;
  price: string;
  priceNote?: string;
  pitch: string;
  /** Fonctionnalités ; la première peut indiquer ce qui est hérité d’une autre formule. */
  features: string[];
  includesBase: boolean;
  contactType: ContactType;
}

export const offers: Offer[] = [
  {
    id: "vitrine",
    number: "01",
    name: "Site vitrine Premium",
    price: "700 €",
    pitch: "Un site professionnel pour présenter votre activité.",
    includesBase: false,
    features: [
      "Design sur mesure et moderne",
      "Jusqu’à 5 à 7 pages",
      "Responsive (mobile et tablette)",
      "Formulaire de contact",
      "Intégration de vos contenus",
      "Optimisé pour la performance",
    ],
    contactType: "Site vitrine",
  },
  {
    id: "seo",
    number: "02",
    name: "Site vitrine + SEO",
    price: "900 €",
    pitch: "Un site visible sur Google pour attirer plus de clients.",
    includesBase: true,
    features: [
      "Optimisation SEO complète",
      "Fiche Google Business (aide)",
      "Pages optimisées (mots-clés)",
      "Conseils en référencement local",
      "Suivi des performances",
    ],
    contactType: "Site + SEO",
  },
  {
    id: "crm",
    number: "03",
    name: "Site + Dashboard / CRM",
    price: "1 200 €",
    pitch: "Un site avec un espace de gestion pour vos clients, commandes, devis…",
    includesBase: true,
    features: [
      "Espace d’administration",
      "Gestion clients, devis et commandes",
      "Tableau de bord personnalisé (CRM)",
      "Notifications par email",
      "Formation à l’utilisation",
    ],
    contactType: "Site + dashboard / CRM",
  },
  {
    id: "complet",
    number: "04",
    name: "Site complet",
    price: "1 650 €",
    priceNote: "De 1 650 € à 2 000 € selon les besoins",
    pitch: "Commande et paiement : vendez vos produits ou prestations directement en ligne.",
    includesBase: true,
    features: [
      "Boutique en ligne, carte ou réservation",
      "Paiement sécurisé (Stripe…)",
      "Gestion des commandes",
      "Espace client",
      "Formation et support inclus",
    ],
    contactType: "Site complet",
  },
];

export const tools = [
  {
    id: "carte-de-visite",
    name: "Carte de visite virtuelle",
    price: "149 €",
    pitch: "Toutes vos coordonnées derrière un lien et un QR code.",
    features: ["Design personnalisé", "Lien unique (QR code inclus)", "Accès rapide : appel, mail, site, réseaux", "Idéale pour vos clients et partenaires"],
    mockup: "vcard" as const,
  },
  {
    id: "carte-de-fidelite",
    name: "Carte de fidélité digitale",
    price: "299 €",
    pitch: "La carte à tampons, directement sur le téléphone de vos clients.",
    features: ["Design personnalisé", "Suivi des points fidélité", "Notifications automatiques", "Accessible via smartphone", "Idéale pour commerces et restaurants"],
    mockup: "loyalty" as const,
  },
];

export const maintenancePlans = [
  {
    id: "essentielle",
    name: "Essentielle",
    price: "25 €",
    features: [
      "Mises à jour techniques",
      "Petites modifications (textes et images)",
      "Assistance par email",
      "Vérification du bon fonctionnement",
      "Sauvegardes mensuelles",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "49 €",
    features: [
      "Tout le pack Essentielle",
      "Modifications régulières",
      "Ajout de pages ou de produits simples",
      "Surveillance de la sécurité",
      "Sauvegardes hebdomadaires",
      "Support prioritaire",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "79 €",
    features: [
      "Tout le pack Pro",
      "Support prioritaire (téléphone possible)",
      "Modifications avancées",
      "Suivi des performances (vitesse, SEO)",
      "Assistance en cas de problème",
      "Rapport mensuel",
    ],
    highlighted: false,
  },
];

/** Démarche de projet. ⚠️ Rédaction proposée : ajustez-la à votre façon réelle de travailler. */
export const processSteps = [
  { title: "Échange", text: "Votre activité, vos clients et ce que le site doit vous apporter." },
  { title: "Proposition", text: "La formule adaptée à votre besoin, et un devis détaillé." },
  { title: "Conception", text: "Maquette et contenus, validés avec vous avant le développement." },
  { title: "Mise en ligne", text: "Développement, vérifications sur mobile et ordinateur, publication." },
  { title: "Prise en main", text: "Formation à l’utilisation, puis suivi avec une formule de maintenance si vous le souhaitez." },
];
