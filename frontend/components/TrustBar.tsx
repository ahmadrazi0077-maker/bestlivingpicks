const ITEMS = [
  {
    title: 'Independently researched',
    text: 'Every pick starts from specs, owner reviews, and side-by-side comparisons.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: 'Unbiased picks',
    text: 'Brands can\u2019t pay for placement. Affiliate links never change our rankings.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Updated for 2026',
    text: 'Guides are re-checked against current models, prices, and deals.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
  },
  {
    title: 'Sleep-first focus',
    text: 'One niche, done deeply: mattresses, pillows, and bedding only.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
      </svg>
    ),
  },
];

/** Trust signals strip — sits under the hero on the homepage. */
export default function TrustBar() {
  return (
    <section className="border-b border-slate-200 bg-white" aria-label="Why trust us">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-light text-sage-dark">
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-ink">{item.title}</p>
              <p className="mt-0.5 text-sm text-slate-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
