import Link from 'next/link';
import { api } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import NewsletterSignup from '../components/NewsletterSignup';

// Rendered on the server per request (API must be reachable at runtime,
// not at build time).
export const dynamic = 'force-dynamic';

const CATEGORY_CARDS = [
  {
    slug: 'pillows',
    title: 'Pillows',
    text: 'Loft, fill, and firmness explained — find the pillow that matches how you sleep.',
  },
  {
    slug: 'bedding-sheets',
    title: 'Bedding',
    text: 'Sheets, duvets, and fabrics compared: percale vs. sateen, cotton vs. linen.',
  },
  {
    slug: 'mattress-toppers',
    title: 'Mattress Accessories',
    text: 'Toppers, protectors, and pads that upgrade your bed without replacing it.',
  },
];

const SHOP_BY_NEED = [
  {
    title: 'Sleep hot at night?',
    text: 'Cooling mattresses compared on breathability, materials, and value.',
    href: '/articles/best-cooling-mattresses-hot-sleepers-2026',
  },
  {
    title: 'Waking up with back pain?',
    text: 'Supportive picks compared for spinal alignment and pressure relief.',
    href: '/articles/best-mattresses-for-back-pain-2026',
  },
  {
    title: 'Shopping on a budget?',
    text: 'The best mattresses under $500 — and the trade-offs to know about.',
    href: '/articles/best-budget-mattresses-under-500-2026',
  },
];

export default async function HomePage() {
  const [{ articles: featured }, { articles: latest }] = await Promise.all([
    api.articles({ featured: true, limit: 3 }),
    api.articles({ limit: 6 }),
  ]);

  const featuredGuides = (featured.length > 0 ? featured : latest.slice(0, 3)).slice(0, 3);

  return (
    <div>
      {/* Hero — clean, modern, purpose-first */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-10%,#EEF2FF,transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Independent buying guides
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-6xl">
              Find the right pillow, bedding &amp; mattress accessories.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              We compare real specifications, weigh thousands of owner reviews, and explain the
              trade-offs — so you can buy once and sleep well for years.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Explore buying guides
              </Link>
              <Link
                href="/how-we-review"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:border-slate-900"
              >
                How we review
              </Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                ['10+', 'In-depth guides'],
                ['30+', 'Products compared'],
                ['2026', 'Guides updated'],
              ].map(([num, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-3xl font-extrabold tracking-tight text-slate-900">{num}</dd>
                  <dd className="mt-1 text-sm text-slate-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Three category cards */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Categories">
        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORY_CARDS.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-sans text-2xl font-bold text-slate-900 group-hover:text-indigo-700">
                {c.title}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{c.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-indigo-700">
                Explore guides →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by need */}
      <section className="border-y border-slate-200 bg-white" aria-label="Shop by need">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-900">Start with What You Need</h2>
          <p className="mt-2 text-slate-500">
            Choose by sleeping position, material, or budget — we&apos;ll point you to the right guide.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {SHOP_BY_NEED.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-sans text-xl font-bold text-slate-900 group-hover:text-indigo-700">
                  {n.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{n.text}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-indigo-700">
                  Read the guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured comparisons */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Featured buying guides">
        <div className="flex items-end justify-between">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-900">Featured Buying Guides</h2>
          <Link href="/articles" className="text-sm font-semibold text-indigo-700 hover:underline">
            All guides →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      {/* How we help you choose */}
      <section className="border-y border-slate-200 bg-white" aria-label="How we help you choose">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-900">How We Help You Choose</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Clear comparisons',
                text: 'Real product specifications side-by-side — dimensions, materials, firmness, and care — not marketing copy.',
              },
              {
                title: 'Pros & cons',
                text: 'Every pick lists trade-offs honestly, so you understand what you gain and what you give up.',
              },
              {
                title: 'Research-backed',
                text: 'Specs verified against manufacturers, owner reviews weighed, guides re-checked as models change.',
              },
            ].map((s) => (
              <div key={s.title}>
                <h3 className="font-sans text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{s.text}</p>
              </div>
            ))}
          </div>
          <Link
            href="/how-we-review"
            className="mt-8 inline-block text-sm font-semibold text-indigo-700 hover:underline"
          >
            Read our methodology →
          </Link>
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Latest buying guides">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-900">Latest Buying Guides</h2>
        <p className="mt-2 text-slate-500">A regularly updated selection of useful, research-backed articles.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.slice(0, 6).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      {/* Our promise */}
      <section className="mx-auto max-w-6xl px-4 pb-4" aria-label="Our promise">
        <div className="rounded-2xl bg-indigo-50 p-8 text-center md:p-10">
          <h2 className="font-sans text-2xl font-bold text-slate-900">Our Promise</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-slate-900/80">
            Clear information, transparent affiliate disclosures, and recommendations that explain
            their reasoning. Brands can&apos;t pay for placement —{' '}
            <Link href="/editorial-policy" className="font-semibold text-indigo-700 hover:underline">
              read our editorial policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <NewsletterSignup />
      </section>
    </div>
  );
}
