import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import ClusterBlok from '@/components/ClusterBlok';
import BeeldAI from '@/components/BeeldAI';

export const metadata = {
  title: 'Vastgoedonderhoud & RGS — resultaatgericht samenwerken',
  description:
    'RGS, planmatig onderhoud, NEN 2767 en MJOP: hoe De Flexschilder als langjarige onderhoudspartner werkt voor vastgoedbeheerders, VvE’s en aannemers in Noord-Nederland.',
  alternates: { canonical: '/vastgoedonderhoud-en-rgs' },
};

// PILLAR — cluster 4 (autoriteit/specialisme; AI-search). Wordt gevoed met
// André's wekelijkse inzichten in de contentfase.
export default function VastgoedRgs() {
  return (
    <>
      <Kruimel items={[{ naam: 'Vastgoedonderhoud & RGS' }]} />

      <section className="paginakop container">
        <span className="kicker">Ons specialisme · autoriteits-pillar</span>
        <h1>
          Vastgoedonderhoud &amp; <span className="accent">RGS</span>
        </h1>
        <p className="lead">
          Resultaatgericht Samenwerken (RGS) is hoe professioneel vastgoedonderhoud
          tegenwoordig werkt: geen losse klussen, maar een langjarige samenwerking op
          een afgesproken kwaliteitsniveau. Precies het spel dat De Flexschilder
          speelt.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 30 }}>
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h2>Wat is RGS?</h2>
            <p>
              Bij Resultaatgericht Samenwerken spreken opdrachtgever en
              onderhoudspartner niet per klus af wat er gebeurt, maar leggen ze het{' '}
              <strong>resultaat</strong> vast: welk conditieniveau moet het vastgoed
              over de hele looptijd houden? De partner plant en bewaakt het onderhoud
              zelf — dat scheelt de opdrachtgever regie, faalkosten en verrassingen.
            </p>
            <h2>De taal van de opdrachtgever</h2>
            <ul>
              <li>
                <strong>NEN 2767-conditiemeting</strong> — de objectieve meetlat voor
                de staat van het vastgoed; wij werken en rapporteren conditiegericht.
              </li>
              <li>
                <strong>MJOP</strong> — schilderwerk als planbare, begrote stroom in
                plaats van ad-hoc kosten.
              </li>
              <li>
                <strong>Ketensamenwerking</strong> — één team met beheerder, aannemer
                en schilders; korte lijnen, geen dubbel werk.
              </li>
              <li>
                <strong>Ontzorgen</strong> — bewonerscommunicatie, planning en
                kwaliteit geregeld door mensen die het vak kennen.
              </li>
            </ul>
            <h2>Van losse klusser naar vaste onderhoudspartner</h2>
            <p>
              Voor opdrachtgevers betekent RGS met De Flexschilder:
              schilderscapaciteit die meegroeit met uw MJOP, geleverd door vakmensen
              die conditiegericht denken — geleid door een specialist met{' '}
              <Link href="/auteur/andre">23 jaar ervaring in verf en planmatig onderhoud</Link>.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <BeeldAI
              src="/img/rgs-inspectie.jpg"
              alt="Schilder en beheerder beoordelen samen de conditie van het schilderwerk"
              ratio="16 / 10"
            />
            <div className="kaartje">
              <span className="kicker">De vakman achter het bedrijf</span>
              <h3>André van der Hoogen</h3>
              <p style={{ fontSize: 14.5 }}>
                23 jaar technische expertise in verf en onderhoud, kennis van RGS en
                planmatig onderhoud, sterk regionaal netwerk. Sparringpartner voor
                ondernemers en vastgoedbeheerders.
              </p>
              <Link href="/auteur/andre" className="verder">
                Bekijk zijn profiel →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <ClusterBlok
            titel="Cluster: vastgoedonderhoud & RGS (autoriteits-pillar)"
            intro="Weinig volume, maximale overtuigingskracht: dit cluster maakt De Flexschilder dé vindbare autoriteit in Google én AI-zoekmachines — gevoed met André's wekelijkse inzichten."
            items={[
              { titel: 'Wat is RGS? (uitgebreide uitleg)' },
              { titel: 'Planmatig onderhoud uitgelegd' },
              { titel: 'Vastgoedonderhoud uitbesteden aan een flex-schilderspartner' },
              { titel: 'De rol van de schilder in onderhoudsplanning' },
              { titel: 'Duurzaam onderhoud & levensduur van verfsystemen' },
              { titel: 'NEN 2767-conditiemeting in de praktijk' },
            ]}
          />
          <div style={{ marginTop: 26, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/aanvraag" className="btn btn--primair">
              Praten over uw onderhoudsopgave
            </Link>
            <Link href="/voor-aannemers" className="tekstlink">
              Voor aannemers &amp; onderhoudsbedrijven
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
