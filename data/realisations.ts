/**
 * Réalisations clients de Harmony Solutions.
 * ⚠️ Remplacez chaque "TODO:" par les informations réelles. Pour une capture, ajoutez l’image dans
 * /public/images/realisations/ et renseignez `image`. Un `url` vide masque le bouton « Visiter le site ».
 */
export interface Realisation {
  slug: string;
  sector: string;
  client: string;
  before: string;
  problem: string;
  solution: string;
  result: string;
  url: string;
  image?: { src: string; alt: string; width: number; height: number };
}

export const realisations: Realisation[] = [
  {
    slug: "boulangerie",
    sector: "Boulangerie",
    client: "TODO: Nom du client",
    before: "TODO: Situation avant le projet",
    problem: "TODO: Problématique du client",
    solution: "TODO: Solution livrée",
    result: "TODO: Résultat visible (capture, lien)",
    url: "",
  },
  {
    slug: "restaurant",
    sector: "Restaurant",
    client: "TODO: Nom du client",
    before: "TODO: Situation avant le projet",
    problem: "TODO: Problématique du client",
    solution: "TODO: Solution livrée",
    result: "TODO: Résultat visible (capture, lien)",
    url: "",
  },
  {
    slug: "commerce",
    sector: "Commerce",
    client: "TODO: Nom du client",
    before: "TODO: Situation avant le projet",
    problem: "TODO: Problématique du client",
    solution: "TODO: Solution livrée",
    result: "TODO: Résultat visible (capture, lien)",
    url: "",
  },
  {
    slug: "station-de-lavage",
    sector: "Station de lavage",
    client: "TODO: Nom du client",
    before: "TODO: Situation avant le projet",
    problem: "TODO: Problématique du client",
    solution: "TODO: Solution livrée",
    result: "TODO: Résultat visible (capture, lien)",
    url: "",
  },
  {
    slug: "site-professionnel",
    sector: "Site professionnel",
    client: "TODO: Nom du client",
    before: "TODO: Situation avant le projet",
    problem: "TODO: Problématique du client",
    solution: "TODO: Solution livrée",
    result: "TODO: Résultat visible (capture, lien)",
    url: "",
  },
];
