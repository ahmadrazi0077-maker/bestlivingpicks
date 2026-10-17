/** Shared helpers for the article table of contents. */

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface TocHeading {
  id: string;
  text: string;
}

/** Pulls `## ` headings out of markdown so we can render a TOC. */
export function extractHeadings(markdown: string): TocHeading[] {
  const out: TocHeading[] = [];
  for (const m of markdown.matchAll(/^##\s+(.+)$/gm)) {
    const text = m[1].replace(/[*_`]/g, '').trim();
    if (text) out.push({ id: slugify(text), text });
  }
  return out;
}
