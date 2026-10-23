"use client";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Product } from "@/lib/types";

export function Shelf3D({ products }: { products: Product[] }) {
  const ring = useRef<HTMLDivElement>(null);
  const st = useRef({ a: 0, v: 0, drag: false, hover: false, lastX: 0, moved: 0 });
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); loop(); } });
    if (ring.current) io.observe(ring.current);
    const loop = () => {
      if (!visible) return;
      const s = st.current;
      if (!s.drag) { s.a += s.v; s.v *= 0.94; if (!s.hover && Math.abs(s.v) < 0.05 && !reduce) s.a -= 0.12; }
      if (ring.current) ring.current.style.transform = `rotateX(-8deg) rotateY(${s.a}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  const n = products.length;
  return (
    <section className="reveal mx-auto mt-16 max-w-[1400px] px-5 text-center md:mt-24 md:px-8">
      <span className="eyebrow">The full collection</span>
      <h2 className="h-section">Spin through <em>the shelf</em></h2>
      <p className="mt-2 text-neutral-500">Drag, swipe or scroll to spin. Tap a product to view it.</p>
      <div
        className="relative mt-7 grid h-[340px] cursor-grab touch-pan-y select-none place-items-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_50%_92%,rgba(209,46,107,.22),transparent_60%),linear-gradient(180deg,#f4f2f3,#fde3ec)] pb-16 [perspective:1500px] active:cursor-grabbing md:h-[420px] dark:border-white/10 dark:bg-[radial-gradient(ellipse_at_50%_92%,rgba(255,92,149,.25),transparent_60%),linear-gradient(180deg,#1b171d,#3a1428)]"
        onPointerDown={(e) => { const s = st.current; s.drag = true; s.lastX = e.clientX; s.moved = 0; s.v = 0; }}
        onPointerMove={(e) => { const s = st.current; if (!s.drag) return; const dx = e.clientX - s.lastX; s.lastX = e.clientX; s.moved += Math.abs(dx); s.a += dx * 0.35; s.v = dx * 0.35; }}
        onPointerUp={() => (st.current.drag = false)}
        onPointerLeave={() => { st.current.drag = false; st.current.hover = false; }}
        onPointerEnter={() => (st.current.hover = true)}
        onWheel={(e) => { st.current.v += -(Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.04; }}
        onClickCapture={(e) => { if (st.current.moved > 6) { e.preventDefault(); e.stopPropagation(); st.current.moved = 0; } }}
      >
        <div ref={ring} className="relative h-[150px] w-[108px] [--r:220px] md:[--r:300px] [transform-style:preserve-3d] md:h-[196px] md:w-[140px]">
          {products.map((p, i) => (
            <Link key={p.slug} href={`/product/${p.slug}`} aria-label={p.name} draggable={false}
              className="absolute inset-0 grid grid-rows-[1fr_auto] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_30px_-20px_rgba(0,0,0,.35)] [backface-visibility:hidden] dark:border-white/10 dark:bg-[#151217]"
              style={{ transform: `rotateY(${(i * 360) / n}deg) translateZ(var(--r))` }}>
              <span className="relative"><Image src={p.image} alt="" fill sizes="140px" className="pointer-events-none object-cover" draggable={false} /></span>
              <small className="py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">{p.brand}</small>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3.5 text-xs uppercase tracking-widest text-neutral-500">
          <button onClick={() => (st.current.v += 4.2)} aria-label="Spin left" className="grid h-10 w-10 place-items-center rounded-full bg-brand text-lg text-white shadow-lg">‹</button>
          <span className="hidden sm:inline">Drag to explore</span>
          <button onClick={() => (st.current.v -= 4.2)} aria-label="Spin right" className="grid h-10 w-10 place-items-center rounded-full bg-brand text-lg text-white shadow-lg">›</button>
        </div>
      </div>
    </section>
  );
}
