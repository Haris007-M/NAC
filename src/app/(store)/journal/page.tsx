import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getPosts, getProducts } from "@/lib/queries";

export const metadata: Metadata = { title: "Korean Skincare Journal & Guides", description: "Research-backed Korean skincare guides: routines, ingredients, sunscreen reviews and barrier repair.", alternates: { canonical: "/journal" } };
const TOPICS = ["#KoreanSkincare", "#KBeauty", "#GlassSkin", "#SkincareRoutine", "#Sunscreen", "#Niacinamide", "#SnailMucin", "#AcneProneSkin", "#SkinBarrier", "#DarkSpots", "#OilySkin", "#SensitiveSkin"];

export default async function Journal() {
  const [posts, products] = await Promise.all([getPosts(), getProducts()]);
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
      <div className="my-10">
        <span className="eyebrow">The NAC Journal</span>
        <h1 className="h-section !text-[clamp(30px,4.5vw,56px)]">Korean skincare guides & <em>ingredient deep-dives</em></h1>
        <p className="mt-3 max-w-[60ch] text-neutral-500">Practical, research-backed advice to help you choose the right products and build a routine that works.</p>
        <div className="mt-5 flex flex-wrap gap-2">{TOPICS.map((t) => <span key={t} className="rounded-full bg-rasp-soft px-3.5 py-1.5 text-[13px] font-semibold text-rasp dark:bg-rasp/20 dark:text-rasp-light">{t}</span>)}</div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} products={products} />)}</div>
    </div>
  );
}
