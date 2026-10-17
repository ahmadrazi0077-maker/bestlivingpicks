import Link from 'next/link';

/** Short affiliate disclosure notice shown on article and product pages (Amazon Associates requirement). */
export default function AffiliateDisclosureNotice() {
  return (
    <aside className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
      <strong className="font-semibold">Affiliate disclosure:</strong> BestLivingPicks is reader-supported. When you buy
      through links on this page, we may earn an affiliate commission at no extra cost to you.{' '}
      <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.
    </aside>
  );
}
