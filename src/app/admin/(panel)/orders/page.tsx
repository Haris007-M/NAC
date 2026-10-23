import Link from "next/link";
import { requireAdmin } from "@/lib/supabase-server";
import { deleteOrder, updateOrderStatus } from "../../actions";
import { Card, PageTitle, STATUS_STYLE } from "@/components/admin/ui";
import { AutoSubmitSelect, ConfirmButton } from "@/components/admin/ConfirmButton";
import { money } from "@/lib/utils";

export const metadata = { title: "Orders" };
const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

type Order = { id: string; email: string; first_name: string | null; last_name: string | null; phone: string | null; address: string | null; city: string | null; postal_code: string | null; country: string | null; shipping_method: string; payment_method: string; items: { name: string; qty: number; price: number }[]; subtotal: number; shipping: number; total: number; status: string; created_at: string };

export default async function Orders({ searchParams }: { searchParams: { status?: string; q?: string } }) {
  const { sb } = await requireAdmin();
  let q = sb.from("orders").select("*").order("created_at", { ascending: false }).limit(500);
  if (searchParams.status && STATUSES.includes(searchParams.status)) q = q.eq("status", searchParams.status);
  if (searchParams.q) q = q.ilike("email", `%${searchParams.q.replace(/[%,()]/g, "")}%`);
  const { data } = await q;
  const orders = (data ?? []) as Order[];
  return (
    <>
      <PageTitle title="Orders" sub={`${orders.length} shown`} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {["all", ...STATUSES].map((s) => {
          const on = (searchParams.status ?? "all") === s;
          return <Link key={s} href={s === "all" ? "/admin/orders" : `/admin/orders?status=${s}`} className={`rounded-full px-3.5 py-1.5 text-xs font-bold capitalize ${on ? "bg-ink text-white dark:bg-white dark:text-ink" : "border border-line bg-white dark:border-white/15 dark:bg-white/5"}`}>{s}</Link>;
        })}
        <form className="ml-auto"><input name="q" defaultValue={searchParams.q} placeholder="Search by email…" className="rounded-lg border border-line bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-white/5" /></form>
      </div>
      <div className="grid gap-3">
        {orders.map((o) => (
          <Card key={o.id} className="!p-0">
            <details>
              <summary className="grid cursor-pointer list-none grid-cols-2 items-center gap-3 p-4 text-sm md:grid-cols-[1.4fr_1fr_1fr_auto]">
                <span><b>{[o.first_name, o.last_name].filter(Boolean).join(" ") || "—"}</b><small className="block text-neutral-500">{o.email}</small></span>
                <span className="text-neutral-500">{new Date(o.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}<small className="block">#{o.id.slice(0, 8)}</small></span>
                <span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span></span>
                <b className="text-right tabular-nums">{money(Number(o.total))}</b>
              </summary>
              <div className="grid gap-5 border-t border-line p-4 text-sm md:grid-cols-3 dark:border-white/10">
                <div><h4 className="mb-1 font-bold">Items</h4>{o.items.map((i, k) => <p key={k}>{i.qty} × {i.name} <span className="text-neutral-500">({money(i.price)})</span></p>)}
                  <p className="mt-2 text-neutral-500">Subtotal {money(Number(o.subtotal))} · Shipping {money(Number(o.shipping))}</p></div>
                <div><h4 className="mb-1 font-bold">Ship to</h4><p>{o.address}<br />{o.city} {o.postal_code}<br />{o.country}<br />{o.phone}</p><p className="mt-2 text-neutral-500">{o.shipping_method === "exp" ? "Express" : "Standard"} · {o.payment_method}</p></div>
                <div className="grid content-start gap-3">
                  <form action={updateOrderStatus} className="flex items-center gap-2"><input type="hidden" name="id" value={o.id} /><span className="font-bold">Status</span><AutoSubmitSelect name="status" value={o.status} options={STATUSES} /></form>
                  <form action={deleteOrder}><input type="hidden" name="id" value={o.id} /><ConfirmButton label="Delete order" /></form>
                </div>
              </div>
            </details>
          </Card>
        ))}
        {!orders.length && <Card><p className="py-8 text-center text-neutral-500">No orders here yet.</p></Card>}
      </div>
    </>
  );
}
