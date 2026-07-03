import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import BeeldAI from '@/components/BeeldAI';

export const metadata = {
  title: 'Schilders voor aannemers & onderhoudsbedrijven — pieken opvangen',
  description:
    'Onderaanneming schilderwerk en flexibele schilders voor aannemers en onderhoudsbedrijven in Noord-Nederland: pieken opvangen zonder risico, vakwerk dat gewoon doorloopt.',
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
          Deadline naar voren, oplevering vertraagd, twee man ziek — de planning van
          een bouwer is nooit rustig. De Flexschilder levert per week op te schalen
          schilderscapaciteit: vakmensen die direct meedraaien in uw ploeg.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 32 }}>
        <div className="container kaartwrap">
          <BeeldAI
            src="/img/spuiter-industrieel.jpg"
            alt="Spuiter brengt coating aan op staalconstructie in een werkplaats"
            ratio="3 / 2"
          />
          <div className="prose">
            <h2>Waarvoor bouwers ons bellen</h2>
            <ul className="checklijst" style={{ paddingLeft: 0 }}>
              <li>
                <strong>Pieken opvangen</strong> — extra schilders precies in de weken
                dat de planning knelt; daarna weer terug.
              </li>
              <li>
                <strong>Onderaanneming schilderwerk</strong> — wij nemen het
                schilderdeel van uw project aan, inclusief planning en kwaliteit.
              </li>
              <li>
                <strong>Specialistisch werk</strong> — van{' '}
                <Link href="/soorten-schilders">spuiters en industrieel schilders</Link>{' '}
                tot afwerking op niveau bij oplevering.
              </li>
              <li>
                <strong>Vaste kracht nodig?</strong> Via werving &amp; selectie vinden
                we de schilder die bij uw bedrijf past.
              </li>
            </ul>
            <h2>Vakwerk zonder gedoe</h2>
            <p>
              U stuurt aan op het werk, wij regelen de rest — contracten, uren,
              vervanging. En omdat wij zelf schilders zijn, sturen we geen
              &ldquo;handjes&rdquo; maar vakmensen die uw kwaliteitsniveau snappen.
              VCU-gecertificeerd, SNA-keurmerk, ABU-lid.
            </p>
            <Link href="/aanvraag" className="btn btn--primair" style={{ marginTop: 8 }}>
              Vraag capaciteit aan
            </Link>
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <h2 style={{ fontSize: 24 }}>Ook interessant voor u</h2>
          <div className="grid grid--3" style={{ marginTop: 20 }}>
            <Link href="/schilders-inhuren" className="kaartje">
              <h3>Alles over inhuren</h3>
              <p style={{ fontSize: 14.5 }}>Detachering, uitzenden en werving &amp; selectie.</p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/voor-woningcorporaties" className="kaartje">
              <h3>Woningcorporaties</h3>
              <p style={{ fontSize: 14.5 }}>Planmatig en mutatie-onderhoud in series.</p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/#werkgebied" className="kaartje">
              <h3>Werkgebied</h3>
              <p style={{ fontSize: 14.5 }}>Van Zwolle tot de Waddenkust — bekijk de kaart.</p>
              <span className="verder">Bekijk →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
