"use client";
import { useState } from "react";

/* Two-step delete button (no browser confirm dialogs). */
export function ConfirmButton({ label = "Delete", className = "" }: { label?: string; className?: string }) {
  const [armed, setArmed] = useState(false);
  return armed ? (
    <span className="inline-flex gap-1.5">
      <button type="submit" className={`rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white ${className}`}>Confirm</button>
      <button type="button" onClick={() => setArmed(false)} className="rounded-lg border border-line px-3 py-1.5 text-xs dark:border-white/15">Cancel</button>
    </span>
  ) : (
    <button type="button" onClick={() => setArmed(true)} className={`rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10 ${className}`}>{label}</button>
  );
}

export function AutoSubmitSelect({ name, value, options }: { name: string; value: string; options: string[] }) {
  return (
    <select name={name} defaultValue={value} onChange={(e) => e.currentTarget.form?.requestSubmit()} className="rounded-lg border border-line bg-white px-2 py-1.5 text-xs capitalize dark:border-white/15 dark:bg-white/5">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
