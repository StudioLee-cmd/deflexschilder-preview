import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kruimel from '@/components/Kruimel';
import ResolutieBanner from '@/components/ResolutieBanner';
import VacatureCard from '@/components/VacatureCard';
import DemoForm from '@/components/DemoForm';
import WerkgebiedRond from '@/components/WerkgebiedRond';
import { CITIES, getCity, nearbyCities, placesWithin, resolvePlace } from '@/lib/geo';
import { getAtsAdapter, vacaturesBinnenStraal } from '@/lib/ats';
import { ORG_ID } from '@/lib/schema';

// Deze route bedient TWEE templates (Strikt-engine, maar schilder-specialist):
//   /vacatures/schilder-<stad>  → stad-vacaturepagina (werkzoekende-kant, radius)
//   /vacatures/<vacature-slug>  → vacature-detail met JobPosting-schema
// ISR: de vacatures komen uit het ATS (Uitzendplaats, sinds 07-08) én uit de eigen-invoer-route
// (André's telefoon, sinds 04-08), dus deze pagina mag niet één keer bij de build bevriezen.
// 300s + een revalidatePath() vanuit /api/vacature-opgeven, zodat een nieuwe vacature er
// meteen op staat.
export const revalidate = 300;

export async function generateStaticParams() {
  const vacatures = await getAtsAdapter().getVacatures();
  return [
    ...CITIES.map((c) => ({ slug: `schilder-${c.slug}` })),
    ...vacatures.map((v) => ({ slug: v.slug })),
  ];
}

// De vacature staat in een PLAATS, en niet elke plaats is een stadspagina (Havelte is een
// dorp, Groningen een stad). resolvePlace koppelt beide aan de dichtstbijzijnde stadspagina,
// zodat de "meer werk in de buurt"-link altijd ergens op uitkomt.
function stadBij(v) {
  const res = resolvePlace(v.plaats);
  return res ? res.city : null;
}

export async function generateMetadata({ params }) {
  const stad = params.slug.startsWith('schilder-') ? getCity(params.slug.slice('schilder-'.length)) : null;
  if (stad) {
    // De description noemt de dichtstbijzijnde kernen, niet alleen de stad. Zonder dat
    // verschilden de 15 descriptions alleen in de stads- en provincienaam, terwijl het
    // juist de omliggende plaatsen zijn waarop een schilder zoekt ("werk in Hoogkerk").
    const omheen = placesWithin(stad, 20).slice(0, 3).map((p) => p.name);
    return {
      title: `Vacatures schilder ${stad.name}: schilder gezocht in ${stad.name}`,
      description: omheen.length
        ? `Schilder gezocht in ${stad.name}? Bekijk het werk binnen 20 km van ${stad.name}, ook in ${omheen.slice(0, -1).join(', ')} en ${omheen[omheen.length - 1]}. Structureel werk via De Flexschilder.`
        : `Schilder gezocht in ${stad.name}? Bekijk schildersvacatures in en rond ${stad.name} (${stad.provincie}) en werk structureel via De Flexschilder.`,
      alternates: { canonical: `/vacatures/${params.slug}` },
    };
  }
  const v = (await getAtsAdapter().getVacatures()).find((x) => x.slug === params.slug);
  if (!v) return {};
  return {
    title: `${v.titel} | ${v.plaats}`,
    description: (v.beschrijving || '').slice(0, 150),
    alternates: { canonical: `/vacatures/${params.slug}` },
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
    const kernen = placesWithin(stad, straal);

    return (
      <>
        <Kruimel items={[{ naam: 'Vacatures', href: '/vacatures' }, { naam: stad.name }]} />

        <section className="paginakop container">
          <ResolutieBanner stadNaam={stad.name} />
          <span className="kicker">Voor schilders · {stad.provincie}</span>
          <h1>Vacatures schilder in {stad.name}</h1>
          {/* De em dash die hier stond is eruit (writing-style.md: geen em dashes in
              klant-facing copy), en de lead noemt nu het aantal kernen. Dat aantal is
              per stad anders en zegt een schilder meteen hoe ver deze pagina reikt. */}
          <p className="lead">
            Schilder gezocht in {stad.name}? Hieronder staat het werk binnen {straal} km,
            in {stad.name} zelf en in {kernen.length} kernen eromheen. Wij plannen het
            werk zoveel mogelijk dicht bij huis.
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
                  Er komt hier doorlopend werk bij, in {stad.name} en in de{' '}
                  {kernen.length} kernen eromheen. Schrijf je in en we bellen zodra er
                  een passende opdracht in {stad.provincie} is.
                </p>
                <Link href="/inschrijven" className="btn btn--primair" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                  Schrijf je in
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* De eigen inhoud van deze pagina: het werkgebied. Staat er nu niets open, dan
            is dit wat de pagina alsnog beantwoordt — en dat is de normale toestand, want
            12 van de 15 steden hadden op 11-08 geen enkele vacature. */}
        <WerkgebiedRond stad={stad} straal={straal} />

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
              Zoek je schilders voor je bedrijf in {stad.name}?{' '}
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
  const stad = stadBij(v);

  // JobPosting-schema (Pad A: herbouwt Google-for-Jobs-vindbaarheid op eigen pagina's).
  // Elk veld is DERIVED uit wat het ATS levert — een veld dat het ATS niet vult komt hier
  // niet in de graph terecht (RULE 9: liever geen bewering dan een verzonnen bewering).
  const jobPosting = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: v.titel,
    description: v.beschrijvingHtml || v.beschrijving,
    ...(v.datePosted ? { datePosted: v.datePosted } : {}),
    ...(v.validThrough ? { validThrough: v.validThrough } : {}),
    // Uit het ATS-veld `employment_type` (Loondienst · Stage · ZZP · Tijdelijk ·
    // Seizoenswerk · Nul Uren), niet uit een aanname over uitzendwerk.
    employmentType: v.schemaEmploymentType || ['TEMPORARY', 'FULL_TIME'],
    industry: 'Schilderwerk en vastgoedonderhoud',
    hiringOrganization: { '@id': ORG_ID },
    // De sollicitatie wordt (nog) niet OP deze pagina afgerond — het formulier hieronder
    // wacht op build_step `sollicitatie-terugkoppeling`. `true` beweren zou Google iets
    // vertellen wat een sollicitant hier niet kan doen.
    directApply: false,
    ...(v.refno ? { identifier: { '@type': 'PropertyValue', name: v.titel, value: v.refno } } : {}),
    ...(v.opleiding
      ? {
          educationRequirements: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: v.opleiding,
          },
        }
      : {}),
    ...(v.salarisMin && v.salarisMax
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: {
              '@type': 'QuantitativeValue',
              minValue: v.salarisMin,
              maxValue: v.salarisMax,
              unitText: 'MONTH',
            },
          },
        }
      : {}),
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: v.plaats,
        addressRegion: v.regio || stad?.provincie || 'Noord-Nederland',
        addressCountry: v.land || 'NL',
        ...(v.postcode ? { postalCode: v.postcode } : {}),
        ...(v.straat ? { streetAddress: v.straat } : {}),
      },
      ...(v.lat != null && v.lng != null
        ? { geo: { '@type': 'GeoCoordinates', latitude: v.lat, longitude: v.lng } }
        : {}),
    },
  };

  // Eén zin als intro, maar niet als de tekst eronder er al mee begint (ATS-vacatures).
  const eersteZin = v.beschrijving ? `${v.beschrijving.split('. ')[0].replace(/\.$/, '')}.` : '';
  const tekstBegin = (v.beschrijvingHtml || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const intro = eersteZin && !tekstBegin.startsWith(eersteZin.slice(0, 40)) ? eersteZin : '';

  return (
    <>
      <Kruimel items={[{ naam: 'Vacatures', href: '/vacatures' }, { naam: v.titel }]} />

      <section className="paginakop container vacaturekop">
        <span className="kicker">
          Vacature · {v.plaats} {(v.demo || v.voorbeeld) && <span className="demolabel">{v.voorbeeld ? 'voorbeeld' : 'demo'}</span>}
        </span>
        <h1>{v.titel}</h1>
        {intro && <p className="lead vacaturekop__intro">{intro}</p>}
        <dl className="feiten">
          <div><dt>Plaats</dt><dd>{v.plaats}{v.regio && v.regio !== v.plaats ? `, ${v.regio}` : ''}</dd></div>
          {v.dienstverband && <div><dt>Dienstverband</dt><dd>{v.dienstverband}</dd></div>}
          {v.uren && <div><dt>Uren</dt><dd>{v.uren} per week</dd></div>}
          {v.salarisIndicatie && <div><dt>Salaris</dt><dd>{v.salarisIndicatie}</dd></div>}
          {v.opleiding && <div><dt>Opleiding</dt><dd>{v.opleiding}</dd></div>}
          {v.rijbewijzen?.length > 0 && <div><dt>Rijbewijs</dt><dd>{v.rijbewijzen.join(', ')}</dd></div>}
          {v.datePosted && <div><dt>Geplaatst</dt><dd>{datumNl(v.datePosted)}</dd></div>}
          {v.validThrough && <div><dt>Reageren vóór</dt><dd>{datumNl(v.validThrough)}</dd></div>}
        </dl>
      </section>

      <section className="sectie" style={{ paddingTop: 30 }}>
        <div className="container vacaturegrid">
          <div>
            {/* De omschrijving komt als HTML uit het ATS (opsommingen, alinea's). Die
                structuur is de inhoud voor een vakman, dus we renderen 'm, door de
                allowlist in lib/ats.js, want een ATS is invoer van meerdere mensen. */}
            <div className="vacaturetekst">
              {v.beschrijvingHtml ? (
                <div dangerouslySetInnerHTML={{ __html: v.beschrijvingHtml }} />
              ) : (
                <p>{v.beschrijving}</p>
              )}
            </div>

            {/* Werken via De Flexschilder: alleen wat de vakmensen zelf vertellen
                (interviews 28-10-2026), geen algemene beloftes. */}
            <div className="viaons">
              <h2>Werken via De Flexschilder</h2>
              <ul>
                <li>
                  <strong>Meteen een contract.</strong> Je wordt gekoppeld aan een bedrijf dat past
                  bij het werk dat je wilt doen.
                </li>
                <li>
                  <strong>Eén vast aanspreekpunt.</strong> Vragen over werk of privé? Je belt of appt
                  André.
                </li>
                <li>
                  <strong>Leren naast je werk.</strong> Zij-instromers kunnen één avond per week de
                  Schildersvakopleiding volgen.
                </li>
              </ul>
              <blockquote>
                &ldquo;Dat is een van de voordelen van De Flexschilder: je krijgt meteen een vast
                contract en je wordt geholpen met iedere stap die je maakt.&rdquo;
                <cite>
                  Robbin de Jong, allround glaszetter.{' '}
                  <Link href="/over-ons#verhaal-robbin">Bekijk zijn verhaal →</Link>
                </cite>
              </blockquote>
            </div>

            {stad && (
              <p style={{ fontSize: 15, marginTop: 22 }}>
                Meer werk in de buurt:{' '}
                <Link href={`/vacatures/schilder-${stad.slug}`} style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
                  alle vacatures rond {stad.name} →
                </Link>
              </p>
            )}
          </div>

          <aside className="solliciteer">
            <div className="kaartje" style={{ padding: 24 }}>
              <h2>Solliciteren</h2>
              <p style={{ fontSize: 15 }}>Liever eerst even praten? Bel of app André.</p>
              <div className="solliciteer__knoppen">
                <a href="tel:+31613718172" className="btn btn--primair">Bel 06 - 137 181 72</a>
                <a href="https://wa.me/31613718172" className="btn btn--secundair" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
              <div className="solliciteer__form">
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
              <h3>Zo gaat het verder</h3>
              <ol className="stappen">
                <li>André belt je voor een kennismaking: wat zoek je, wat kun je?</li>
                <li>Past het? Dan stelt hij je voor bij de opdrachtgever.</li>
                <li>Jullie maken samen afspraken over de start.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }} />
    </>
  );
}

function datumNl(iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}
