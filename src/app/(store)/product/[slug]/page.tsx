import type { Metadata } from "next";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { ProductTabs } from "@/components/ProductTabs";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, getProducts } from "@/lib/queries";
import { FREE_SHIP, money } from "@/lib/utils";

type P = { params: { slug: string } };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = await getProduct(params.slug);
  if (!p) return {};
  return { title: `${p.brand} ${p.name}`, description: p.description, alternates: { canonical: `/product/${p.slug}` }, openGraph: { images: [p.image] } };
}

export default async function ProductPage({ params }: P) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const related = (await getProducts()).filter((x) => x.slug !== p.slug && (x.category === p.category || x.concerns.some((c) => p.concerns.includes(c)))).slice(0, 4);
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: `${p.brand} ${p.name}`, image: p.image, description: p.description, brand: { "@type": "Brand", name: p.brand },
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
    offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
  };
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <p className="mt-6 text-sm text-neutral-500"><Link href="/" className="underline">Home</Link> / <Link href={`/shop?cat=${encodeURIComponent(p.category)}`} className="underline">{p.category}</Link> / {p.brand}</p>
      <div className="mt-5 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="sheen sheen-auto relative aspect-square overflow-hidden rounded-2xl bg-sunk animate-rise"><Image src={p.image} alt={`${p.brand} ${p.name}`} fill priority sizes="(max-width:768px) 100vw, 50vw" className="kenburns-soft object-cover" /></div>
        <div className="grid content-start gap-4 animate-rise [animation-delay:120ms]">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-neutral-500">{p.brand} · {p.size}</p>
          <h1 className="font-head text-3xl font-extrabold leading-tight md:text-4xl">{p.name}</h1>
          <p className="text-amber-500">{"★".repeat(Math.round(p.rating))}<span className="ml-2 text-sm text-neutral-500">{p.rating} · {p.reviews.toLocaleString()} reviews</span></p>
          <p className="text-2xl font-bold tabular-nums">{money(p.price)}{p.compareAt && <s className="ml-3 text-base font-normal text-neutral-500">{money(p.compareAt)}</s>}</p>
          <p><b>Best for:</b> {p.bestFor}</p>
          <div className="flex flex-wrap gap-1.5">{[...p.skinTypes.map((s) => `${s} skin`), ...p.concerns].map((c) => <span key={c} className="rounded-full bg-rasp-soft px-2.5 py-1 text-xs text-ink">{c}</span>)}</div>
          <AddToCart slug={p.slug} />
          <p className="text-sm text-neutral-500">Ships from China · 10–18 days standard · Free over ${FREE_SHIP}</p>
          <ProductTabs p={p} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="reveal mt-20">
          <h2 className="h-section mb-6">You may <em>also like</em></h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
