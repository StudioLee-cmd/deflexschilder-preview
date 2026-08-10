import { Assistant } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import CookieBanner from '@/components/CookieBanner';
import { getAtsAdapter } from '@/lib/ats';
import { BASIS, SITE_GRAPH, jsonLd } from '@/lib/schema';
import { FLAGS, CHAT_WIDGET_ID } from '@/lib/site';
import './globals.css';

// Zelfde font als de huidige site (Assistant).
//
// ⚑ GEEN `weight`-lijst: Assistant is een VARIABEL lettertype (fvar-as wght 200-800), en zonder
//   lijst emit next/font per subset één @font-face met het hele bereik (`font-weight: 200 800`).
//   Gemeten 10-08 op de Google-Fonts-CSS die next/font ophaalt: mét de lijst 12 @font-face-blokken
//   (4 gewichten x 3 subsets) die per subset alle vier naar HETZELFDE woff2 wijzen, zonder de lijst
//   3 blokken naar exact diezelfde drie bestanden. Zelfde bytes over de lijn, minder CSS.
//
// ⚠️ EN WAT HET NIET WAS, zodat de volgende lezer die weg niet opnieuw loopt: de vier vaste blokken
//   lieten de browser NIET faux-bolden. Gemeten 10-08 met `font-synthesis: none` naast een positieve
//   controle (een familie met alleen een 400-face, die wél synthetiseert): 600/700/800 renderden
//   pixel-identiek aan de echte as, verschil 0. De font-weight-descriptor klemt de as namelijk op
//   de gedeclareerde waarde, dus vier stops = vier échte gewichten. Wat vier stops WEL doen is de as
//   QUANTISEREN: een gewicht dat niet op een stop ligt snapt naar de dichtstbijzijnde, dus
//   `font-weight: 500` rendert dan als 400. Deze site gebruikt vandaag alleen 400/600/700/800 (geteld
//   in globals.css én op de gerenderde pagina), dus dat viel niet op -- de eerstvolgende `font-medium`
//   wel. Dáárom staat de as er nu, en niet omdat er iets zichtbaar stuk was.
const assistant = Assistant({
  subsets: ['latin'],
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
  // SLOT 2 VAN 3 — de robots-meta. Zolang NEXT_PUBLIC_INDEXEERBAAR niet op '1' staat blijft
  // de preview op noindex; op de livegang-dag zet `livegang_klantsite.py deflexschilder
  // --live` de vlag en gaan alle drie de sloten tegelijk open (hier + de X-Robots-Tag-header
  // in next.config.mjs + app/robots.js). Ze delen bewust één schakelaar: driedubbel gezet
  // betekent driedubbel eraf, en een vergeten plek houdt de hele site uit de index.
  // ⚑ Dit is de SITE-BREDE stand. Een pagina die zichzelf noindex geeft, blijft dat —
  //   page-metadata wint van layout-metadata. Dat is precies wat /vacature-opgeven nodig
  //   heeft: die hoort ook na de livegang onvindbaar te blijven.
  robots:
    process.env.NEXT_PUBLIC_INDEXEERBAAR === '1'
      ? { index: true, follow: true }
      : { index: false, follow: false },
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
        <ScrollReveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(SITE_GRAPH) }}
        />
        {/* De cookie-deur. Hangt aan FLAGS.chatbot EN aan een gevulde widget-id, en is
            bewust NIET hardcoded gemount met een lege prop: een banner die toestemming vraagt
            voor een cookie die niemand zet, is een leugen in de andere richting. Vandaag zet
            deze site niets — geen analytics, geen chat, next/font host de letters zelf — dus
            rendert hier niets. Zet de chat aan in lib/site.js (lees daar eerst de drie
            voorwaarden) en de deur staat er meteen, vóór de widget laadt. */}
        {FLAGS.chatbot && CHAT_WIDGET_ID && <CookieBanner widgetId={CHAT_WIDGET_ID} />}
      </body>
    </html>
  );
}
