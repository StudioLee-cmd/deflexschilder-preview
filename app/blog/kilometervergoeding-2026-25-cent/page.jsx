import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import Byline from '@/components/Byline';
import BeeldAI from '@/components/BeeldAI';
import KmCalculator from '@/components/KmCalculator';
import StaafDiagram from '@/components/StaafDiagram';
import { BASIS, ORG_ID, PERSOON_ID, WEBSITE_ID } from '@/lib/schema';

const URL_ARTIKEL = `${BASIS}/blog/kilometervergoeding-2026-25-cent`;

export const metadata = {
  title: 'Kilometervergoeding 2026: van 23 naar 25 cent — wat betekent dat voor schilders?',
  description:
    'De maximale onbelaste reiskostenvergoeding stijgt in 2026 van € 0,23 naar € 0,25 per km, met terugwerkende kracht tot 1 januari. Wat het besluit inhoudt, wat het níet is, en wat het een schilder per jaar scheelt — met rekentool.',
  alternates: { canonical: '/blog/kilometervergoeding-2026-25-cent' },
  openGraph: {
    type: 'article',
    title: 'Kilometervergoeding 2026: van 23 naar 25 cent',
    description: 'Wat de verhoging naar € 0,25/km betekent voor schilders — met rekentool en bronnen.',
    images: [{ url: `${BASIS}/img/bus-onderweg.jpg`, width: 1024, height: 576 }],
    publishedTime: '2026-07-03',
    authors: [`${BASIS}/auteur/andre`],
  },
};

// Artikel volgens de vaste schrijfworkflow: één zoekintentie (long-tail
// "kilometervergoeding 2026" voor vakmensen in de bouw/schilders), funnel omhoog
// naar de vacatures-pillar, gevarieerde interne anchors, bronnen, byline (E-E-A-T),
// FAQ + Article/FAQPage-schema, grafiek + rekentool als informatiewinst.
const FAQ = [
  {
    v: 'Is mijn werkgever verplicht om 25 cent per kilometer te betalen?',
    a: 'Nee. Het besluit verhoogt alleen het maximum dat een werkgever onbelast mág vergoeden (van € 0,23 naar € 0,25). Wat jij daadwerkelijk krijgt, staat in je arbeidsvoorwaarden of cao. In de meeste cao’s stond in mei 2026 nog een afspraak van 23 cent per kilometer.',
  },
  {
    v: 'Vanaf wanneer geldt de verhoging naar € 0,25?',
    a: 'Het besluit werkt met terugwerkende kracht tot en met 1 januari 2026. Werkgevers mogen de verhoging dus over het hele jaar toepassen en mogen daarvoor correctieberichten indienen over eerdere loontijdvakken van 2026.',
  },
  {
    v: 'Geldt het verhoogde bedrag ook als ik met de fiets of het OV naar het werk ga?',
    a: 'Ja. De wet kent één vast onbelast bedrag per kilometer voor alle vormen van vervoer — auto, motor, fiets, openbaar vervoer of lopend.',
  },
  {
    v: 'Ik werk als zzp-schilder — heb ik hier iets aan?',
    a: 'Ja. In hetzelfde besluit worden ook de aftrekbare reiskosten voor IB-ondernemers en resultaatgenieters structureel en met terugwerkende kracht verhoogd. Als zzp’er mag je dus met het hogere bedrag rekenen in je aangifte.',
  },
];

const ARTIKEL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${URL_ARTIKEL}#artikel`,
  headline: 'Kilometervergoeding 2026: van 23 naar 25 cent — wat betekent dat voor schilders?',
  inLanguage: 'nl',
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  author: { '@id': PERSOON_ID },
  publisher: { '@id': ORG_ID },
  isPartOf: { '@id': WEBSITE_ID },
  mainEntityOfPage: URL_ARTIKEL,
  articleSection: 'Voor schilders',
  image: {
    '@type': 'ImageObject',
    url: `${BASIS}/img/bus-onderweg.jpg`,
    width: 1024,
    height: 576,
  },
  about: [
    { '@type': 'Thing', name: 'onbelaste reiskostenvergoeding' },
    { '@type': 'Thing', name: 'kilometervergoeding 2026' },
  ],
  citation: [
    'https://zoek.officielebekendmakingen.nl/stcrt-2026-18302.html',
    'https://www.rijksoverheid.nl/vraag-en-antwoord/inkomstenbelasting/wat-is-de-maximale-kilometervergoeding-die-ik-van-mijn-werkgever-kan-ontvangen',
    'https://www.salarisvanmorgen.nl/2026/05/21/besluit-met-goedkeuring-verhoging-onbelaste-reiskostenvergoeding-in-2026-gepubliceerd/',
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.v,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function KmArtikel() {
  return (
    <>
      <Kruimel
        items={[
          { naam: 'Nieuws & vakkennis', href: '/blog' },
          { naam: 'Kilometervergoeding 2026' },
        ]}
      />

      <article className="container" style={{ paddingBottom: 60 }}>
        <header className="paginakop" style={{ maxWidth: 820 }}>
          <span className="kicker">Voor schilders · regelgeving</span>
          <h1>Kilometervergoeding 2026: van 23 naar 25 cent — wat betekent dat voor schilders?</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            Wie schildert, rijdt. De ene week een corporatieproject in Meppel, de
            andere week een klus in Drachten. Juist daarom is dit nieuws voor
            vakmensen relevant: de maximale <strong>onbelaste reiskostenvergoeding</strong>{' '}
            gaat in 2026 van € 0,23 naar <strong>€ 0,25 per kilometer</strong> — met
            terugwerkende kracht tot 1 januari.
          </p>
          <div style={{ marginTop: 18 }}>
            <Byline gepubliceerd="3 juli 2026" />
          </div>
        </header>

        {/* Kerndata zichtbaar — feiten-box voor lezers, Google én AI-search */}
        <div className="kerndata" style={{ maxWidth: 820 }}>
          <strong>In het kort</strong>
          <dl>
            <div><dt>Was</dt><dd>€ 0,23 per km</dd></div>
            <div><dt>Wordt</dt><dd><strong>€ 0,25 per km</strong></dd></div>
            <div><dt>Ingang</dt><dd>22 mei 2026, terugwerkend tot 1 januari 2026</dd></div>
            <div><dt>Verplicht?</dt><dd>Nee — werkgevers <em>mogen</em>, niet moeten</dd></div>
            <div><dt>Voor wie</dt><dd>Alle vervoer (auto, fiets, OV); ook zzp-aftrek omhoog</dd></div>
            <div><dt>Bron</dt><dd>Besluit 17-05-2026, nr. 2026-8260 (Stcrt. 2026-18302)</dd></div>
          </dl>
        </div>

        <div className="artikelhero" style={{ maxWidth: 820 }}>
          <BeeldAI
            src="/img/bus-onderweg.jpg"
            alt="Werkbus met ladder onderweg over een weg in Noord-Nederland"
          />
        </div>

        <div className="prose">
          <h2>Wat is er precies besloten?</h2>
          <p>
            Op 20 april 2026 kondigde het kabinet een pakket maatregelen aan om de
            koopkracht te ondersteunen na de gestegen brandstofkosten. Onderdeel
            daarvan: een structurele verhoging van de gericht vrijgestelde
            reiskostenvergoeding. Het besluit van de staatssecretaris van Financiën
            (17 mei 2026, nr. 2026-8260) is op 21 mei 2026 in de Staatscourant
            gepubliceerd en werkt <strong>terug tot en met 1 januari 2026</strong>.
          </p>
          <ul>
            <li>
              Het onbelaste maximum stijgt van <strong>€ 0,23</strong> naar{' '}
              <strong>€ 0,25 per kilometer</strong> — voor zakelijke kilometers{' '}
              <em>inclusief woon-werkverkeer</em>.
            </li>
            <li>
              Het bedrag geldt voor <strong>elke vorm van vervoer</strong>: auto,
              motor, fiets, openbaar vervoer of lopend.
            </li>
            <li>
              Werkgevers mogen <strong>correctieberichten</strong> indienen om de
              verhoging ook over al verstreken maanden van 2026 toe te passen.
            </li>
            <li>
              De maatregel wordt definitief verankerd in het Belastingplan 2027
              (Prinsjesdag 2026).
            </li>
          </ul>

          <StaafDiagram
            titel="Maximale onbelaste kilometervergoeding per jaar"
            sub="Grafiek-voorbeeld: zo bouwen we cijfers visueel in artikelen in."
            rows={[
              { label: '2023', waarde: 21, weergave: '€ 0,21' },
              { label: '2024', waarde: 23, weergave: '€ 0,23' },
              { label: '2025', waarde: 23, weergave: '€ 0,23' },
              { label: '2026', waarde: 25, weergave: '€ 0,25', actief: true },
            ]}
            max={25}
            bron="Bron: Besluit Staatssecretaris van Financiën 17-05-2026 (Stcrt. 2026-18302); verhoging 2026 met terugwerkende kracht tot 1 januari."
          />

          <h2>Belangrijk: het is een mogelijkheid, geen verplichting</h2>
          <p>
            Het besluit verplicht werkgevers <strong>niet</strong> om meer te betalen.
            Het verhoogt alleen het bedrag dat zij <em>onbelast mogen</em> vergoeden.
            Wat jij daadwerkelijk per kilometer krijgt, staat in je
            arbeidsvoorwaarden of cao — en in de meeste cao&rsquo;s stond in mei 2026
            nog 23 cent per kilometer. Verwacht dus niet automatisch een hogere
            vergoeding op je loonstrook, maar wéét dat de fiscale ruimte er nu wel is.
            Een goed moment om ernaar te vragen.
          </p>

          <h2>Wat scheelt het jou als schilder?</h2>
          <p>
            Schilders werken zelden elke dag op dezelfde plek. Wie vanuit bijvoorbeeld{' '}
            <Link href="/vacatures/schilder-meppel">Meppel</Link> of{' '}
            <Link href="/vacatures/schilder-heerenveen">Heerenveen</Link> naar
            wisselende projectlocaties rijdt, maakt al snel serieuze kilometers.
            Reken zelf uit wat het verschil van twee cent per kilometer doet:
          </p>
        </div>

        <div style={{ maxWidth: 700, marginTop: 18 }}>
          <KmCalculator />
        </div>

        <div className="prose" style={{ marginTop: 22 }}>
          <h2>Voor zzp-schilders: hogere aftrek</h2>
          <p>
            Werk je <Link href="/soorten-schilders">als zzp-schilder</Link>? In
            hetzelfde besluit worden ook de aftrekbare reiskosten voor IB-ondernemers
            en resultaatgenieters structureel verhoogd, eveneens met terugwerkende
            kracht. Je mag in je aangifte over 2026 dus met het hogere bedrag rekenen.
          </p>

          <h2>Voor opdrachtgevers en werkgevers</h2>
          <p>
            Wie schilders in dienst heeft, kan de hogere vergoeding onbelast aanbieden
            — een concreet arbeidsvoorwaarden-voordeel in een krappe markt, zonder
            loonheffing. De verwerking kan met terugwerkende kracht via
            correctieberichten in de loonaangifte. Huurt u capaciteit in via een
            detacheringspartner, dan zit dit in de voorwaarden van die partner
            verwerkt; bij <Link href="/schilders-inhuren">het inhuren van schilders</Link>{' '}
            via De Flexschilder zijn reiskosten onderdeel van de afspraken die we
            vooraf gewoon helder maken — geen verborgen kosten.
          </p>

          <h2>Hoe wij ermee omgaan</h2>
          <blockquote>
            &ldquo;Onze vakmensen rijden het hele Noorden door — van Zwolle tot de
            Waddenkust. Eerlijke reiskostenafspraken horen bij eerlijk werk. Wij
            informeren onze schilders actief over wat er verandert, en bij de intake
            nemen we de vergoeding gewoon met je door.&rdquo; — André, De Flexschilder
          </blockquote>
          <p>
            Werk zoeken waar reiskosten en voorwaarden vooraf duidelijk zijn? Bekijk
            de <Link href="/vacatures">actuele vacatures voor schilders</Link> of{' '}
            <Link href="/inschrijven">schrijf je vrijblijvend in</Link> — dan zoeken
            wij werk dat qua reistijd bij je past: zoveel mogelijk dicht bij huis.
          </p>

          <h2>Veelgestelde vragen</h2>
          {FAQ.map((f) => (
            <div key={f.v}>
              <h3>{f.v}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          {/* Over de auteur — zichtbare E-E-A-T-samenvatting met beeldmerk */}
          <div className="auteursblok">
            <div className="auteursblok__kop">
              <span className="byline__avatar" aria-hidden>A</span>
              <div>
                <strong>Over de auteur — André van der Hoogen</strong>
                <div style={{ fontSize: 13.5, color: 'var(--tekst-licht)' }}>
                  Eigenaar De Flexschilder · 23 jaar in verf en onderhoud
                </div>
              </div>
              <img src="/branding_flexschilder.svg" alt="De Flexschilder" width={120} height={35} className="auteursblok__logo" />
            </div>
            <p style={{ fontSize: 14.5 }}>
              André begon 23 jaar geleden als technisch adviseur in de verfindustrie
              en leidt vandaag De Flexschilder: dé schildersspecialist van
              Noord-Nederland. Hij adviseert opdrachtgevers over verfsystemen,
              onderhoudscycli en RGS — en zorgt dat vakmensen eerlijk werk met
              eerlijke voorwaarden krijgen. &ldquo;Ik plaats niet alleen schilders,
              ik begrijp hun werk.&rdquo;
            </p>
            <Link href="/auteur/andre" className="verder" style={{ color: 'var(--oranje-donker)', fontWeight: 700, fontSize: 14.5 }}>
              Volledig profiel &amp; alle artikelen →
            </Link>
          </div>

          <div className="bronnen">
            <strong>Bronnen</strong>
            <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 6, display: 'grid', gap: 4 }}>
              <li>
                <a href="https://zoek.officielebekendmakingen.nl/stcrt-2026-18302.html" target="_blank" rel="noreferrer">
                  Besluit Staatssecretaris van Financiën, 17 mei 2026, nr. 2026-8260 (Staatscourant 2026-18302)
                </a>
              </li>
              <li>
                <a href="https://www.rijksoverheid.nl/vraag-en-antwoord/inkomstenbelasting/wat-is-de-maximale-kilometervergoeding-die-ik-van-mijn-werkgever-kan-ontvangen" target="_blank" rel="noreferrer">
                  Rijksoverheid — maximale kilometervergoeding
                </a>
              </li>
              <li>
                <a href="https://www.salarisvanmorgen.nl/2026/05/21/besluit-met-goedkeuring-verhoging-onbelaste-reiskostenvergoeding-in-2026-gepubliceerd/" target="_blank" rel="noreferrer">
                  Salaris Vanmorgen — besluit verhoging onbelaste reiskostenvergoeding 2026
                </a>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTIKEL_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
    </>
  );
}
