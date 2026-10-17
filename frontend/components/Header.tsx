import Link from 'next/link';

const NAV = [
  { href: '/articles', label: 'Articles' },
  { href: '/products', label: 'Top Picks' },
  { href: '/categories/mattresses', label: 'Mattresses' },
  { href: '/categories/pillows', label: 'Pillows' },
  { href: '/categories/buying-guides', label: 'Guides' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-xl font-black text-night-950">
            B
          </span>
          <span className="text-lg font-bold tracking-tight">
            Best<span className="text-amber-400">Living</span>Picks
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-200 transition hover:text-amber-400">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/articles/best-mattresses-2026"
          className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-night-950 transition hover:bg-amber-300"
        >
          Best of 2026
        </Link>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-white/10 px-4 py-2 text-sm md:hidden">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-slate-200">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
