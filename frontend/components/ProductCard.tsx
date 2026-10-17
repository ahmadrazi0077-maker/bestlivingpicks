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
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-md">
      <div className="relative aspect-[3/2] w-full bg-sand">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-sage-dark to-ink p-6 text-center font-serif text-lg font-semibold text-white/90">
            {product.name}
          </div>
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        )}
        {typeof rank === 'number' && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 font-serif text-sm font-bold text-ink shadow">
            {rank}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{product.brand}</p>
        )}
        <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-ink">{product.name}</h3>

        {specs.length > 0 && (
          <dl className="mt-3 space-y-1 border-t border-line pt-3 text-[13px]">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="capitalize text-muted">{k.replace(/_/g, ' ')}</dt>
                <dd className="text-right font-medium text-ink">{String(v)}</dd>
              </div>
            ))}
          </dl>
        )}

        <ProsCons pros={product.pros ?? []} cons={product.cons ?? []} compact />

        <div className="mt-auto pt-4">
          {product.price !== null && product.price !== undefined && (
            <p className="text-xl font-bold text-ink">{formatPrice(product.price)}</p>
          )}
          {product.affiliate_url ? (
            <a
              href={product.affiliate_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-2 block rounded-xl bg-ink px-4 py-3 text-center font-semibold text-white transition hover:bg-sage-dark"
            >
              Check Price at Retailer
            </a>
          ) : null}
          <p className="mt-2 text-center text-[11px] leading-snug text-muted">
            As an Amazon Associate we earn from qualifying purchases. Price verified at retailer.
          </p>
        </div>
      </div>
    </article>
  );
}
