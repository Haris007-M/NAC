"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServer, requireAdmin } from "@/lib/supabase-server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";
import { textToBlocks, textToFaq } from "@/lib/postFormat";

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const num = (f: FormData, k: string) => { const v = str(f, k); return v === "" ? null : Number(v); };
const list = (f: FormData, k: string) => str(f, k).split(",").map((s) => s.trim()).filter(Boolean);
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
const refreshStore = () => revalidatePath("/", "layout");

/* ---------------- auth ---------------- */
export async function login(_: unknown, f: FormData) {
  if (!isSupabaseConfigured) return { error: "Supabase is not connected yet. Add your keys to .env.local." };
  const sb = createSupabaseServer();
  const { data, error } = await sb.auth.signInWithPassword({ email: str(f, "email"), password: str(f, "password") });
  if (error || !data.user) return { error: "Incorrect email or password." };
  const { data: adm } = await sb.from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!adm) { await sb.auth.signOut(); return { error: "This account does not have admin access." }; }
  redirect("/admin");
}
export async function logout() {
  await createSupabaseServer().auth.signOut();
  redirect("/admin/login");
}

/* ---------------- products ---------------- */
export async function saveProduct(f: FormData) {
  const { sb } = await requireAdmin();
  const original = str(f, "original_slug");
  const slug = slugify(str(f, "slug") || str(f, "name"));
  let image = str(f, "image");
  const file = f.get("image_file");
  if (file instanceof File && file.size > 0) {
    if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB");
    if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type)) throw new Error("Use a JPG, PNG, WebP or AVIF image");
    const path = `${slug}-${Date.now()}.${file.type.split("/")[1]}`;
    const { error } = await sb.storage.from("products").upload(path, file, { contentType: file.type, upsert: true });
    if (error) throw new Error("Upload failed: " + error.message);
    image = sb.storage.from("products").getPublicUrl(path).data.publicUrl;
  }
  const row = {
    slug, name: str(f, "name"), brand: str(f, "brand"), category: str(f, "category"), size: str(f, "size"),
    price: num(f, "price") ?? 0, compare_at: num(f, "compare_at"), rating: num(f, "rating") ?? 0, review_count: num(f, "review_count") ?? 0,
    skin_types: list(f, "skin_types"), concerns: list(f, "concerns"), best_for: str(f, "best_for"), tag: str(f, "tag") || null,
    description: str(f, "description"), how_to_use: str(f, "how_to_use"), ingredients: str(f, "ingredients"),
    image, stock: num(f, "stock") ?? 0, is_active: f.get("is_active") === "on",
  };
  const q = original ? sb.from("products").update(row).eq("slug", original) : sb.from("products").insert(row);
  const { error } = await q;
  if (error) throw new Error(error.message);
  refreshStore();
  redirect("/admin/products?saved=1");
}
export async function deleteProduct(f: FormData) {
  const { sb } = await requireAdmin();
  await sb.from("products").delete().eq("slug", str(f, "slug"));
  refreshStore();
  redirect("/admin/products?deleted=1");
}
export async function toggleProduct(f: FormData) {
  const { sb } = await requireAdmin();
  await sb.from("products").update({ is_active: str(f, "active") !== "true" }).eq("slug", str(f, "slug"));
  refreshStore(); revalidatePath("/admin/products");
}

/* ---------------- posts ---------------- */
export async function savePost(f: FormData) {
  const { sb } = await requireAdmin();
  const original = str(f, "original_slug");
  const row = {
    slug: slugify(str(f, "slug") || str(f, "title")), title: str(f, "title"), tag: str(f, "tag"),
    published_at: str(f, "published_at") || new Date().toISOString().slice(0, 10), read_time: str(f, "read_time"),
    meta_description: str(f, "meta_description"), focus_keyword: str(f, "focus_keyword"),
    keywords: list(f, "keywords"), hashtags: list(f, "hashtags"), excerpt: str(f, "excerpt"),
    body: textToBlocks(str(f, "body")), faq: textToFaq(str(f, "faq")), is_published: f.get("is_published") === "on",
  };
  const { error } = original ? await sb.from("posts").update(row).eq("slug", original) : await sb.from("posts").insert(row);
  if (error) throw new Error(error.message);
  refreshStore();
  redirect("/admin/posts?saved=1");
}
export async function deletePost(f: FormData) {
  const { sb } = await requireAdmin();
  await sb.from("posts").delete().eq("slug", str(f, "slug"));
  refreshStore();
  redirect("/admin/posts?deleted=1");
}

/* ---------------- orders ---------------- */
export async function updateOrderStatus(f: FormData) {
  const { sb } = await requireAdmin();
  await sb.from("orders").update({ status: str(f, "status") }).eq("id", str(f, "id"));
  revalidatePath("/admin/orders"); revalidatePath("/admin");
}
export async function deleteOrder(f: FormData) {
  const { sb } = await requireAdmin();
  await sb.from("orders").delete().eq("id", str(f, "id"));
  revalidatePath("/admin/orders"); revalidatePath("/admin");
}

/* ---------------- newsletter ---------------- */
export async function deleteSubscriber(f: FormData) {
  const { sb } = await requireAdmin();
  await sb.from("newsletter").delete().eq("email", str(f, "email"));
  revalidatePath("/admin/newsletter");
}

/* ---------------- team (owner only) ---------------- */
export async function addAdmin(f: FormData) {
  const { role } = await requireAdmin();
  if (role !== "owner") throw new Error("Only the owner can add admins.");
  const admin = supabaseAdmin();
  if (!admin) throw new Error("Add SUPABASE_SERVICE_ROLE_KEY to .env.local first.");
  const email = str(f, "email").toLowerCase(), password = str(f, "password");
  if (password.length < 12) throw new Error("Password must be at least 12 characters.");
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !data.user) throw new Error(error?.message ?? "Could not create user");
  await admin.from("admins").insert({ user_id: data.user.id, email, role: "admin" });
  revalidatePath("/admin/team");
}
export async function removeAdmin(f: FormData) {
  const { role, user } = await requireAdmin();
  if (role !== "owner") throw new Error("Only the owner can remove admins.");
  const id = str(f, "user_id");
  if (id === user.id) throw new Error("You can't remove yourself.");
  const admin = supabaseAdmin();
  if (!admin) throw new Error("Service role key missing.");
  await admin.from("admins").delete().eq("user_id", id);
  await admin.auth.admin.deleteUser(id);
  revalidatePath("/admin/team");
}
