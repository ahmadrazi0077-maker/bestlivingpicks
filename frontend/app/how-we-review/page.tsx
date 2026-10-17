import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How We Review',
  description:
    'Our research methodology: how BestLivingPicks compares pillows, bedding, and mattress accessories.',
  alternates: { canonical: '/how-we-review' },
};

const STEPS = [
  {
    title: 'We start with specifications',
    text: 'For every product we consider, we collect the manufacturer specifications: dimensions, materials, fill type and weight, firmness options, cover fabric, care instructions, trial periods, and warranties. Specs are verified against the manufacturer — never copied blindly from a retailer listing.',
  },
  {
    title: 'We weigh real owner experience',
    text: 'We read thousands of verified owner reviews across retailers, looking for patterns: does it sleep hot? Does it flatten after six months? Is the firmness true to the label? Consistent complaints weigh more than any single five-star review.',
  },
  {
    title: 'We compare side-by-side',
    text: 'Products are compared on the criteria that actually affect your purchase: comfort and support, cooling and breathability, durability, ease of care, and value for money. Comparison tables show the real differences, not marketing claims.',
  },
  {
    title: 'We are honest about what we didn\u2019t test',
    text: 'Where we have physically examined a product, we say so and show our observations. Where our analysis is research-based, we say that instead. We never present a product as "tested" when it wasn\u2019t — our comparisons stand on verified specs and owner evidence.',
  },
  {
    title: 'We re-check our guides',
    text: 'Models get discontinued, prices change, and new versions launch. We revisit buying guides regularly to keep recommendations current, and we note when a guide was last updated.',
  },
];

export default function HowWeReviewPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-dark">Methodology</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-ink">How We Review</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        BestLivingPicks exists to help you buy once and buy right. Here&apos;s exactly how we
        research the products we recommend — and what we won&apos;t claim.
      </p>

      <div className="mt-10 space-y-8">
        {STEPS.map((s, i) => (
          <div key={s.title} className="flex gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage font-serif text-lg font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="font-serif text-xl font-bold text-ink">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-sand p-6 text-[15px] leading-relaxed text-ink/80">
        <p className="font-serif text-lg font-bold text-ink">Independence</p>
        <p className="mt-2">
          Brands cannot pay for placement or better rankings. We may earn a commission when you buy
          through our links — it never changes what we recommend or how we rank products. See our{' '}
          <Link href="/affiliate-disclosure" className="font-semibold text-sage-dark hover:underline">
            affiliate disclosure
          </Link>{' '}
          and{' '}
          <Link href="/editorial-policy" className="font-semibold text-sage-dark hover:underline">
            editorial policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
