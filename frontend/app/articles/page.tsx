import type { Metadata } from 'next';
import { api } from '../../lib/api';
import ArticleCard from '../../components/ArticleCard';
import Breadcrumbs from '../../components/Breadcrumbs';

// Rendered on the server per request (API must be reachable at runtime,
// not at build time).
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Every BestLivingPicks review, comparison, and buying guide for mattresses, pillows, and bedding.',
};

export default async function ArticlesPage() {
  const [{ articles }, { categories }] = await Promise.all([api.articles({ limit: 50 }), api.categories()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: 'Articles' }]} />
      <h1 className="text-3xl font-black text-slate-900">All articles</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Reviews, head-to-head comparisons, and buying guides — everything we publish about sleeping better.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`/categories/${c.slug}`}
            className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-indigo-600 hover:text-indigo-700"
          >
            {c.name}
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      {articles.length === 0 && <p className="mt-8 text-slate-500">No articles published yet.</p>}
    </div>
  );
}
