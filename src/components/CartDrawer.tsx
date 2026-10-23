"use client";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { FREE_SHIP, money } from "@/lib/utils";

export function CartDrawer() {
  const { open, setOpen, lines, products, setQty, remove, subtotal, shipping, toast } = useCart();
  const left = Math.max(0, FREE_SHIP - subtotal);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [setOpen]);

  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[90] bg-black/45 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`fixed inset-y-0 right-0 z-[91] flex w-full max-w-[420px] flex-col bg-white transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] dark:bg-[#151217] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 dark:border-white/10">
          <h3 className="font-head text-lg font-extrabold">Your bag</h3>
          <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-line dark:border-white/10">✕</button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {lines.length ? (
            <>
              <div>
                <p className="mb-1.5 text-sm">{left ? <>You&apos;re <b>{money(left)}</b> away from free shipping</> : <>You&apos;ve unlocked <b>free shipping</b></>}</p>
                <div className="h-1.5 overflow-hidden rounded bg-sunk dark:bg-white/10"><i className="block h-full bg-brand" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} /></div>
              </div>
              {lines.map((l) => {
                const p = products.find((x) => x.slug === l.slug);
                if (!p) return null;
                return (
                  <div key={l.slug} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-sunk"><Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" /></div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">{p.brand}</p>
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="inline-flex overflow-hidden rounded-full border border-line dark:border-white/10">
                          <button className="h-8 w-8" onClick={() => setQty(p.slug, l.qty - 1)} aria-label="Decrease">−</button>
                          <span className="grid min-w-7 place-items-center text-sm tabular-nums">{l.qty}</span>
                          <button className="h-8 w-8" onClick={() => setQty(p.slug, l.qty + 1)} aria-label="Increase">+</button>
                        </span>
                        <button className="text-xs text-neutral-500 underline" onClick={() => remove(p.slug)}>Remove</button>
                      </div>
                    </div>
                    <b className="tabular-nums">{money(p.price * l.qty)}</b>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-line p-10 text-center text-neutral-500">Your bag is empty.</div>
          )}
        </div>
        {lines.length > 0 && (
          <div className="space-y-2 border-t border-line px-5 py-4 dark:border-white/10">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span className="tabular-nums">{money(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping() ? money(shipping()) : "Free"}</span></div>
            <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="tabular-nums">{money(subtotal + shipping())}</span></div>
            <Link href="/checkout" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">Checkout</Link>
            <button onClick={() => setOpen(false)} className="btn-ghost w-full justify-center">Continue shopping</button>
          </div>
        )}
      </aside>
      {toast && <div className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">{toast}</div>}
    </>
  );
}
