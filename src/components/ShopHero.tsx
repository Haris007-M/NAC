import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

type Theme = { eyebrow: string; sub: string; bg: string; glow: [string, string]; wide?: string };
const THEMES: Record<string, Theme> = {
  all: { eyebrow: "The full edit", sub: "Every best-seller in one place. Filter by skin type, concern, brand and price.", bg: "#1a0f17", glow: ["rgba(209,46,107,.45)", "rgba(123,75,214,.45)"], wide: "/img/hero-model-wide.webp" },
  Cleanser: { eyebrow: "Step 01 · Cleanse", sub: "Low-pH foams and gels that clear pores without stripping your barrier.", bg: "#0f1a17", glow: ["rgba(95,154,106,.45)", "rgba(31,143,214,.35)"] },
  Serum: { eyebrow: "Step 02 · Treat", sub: "Niacinamide, TXA, propolis and snail mucin for spots, glow and hydration.", bg: "#1c140c", glow: ["rgba(197,138,51,.45)", "rgba(209,46,107,.4)"], wide: "/img/anua-niacinamide-txa-wide.webp" },
  "Sun & Barrier": { eyebrow: "Step 03 · Protect", sub: "SPF50+ PA++++ sunscreens and ceramide creams for calm, protected skin.", bg: "#0e1320", glow: ["rgba(91,127,163,.5)", "rgba(255,140,90,.35)"], wide: "/img/boj-relief-sun-wide.webp" },
};

/* Animated category banner: drifting backdrop photo, glowing orbs, and a floating 3-product collage
   with a light sweep. Pure HTML/CSS (no video), so it stays light. */
export function ShopHero({ title, cat, concern, products }: { title: string; cat?: string; concern?: string; products: Product[] }) {
  const t = THEMES[cat ?? ""] ?? THEMES.all;
  const pool = products.filter((p) => (cat ? p.category === cat : concern ? p.concerns.includes(concern) : true)).sort((a, b) => b.reviews - a.reviews);
  const picks = (pool.length ? pool : products).slice(0, 3);
  const sub = concern && !cat ? `Products picked for ${concern.toLowerCase()} — ${pool.length} to choose from.` : t.sub;
  const layout = ["left-[4%] top-[18%] w-[38%] rotate-[-6deg]", "left-[31%] top-[4%] z-10 w-[44%]", "right-[2%] top-[24%] w-[36%] rotate-[6deg]"];

  return (
    <section className="relative isolate overflow-hidden text-white" style={{ background: t.bg }}>
      {/* drifting backdrop */}
      {t.wide && <Image src={t.wide} alt="" fill priority sizes="100vw" className="kenburns -z-10 object-cover opacity-25 mix-blend-luminosity" />}
      <div className="absolute -left-32 -top-32 -z-10 h-[420px] w-[420px] rounded-full blur-3xl animate-[orb_14s_ease-in-out_infinite]" style={{ background: t.glow[0] }} />
      <div className="absolute -bottom-40 right-[10%] -z-10 h-[480px] w-[480px] rounded-full blur-3xl animate-[orb_18s_ease-in-out_infinite_reverse]" style={{ background: t.glow[1] }} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-12 md:grid-cols-[1.1fr_1fr] md:px-8 md:py-16">
        <div className="animate-rise">
          <p className="text-sm text-white/60"><Link href="/" className="link-grow">Home</Link> / Shop</p>
          <span className="mt-5 block text-[11px] font-bold uppercase tracking-[.22em] text-rasp-light">{t.eyebrow}</span>
          <h1 className="mt-2 font-head text-[clamp(36px,6vw,84px)] font-extrabold uppercase leading-[.9]">{title}</h1>
          <p className="mt-4 max-w-[46ch] text-white/70">{sub}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            {["100% authentic", "Ships worldwide", "Free over $49"].map((b) => <span key={b} className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur">{b}</span>)}
          </div>
        </div>

        <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
          {picks.map((p, i) => (
            <Link key={p.slug} href={`/product/${p.slug}`} className={`group absolute ${layout[i]} transition-transform duration-500 hover:z-20 hover:scale-105`}>
              <span className="float-soft block" style={{ animationDelay: `${-i * 2}s` }}>
              <span className="sheen sheen-auto relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_60px_-25px_rgba(0,0,0,.8)] animate-rise" style={{ animationDelay: `${150 + i * 120}ms` }}>
                <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 45vw, 260px" className="kenburns-soft object-cover" />
              </span>
              </span>
              <span className="mt-2 block truncate text-center text-[11px] font-bold uppercase tracking-widest text-white/70 opacity-0 transition group-hover:opacity-100">{p.brand}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
