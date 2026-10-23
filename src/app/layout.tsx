import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", style: ["normal", "italic"], display: "swap", adjustFontFallback: false, fallback: ["Didot", "Georgia", "serif"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "NACosmetics — Authentic Korean Skincare | Anua, COSRX, Beauty of Joseon", template: "%s | NACosmetics" },
  description: "NACosmetics (NAC) — authentic best-selling Korean skincare: Anua, COSRX, Beauty of Joseon, Aestura, SKINEVER. Cleansers, serums, sunscreens and barrier creams shipped worldwide.",
  keywords: ["korean skincare", "k-beauty", "anua", "cosrx", "beauty of joseon", "aestura", "korean sunscreen", "glass skin"],
  openGraph: { type: "website", siteName: "NACosmetics", images: ["/img/hero-model-wide.webp"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo.svg" },
};
export const viewport: Viewport = { themeColor: "#d12e6b", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = { "@context": "https://schema.org", "@type": "Store", name: "NACosmetics", alternateName: "NAC", url: SITE_URL, logo: `${SITE_URL}/logo.svg`, description: "Authentic Korean skincare shipped worldwide." };
  return (
    <html lang="en" className={`${archivo.variable} ${bodoni.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        {children}
      </body>
    </html>
  );
}
