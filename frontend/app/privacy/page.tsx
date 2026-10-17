import type { Metadata } from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'BestLivingPicks privacy policy: what data we collect and how we use it.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
      <div className="prose-blp mt-6">
        <p>BestLivingPicks ("we") respects your privacy. This policy explains what we collect and why.</p>
        <h2>Information we collect</h2>
        <p><strong>Newsletter email:</strong> if you subscribe, we store your email address to send you updates. You can unsubscribe at any time.</p>
        <p><strong>Basic analytics:</strong> we may use privacy-friendly analytics to understand which pages are popular. We do not sell personal data.</p>
        <h2>Affiliate links</h2>
        <p>When you click an affiliate link to Amazon, Amazon's own privacy policy applies on their site.</p>
        <h2>Data retention &amp; your rights</h2>
        <p>You may request deletion of your subscriber email at any time by contacting us. We retain data only as long as needed for the purposes above.</p>
        <h2>Contact</h2>
        <p>Questions about this policy: contact@bestlivingpicks.com.</p>
        <p className="text-sm text-slate-500">Last updated: October 2026.</p>
      </div>
    </div>
  );
}
