import { Assistant } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import './globals.css';

// Zelfde font als de huidige site (deflexschilder.nl gebruikt Assistant).
const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Uitzendbureau voor schilders Noord-Nederland — De Flexschilder',
    template: '%s — De Flexschilder',
  },
  description:
    'De Flexschilder: schilders inhuren of aan het werk als schilder in Groningen, Friesland, Drenthe en de kop van Overijssel. Vakmensen door vakmensen.',
  // PREVIEW — nooit indexeren.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={assistant.className}>
      <body>
        <div className="previewlint">
          <strong>PREVIEW</strong> — voorbeeldweergave met demo-content (geen definitieve
          teksten). Review-object voor De Flexschilder × StudioLee.
        </div>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
