import Link from 'next/link';

/**
 * Editorial credibility box shown at the end of articles.
 * Reinforces E-E-A-T: who writes, how picks are made.
 */
export default function AuthorBox() {
  return (
    <aside className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xl font-black text-white">
          B
        </div>
        <div>
          <p className="font-bold text-slate-900">BestLivingPicks Editorial Team</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Our editors dig into specs, read thousands of verified owner reviews, and compare
            mattresses side-by-side on comfort, support, cooling, and value — so our picks are
            earned, not bought. <Link href="/how-we-review" className="font-semibold text-indigo-700 hover:underline">How we review →</Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
