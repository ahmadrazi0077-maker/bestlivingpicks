import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://bestlivingpicks.com'),
  title: {
    default: 'BestLivingPicks — Honest Sleep & Bedding Reviews',
    template: '%s | BestLivingPicks',
  },
  description:
    'Honest mattress, pillow, and bedding reviews for US shoppers. Top picks, comparisons, and buying guides for better sleep.',
  openGraph: {
    siteName: 'BestLivingPicks',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
