import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../../../lib/api';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductCard from '../../../components/ProductCard';
import ComparisonTable from '../../../components/ComparisonTable';
import NewsletterSignup from '../../../components/NewsletterSignup';
import AffiliateDisclosureNotice from '../../../components/AffiliateDisclosureNotice';

// Rendered on the server per request (API must be reachable at runtime,
// not at build time).
export const dynamic = 'force-dynamic';

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { article } = await api.article(params.slug);
    return {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || undefined,
      openGraph: {
        title: article.seo_title || article.title,
        description: article.seo_description || article.excerpt || undefined,
        type: 'article',
      },
    };
  } catch {
    return { title: 'Article not found' };
  }
}

export default async function ArticlePage({ params }: Params) {
  let article;
  try {
    ({ article } = await api.article(params.slug));
  } catch {
    notFound();
  }

  const category = (article as { category?: { name: string; slug: string } | null }).category;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: 'Articles', href: '/articles' },
          ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
          { label: article.title },
        ]}
      />

      <AffiliateDisclosureNotice />

      <h1 className="text-3xl font-black leading-tight text-night-900 md:text-4xl">{article.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        {article.published_at && (
          <span>{new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        )}
        {article.reading_time_min ? <span>· {article.reading_time_min} min read</span> : null}
        {category && (
          <a href={`/categories/${category.slug}`} className="rounded-full bg-indigo-100 px-3 py-0.5 font-semibold text-indigo-800">
            {category.name}
          </a>
        )}
      </div>

      {article.cover_image_url && (
        <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-3xl">
          <Image src={article.cover_image_url} alt={article.title} fill className="object-cover" priority sizes="100vw" />
        </div>
      )}

      {article.products.length > 0 && <ComparisonTable products={article.products} />}

      <div className="prose-blp mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content_md}</ReactMarkdown>
      </div>

      {article.products.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-night-900">Products in this article</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {article.products.map((p, i) => (
              <ProductCard key={p.id} product={p} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  );
}
