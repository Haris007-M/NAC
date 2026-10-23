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
    <section className="reveal mx-auto mt-16 max-w-[1400px] px-5 md:mt-20 md:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">The full collection</span>
          <h2 className="h-section">Spin through <em>the shelf</em></h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden text-sm text-neutral-500 sm:inline">Drag or swipe to spin</span>
          <button onClick={() => (st.current.v += 4.2)} aria-label="Spin left" className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-transparent hover:bg-brand hover:text-white dark:border-white/15">←</button>
          <button onClick={() => (st.current.v -= 4.2)} aria-label="Spin right" className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-transparent hover:bg-brand hover:text-white dark:border-white/15">→</button>
        </div>
      </div>
      <div
        className="relative grid h-[340px] cursor-grab touch-pan-y select-none place-items-center overflow-hidden rounded-3xl [perspective:1600px] active:cursor-grabbing md:h-[500px]"
        style={{ background: "radial-gradient(ellipse 60% 45% at 50% 100%, rgba(209,46,107,.35), transparent 70%), radial-gradient(ellipse 50% 60% at 50% 40%, rgba(123,75,214,.18), transparent 70%), #141016" }}
        onPointerDown={(e) => { const s = st.current; s.drag = true; s.lastX = e.clientX; s.moved = 0; s.v = 0; }}
        onPointerMove={(e) => { const s = st.current; if (!s.drag) return; const dx = e.clientX - s.lastX; s.lastX = e.clientX; s.moved += Math.abs(dx); s.a += dx * 0.3; s.v = dx * 0.3; }}
        onPointerUp={() => (st.current.drag = false)}
        onPointerLeave={() => { st.current.drag = false; st.current.hover = false; }}
        onPointerEnter={() => (st.current.hover = true)}
        onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) st.current.v += -e.deltaX * 0.04; }}
        onClickCapture={(e) => { if (st.current.moved > 6) { e.preventDefault(); e.stopPropagation(); st.current.moved = 0; } }}
      >
        {/* floor reflection line */}
        <div className="pointer-events-none absolute inset-x-[15%] bottom-[14%] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div ref={ring} className="relative -mt-8 h-[230px] w-[150px] [--r:210px] [transform-style:preserve-3d] md:h-[290px] md:w-[200px] md:[--r:340px]">
          {products.map((p, i) => (
            <Link key={p.slug} href={`/product/${p.slug}`} aria-label={p.name} draggable={false}
              className="group absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_50px_-25px_rgba(0,0,0,.8)] ring-1 ring-white/10 [backface-visibility:hidden]"
              style={{ transform: `rotateY(${(i * 360) / n}deg) translateZ(var(--r))` }}>
              <span className="relative flex-1 overflow-hidden bg-[#efe9e4]">
                <Image src={p.image} alt="" fill sizes="230px" loading="eager" placeholder="empty" className="pointer-events-none object-cover transition duration-700 group-hover:scale-105" draggable={false} />
              </span>
              <span className="grid gap-0.5 bg-[#151217] px-3.5 py-3 text-left text-white">
                <small className="text-[10px] font-bold uppercase tracking-[.18em] text-rasp-light">{p.brand}</small>
                <span className="truncate text-[13px] font-semibold leading-tight">{p.name}</span>
                <span className="text-xs text-white/60">${p.price.toFixed(2)}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
