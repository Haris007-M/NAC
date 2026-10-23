import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase-server";
import { PageTitle } from "@/components/admin/ui";
import { PostForm, type PostRow } from "@/components/admin/PostForm";
export const metadata = { title: "Edit post" };
export default async function EditPost({ params }: { params: { slug: string } }) {
  const { sb } = await requireAdmin();
  const { data } = await sb.from("posts").select("*").eq("slug", params.slug).maybeSingle();
  if (!data) notFound();
  return <><PageTitle title="Edit post" sub={`/journal/${data.slug}`} /><PostForm p={data as PostRow} /></>;
}
