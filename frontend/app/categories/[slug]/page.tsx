import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '../../../lib/api';
import ArticleCard from '../../../components/ArticleCard';
import Breadcrumbs from '../../../components/Breadcrumbs';

// Rendered on the server per request (API must be reachable at runtime,
// not at build time).
export const dynamic = 'force-dynamic';

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { category } = await api.category(params.slug);
    return {
      title: category.name,
      description: category.description || `Articles and picks in ${category.name}.`,
    };
  } catch {
    return { title: 'Category not found' };
  }
}

export default async function CategoryPage({ params }: Params) {
  let category;
  try {
    ({ category } = await api.category(params.slug));
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: 'Categories' }, { label: category.name }]} />
      <h1 className="text-3xl font-black text-ink">{category.name}</h1>
      {category.description && <p className="mt-2 max-w-2xl text-slate-600">{category.description}</p>}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(category.articles ?? []).map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      {(category.articles ?? []).length === 0 && (
        <p className="mt-8 text-slate-500">No articles in this category yet — check back soon.</p>
      )}
    </div>
  );
}
