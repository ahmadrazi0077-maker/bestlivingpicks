import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-900/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-sans text-lg font-bold text-slate-900">BestLivingPicks</p>
          <p className="mt-2 text-sm leading-relaxed">
            Practical buying guides and product comparisons for pillows, bedding, and mattress
            accessories — so you can choose with confidence.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900">Guides</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories/pillows" className="hover:text-indigo-700">Pillows</Link></li>
            <li><Link href="/categories/bedding-sheets" className="hover:text-indigo-700">Bedding</Link></li>
            <li><Link href="/categories/mattress-toppers" className="hover:text-indigo-700">Mattress accessories</Link></li>
            <li><Link href="/categories/buying-guides" className="hover:text-indigo-700">Buying guides</Link></li>
            <li><Link href="/articles" className="hover:text-indigo-700">All articles</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-indigo-700">About us</Link></li>
            <li><Link href="/how-we-review" className="hover:text-indigo-700">How we review</Link></li>
            <li><Link href="/editorial-policy" className="hover:text-indigo-700">Editorial policy</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-700">Contact</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-indigo-700">Affiliate disclosure</Link></li>
            <li><Link href="/privacy" className="hover:text-indigo-700">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-indigo-700">Terms of use</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900">Disclosure</p>
          <p className="text-xs leading-relaxed">
            BestLivingPicks is a participant in the Amazon Services LLC Associates Program, an
            affiliate advertising program designed to provide a means for sites to earn advertising
            fees by advertising and linking to Amazon.com. We may earn a commission on qualifying
            purchases, at no extra cost to you.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs">
        © {new Date().getFullYear()} BestLivingPicks · bestlivingpicks.com · All rights reserved.
      </div>
    </footer>
  );
}
