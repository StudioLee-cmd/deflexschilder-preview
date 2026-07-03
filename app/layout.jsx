import { Assistant } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getAtsAdapter } from '@/lib/ats';
import './globals.css';

// Zelfde font als de huidige site (Assistant).
const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const BASIS = 'https://deflexschilder-preview.vercel.app';

export const metadata = {
  metadataBase: new URL(BASIS),
  title: {
    default: 'Uitzendbureau voor schilders Noord-Nederland — De Flexschilder',
    template: '%s — De Flexschilder',
  },
  description:
    'Schilders inhuren of aan het werk als schilder in Groningen, Friesland, Drenthe en de kop van Overijssel. Detachering, uitzenden en werving & selectie — vakmensen door vakmensen.',
  // PREVIEW — nooit indexeren.
  robots: { index: false, follow: false },
};

// Organization-schema — het site-brede E-E-A-T-anker (elke pagina erft dit).
const ORGANISATIE = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  '@id': `${BASIS}#organisatie`,
  name: 'De Flexschilder',
  description:
    'Specialist in schilders-detachering, uitzenden en werving & selectie in Noord-Nederland. Vakmensen door vakmensen.',
  url: BASIS,
  logo: `${BASIS}/branding_flexschilder.svg`,
  telephone: '+31613718172',
  email: 'andre@deflexschilder.nl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Oldemarktseweg 74',
    postalCode: '8341 SH',
    addressLocality: 'Steenwijkerwold',
    addressCountry: 'NL',
  },
  areaServed: ['Groningen', 'Friesland', 'Drenthe', 'Overijssel'],
  founder: { '@id': `${BASIS}/auteur/andre#persoon` },
  knowsAbout: [
    'schilderwerk',
    'vastgoedonderhoud',
    'resultaatgericht samenwerken (RGS)',
    'detachering van schilders',
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANISATIE) }}
        />
      </body>
    </html>
  );
}
