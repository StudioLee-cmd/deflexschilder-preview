import Link from 'next/link';
import { notFound } from 'next/navigation';
import ResolutieBanner from '@/components/ResolutieBanner';
import { CITIES, getCity, nearbyCities } from '@/lib/geo';
import { getAtsAdapter, vacaturesBinnenStraal } from '@/lib/ats';

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
    title: `Schilders inhuren in ${stad.name} — flexibele capaciteit in ${stad.provincie}`,
    description: `Schilders inhuren in ${stad.name}? De Flexschilder levert flexibele, vakbekwame schilders in ${stad.name} en omgeving — detachering, uitzenden en werving & selectie.`,
  };
}

export default async function StadPagina({ params }) {
  const stad = getCity(params.stad);
  if (!stad) notFound();

  const vacatures = await getAtsAdapter().getVacatures();
  const lokaalWerk = vacaturesBinnenStraal(vacatures, stad, 20);
  const buren = nearbyCities(stad, 4);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Schilders inhuren in ${stad.name}`,
    provider: { '@type': 'Organization', name: 'De Flexschilder', sameAs: 'https://deflexschilder.nl' },
    areaServed: { '@type': 'City', name: stad.name },
    serviceType: 'Schilders-detachering, uitzenden en werving & selectie',
  };

  return (
    <>
      <div className="container kruimel">
        <Link href="/">Home</Link> › <Link href="/schilders-inhuren">Schilders inhuren</Link> › {stad.name}
      </div>

      <section className="paginakop container">
        <ResolutieBanner stadNaam={stad.name} />
        <span className="kicker">Voor opdrachtgevers · {stad.provincie}</span>
        <h1>Schilders inhuren in {stad.name}</h1>
        <p className="lead">{stad.blurb}</p>
        <p className="lead" style={{ marginTop: 10 }}>
          De Flexschilder levert in {stad.name} en omgeving flexibele, vakbekwame
          schilders — voor structurele detachering en grotere opdrachten, zonder vaste
          loonkosten. Vakmensen door vakmensen.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <Link href="/aanvraag" className="btn btn--primair">
            Schilders aanvragen in {stad.name}
          </Link>
          <a className="btn btn--secundair" href="tel:+31613718172">
            ☎ 06 - 137 181 72
          </a>
        </div>
      </section>

      <section className="sectie">
        <div className="container grid grid--3">
          <div className="kaartje">
            <h3>Detachering in {stad.name}</h3>
            <p>
              Vakmensen voor langere tijd op uw project of in uw onderhoudsploeg —
              van mutatiewoningen tot planmatig onderhoud.
            </p>
            <Link href="/schilders-inhuren#detachering" className="verder">Meer over detachering →</Link>
          </div>
          <div className="kaartje">
            <h3>Pieken opvangen</h3>
            <p>
              Extra schilders precies in de weken dat het nodig is. Vandaag opschalen,
              morgen weer terug.
            </p>
            <Link href="/schilders-inhuren#uitzenden" className="verder">Meer over uitzenden →</Link>
          </div>
          <div className="kaartje">
            <h3>RGS &amp; vastgoedonderhoud</h3>
            <p>
              Langjarige onderhoudsstromen in {stad.provincie}? Wij draaien mee als
              serieuze RGS-partner — conditiegericht en gepland.
            </p>
            <Link href="/vastgoedonderhoud-en-rgs" className="verder">Ons specialisme →</Link>
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <h2 style={{ fontSize: 24 }}>Waarom opdrachtgevers in {stad.name} voor ons kiezen</h2>
          <ul className="checklijst" style={{ marginTop: 18, maxWidth: 640 }}>
            <li>Geleid en bemenst door échte schilders — wij kennen het vak én de planning</li>
            <li>Schaalbaar zonder vaste loonkosten: op- en afschalen per week</li>
            <li>Lokaal netwerk in {stad.provincie} — korte lijnen, snel geregeld</li>
            <li>RGS-waardig: conditiegericht werken, kwaliteit geborgd</li>
          </ul>
        </div>
      </section>

      {/* Werkzoekende-kant: bewust een LINK naar de eigen intent-pagina (one-page-per-intent) */}
      <section className="sectie">
        <div className="container kaartwrap">
          <div>
            <span className="kicker">Voor schilders</span>
            <h2 style={{ fontSize: 24 }}>Werk zoeken in {stad.name}?</h2>
            <p className="lead" style={{ marginTop: 10 }}>
              {lokaalWerk.length > 0
                ? `Er ${lokaalWerk.length === 1 ? 'staat nu 1 vacature' : `staan nu ${lokaalWerk.length} vacatures`} open binnen 20 km van ${stad.name}.`
                : `Er komt doorlopend werk bij rond ${stad.name} — schrijf je in en we bellen je bij een passende opdracht.`}
            </p>
            <Link href={`/vacatures/schilder-${stad.slug}`} className="btn btn--secundair" style={{ marginTop: 16 }}>
              Vacatures schilder {stad.name} →
            </Link>
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
