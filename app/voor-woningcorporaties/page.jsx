import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import BeeldAI from '@/components/BeeldAI';

export const metadata = {
  title: 'Schilders voor woningcorporaties — planmatig en mutatie-onderhoud',
  description:
    'Schilderscapaciteit voor woningcorporaties in Noord-Nederland: planmatig onderhoud, mutatie-onderhoud en RGS-trajecten — schaalbaar zonder vaste formatie, conditiegericht gewerkt.',
  alternates: { canonical: '/voor-woningcorporaties' },
};

// Opdrachtgeverpagina (kennisbank §A) — één intent: corporatie zoekt schilderscapaciteit.
export default function VoorCorporaties() {
  return (
    <>
      <Kruimel
        items={[
          { naam: 'Schilders inhuren', href: '/schilders-inhuren' },
          { naam: 'Woningcorporaties' },
        ]}
      />

      <section className="paginakop container">
        <span className="kicker">Voor opdrachtgevers · woningcorporaties</span>
        <h1>Schilderscapaciteit voor woningcorporaties</h1>
        <p className="lead">
          Planmatig onderhoud loopt het hele jaar; mutaties komen wanneer ze komen.
          De Flexschilder levert corporaties in Noord-Nederland vakbekwame
          schilderscapaciteit die meegroeit met de onderhoudsplanning — zonder vaste
          formatie, wél met vaste kwaliteit.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 32 }}>
        <div className="container kaartwrap">
          <div className="prose">
            <h2>Wat we voor corporaties doen</h2>
            <ul className="checklijst" style={{ paddingLeft: 0 }}>
              <li>
                <strong>Planmatig onderhoud in series</strong> — buiten- en
                binnenschilderwerk over complexen, gepland op uw MJOP.
              </li>
              <li>
                <strong>Mutatie-onderhoud</strong> — snel schakelen bij leegstand,
                strak opgeleverd zodat de woning door kan.
              </li>
              <li>
                <strong>RGS-trajecten</strong> — conditiegericht werken volgens{' '}
                <Link href="/vastgoedonderhoud-en-rgs">NEN 2767, als langjarige onderhoudspartner</Link>.
              </li>
              <li>
                <strong>Bewonerscommunicatie</strong> — vakmensen die netjes werken én
                netjes communiceren; dat scheelt uw KCC klachten.
              </li>
            </ul>
            <h2>Waarom flexibel inhuren voor corporatiebezit werkt</h2>
            <p>
              Onderhoudspieken zijn voorspelbaar in het plan, maar niet in de
              bezetting. Met een flexibele schil van échte vakmensen vangt u pieken op
              zonder jaarrond loonkosten — en omdat De Flexschilder door schilders
              geleid wordt, krijgt u mensen die conditiegericht werken al kennen.
            </p>
            <Link href="/aanvraag" className="btn btn--primair" style={{ marginTop: 8 }}>
              Bespreek uw onderhoudsopgave
            </Link>
          </div>
          <BeeldAI
            src="/img/hero-steiger.jpg"
            alt="Schilder werkt vanaf steigerwerk aan de kozijnen van een corporatiewoning"
            ratio="3 / 2"
          />
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <h2 style={{ fontSize: 24 }}>Ook interessant voor u</h2>
          <div className="grid grid--3" style={{ marginTop: 20 }}>
            <Link href="/vastgoedonderhoud-en-rgs" className="kaartje">
              <h3>Vastgoedonderhoud &amp; RGS</h3>
              <p style={{ fontSize: 14.5 }}>Ons specialisme: resultaatgericht samenwerken.</p>
              <span className="verder">Lees →</span>
            </Link>
            <Link href="/soorten-schilders" className="kaartje">
              <h3>Soorten schilders</h3>
              <p style={{ fontSize: 14.5 }}>Welk specialisme past bij uw complexen?</p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/schilders-inhuren" className="kaartje">
              <h3>Alles over inhuren</h3>
              <p style={{ fontSize: 14.5 }}>Detachering, uitzenden en werving &amp; selectie.</p>
              <span className="verder">Bekijk →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
