import type { PostBlock } from "./types";

/* Simple writing format for the admin blog editor:
   ## Heading      → h2
   - item          → bullet list (consecutive lines)
   > text          → "NAC tip" box
   [product:slug]  → inline product card
   anything else   → paragraph (blank line separates paragraphs; <b>bold</b> allowed) */
export function blocksToText(blocks: PostBlock[]): string {
  return blocks.map((b) => {
    if (b.type === "h2") return `## ${b.value}`;
    if (b.type === "ul") return b.value.map((x) => `- ${x}`).join("\n");
    if (b.type === "tip") return `> ${b.value}`;
    if (b.type === "prod") return `[product:${b.value}]`;
    return b.value;
  }).join("\n\n");
}

export function textToBlocks(text: string): PostBlock[] {
  const out: PostBlock[] = [];
  for (const chunk of text.replace(/\r/g, "").split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => l.startsWith("- "))) { out.push({ type: "ul", value: lines.map((l) => l.slice(2)) }); continue; }
    for (const l of lines) {
      const prod = l.match(/^\[product:([\w-]+)\]$/);
      if (prod) out.push({ type: "prod", value: prod[1] });
      else if (l.startsWith("## ")) out.push({ type: "h2", value: l.slice(3) });
      else if (l.startsWith("> ")) out.push({ type: "tip", value: l.slice(2) });
      else if (l.startsWith("- ")) out.push({ type: "ul", value: [l.slice(2)] });
      else {
        const last = out[out.length - 1];
        if (last && last.type === "p" && lines.indexOf(l) > 0) last.value += " " + l; else out.push({ type: "p", value: l });
      }
    }
  }
  return out;
}

export const faqToText = (f: { q: string; a: string }[]) => f.map((x) => `Q: ${x.q}\nA: ${x.a}`).join("\n\n");
export const textToFaq = (t: string) =>
  t.replace(/\r/g, "").split(/\n\s*\n/).map((c) => {
    const q = c.match(/Q:\s*(.+)/)?.[1]?.trim(); const a = c.match(/A:\s*([\s\S]+)/)?.[1]?.trim();
    return q && a ? { q, a } : null;
  }).filter(Boolean) as { q: string; a: string }[];
