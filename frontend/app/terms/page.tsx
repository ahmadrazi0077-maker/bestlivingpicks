import type { Metadata } from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'BestLivingPicks terms of use.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />
      <h1 className="text-3xl font-black text-night-900">Terms of Use</h1>
      <div className="prose-blp mt-6">
        <h2>Content</h2>
        <p>All content on BestLivingPicks is for general informational purposes. Product prices, availability, trial periods, and warranties change over time — always verify current details with the retailer before purchasing.</p>
        <h2>Affiliate relationships</h2>
        <p>We participate in the Amazon Services LLC Associates Program and may earn commissions on qualifying purchases. See our <a href="/affiliate-disclosure">affiliate disclosure</a>.</p>
        <h2>Intellectual property</h2>
        <p>Site content is owned by BestLivingPicks unless otherwise noted. You may share links and brief excerpts with attribution; please don't republish full articles without permission.</p>
        <h2>Limitation of liability</h2>
        <p>We work to keep information accurate but make no warranties about completeness. Use of the site is at your own risk.</p>
        <p className="text-sm text-slate-500">Last updated: October 2026.</p>
      </div>
    </div>
  );
}
