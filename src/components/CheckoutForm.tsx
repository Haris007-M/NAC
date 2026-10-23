"use client";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { useState, useTransition } from "react";
import { createOrder, type OrderInput } from "@/app/actions";
import { useCart } from "./CartProvider";
import { money } from "@/lib/utils";

export function CheckoutForm() {
  const { lines, products, subtotal, shipping, clear } = useCart();
  const [ship, setShip] = useState<"std" | "exp">("std");
  const [pay, setPay] = useState<OrderInput["payment"]>("card");
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const sh = shipping(ship === "exp");

  if (done) return (
    <div className="mx-auto mt-16 max-w-xl rounded-xl border border-line p-10 text-center"><h1 className="font-head text-3xl font-extrabold">Thank you!</h1><p className="mt-3 text-neutral-500">Order <b>{done}</b> is confirmed. We&apos;ll email your tracking number as soon as it ships.</p><Link href="/shop" className="btn-primary mt-6">Keep shopping</Link></div>
  );
  if (!lines.length) return <div className="mx-auto mt-16 max-w-xl rounded-xl border border-dashed border-line p-12 text-center text-neutral-500">Your bag is empty.<br /><Link href="/shop" className="btn-primary mt-5">Start shopping</Link></div>;

  const field = "grid gap-1 text-[13px] font-semibold";
  const input = "rounded-lg border border-line bg-transparent px-3 py-2.5 font-normal outline-none focus:border-rasp dark:border-white/15";
  return (
    <form
      className="mx-auto mt-8 grid max-w-[1200px] gap-7 px-5 md:px-8 lg:grid-cols-[1.4fr_1fr]"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const g = (k: string) => String(f.get(k) ?? "");
        start(async () => {
          const r = await createOrder({ email: g("email"), firstName: g("fn"), lastName: g("ln"), phone: g("phone"), address: g("address"), city: g("city"), postalCode: g("pc"), country: g("country"), shipping: ship, payment: pay, lines });
          if (r.ok && "orderId" in r) { clear(); setDone(r.orderId!); } else setErr(r.message ?? "Something went wrong.");
        });
      }}
    >
      <div className="rounded-2xl border border-line p-6 dark:border-white/10">
        <h1 className="mb-4 font-head text-2xl font-extrabold">Shipping details</h1>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className={field}>First name<input name="fn" required className={input} /></label>
          <label className={field}>Last name<input name="ln" required className={input} /></label>
          <label className={`${field} sm:col-span-2`}>Email<input name="email" type="email" required className={input} /></label>
          <label className={`${field} sm:col-span-2`}>Address<input name="address" required className={input} /></label>
          <label className={field}>City<input name="city" required className={input} /></label>
          <label className={field}>Postal code<input name="pc" required className={input} /></label>
          <label className={field}>Country<select name="country" className={input}>{["Pakistan", "United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Canada", "Australia", "Other"].map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className={field}>Phone<input name="phone" type="tel" className={input} /></label>
        </div>
        <h3 className="mb-2.5 mt-6 font-bold">Delivery</h3>
        {([["std", `Standard, 10–18 days · ${subtotal >= 49 ? "Free" : "$4.99"}`], ["exp", "Express, 5–9 days · $12.99"]] as const).map(([v, t]) => (
          <label key={v} className="mb-2 flex cursor-pointer items-center gap-2.5 rounded-lg border border-line px-3 py-2.5 text-sm dark:border-white/15"><input type="radio" className="accent-rasp" checked={ship === v} onChange={() => setShip(v)} />{t}</label>
        ))}
        <h3 className="mb-2.5 mt-6 font-bold">Payment</h3>
        {([["card", "Credit / debit card"], ["paypal", "PayPal"], ["jazzcash", "JazzCash"], ["easypaisa", "Easypaisa"], ["cod", "Cash on delivery (selected countries)"]] as const).map(([v, t]) => (
          <label key={v} className="mb-2 flex cursor-pointer items-center gap-2.5 rounded-lg border border-line px-3 py-2.5 text-sm dark:border-white/15"><input type="radio" className="accent-rasp" checked={pay === v} onChange={() => setPay(v)} />{t}</label>
        ))}
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        <button disabled={pending} className="btn-primary mt-4 w-full justify-center">{pending ? "Placing order…" : `Place order · ${money(subtotal + sh)}`}</button>
      </div>
      <div className="self-start rounded-2xl border border-line p-6 dark:border-white/10">
        <h3 className="mb-4 font-bold">Order summary</h3>
        <div className="space-y-3">
          {lines.map((l) => { const p = products.find((x) => x.slug === l.slug); if (!p) return null; return (
            <div key={l.slug} className="grid grid-cols-[56px_1fr_auto] items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-lg"><Image src={p.image} alt="" fill sizes="56px" className="object-cover" /></div>
              <div className="min-w-0"><p className="truncate text-sm font-semibold">{p.name}</p><p className="text-xs text-neutral-500">Qty {l.qty}</p></div>
              <b className="tabular-nums">{money(p.price * l.qty)}</b>
            </div>); })}
        </div>
        <hr className="my-4 border-line dark:border-white/10" />
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between text-sm"><span>Shipping</span><span>{sh ? money(sh) : "Free"}</span></div>
        <div className="mt-1.5 flex justify-between text-lg font-bold"><span>Total</span><span>{money(subtotal + sh)}</span></div>
      </div>
    </form>
  );
}
