import Link from 'next/link';
import Image from 'next/image';
import { api } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import ProductCard from '../components/ProductCard';
import NewsletterSignup from '../components/NewsletterSignup';
import TrustBar from '../components/TrustBar';

// Rendered on the server per request (API must be reachable at runtime,
// not at build time).
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [{ articles: featured }, { articles: latest }, { products: topPicks }, { categories }] =
    await Promise.all([
      api.articles({ featured: true, limit: 1 }),
      api.articles({ limit: 6 }),
      api.products({ limit: 4 }),
      api.categories(),
    ]);

  const hero = featured[0] ?? latest[0];

  return (
    <div>
      {/* Hero */}
      <section className="bg-night-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300">
              🌙 Sleep &amp; bedding, tested honestly
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Sleep better with the <span className="text-amber-400">right pick</span>.
            </h1>
            <p className="mt-4 max-w-md text-slate-300">
              We compare mattresses, pillows, and bedding on comfort, support, cooling, and value —
              so you can buy once and sleep well for years.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {hero && (
                <Link
                  href={`/articles/${hero.slug}`}
                  className="rounded-full bg-amber-400 px-6 py-3 font-bold text-night-950 transition hover:bg-amber-300"
                >
                  Read our #1 guide
                </Link>
              )}
              <Link
                href="/products"
                className="rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
              >
                Browse top picks
              </Link>
            </div>
          </div>
          {hero?.cover_image_url && (
            <div className="relative min-h-[260px] overflow-hidden rounded-3xl">
              <Image src={hero.cover_image_url} alt={hero.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          )}
        </div>
      </section>

      {/* Trust signals */}
      <TrustBar />

      {/* Featured article */}
      {hero && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-night-900">Featured guide</h2>
            <Link href="/articles" className="text-sm font-semibold text-indigo-700 hover:underline">
              All articles →
            </Link>
          </div>
          <div className="mt-6 max-w-2xl">
            <ArticleCard article={hero} />
          </div>
        </section>
      )}

      {/* Top picks */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-night-900">Top picks right now</h2>
            <Link href="/products" className="text-sm font-semibold text-indigo-700 hover:underline">
              All products →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topPicks.map((p, i) => (
              <ProductCard key={p.id} product={p} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-night-900">Shop by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="group rounded-2xl bg-night-900 p-6 text-white transition hover:bg-night-800"
            >
              <h3 className="text-lg font-bold group-hover:text-amber-400">{c.name}</h3>
              {c.description && <p className="mt-1 line-clamp-2 text-sm text-slate-300">{c.description}</p>}
              <span className="mt-3 inline-block text-sm font-semibold text-amber-400">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-night-900">Latest articles</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.slice(0, 6).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      {/* How we pick */}
      <section className="bg-night-950 py-14 text-white" aria-label="How we pick products">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold md:text-3xl">
            How we pick <span className="text-amber-400">winners</span>
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Research the specs',
                text: 'We compare materials, construction, firmness options, trial periods, and warranties across every contender.',
              },
              {
                step: '02',
                title: 'Read real owners',
                text: 'Thousands of verified buyer reviews get weighed for comfort, durability, cooling, and support — not just star counts.',
              },
              {
                step: '03',
                title: 'Rank by value',
                text: 'The winner isn\u2019t the priciest — it\u2019s the pick we\u2019d buy with our own money for each sleeper type and budget.',
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-white/5 p-6">
                <p className="text-sm font-black tracking-widest text-amber-400">{s.step}</p>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.text}</p>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-semibold text-amber-400 hover:underline"
          >
            More about our process →
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <NewsletterSignup />
      </section>
    </div>
  );
}
