export type Category = "Cleanser" | "Serum" | "Sun & Barrier";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category | string;
  size: string;
  price: number;
  compareAt?: number | null;
  rating: number;
  reviews: number;
  skinTypes: string[];
  concerns: string[];
  bestFor: string;
  tag?: string | null;
  description: string;
  howToUse: string;
  ingredients: string;
  image: string;
}

export type PostBlock =
  | { type: "p" | "h2" | "tip" | "prod"; value: string }
  | { type: "ul"; value: string[] };

export interface Post {
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string[];
  hashtags: string[];
  excerpt: string;
  body: PostBlock[];
  faq: { q: string; a: string }[];
}

export interface Review { name: string; product: string; text: string }

export interface CartLine { slug: string; qty: number }
