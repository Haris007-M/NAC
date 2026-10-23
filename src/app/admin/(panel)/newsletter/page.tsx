import { requireAdmin } from "@/lib/supabase-server";
import { deleteSubscriber } from "../../actions";
import { Card, PageTitle } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export const metadata = { title: "Newsletter" };
export default async function Newsletter() {
  const { sb } = await requireAdmin();
  const { data } = await sb.from("newsletter").select("email,source,created_at").order("created_at", { ascending: false });
  return (
    <>
      <PageTitle title="Newsletter" sub={`${data?.length ?? 0} subscribers`} action={<a href="/admin/newsletter/export" className="btn-primary">Export CSV</a>} />
      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-neutral-500"><tr><th className="p-4">Email</th><th>Source</th><th>Joined</th><th className="pr-4" /></tr></thead>
          <tbody>{data?.map((s) => (
            <tr key={s.email} className="border-t border-line dark:border-white/10">
              <td className="p-4 font-semibold">{s.email}</td><td className="capitalize text-neutral-500">{s.source}</td><td>{new Date(s.created_at).toLocaleDateString("en-GB")}</td>
              <td className="pr-4 text-right"><form action={deleteSubscriber}><input type="hidden" name="email" value={s.email} /><ConfirmButton label="Remove" /></form></td>
            </tr>))}</tbody>
        </table>
        {!data?.length && <p className="p-10 text-center text-neutral-500">No subscribers yet.</p>}
      </Card>
    </>
  );
}
