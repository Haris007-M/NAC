"use client";
import { useState, useTransition } from "react";
import { subscribe } from "@/app/actions";

export function Newsletter({ source, dark = false, cta = "Subscribe", stack = false }: { source: string; dark?: boolean; cta?: string; stack?: boolean }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  if (msg) return <p className="font-bold">{msg}</p>;
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); start(async () => { const r = await subscribe(email, source); setMsg(r.message); }); }}
      className={`flex w-full max-w-md flex-col gap-2 ${stack ? "" : "sm:flex-row"}`}
    >
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address"
        className={`min-w-0 flex-1 rounded border px-4 py-3 outline-none focus:border-rasp ${dark ? "border-white/25 bg-transparent text-white placeholder:text-white/50" : "border-line bg-white"}`} />
      <button disabled={pending} className="btn-primary justify-center">{pending ? "…" : cta}</button>
    </form>
  );
}
