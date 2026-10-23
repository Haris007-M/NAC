import { Img as Image } from "@/components/Img";
import Link from "next/link";
import type { Post, Product } from "@/lib/types";
import { fmtDate } from "@/lib/utils";

export function PostCard({ post, products }: { post: Post; products: Product[] }) {
  const pid = post.body.find((b) => b.type === "prod")?.value as string | undefined;
  const img = products.find((p) => p.slug === pid)?.image ?? "/img/boj-relief-sun.webp";
  return (
    <Link href={`/journal/${post.slug}`} className="reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#151217]">
      <div className="relative aspect-video overflow-hidden"><Image src={img} alt="" fill sizes="(max-width:700px) 80vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
      <div className="grid gap-2 p-5">
        <span className="eyebrow">{post.tag}</span>
        <h3 className="font-head text-lg font-extrabold leading-snug">{post.title}</h3>
        <p className="text-sm text-neutral-500">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1.5">{post.hashtags.slice(0, 3).map((h) => <span key={h} className="rounded-full bg-rasp-soft px-2.5 py-0.5 text-xs font-semibold text-rasp dark:bg-rasp/20 dark:text-rasp-light">{h}</span>)}</div>
        <span className="text-xs text-neutral-500">{fmtDate(post.date)} · {post.readTime} read</span>
      </div>
    </Link>
  );
}
