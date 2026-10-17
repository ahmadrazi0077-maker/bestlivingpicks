#!/usr/bin/env node
/**
 * BestLivingPicks — local MOCK API for frontend development.
 *
 * The frontend's data pages (server components) call the Express API at
 * NEXT_PUBLIC_API_URL (default http://localhost:4000/api). If the Express
 * backend + Supabase are not running yet, those pages error out.
 *
 * This file is a zero-dependency mock that serves the EXACT same
 * endpoints and response shapes, so you can develop the frontend standalone:
 *
 *   node mock-api.cjs            # serves on http://localhost:4000
 *   # in another terminal, run the frontend as usual:
 *   npm run dev
 *
 * When the real backend is ready, stop this and run the Express server
 * instead — no frontend changes needed.
 *
 * DEV ONLY. Do not deploy this; it serves placeholder content and
 * affiliate_url still contains the YOUR-AMAZON-TAG-20 placeholder.
 */
'use strict';

const http = require('http');
const PORT = 4000;

const AFF = 'YOUR-AMAZON-TAG-20';

// ---------------------------------------------------------------- categories
const categories = [
  { id: 'c1', name: 'Mattresses',       slug: 'mattresses',       description: 'In-depth mattress reviews, comparisons, and top picks for every sleep style and budget.' },
  { id: 'c2', name: 'Pillows',          slug: 'pillows',          description: 'Pillow reviews and guides — find the right loft, fill, and firmness for how you sleep.' },
  { id: 'c3', name: 'Bedding & Sheets', slug: 'bedding-sheets',   description: 'Sheets, duvets, and bedding essentials for a cooler, more comfortable bed.' },
  { id: 'c4', name: 'Mattress Toppers', slug: 'mattress-toppers', description: 'Toppers that soften, cool, or revive a mattress without replacing it.' },
  { id: 'c5', name: 'Reviews',          slug: 'reviews',          description: 'Hands-on single-product reviews with specs, pros, cons, and verdicts.' },
  { id: 'c6', name: 'Buying Guides',    slug: 'buying-guides',    description: 'Evergreen guides that explain what to look for before you buy.' },
];

// ------------------------------------------------------------------ products
const products = [
  {
    id: 'p1', name: 'Tempur-Pedic Tempur-ProAdapt 12" Mattress', slug: 'tempur-pedic-tempur-proadapt',
    brand: 'Tempur-Pedic', price: 2199.0, rating: 4.6, review_count: 8420,
    image_url: 'https://placehold.co/600x400/312e81/ffffff?text=Tempur-Pedic+ProAdapt',
    affiliate_url: `https://www.amazon.com/dp/EXAMPLE01?tag=${AFF}`,
    pros: ['Exceptional pressure relief from TEMPUR material', 'Excellent motion isolation for couples', 'Removable, washable cover'],
    cons: ['Premium price', 'Heavy and difficult to move'],
    specs: { type: 'Memory foam', firmness: 'Medium', thickness_in: 12, trial_nights: 90, warranty_years: 10 },
    badge: 'Best Overall', category: { id: 'c1', name: 'Mattresses', slug: 'mattresses' },
  },
  {
    id: 'p2', name: 'Saatva Classic Mattress', slug: 'saatva-classic',
    brand: 'Saatva', price: 1695.0, rating: 4.8, review_count: 12350,
    image_url: 'https://placehold.co/600x400/1e3a5f/ffffff?text=Saatva+Classic',
    affiliate_url: `https://www.amazon.com/dp/EXAMPLE02?tag=${AFF}`,
    pros: ['Luxury hotel-bed feel with Euro pillow top', '365-night trial — longest in the industry', 'Free white-glove delivery'],
    cons: ['Pricier than bed-in-a-box competitors', 'Setup is a two-person job'],
    specs: { type: 'Innerspring hybrid', firmness: 'Luxury Firm', thickness_in: 11.5, trial_nights: 365, warranty_years: 15 },
    badge: 'Best Luxury', category: { id: 'c1', name: 'Mattresses', slug: 'mattresses' },
  },
  {
    id: 'p3', name: 'Nectar Classic Hybrid 5.1 Mattress', slug: 'nectar-classic-hybrid-5-1',
    brand: 'Nectar', price: 949.0, rating: 4.5, review_count: 21400,
    image_url: 'https://placehold.co/600x400/0f766e/ffffff?text=Nectar+Hybrid+5.1',
    affiliate_url: `https://www.amazon.com/dp/EXAMPLE03?tag=${AFF}`,
    pros: ['Outstanding value for a 12-inch hybrid', '365-night trial and strong warranty', 'Heat-wicking cover sleeps neutral'],
    cons: ['Edge support is just average', 'Newer model with fewer long-term reviews'],
    specs: { type: 'Hybrid', firmness: 'Medium', thickness_in: 12, trial_nights: 365, warranty_years: 10 },
    badge: 'Best Value', category: { id: 'c1', name: 'Mattresses', slug: 'mattresses' },
  },
  {
    id: 'p4', name: 'Brooklyn Bedding Aurora Luxe Cooling Mattress', slug: 'brooklyn-bedding-aurora-luxe',
    brand: 'Brooklyn Bedding', price: 1499.0, rating: 4.7, review_count: 6120,
    image_url: 'https://placehold.co/600x400/0284c7/ffffff?text=Aurora+Luxe',
    affiliate_url: `https://www.amazon.com/dp/EXAMPLE04?tag=${AFF}`,
    pros: ['Phase-change material sleeps noticeably cool', 'Great pressure relief without sinking', 'Made in the USA'],
    cons: ['Slight off-gassing for a day or two', 'Limited white-glove delivery'],
    specs: { type: 'Hybrid', firmness: 'Medium', thickness_in: 13.5, trial_nights: 120, warranty_years: 10, cooling: 'Phase-change + copper coils' },
    badge: 'Best Cooling', category: { id: 'c1', name: 'Mattresses', slug: 'mattresses' },
  },
  {
    id: 'p5', name: 'Tempur-Pedic TEMPUR-Adapt Cooling Pillow', slug: 'tempur-adapt-cooling-pillow',
    brand: 'Tempur-Pedic', price: 99.0, rating: 4.4, review_count: 3100,
    image_url: 'https://placehold.co/600x400/7c3aed/ffffff?text=Tempur+Pillow',
    affiliate_url: `https://www.amazon.com/dp/EXAMPLE05?tag=${AFF}`,
    pros: ['Cooling cover stays cool through the night', 'Dense memory foam holds its shape'],
    cons: ['Firm for stomach sleepers', 'Pricey for a pillow'],
    specs: { type: 'Memory foam', loft: 'Standard/Queen', washable_cover: true },
    badge: 'Best Pillow', category: { id: 'c2', name: 'Pillows', slug: 'pillows' },
  },
  {
    id: 'p6', name: 'Linenspa 8" Memory Foam Mattress', slug: 'linenspa-8-memory-foam',
    brand: 'Linenspa', price: 299.0, rating: 4.2, review_count: 48900,
    image_url: 'https://placehold.co/600x400/b45309/ffffff?text=Linenspa',
    affiliate_url: `https://www.amazon.com/dp/EXAMPLE06?tag=${AFF}`,
    pros: ['Unbeatable price for a mattress', 'Ships compressed in a box'],
    cons: ['Thin — needs a good base', 'No real cooling features'],
    specs: { type: 'Memory foam', firmness: 'Medium', thickness_in: 8, trial_nights: 30, warranty_years: 5 },
    badge: 'Best Budget', category: { id: 'c1', name: 'Mattresses', slug: 'mattresses' },
  },
];

// ------------------------------------------------------------------ articles
const articleDefs = [
  ['Best Mattresses of 2026 for Every Sleep Style', 'best-mattresses-2026', 'mattresses', true, 14],
  ['Best Cooling Mattresses for Hot Sleepers (2026)', 'best-cooling-mattresses-2026', 'mattresses', true, 11],
  ['Tempur-Pedic vs Saatva vs Nectar: The 2026 Showdown', 'tempur-pedic-vs-saatva-vs-nectar', 'reviews', false, 13],
  ['Best Mattresses for Back Pain (2026)', 'best-mattresses-for-back-pain-2026', 'mattresses', true, 10],
  ['Best Budget Mattresses Under $500', 'best-budget-mattresses-under-500', 'mattresses', false, 8],
  ['Saatva Classic Review (2026)', 'saatva-classic-review-2026', 'reviews', false, 9],
  ['Best Cooling Pillows for Hot Sleepers', 'best-cooling-pillows-hot-sleepers', 'pillows', false, 7],
  ['Coil vs Hybrid vs Memory Foam: Which Is Right for You?', 'coil-vs-hybrid-vs-memory-foam', 'buying-guides', false, 12],
  ['Mattress Buying Guide: Firmness and Trial Periods Explained', 'mattress-buying-guide-2026', 'buying-guides', false, 15],
  ['Nectar Classic Hybrid 5.1 Review', 'nectar-classic-hybrid-5-1-review', 'reviews', false, 8],
];

const articles = articleDefs.map(([title, slug, catSlug, featured, reading_time_min], i) => {
  const cat = categories.find((c) => c.slug === catSlug);
  const date = new Date(Date.UTC(2026, 9, 15 - i)).toISOString();
  return {
    id: `a${i + 1}`,
    title,
    slug,
    excerpt: `${title} — mock excerpt. Replace with the real article copy from the seed data when the backend is live.`,
    cover_image_url: `https://placehold.co/1200x630/1e293b/ffffff?text=${encodeURIComponent(title.slice(0, 30))}`,
    published_at: date,
    reading_time_min,
    featured,
    category: { id: cat.id, name: cat.name, slug: cat.slug },
    content_md: `# ${title}\n\n> This is MOCK content for local frontend development. The full article lives in the Supabase seed data — run the real backend for the real copy.\n\n## Why this matters\n\nMock paragraph one. The component rendering (headings, product cards, comparison tables, pros/cons) can be styled against this.\n\n## Top picks\n\nMock paragraph two — imagine a real review here.\n`,
    seo_title: `${title} | BestLivingPicks`,
    seo_description: `${title} — mock SEO description for local development.`,
    products: products.filter((p) => p.category.slug === catSlug || catSlug === 'mattresses' || catSlug === 'reviews').slice(0, 3),
  };
});

function summary(a) {
  const { id, title, slug, excerpt, cover_image_url, published_at, reading_time_min, featured, category } = a;
  return { id, title, slug, excerpt, cover_image_url, published_at, reading_time_min, featured, category };
}

function json(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(data));
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  try {
    // GET /api/articles?category=slug&featured=true&limit=20
    if (req.method === 'GET' && path === '/api/articles') {
      let list = [...articles].sort((a, b) => (b.published_at > a.published_at ? 1 : -1));
      const catSlug = url.searchParams.get('category');
      if (catSlug) {
        if (!categories.some((c) => c.slug === catSlug)) return json(res, 404, { error: 'Category not found' });
        list = list.filter((a) => a.category.slug === catSlug);
      }
      if (url.searchParams.get('featured') === 'true') list = list.filter((a) => a.featured);
      const limit = parseInt(url.searchParams.get('limit') || '20', 10);
      list = list.slice(0, Number.isFinite(limit) && limit > 0 ? limit : 20);
      return json(res, 200, { articles: list.map(summary) });
    }

    // GET /api/articles/:slug
    const am = path.match(/^\/api\/articles\/([a-z0-9-]+)$/);
    if (req.method === 'GET' && am) {
      const found = articles.find((a) => a.slug === am[1]);
      if (!found) return json(res, 404, { error: 'Article not found' });
      return json(res, 200, { article: found });
    }

    // GET /api/categories
    if (req.method === 'GET' && path === '/api/categories') {
      const sorted = [...categories].sort((a, b) => a.name.localeCompare(b.name));
      return json(res, 200, { categories: sorted.map(({ id, name, slug, description }) => ({ id, name, slug, description })) });
    }

    // GET /api/categories/:slug
    const cm = path.match(/^\/api\/categories\/([a-z0-9-]+)$/);
    if (req.method === 'GET' && cm) {
      const found = categories.find((c) => c.slug === cm[1]);
      if (!found) return json(res, 404, { error: 'Category not found' });
      const catArticles = articles
        .filter((a) => a.category.slug === found.slug)
        .sort((a, b) => (b.published_at > a.published_at ? 1 : -1))
        .map(summary);
      return json(res, 200, { category: { ...found, articles: catArticles } });
    }

    // GET /api/products?category=slug&limit=20
    if (req.method === 'GET' && path === '/api/products') {
      let list = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      const catSlug = url.searchParams.get('category');
      if (catSlug) {
        if (!categories.some((c) => c.slug === catSlug)) return json(res, 404, { error: 'Category not found' });
        list = list.filter((p) => p.category.slug === catSlug);
      }
      const limit = parseInt(url.searchParams.get('limit') || '20', 10);
      list = list.slice(0, Number.isFinite(limit) && limit > 0 ? limit : 20);
      return json(res, 200, { products: list });
    }

    // GET /api/products/:slug
    const pm = path.match(/^\/api\/products\/([a-z0-9-]+)$/);
    if (req.method === 'GET' && pm) {
      const found = products.find((p) => p.slug === pm[1]);
      if (!found) return json(res, 404, { error: 'Product not found' });
      return json(res, 200, { product: found });
    }

    // POST /api/subscribers
    if (req.method === 'POST' && path === '/api/subscribers') {
      let body = {};
      try { body = JSON.parse((await readBody(req)) || '{}'); } catch { body = {}; }
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json(res, 400, { error: 'A valid email address is required.' });
      }
      return json(res, 201, { ok: true, message: 'Subscribed successfully.' });
    }

    return json(res, 404, { error: 'Not found' });
  } catch (err) {
    return json(res, 500, { error: 'Mock server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}/api`);
});
