import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping, Returns & FAQ", description: "NACosmetics shipping times, rates, returns policy and frequently asked questions." };
const FAQ = [
  ["Are your products authentic?", "Yes. We buy from authorised distributors and check every batch for batch codes and expiry dates."],
  ["How long does delivery take?", "Most orders arrive in 10–18 business days with standard shipping, or 5–9 days with express."],
  ["Which countries do you ship to?", "We ship worldwide. Available countries are shown at checkout."],
  ["How do I choose products for my skin?", "Use the skin type and concern filters in the shop, or read our journal guides."],
  ["Can I track my order?", "Yes. You get a tracking number by email as soon as your parcel leaves the warehouse."],
];

export default function Help() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 md:px-8">
      <h1 className="h-section mt-10 !text-[clamp(30px,4.5vw,52px)]">Shipping, returns <em>& FAQ</em></h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-line p-6 dark:border-white/10">
          <h3 className="mb-2 text-lg font-bold">Shipping</h3>
          <p className="mb-3 text-neutral-500">All orders ship from our warehouse in China with tracking.</p>
          {[["Standard (10–18 business days)", "$4.99"], ["Express (5–9 business days)", "$12.99"], ["Orders over $49", "Free standard"]].map(([a, b]) => <div key={a} className="flex justify-between py-1"><span>{a}</span><b>{b}</b></div>)}
          <p className="mt-3 text-xs text-neutral-500">Import duties and taxes may apply depending on your country.</p>
        </div>
        <div className="rounded-2xl border border-line p-6 dark:border-white/10"><h3 className="mb-2 text-lg font-bold">Returns</h3><p className="text-neutral-500">Unopened products can be returned within 30 days of delivery. If an item arrives damaged, send us a photo within 7 days and we&apos;ll replace it free of charge.</p></div>
      </div>
      <div className="mt-10 space-y-2.5">{FAQ.map(([q, a]) => <details key={q} className="rounded-xl border border-line px-5 py-4 dark:border-white/10"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-2 text-neutral-500">{a}</p></details>)}</div>
    </div>
  );
}
