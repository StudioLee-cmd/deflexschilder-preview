import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import StatStrip from '@/components/StatStrip';
import TeamSectie from '@/components/TeamSectie';
import VerhaalLijst from '@/components/VerhaalLijst';
import { BASIS, ORG_ID, jsonLd } from '@/lib/schema';
import { teamPersonSchema } from '@/lib/team';

// AboutPage-schema: koppelt deze pagina expliciet aan de Organization in de
// site-graph — samen met het entiteit-blok hieronder is dit de pagina waar
// AI-zoekmachines het hele bedrijf uit begrijpen.
const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${BASIS}/over-ons#about`,
  mainEntity: { '@id': ORG_ID },
  inLanguage: 'nl',
};

export const metadata = {
  title: 'Over ons: vakmensen door vakmensen',
  description:
    'De Flexschilder wordt geleid en bemenst door echte schilders. 23 jaar vakkennis in verf, onderhoud en RGS. Dé schildersspecialist van Noord-Nederland.',
  alternates: { canonical: '/over-ons' },
};

// E-E-A-T-laag: author (André) + team + verhalen. Team en verhalen lezen uit
// lib/team.js; foto's en interviews zijn placeholders die 1-op-1 invallen zodra
// André ze aanlevert (eigen fotoshoot + opgenomen gesprekken, 22-07).
export default function OverOns() {
  // Person-schema voor de teamleden — alleen voor wie een gepubliceerd verhaal
  // heeft (geen lege entiteiten in de graph). Nu leeg; vult zichzelf als de
  // interviews landen.
  const teamPersonen = teamPersonSchema(BASIS, ORG_ID);
  const teamSchema = teamPersonen.length
    ? { '@context': 'https://schema.org', '@graph': teamPersonen }
    : null;
  return (
    <>
      <Kruimel items={[{ naam: 'Over ons' }]} />

      <section className="paginakop container">
        <span className="kicker">Over De Flexschilder</span>
        <h1>Vakmensen door vakmensen</h1>
        <p className="lead">
          De Flexschilder brengt bedrijven en schilders bij elkaar. André bespreekt welk werk er ligt, welke ervaring nodig is en wat een schilder zoekt. Zijn technische achtergrond in verf en onderhoud helpt om verder te kijken dan een cv.
        </p>
        {/* Entiteit-blok: in één alinea alles wat mens én AI over dit bedrijf
            moeten weten (wie · wat · waar · sinds · bewijs). */}
        <div className="kerndata" style={{ maxWidth: 820 }}>
          <strong>De Flexschilder in het kort</strong>
          <dl>
            <div><dt>Wat</dt><dd>Specialistische partner in schilders: detachering, uitzenden en werving &amp; selectie. B2B, geen losse klussen</dd></div>
            <div><dt>Wie</dt><dd>André van der Hoogen, eigenaar. 23 jaar technisch adviseur in de verf- en onderhoudsbranche</dd></div>
            <div><dt>Werkgebied</dt><dd>Noord-Nederland: Groningen, Friesland, Drenthe en de kop van Overijssel (zuidgrens Zwolle)</dd></div>
            <div><dt>Specialisme</dt><dd>Vastgoedonderhoud &amp; RGS, NEN 2767-conditiemeting, verfsystemen en onderhoudscycli</dd></div>
            <div><dt>Netwerk</dt><dd>Een regionaal netwerk van schilders, schildersbedrijven en onderhoudsbedrijven</dd></div>
            <div><dt>Bewijs</dt><dd>SNA-keurmerk · VCU-gecertificeerd · ABU-lid · KvK 83856323 · Steenwijkerwold</dd></div>
          </dl>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 26 }}>
        <StatStrip
          items={[
            { tot: 23, label: 'jaar in verf en onderhoud' },
            { tot: 4, label: 'provincies werkgebied' },
            { tot: 3, label: 'certificeringen (SNA · VCU · ABU)' },
            { vast: '1', label: 'aanspreekpunt uit het vak' },
          ]}
        />
      </section>

      <section className="sectie">
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h2>André van der Hoogen</h2>
            <p>
              <strong>23 jaar technische expertise</strong> in verf en
              onderhoud, diepgaande kennis van <strong>RGS en planmatig onderhoud</strong>,
              en een sterk regionaal netwerk in Noord-Nederland. André is
              sparringpartner voor ondernemers en beheerders: iemand die
              het vak van binnenuit kent en er eerlijk over adviseert.
            </p>
            <p>
              Een project vraagt bijvoorbeeld ervaring met een bepaalde ondergrond, een verfsysteem of zelfstandig werken. André neemt zulke vragen mee in het gesprek met beide partijen, zodat de eisen van het werk en de ervaring van de schilder helder zijn.
            </p>
            <h2>Kwaliteit als uitgangspunt</h2>
            <p>
              We bieden de vakmensen in ons netwerk de mogelijkheid om hun kennis te
              vergroten, in theorie én praktijk: van techniek tot klantgerichtheid,
              met coaching en begeleiding.
            </p>
            <h2>Een netwerk waar je wat aan hebt</h2>
            <p>
              Het netwerk werkt twee kanten op. Bedrijven bespreken hun terugkerende behoefte aan vakmensen. Schilders vertellen welk werk ze willen doen, welke reistijd past en waar ze zich in willen ontwikkelen.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <div className="kaartje" style={{ padding: 26 }}>
              <span className="kicker">Verhalen van vakmensen</span>
              <h3>De mensen achter het werk</h3>
              <p style={{ fontSize: 14.5 }}>
                Jordy, Tieme en Robbin vertellen op video hoe ze via
                De Flexschilder in het schildersvak terechtkwamen.
              </p>
              <a href="#verhalen" className="verder">Bekijk de verhalen →</a>
            </div>
            <div className="kaartje" style={{ padding: 26 }}>
              <h3>Gecertificeerd &amp; aangesloten</h3>
              <p style={{ fontSize: 15 }}>
                SNA-keurmerk, VCU-gecertificeerd en ABU-lid: informatie over de organisatie en de samenwerking.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <img src="/SNA-1-1.svg" alt="SNA" height={40} style={{ height: 40, width: 'auto' }} />
                <img src="/vcu-2-1.svg" alt="VCU" height={40} style={{ height: 40, width: 'auto' }} />
                <img src="/abu-1-1.svg" alt="ABU" height={40} style={{ height: 40, width: 'auto' }} />
              </div>
            </div>
            <div className="kaartje" style={{ padding: 26 }}>
              <h3>Contact</h3>
              <p style={{ fontSize: 15 }}>
                ☎ <a href="tel:+31613718172" style={{ fontWeight: 700 }}>06 - 137 181 72</a>
                <br />✉ <a href="mailto:andre@deflexschilder.nl" style={{ fontWeight: 700 }}>andre@deflexschilder.nl</a>
                <br />
                Oldemarktseweg 74, 8341 SH Steenwijkerwold
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team — de vakmensen achter het merk. Foto's zijn placeholders tot Andrés
          eigen fotoshoot binnen is; 1-op-1 vervangbaar via lib/team.js. */}
      <section className="sectie sectie--vlak" id="team">
        <div className="container">
          <span className="kicker">Ons team</span>
          <h2>De vakmensen achter De Flexschilder</h2>
          <p className="lead" style={{ maxWidth: 760 }}>
            Vier vakmensen die via De Flexschilder werken: twee zij-instromers,
            een allround schilder en een allround glaszetter.
          </p>
          <TeamSectie />
        </div>
      </section>

      {/* Verhalen — per vakmens een verhaal-blok; interviews landen 1-op-1 vanuit
          lib/team.js zodra André ze aanlevert. */}
      <section className="sectie" id="verhalen">
        <div className="container">
          <span className="kicker">Verhalen van vakmensen</span>
          <h2>In hun eigen woorden</h2>
          <p className="lead" style={{ maxWidth: 760 }}>
            Een profkeeper, een oud-medewerker van het COA, een orderpicker en een
            steigerbouwer. Vier verschillende wegen naar het schildersvak.
          </p>
          <div style={{ marginTop: 26 }}>
            <VerhaalLijst />
          </div>
          <div className="verhaalcta" style={{ marginTop: 10 }}>
            <div>
              <strong>Ook aan de slag als schilder?</strong>
              <span>Schrijf je in, dan neemt André contact met je op.</span>
            </div>
            <div className="verhaalcta__knoppen">
              <Link href="/inschrijven" className="btn btn--primair">Inschrijven als schilder</Link>
              <Link href="/vacatures" className="btn btn--secundair">Bekijk vacatures</Link>
              <Link href="/aanvraag" className="btn btn--secundair">Schilders aanvragen</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sectie sectie--donker ctaband">
        <div className="container ctaband__grid">
          <div className="ctaband__kaart">
            <span className="kicker">Voor opdrachtgevers</span>
            <h3 style={{ fontSize: 22 }}>Kennismaken?</h3>
            <p>Vertel ons over je onderhoudsopgave of project. We denken graag mee.</p>
            <Link href="/aanvraag" className="btn btn--primair" style={{ alignSelf: 'flex-start' }}>
              Plan een gesprek
            </Link>
          </div>
          <div className="ctaband__kaart">
            <span className="kicker">Voor schilders</span>
            <h3 style={{ fontSize: 22 }}>Bij ons aan de slag?</h3>
            <p>Schrijf je in: wij zoeken werk dat bij je past, dicht bij huis.</p>
            <Link href="/inschrijven" className="btn btn--ghost" style={{ alignSelf: 'flex-start' }}>
              Schrijf je in
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ABOUT_SCHEMA) }} />
      {teamSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(teamSchema) }} />
      ) : null}
    </>
  );
}
