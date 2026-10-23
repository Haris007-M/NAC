import type { Metadata } from "next";
import { Img as Image } from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { PostCard } from "@/components/PostCard";
import { getPost, getPosts, getProducts } from "@/lib/queries";
import { SITE_URL, fmtDate, money } from "@/lib/utils";

type P = { params: { slug: string } };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = await getPost(params.slug);
  if (!p) return {};
  return { title: p.title, description: p.metaDescription, keywords: [p.focusKeyword, ...p.keywords], alternates: { canonical: `/journal/${p.slug}` }, openGraph: { type: "article", publishedTime: p.date } };
}

export default async function PostPage({ params }: P) {
  const [post, posts, products] = await Promise.all([getPost(params.slug), getPosts(), getProducts()]);
  if (!post) notFound();
  const toc = post.body.filter((b) => b.type === "h2").map((b) => b.value as string);
  const ld = [
    { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.metaDescription, keywords: [post.focusKeyword, ...post.keywords].join(", "), datePublished: post.date, author: { "@type": "Organization", name: "NACosmetics" }, publisher: { "@type": "Organization", name: "NACosmetics" }, mainEntityOfPage: `${SITE_URL}/journal/${post.slug}` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` }, { "@type": "ListItem", position: 3, name: post.title }] },
  ];
  return (
    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article className="prose-nac mx-auto mt-8 max-w-[720px]">
        <p className="text-sm text-neutral-500"><Link href="/" className="underline">Home</Link> / <Link href="/journal" className="underline">Journal</Link> / {post.tag}</p>
        <span className="eyebrow mt-4 block">{post.tag}</span>
        <h1 className="mt-2 font-head text-[clamp(28px,4vw,42px)] font-extrabold leading-tight">{post.title}</h1>
        <p className="!text-sm text-neutral-500">By the NAC Skincare Team · {fmtDate(post.date, true)} · {post.readTime} read</p>
        <div className="my-3 flex flex-wrap gap-1.5">{post.hashtags.map((h) => <span key={h} className="rounded-full bg-rasp-soft px-2.5 py-0.5 text-xs font-semibold text-rasp">{h}</span>)}</div>
        <nav className="my-5 rounded-xl border border-line bg-sunk p-5 dark:border-white/10 dark:bg-white/5">
          <b>In this article</b>
          <ol className="mt-2 list-decimal pl-5">{toc.map((t, i) => <li key={t}><a href={`#s-${i}`} className="text-rasp">{t}</a></li>)}<li><a href="#faq" className="text-rasp">FAQ</a></li></ol>
        </nav>
        {post.body.map((b, i) => {
          if (b.type === "h2") return <h2 key={i} id={`s-${toc.indexOf(b.value)}`} className="scroll-mt-24">{b.value}</h2>;
          if (b.type === "p") return <p key={i} className="my-3" dangerouslySetInnerHTML={{ __html: b.value }} />;
          if (b.type === "ul") return <ul key={i} className="my-3">{b.value.map((x) => <li key={x} dangerouslySetInnerHTML={{ __html: x }} />)}</ul>;
          if (b.type === "tip") return <div key={i} className="my-5 rounded-xl border-l-4 border-rasp bg-rasp-soft/60 px-5 py-4 dark:bg-rasp/10"><b>NAC tip</b><p className="mt-1" dangerouslySetInnerHTML={{ __html: b.value }} /></div>;
          const p = products.find((x) => x.slug === b.value);
          if (!p) return null;
          return (
            <div key={i} className="my-5 flex items-center gap-4 rounded-xl border border-line bg-sunk p-3 dark:border-white/10 dark:bg-white/5">
              <Link href={`/product/${p.slug}`} className="relative h-[72px] w-[72px] flex-none overflow-hidden rounded-lg"><Image src={p.image} alt={p.name} fill sizes="72px" className="object-cover" /></Link>
              <div className="min-w-0 flex-1"><p className="!text-xs font-bold uppercase tracking-widest text-neutral-500">{p.brand}</p><Link href={`/product/${p.slug}`} className="font-bold">{p.name}</Link><p className="!text-sm font-bold">{money(p.price)}</p></div>
              <AddToCart slug={p.slug} compact />
            </div>
          );
        })}
        <h2 id="faq" className="scroll-mt-24">Frequently asked questions</h2>
        {post.faq.map((f) => <details key={f.q} className="mb-2.5 rounded-xl border border-line px-5 py-3.5 dark:border-white/10"><summary className="cursor-pointer font-bold">{f.q}</summary><p className="mt-2 text-neutral-500">{f.a}</p></details>)}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-brand p-8 text-white">
          <div><h2 className="!m-0 !text-white">Shop the products in this guide</h2><p className="opacity-85">Every product we mention ships worldwide.</p></div>
          <Link href="/shop" className="btn-primary !bg-none !bg-ink">Shop now →</Link>
        </div>
      </article>
      <h2 className="h-section mb-6 mt-16">Keep <em>reading</em></h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{posts.filter((x) => x.slug !== post.slug).slice(0, 3).map((p) => <PostCard key={p.slug} post={p} products={products} />)}</div>
    </div>
  );
}
