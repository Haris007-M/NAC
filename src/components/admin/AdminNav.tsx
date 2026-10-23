"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav({ owner }: { owner: boolean }) {
  const path = usePathname();
  const items = [["Dashboard", "/admin", "◧"], ["Orders", "/admin/orders", "🧾"], ["Products", "/admin/products", "🧴"], ["Blog posts", "/admin/posts", "✍️"], ["Newsletter", "/admin/newsletter", "✉️"], ...(owner ? [["Team & access", "/admin/team", "🔐"]] : [])];
  return (
    <nav className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:grid lg:px-3">
      {items.map(([t, h, i]) => {
        const on = h === "/admin" ? path === "/admin" : path.startsWith(h);
        return <Link key={h} href={h} className={`flex flex-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${on ? "bg-brand font-semibold text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><span aria-hidden>{i}</span>{t}</Link>;
      })}
    </nav>
  );
}
