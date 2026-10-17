import Link from 'next/link';
import type { Product } from '../lib/api';
import { formatPrice } from '../lib/api';

interface Props {
  products: Product[];
  columns?: string[];
}

/** Comparison table for linked products on article pages. */
export default function ComparisonTable({ products, columns }: Props) {
  if (products.length === 0) return null;
  const cols = columns ?? ['Product', 'Price'];

  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[560px] border-collapse bg-white text-sm">
        <thead>
          <tr className="bg-slate-900 text-left text-white">
            {cols.map((c) => (
              <th key={c} className="px-4 py-3 font-sans font-semibold">{c}</th>
            ))}
            <th className="px-4 py-3 font-sans font-semibold">Retailer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-slate-200">
              <td className="px-4 py-3 font-semibold text-slate-900">
                {p.badge && (
                  <span className="mb-1 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                    {p.badge}
                  </span>
                )}
                <span className="block">{p.name}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">{formatPrice(p.price)}</td>
              <td className="px-4 py-3">
                {p.affiliate_url ? (
                  <a
                    href={p.affiliate_url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-block rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                  >
                    Check Price
                  </a>
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="bg-white px-4 py-2 text-[11px] text-slate-500">
        Prices and availability are accurate as of the time of publication and are subject to change.{' '}
        <Link href="/affiliate-disclosure" className="underline">Affiliate disclosure</Link>.
      </p>
    </div>
  );
}
