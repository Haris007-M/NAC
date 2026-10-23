import Link from "next/link";
import { savePost, deletePost } from "@/app/admin/actions";
import { blocksToText, faqToText } from "@/lib/postFormat";
import type { PostBlock } from "@/lib/types";
import { Card, field, input } from "./ui";
import { ConfirmButton } from "./ConfirmButton";

export type PostRow = {
  slug: string; title: string; tag: string | null; published_at: string | null; read_time: string | null; meta_description: string | null;
  focus_keyword: string | null; keywords: string[]; hashtags: string[]; excerpt: string | null; body: PostBlock[]; faq: { q: string; a: string }[]; is_published: boolean;
};

export function PostForm({ p }: { p?: PostRow }) {
  return (
    <>
      <form action={savePost} className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <input type="hidden" name="original_slug" value={p?.slug ?? ""} />
        <Card className="grid gap-4">
          <label className={field}>Title<input name="title" required defaultValue={p?.title} className={`${input} text-lg`} /></label>
          <label className={field}>Excerpt <small className="font-normal text-neutral-500">(shown on cards)</small><textarea name="excerpt" rows={2} defaultValue={p?.excerpt ?? ""} className={input} /></label>
          <label className={field}>
            Article body
            <small className="font-normal text-neutral-500">Write normally. <code>## Heading</code> · <code>- list item</code> · <code>&gt; NAC tip</code> · <code>[product:cosrx-snail-96]</code> inserts a product · blank line = new paragraph · <code>&lt;b&gt;bold&lt;/b&gt;</code></small>
            <textarea name="body" rows={22} defaultValue={p ? blocksToText(p.body) : ""} className={`${input} font-mono text-[13px] leading-relaxed`} />
          </label>
          <label className={field}>FAQ <small className="font-normal text-neutral-500">(appears in Google results) — format: Q: question ⏎ A: answer, blank line between</small>
            <textarea name="faq" rows={8} defaultValue={p ? faqToText(p.faq) : ""} className={`${input} font-mono text-[13px]`} /></label>
        </Card>
        <div className="grid content-start gap-4">
          <Card className="grid gap-3">
            <h3 className="font-bold">Publishing</h3>
            <label className="flex items-center gap-2.5 text-sm font-semibold"><input type="checkbox" name="is_published" defaultChecked={p ? p.is_published : true} className="h-4 w-4 accent-rasp" /> Published</label>
            <label className={field}>Date<input type="date" name="published_at" defaultValue={p?.published_at ?? new Date().toISOString().slice(0, 10)} className={input} /></label>
            <label className={field}>Category tag<input name="tag" defaultValue={p?.tag ?? ""} placeholder="Routines, Ingredients…" className={input} /></label>
            <label className={field}>Read time<input name="read_time" defaultValue={p?.read_time ?? ""} placeholder="6 min" className={input} /></label>
            <button className="btn-primary justify-center">{p ? "Save changes" : "Publish post"}</button>
            <Link href="/admin/posts" className="text-center text-sm text-neutral-500 underline">Cancel</Link>
          </Card>
          <Card className="grid gap-3">
            <h3 className="font-bold">SEO</h3>
            <label className={field}>URL slug<input name="slug" defaultValue={p?.slug} placeholder="auto from title" className={input} /></label>
            <label className={field}>Focus keyword<input name="focus_keyword" defaultValue={p?.focus_keyword ?? ""} className={input} /></label>
            <label className={field}>Meta description <small className="font-normal text-neutral-500">(150–160 chars)</small><textarea name="meta_description" rows={3} maxLength={170} defaultValue={p?.meta_description ?? ""} className={input} /></label>
            <label className={field}>Keywords <small className="font-normal text-neutral-500">(comma separated)</small><textarea name="keywords" rows={2} defaultValue={p?.keywords?.join(", ")} className={input} /></label>
            <label className={field}>Hashtags<input name="hashtags" defaultValue={p?.hashtags?.join(", ")} placeholder="#KBeauty, #GlassSkin" className={input} /></label>
          </Card>
        </div>
      </form>
      {p && (
        <form action={deletePost} className="mt-4 flex items-center justify-between rounded-2xl border border-red-200 p-4 dark:border-red-500/30">
          <input type="hidden" name="slug" value={p.slug} />
          <p className="text-sm"><b>Delete this post</b><br /><small className="text-neutral-500">Tip: untick “Published” to hide it instead.</small></p>
          <ConfirmButton label="Delete post" />
        </form>
      )}
    </>
  );
}
