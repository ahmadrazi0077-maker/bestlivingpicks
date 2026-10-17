import Image from 'next/image';
import type { Product } from '../lib/api';
import { formatPrice } from '../lib/api';
import ProsCons from './ProsCons';

/**
 * Editorial product card. Shows verified specs, honest pros/cons, and a
 * clearly-labeled retailer CTA. No invented ratings or fabricated reviews —
 * see /editorial-policy.
 */
export default function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const specs = Object.entries(product.specs ?? {}).slice(0, 3);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md">
      <div className="relative aspect-[3/2] w-full bg-slate-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-700 to-slate-900 p-6 text-center font-sans text-lg font-semibold text-white/90">
            {product.name}
          </div>
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        )}
        {typeof rank === 'number' && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 font-sans text-sm font-bold text-slate-900 shadow">
            {rank}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{product.brand}</p>
        )}
        <h3 className="mt-1 font-sans text-lg font-bold leading-snug text-slate-900">{product.name}</h3>

        {specs.length > 0 && (
          <dl className="mt-3 space-y-1 border-t border-slate-200 pt-3 text-[13px]">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="capitalize text-slate-500">{k.replace(/_/g, ' ')}</dt>
                <dd className="text-right font-medium text-slate-900">{String(v)}</dd>
              </div>
            ))}
          </dl>
        )}

        <ProsCons pros={product.pros ?? []} cons={product.cons ?? []} compact />

        <div className="mt-auto pt-4">
          {product.price !== null && product.price !== undefined && (
            <p className="text-xl font-bold text-slate-900">{formatPrice(product.price)}</p>
          )}
          {product.affiliate_url ? (
            <a
              href={product.affiliate_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-2 block rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
            >
              Check Price at Retailer
            </a>
          ) : null}
          <p className="mt-2 text-center text-[11px] leading-snug text-slate-500">
            As an Amazon Associate we earn from qualifying purchases. Price verified at retailer.
          </p>
        </div>
      </div>
    </article>
  );
}
