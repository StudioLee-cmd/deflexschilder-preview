import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kruimel from '@/components/Kruimel';
import ResolutieBanner from '@/components/ResolutieBanner';
import { CITIES, WERKGEBIED_KM, getCity, nearbyCities, werkgebied } from '@/lib/geo';
import { getAtsAdapter, vacaturesVoorStad } from '@/lib/ats';
import { ORG_ID } from '@/lib/schema';
import VacatureCard from '@/components/VacatureCard';

// Vacatures veranderen; zonder dit bevroor de lijst op het moment van de build.
export const revalidate = 300;

// STAD-HOOFDPAGINA (opdrachtgeverkant) — de URL volgt de locatie:
// /schilders-inhuren/<stad>. Eén template, lokaal ingevuld (Tier-1-recept),
// duidelijk gescheiden van de werkzoekende-kant (/vacatures/schilder-<stad>).
export function generateStaticParams() {
  return CITIES.map((c) => ({ stad: c.slug }));
}

export function generateMetadata({ params }) {
  const stad = getCity(params.stad);
  if (!stad) return {};
  return {
    title: `Schilders inhuren in ${stad.name}: flexibele capaciteit in ${stad.provincie}`,
    description: `Schilders inhuren in ${stad.name}? De Flexschilder levert flexibele, vakbekwame schilders in ${stad.name} en omgeving: detachering, uitzenden en werving & selectie.`,
    alternates: { canonical: `/schilders-inhuren/${stad.slug}` },
  };
}

// "A", "A en B", "A, B en C".
function inZin(namen) {
  return namen.length > 1 ? `${namen.slice(0, -1).join(', ')} en ${namen[namen.length - 1]}` : namen[0];
}

// Tot 16 plaatsen staan ze allemaal open; daarboven de eerste 12 en de rest in een uitklapper
// (dichtgeklapt staan ze wel in de HTML).
function PlaatsChips({ stad, plaatsen }) {
  const alles = plaatsen.length <= 16;
  const getoond = alles ? plaatsen : plaatsen.slice(0, 12);
  const rest = alles ? [] : plaatsen.slice(12);
  const chip = (p) => (
    <Link
      key={p.name}
      href={`/aanvraag?plaats=${encodeURIComponent(p.name)}&stad=${encodeURIComponent(stad.name)}&km=${p.km}`}
      className="chip"
    >
      {p.name} · {p.km} km
    </Link>
  );
  return (
    <>
      <div className="stedenchips" style={{ marginTop: 16 }}>{getoond.map(chip)}</div>
      {rest.length > 0 && (
        <details className="plaatsen" style={{ marginTop: 14 }}>
          <summary className="plaatsen__hoofdknop">
            <strong>Meer plaatsen rond {stad.name}</strong>
            <span className="meta">
              van {rest[0].name} ({rest[0].km} km) tot {rest[rest.length - 1].name} ({rest[rest.length - 1].km} km)
            </span>
          </summary>
          <div className="plaatsen__dorpen" style={{ padding: '14px 0 0' }}>{rest.map(chip)}</div>
        </details>
      )}
    </>
  );
}

export default async function StadPagina({ params }) {
  const stad = getCity(params.stad);
  if (!stad) notFound();

  const vacatures = await getAtsAdapter().getVacatures();
  const lokaalWerk = vacaturesVoorStad(vacatures, stad);
  const buren = nearbyCities(stad, 4);
  // De plaatsen die bij deze stad horen (lib/geo.js, regels 2 en 3), bij naam. Geen telling:
  // een bedrijf wil weten of zijn eigen plaats erbij hoort, niet hoeveel het er zijn (Tim 27-11).
  const plaatsen = werkgebied(stad);
  const eerste = plaatsen.slice(0, 3).map((p) => p.name);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Schilders inhuren in ${stad.name}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      {
        '@type': 'City',
        name: stad.name,
        geo: { '@type': 'GeoCoordinates', latitude: stad.lat, longitude: stad.lng },
      },
      ...plaatsen.map((p) => ({ '@type': 'Place', name: p.name })),
    ],
    serviceType: 'Schilders-detachering, uitzenden en werving & selectie',
    audience: { '@type': 'BusinessAudience', name: 'Vastgoedbeheerders, aannemers, RGS-opdrachtgevers en bedrijven die flexibel schilders inhuren' },
  };

  return (
    <>
      <Kruimel
        items={[
          { naam: 'Schilders inhuren', href: '/schilders-inhuren' },
          { naam: stad.name },
        ]}
      />

      <section className="paginakop container">
        <ResolutieBanner stadNaam={stad.name} />
        <span className="kicker">Voor opdrachtgevers · {stad.provincie}</span>
        <h1>Schilders inhuren in {stad.name}</h1>
        <p className="lead">{stad.blurb}</p>
        <p className="lead" style={{ marginTop: 10 }}>
          Zoek je voor je bedrijf in {stad.name} en omgeving structureel schilderscapaciteit? André brengt je in contact met vakmensen die passen bij het werk. Bespreek de gewenste ervaring, periode en planning.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <Link href="/aanvraag" className="btn btn--primair">
            Schilders aanvragen in {stad.name}
          </Link>
          <a className="btn btn--secundair" href="tel:+31613718172">
            ☎ 06 - 137 181 72
          </a>
        </div>
        {eerste.length > 0 && (
          <p className="ookvoor">
            Ook voor bedrijven en projecten in {inZin(eerste)} en de andere plaatsen rond {stad.name}.{' '}
            <a href="#werkgebied" className="ookvoor__link">Zie het werkgebied</a>
          </p>
        )}
      </section>

      <section className="sectie">
        <div className="container grid grid--3">
          <div className="kaartje">
            <h3>Detachering in {stad.name}</h3>
            <p>
              Vakmensen voor langere tijd op je project of in je onderhoudsploeg,
              van mutatiewoningen tot planmatig onderhoud.
            </p>
            <Link href="/schilders-inhuren#detachering" className="verder">Meer over detachering →</Link>
          </div>
          <div className="kaartje">
            <h3>Pieken opvangen</h3>
            <p>
              Extra vakmensen nodig voor een langere projectperiode of terugkerend werk? Bespreek de gewenste inzet en beschikbaarheid.
            </p>
            <Link href="/schilders-inhuren#uitzenden" className="verder">Meer over uitzenden →</Link>
          </div>
          <div className="kaartje">
            <h3>RGS &amp; vastgoedonderhoud</h3>
            <p>
              Planmatig onderhoud in {stad.provincie} vraagt passende ervaring. André gebruikt zijn kennis van onderhoud en verfsystemen bij de match.
            </p>
            <Link href="/vastgoedonderhoud-en-rgs" className="verder">Ons specialisme →</Link>
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <h2 style={{ fontSize: 24 }}>Schilders zoeken voor je bedrijf in {stad.name}</h2>
          <ul className="checklijst" style={{ marginTop: 18, maxWidth: 640 }}>
            <li>Een gesprek over het schilderwerk en de ervaring die daarvoor nodig is</li>
            <li>Bemiddeling bij structurele inzet en langere samenwerkingen</li>
            <li>Een regionaal netwerk in Noordoost-Nederland</li>
            <li>23 jaar technische kennis van verf, onderhoud en uitvoering</li>
          </ul>
        </div>
      </section>

      {/* Werkzoekende-kant: de open vacatures van deze stad (zelfde regel als
          /vacatures/schilder-<stad>, lib/geo.js regel 4), met de volledige lijst op die eigen pagina. */}
      <section className="sectie">
        <div className="container">
          <span className="kicker">Voor schilders</span>
          <h2 style={{ fontSize: 24 }}>Werk als schilder rond {stad.name}</h2>
          <p className="lead" style={{ marginTop: 10, maxWidth: 760 }}>
            {lokaalWerk.length > 0
              ? `Er ${lokaalWerk.length === 1 ? 'staat nu 1 vacature' : `staan nu ${lokaalWerk.length} vacatures`} open in en rond ${stad.name}.`
              : `Op dit moment staat er geen vacature open in en rond ${stad.name}. Er komt doorlopend werk bij: schrijf je in, dan neemt André contact met je op bij een passende opdracht.`}
          </p>
          {lokaalWerk.length > 0 && (
            <div className="grid grid--3" style={{ marginTop: 22 }}>
              {lokaalWerk.slice(0, 3).map((v) => (
                <VacatureCard key={v.slug} v={v} />
              ))}
            </div>
          )}
          <p style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={`/vacatures/schilder-${stad.slug}`} className="btn btn--secundair">
              Alle vacatures rond {stad.name}
            </Link>
            <Link href="/inschrijven" className="btn btn--primair">Inschrijven als schilder</Link>
          </p>
        </div>
      </section>

      {/* HET WERKGEBIED: de plaatsen die bij deze stad horen, bij naam, elk één tik van de
          aanvraag met die plaats ingevuld. Een plaats kan op meer stadspagina's staan (Hasselt op
          Zwolle én Kampen): dat is de regel, geen dubbeling (lib/geo.js). */}
      {plaatsen.length > 0 && (
        <section className="sectie sectie--vlak" id="werkgebied">
          <div className="container">
            <span className="kicker">Werkgebied</span>
            <h2 style={{ fontSize: 24 }}>Schilders in {stad.name} en de plaatsen eromheen</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: 760 }}>
              Vanuit {stad.name} werken we in de stad zelf en in de plaatsen binnen {WERKGEBIED_KM} km
              {plaatsen.some((p) => p.verder) ? `, en verderop de plaatsen waarvoor ${stad.name} de dichtstbijzijnde stad is` : ''}.
              Staat jouw plaats erbij? Tik erop en je aanvraag staat klaar met die plaats ingevuld.
            </p>
            <PlaatsChips stad={stad} plaatsen={plaatsen} />
          </div>
        </section>
      )}

      <section className="sectie" style={{ paddingTop: 0 }}>
        <div className="container kaartwrap">
          <div>
            <span className="kicker">Regio</span>
            <h2 style={{ fontSize: 24 }}>Rond {stad.name}</h2>
            <p className="lead" style={{ marginTop: 10 }}>
              De Flexschilder werkt in heel Noordoost-Nederland. Dit zijn de steden in de buurt van {stad.name}.
            </p>
          </div>
          <div className="kaartje" style={{ padding: 26 }}>
            <h3>Ook actief in de regio</h3>
            <div className="stedenchips" style={{ marginTop: 10 }}>
              {buren.map(({ city, km }) => (
                <Link key={city.slug} href={`/schilders-inhuren/${city.slug}`} className="chip">
                  {city.name} · {km} km
                </Link>
              ))}
            </div>
            <Link href="/#werkgebied" className="verder" style={{ marginTop: 14 }}>
              Bekijk het hele werkgebied →
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}
