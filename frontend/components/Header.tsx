import Link from 'next/link';

const NAV = [
  { href: '/categories/pillows', label: 'Pillows' },
  { href: '/categories/bedding-sheets', label: 'Bedding' },
  { href: '/categories/mattress-toppers', label: 'Mattress Accessories' },
  { href: '/categories/buying-guides', label: 'Buying Guides' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-sans text-xl font-bold text-white">
            B
          </span>
          <span className="font-sans text-xl font-bold tracking-tight text-slate-900">
            BestLivingPicks
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-[15px] font-medium md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-900/80 transition hover:text-indigo-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/articles/best-mattresses-2026"
          className="hidden rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:inline-block"
        >
          Best of 2026
        </Link>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-slate-200 px-4 py-2.5 text-sm md:hidden" aria-label="Main mobile">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap font-medium text-slate-900/80">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
