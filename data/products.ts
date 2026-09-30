/**
 * Produits développés par Harmony Solutions. Chaque produit avec une fiche génère /produits/[slug].
 * ⚠️ N’affichez que le statut réel de chaque produit.
 */

export type ProductStatus = "Concept" | "Prototype" | "MVP" | "Production";

export const statusDescriptions: Record<ProductStatus, string> = {
  Concept: "Idée cadrée, pas encore développée",
  Prototype: "Premiers écrans ou premières fonctions",
  MVP: "Version minimale utilisable",
  Production: "En service",
};

export interface Product {
  slug: string;
  name: string;
  type: string;
  status: ProductStatus;
  summary: string;
  context: string;
  challenge: string;
  solution: string[];
  featuresTitle: string;
  features: string[];
  technologies: string[];
  progress: string[];
  specs: { label: string; value: string }[];
  mockup?: "marketplace";
}

export const products: Product[] = [
  {
    slug: "maestro",
    name: "Maestro",
    type: "Marketplace de réservation pour artisans",
    // ⚠️ Mettez à jour le statut réel : Concept, Prototype, MVP ou Production.
    status: "Concept",
    summary: "Une place de marché pour permettre aux particuliers de trouver et de réserver simplement un artisan ou un professionnel.",
    context: "TODO: Origine du projet et état d’avancement réel.",
    challenge:
      "Trouver un professionnel disponible passe souvent par le bouche-à-oreille, des appels sans réponse et des devis difficiles à comparer.",
    solution: [
      "Parcours particulier : rechercher un métier près de chez soi, consulter un profil, réserver un créneau.",
      "Parcours professionnel : présenter son activité et gérer ses disponibilités.",
      "TODO: Architecture technique retenue (front, back, base de données, paiement).",
    ],
    featuresTitle: "Fonctionnalités envisagées",
    features: ["Recherche par métier et par zone", "Profils de professionnels", "Réservation de créneaux", "Espace professionnel pour gérer ses disponibilités"],
    technologies: ["TODO: Stack prévue ou utilisée"],
    progress: ["Statut actuel : concept.", "TODO: Précisez l’avancement (maquettes, prototype, MVP)."],
    specs: [
      { label: "Type", value: "Marketplace" },
      { label: "Utilisateurs", value: "Particuliers et professionnels" },
      { label: "Statut", value: "Concept" },
    ],
    mockup: "marketplace",
  },
];

/** Autres produits : affichés par leur nom tant que leur fiche n’est pas rédigée. */
export const upcomingProducts = ["Centrium", "Aequitas", "Lumely", "Tilawa", "Travelia", "Skillora"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
