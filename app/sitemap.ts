import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/realisations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...products.map((product) => ({
      url: `${siteUrl}/produits/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: `${siteUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
