import Link from "next/link";

export function LogoMark({ className = "h-10 w-10", id = "nacg" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d12e6b" />
          <stop offset="1" stopColor="#7b4bd6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke={`url(#${id})`} strokeWidth="1.4" opacity=".45" />
      <path d="M29.5 53C18 52.5 10 45 8.5 32.5 19.5 33 27.5 40 29.5 53Z" fill="#7b4bd6" opacity=".55" />
      <path d="M34.5 53C46 52.5 54 45 55.5 32.5 44.5 33 36.5 40 34.5 53Z" fill="#d12e6b" opacity=".55" />
      <path d="M32 7C40.5 19 45 27 45 35a13 13 0 0 1-26 0C19 27 23.5 19 32 7Z" fill={`url(#${id})`} />
      <path d="M26 33.5c0-4 1.6-8 4-11.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity=".75" />
      <path d="M48 9l1 2.6 2.6 1-2.6 1L48 16.2l-1-2.6-2.6-1 2.6-1Z" fill="#d12e6b" />
    </svg>
  );
}

export function Logo({ id = "nacg" }: { id?: string }) {
  return (
    <Link href="/" aria-label="NACosmetics home" className="flex items-center gap-2.5">
      <LogoMark id={id} className="h-9 w-9 md:h-10 md:w-10" />
      <svg viewBox="0 0 150 52" className="h-9 w-auto md:h-11" aria-hidden="true">
        <text x="0" y="34" fontFamily="var(--font-bodoni), Didot, Georgia, serif" fontSize="40" fontWeight="600" textLength="150" lengthAdjust="spacingAndGlyphs" fill="currentColor">NAC</text>
        <text x="0" y="50" fontFamily="var(--font-archivo), Arial, sans-serif" fontSize="10.5" fontWeight="700" textLength="150" lengthAdjust="spacing" fill="currentColor">SKINCARE + COSMETICS</text>
      </svg>
    </Link>
  );
}
