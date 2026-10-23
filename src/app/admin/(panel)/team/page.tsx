import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase-server";
import { addAdmin, removeAdmin } from "../../actions";
import { Card, PageTitle, field, input } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export const metadata = { title: "Team & access" };
export default async function Team() {
  const { sb, role, user } = await requireAdmin();
  if (role !== "owner") redirect("/admin");
  const { data } = await sb.from("admins").select("user_id,email,role,created_at").order("created_at");
  return (
    <>
      <PageTitle title="Team & access" sub="Only people listed here can open the admin panel. There is no public sign-up." />
      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <Card className="overflow-x-auto !p-0">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-neutral-500"><tr><th className="p-4">Email</th><th>Role</th><th>Added</th><th className="pr-4" /></tr></thead>
            <tbody>{data?.map((a) => (
              <tr key={a.user_id} className="border-t border-line dark:border-white/10">
                <td className="p-4 font-semibold">{a.email}{a.user_id === user.id && <small className="ml-2 text-neutral-500">(you)</small>}</td>
                <td className="capitalize">{a.role}</td><td>{new Date(a.created_at).toLocaleDateString("en-GB")}</td>
                <td className="pr-4 text-right">{a.role !== "owner" && <form action={removeAdmin}><input type="hidden" name="user_id" value={a.user_id} /><ConfirmButton label="Revoke access" /></form>}</td>
              </tr>))}</tbody>
          </table>
        </Card>
        <Card>
          <h3 className="mb-3 font-bold">Give someone access</h3>
          <form action={addAdmin} className="grid gap-3">
            <label className={field}>Email<input name="email" type="email" required className={input} /></label>
            <label className={field}>Temporary password <small className="font-normal text-neutral-500">(min 12 characters, share privately)</small><input name="password" type="text" minLength={12} required className={input} /></label>
            <button className="btn-primary justify-center">Add admin</button>
            <p className="text-xs text-neutral-500">They can manage products, posts, orders and the newsletter. Only the owner can add or remove people.</p>
          </form>
        </Card>
      </div>
    </>
  );
}
