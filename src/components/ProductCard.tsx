"use client";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { money } from "@/lib/utils";
import { useCart } from "./CartProvider";
import { track } from "@/lib/track";

export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const { add, notify, wishlist, toggleWish } = useCart();
  const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  const saved = wishlist.includes(p.slug);
  return (
    <article className="group" itemScope itemType="https://schema.org/Product">
      <div className="sheen relative aspect-[4/5] overflow-hidden rounded-md bg-sunk transition-shadow duration-500 group-hover:shadow-[0_24px_40px_-24px_rgba(209,46,107,.45)]">
        <Link href={`/product/${p.slug}`} aria-label={p.name} onClick={() => track("product_click", { product: p.slug })}>
          <Image src={p.image} alt={`${p.brand} ${p.name}`} fill priority={priority} sizes="(max-width:700px) 50vw, 25vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.08]" />
        </Link>
        {(off || p.tag) && (
          <span className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px] font-extrabold uppercase tracking-[.14em] ${off ? "bg-rasp text-white" : "bg-ink text-white"}`}>{off ? `−${off}%` : p.tag}</span>
        )}
        <button onClick={() => toggleWish(p.slug)} aria-label="Save to wishlist" className={`absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 transition hover:scale-110 ${saved ? "text-rasp" : "text-ink"}`}>{saved ? "♥" : "♡"}</button>
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-1.5 transition-transform duration-300 md:translate-y-[130%] md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
          <button onClick={() => { add(p.slug); notify(`Added: ${p.name}`); }} className="flex-1 rounded bg-ink py-3 text-[11px] font-extrabold uppercase tracking-[.14em] text-white transition hover:bg-brand">Quick add +</button>
          <Link href={`/product/${p.slug}`} className="hidden flex-1 rounded bg-white/95 py-3 text-center text-[11px] font-extrabold uppercase tracking-[.14em] text-ink transition hover:bg-brand hover:text-white md:block">View</Link>
        </div>
      </div>
      <div className="space-y-1 px-0.5 pt-3">
        <p className="text-[10.5px] font-bold uppercase tracking-[.16em] text-neutral-500" itemProp="brand">{p.brand}</p>
        <h3 className="text-sm font-semibold leading-snug" itemProp="name"><Link href={`/product/${p.slug}`} onClick={() => track("product_click", { product: p.slug })}>{p.name}</Link></h3>
        <p className="text-xs text-neutral-500">{p.concerns.slice(0, 2).join(" · ")}</p>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="tabular-nums"><b>{money(p.price)}</b>{p.compareAt && <s className="ml-2 text-sm text-neutral-500">{money(p.compareAt)}</s>}</p>
          <span className="text-xs text-amber-500">★ {p.rating} <small className="text-neutral-500">({p.reviews.toLocaleString()})</small></span>
        </div>
      </div>
    </article>
  );
}
