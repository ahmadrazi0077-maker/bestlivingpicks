import type { Metadata } from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How BestLivingPicks earns money: Amazon Associates affiliate disclosure.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: 'Affiliate Disclosure' }]} />
      <h1 className="text-3xl font-black text-ink">Affiliate Disclosure</h1>
      <div className="prose-blp mt-6">
        <p>
          <strong>BestLivingPicks is a participant in the Amazon Services LLC Associates Program</strong>, an
          affiliate advertising program designed to provide a means for sites to earn advertising fees by
          advertising and linking to Amazon.com.
        </p>
        <h2>What this means for you</h2>
        <p>
          When you click a product link on BestLivingPicks and make a purchase on Amazon, we may earn a
          commission — at <strong>no additional cost to you</strong>. The price you pay is exactly the same as if
          you went to Amazon directly.
        </p>
        <h2>How it affects our content</h2>
        <p>It doesn't. Our rankings and recommendations are based on our research criteria — comfort, support,
          materials, trial periods, warranties, and verified owner feedback. A higher commission never moves a
          product up our lists.</p>
        <h2>Amazon trademarks</h2>
        <p>
          Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Product prices and
          availability shown on our pages are accurate as of the date/time indicated and are subject to change.
        </p>
        <p className="text-sm text-slate-500">Last updated: October 2026.</p>
      </div>
    </div>
  );
}
