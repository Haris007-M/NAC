import Link from "next/link";
import { Logo } from "./Logo";
import { BrandIcon, ICON_PATHS } from "./icons";
import { Newsletter } from "./Newsletter";

const SOCIAL = [
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/", hover: "hover:bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]" },
  { name: "tiktok", label: "TikTok", href: "https://www.tiktok.com/", hover: "hover:bg-black" },
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/", hover: "hover:bg-[#1877F2]" },
  { name: "youtube", label: "YouTube", href: "https://www.youtube.com/", hover: "hover:bg-[#FF0000]" },
  { name: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/", hover: "hover:bg-[#E60023]" },
] as const;

const COLS = [
  { t: "Shop", l: [["Cleansers", "/shop?cat=Cleanser"], ["Serums & essences", "/shop?cat=Serum"], ["Sun & barrier", "/shop?cat=Sun+%26+Barrier"], ["All products", "/shop"]] },
  { t: "Learn", l: [["Skincare journal", "/journal"], ["Shipping & returns", "/help"], ["FAQ", "/help"], ["About NAC", "/about"]] },
  { t: "Contact", l: [["support@nacosmetics.com", "/help"], ["Mon–Sat, 9:00–18:00", "/help"]] },
];

function PayBadge({ children, bg = "bg-white" }: { children: React.ReactNode; bg?: string }) {
  return <span className={`inline-flex h-8 flex-none items-center gap-px rounded-md px-3 text-xs font-extrabold ${bg}`}>{children}</span>;
}

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink pb-20 text-white md:pb-0">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
      <div className="mx-auto flex max-w-[1400px] flex-col items-stretch gap-5 border-b border-white/10 px-5 py-9 text-center md:flex-row md:items-center md:justify-between md:px-8 md:text-left">
        <div><h3 className="font-head text-2xl font-extrabold">Join the NAC glow list</h3><p className="text-white/65">Routine tips, new arrivals and 10% off your first order.</p></div>
        <Newsletter source="footer" dark />
      </div>
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-8">
        <div className="grid justify-items-center gap-4 text-center md:justify-items-start md:text-left">
          <Logo id="nacf" />
          <p className="max-w-sm text-sm text-white/65">Authentic Korean skincare, chosen for real skin concerns and shipped worldwide from China.</p>
          <div className="flex gap-2">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`NAC on ${s.label}`} className={`grid h-9 w-9 place-items-center rounded-full border border-white/25 transition hover:-translate-y-0.5 hover:border-transparent ${s.hover}`}>
                <BrandIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>
        {COLS.map((c) => (
          <div key={c.t}>
            <div className="hidden md:block">
              <h4 className="pb-3 text-xs font-bold uppercase tracking-widest">{c.t}</h4>
              <div className="grid gap-2 text-sm text-white/65">{c.l.map(([t, h]) => <Link key={t} href={h} className="hover:text-white">{t}</Link>)}</div>
            </div>
            <details className="group rounded-xl border border-white/15 px-4 md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-xs font-bold uppercase tracking-widest">{c.t}<span className="text-xl font-normal text-rasp-light transition group-open:rotate-45">+</span></summary>
              <div className="grid gap-2 pb-4 text-sm text-white/65">{c.l.map(([t, h]) => <Link key={t} href={h}>{t}</Link>)}</div>
            </details>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto border-t border-white/10 px-5 py-4 [scrollbar-width:none] md:px-8">
        <span className="mr-1 flex-none text-xs text-white/60">We accept</span>
        <PayBadge><svg viewBox="0 0 24 24" className="h-4"><path fill="#1A1F71" d={ICON_PATHS.visa} /></svg></PayBadge>
        <PayBadge><svg viewBox="0 0 38 24" className="h-5"><circle cx="14" cy="12" r="9" fill="#EB001B" /><circle cx="24" cy="12" r="9" fill="#F79E1B" /><path d="M19 4.8a9 9 0 0 1 0 14.4 9 9 0 0 1 0-14.4z" fill="#FF5F00" /></svg></PayBadge>
        <PayBadge><svg viewBox="0 0 24 24" className="h-4"><path fill="#003087" d={ICON_PATHS.paypal} /></svg><b className="text-[#003087]">Pay</b><b className="text-[#009cde]">Pal</b></PayBadge>
        <PayBadge><svg viewBox="0 0 24 24" className="h-7"><path fill="#000" d={ICON_PATHS.applepay} /></svg></PayBadge>
        <PayBadge bg="bg-[#FFD200]"><b className="text-[#231F20]">Jazz</b><b className="text-[#E2231A]">Cash</b></PayBadge>
        <PayBadge><b className="lowercase text-[#3BB54A]">easypaisa</b></PayBadge>
        <PayBadge><b className="text-ink">Cash on Delivery</b></PayBadge>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 border-t border-white/10 px-5 py-5 text-center text-xs text-white/60 md:flex-row md:justify-between md:px-8">
        <span>© {new Date().getFullYear()} NACosmetics (NAC). All rights reserved.</span>
        <span><Link href="/help">Privacy</Link> · <Link href="/help">Terms</Link> · <Link href="/help">Refunds</Link></span>
        <span>Brand names belong to their respective owners. NAC is an independent retailer.</span>
      </div>
      <div aria-hidden className="select-none whitespace-nowrap bg-brand bg-clip-text pt-2 text-center font-serif text-[15.5vw] font-extrabold leading-[.8] tracking-tight text-transparent opacity-20">NACosmetics</div>
    </footer>
  );
}
