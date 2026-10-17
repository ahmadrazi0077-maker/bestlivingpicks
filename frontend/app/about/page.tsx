import type { Metadata } from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';
import NewsletterSignup from '../../components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Who we are and how BestLivingPicks researches and compares sleep products.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <h1 className="text-3xl font-black text-ink">About BestLivingPicks</h1>
      <div className="prose-blp mt-6">
        <p>
          BestLivingPicks started with a simple frustration: mattress shopping felt like navigating a maze of
          marketing claims, fake review sites, and prices that change every holiday. We built the site we wished
          existed — focused narrowly on <strong>sleep &amp; bedding</strong>, written for real US shoppers.
        </p>
        <h2>How we pick products</h2>
        <p>
          We compare construction and materials (not just marketing), weigh thousands of verified owner reviews,
          and track trial periods, warranties, and real street prices. When products make competing claims — like
          "cooling" memory foam — we say plainly what the design can and can't do.
        </p>
        <h2>How we make money</h2>
        <p>
          BestLivingPicks is reader-supported. We're a participant in the Amazon Services LLC Associates Program:
          when you buy through links on our site, we may earn a commission at no extra cost to you. It never
          affects our rankings — a product that pays us more doesn't rank higher. Read our{' '}
          <a href="/affiliate-disclosure">full affiliate disclosure</a>.
        </p>
        <h2>What we cover</h2>
        <p>
          Mattresses, pillows, bedding &amp; sheets, and mattress toppers — plus the buying guides that help you
          understand firmness, materials, and sizing before you spend a dollar.
        </p>
      </div>
      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  );
}
