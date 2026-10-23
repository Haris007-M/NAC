import type { Metadata } from "next";
import { ShopClient } from "@/components/ShopClient";
import { ShopHero } from "@/components/ShopHero";
import { getProducts } from "@/lib/queries";
import { CATEGORIES } from "@/lib/utils";

type SP = { searchParams: { cat?: string; concern?: string; q?: string } };

export function generateMetadata({ searchParams }: SP): Metadata {
  const c = CATEGORIES.find((x) => x.key === searchParams.cat);
  return { title: c ? `${c.title} — Korean Skincare` : "Shop Korean Skincare", description: "Shop authentic Korean skincare by skin type, concern, brand and price. Free worldwide shipping over $49.", alternates: { canonical: "/shop" } };
}

export default async function Shop({ searchParams }: SP) {
  const products = await getProducts();
  const c = CATEGORIES.find((x) => x.key === searchParams.cat);
  const title = c?.title ?? searchParams.concern ?? "Shop all";
  const ld = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.brand} ${p.name}`, url: `/product/${p.slug}` })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ShopHero title={title} cat={c?.key} concern={searchParams.concern} products={products} />
      <ShopClient key={JSON.stringify(searchParams)} products={products} initial={searchParams} />
    </>
  );
}
