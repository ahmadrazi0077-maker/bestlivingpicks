import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { isValidElement, type ReactNode } from 'react';
import { api } from '../../../lib/api';
import { slugify, extractHeadings } from '../../../lib/toc';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductCard from '../../../components/ProductCard';
import ComparisonTable from '../../../components/ComparisonTable';
import NewsletterSignup from '../../../components/NewsletterSignup';
import AffiliateDisclosureNotice from '../../../components/AffiliateDisclosureNotice';
import TableOfContents from '../../../components/TableOfContents';
import ShareButtons from '../../../components/ShareButtons';
import AuthorBox from '../../../components/AuthorBox';
import RelatedArticles from '../../../components/RelatedArticles';
import JsonLd from '../../../components/JsonLd';

// Rendered on the server per request (API must be reachable at runtime,
// not at build time).
export const dynamic = 'force-dynamic';

const SITE = 'https://www.bestlivingpicks.com';

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { article } = await api.article(params.slug);
    const title = article.seo_title || article.title;
    const description = article.seo_description || article.excerpt || undefined;
    const url = `${SITE}/articles/${article.slug}`;
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        type: 'article',
        url,
        publishedTime: article.published_at || undefined,
        images: article.cover_image_url
          ? [{ url: article.cover_image_url, alt: article.title }]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch {
    return { title: 'Article not found' };
  }
}

/** Flattens ReactNode children to plain text (for heading ids). */
function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
}

const mdComponents: Components = {
  h2({ node, children, ...props }) {
    void node;
    return (
      <h2 {...props} id={slugify(textOf(children))} className="scroll-mt-24">
        {children}
      </h2>
    );
  },
};

export default async function ArticlePage({ params }: Params) {
  let article;
  try {
    ({ article } = await api.article(params.slug));
  } catch {
    notFound();
  }

  const category = (article as { category?: { name: string; slug: string } | null }).category;
  const headings = extractHeadings(article.content_md);
  const canonical = `${SITE}/articles/${article.slug}`;

  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE}/articles` },
    ...(category
      ? [
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `${SITE}/categories/${category.slug}`,
          },
        ]
      : []),
    {
      '@type': 'ListItem',
      position: category ? 4 : 3,
      name: article.title,
      item: canonical,
    },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.seo_description || article.excerpt || undefined,
      image: article.cover_image_url ? [article.cover_image_url] : undefined,
      datePublished: article.published_at || undefined,
      author: { '@type': 'Organization', name: 'BestLivingPicks', url: SITE },
      publisher: { '@type': 'Organization', name: 'BestLivingPicks', url: SITE },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schemas} />

      <Breadcrumbs
        items={[
          { label: 'Articles', href: '/articles' },
          ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
          { label: article.title },
        ]}
      />

      <AffiliateDisclosureNotice />

      <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
        {article.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        {article.published_at && (
          <span>
            {new Date(article.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )}
        {article.reading_time_min ? <span>· {article.reading_time_min} min read</span> : null}
        {category && (
          <a
            href={`/categories/${category.slug}`}
            className="rounded-full bg-indigo-50 px-3 py-0.5 font-semibold text-indigo-700"
          >
            {category.name}
          </a>
        )}
      </div>

      <div className="mt-4 border-y border-slate-200 py-3">
        <ShareButtons title={article.title} path={`/articles/${article.slug}`} />
      </div>

      {article.cover_image_url && (
        <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-3xl">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {article.products.length > 0 && <ComparisonTable products={article.products} />}

      <div className="mt-8">
        <TableOfContents headings={headings} />
      </div>

      <div className="prose-blp mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {article.content_md}
        </ReactMarkdown>
      </div>

      {article.products.length > 0 && (
        <section className="mt-12" aria-label="Products in this article">
          <h2 className="text-2xl font-bold text-slate-900">Products in this article</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {article.products.map((p, i) => (
              <ProductCard key={p.id} product={p} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      <AuthorBox />

      <RelatedArticles categorySlug={category?.slug} currentSlug={article.slug} />

      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  );
}
