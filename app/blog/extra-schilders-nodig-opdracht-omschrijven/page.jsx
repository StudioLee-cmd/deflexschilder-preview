import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import { BASIS, ORG_ID, WEBSITE_ID } from '@/lib/schema';

// Eerste weekartikel (cluster 1: schilders inhuren). Concepttekst van 08-10-2026,
// alleen gebaseerd op Andrés eigen steekwoorden (brand.md, writing-style.md).
// Status: CONCEPT TER GOEDKEURING. Nog toe te voegen door André: één eigen
// praktijkvoorbeeld en zijn akkoord; daarna komt zijn auteursnaam erboven.
const SLUG = 'extra-schilders-nodig-opdracht-omschrijven';
const URL_ARTIKEL = `${BASIS}/blog/${SLUG}`;
const TITEL = 'Extra schilders nodig? Zo omschrijf je de opdracht';

export const metadata = {
  title: `${TITEL}: checklist voor bedrijven`,
  description:
    'Schilders inhuren voor een project of je onderhoudsploeg? Met deze zes punten omschrijf je het werk, de ervaring en de planning, zodat de juiste vakman aansluit.',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITEL, publishedTime: '2026-11-04' },
};

const ARTIKEL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${URL_ARTIKEL}#artikel`,
  headline: TITEL,
  inLanguage: 'nl',
  datePublished: '2026-11-04',
  dateModified: '2026-11-04',
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  isPartOf: { '@id': WEBSITE_ID },
  mainEntityOfPage: URL_ARTIKEL,
  articleSection: 'Voor opdrachtgevers',
  about: [
    { '@type': 'Thing', name: 'schilders inhuren' },
    { '@type': 'Thing', name: 'schilderscapaciteit' },
  ],
};

const CHECKLIST = [
  'Het project en de plaats waar gewerkt wordt.',
  'Het schilderwerk en de ondergronden.',
  'De ervaring die iemand daarvoor nodig heeft.',
  'Hoe zelfstandig iemand werkt en wie begeleidt op locatie.',
  'De verwachte start, de duur en de ruimte in de planning.',
  'De samenstelling van de ploeg en het aanspreekpunt.',
];

export default function Artikel() {
  return (
    <>
      <Kruimel
        items={[
          { naam: 'Nieuws', href: '/blog' },
          { naam: 'Extra schilders nodig' },
        ]}
      />

      <article className="container" style={{ paddingBottom: 60 }}>
        <header className="paginakop" style={{ maxWidth: 820 }}>
          <span className="kicker">Voor opdrachtgevers · schilders inhuren</span>
          <h1>{TITEL}</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            Er komt werk bij en je eigen ploeg zit vol. Met alleen een aantal mensen
            en een startdatum weet niemand nog wie bij de opdracht past. Het soort
            werk, de ervaring en de samenwerking op locatie bepalen samen wat je
            zoekt.
          </p>
          <p className="verhaal__wacht" style={{ marginTop: 16 }}>
            Concept ter goedkeuring door André. Hier komt nog één praktijkvoorbeeld uit
            zijn eigen werk bij.
          </p>
        </header>

        <div className="kerndata" style={{ maxWidth: 820 }}>
          <strong>In het kort</strong>
          <dl>
            <div><dt>Voor wie</dt><dd>Bedrijven die extra schilders zoeken voor een project of onderhoudsploeg</dd></div>
            <div><dt>Je hebt nodig</dt><dd>Zes punten over werk, ervaring, werkplek en planning</dd></div>
            <div><dt>Resultaat</dt><dd>Een aanvraag waarop de juiste vakman aansluit</dd></div>
          </dl>
        </div>

        <div className="prose">
          <p>
            Een duidelijke omschrijving helpt bij het gesprek over je personeelsvraag.
            Je hoeft er geen hele vacature voor te schrijven. Begin bij het werk dat
            moet gebeuren en loop de vragen hieronder langs.
          </p>

          <h2>Welk schilderwerk ligt er klaar?</h2>
          <p>
            Beschrijf waar de schilder aan gaat werken. Binnen- of buitenwerk?
            Onderhoud aan bestaande panden of een nieuwbouwproject? Welke ondergronden
            komen voor en welke voorbereiding is al gedaan?
          </p>
          <p>
            Zeg ook welk deel van het werk je wilt laten doen. Iemand die meedraait in
            je ploeg krijgt een andere opdracht dan iemand die zelfstandig een
            afgebakend onderdeel oppakt. Daarmee is sneller duidelijk welke ervaring
            nodig is.
          </p>

          <h2>Wat moet iemand zelfstandig kunnen?</h2>
          <p>
            &ldquo;Een ervaren schilder&rdquo; kan veel betekenen. Noem daarom het
            werk dat iemand zelfstandig moet kunnen, en waar begeleiding is. Denk aan
            de ondergrond voorbereiden, werken volgens een afgesproken verfsysteem of
            specifieke onderdelen netjes afwerken.
          </p>
          <p>
            Geef aan welke ervaring echt nodig is en wat iemand tijdens de opdracht
            kan leren. Dan lijken niet alle wensen even zwaar, terwijl één onderdeel
            voor jouw werk de doorslag geeft.
          </p>

          <h2>Hoe ziet de werkplek eruit?</h2>
          <p>
            Wordt er gewerkt in bewoonde woningen, in een leeg pand of op een locatie
            waar andere bedrijven tegelijk bezig zijn? Is er contact met bewoners of
            met een vaste opdrachtgever?
          </p>
          <p>
            Vertel wie het aanspreekpunt is en hoe het werk op locatie wordt verdeeld.
            Een vakman moet weten bij wie hij met een vraag terechtkan. En voor de
            match telt of iemand graag in een ploeg werkt of liever zelfstandig een
            duidelijke taak uitvoert.
          </p>

          <h2>Welke planning staat vast?</h2>
          <p>
            Noem de plaats, de beoogde start en de verwachte duur. Zeg daarna wat al
            zeker is en waar nog ruimte zit. Misschien staat de opleverdatum vast,
            maar kan de inzet over meerdere weken worden verdeeld. Of hangt de start
            af van werk dat eerst door een andere partij moet worden afgerond.
          </p>
          <p>
            Staat een datum nog niet vast, zeg dat dan. Een voorlopige planning is
            iets anders dan een bevestigde afspraak.
          </p>

          <h2>Checklist voor je aanvraag</h2>
          <ul>
            {CHECKLIST.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p>
            Mis je nog iets? Zet erbij wat je al weet en wat nog moet worden
            afgestemd. Dat is een beter vertrekpunt dan een aanvraag waarin
            onzekerheden als harde eisen staan.
          </p>

          <h2>De match gaat over het werk én de vakman</h2>
          <p>
            Bij De Flexschilder koppelen we je personeelsvraag aan kennis van het
            schilderwerk. We kijken ook naar de schilder: welk werk doet iemand graag,
            en waar komt hij of zij het best tot zijn recht? Lees hoe{' '}
            <Link href="/over-ons#verhaal-jordy">Jordy</Link>,{' '}
            <Link href="/over-ons#verhaal-julia">Julia</Link> en anderen via ons hun
            plek vonden.
          </p>
          <p>
            Zoek je schilderscapaciteit voor je bedrijf in Noord-Nederland? Lees meer
            over <Link href="/schilders-inhuren">schilders inhuren</Link>, bekijk
            wat we doen voor <Link href="/voor-aannemers">aannemers en
            onderhoudsbedrijven</Link>, of{' '}
            <Link href="/aanvraag">bespreek je opdracht met André</Link>.
          </p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTIKEL_SCHEMA) }} />
    </>
  );
}
