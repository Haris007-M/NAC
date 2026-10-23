export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nacosmetics.com";
export const FREE_SHIP = 49;
export const money = (n: number) => `$${n.toFixed(2)}`;
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
export const fmtDate = (d: string, long = false) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: long ? "long" : "short", year: "numeric" });

export const CATEGORIES = [
  { key: "Cleanser", title: "Cleansers & Face Washes", desc: "Low-pH, gentle and pore-clearing", image: "/img/anua-heartleaf-foam.webp" },
  { key: "Serum", title: "Serums & Essences", desc: "Targeted treatments that went viral", image: "/img/cosrx-snail-96.webp" },
  { key: "Sun & Barrier", title: "Sunscreens & Barrier Creams", desc: "Daily protection and repair", image: "/img/boj-relief-sun.webp" },
] as const;

export const CONCERNS = [
  { key: "Acne", label: "Acne & breakouts", image: "/img/boj-glow-serum.webp" },
  { key: "Dark spots", label: "Dark spots & marks", image: "/img/anua-niacinamide-txa.webp" },
  { key: "Hydration", label: "Dehydration", image: "/img/cosrx-snail-96.webp" },
  { key: "Barrier repair", label: "Barrier repair", image: "/img/aestura-atobarrier-365.webp" },
  { key: "Oil control", label: "Oil & pores", image: "/img/anua-heartleaf-foam.webp" },
  { key: "Sun protection", label: "Sun protection", image: "/img/boj-relief-sun.webp" },
] as const;

export const shopHref = (q: Record<string, string>) => "/shop?" + new URLSearchParams(q).toString();
