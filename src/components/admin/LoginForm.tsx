"use client";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";

function Submit() {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="btn-primary w-full justify-center">{pending ? "Signing in…" : "Sign in"}</button>;
}

export function LoginForm() {
  const [state, action] = useFormState(login, null as { error?: string } | null);
  const input = "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-3 outline-none focus:border-rasp-light";
  return (
    <form action={action} className="grid gap-3">
      <label className="grid gap-1 text-sm">Email<input name="email" type="email" required autoComplete="username" className={input} /></label>
      <label className="grid gap-1 text-sm">Password<input name="password" type="password" required autoComplete="current-password" className={input} /></label>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <Submit />
    </form>
  );
}
