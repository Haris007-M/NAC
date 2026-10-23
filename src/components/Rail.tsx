"use client";
import { useRef } from "react";

export function Rail({ children, title, eyebrow, action }: { children: React.ReactNode; title: React.ReactNode; eyebrow?: string; action?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="reveal mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2 className="h-section">{title}</h2></div>
        <div className="flex flex-wrap items-center gap-3">
          {action}
          <div className="flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:bg-ink hover:text-white dark:border-white/15">←</button>
            <button onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:bg-ink hover:text-white dark:border-white/15">→</button>
          </div>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar grid snap-x snap-mandatory auto-cols-[72%] grid-flow-col gap-3 overflow-x-auto overflow-y-hidden scroll-smooth pt-1.5 sm:auto-cols-[calc((100%-32px)/3)] sm:gap-4 lg:auto-cols-[calc((100%-60px)/4)] lg:gap-5">
        {children}
      </div>
    </section>
  );
}
