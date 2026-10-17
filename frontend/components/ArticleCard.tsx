import Image from 'next/image';
import Link from 'next/link';
import type { ArticleSummary } from '../lib/api';

function fmtDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-700 to-slate-900 p-6 text-center text-lg font-semibold text-white/80">
            {article.title}
          </div>
        )}
        {article.category && (
          <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-slate-900">
            {article.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-indigo-700">
          {article.title}
        </h3>
        {article.excerpt && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{article.excerpt}</p>}
        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-slate-500">
          {article.published_at && <span>{fmtDate(article.published_at)}</span>}
          {article.reading_time_min ? <span>· {article.reading_time_min} min read</span> : null}
        </div>
      </div>
    </Link>
  );
}
