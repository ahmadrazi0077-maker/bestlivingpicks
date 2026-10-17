import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 bg-night-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">
            Best<span className="text-amber-400">Living</span>Picks
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Honest sleep &amp; bedding reviews for US shoppers. We test the claims so you can sleep on it — literally.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/articles" className="hover:text-amber-400">All articles</Link></li>
            <li><Link href="/products" className="hover:text-amber-400">Top picks</Link></li>
            <li><Link href="/categories/mattresses" className="hover:text-amber-400">Mattresses</Link></li>
            <li><Link href="/categories/pillows" className="hover:text-amber-400">Pillows</Link></li>
            <li><Link href="/categories/buying-guides" className="hover:text-amber-400">Buying guides</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-amber-400">About us</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-amber-400">Affiliate disclosure</Link></li>
            <li><Link href="/privacy" className="hover:text-amber-400">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-amber-400">Terms of use</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Disclosure</p>
          <p className="text-xs leading-relaxed text-slate-400">
            BestLivingPicks is a participant in the Amazon Services LLC Associates Program, an affiliate advertising
            program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BestLivingPicks · bestlivingpicks.com · All rights reserved.
      </div>
    </footer>
  );
}
