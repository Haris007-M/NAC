import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase-server";
import { toggleProduct } from "../../actions";
import { Card, PageTitle } from "@/components/admin/ui";
import { money } from "@/lib/utils";

export const metadata = { title: "Products" };

export default async function Products({ searchParams }: { searchParams: { q?: string; saved?: string; deleted?: string } }) {
  const { sb } = await requireAdmin();
  let q = sb.from("products").select("slug,name,brand,category,price,compare_at,stock,is_active,image").order("name");
  if (searchParams.q) q = q.or(`name.ilike.%${searchParams.q.replace(/[%,()]/g, "")}%,brand.ilike.%${searchParams.q.replace(/[%,()]/g, "")}%`);
  const { data } = await q;
  return (
    <>
      <PageTitle title="Products" sub={`${data?.length ?? 0} products`} action={<Link href="/admin/products/new" className="btn-primary">+ Add product</Link>} />
      {(searchParams.saved || searchParams.deleted) && <p className="mb-4 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">{searchParams.saved ? "Product saved. The store updates within a minute." : "Product deleted."}</p>}
      <form className="mb-4"><input name="q" defaultValue={searchParams.q} placeholder="Search by name or brand…" className="w-full max-w-sm rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm dark:border-white/15 dark:bg-white/5" /></form>
      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-neutral-500"><tr><th className="p-4">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th className="pr-4 text-right">Actions</th></tr></thead>
          <tbody>
            {data?.map((p) => (
              <tr key={p.slug} className="border-t border-line dark:border-white/10">
                <td className="p-4"><div className="flex items-center gap-3">{p.image && <span className="relative h-11 w-11 flex-none overflow-hidden rounded-lg bg-sunk"><Image src={p.image} alt="" fill sizes="44px" className="object-cover" /></span>}<span><b>{p.name}</b><small className="block text-neutral-500">{p.brand}</small></span></div></td>
                <td>{p.category}</td>
                <td className="tabular-nums">{money(Number(p.price))}{p.compare_at && <s className="ml-1.5 text-xs text-neutral-500">{money(Number(p.compare_at))}</s>}</td>
                <td><b className={p.stock === 0 ? "text-red-600" : p.stock < 10 ? "text-amber-600" : ""}>{p.stock}</b></td>
                <td><form action={toggleProduct}><input type="hidden" name="slug" value={p.slug} /><input type="hidden" name="active" value={String(p.is_active)} />
                  <button className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.is_active ? "bg-emerald-100 text-emerald-800" : "bg-neutral-200 text-neutral-600"}`} title="Click to toggle">{p.is_active ? "Live" : "Hidden"}</button></form></td>
                <td className="pr-4 text-right"><Link href={`/admin/products/${p.slug}`} className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:bg-sunk dark:border-white/15 dark:hover:bg-white/10">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data?.length && <p className="p-10 text-center text-neutral-500">No products found.</p>}
      </Card>
    </>
  );
}
