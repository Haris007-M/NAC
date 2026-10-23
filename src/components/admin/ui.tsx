/* Small, dependency-free admin UI pieces (server-renderable). */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white p-5 dark:border-white/10 dark:bg-[#151217] ${className}`}>{children}</div>;
}
export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h1 className="font-head text-2xl font-extrabold md:text-3xl">{title}</h1>{sub && <p className="text-sm text-neutral-500">{sub}</p>}</div>{action}</div>;
}
export function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "warn" }) {
  return (
    <Card className="!p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className="mt-1 font-head text-2xl font-extrabold tabular-nums md:text-3xl">{value}</p>
      {sub && <p className={`mt-0.5 text-xs ${tone === "warn" ? "text-amber-600" : tone === "good" ? "text-emerald-600" : "text-neutral-500"}`}>{sub}</p>}
    </Card>
  );
}
export function Bars({ data, format = (n: number) => String(n), color = "url(#barg)" }: { data: { label: string; value: number }[]; format?: (n: number) => string; color?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const W = 600, H = 180, bw = W / data.length;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full min-w-[420px]" role="img">
        <defs><linearGradient id="barg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d12e6b" /><stop offset="1" stopColor="#7b4bd6" /></linearGradient></defs>
        {[0.25, 0.5, 0.75, 1].map((g) => <line key={g} x1="0" x2={W} y1={H - H * g} y2={H - H * g} stroke="currentColor" strokeOpacity=".08" />)}
        {data.map((d, i) => {
          const h = (d.value / max) * (H - 8);
          return (
            <g key={i}>
              <rect x={i * bw + bw * 0.15} y={H - h} width={bw * 0.7} height={Math.max(h, d.value ? 2 : 0)} rx="3" fill={color}><title>{`${d.label}: ${format(d.value)}`}</title></rect>
              {(data.length <= 14 || i % Math.ceil(data.length / 10) === 0) && <text x={i * bw + bw / 2} y={H + 15} textAnchor="middle" fontSize="10" fill="currentColor" opacity=".55">{d.label}</text>}
            </g>
          );
        })}
      </svg>
      <p className="text-right text-xs text-neutral-500">Peak: {format(max)}</p>
    </div>
  );
}
export function RankList({ rows, unit, empty = "No data yet" }: { rows: { label: string; value: number; sub?: string }[]; unit: string; empty?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (!rows.length) return <p className="py-6 text-center text-sm text-neutral-500">{empty}</p>;
  return (
    <ol className="grid gap-3">
      {rows.map((r, i) => (
        <li key={r.label} className="grid gap-1">
          <div className="flex justify-between gap-3 text-sm"><span className="truncate"><b className="mr-2 text-neutral-400">{i + 1}</b>{r.label}</span><b className="tabular-nums">{r.value.toLocaleString()} <small className="font-normal text-neutral-500">{unit}</small></b></div>
          <div className="h-1.5 overflow-hidden rounded bg-sunk dark:bg-white/10"><i className="block h-full rounded bg-brand" style={{ width: `${(r.value / max) * 100}%` }} /></div>
        </li>
      ))}
    </ol>
  );
}
export const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800", paid: "bg-sky-100 text-sky-800", shipped: "bg-violet-100 text-violet-800",
  delivered: "bg-emerald-100 text-emerald-800", cancelled: "bg-neutral-200 text-neutral-700",
};
export const field = "grid gap-1 text-sm font-semibold";
export const input = "rounded-lg border border-line bg-white px-3 py-2.5 font-normal outline-none focus:border-rasp dark:border-white/15 dark:bg-white/5";
