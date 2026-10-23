import { supabase } from "./supabase";
import { PRODUCTS, POSTS } from "./data";
import type { Post, Product } from "./types";

/* Reads from Supabase when configured, otherwise falls back to the bundled catalog,
   so the site works out of the box. */

type ProductRow = {
  slug: string; name: string; brand: string; category: string; size: string; price: number;
  compare_at: number | null; rating: number; review_count: number; skin_types: string[];
  concerns: string[]; best_for: string; tag: string | null; description: string;
  how_to_use: string; ingredients: string; image: string;
};

const mapProduct = (r: ProductRow): Product => ({
  id: r.slug, slug: r.slug, name: r.name, brand: r.brand, category: r.category, size: r.size,
  price: Number(r.price), compareAt: r.compare_at ? Number(r.compare_at) : null, rating: Number(r.rating),
  reviews: r.review_count, skinTypes: r.skin_types, concerns: r.concerns, bestFor: r.best_for,
  tag: r.tag, description: r.description, howToUse: r.how_to_use, ingredients: r.ingredients, image: r.image,
});

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return PRODUCTS;
  const { data, error } = await supabase.from("products").select("*").order("review_count", { ascending: false });
  if (error || !data?.length) return PRODUCTS;
  return (data as ProductRow[]).map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

type PostRow = {
  slug: string; title: string; tag: string; published_at: string; read_time: string;
  meta_description: string; focus_keyword: string; keywords: string[]; hashtags: string[];
  excerpt: string; body: Post["body"]; faq: Post["faq"];
};

export async function getPosts(): Promise<Post[]> {
  if (!supabase) return POSTS;
  const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
  if (error || !data?.length) return POSTS;
  return (data as PostRow[]).map((r) => ({
    slug: r.slug, title: r.title, tag: r.tag, date: r.published_at, readTime: r.read_time,
    metaDescription: r.meta_description, focusKeyword: r.focus_keyword, keywords: r.keywords,
    hashtags: r.hashtags, excerpt: r.excerpt, body: r.body, faq: r.faq,
  }));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}
