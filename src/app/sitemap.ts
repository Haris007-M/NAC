import type { MetadataRoute } from "next";
import { getPosts, getProducts } from "@/lib/queries";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);
  return [
    ...["", "/shop", "/journal", "/help", "/about"].map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.8 : 1 })),
    ...products.map((p) => ({ url: `${SITE_URL}/product/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/journal/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
