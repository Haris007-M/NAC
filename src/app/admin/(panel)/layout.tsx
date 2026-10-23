import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase-server";
import { logout } from "../actions";
import { LogoMark } from "@/components/Logo";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: { default: "Admin", template: "%s · NAC Admin" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = await requireAdmin();
  return (
    <div className="min-h-screen bg-[#f6f5f7] text-ink dark:bg-[#0e0c0f] dark:text-white lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 z-40 border-b border-white/10 bg-[#111014] text-white lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block">
          <Link href="/admin" className="flex items-center gap-2.5"><LogoMark id="admm" className="h-8 w-8" /><span><b className="font-serif tracking-widest">NAC</b><small className="block text-[10px] uppercase tracking-widest text-white/50">Admin</small></span></Link>
          <Link href="/" target="_blank" className="text-xs text-white/60 underline lg:mt-3 lg:block">View store ↗</Link>
        </div>
        <AdminNav owner={role === "owner"} />
        <div className="hidden px-5 pb-5 lg:absolute lg:bottom-0 lg:block lg:w-full">
          <p className="truncate text-xs text-white/50">{user.email}</p>
          <p className="mb-2 text-[10px] uppercase tracking-widest text-rasp-light">{role}</p>
          <form action={logout}><button className="w-full rounded-lg border border-white/15 py-2 text-sm hover:bg-white/10">Sign out</button></form>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="flex items-center justify-end gap-3 px-5 pt-4 lg:hidden">
          <span className="truncate text-xs text-neutral-500">{user.email}</span>
          <form action={logout}><button className="rounded-lg border border-line px-3 py-1.5 text-xs dark:border-white/15">Sign out</button></form>
        </div>
        <div className="mx-auto max-w-[1300px] p-5 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
