import { requireAdmin } from "@/lib/supabase-server";
import { PageTitle } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = { title: "New product" };
export default async function NewProduct() {
  await requireAdmin();
  return <><PageTitle title="Add product" /><ProductForm /></>;
}
