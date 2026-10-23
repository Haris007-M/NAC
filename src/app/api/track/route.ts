import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const TYPES = new Set(["page_view", "product_view", "product_click", "add_to_cart", "checkout_start"]);

export async function POST(req: Request) {
  if (!supabase) return NextResponse.json({ ok: true });
  try {
    const b = await req.json();
    if (!TYPES.has(b.type)) return NextResponse.json({ ok: false }, { status: 400 });
    const s = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : null);
    await supabase.from("events").insert({
      type: b.type, session_id: s(b.sessionId, 64), path: s(b.path, 250),
      product_slug: s(b.product, 100), referrer: s(b.referrer, 250),
    });
  } catch { /* never break the storefront because of analytics */ }
  return NextResponse.json({ ok: true });
}
