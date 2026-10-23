"use client";
import { Img as Image } from "@/components/Img";
import { useEffect, useState } from "react";
import { Newsletter } from "./Newsletter";

export function WelcomePopup() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("nac-pop"); } catch {}
    if (seen) return;
    const t = setTimeout(() => { setShow(true); try { sessionStorage.setItem("nac-pop", "1"); } catch {} }, 6000);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    addEventListener("keydown", k);
    return () => { clearTimeout(t); removeEventListener("keydown", k); };
  }, []);
  if (!show) return null;
  return (
    <div role="dialog" aria-label="Welcome offer" className="fixed inset-0 z-[120] grid place-items-center p-5">
      <div className="absolute inset-0 bg-black/55" onClick={() => setShow(false)} />
      <div className="relative grid max-h-[90vh] w-full max-w-[820px] animate-popIn overflow-auto rounded-xl bg-white sm:grid-cols-2 dark:bg-[#151217]">
        <button onClick={() => setShow(false)} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink">✕</button>
        <div className="relative min-h-[220px] sm:min-h-[400px]"><Image src="/img/cosrx-snail-96.webp" alt="" fill sizes="410px" className="object-cover" /></div>
        <div className="grid content-center gap-4 p-7 sm:p-10">
          <span className="eyebrow">Welcome to NAC</span>
          <h2 className="font-head text-5xl font-extrabold uppercase leading-[.92]">Take 10%<em className="block font-serif font-medium normal-case text-rasp">off.</em></h2>
          <p className="text-neutral-500">Join the list for your first-order code (NAC10), routine tips and early access to new K-beauty drops.</p>
          <Newsletter source="popup" cta="Unlock 10% off" stack />
          <button onClick={() => setShow(false)} className="justify-self-start text-xs text-neutral-500 underline">No thanks, I&apos;ll pay full price</button>
        </div>
      </div>
    </div>
  );
}
