import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import SalarisChecker from '@/components/SalarisChecker';
import BrutoNetto from '@/components/BrutoNetto';
import KmCalculator from '@/components/KmCalculator';
import { BASIS, ORG_ID, jsonLd } from '@/lib/schema';

export const metadata = {
  title: 'Rekentools voor schilders — salarischecker, bruto-netto en km-vergoeding',
  description:
    'Gratis rekentools voor schilders: check je marktconforme salaris per specialisme, reken bruto naar netto en bereken wat de kilometervergoeding 2026 jou scheelt.',
  alternates: { canonical: '/tools' },
};

// Tools-hub (Randstad-inspiratie: bruto-netto-calculator + salarischecker zijn
// hun meest gebruikte tools) — schilder-specifiek gemaakt. Linkbare assets die
// het vacature-cluster voeden.
const TOOLS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Rekentools voor schilders',
  itemListElement: [
    {
      '@type': 'WebApplication',
      name: 'Salarischecker voor schilders',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASIS}/tools#salarischecker`,
      provider: { '@id': ORG_ID },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
    {
      '@type': 'WebApplication',
      name: 'Bruto-netto-indicatie',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASIS}/tools#bruto-netto`,
      provider: { '@id': ORG_ID },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
    {
      '@type': 'WebApplication',
      name: 'Kilometervergoeding-calculator 2026',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: `${BASIS}/tools#kilometervergoeding`,
      provider: { '@id': ORG_ID },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  ],
};

export default function Tools() {
  return (
    <>
      <Kruimel items={[{ naam: 'Rekentools' }]} />

      <section className="paginakop container">
        <span className="kicker">Voor schilders · gratis tools</span>
        <h1>
          Rekentools voor <span className="accent">schilders</span>
        </h1>
        <p className="lead">
          Weten waar je aan toe bent — zonder gedoe. Check je marktconforme salaris
          per specialisme, reken je brutoloon om naar netto en bereken wat de nieuwe
          kilometervergoeding jou per jaar scheelt.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container" style={{ display: 'grid', gap: 26, maxWidth: 860 }}>
          <div id="salarischecker">
            <SalarisChecker />
          </div>
          <div id="bruto-netto">
            <BrutoNetto />
          </div>
          <div id="kilometervergoeding">
            <KmCalculator />
            <p style={{ marginTop: 10, fontSize: 14.5 }}>
              Het hele verhaal achter de verhoging naar € 0,25:{' '}
              <Link href="/blog/kilometervergoeding-2026-25-cent" style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
                lees het artikel →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: 22 }}>Klopt jouw salaris niet met de markt?</h2>
            <p className="lead" style={{ fontSize: 15.5 }}>
              Wij matchen op vakmanschap én eerlijke voorwaarden — niet de snelste
              match, maar de juiste.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/vacatures" className="btn btn--primair">
              Bekijk vacatures
            </Link>
            <Link href="/inschrijven" className="btn btn--secundair">
              Schrijf je in
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(TOOLS_SCHEMA) }} />
    </>
  );
}
