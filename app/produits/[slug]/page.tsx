import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getProduct, products } from "@/data/products";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Txt } from "@/components/ui/Txt";
import { MarketplaceWireframe } from "@/components/projects/MarketplaceWireframe";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} : ${product.type.toLowerCase()}`,
    description: product.summary,
    alternates: { canonical: `/produits/${product.slug}` },
    openGraph: { type: "article", url: `/produits/${product.slug}`, title: product.name, description: product.summary },
    twitter: { title: product.name, description: product.summary },
  };
}

function Block({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section aria-label={title} className="grid gap-6 border-t border-night/15 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
      <h2 className="flex items-baseline gap-4 lg:col-span-3">
        <span aria-hidden="true" className="font-serif text-[1.5rem] leading-none text-gold-deep">
          {number}
        </span>
        <span className="t-h3">{title}</span>
      </h2>
      <div className="max-w-[64ch] lg:col-span-9">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="t-body flex gap-3">
          <span aria-hidden="true" className="mt-[0.8em] block h-px w-3 shrink-0 bg-gold-deep" />
          <span>
            <Txt>{item}</Txt>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <article>
      <PageHeader label="Produit Harmony Solutions" title={product.name} intro={<Txt>{product.summary}</Txt>}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <StatusBadge status={product.status} tone="dark" />
          <span className="t-small text-fog">{product.type}</span>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-paper/15 pt-8 md:grid-cols-4">
          {product.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="t-label text-fog">{spec.label}</dt>
              <dd className="mt-1 font-semibold text-paper">
                <Txt>{spec.value}</Txt>
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <Link href="/#produits" className="t-small link-u mb-12 inline-block font-semibold">
            Tous les produits
          </Link>
          <Block number="01" title="Contexte">
            <p className="t-body">
              <Txt>{product.context}</Txt>
            </p>
          </Block>
          <Block number="02" title="Problématique">
            <p className="t-body">
              <Txt>{product.challenge}</Txt>
            </p>
          </Block>
          <Block number="03" title="Solution">
            <List items={product.solution} />
          </Block>
          {product.mockup === "marketplace" ? (
            <div className="border-t border-night/15 py-12 lg:py-16">
              <MarketplaceWireframe name={product.name} />
            </div>
          ) : null}
          <Block number="04" title={product.featuresTitle}>
            <List items={product.features} />
          </Block>
          <Block number="05" title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {product.technologies.map((tech) => (
                <li key={tech} className="t-small border border-night/20 px-3 py-1.5">
                  <Txt>{tech}</Txt>
                </li>
              ))}
            </ul>
          </Block>
          <Block number="06" title="Avancement">
            <List items={product.progress} />
          </Block>
        </div>
      </div>

      <section aria-labelledby="produit-cta" className="bg-mist py-20">
        <div className="container-x flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="produit-cta" className="t-h2 max-w-[18ch]">
            Intéressé par {product.name} ?
          </h2>
          <ButtonLink href="/#contact">Nous contacter</ButtonLink>
        </div>
      </section>
    </article>
  );
}
