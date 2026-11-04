import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import ClusterBlok from '@/components/ClusterBlok';
import BeeldAI from '@/components/BeeldAI';

export const metadata = {
  title: 'Vastgoedonderhoud & RGS: resultaatgericht samenwerken',
  description:
    'RGS, planmatig onderhoud, NEN 2767 en MJOP: technische kennis bij het vinden van schilders voor vastgoedbeheerders en onderhoudsbedrijven in Noord-Nederland.',
  alternates: { canonical: '/vastgoedonderhoud-en-rgs' },
};

// PILLAR — cluster 4 (autoriteit/specialisme; AI-search). Wordt gevoed met
// André's wekelijkse inzichten in de contentfase.
export default function VastgoedRgs() {
  return (
    <>
      <Kruimel items={[{ naam: 'Vastgoedonderhoud & RGS' }]} />

      <section className="paginakop container">
        <span className="kicker">Vakkennis bij onderhoud</span>
        <h1>
          Vastgoedonderhoud &amp; <span className="accent">RGS</span>
        </h1>
        <p className="lead">
          Bij planmatig onderhoud moeten vakmensen passen bij het werk en de afgesproken kwaliteit. André kent de technische vragen rond verf en onderhoud. Die kennis gebruikt hij om bedrijven en schilders bij elkaar te brengen.
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
              zelf. Dat scheelt de opdrachtgever regie, faalkosten en verrassingen.
            </p>
            <h2>De taal van de opdrachtgever</h2>
            <ul>
              <li>
                <strong>NEN 2767-conditiemeting</strong>: de objectieve meetlat voor
                de staat van vastgoed. Kennis van deze meetmethode helpt om de onderhoudsopgave te begrijpen.
              </li>
              <li>
                <strong>MJOP</strong>: schilderwerk als planbare, begrote stroom in
                plaats van ad-hoc kosten.
              </li>
              <li>
                <strong>Ketensamenwerking</strong>: één team met beheerder, aannemer
                en schilders; korte lijnen, geen dubbel werk.
              </li>
              <li>
                <strong>Uitvoering</strong>: bespreek vooraf wie planning, bewonerscontact en kwaliteitscontrole verzorgt. Die verantwoordelijkheden horen bij de afspraken over het werk.
              </li>
            </ul>
            <h2>Schilders die passen bij je onderhoudsplanning</h2>
            <p>
              Zoek je vakmensen voor een langere onderhoudsperiode? André bespreekt het soort werk, de ondergrond en het gevraagde niveau. Hij brengt daarvoor zijn technische achtergrond mee, met{' '}
              <Link href="/auteur/andre">23 jaar ervaring in verf en planmatig onderhoud</Link>.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <BeeldAI
              src="/img/werk/julia-onderhoud.jpg"
              alt="Julia di Martino schildert het kozijn van een woning, met steiger ernaast"
              badge={null}
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
            titel="Meer over vakmensen voor onderhoud"
            intro="Bespreek de onderhoudsopgave en kijk welke ervaring in je ploeg nodig is."
            items={[
              { titel: 'Schilders voor je bedrijf', href: '/schilders-inhuren' },
              { titel: 'Voor aannemers en onderhoudsbedrijven', href: '/voor-aannemers' },
              { titel: 'Specialisaties van schilders', href: '/soorten-schilders' },
              { titel: 'Technische achtergrond van André', href: '/auteur/andre' },
            ]}
          />
          <div style={{ marginTop: 26, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/aanvraag" className="btn btn--primair">
              Praten over je onderhoudsopgave
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
