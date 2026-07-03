import Link from 'next/link';

export const metadata = {
  title: 'Vastgoedonderhoud & RGS — resultaatgericht samenwerken',
  description:
    'RGS, planmatig onderhoud, NEN 2767 en MJOP: hoe De Flexschilder als langjarige onderhoudspartner werkt voor woningcorporaties, vastgoedbeheerders en VvE’s in Noord-Nederland.',
};

// PILLAR — cluster 4 (autoriteit / specialisme; AI-search). Gevoed met André's
// wekelijkse inzichten in de contentfase.
export default function VastgoedRgs() {
  return (
    <>
      <div className="container kruimel">
        <Link href="/">Home</Link> › Vastgoedonderhoud &amp; RGS
      </div>

      <section className="paginakop container">
        <span className="kicker">Ons specialisme</span>
        <h1>Vastgoedonderhoud &amp; RGS</h1>
        <p className="lead">
          Resultaatgericht Samenwerken (RGS) is de manier waarop professioneel
          vastgoedonderhoud tegenwoordig werkt: niet losse klussen, maar een
          langjarige samenwerking op een afgesproken kwaliteitsniveau. Precies het
          spel dat De Flexschilder speelt.
        </p>
      </section>

      <section className="sectie">
        <div className="container prose">
          <h2>Wat is RGS?</h2>
          <p>
            Bij Resultaatgericht Samenwerken spreken opdrachtgever en onderhoudspartner
            niet per klus af wat er gebeurt, maar leggen ze het <strong>resultaat</strong>{' '}
            vast: welk conditieniveau moet het vastgoed over de hele looptijd houden?
            De partner plant en bewaakt het onderhoud zelf — dat scheelt de
            opdrachtgever regie, faalkosten en verrassingen.
          </p>
          <h2>De taal van de opdrachtgever</h2>
          <ul>
            <li>
              <strong>NEN 2767-conditiemeting</strong> — de objectieve meetlat voor de
              staat van het vastgoed; wij werken en rapporteren conditiegericht.
            </li>
            <li>
              <strong>MJOP (meerjarenonderhoudsplan)</strong> — schilderwerk als
              planbare, begrote stroom in plaats van ad-hoc kosten.
            </li>
            <li>
              <strong>Ketensamenwerking</strong> — één team met de vastgoedbeheerder,
              de aannemer en de schilders; korte lijnen, geen dubbel werk.
            </li>
            <li>
              <strong>Ontzorgen</strong> — bewonerscommunicatie, planning en kwaliteit
              geregeld door mensen die het vak kennen.
            </li>
          </ul>
          <h2>Van losse klusser naar vaste onderhoudspartner</h2>
          <p>
            Voor een flex-schildersbedrijf is RGS de route naar de hoogste
            klantwaarde: structurele plaatsingen in langjarige onderhoudsstromen. Voor
            u als opdrachtgever betekent het: schilderscapaciteit die meegroeit met uw
            MJOP, geleverd door vakmensen die conditiegericht denken — geleid door een
            specialist met twintig jaar ervaring in verf en planmatig onderhoud.
          </p>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container kaartwrap">
          <div className="kaartje" style={{ padding: 28 }}>
            <span className="kicker">De vakman achter het bedrijf</span>
            <h3 style={{ fontSize: 22 }}>André van der Hoogen</h3>
            <p>
              Ruim twintig jaar technische expertise in verf en onderhoud, kennis van
              RGS en planmatig onderhoud, en een sterk regionaal netwerk. Sparringpartner
              voor ondernemers en corporaties — vakmensen door vakmensen.
            </p>
            <Link href="/over-ons" className="verder">
              Lees meer over ons →
            </Link>
          </div>
          <div>
            <h2>Praten over uw onderhoudsopgave?</h2>
            <p className="lead" style={{ marginTop: 10 }}>
              Van een enkele mutatiewoning tot een meerjarig RGS-traject: we denken
              graag mee over capaciteit, kwaliteit en planning.
            </p>
            <Link href="/aanvraag" className="btn btn--primair" style={{ marginTop: 18 }}>
              Plan een gesprek
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
