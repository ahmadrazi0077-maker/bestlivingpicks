const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  articles?: ArticleSummary[];
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  reading_time_min: number | null;
  featured: boolean;
  category?: { id: string; name: string; slug: string } | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  price: number | null;
  rating: number | null;
  review_count: number | null;
  image_url: string | null;
  affiliate_url: string | null;
  pros: string[] | null;
  cons: string[] | null;
  specs: Record<string, unknown>;
  badge: string | null;
  category?: { id: string; name: string; slug: string } | null;
}

export interface Article extends ArticleSummary {
  content_md: string;
  seo_title: string | null;
  seo_description: string | null;
  products: Product[];
}

async function get<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`API ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  articles: (params: { category?: string; featured?: boolean; limit?: number } = {}) => {
    const q = new URLSearchParams();
    if (params.category) q.set('category', params.category);
    if (params.featured) q.set('featured', 'true');
    if (params.limit) q.set('limit', String(params.limit));
    const qs = q.toString();
    return get<{ articles: ArticleSummary[] }>(`/articles${qs ? `?${qs}` : ''}`);
  },
  article: (slug: string) => get<{ article: Article }>(`/articles/${slug}`, 3600),
  categories: () => get<{ categories: Category[] }>('/categories'),
  category: (slug: string) => get<{ category: Category }>(`/categories/${slug}`),
  products: (params: { category?: string; limit?: number } = {}) => {
    const q = new URLSearchParams();
    if (params.category) q.set('category', params.category);
    if (params.limit) q.set('limit', String(params.limit));
    const qs = q.toString();
    return get<{ products: Product[] }>(`/products${qs ? `?${qs}` : ''}`);
  },
  product: (slug: string) => get<{ product: Product }>(`/products/${slug}`),
  subscribe: async (email: string) => {
    const res = await fetch(`${API_BASE}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
    if (!res.ok || !data.ok) {
      throw new Error(data.error ?? 'Subscription failed');
    }
    return data;
  },
};

export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}
