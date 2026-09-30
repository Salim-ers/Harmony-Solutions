import { products, upcomingProducts } from "@/data/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Txt } from "@/components/ui/Txt";
import { MarketplaceWireframe } from "@/components/projects/MarketplaceWireframe";

export function Products() {
  return (
    <section id="produits" aria-labelledby="produits-title" className="bg-mist py-24 lg:py-36">
      <div className="container-x">
        <SectionHeader
          label="Nos produits"
          titleId="produits-title"
          title="Construire pour nos clients, et nos propres produits."
          intro="En parallèle des projets clients, Harmony Solutions développe ses propres applications. Chacune affiche son statut réel, de l’idée à la mise en service."
        />

        <div className="mt-16 space-y-20 lg:mt-24">
          {products.map((product) => (
            <article key={product.slug} aria-labelledby={`${product.slug}-title`} className="grid gap-10 border-t border-night/80 pt-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-4">
                  <p className="t-label text-ink-soft">{product.type}</p>
                  <StatusBadge status={product.status} />
                </div>
                <h3 id={`${product.slug}-title`} className="mt-5 font-serif text-[clamp(2.2rem,4vw,3.2rem)] leading-none">
                  {product.name}
                </h3>
                <p className="t-body mt-6 max-w-[48ch]">
                  <Txt>{product.summary}</Txt>
                </p>
                <p className="t-small mt-5 max-w-[48ch] text-ink-soft">
                  <span className="font-semibold text-ink">Le problème. </span>
                  <Txt>{product.challenge}</Txt>
                </p>
                <div className="mt-10">
                  <ButtonLink href={`/produits/${product.slug}`}>Voir le produit</ButtonLink>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">{product.mockup === "marketplace" ? <MarketplaceWireframe name={product.name} /> : null}</div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-t border-night/15 pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="t-label text-ink-soft">En préparation</h3>
            <p className="t-small mt-3 max-w-[34ch] text-ink-soft">Leur présentation détaillée arrive prochainement.</p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-8">
            {upcomingProducts.map((name) => (
              <li key={name} className="font-serif text-[1.6rem] leading-tight text-ink/70">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
