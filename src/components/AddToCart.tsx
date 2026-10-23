"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";

export function AddToCart({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { add, notify } = useCart();
  const [q, setQ] = useState(1);
  if (compact) return <button onClick={() => { add(slug); notify("Added to bag"); }} className="btn-primary">Add</button>;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex overflow-hidden rounded-full border border-line dark:border-white/15">
        <button className="h-11 w-11" onClick={() => setQ(Math.max(1, q - 1))} aria-label="Decrease">−</button>
        <span className="grid min-w-8 place-items-center tabular-nums">{q}</span>
        <button className="h-11 w-11" onClick={() => setQ(q + 1)} aria-label="Increase">+</button>
      </span>
      <button onClick={() => { add(slug, q); notify("Added to bag"); }} className="btn-primary">Add to bag</button>
    </div>
  );
}
