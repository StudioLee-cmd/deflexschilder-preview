import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import BeeldAI from '@/components/BeeldAI';

export const metadata = {
  title: 'Schilders voor aannemers & onderhoudsbedrijven: pieken opvangen',
  description:
    'Onderaanneming schilderwerk en flexibele schilders voor aannemers en onderhoudsbedrijven in Noord-Nederland: bemiddeling bij structurele schilderscapaciteit en langere projecten.',
  alternates: { canonical: '/voor-aannemers' },
};

// Opdrachtgeverpagina (kennisbank §A) — één intent: aannemer/onderhoudsbedrijf zoekt flex-schil.
export default function VoorAannemers() {
  return (
    <>
      <Kruimel
        items={[
          { naam: 'Schilders inhuren', href: '/schilders-inhuren' },
          { naam: 'Aannemers & onderhoudsbedrijven' },
        ]}
      />

      <section className="paginakop container">
        <span className="kicker">Voor opdrachtgevers · aannemers &amp; onderhoudsbedrijven</span>
        <h1>De flexibele schil voor aannemers en onderhoudsbedrijven</h1>
        <p className="lead">
          Loopt er een langer project of heb je terugkerend extra schilders nodig? De Flexschilder brengt aannemers en onderhoudsbedrijven in contact met passende vakmensen. André bespreekt het werk, de planning en de ervaring die je in de ploeg zoekt.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 32 }}>
        <div className="container kaartwrap">
          <BeeldAI
            src="/img/werk/ploeg-kozijn.jpg"
            alt="Twee schilders werken samen aan een geel kozijn"
            badge={null}
            ratio="3 / 2"
          />
          <div className="prose">
            <h2>Waarvoor bouwers ons bellen</h2>
            <ul className="checklijst" style={{ paddingLeft: 0 }}>
              <li>
                <strong>Extra capaciteit</strong>: vakmensen voor een langere projectperiode of terugkerende werkzaamheden.
              </li>
              <li>
                <strong>Een schilderploeg aanvullen</strong>: bespreek de benodigde vakkennis en de taakverdeling op het werk. André bemiddelt tussen je bedrijf en passende schilders.
              </li>
              <li>
                <strong>Specialistisch werk</strong>: van{' '}
                <Link href="/soorten-schilders">spuiters en industrieel schilders</Link>{' '}
                tot afwerking op niveau bij oplevering.
              </li>
              <li>
                <strong>Vaste kracht nodig?</strong> Via werving &amp; selectie vinden
                we de schilder die bij je bedrijf past.
              </li>
            </ul>
            <h2>Vakwerk zonder gedoe</h2>
            <p>
              Welke ondergrond en verfsystemen kom je tegen? Hoe zelfstandig moet iemand werken en hoe sluit die aan bij de ploeg? Die vragen helpen André om gericht te zoeken. Voor de start worden inzet, tarief en verantwoordelijkheden afgestemd.
            </p>
            <Link href="/aanvraag" className="btn btn--primair" style={{ marginTop: 8 }}>
              Vraag capaciteit aan
            </Link>
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <h2 style={{ fontSize: 24 }}>Ook interessant voor je</h2>
          <div className="grid grid--3" style={{ marginTop: 20 }}>
            <Link href="/schilders-inhuren" className="kaartje">
              <h3>Alles over inhuren</h3>
              <p style={{ fontSize: 14.5 }}>Detachering, uitzenden en werving &amp; selectie.</p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/vastgoedonderhoud-en-rgs" className="kaartje">
              <h3>Vastgoedonderhoud &amp; RGS</h3>
              <p style={{ fontSize: 14.5 }}>Langjarig onderhoud, conditiegericht: ons specialisme.</p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/#werkgebied" className="kaartje">
              <h3>Werkgebied</h3>
              <p style={{ fontSize: 14.5 }}>Van Zwolle tot de Waddenkust. Bekijk de kaart.</p>
              <span className="verder">Bekijk →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
