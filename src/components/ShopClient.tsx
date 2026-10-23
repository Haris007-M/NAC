"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { CATEGORIES, CONCERNS } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { SortMenu, type Sort } from "./SortMenu";

const uniq = (ps: Product[], k: "skinTypes" | "concerns" | "brand") => [...new Set(ps.flatMap((p) => ([] as string[]).concat(p[k])))].sort();

export function ShopClient({ products, initial }: { products: Product[]; initial: { cat?: string; concern?: string; q?: string } }) {
  const [q, setQ] = useState(initial.q ?? "");
  const [cat, setCat] = useState<string[]>(initial.cat ? [initial.cat] : []);
  const [skin, setSkin] = useState<string[]>([]);
  const [concern, setConcern] = useState<string[]>(initial.concern ? [initial.concern] : []);
  const [brand, setBrand] = useState<string[]>([]);
  const [max, setMax] = useState(40);
  const [sort, setSort] = useState<Sort>("pop");
  const [cols, setCols] = useState(4);
  const [drawer, setDrawer] = useState(false);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    const r = products.filter((p) =>
      (!s || `${p.name} ${p.brand} ${p.bestFor} ${p.concerns.join(" ")} ${p.category}`.toLowerCase().includes(s)) &&
      (!cat.length || cat.includes(p.category)) && (!brand.length || brand.includes(p.brand)) &&
      (!skin.length || p.skinTypes.some((x) => skin.includes(x))) && (!concern.length || p.concerns.some((x) => concern.includes(x))) && p.price <= max);
    const by: Record<Sort, (a: Product, b: Product) => number> = {
      pop: (a, b) => b.reviews - a.reviews, rating: (a, b) => b.rating - a.rating, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...r].sort(by[sort]);
  }, [products, q, cat, skin, concern, brand, max, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const clear = () => { setQ(""); setCat([]); setSkin([]); setConcern([]); setBrand([]); setMax(40); };
  const chips = [...(q ? [["q", q]] : []), ...cat.map((v) => ["cat", v]), ...skin.map((v) => ["skin", v]), ...concern.map((v) => ["concern", v]), ...brand.map((v) => ["brand", v])];
  const unchip = (k: string, v: string) => ({ q: () => setQ(""), cat: () => toggle(cat, setCat, v), skin: () => toggle(skin, setSkin, v), concern: () => toggle(concern, setConcern, v), brand: () => toggle(brand, setBrand, v) })[k as "q"]();

  const Facet = ({ label, values, arr, set }: { label: string; values: string[]; arr: string[]; set: (v: string[]) => void }) => (
    <div className="border-b border-line py-4 dark:border-white/10">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-neutral-500">{label}</h4>
      {values.map((v) => (
        <label key={v} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
          <input type="checkbox" className="accent-rasp" checked={arr.includes(v)} onChange={() => toggle(arr, set, v)} /> {v}
        </label>
      ))}
    </div>
  );
  const gridCols = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[cols as 2 | 3 | 4];
  const quick = ["All", ...CATEGORIES.map((c) => c.key), ...CONCERNS.map((c) => c.key)];

  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
      {/* filter bar */}
      <div className="sticky top-[var(--hdr,0px)] z-30 -mx-5 transition-[top] duration-400 border-b border-line bg-white/85 px-5 py-3 backdrop-blur-xl md:-mx-8 md:px-8 dark:border-white/10 dark:bg-[#0e0c0f]/85">
        <div className="flex items-center gap-2.5">
          <button onClick={() => setDrawer(true)} className="relative inline-flex h-11 flex-none items-center gap-2 rounded-full bg-ink px-5 text-xs font-bold uppercase tracking-[.14em] text-white transition hover:bg-brand dark:bg-white dark:text-ink dark:hover:text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" strokeLinecap="round"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
            Filter
            {chips.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rasp px-1 text-[10px] text-white">{chips.length}</span>}
          </button>
          <label className="relative flex h-11 min-w-0 flex-1 items-center sm:max-w-xs">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 h-4 w-4 fill-none stroke-neutral-400 stroke-2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" className="h-full w-full rounded-full border border-line bg-sunk pl-10 pr-4 text-sm outline-none transition focus:border-rasp focus:bg-white dark:border-white/10 dark:bg-white/5" />
          </label>
          <span className="hidden whitespace-nowrap text-sm text-neutral-500 md:inline"><b className="text-ink dark:text-white">{results.length}</b> products</span>
          <div className="ml-auto hidden items-center gap-1 rounded-full border border-line p-1 lg:flex dark:border-white/10" aria-label="Grid columns">
            {[2, 3, 4].map((c) => (
              <button key={c} onClick={() => setCols(c)} aria-label={`${c} per row`} className={`grid h-8 w-9 place-items-center rounded-full transition ${cols === c ? "bg-ink text-white dark:bg-white dark:text-ink" : "text-neutral-400 hover:text-ink"}`}>
                <span className="flex gap-[3px]">{Array.from({ length: c }).map((_, i) => <i key={i} className="block h-3 w-[3px] rounded-sm bg-current" />)}</span>
              </button>
            ))}
          </div>
          <div className="hidden flex-none sm:block"><SortMenu value={sort} onChange={setSort} /></div>
        </div>
        {chips.length > 0 && (
          <div className="no-scrollbar mt-2.5 flex items-center gap-1.5 overflow-x-auto">
            {chips.map(([k, v]) => <button key={k + v} onClick={() => unchip(k, v)} className="group inline-flex flex-none items-center gap-1.5 rounded-full border border-rasp/30 bg-rasp-soft py-1 pl-3 pr-2 text-xs font-medium text-ink animate-rise">{v}<span className="grid h-4 w-4 place-items-center rounded-full bg-white text-[10px] transition group-hover:bg-rasp group-hover:text-white">✕</span></button>)}
            <button onClick={clear} className="flex-none px-2 text-xs font-semibold text-neutral-500 underline">Clear all</button>
          </div>
        )}
      </div>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-5">
        {quick.map((x) => {
          const on = (x === "All" && !cat.length && !concern.length) || cat.includes(x) || concern.includes(x);
          return <button key={x} onClick={() => { setCat([]); setConcern([]); if (CATEGORIES.some((c) => c.key === x)) setCat([x]); else if (x !== "All") setConcern([x]); }} className={`flex-none rounded-full border px-4 py-2 text-[13px] font-semibold transition duration-300 ${on ? "border-transparent bg-brand text-white shadow-[0_8px_18px_-10px_#d12e6b]" : "border-line hover:-translate-y-0.5 hover:border-ink dark:border-white/15"}`}>{x}</button>;
        })}
      </div>
      {results.length ? (
        <div className={`grid grid-cols-2 gap-x-2.5 gap-y-6 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-5 lg:gap-y-8 ${gridCols}`}>{results.map((p, i) => <div key={p.slug} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}><ProductCard p={p} priority={i < 4} /></div>)}</div>
      ) : (
        <div className="rounded-xl border border-dashed border-line p-12 text-center text-neutral-500">No products match these filters. Try removing one.</div>
      )}

      <div onClick={() => setDrawer(false)} className={`fixed inset-0 z-[91] bg-black/45 transition-opacity ${drawer ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside className={`fixed inset-y-0 left-0 z-[92] flex w-[min(380px,92vw)] flex-col bg-white transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] dark:bg-[#151217] ${drawer ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`} aria-label="Filters">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 dark:border-white/10"><b className="text-xs uppercase tracking-[.18em]">Filter & sort</b><button onClick={() => setDrawer(false)} aria-label="Close filters" className="grid h-9 w-9 place-items-center rounded-full border border-line dark:border-white/10">✕</button></div>
        <div className="flex-1 overflow-y-auto px-5">
          <div className="border-b border-line py-4 sm:hidden dark:border-white/10"><h4 className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-neutral-500">Sort by</h4><SortMenu value={sort} onChange={setSort} full /></div>
          <Facet label="Category" values={CATEGORIES.map((c) => c.key)} arr={cat} set={setCat} />
          <Facet label="Skin type" values={uniq(products, "skinTypes")} arr={skin} set={setSkin} />
          <Facet label="Concern" values={uniq(products, "concerns")} arr={concern} set={setConcern} />
          <Facet label="Brand" values={uniq(products, "brand")} arr={brand} set={setBrand} />
          <div className="py-4"><h4 className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-neutral-500">Max price: ${max}</h4><input type="range" min={10} max={40} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-rasp" aria-label="Maximum price" /></div>
        </div>
        <div className="flex gap-2.5 border-t border-line px-5 py-4 dark:border-white/10"><button onClick={clear} className="btn-ghost flex-1 justify-center">Clear</button><button onClick={() => setDrawer(false)} className="btn-primary flex-1 justify-center">Show {results.length}</button></div>
      </aside>
    </div>
  );
}
