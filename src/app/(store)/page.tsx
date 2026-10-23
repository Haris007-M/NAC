import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Rail } from "@/components/Rail";
import { ProductCard } from "@/components/ProductCard";
import { BrandFilm } from "@/components/BrandFilm";
import { Shelf3D } from "@/components/Shelf3D";
import { PostCard } from "@/components/PostCard";
import { getPosts, getProducts } from "@/lib/queries";
import { REVIEWS } from "@/lib/data";
import { CATEGORIES, CONCERNS, shopHref } from "@/lib/utils";

const STEPS = [
  ["Cleanse", "Low-pH gel to start clean", "cosrx-low-ph-gel"],
  ["Treat", "Snail 96 for hydration", "cosrx-snail-96"],
  ["Moisturize", "Ceramides lock it in", "aestura-atobarrier-365"],
  ["Protect", "SPF50+ every morning", "boj-relief-sun"],
] as const;

export default async function Home() {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);
  const best = [...products].sort((a, b) => b.reviews - a.reviews);
  const img = (slug: string) => products.find((p) => p.slug === slug)?.image ?? "";

  return (
    <>
      <Hero />
      <Marquee />

      {/* category circles */}
      <section className="reveal mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-8">
        <h2 className="h-section mb-6">Shop by <em>category</em></h2>
        <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-2 pb-3 pt-3 md:justify-between">
          {[{ key: "", title: "All", image: "/img/cosrx-snail-96.webp" }, ...CATEGORIES, ...CONCERNS.slice(0, 3).map((c) => ({ key: "c:" + c.key, title: c.key, image: c.image }))].map((c) => (
            <Link key={c.title} href={c.key.startsWith("c:") ? shopHref({ concern: c.key.slice(2) }) : c.key ? shopHref({ cat: c.key }) : "/shop"} className="group grid w-28 flex-none snap-start justify-items-center gap-2.5">
              <span className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-transparent ring-offset-4 transition group-hover:-translate-y-1 group-hover:ring-rasp dark:ring-offset-[#0e0c0f]"><Image src={c.image} alt="" fill sizes="112px" className="object-cover" /></span>
              <b className="text-center text-[11px] uppercase tracking-[.14em]">{c.title.split(" ")[0]}</b>
            </Link>
          ))}
        </div>
      </section>

      <Rail eyebrow="Most loved" title={<>Best<em>sellers</em></>}>
        {best.map((p, i) => <div key={p.slug} className="snap-start"><ProductCard p={p} priority={i < 2} /></div>)}
      </Rail>

      {/* editorial split */}
      <section className="reveal mt-16 grid gap-1 md:mt-24 md:grid-cols-2">
        {[
          { href: shopHref({ cat: "Serum" }), img: "/img/boj-glow-serum-wide.webp", eye: "The glow edit", h: "Serums that", em: "show up", p: "Propolis, niacinamide and snail mucin for bright, bouncy skin.", cta: "Shop serums" },
          { href: shopHref({ cat: "Sun & Barrier" }), img: "/img/aestura-atobarrier-365-wide.webp", eye: "Sun season", h: "Barrier first.", em: "Always.", p: "Ceramide creams and SPF50+ sunscreens for calm, protected skin.", cta: "Shop sun care" },
        ].map((e) => (
          <Link key={e.eye} href={e.href} className="group relative flex min-h-[420px] items-end overflow-hidden p-7 text-white md:min-h-[clamp(420px,52vw,640px)] md:p-12">
            <Image src={e.img} alt="" fill sizes="50vw" className="parallax-img object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-black/65" />
            <div className="relative grid max-w-md gap-3">
              <span className="eyebrow !text-white">{e.eye}</span>
              <h3 className="font-head text-[clamp(28px,3.4vw,46px)] font-extrabold uppercase leading-[.95]">{e.h} <em className="font-serif font-medium normal-case">{e.em}</em></h3>
              <p className="opacity-90">{e.p}</p>
              <span className="btn-ghost w-fit !border-white !bg-white !text-ink">{e.cta}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* concerns */}
      <section className="reveal mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-8">
        <span className="eyebrow">Find your fix</span>
        <h2 className="h-section mb-6">Shop by <em>concern</em></h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CONCERNS.map((c) => (
            <Link key={c.key} href={shopHref({ concern: c.key })} className="reveal-scale group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg p-4 text-white">
              <Image src={c.image} alt="" fill sizes="(max-width:700px) 50vw, 16vw" className="kenburns-soft object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-black/75" />
              <div className="absolute inset-0 bg-brand opacity-0 transition duration-500 group-hover:opacity-55" />
              <b className="relative font-head text-base font-extrabold uppercase leading-none">{c.label}</b>
              <small className="relative mt-1 opacity-80">{products.filter((p) => p.concerns.includes(c.key)).length} products</small>
            </Link>
          ))}
        </div>
      </section>

      <BrandFilm />

      {/* routine band */}
      <section className="relative mt-16 overflow-hidden bg-[#0d0a0f] text-white md:mt-24" style={{ backgroundImage: "radial-gradient(circle at 25% 30%,rgba(255,79,143,.35),transparent 40%),radial-gradient(circle at 80% 75%,rgba(123,75,214,.4),transparent 45%)" }}>
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 md:grid-cols-[1fr_1.1fr] md:px-8 md:py-28">
          <div>
            <span className="eyebrow !text-rasp-light">The NAC routine</span>
            <h2 className="font-head text-[clamp(32px,5vw,72px)] font-extrabold uppercase leading-[.92]">Four steps.<em className="block font-serif font-medium normal-case text-rasp-light">Real results.</em></h2>
            <p className="mt-3 max-w-[44ch] text-white/75">Our editors&apos; simple morning and night routine.</p>
            <Link href="/journal/korean-skincare-routine-for-beginners" className="btn-ghost mt-5 !border-white !bg-white !text-ink">Read the guide</Link>
          </div>
          <div className="grid gap-2.5">
            {STEPS.map(([t, s, slug], i) => (
              <Link key={t} href={`/product/${slug}`} className="reveal grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-5 py-4 transition hover:border-transparent hover:bg-white/10 hover:shadow-[inset_3px_0_0_#ff4f8f]">
                <span className="font-head text-3xl font-extrabold text-white/30">0{i + 1}</span>
                <span><b className="block uppercase tracking-wide">{t}</b><small className="text-white/65">{s}</small></span>
                <span className="relative h-14 w-14 overflow-hidden rounded-lg"><Image src={img(slug)} alt="" fill sizes="56px" className="object-cover" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Shelf3D products={products} />

      <Rail eyebrow="Real routines" title={<>What our <em>customers say</em></>}>
        {REVIEWS.map((r) => (
          <div key={r.name} className="grid snap-start content-start gap-2.5 rounded-xl border border-line p-5 dark:border-white/10 dark:bg-[#151217]">
            <span className="text-amber-500">★★★★★</span><p>&ldquo;{r.text}&rdquo;</p><small className="text-neutral-500"><b>{r.name}</b> · {r.product}</small>
          </div>
        ))}
      </Rail>

      <Rail eyebrow="The journal" title={<>Skin <em>school</em></>} action={<Link href="/journal" className="btn-primary !bg-none !bg-ink">All articles</Link>}>
        {posts.map((p) => <div key={p.slug} className="snap-start"><PostCard post={p} products={products} /></div>)}
      </Rail>

      <section className="reveal mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-8">
        <span className="eyebrow">#NACglow</span>
        <h2 className="h-section mb-6">Tag us <em>@nacosmetics</em></h2>
      </section>
      <div className="reveal grid grid-cols-3 gap-1 md:grid-cols-6">
        {products.slice(0, 6).map((p) => (
          <Link key={p.slug} href={`/product/${p.slug}`} className="group relative aspect-square overflow-hidden">
            <Image src={p.image} alt={p.name} fill sizes="(max-width:700px) 33vw, 16vw" className="object-cover transition duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 grid place-items-center bg-ink/55 text-xs font-bold uppercase tracking-widest text-white opacity-0 transition group-hover:opacity-100">Shop the look</span>
          </Link>
        ))}
      </div>
    </>
  );
}
