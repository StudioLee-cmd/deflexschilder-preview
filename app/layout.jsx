import { Assistant } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getAtsAdapter } from '@/lib/ats';
import { BASIS, SITE_GRAPH, jsonLd } from '@/lib/schema';
import './globals.css';

// Zelfde font als de huidige site (Assistant).
const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(BASIS),
  title: {
    default: 'Uitzendbureau voor schilders Noord-Nederland — De Flexschilder',
    template: '%s — De Flexschilder',
  },
  description:
    'Schilders inhuren of aan het werk als schilder in Groningen, Friesland, Drenthe en de kop van Overijssel. Detachering, uitzenden en werving & selectie — vakmensen door vakmensen.',
  applicationName: 'De Flexschilder',
  openGraph: {
    type: 'website',
    siteName: 'De Flexschilder',
    locale: 'nl_NL',
    images: [{ url: `${BASIS}/img/hero-steiger.jpg`, width: 1024, height: 576, alt: 'De Flexschilder — vakmensen door vakmensen' }],
  },
  twitter: { card: 'summary_large_image' },
  // PREVIEW — nooit indexeren.
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: '#fb8500',
};

export default async function RootLayout({ children }) {
  const vacatures = await getAtsAdapter().getVacatures();

  return (
    <html lang="nl" className={assistant.className}>
      <body>
        <div className="previewlint">
          <strong>PREVIEW</strong> — voorbeeldweergave met demo-content en
          AI-voorbeeldbeelden (geen definitieve teksten). Review-object voor De
          Flexschilder × StudioLee.
        </div>
        <SiteHeader vacatureCount={vacatures.length} />
        <main>{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(SITE_GRAPH) }}
        />
      </body>
    </html>
  );
}
