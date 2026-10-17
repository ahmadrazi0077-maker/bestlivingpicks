import Link from 'next/link';
import type { Product } from '../lib/api';
import { formatPrice } from '../lib/api';

interface Props {
  products: Product[];
  columns?: string[];
}

/** Simple comparison table for linked products on article pages. */
export default function ComparisonTable({ products, columns }: Props) {
  if (products.length === 0) return null;
  const cols = columns ?? ['Product', 'Rating', 'Price'];

  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[560px] border-collapse bg-white text-sm">
        <thead>
          <tr className="bg-night-900 text-left text-white">
            {cols.map((c) => (
              <th key={c} className="px-4 py-3 font-semibold">{c}</th>
            ))}
            <th className="px-4 py-3 font-semibold">Link</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-semibold text-night-900">
                {p.badge && (
                  <span className="mb-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                    {p.badge}
                  </span>
                )}
                <span className="block">{p.name}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className="text-amber-500">★</span> {p.rating?.toFixed(1) ?? '—'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-bold">{formatPrice(p.price)}</td>
              <td className="px-4 py-3">
                {p.affiliate_url ? (
                  <a
                    href={p.affiliate_url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-night-950 hover:bg-amber-300"
                  >
                    View Deal
                  </a>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="bg-slate-50 px-4 py-2 text-[11px] text-slate-400">
        Prices and availability are accurate as of the time of publication and are subject to change.{' '}
        <Link href="/affiliate-disclosure" className="underline">Affiliate disclosure</Link>.
      </p>
    </div>
  );
}
