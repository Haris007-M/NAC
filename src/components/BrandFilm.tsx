"use client";
import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "./Logo";

/* A 24s looping brand film built entirely with HTML + CSS keyframes (see globals.css .film-*). */
export function BrandFilm() {
  const [paused, setPaused] = useState(false);
  const bg = (u: string) => ({ backgroundImage: `url('${u}')` });
  return (
    <section className="reveal mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-8">
      <span className="eyebrow">The NAC film</span>
      <h2 className="h-section mb-6">Seoul to <em>your shelf</em></h2>
      <div className={`film ${paused ? "film-paused" : ""}`}>
        <div className="film-sc" style={{ animationDelay: "0s" }}>
          <div className="film-kb" style={bg("/img/hero-model-wide.webp")} /><div className="film-ov" />
          <div className="film-cap film-left"><small>NACosmetics presents</small><h3>Skin that <em>glows</em></h3></div>
        </div>
        <div className="film-sc" style={{ animationDelay: "-20s" }}>
          <div className="absolute inset-0 grid grid-cols-3 gap-1.5 bg-[#efe7e2]">
            {["anua-heartleaf-foam", "cosrx-low-ph-gel", "skinever-cleanser"].map((id, k) => (
              <div key={id} className="film-tile" style={{ ...bg(`/img/${id}.webp`), animationDelay: `calc(-20s + ${k * 0.25}s)` }} />
            ))}
          </div>
          <div className="film-cap film-bottom"><small>Step 01</small><h3>Cleanse, <em>gently</em></h3></div>
        </div>
        <div className="film-sc" style={{ animationDelay: "-16s" }}>
          <div className="film-kb" style={bg("/img/anua-niacinamide-txa-wide.webp")} /><div className="film-ov" />
          <div className="film-cap film-left"><small>Step 02</small><h3>Treat <em>dark spots</em></h3><p>10% Niacinamide + 4% TXA</p></div>
        </div>
        <div className="film-sc" style={{ animationDelay: "-12s" }}>
          <div className="absolute inset-0 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            <div className="film-kb !relative" style={bg("/img/cosrx-snail-96.webp")} />
            <div className="film-kb !relative" style={bg("/img/boj-glow-serum.webp")} />
          </div>
          <div className="film-cap film-bottom"><small>Step 03</small><h3>Hydrate & <em>glow</em></h3></div>
        </div>
        <div className="film-sc" style={{ animationDelay: "-8s" }}>
          <div className="film-kb" style={bg("/img/boj-relief-sun-wide.webp")} /><div className="film-ov" />
          <div className="film-cap film-left"><small>Step 04</small><h3>Protect <em>daily</em></h3><p>SPF50+ PA++++</p></div>
        </div>
        <div className="film-sc" style={{ animationDelay: "-4s" }}>
          <div className="absolute inset-0 grid place-content-center justify-items-center gap-2.5 bg-[radial-gradient(circle_at_50%_40%,rgba(209,46,107,.45),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(123,75,214,.45),transparent_50%),#0d0a0f] p-5 text-center">
            <div className="film-logo"><LogoMark id="filmg" className="h-20 w-20" /></div>
            <h3 className="font-serif text-6xl font-semibold tracking-[.14em] md:text-8xl">NAC</h3>
            <small className="text-[11px] font-bold tracking-[.5em]">SKINCARE + COSMETICS</small>
            <p className="my-2 text-sm opacity-75">100% authentic Korean skincare · Shipped worldwide</p>
            <Link href="/shop" className="btn-primary">Shop the collection</Link>
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-3.5 z-10 flex items-center gap-3 text-xs tabular-nums">
          <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play film" : "Pause film"} className="grid h-9 w-9 place-items-center rounded-full bg-white/20 backdrop-blur">{paused ? "▶" : "❚❚"}</button>
          <div className="h-[3px] flex-1 overflow-hidden rounded bg-white/25"><i className="film-bar block h-full w-full origin-left bg-brand" /></div>
          <span>0:24</span>
        </div>
      </div>
    </section>
  );
}
