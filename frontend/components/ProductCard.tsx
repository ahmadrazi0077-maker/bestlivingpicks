import Image from 'next/image';
import type { Product } from '../lib/api';
import { formatPrice } from '../lib/api';
import RatingStars from './RatingStars';
import ProsCons from './ProsCons';

export default function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[3/2] w-full bg-night-800">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-night-800 to-night-950 p-6 text-center text-lg font-semibold text-white/80">
            {product.name}
          </div>
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-night-950">
            {product.badge}
          </span>
        )}
        {typeof rank === 'number' && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-night-950 text-sm font-bold text-white">
            {rank}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{product.brand}</p>
        <h3 className="mt-1 text-lg font-bold text-night-900">{product.name}</h3>
        <div className="mt-2">
          <RatingStars rating={product.rating} reviewCount={product.review_count} size="sm" />
        </div>
        {product.price !== null && (
          <p className="mt-2 text-2xl font-black text-night-900">{formatPrice(product.price)}</p>
        )}
        <ProsCons pros={product.pros ?? []} cons={product.cons ?? []} compact />
        {product.affiliate_url ? (
          <a
            href={product.affiliate_url}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="mt-4 block rounded-xl bg-amber-400 px-4 py-3 text-center font-bold text-night-950 transition hover:bg-amber-300"
          >
            Check Price on Amazon
          </a>
        ) : null}
        <p className="mt-2 text-center text-[11px] text-slate-400">As an Amazon Associate we earn from qualifying purchases.</p>
      </div>
    </article>
  );
}
