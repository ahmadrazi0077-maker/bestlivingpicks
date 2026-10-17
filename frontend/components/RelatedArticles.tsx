import { api, type ArticleSummary } from '../lib/api';
import ArticleCard from './ArticleCard';

/**
 * "Keep reading" — related articles from the same category.
 * Server component: fetches at request time like the rest of the page.
 */
export default async function RelatedArticles({
  categorySlug,
  currentSlug,
}: {
  categorySlug?: string;
  currentSlug: string;
}) {
  if (!categorySlug) return null;

  let related: ArticleSummary[] = [];
  try {
    const { articles } = await api.articles({ category: categorySlug, limit: 4 });
    related = articles.filter((a) => a.slug !== currentSlug).slice(0, 3);
  } catch {
    return null;
  }
  if (related.length === 0) return null;

  return (
    <section className="mt-14" aria-label="Related articles">
      <h2 className="text-2xl font-bold text-night-900">Keep reading</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
