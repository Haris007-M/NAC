"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductTabs({ p }: { p: Product }) {
  const tabs = [["Description", p.description], ["How to use", p.howToUse], ["Key ingredients", p.ingredients]] as const;
  const [t, setT] = useState(0);
  return (
    <div>
      <div className="flex gap-5 border-b border-line dark:border-white/10">
        {tabs.map(([n], i) => <button key={n} onClick={() => setT(i)} className={`border-b-2 py-2.5 text-sm font-semibold ${t === i ? "border-rasp" : "border-transparent text-neutral-500"}`}>{n}</button>)}
      </div>
      <p className="pt-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">{tabs[t][1]}</p>
    </div>
  );
}
