import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'BestLivingPicks editorial standards: sourcing, corrections, updates, and conflicts of interest.',
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-dark">Standards</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-ink">Editorial Policy</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Trust is the whole business. These are the rules we hold ourselves to on every article.
      </p>

      <div className="prose-blp mt-8">
        <h2>Sourcing</h2>
        <p>
          Product specifications come from manufacturers first. Owner sentiment comes from verified
          purchase reviews across major retailers. When we cite a study, standard, or certification
          (such as CertiPUR-US or OEKO-TEX), we name it so you can check it yourself.
        </p>

        <h2>Corrections</h2>
        <p>
          If we get something wrong — a price, a spec, a discontinued model — we fix it and note the
          correction where it matters. Spotted an error?{' '}
          <Link href="/contact">Tell us</Link>; we read everything and credit corrections that
          improve a guide.
        </p>

        <h2>Updates</h2>
        <p>
          Buying guides are living documents. We re-check recommendations as models change, prices
          move, and new products launch. Each article shows when it was published and last updated.
        </p>

        <h2>Conflicts of interest</h2>
        <p>
          Affiliate relationships never influence rankings or recommendations — full stop. Brands
          cannot pay for placement, for a better score, or for a review to be written. If a product
          was ever provided for evaluation, we disclose it in that article.
        </p>

        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We don&apos;t present research-based comparisons as physical product tests.</li>
          <li>We don&apos;t invent ratings, review counts, prices, or discounts.</li>
          <li>We don&apos;t publish AI-generated product photos as if they were real.</li>
          <li>We don&apos;t recommend products we wouldn&apos;t suggest to a friend.</li>
        </ul>
      </div>

      <p className="mt-8 text-sm text-muted">
        Questions about these standards? See <Link href="/how-we-review">how we review</Link> or{' '}
        <Link href="/contact">contact us</Link>.
      </p>
    </div>
  );
}
