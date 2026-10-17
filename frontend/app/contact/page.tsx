import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the BestLivingPicks team — questions, corrections, or partnership inquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black text-ink md:text-4xl">Contact us</h1>
      <p className="mt-4 leading-relaxed text-slate-600">
        Questions about a review, spotted something out of date, or want to suggest a product we
        should look at? We read everything.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Email</h2>
          <p className="mt-2 text-sm text-slate-600">
            The fastest way to reach us:
          </p>
          <a
            href="mailto:hello@bestlivingpicks.com"
            className="mt-3 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink"
          >
            hello@bestlivingpicks.com
          </a>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Corrections</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Found a wrong price, a discontinued model, or a broken link? Tell us which article and
            what changed — we update guides regularly and credit corrections.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-sand p-6 text-sm leading-relaxed text-slate-700">
        <p className="font-bold text-ink">For brands &amp; partnerships</p>
        <p className="mt-1">
          We don&apos;t sell placements or rankings, and affiliate relationships never influence our
          picks. If you&apos;d like us to consider a product for review, email us — that&apos;s the
          whole process. Read our <Link href="/affiliate-disclosure" className="font-semibold text-sage-dark hover:underline">affiliate disclosure</Link> for
          how we stay independent.
        </p>
      </div>
    </div>
  );
}
