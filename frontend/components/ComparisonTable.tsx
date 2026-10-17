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
    <div className="my-8 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse bg-white text-sm">
        <thead>
          <tr className="bg-ink text-left text-white">
            {cols.map((c) => (
              <th key={c} className="px-4 py-3 font-serif font-semibold">{c}</th>
            ))}
            <th className="px-4 py-3 font-serif font-semibold">Retailer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-line">
              <td className="px-4 py-3 font-semibold text-ink">
                {p.badge && (
                  <span className="mb-1 inline-block rounded-full bg-sage-light px-2 py-0.5 text-[11px] font-bold text-sage-dark">
                    {p.badge}
                  </span>
                )}
                <span className="block">{p.name}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{formatPrice(p.price)}</td>
              <td className="px-4 py-3">
                {p.affiliate_url ? (
                  <a
                    href={p.affiliate_url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-block rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-sage-dark"
                  >
                    Check Price
                  </a>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="bg-cream px-4 py-2 text-[11px] text-muted">
        Prices and availability are accurate as of the time of publication and are subject to change.{' '}
        <Link href="/affiliate-disclosure" className="underline">Affiliate disclosure</Link>.
      </p>
    </div>
  );
}
