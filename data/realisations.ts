/**
 * Réalisations de Harmony Solutions, dans l’ordre d’affichage (la première est mise en avant sur l’accueil).
 * Les captures sont dans /public/images/realisations/ (1600 × 1000, JPEG).
 * `before`, `problem` et `result` sont facultatifs : renseignez-les pour afficher la fiche détaillée
 * (Avant, Problématique, Solution, Résultat) sur la page Réalisations.
 */
export interface Realisation {
  slug: string;
  client: string;
  sector: string;
  location: string;
  tags: string[];
  solution: string;
  url: string;
  image: { src: string; alt: string; width: number; height: number };
  before?: string;
  problem?: string;
  result?: string;
}

const capture = (slug: string, alt: string) => ({ src: `/images/realisations/${slug}.jpg`, alt, width: 1600, height: 1000 });

export const realisations: Realisation[] = [
  {
    slug: "h2au-lavage",
    client: "H2AU Lavage",
    sector: "Station de lavage",
    location: "Saint-Maximin (60)",
    tags: ["Site vitrine", "Référencement local", "Design"],
    solution:
      "Un site qui présente les programmes de lavage et leurs tarifs, les équipements, le fonctionnement de la station ouverte 24h/24 et l’itinéraire.",
    url: "https://station-rho.vercel.app/",
    image: capture("station-rho", "Page d’accueil du site H2AU Lavage : « Faites-la briller. », station de lavage à Saint-Maximin."),
  },
  {
    slug: "l-art-du-pain",
    client: "L’Art du Pain",
    sector: "Boulangerie pâtisserie",
    location: "Nogent-sur-Oise (60)",
    tags: ["Site vitrine", "Click & Collect", "Commandes sur mesure"],
    solution:
      "Un site qui met en valeur la maison et ses créations, avec la commande en ligne, les gâteaux sur mesure, les fêtes de fin d’année et une galerie photo.",
    url: "https://l-art-du-pain.vercel.app/",
    image: capture("l-art-du-pain", "Page d’accueil du site L’Art du Pain : l’intérieur de la boulangerie et son comptoir."),
  },
  {
    slug: "carte-quadcore",
    client: "QuadCore",
    sector: "Carte de visite digitale",
    location: "ESN, services informatiques",
    tags: ["Carte de visite virtuelle", "Mobile", "Ajout aux contacts"],
    solution:
      "Une carte de visite en ligne : coordonnées directes, ajout aux contacts en un geste, liens vers le site, la plateforme et les réseaux de l’entreprise.",
    url: "https://carte-ers.vercel.app/",
    image: capture("carte-ers", "Carte de visite digitale QuadCore : logo, nom, bouton « Ajouter aux contacts » et liens de contact."),
  },
  {
    slug: "royale-auto-ecole",
    client: "Royale Auto-école",
    sector: "Auto-école",
    location: "Breuil-le-Vert (60)",
    tags: ["Site vitrine", "Référencement local", "Inscriptions"],
    solution:
      "Un site qui présente les formations au permis, la réglementation, la sécurité routière et des conseils, avec la prise de contact et l’inscription.",
    url: "https://royale-one.vercel.app/",
    image: capture("royale-one", "Page d’accueil du site Royale Auto-école : « La route vers votre liberté commence ici. »"),
  },
  {
    slug: "noa-cafe",
    client: "NOA",
    sector: "Coffee shop",
    location: "Paris 19e",
    tags: ["Site vitrine", "Carte en ligne", "Identité graphique"],
    solution: "Un site à l’image du lieu : la carte, l’ambiance, l’histoire du café et les informations pour venir.",
    url: "https://noa-cafe-one.vercel.app/",
    image: capture("noa-cafe-one", "Page d’accueil du site NOA, Café & Friends : le logo entouré d’illustrations au trait."),
  },
];
