"use client";
import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = innerWidth / 2, ty = innerHeight / 2, gx = tx, gy = ty, raf = 0;
    let running = false;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!running) { running = true; loop(); }
      if (dot.current) {
        dot.current.style.transform = `translate(${tx}px,${ty}px)`;
        dot.current.dataset.hot = String(!!(e.target as Element).closest("a,button"));
      }
    };
    const loop = () => {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      if (glow.current) glow.current.style.transform = `translate(${gx}px,${gy}px)`;
      if (Math.abs(tx - gx) + Math.abs(ty - gy) < 0.5) { running = false; return; }
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move, { passive: true });
    if (glow.current) glow.current.style.display = "block";
    if (dot.current) dot.current.style.display = "block";
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={glow} className="pointer-events-none fixed -left-[210px] -top-[210px] z-[1] hidden h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(209,46,107,.18),rgba(123,75,214,.1)_40%,transparent_70%)]" />
      <div ref={dot} className="cursor-dot pointer-events-none fixed -left-1.5 -top-1.5 z-[200] hidden h-3 w-3 rounded-full bg-brand shadow-[0_0_14px_#d12e6b]" />
    </>
  );
}
