import type { MetadataRoute } from 'next';
import { api } from '../lib/api';

const SITE = 'https://bestlivingpicks.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '',
    '/articles',
    '/products',
    '/about',
    '/contact',
    '/affiliate-disclosure',
    '/privacy',
    '/terms',
  ].map((p) => ({ url: `${SITE}${p}`, lastModified: new Date(), changeFrequency: 'weekly' as const }));

  try {
    const [{ articles }, { categories }] = await Promise.all([
      api.articles({ limit: 100 }),
      api.categories(),
    ]);
    const articleUrls = articles.map((a) => ({
      url: `${SITE}/articles/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : new Date(),
      changeFrequency: 'monthly' as const,
    }));
    const categoryUrls = categories.map((c) => ({
      url: `${SITE}/categories/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
    }));
    return [...staticPages, ...articleUrls, ...categoryUrls];
  } catch {
    return staticPages;
  }
}
