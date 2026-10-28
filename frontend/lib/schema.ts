// Structured-data helpers for SEO — NEW FILE, save as frontend/lib/schema.ts
//
// - extractFaqs: parses the "Frequently asked questions" section of an
//   article's markdown (### Question + answer paragraph) into FAQPage data.
//   The FAQ text must stay visible on the page (it is — the section is
//   rendered from content_md), which is what FAQPage schema requires.
// - buildProductListSchema: ItemList of Product entries for /products.
//   Deliberately NO offers / aggregateRating: DB prices are static seed
//   values (not live retailer prices) and ratings are unverified, so
//   emitting them as structured data would be misleading. Add offers only
//   once prices come from a verified live source (e.g. PA-API after the
//   first 3 qualifying sales).

export interface FaqItem {
  question: string;
  answer: string;
}

function plainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFaqs(contentMd: string): FaqItem[] {
  const lines = contentMd.split('\n');
  // Find the FAQ section heading (any level, case-insensitive).
  const start = lines.findIndex((l) =>
    /^#{1,4}\s+frequently asked questions/i.test(l.trim())
  );
  if (start === -1) return [];
  const faqs: FaqItem[] = [];
  let current: FaqItem | null = null;
  for (const raw of lines.slice(start + 1)) {
    const line = raw.trim();
    if (/^#{1,2}\s+/.test(line)) break; // next major section ends the FAQs
    const q = line.match(/^###\s+(.+)/);
    if (q) {
      if (current) faqs.push(current);
      current = { question: plainText(q[1]), answer: '' };
      continue;
    }
    if (current && line) {
      current.answer += (current.answer ? ' ' : '') + plainText(line);
    }
  }
  if (current) faqs.push(current);
  return faqs.filter((f) => f.question && f.answer);
}

export function buildFaqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildProductListSchema(
  products: {
    name: string;
    image_url?: string | null;
    brand?: string | null;
  }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        image: p.image_url || undefined,
        brand: p.brand ? { '@type': 'Brand', name: p.brand } : undefined,
      },
    })),
  };
}
