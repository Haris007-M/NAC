"use client";
import { useEffect, useRef, useState } from "react";

export const SORTS = [["pop", "Most popular"], ["rating", "Top rated"], ["low", "Price: low to high"], ["high", "Price: high to low"], ["name", "Name A–Z"]] as const;
export type Sort = (typeof SORTS)[number][0];

/* Custom dropdown so the options are readable in light AND dark mode (native <option> lists ignore the theme). */
export function SortMenu({ value, onChange, full = false }: { value: Sort; onChange: (v: Sort) => void; full?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, []);
  const label = SORTS.find(([v]) => v === value)?.[1];
  return (
    <div ref={ref} className={`relative ${full ? "w-full" : ""}`}>
      <button type="button" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}
        className={`flex h-11 items-center justify-between gap-3 rounded-full border bg-white pl-4 pr-3.5 text-sm font-medium transition dark:bg-white/5 ${full ? "w-full" : "min-w-[190px]"} ${open ? "border-rasp" : "border-line hover:border-ink dark:border-white/10 dark:hover:border-white/40"}`}>
        <span><span className="text-neutral-500">Sort: </span>{label}</span>
        <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-none stroke-current stroke-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <ul role="listbox" className={`absolute right-0 z-50 mt-2 w-full min-w-[220px] origin-top overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,.35)] transition duration-200 dark:border-white/10 dark:bg-[#1b171d] ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
        {SORTS.map(([v, t]) => (
          <li key={v} role="option" aria-selected={v === value}>
            <button type="button" onClick={() => { onChange(v); setOpen(false); }}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition ${v === value ? "bg-rasp-soft font-semibold text-rasp dark:bg-rasp/20 dark:text-rasp-light" : "text-ink hover:bg-sunk dark:text-white/90 dark:hover:bg-white/10"}`}>
              {t}{v === value && <span>✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
