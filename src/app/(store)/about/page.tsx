import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About NACosmetics (NAC)", description: "NACosmetics brings proven, best-selling Korean skincare to customers worldwide." };
export default function About() {
  return (
    <article className="prose-nac mx-auto mt-12 max-w-[720px] px-5">
      <span className="eyebrow">About NAC</span>
      <h1 className="h-section mt-2">Korean skincare, <em>chosen with care</em></h1>
      <p className="mt-5">NACosmetics (NAC) brings the Korean skincare products people actually repurchase to customers everywhere. We keep our range small on purpose: every product is a proven best seller matched to a clear skin concern.</p>
      <p>We source from authorised distributors, check every batch, and ship worldwide from our warehouse in China.</p>
      <Link href="/shop" className="btn-primary mt-4">Explore the range →</Link>
    </article>
  );
}
