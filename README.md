# Site Harmony Solutions

Site vitrine et portfolio de Harmony Solutions : création de sites internet, applications et solutions digitales, à Rantigny (Oise).
Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseignez les variables
npm run dev                  # http://localhost:3000
```

Vérifications et production :

```bash
npm run typecheck
npm run lint
npm run build && npm run start
```

Node.js 20.9 ou plus récent (testé avec Node 22).

## Variables d’environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique, sans slash final. Sert au canonical, au sitemap, à robots.txt, aux données structurées et aux images de partage. |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com) pour l’envoi du formulaire. Côté serveur uniquement. |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les demandes (par défaut : l’email de `data/company.ts`). |
| `CONTACT_FROM_EMAIL` | Expéditeur validé dans Resend (domaine vérifié), ex. `Harmony Solutions <contact@harmony-solutions.fr>`. |

Sans `RESEND_API_KEY` : en développement, la demande est seulement journalisée dans la console ; en production, le formulaire répond qu’il est indisponible et affiche l’adresse email.

## Déploiement (Vercel)

1. Importez le dépôt dans Vercel.
2. Ajoutez les variables d’environnement.
3. Reliez le domaine, puis vérifiez `/sitemap.xml`, `/robots.txt` et l’aperçu de partage (`/opengraph-image`).
4. Déclarez le site dans Google Search Console et reliez-le à la fiche Google Business.

## Modifier le contenu

Tout le contenu est centralisé dans `/data` :

| Fichier | Contenu |
| --- | --- |
| `data/company.ts` | Identité, accroche, coordonnées, réseaux sociaux, fondateur, informations légales, SEO, types de demande du formulaire |
| `data/offers.ts` | Les 4 formules de site, les 2 outils digitaux, les 3 formules de maintenance, la méthode de travail |
| `data/realisations.ts` | Réalisations clients |
| `data/products.ts` | Produits développés par Harmony Solutions (Maestro, produits à venir) |
| `data/navigation.ts` | Menus et sections de la page d’accueil |

Offres, tarifs, coordonnées et textes d’accroche reprennent la plaquette commerciale. En cas de changement de tarif, modifiez `data/offers.ts` : le site et le schéma d’accueil se mettent à jour ensemble.

**Placeholders** : toute valeur qui commence par `TODO:` s’affiche avec une étiquette « À compléter ». Un lien vide (`""`) est masqué. Pour tout retrouver : `grep -rn "TODO:\|⚠️" data/`.

## À compléter avant la mise en ligne

- [ ] **Mentions légales** (obligatoires) : forme juridique, SIRET, TVA, hébergeur dans `data/company.ts`. Faites relire la page `/mentions-legales` (base légale, durée de conservation proposée : 3 ans).
- [ ] **Réalisations clients** : noms, avant/problématique/solution/résultat, captures (`public/images/realisations/`), URL. Supprimez les catégories sans client réel.
- [ ] **Réseaux sociaux** : LinkedIn, Instagram, Facebook (masqués tant qu’ils sont vides).
- [ ] **Portfolio du fondateur** : `founder.portfolioUrl` pour afficher le lien.
- [ ] **Tarifs** : vérifier chaque prix et chaque contenu de formule.
- [ ] **Méthode** : les 5 étapes et les 4 engagements de la section « À propos » sont une proposition de rédaction ; adaptez-les à votre façon de travailler.
- [ ] **Maestro** : statut réel, contexte, stack, avancement. Ajoutez une fiche dans `data/products.ts` pour chaque autre produit (Centrium, Aequitas, Lumely, Tilawa, Travelia, Skillora).
- [ ] **Limitation de débit** du formulaire : en mémoire, suffisante pour une instance ; sur Vercel, préférez Upstash Redis (`@upstash/ratelimit`) dans `lib/rate-limit.ts`.

## Architecture

```
app/            Pages, API contact, SEO (sitemap, robots, images de partage, icônes), polices locales
  page.tsx               Accueil : hero, offres, outils, maintenance, propriété, méthode, réalisations, produits, à propos, contact
  realisations/          Réalisations clients
  produits/[slug]/       Fiche produit
  mentions-legales/      Mentions légales, données personnelles, cookies
components/
  layout/       Navbar, Footer, FlowRail (fil de progression), MotionProvider
  home/         Sections de l’accueil
  diagrams/     Kit SVG et schéma interactif du hero (SolutionMap)
  contact/      Formulaire
  projects/     Maquette filaire Maestro
  ui/           Logo, boutons, en-têtes, badges, maquettes de téléphone, placeholders
data/           Contenu éditable
lib/            Utilitaires, validation, limitation de débit, image de partage
public/images/  Logo et monogramme
```

## Sécurité du formulaire

Validation et nettoyage côté serveur, vérification de l’origine, taille maximale, JSON uniquement, champ pot de miel, délai minimal de saisie, 3 liens maximum, 5 envois par IP et par 10 minutes, contenu échappé dans l’email, aucune clé exposée au navigateur. Les boutons « Demander cette formule » présélectionnent le type de demande.

## Accessibilité et performance

HTML sémantique, lien d’évitement, focus visible, menu mobile accessible au clavier, schémas SVG titrés et décrits, maquettes annoncées comme telles. `prefers-reduced-motion` respecté. Polices locales, images optimisées, Framer Motion en `LazyMotion`, pages statiques pré-générées (seule l’API contact est dynamique). Aucun cookie ni outil de mesure d’audience.
