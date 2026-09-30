export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Offres", href: "/#offres" },
  { label: "Maintenance", href: "/#maintenance" },
  { label: "Méthode", href: "/#methode" },
  { label: "Produits", href: "/#produits" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/#contact" },
];

export const footerNav: NavItem[] = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Offres", href: "/#offres" },
  { label: "Outils digitaux", href: "/#outils" },
  { label: "Maintenance", href: "/#maintenance" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/#contact" },
];

/** Sections de la page d’accueil, dans l’ordre : alimente le fil de progression latéral. */
export const homeSections = [
  { id: "accueil", label: "Accueil" },
  { id: "realisations", label: "Réalisations" },
  { id: "offres", label: "Offres" },
  { id: "outils", label: "Outils digitaux" },
  { id: "maintenance", label: "Maintenance" },
  { id: "propriete", label: "Propriété" },
  { id: "methode", label: "Méthode" },
  { id: "produits", label: "Produits" },
  { id: "a-propos", label: "À propos" },
  { id: "contact", label: "Contact" },
];
