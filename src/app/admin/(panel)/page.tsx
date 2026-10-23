import Link from "next/link";
import { requireAdmin } from "@/lib/supabase-server";
import { Bars, Card, PageTitle, RankList, Stat, STATUS_STYLE } from "@/components/admin/ui";
import { money } from "@/lib/utils";

type Ev = { type: string; session_id: string | null; path: string | null; product_slug: string | null; referrer: string | null; created_at: string };
type Order = { id: string; email: string; first_name: string | null; last_name: string | null; country: string | null; items: { slug: string; name: string; price: number; qty: number }[]; total: number; status: string; created_at: string };
type Prod = { slug: string; name: string; brand: string; stock: number; is_active: boolean; price: number };

const day = (d: Date) => d.toISOString().slice(0, 10);
const pct = (a: number, b: number) => (b ? `${((a / b) * 100).toFixed(1)}%` : "—");

export default async function Dashboard({ searchParams }: { searchParams: { range?: string } }) {
  const { sb } = await requireAdmin();
  const range = [7, 30, 90].includes(Number(searchParams.range)) ? Number(searchParams.range) : 30;
  const since = new Date(Date.now() - range * 864e5);
  const prevSince = new Date(Date.now() - 2 * range * 864e5);

  const [evRes, ordRes, prodRes, subRes] = await Promise.all([
    sb.from("events").select("type,session_id,path,product_slug,referrer,created_at").gte("created_at", prevSince.toISOString()).order("created_at", { ascending: false }).limit(100000),
    sb.from("orders").select("id,email,first_name,last_name,country,items,total,status,created_at").order("created_at", { ascending: false }).limit(5000),
    sb.from("products").select("slug,name,brand,stock,is_active,price"),
    sb.from("newsletter").select("email", { count: "exact", head: true }),
  ]);
  const allEv = (evRes.data ?? []) as Ev[];
  const ev = allEv.filter((e) => new Date(e.created_at) >= since);
  const prevEv = allEv.filter((e) => new Date(e.created_at) < since);
  const orders = (ordRes.data ?? []) as Order[];
  const inRange = orders.filter((o) => new Date(o.created_at) >= since && o.status !== "cancelled");
  const prevOrders = orders.filter((o) => { const d = new Date(o.created_at); return d < since && d >= prevSince && o.status !== "cancelled"; });
  const products = (prodRes.data ?? []) as Prod[];
  const nameOf = (s: string) => products.find((p) => p.slug === s)?.name ?? s;

  const sessions = (list: Ev[]) => new Set(list.filter((e) => e.type === "page_view").map((e) => e.session_id)).size;
  const visitors = sessions(ev), prevVisitors = sessions(prevEv);
  const pageViews = ev.filter((e) => e.type === "page_view").length;
  const today = day(new Date());
  const visitorsToday = new Set(ev.filter((e) => e.type === "page_view" && e.created_at.startsWith(today)).map((e) => e.session_id)).size;
  const revenue = inRange.reduce((s, o) => s + Number(o.total), 0);
  const prevRevenue = prevOrders.reduce((s, o) => s + Number(o.total), 0);
  const units = inRange.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0);
  const change = (a: number, b: number) => (b ? `${a >= b ? "▲" : "▼"} ${Math.abs(((a - b) / b) * 100).toFixed(0)}% vs previous ${range}d` : `previous ${range}d: no data`);

  // daily series
  const days = Array.from({ length: range }, (_, i) => day(new Date(Date.now() - (range - 1 - i) * 864e5)));
  const lbl = (d: string) => d.slice(8) + "/" + d.slice(5, 7);
  const visitSeries = days.map((d) => ({ label: lbl(d), value: new Set(ev.filter((e) => e.type === "page_view" && e.created_at.startsWith(d)).map((e) => e.session_id)).size }));
  const revSeries = days.map((d) => ({ label: lbl(d), value: inRange.filter((o) => o.created_at.startsWith(d)).reduce((s, o) => s + Number(o.total), 0) }));

  // rankings
  const tally = (pairs: [string, number][]) => {
    const m = new Map<string, number>(); pairs.forEach(([k, v]) => m.set(k, (m.get(k) ?? 0) + v));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  };
  const bestSellers = tally(inRange.flatMap((o) => o.items.map((i) => [i.slug, i.qty] as [string, number])));
  const revenueBy = new Map<string, number>(); inRange.forEach((o) => o.items.forEach((i) => revenueBy.set(i.slug, (revenueBy.get(i.slug) ?? 0) + i.price * i.qty)));
  const clicked = tally(ev.filter((e) => e.type === "product_click" && e.product_slug).map((e) => [e.product_slug!, 1]));
  const viewed = tally(ev.filter((e) => e.type === "product_view" && e.product_slug).map((e) => [e.product_slug!, 1]));
  const carted = tally(ev.filter((e) => e.type === "add_to_cart" && e.product_slug).map((e) => [e.product_slug!, 1]));
  const pages = tally(ev.filter((e) => e.type === "page_view" && e.path).map((e) => [e.path!, 1]));
  const sources = tally(ev.filter((e) => e.type === "page_view").map((e) => {
    try { const h = e.referrer ? new URL(e.referrer).hostname.replace("www.", "") : "Direct"; return [h.includes("localhost") || h.includes("nacosmetics") ? "Internal" : h, 1]; } catch { return ["Direct", 1]; }
  }).filter(([h]) => h !== "Internal") as [string, number][]);
  const countries = tally(inRange.map((o) => [o.country ?? "Unknown", 1]));

  // funnel
  const sess = (t: string) => new Set(ev.filter((e) => e.type === t).map((e) => e.session_id)).size;
  const funnel = [["Visited", visitors], ["Viewed a product", sess("product_view")], ["Added to bag", sess("add_to_cart")], ["Started checkout", sess("checkout_start")], ["Ordered", inRange.length]] as const;

  const lowStock = products.filter((p) => p.stock < 10).sort((a, b) => a.stock - b.stock);
  const stockUnits = products.reduce((s, p) => s + (p.stock ?? 0), 0);
  const stockValue = products.reduce((s, p) => s + (p.stock ?? 0) * Number(p.price), 0);
  const pending = orders.filter((o) => o.status === "pending" || o.status === "paid").length;

  return (
    <>
      <PageTitle title="Dashboard" sub={`Last ${range} days · updated just now`} action={
        <div className="flex gap-1 rounded-full border border-line bg-white p-1 dark:border-white/10 dark:bg-white/5">
          {[7, 30, 90].map((r) => <Link key={r} href={`/admin?range=${r}`} className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${r === range ? "bg-ink text-white dark:bg-white dark:text-ink" : "text-neutral-500"}`}>{r}d</Link>)}
        </div>} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Revenue" value={money(revenue)} sub={change(revenue, prevRevenue)} tone={revenue >= prevRevenue ? "good" : "warn"} />
        <Stat label="Orders" value={String(inRange.length)} sub={`Avg order ${inRange.length ? money(revenue / inRange.length) : "—"}`} />
        <Stat label="Units sold" value={units.toLocaleString()} sub={`${pending} orders to fulfil`} tone={pending ? "warn" : undefined} />
        <Stat label="Conversion" value={pct(inRange.length, visitors)} sub="orders ÷ visitors" />
        <Stat label="Visitors" value={visitors.toLocaleString()} sub={change(visitors, prevVisitors)} tone={visitors >= prevVisitors ? "good" : "warn"} />
        <Stat label="Visitors today" value={visitorsToday.toLocaleString()} sub={`${pageViews.toLocaleString()} page views in ${range}d`} />
        <Stat label="Products" value={String(products.length)} sub={`${products.filter((p) => p.is_active).length} live · ${stockUnits.toLocaleString()} units in stock`} />
        <Stat label="Subscribers" value={(subRes.count ?? 0).toLocaleString()} sub={`Stock value ${money(stockValue)}`} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card><h2 className="mb-3 font-bold">Visitors per day</h2><Bars data={visitSeries} /></Card>
        <Card><h2 className="mb-3 font-bold">Revenue per day</h2><Bars data={revSeries} format={money} /></Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card><h2 className="mb-4 font-bold">Best sellers <small className="font-normal text-neutral-500">(units)</small></h2><RankList unit="sold" rows={bestSellers.map(([s, v]) => ({ label: nameOf(s), value: v, sub: money(revenueBy.get(s) ?? 0) }))} empty="No sales in this period yet" /></Card>
        <Card><h2 className="mb-4 font-bold">Most clicked products</h2><RankList unit="clicks" rows={clicked.map(([s, v]) => ({ label: nameOf(s), value: v }))} /></Card>
        <Card><h2 className="mb-4 font-bold">Most viewed product pages</h2><RankList unit="views" rows={viewed.map(([s, v]) => ({ label: nameOf(s), value: v }))} /></Card>
        <Card><h2 className="mb-4 font-bold">Most added to bag</h2><RankList unit="adds" rows={carted.map(([s, v]) => ({ label: nameOf(s), value: v }))} /></Card>
        <Card><h2 className="mb-4 font-bold">Top pages</h2><RankList unit="views" rows={pages.map(([s, v]) => ({ label: s, value: v }))} /></Card>
        <Card><h2 className="mb-4 font-bold">Traffic sources</h2><RankList unit="visits" rows={sources.map(([s, v]) => ({ label: s, value: v }))} /></Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_1.3fr]">
        <Card>
          <h2 className="mb-4 font-bold">Sales funnel</h2>
          <div className="grid gap-2.5">{funnel.map(([l, v], i) => (
            <div key={l}><div className="flex justify-between text-sm"><span>{l}</span><b className="tabular-nums">{v.toLocaleString()} <small className="font-normal text-neutral-500">{i ? pct(v, funnel[0][1]) : ""}</small></b></div>
              <div className="mt-1 h-2 overflow-hidden rounded bg-sunk dark:bg-white/10"><i className="block h-full bg-brand" style={{ width: `${funnel[0][1] ? (v / funnel[0][1]) * 100 : 0}%` }} /></div></div>))}</div>
        </Card>
        <Card>
          <h2 className="mb-4 font-bold">Low stock <small className="font-normal text-neutral-500">(under 10)</small></h2>
          {lowStock.length ? <ul className="grid gap-2 text-sm">{lowStock.map((p) => <li key={p.slug} className="flex justify-between gap-3"><Link href={`/admin/products/${p.slug}`} className="truncate hover:text-rasp">{p.name}</Link><b className={p.stock === 0 ? "text-red-600" : "text-amber-600"}>{p.stock}</b></li>)}</ul> : <p className="py-6 text-center text-sm text-neutral-500">All products well stocked</p>}
          <h2 className="mb-3 mt-6 font-bold">Orders by country</h2><RankList unit="orders" rows={countries.map(([s, v]) => ({ label: s, value: v }))} />
        </Card>
        <Card>
          <div className="mb-4 flex justify-between"><h2 className="font-bold">Recent orders</h2><Link href="/admin/orders" className="text-sm text-rasp">All orders →</Link></div>
          {orders.length ? (
            <div className="overflow-x-auto"><table className="w-full min-w-[420px] text-sm">
              <tbody>{orders.slice(0, 8).map((o) => (
                <tr key={o.id} className="border-t border-line dark:border-white/10">
                  <td className="py-2.5"><b>{[o.first_name, o.last_name].filter(Boolean).join(" ") || o.email}</b><small className="block text-neutral-500">{new Date(o.created_at).toLocaleDateString("en-GB")}</small></td>
                  <td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span></td>
                  <td className="text-right font-bold tabular-nums">{money(Number(o.total))}</td>
                </tr>))}</tbody></table></div>
          ) : <p className="py-6 text-center text-sm text-neutral-500">No orders yet</p>}
        </Card>
      </div>
    </>
  );
}
