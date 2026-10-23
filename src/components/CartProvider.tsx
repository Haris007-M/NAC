"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Product } from "@/lib/types";
import { FREE_SHIP } from "@/lib/utils";
import { track } from "@/lib/track";

type Ctx = {
  lines: CartLine[];
  products: Product[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: (express?: boolean) => number;
  toast: string | null;
  notify: (m: string) => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ products, children }: { products: Product[]; children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLines(JSON.parse(localStorage.getItem("nac-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("nac-wish") || "[]"));
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("nac-cart", JSON.stringify(lines)); } catch {} }, [lines]);
  useEffect(() => { try { localStorage.setItem("nac-wish", JSON.stringify(wishlist)); } catch {} }, [wishlist]);

  const notify = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    track("add_to_cart", { product: slug });
    setLines((ls) => {
      const f = ls.find((l) => l.slug === slug);
      return f ? ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...ls, { slug, qty }];
    });
    setOpen(true);
  }, []);
  const setQty = (slug: string, qty: number) =>
    setLines((ls) => (qty < 1 ? ls.filter((l) => l.slug !== slug) : ls.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  const remove = (slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug));
  const clear = () => setLines([]);
  const toggleWish = (slug: string) => {
    setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));
    notify(wishlist.includes(slug) ? "Removed from wishlist" : "Saved to wishlist");
  };

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + (products.find((p) => p.slug === l.slug)?.price ?? 0) * l.qty, 0),
    [lines, products],
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const shipping = (express = false) => (!lines.length ? 0 : express ? 12.99 : subtotal >= FREE_SHIP ? 0 : 4.99);

  return (
    <CartContext.Provider value={{ lines, products, open, setOpen, add, setQty, remove, clear, count, subtotal, shipping, toast, notify, wishlist, toggleWish }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
