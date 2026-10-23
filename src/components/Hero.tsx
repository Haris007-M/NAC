"use client";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  { img: "/img/hero-model-wide.webp", pos: "50% 30%", eye: "Authentic Korean skincare", h: "Glass skin,", em: "made simple.", p: "Best-selling K-beauty from Anua, COSRX, Beauty of Joseon and Aestura, shipped worldwide.", href: "/shop", lbl: "NAC", model: true },
  { img: "/img/anua-niacinamide-txa-wide.webp", pos: "55% 50%", eye: "Viral serums", h: "Fade spots,", em: "find your glow.", p: "Niacinamide, TXA, propolis and 96% snail mucin with thousands of 5-star reviews.", href: "/shop?cat=Serum", lbl: "Serums" },
  { img: "/img/boj-relief-sun-wide.webp", pos: "60% 50%", eye: "SPF50+ PA++++", h: "Sun season,", em: "every season.", p: "Relief Sun and Atobarrier 365. Daily protection and barrier repair.", href: "/shop?cat=Sun+%26+Barrier", lbl: "Sun & barrier" },
];
const DUR = 7000;

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % SLIDES.length), DUR);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <section className="relative h-[680px] overflow-hidden bg-[#efe7e2] md:h-[clamp(560px,82vh,780px)]">
      {SLIDES.map((s, k) => {
        const on = k === i;
        const Tag = k === 0 ? "h1" : "h2";
        return (
          <div key={s.img} className={`absolute inset-0 transition-opacity duration-1000 ${on ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!on}>
            <Image src={s.img} alt="" fill priority={k === 0} sizes="100vw" className={`object-cover ${on ? "kenburns" : "scale-110"}`} style={{ objectPosition: s.pos }} />
            <div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(250,244,240,0)_30%,rgba(250,244,240,.9)_62%,rgba(250,244,240,.97))] ${s.model ? "md:bg-[linear-gradient(90deg,rgba(250,244,240,.95),rgba(250,244,240,.7)_26%,rgba(250,244,240,0)_40%)]" : "md:bg-[linear-gradient(90deg,rgba(250,244,240,.92),rgba(250,244,240,.75)_32%,rgba(250,244,240,0)_58%)]"}`} />
            <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-5 pb-28 md:items-center md:px-8 md:pb-28 md:pt-10">
              <div className={`grid gap-4 text-[#16101a] ${s.model ? "md:max-w-[400px]" : "md:max-w-[480px]"}`}>
                {[
                  <span key="e" className="eyebrow !text-[#16101a]">{s.eye}</span>,
                  <Tag key="h" className={`font-head font-extrabold uppercase leading-[.9] tracking-[-.04em] ${s.model ? "text-[42px] md:text-[clamp(40px,4.4vw,64px)]" : "text-[42px] md:text-[clamp(44px,5.6vw,84px)]"}`}>
                    {s.h}<em className="block font-serif font-medium normal-case tracking-tight text-rasp">{s.em}</em>
                  </Tag>,
                  <p key="p" className="max-w-[40ch] text-[15px] text-[#3d3240] md:text-[17px]">{s.p}</p>,
                  <div key="c" className="flex flex-wrap gap-2.5">
                    <Link href={s.href} className="btn-primary !bg-none !bg-ink">Shop now</Link>
                    <Link href="/journal" className="btn-ghost !border-white !bg-white !text-ink">Skin school</Link>
                  </div>,
                ].map((el, n) => (
                  <div key={n} className={`transition-all duration-700 ${on ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`} style={{ transitionDelay: on ? `${n * 100}ms` : "0ms" }}>{el}</div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-5">
        <div className="mx-auto flex max-w-[1400px] items-end gap-4 px-5 md:px-8">
          <div className="grid flex-1 grid-cols-3 gap-3.5">
            {SLIDES.map((s, k) => (
              <button key={s.lbl} onClick={() => setI(k)} className="grid gap-2 text-left text-[11px] font-bold uppercase tracking-[.16em] text-[#16101a]">
                <span className="hidden md:block">0{k + 1} · {s.lbl}</span>
                <i className="block h-0.5 overflow-hidden bg-black/15">
                  <b key={`${i}-${k}`} className="block h-full bg-brand" style={k === i ? { animation: `progress ${DUR}ms linear forwards`, animationPlayState: paused ? "paused" : "running" } : { width: k < i ? "100%" : 0 }} />
                </i>
              </button>
            ))}
          </div>
          <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className="grid h-11 w-11 flex-none place-items-center rounded-full border-[1.5px] border-[#16101a] text-sm text-[#16101a]">{paused ? "▶" : "❚❚"}</button>
        </div>
      </div>
    </section>
  );
}
