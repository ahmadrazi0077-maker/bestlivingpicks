import type { Metadata } from 'next';
import { api } from '../../lib/api';
import ProductCard from '../../components/ProductCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import AffiliateDisclosureNotice from '../../components/AffiliateDisclosureNotice';

// Rendered on the server per request (API must be reachable at runtime,
// not at build time).
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Top Picks',
  description: 'Our highest-rated mattresses, pillows, and bedding — with prices, ratings, pros and cons.',
};

export default async function ProductsPage() {
  const { products } = await api.products({ limit: 50 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: 'Top Picks' }]} />
      <h1 className="text-3xl font-black text-slate-900">Top picks</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Every product we recommend, ranked by rating. Prices update on Amazon — check the latest deal before you buy.
      </p>

      <AffiliateDisclosureNotice />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} rank={i + 1} />
        ))}
      </div>
      {products.length === 0 && <p className="mt-8 text-slate-500">No products listed yet.</p>}
    </div>
  );
}
