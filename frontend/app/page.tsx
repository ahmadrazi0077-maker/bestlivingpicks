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
      {/* Hero — clear purpose + CTA to buying guides */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-dark">
            Smarter bedroom shopping
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">
            Find the Right Pillow, Bedding &amp; Mattress Accessories
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Practical buying guides and product comparisons to help you choose the right products
            for your home and budget — researched independently, explained clearly.
          </p>
          <div className="mt-8">
            <Link
              href="/articles"
              className="inline-block rounded-full bg-ink px-7 py-3.5 font-semibold text-white transition hover:bg-sage-dark"
            >
              Explore Our Buying Guides →
            </Link>
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
              className="group rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-serif text-2xl font-bold text-ink group-hover:text-sage-dark">
                {c.title}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-sage-dark">
                Explore guides →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by need */}
      <section className="border-y border-line bg-white" aria-label="Shop by need">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-serif text-3xl font-bold text-ink">Start with What You Need</h2>
          <p className="mt-2 text-muted">
            Choose by sleeping position, material, or budget — we&apos;ll point you to the right guide.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {SHOP_BY_NEED.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group rounded-2xl bg-cream p-6 transition hover:bg-sand"
              >
                <h3 className="font-serif text-xl font-bold text-ink group-hover:text-sage-dark">
                  {n.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{n.text}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-sage-dark">
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
          <h2 className="font-serif text-3xl font-bold text-ink">Featured Buying Guides</h2>
          <Link href="/articles" className="text-sm font-semibold text-sage-dark hover:underline">
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
      <section className="border-y border-line bg-white" aria-label="How we help you choose">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-serif text-3xl font-bold text-ink">How We Help You Choose</h2>
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
                <h3 className="font-serif text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <Link
            href="/how-we-review"
            className="mt-8 inline-block text-sm font-semibold text-sage-dark hover:underline"
          >
            Read our methodology →
          </Link>
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Latest buying guides">
        <h2 className="font-serif text-3xl font-bold text-ink">Latest Buying Guides</h2>
        <p className="mt-2 text-muted">A regularly updated selection of useful, research-backed articles.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.slice(0, 6).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      {/* Our promise */}
      <section className="mx-auto max-w-6xl px-4 pb-4" aria-label="Our promise">
        <div className="rounded-2xl bg-sage-light p-8 text-center md:p-10">
          <h2 className="font-serif text-2xl font-bold text-ink">Our Promise</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-ink/80">
            Clear information, transparent affiliate disclosures, and recommendations that explain
            their reasoning. Brands can&apos;t pay for placement —{' '}
            <Link href="/editorial-policy" className="font-semibold text-sage-dark hover:underline">
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
