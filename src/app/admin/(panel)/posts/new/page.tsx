import { requireAdmin } from "@/lib/supabase-server";
import { PageTitle } from "@/components/admin/ui";
import { PostForm } from "@/components/admin/PostForm";
export const metadata = { title: "New post" };
export default async function NewPost() { await requireAdmin(); return <><PageTitle title="New blog post" /><PostForm /></>; }
