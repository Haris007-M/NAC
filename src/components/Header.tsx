"use client";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "./CartProvider";
import { CATEGORIES, CONCERNS, shopHref } from "@/lib/utils";

const MESSAGES = ["Free worldwide shipping over $49", "New: Anua Niacinamide + TXA serum", "100% authentic Korean skincare", "10% off your first order — code NAC10"];

export function Header() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [msg, setMsg] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const last = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    document.documentElement.style.setProperty("--hdr", hidden || !el ? "0px" : `${el.offsetHeight}px`);
  }, [hidden, scrolled]);
  const megaT = useRef<number>();

  useEffect(() => { const t = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 3800); return () => clearInterval(t); }, []);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (!menu && !mega) setHidden(y > last.current + 6 && y > 160 ? true : y < last.current - 6 || y < 160 ? false : hidden);
      last.current = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [menu, mega, hidden]);
  useEffect(() => { setMenu(false); setMega(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);

  const navLink = "relative whitespace-nowrap text-xs font-bold uppercase tracking-[.14em] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full";

  return (
    <>
      <div className="relative grid h-9 place-items-center overflow-hidden bg-brand bg-[length:200%_100%] text-[11px] font-semibold uppercase tracking-[.16em] text-white animate-shine">
        {MESSAGES.map((m, i) => (
          <span key={m} className={`absolute transition-all duration-700 ${i === msg ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>{m}</span>
        ))}
      </div>
      <header ref={headerRef} className={`sticky top-0 z-[60] border-b border-line bg-white transition-[transform,box-shadow] duration-400 dark:border-white/10 dark:bg-[#0e0c0f] ${hidden ? "-translate-y-[110%]" : ""} ${scrolled ? "shadow-[0_10px_30px_-22px_rgba(0,0,0,.35)]" : ""}`}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-3 md:px-8 md:py-3.5">
          {/* left */}
          <div className="flex items-center gap-7">
            <button onClick={() => setMenu(!menu)} aria-label={menu ? "Close menu" : "Open menu"} className={`relative z-[62] grid h-10 w-10 place-items-center rounded-full border border-line md:hidden ${menu ? "border-transparent bg-brand" : ""}`}>
              <span className="relative block h-3.5 w-[18px]">
                {[0, 1, 2].map((i) => (
                  <i key={i} className={`absolute left-0 h-0.5 w-full rounded transition-all duration-500 ${menu ? "bg-white" : "bg-current"} ${i === 0 ? (menu ? "top-1.5 rotate-45" : "top-0") : i === 1 ? (menu ? "top-1.5 scale-x-0 opacity-0" : "top-1.5") : menu ? "top-1.5 -rotate-45" : "top-3"}`} />
                ))}
              </span>
            </button>
            <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
              <div onMouseEnter={() => { clearTimeout(megaT.current); setMega(true); }} onMouseLeave={() => { megaT.current = window.setTimeout(() => setMega(false), 180); }}>
                <button onClick={() => setMega(!mega)} aria-expanded={mega} className={navLink}>Categories {mega ? "▴" : "▾"}</button>
              </div>
              <Link href="/shop" className={navLink}>Shop all</Link>
              <Link href="/journal" className={navLink}>Journal</Link>
              <Link href="/help" className={navLink}>Help</Link>
            </nav>
          </div>
          <div className="relative z-[62]"><Logo /></div>
          <div className="relative z-[62] flex items-center justify-end gap-2">
            <form onSubmit={(e) => { e.preventDefault(); router.push(shopHref({ q })); }} className="hidden items-center gap-2 rounded-full border border-line bg-sunk px-4 py-2 lg:flex dark:border-white/10 dark:bg-white/5">
              <span aria-hidden>⌕</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" className="w-40 bg-transparent text-sm outline-none" />
            </form>
            <button onClick={() => setOpen(true)} aria-label="Open bag" className="relative grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-rasp dark:border-white/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M6 8h12l1 12H5zM9 8V6a3 3 0 0 1 6 0v2" /></svg>{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rasp px-1 text-[11px] font-bold text-white">{count}</span>}
            </button>
          </div>
        </div>

        {/* mega menu */}
        <div onMouseEnter={() => clearTimeout(megaT.current)} onMouseLeave={() => setMega(false)} className={`absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_30px_40px_-30px_rgba(0,0,0,.3)] md:block dark:border-white/10 dark:bg-[#0e0c0f] ${mega ? "animate-rise" : "!hidden"}`}>
          <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(3,1fr)_1.1fr] gap-5 px-8 py-8">
            {CATEGORIES.map((c) => (
              <Link key={c.key} href={shopHref({ cat: c.key })} className="group">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-md bg-sunk"><Image src={c.image} alt={c.title} fill sizes="25vw" className="object-cover transition duration-500 group-hover:scale-105" /></span>
                <b className="mt-3 block text-[13px] uppercase tracking-widest">{c.title}</b>
                <small className="text-neutral-500">{c.desc}</small>
              </Link>
            ))}
            <div className="grid content-start gap-1">
              <h5 className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-neutral-500">Shop by concern</h5>
              {CONCERNS.map((c) => <Link key={c.key} href={shopHref({ concern: c.key })} className="py-1.5 text-sm font-medium hover:text-rasp">{c.label}</Link>)}
              <Link href="/shop" className="mt-1.5 text-sm font-bold text-rasp">View all products →</Link>
            </div>
          </div>
        </div>
      </header>

      {/* mobile curtain menu */}
      <div className={`fixed inset-0 z-[59] overflow-y-auto bg-white px-6 pb-32 pt-36 transition-[clip-path] duration-700 ease-[cubic-bezier(.77,0,.18,1)] md:hidden dark:bg-[#0e0c0f] ${menu ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
        style={{ backgroundImage: "radial-gradient(circle at 90% 0%,rgba(123,75,214,.18),transparent 50%),radial-gradient(circle at 0% 100%,rgba(209,46,107,.18),transparent 55%)" }}>
        {[["Home", "/"], ["Shop all", "/shop"], ...CATEGORIES.map((c) => [c.title, shopHref({ cat: c.key })]), ["Journal", "/journal"], ["Help", "/help"]].map(([t, h], i) => (
          <Link key={h} href={h} onClick={() => setMenu(false)} className={`block border-b border-line py-4 font-serif text-3xl transition-all duration-500 dark:border-white/10 ${menu ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`} style={{ transitionDelay: menu ? `${250 + i * 60}ms` : "0ms" }}>{t}</Link>
        ))}
        <p className="mt-6 text-sm text-neutral-500">Authentic Korean skincare · Ships worldwide</p>
      </div>
    </>
  );
}
