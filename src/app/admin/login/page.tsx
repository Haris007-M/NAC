import type { Metadata } from "next";
import { LogoMark } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function Login({ searchParams }: { searchParams: { e?: string } }) {
  const notice = searchParams.e === "config" ? "Supabase is not connected. Add your keys to .env.local and run the SQL files first."
    : searchParams.e === "denied" ? "That account does not have admin access." : null;
  return (
    <div className="grid min-h-screen place-items-center bg-[#0e0c0f] p-5 text-white" style={{ backgroundImage: "radial-gradient(circle at 20% 20%,rgba(209,46,107,.25),transparent 40%),radial-gradient(circle at 80% 80%,rgba(123,75,214,.25),transparent 45%)" }}>
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="mb-6 flex items-center gap-3"><LogoMark id="adml" className="h-10 w-10" /><div><b className="font-serif text-2xl tracking-widest">NAC</b><p className="text-xs text-white/60">Admin panel</p></div></div>
        {notice && <p className="mb-4 rounded-lg bg-rasp/20 px-3 py-2 text-sm text-rasp-light">{notice}</p>}
        <LoginForm />
        <p className="mt-6 text-center text-xs text-white/40">Authorised staff only. Access is logged.</p>
      </div>
    </div>
  );
}
