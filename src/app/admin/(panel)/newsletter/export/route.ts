export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

export async function GET() {
  const { sb } = await requireAdmin();
  const { data } = await sb.from("newsletter").select("email,source,created_at").order("created_at", { ascending: false });
  const csv = ["email,source,joined", ...(data ?? []).map((r) => `${r.email},${r.source ?? ""},${r.created_at}`)].join("\n");
  return new NextResponse(csv, { headers: { "content-type": "text/csv", "content-disposition": "attachment; filename=nac-newsletter.csv" } });
}
