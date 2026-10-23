import Link from "next/link";
import { requireAdmin } from "@/lib/supabase-server";
import { Card, PageTitle } from "@/components/admin/ui";

export const metadata = { title: "Blog posts" };
export default async function Posts({ searchParams }: { searchParams: { saved?: string; deleted?: string } }) {
  const { sb } = await requireAdmin();
  const { data } = await sb.from("posts").select("slug,title,tag,published_at,is_published,focus_keyword").order("published_at", { ascending: false });
  return (
    <>
      <PageTitle title="Blog posts" sub={`${data?.length ?? 0} articles`} action={<Link href="/admin/posts/new" className="btn-primary">+ New post</Link>} />
      {(searchParams.saved || searchParams.deleted) && <p className="mb-4 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">{searchParams.saved ? "Post saved." : "Post deleted."}</p>}
      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-neutral-500"><tr><th className="p-4">Title</th><th>Focus keyword</th><th>Date</th><th>Status</th><th className="pr-4" /></tr></thead>
          <tbody>{data?.map((p) => (
            <tr key={p.slug} className="border-t border-line dark:border-white/10">
              <td className="p-4"><b>{p.title}</b><small className="block text-neutral-500">{p.tag}</small></td>
              <td className="text-neutral-500">{p.focus_keyword}</td>
              <td className="whitespace-nowrap">{p.published_at}</td>
              <td><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.is_published ? "bg-emerald-100 text-emerald-800" : "bg-neutral-200 text-neutral-600"}`}>{p.is_published ? "Published" : "Draft"}</span></td>
              <td className="whitespace-nowrap pr-4 text-right"><Link href={`/journal/${p.slug}`} target="_blank" className="mr-2 text-xs text-neutral-500 underline">View</Link><Link href={`/admin/posts/${p.slug}`} className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold dark:border-white/15">Edit</Link></td>
            </tr>))}</tbody>
        </table>
      </Card>
    </>
  );
}
