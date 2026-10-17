import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JsonLd from '../components/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const SITE_URL = 'https://www.bestlivingpicks.com';
const SITE_NAME = 'BestLivingPicks';
const TAGLINE = 'Honest mattress, pillow, and bedding reviews for US shoppers.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Honest Sleep & Bedding Reviews`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Honest mattress, pillow, and bedding reviews for US shoppers. Top picks, brand comparisons, and buying guides for better sleep.',
  keywords: [
    'mattress reviews',
    'best mattress 2026',
    'pillow reviews',
    'bedding buying guide',
    'mattress comparison',
    'sleep products',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Shopping',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Honest Sleep & Bedding Reviews`,
    description: TAGLINE,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Honest Sleep & Bedding Reviews`,
    description: TAGLINE,
  },
  alternates: {
    canonical: '/',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [] as string[],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: TAGLINE,
  inLanguage: 'en-US',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="font-sans">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
