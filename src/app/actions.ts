"use server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { getProducts } from "@/lib/queries";
import { FREE_SHIP } from "@/lib/utils";
import type { CartLine } from "@/lib/types";

export async function subscribe(email: string, source: string) {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: "Please enter a valid email address." };
  if (supabase) {
    const { error } = await supabase.from("newsletter").insert({ email: email.toLowerCase(), source });
    if (error && !error.message.includes("duplicate")) return { ok: false, message: "Could not subscribe right now. Please try again." };
  }
  return { ok: true, message: "You're in! Your 10% code: NAC10" };
}

export type OrderInput = {
  email: string; firstName: string; lastName: string; phone?: string;
  address: string; city: string; postalCode: string; country: string;
  shipping: "std" | "exp"; payment: "card" | "paypal" | "jazzcash" | "easypaisa" | "cod";
  lines: CartLine[];
};

export async function createOrder(input: OrderInput) {
  // Never trust client prices: recompute totals from the catalog on the server.
  const catalog = await getProducts();
  const items = input.lines
    .map((l) => { const p = catalog.find((x) => x.slug === l.slug); return p ? { slug: p.slug, name: p.name, price: p.price, qty: Math.max(1, Math.floor(l.qty)) } : null; })
    .filter(Boolean) as { slug: string; name: string; price: number; qty: number }[];
  if (!items.length) return { ok: false, message: "Your bag is empty." };
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = input.shipping === "exp" ? 12.99 : subtotal >= FREE_SHIP ? 0 : 4.99;
  const total = +(subtotal + shipping).toFixed(2);

  const admin = supabaseAdmin();
  if (!admin) return { ok: true, orderId: "DEMO-" + Date.now().toString(36).toUpperCase(), total, demo: true };

  const { data, error } = await admin.from("orders").insert({
    email: input.email, first_name: input.firstName, last_name: input.lastName, phone: input.phone,
    address: input.address, city: input.city, postal_code: input.postalCode, country: input.country,
    shipping_method: input.shipping, payment_method: input.payment, items, subtotal, shipping, total,
  }).select("id").single();
  if (error) return { ok: false, message: "We couldn't place your order. Please try again." };

  // Analytics + stock: log one purchase event per product and reduce stock.
  await admin.from("events").insert(items.map((i) => ({ type: "purchase", product_slug: i.slug, path: "/checkout" })));
  for (const i of items) {
    const { data: row } = await admin.from("products").select("stock").eq("slug", i.slug).single();
    if (row) await admin.from("products").update({ stock: Math.max(0, (row.stock ?? 0) - i.qty) }).eq("slug", i.slug);
  }

  // TODO payments: for card/PayPal/JazzCash/Easypaisa, create a payment session with your
  // provider here and return its redirect URL; mark the order "paid" from the provider's webhook.
  return { ok: true, orderId: data.id as string, total };
}
