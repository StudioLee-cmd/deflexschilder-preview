import Link from 'next/link';
import Kruimel from '@/components/Kruimel';

/**
 * Bevestiging ná het aanmelden voor de vacature-alert.
 *
 * ⚑ DIT PAD IS OVERGENOMEN VAN DE OUDE SITE, niet zelf bedacht: /bedankt-voor-het-registreren/
 *   was de bedankpagina van de Flexsoftware-template en stond tot 08-08 in `managed.json
 *   §identity.pariteit_uitzonderingen` met de reden "alleen bereikbaar als uitkomst van een
 *   formulier dat niet meer bestaat — een redirect zou een handeling bevestigen die niet heeft
 *   plaatsgevonden". Dat formulier bestaat nu wél, dus de pagina is weer een echte uitkomst en de
 *   uitzondering vervalt. Wie de oude URL nog in z'n geschiedenis heeft komt precies goed uit.
 */
export const metadata = {
  title: 'Je ontvangt vanaf nu onze vacature-alert',
  description:
    'Je bent aangemeld voor de vacature-alert van De Flexschilder. Je krijgt een bericht zodra er een nieuwe vacature bij komt.',
  alternates: { canonical: '/bedankt-voor-het-registreren' },
  // Een bevestigingspagina heeft geen zoekintentie en is alleen zinvol als uitkomst van een
  // formulier — daarom uit de index, ook na de livegang.
  robots: { index: false, follow: true },
};

export default function BedanktVoorHetRegistreren() {
  return (
    <>
      <Kruimel items={[{ naam: 'Aangemeld voor de vacature-alert' }]} />

      <section className="paginakop container">
        <span className="kicker">Vacature-alert</span>
        <h1>Gelukt — je staat op de lijst</h1>
        <p className="lead">
          Je krijgt vanaf nu een bericht zodra er een nieuwe vacature bij komt. In dat bericht staat
          onderaan altijd een link waarmee je je met één klik weer kunt uitschrijven.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 20 }}>
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="kaartje" style={{ padding: 26 }}>
            <h3 style={{ marginTop: 0 }}>Niet wachten?</h3>
            <p style={{ fontSize: 15.5 }}>
              We hebben nu al vacatures staan. Bel gerust als er iets tussen zit —{' '}
              <a href="tel:+31613718172" style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>
                06 - 137 181 72
              </a>
              .
            </p>
            <Link href="/vacatures" className="btn btn--primair" style={{ marginTop: 6 }}>
              Bekijk de vacatures
            </Link>
          </div>
          <div className="kaartje" style={{ padding: 26 }}>
            <h3 style={{ marginTop: 0 }}>Meteen inschrijven?</h3>
            <p style={{ fontSize: 15.5 }}>
              Wil je liever dat wij je bellen zodra er passend werk is? Schrijf je dan in — dan
              kennen we je vak en je werkgebied.
            </p>
            <Link href="/inschrijven" className="btn btn--secundair" style={{ marginTop: 6 }}>
              Inschrijven
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
