import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kruimel from '@/components/Kruimel';
import ResolutieBanner from '@/components/ResolutieBanner';
import VacatureCard from '@/components/VacatureCard';
import DemoForm from '@/components/DemoForm';
import { CITIES, getCity, nearbyCities } from '@/lib/geo';
import { getAtsAdapter, vacaturesBinnenStraal } from '@/lib/ats';

// Deze route bedient TWEE templates (Strikt-engine, maar schilder-specialist):
//   /vacatures/schilder-<stad>  → stad-vacaturepagina (werkzoekende-kant, radius)
//   /vacatures/<vacature-slug>  → vacature-detail met JobPosting-schema
export async function generateStaticParams() {
  const vacatures = await getAtsAdapter().getVacatures();
  return [
    ...CITIES.map((c) => ({ slug: `schilder-${c.slug}` })),
    ...vacatures.map((v) => ({ slug: v.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const stad = params.slug.startsWith('schilder-') ? getCity(params.slug.slice('schilder-'.length)) : null;
  if (stad) {
    return {
      title: `Vacatures schilder ${stad.name} — schilder gezocht in ${stad.name}`,
      description: `Schilder gezocht in ${stad.name}? Bekijk schildersvacatures in en rond ${stad.name} (${stad.provincie}) en werk structureel via De Flexschilder.`,
    };
  }
  const v = (await getAtsAdapter().getVacatures()).find((x) => x.slug === params.slug);
  if (!v) return {};
  return {
    title: `${v.titel} — ${v.plaats}`,
    description: v.beschrijving.slice(0, 150),
  };
}

export default async function VacatureOfStad({ params }) {
  const vacatures = await getAtsAdapter().getVacatures();

  // --- Stad-vacaturepagina ---
  if (params.slug.startsWith('schilder-')) {
    const stad = getCity(params.slug.slice('schilder-'.length));
    if (!stad) notFound();
    const straal = 20;
    const lokaal = vacaturesBinnenStraal(vacatures, stad, straal);
    const buren = nearbyCities(stad, 4);

    return (
      <>
        <Kruimel items={[{ naam: 'Vacatures', href: '/vacatures' }, { naam: stad.name }]} />

        <section className="paginakop container">
          <ResolutieBanner stadNaam={stad.name} />
          <span className="kicker">Voor schilders · {stad.provincie}</span>
          <h1>Vacatures schilder in {stad.name}</h1>
          <p className="lead">
            Schilder gezocht in {stad.name}? Hieronder staan de opdrachten binnen{' '}
            {straal} km. Zit jouw plaats er niet tussen — wij werken in de hele regio
            en plannen het werk zoveel mogelijk dicht bij huis.
          </p>
        </section>

        <section className="sectie" style={{ paddingTop: 28 }}>
          <div className="container">
            {lokaal.length > 0 ? (
              <div className="grid grid--2">
                {lokaal.map((v) => (
                  <VacatureCard key={v.slug} v={v} />
                ))}
              </div>
            ) : (
              <div className="kaartje" style={{ maxWidth: 640 }}>
                <h3>Nu geen open vacature rond {stad.name}</h3>
                <p>
                  Er komt hier doorlopend werk bij. Schrijf je in en we bellen zodra er
                  een passende opdracht in jouw regio is.
                </p>
                <Link href="/inschrijven" className="btn btn--primair" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                  Schrijf je in
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="sectie sectie--vlak">
          <div className="container">
            <h2 style={{ fontSize: 22 }}>Ook dichtbij</h2>
            <div className="stedenchips" style={{ marginTop: 14 }}>
              {buren.map(({ city, km }) => (
                <Link key={city.slug} href={`/vacatures/schilder-${city.slug}`} className="chip">
                  {city.name} · {km} km
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 22, fontSize: 15 }}>
              Bent u opdrachtgever in {stad.name}?{' '}
              <Link href={`/schilders-inhuren/${stad.slug}`} style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
                Schilders inhuren in {stad.name} →
              </Link>
            </p>
          </div>
        </section>
      </>
    );
  }

  // --- Vacature-detail ---
  const v = vacatures.find((x) => x.slug === params.slug);
  if (!v) notFound();
  const stad = CITIES.find((c) => c.name === v.plaats);

  // JobPosting-schema (Pad A: herbouwt Google-for-Jobs-vindbaarheid op eigen pagina's)
  const jobPosting = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: v.titel,
    description: v.beschrijving,
    datePosted: v.datePosted,
    validThrough: v.validThrough,
    employmentType: 'TEMPORARY',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'De Flexschilder',
      sameAs: 'https://deflexschilder.nl',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: v.plaats,
        addressRegion: stad?.provincie || 'Noord-Nederland',
        addressCountry: 'NL',
      },
    },
  };

  return (
    <>
      <Kruimel items={[{ naam: 'Vacatures', href: '/vacatures' }, { naam: v.titel }]} />

      <section className="paginakop container">
        <span className="kicker">
          Vacature · {v.plaats} {v.demo && <span className="demolabel">demo</span>}
        </span>
        <h1>{v.titel}</h1>
        <div className="vacature__meta" style={{ marginTop: 12, fontSize: 15.5 }}>
          <span>📍 <strong>{v.plaats}</strong></span>
          <span>{v.dienstverband}</span>
          <span>{v.uren}</span>
          <span><strong>{v.salarisIndicatie}</strong></span>
        </div>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <p>{v.beschrijving}</p>
            <h2 style={{ fontSize: 20 }}>Wat je van ons krijgt</h2>
            <ul className="checklijst" style={{ paddingLeft: 0 }}>
              <li>Marktconform salaris en eerlijke voorwaarden</li>
              <li>Structureel werk — geen losse klusjes</li>
              <li>Begeleiding en coaching door vakmensen</li>
              <li>Werk zoveel mogelijk dicht bij huis</li>
            </ul>
            {stad && (
              <p style={{ fontSize: 15 }}>
                Meer werk in de buurt:{' '}
                <Link href={`/vacatures/schilder-${stad.slug}`} style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
                  alle vacatures rond {stad.name} →
                </Link>
              </p>
            )}
          </div>

          <div className="kaartje" style={{ padding: 26 }}>
            <h3>Solliciteer direct</h3>
            <p style={{ fontSize: 14.5, color: 'var(--tekst-licht)' }}>
              Bij livegang gaat je sollicitatie rechtstreeks het vacaturesysteem van De
              Flexschilder in.
            </p>
            <DemoForm
              velden={[
                { naam: 'Naam', placeholder: 'Je naam', verplicht: true },
                { naam: 'Telefoon', type: 'tel', placeholder: '06 …', verplicht: true },
                { naam: 'E-mail', type: 'email', placeholder: 'naam@voorbeeld.nl', verplicht: false },
                { naam: 'Korte toelichting', type: 'textarea', placeholder: 'Wat voor werk doe je nu?', verplicht: false },
              ]}
              knop="Solliciteer"
            />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }} />
    </>
  );
}
