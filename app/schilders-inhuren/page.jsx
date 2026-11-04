import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import ZoekBalk from '@/components/ZoekBalk';
import ClusterBlok from '@/components/ClusterBlok';
import BeeldAI from '@/components/BeeldAI';
import StatStrip from '@/components/StatStrip';
import { CITIES, PLACES } from '@/lib/geo';

export const metadata = {
  title: 'Schilders inhuren: flexibele schilderscapaciteit in Noord-Nederland',
  description:
    'Schilders inhuren zonder vaste loonkosten: detachering, uitzenden en werving & selectie voor bedrijven zonder vaste schilder, vastgoedbeheerders, aannemers en RGS-opdrachtgevers in Noord-Nederland.',
  alternates: { canonical: '/schilders-inhuren' },
};

// PILLAR — cluster 1 (opdrachtgeverkant; kernkeyword "schilder(s) inhuren").
// NB (Tim 03-07): klus-intent-keywords ("schilder inhuren" enkelvoud = Werkspot-publiek)
// worden bewust vermeden — alle copy stuurt op capaciteit/B2B (meervoud, detacheren).
const FAQ = [
  {
    v: 'Wat kost het inhuren van schilders?',
    a: 'Dat hangt af van het werk, de ervaring van de schilder en de duur van de inzet. Bespreek je aanvraag met André. Het tarief en de voorwaarden worden voor de start afgestemd.',
  },
  {
    v: 'Hoe snel kan een schilder starten?',
    a: 'De start hangt af van de gevraagde ervaring, de planning en de beschikbaarheid. De Flexschilder richt zich op structurele inzet en langere samenwerkingen. Geef daarom aan vanaf wanneer en voor welke periode je schilders zoekt.',
  },
  {
    v: 'Doen jullie ook losse klussen voor particulieren?',
    a: 'Nee. De Flexschilder werkt uitsluitend zakelijk (B2B): van kleinere bedrijven die flexibel schilders inhuren zonder vaste loonlijst tot vastgoedbeheerders, aannemers en RGS-opdrachtgevers, geen losse klussen voor particulieren.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.v,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function SchildersInhuren() {
  return (
    <>
      <Kruimel items={[{ naam: 'Schilders inhuren' }]} />

      <section className="paginakop container">
        <span className="kicker">Voor opdrachtgevers</span>
        <h1>Schilders inhuren in Noord-Nederland</h1>
        <p className="lead">
          Heb je regelmatig schilders nodig, maar wil je geen eigen schilder in dienst nemen? De Flexschilder brengt je bedrijf in contact met passende vakmensen. Het werk, de ervaring die nodig is en de gewenste periode vormen het begin van de match.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container">
          <ZoekBalk mode="inhuren" toonTabs={false} />
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 8 }}>
        <StatStrip
          items={[
            { tot: 23, label: 'jaar technische vakkennis' },
            { tot: CITIES.length, label: 'stadspagina’s in Noord-NL' },
            { tot: PLACES.length, suffix: '+', label: 'plaatsen gedekt' },
            { vast: 'SNA · VCU · ABU', label: 'gecertificeerd & aangesloten' },
          ]}
        />
      </section>

      {/* Diensten — de drie vormen (menu-ankers) */}
      <section className="sectie sectie--vlak" style={{ paddingTop: 44 }}>
        <div className="container">
          <h2>
            Drie manieren om <span className="accent">schilders in te huren</span>
          </h2>
          <div className="grid grid--3" style={{ marginTop: 24 }}>
            <div className="kaartje" id="detachering">
              <h3>Detachering</h3>
              <p style={{ fontSize: 14.5 }}>
                Voor langere inzet op een project of in je onderhoudsploeg. André bespreekt welke ervaring nodig is en welke vakmensen daarbij passen. De afspraken over inzet en contractvorm worden vooraf afgestemd.
              </p>
            </div>
            <div className="kaartje" id="uitzenden">
              <h3>Uitzenden</h3>
              <p style={{ fontSize: 14.5 }}>
                Extra capaciteit voor een terugkerende behoefte of een langere projectperiode. Bespreek de planning en gewenste inzet, zodat duidelijk is welke samenwerking past.
              </p>
            </div>
            <div className="kaartje" id="werving-selectie">
              <h3>Werving &amp; selectie</h3>
              <p style={{ fontSize: 14.5 }}>
                Zoek je als bedrijf een schilder voor je eigen team? André kijkt mee naar vakkennis, werkhouding en het werk dat iemand gaat doen. De passende contractvorm wordt met je besproken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voor wie + beeld */}
      <section className="sectie">
        <div className="container kaartwrap">
          <div>
            <h2>Voor wie wij werken</h2>
            <div className="grid grid--2" style={{ marginTop: 20 }}>
              <div className="kaartje">
                <h3>Bedrijven die flexibel inhuren</h3>
                <p style={{ fontSize: 14 }}>Een schilder nodig zonder vaste loonlijst: ons zwaartepunt.</p>
                <span className="verder" style={{ color: 'var(--tekst-licht)' }}>Bespreek je onderhoudsplanning</span>
              </div>
              <Link href="/voor-aannemers" className="kaartje">
                <h3>Aannemers &amp; onderhoud</h3>
                <p style={{ fontSize: 14 }}>Pieken opvangen, onderaanneming schilderwerk.</p>
                <span className="verder">Eigen pagina →</span>
              </Link>
              <Link href="/vastgoedonderhoud-en-rgs" className="kaartje">
                <h3>RGS-opdrachtgevers</h3>
                <p style={{ fontSize: 14 }}>Vakmensen voor je onderhoudsplanning.</p>
                <span className="verder">Ons specialisme →</span>
              </Link>
              <div className="kaartje">
                <h3>VvE- &amp; vastgoedbeheerders</h3>
                <p style={{ fontSize: 14 }}>
                  Terugkerend schilderwerk over een portefeuille panden.
                </p>
                <span className="verder" style={{ color: 'var(--tekst-licht)' }}>
                  Bespreek je onderhoudsplanning
                </span>
              </div>
            </div>
          </div>
          <BeeldAI
            src="/img/rgs-inspectie.webp"
            alt="Schilder en vastgoedbeheerder inspecteren samen de conditie van een kozijn"
            ratio="3 / 2"
          />
        </div>
      </section>

      {/* Waarom — André's eigen tekst (steekwoorden-docx 03-07) */}
      <section className="sectie sectie--vlak">
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <span className="kicker">Meer dan bemiddeling, verstand van schilderwerk</span>
            <h2>Waarom opdrachtgevers voor ons kiezen</h2>
            <p>
              André heeft 23 jaar ervaring als technisch adviseur in de verf- en onderhoudsbranche. Hij bespreekt de ondergrond, verfsystemen en uitvoering om te begrijpen welke ervaring je op het werk nodig hebt.
            </p>
            <p>
              Die technische kennis helpt bij de bemiddeling. Een onderhoudsproject vraagt iets anders dan spuitwerk in een werkplaats. Daarom gaat het gesprek met zowel opdrachtgever als schilder over het werk zelf.
            </p>
            <ul className="checklijst" style={{ paddingLeft: 0 }}>
              <li>23 jaar technische expertise in verf en onderhoud</li>
              <li>Specialist in schilders en vastgoedonderhoud</li>
              <li>Kennis van RGS en planmatig onderhoud</li>
              <li>Sterk netwerk in Noord-Nederland</li>
              <li>Persoonlijke begeleiding en selectie</li>
              <li>Vakmensen door vakmensen</li>
            </ul>
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            <div className="kaartje">
              <h3>Selectie op het werk dat er ligt</h3>
              <p style={{ fontSize: 14.5 }}>
                Vakkennis, werkhouding, ervaring en communicatie tellen mee. André bespreekt wat je ploeg nodig heeft en welk werk bij de schilder past.
              </p>
            </div>
            <div className="kaartje">
              <h3>Sparringpartner voor ondernemers</h3>
              <p style={{ fontSize: 14.5 }}>
                Naast de bezetting kun je vragen over personeelsbeleid, cao en het behouden van vakmensen bespreken. André verbindt die vragen aan de dagelijkse praktijk van je bedrijf.
              </p>
            </div>
            <div className="kaartje">
              <h3>Verstand van de uitvoering</h3>
              <p style={{ fontSize: 14.5 }}>
                Verfsystemen, ondergrondbeoordeling, onderhoudscycli, kwaliteitseisen
                en uitvoeringsrisico&rsquo;s. We kennen het werk van de schilders die we
                plaatsen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="sectie">
        <div className="container">
          <h2>Zo werkt het</h2>
          <div className="stappen" style={{ marginTop: 22, maxWidth: 740 }}>
            <div className="stap">
              <p>
                <strong>Vertel wat er moet gebeuren.</strong> Project, periode,
                locatie en het soort schilderwerk: een belletje of het
                aanvraagformulier is genoeg.
              </p>
            </div>
            <div className="stap">
              <p>
                <strong>André bespreekt de match.</strong> Welke ervaring is nodig, wie past bij de ploeg en welke inzet is beschikbaar? Voor de start worden het tarief en de afspraken afgestemd.
              </p>
            </div>
            <div className="stap">
              <p>
                <strong>Houd contact tijdens de samenwerking.</strong> Verandert het werk of de planning? Bespreek wat er nodig is en welke aanpassing mogelijk is.
              </p>
            </div>
          </div>
          <Link href="/aanvraag" className="btn btn--primair" style={{ marginTop: 24 }}>
            Schilders aanvragen
          </Link>
        </div>
      </section>

      {/* Cluster-template: zo groeit dit cluster */}
      <section className="sectie">
        <div className="container">
          <ClusterBlok
            titel="Verder lezen over schilders voor je bedrijf"
            intro="Lees meer over de vakkennis, het onderhoudswerk en de regio die bij je aanvraag passen."
            items={[
              { titel: 'Voor aannemers en onderhoudsbedrijven', href: '/voor-aannemers' },
              { titel: 'Specialisaties van schilders', href: '/soorten-schilders' },
              { titel: 'Vastgoedonderhoud en RGS', href: '/vastgoedonderhoud-en-rgs' },
              { titel: 'André en zijn vakkennis', href: '/auteur/andre' },
            ]}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="sectie sectie--vlak">
        <div className="container prose">
          <h2>Veelgestelde vragen</h2>
          {FAQ.map((f) => (
            <div key={f.v}>
              <h3>{f.v}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steden */}
      <section className="sectie">
        <div className="container">
          <h2>Schilders inhuren per stad</h2>
          <div className="stedenchips" style={{ marginTop: 16 }}>
            {CITIES.map((c) => (
              <Link key={c.slug} href={`/schilders-inhuren/${c.slug}`} className="chip">
                Schilders inhuren {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
    </>
  );
}
