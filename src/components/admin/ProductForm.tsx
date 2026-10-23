import Image from "next/image";
import Link from "next/link";
import { saveProduct, deleteProduct } from "@/app/admin/actions";
import { Card, field, input } from "./ui";
import { ConfirmButton } from "./ConfirmButton";

export type ProductRow = {
  slug: string; name: string; brand: string; category: string; size: string | null; price: number; compare_at: number | null;
  rating: number; review_count: number; skin_types: string[]; concerns: string[]; best_for: string | null; tag: string | null;
  description: string | null; how_to_use: string | null; ingredients: string | null; image: string | null; stock: number; is_active: boolean;
};

export function ProductForm({ p }: { p?: ProductRow }) {
  const v = (k: keyof ProductRow) => (p?.[k] ?? "") as string;
  return (
    <>
      <form action={saveProduct} className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <input type="hidden" name="original_slug" value={p?.slug ?? ""} />
        <Card className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={`${field} sm:col-span-2`}>Product name<input name="name" required defaultValue={v("name")} className={input} /></label>
            <label className={field}>Brand<input name="brand" required defaultValue={v("brand")} className={input} /></label>
            <label className={field}>Category<select name="category" defaultValue={v("category") || "Serum"} className={input}><option>Cleanser</option><option>Serum</option><option>Sun & Barrier</option></select></label>
            <label className={field}>URL slug<input name="slug" defaultValue={v("slug")} placeholder="auto from name" className={input} /></label>
            <label className={field}>Size<input name="size" defaultValue={v("size")} placeholder="150 ml" className={input} /></label>
            <label className={field}>Price (USD)<input name="price" type="number" step="0.01" min="0" required defaultValue={v("price")} className={input} /></label>
            <label className={field}>Compare-at price<input name="compare_at" type="number" step="0.01" min="0" defaultValue={v("compare_at")} placeholder="shows a sale badge" className={input} /></label>
            <label className={field}>Stock<input name="stock" type="number" min="0" required defaultValue={p?.stock ?? 100} className={input} /></label>
            <label className={field}>Badge<input name="tag" defaultValue={v("tag")} placeholder="Best seller, New…" className={input} /></label>
            <label className={field}>Rating (0–5)<input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={v("rating")} className={input} /></label>
            <label className={field}>Review count<input name="review_count" type="number" min="0" defaultValue={v("review_count")} className={input} /></label>
            <label className={`${field} sm:col-span-2`}>Skin types <small className="font-normal text-neutral-500">(comma separated)</small><input name="skin_types" defaultValue={p?.skin_types?.join(", ")} placeholder="Oily, Combination" className={input} /></label>
            <label className={`${field} sm:col-span-2`}>Concerns <small className="font-normal text-neutral-500">(Acne, Dark spots, Hydration, Barrier repair, Oil control, Sun protection…)</small><input name="concerns" defaultValue={p?.concerns?.join(", ")} className={input} /></label>
            <label className={`${field} sm:col-span-2`}>Best for<input name="best_for" defaultValue={v("best_for")} className={input} /></label>
          </div>
          <label className={field}>Description<textarea name="description" rows={4} defaultValue={v("description")} className={input} /></label>
          <label className={field}>How to use<textarea name="how_to_use" rows={3} defaultValue={v("how_to_use")} className={input} /></label>
          <label className={field}>Key ingredients<textarea name="ingredients" rows={3} defaultValue={v("ingredients")} className={input} /></label>
        </Card>
        <div className="grid content-start gap-4">
          <Card className="grid gap-3">
            <h3 className="font-bold">Image</h3>
            {p?.image && <div className="relative aspect-square overflow-hidden rounded-xl bg-sunk"><Image src={p.image} alt="" fill sizes="340px" className="object-cover" /></div>}
            <label className={field}>Upload new image<input name="image_file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="text-sm font-normal" /></label>
            <label className={field}>…or image URL / path<input name="image" defaultValue={v("image")} placeholder="/img/product.webp" className={input} /></label>
            <p className="text-xs text-neutral-500">Square images, at least 1000×1000 px, under 5 MB.</p>
          </Card>
          <Card className="grid gap-3">
            <label className="flex items-center gap-2.5 text-sm font-semibold"><input type="checkbox" name="is_active" defaultChecked={p ? p.is_active : true} className="h-4 w-4 accent-rasp" /> Visible in store</label>
            <button className="btn-primary justify-center">{p ? "Save changes" : "Create product"}</button>
            <Link href="/admin/products" className="text-center text-sm text-neutral-500 underline">Cancel</Link>
          </Card>
        </div>
      </form>
      {p && (
        <form action={deleteProduct} className="mt-4 flex items-center justify-between rounded-2xl border border-red-200 p-4 dark:border-red-500/30">
          <input type="hidden" name="slug" value={p.slug} />
          <p className="text-sm"><b>Delete this product</b><br /><small className="text-neutral-500">This removes it permanently. Tip: untick “Visible in store” to hide it instead.</small></p>
          <ConfirmButton label="Delete product" />
        </form>
      )}
    </>
  );
}
