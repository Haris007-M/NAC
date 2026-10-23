import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase-server";
import { PageTitle } from "@/components/admin/ui";
import { ProductForm, type ProductRow } from "@/components/admin/ProductForm";

export const metadata = { title: "Edit product" };
export default async function EditProduct({ params }: { params: { slug: string } }) {
  const { sb } = await requireAdmin();
  const { data } = await sb.from("products").select("*").eq("slug", params.slug).maybeSingle();
  if (!data) notFound();
  return <><PageTitle title={`Edit: ${data.name}`} sub={`/product/${data.slug}`} /><ProductForm p={data as ProductRow} /></>;
}
