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
  title: 'Over ons — vakmensen door vakmensen',
  description:
    'De Flexschilder wordt geleid en bemenst door echte schilders. 23 jaar vakkennis in verf, onderhoud en RGS — dé schildersspecialist van Noord-Nederland.',
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
          De Flexschilder is geen kantoor-uitzender die schilders alleen op papier
          kent, maar een <strong>ketenpartner in vaklieden</strong>: geleid en bemenst
          door échte schilders, lokaal betrokken, en we spreken de taal van de
          schilder én de ondernemer. Dat merk je in alles — de matches, de planning
          en de kwaliteit op de steiger.
        </p>
        {/* Entiteit-blok: in één alinea alles wat mens én AI over dit bedrijf
            moeten weten (wie · wat · waar · sinds · bewijs). */}
        <div className="kerndata" style={{ maxWidth: 820 }}>
          <strong>De Flexschilder in het kort</strong>
          <dl>
            <div><dt>Wat</dt><dd>Specialistische partner in schilders: detachering, uitzenden en werving &amp; selectie — B2B, geen losse klussen</dd></div>
            <div><dt>Wie</dt><dd>André van der Hoogen, eigenaar — 23 jaar technisch adviseur in de verf- en onderhoudsbranche</dd></div>
            <div><dt>Werkgebied</dt><dd>Noord-Nederland: Groningen, Friesland, Drenthe en de kop van Overijssel (zuidgrens Zwolle)</dd></div>
            <div><dt>Specialisme</dt><dd>Vastgoedonderhoud &amp; RGS, NEN 2767-conditiemeting, verfsystemen en onderhoudscycli</dd></div>
            <div><dt>Netwerk</dt><dd>Jarenlang opgebouwde connecties met de beste schildersbedrijven en opdrachtgevers in het Noorden</dd></div>
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
              sparringpartner voor ondernemers en beheerders — iemand die
              het vak van binnenuit kent en er eerlijk over adviseert.
            </p>
            <p>
              De schildersbranche is de laatste jaren sterk veranderd: nieuwe wet- en
              regelgeving, vernieuwde verfproducten en hogere eisen aan opleiding en
              kwaliteit. Als experts in deze branche begrijpen wij als geen ander hoe
              de markt in elkaar steekt — wij selecteren de juiste mensen voor de
              juiste baan.
            </p>
            <h2>Kwaliteit als uitgangspunt</h2>
            <p>
              We bieden de vakmensen in ons netwerk de mogelijkheid om hun kennis te
              vergroten, in theorie én praktijk — van techniek tot klantgerichtheid,
              met coaching en begeleiding.
            </p>
            <h2>Een netwerk waar je wat aan hebt</h2>
            <p>
              In 23 jaar bouw je wat op. André kent de schildersbedrijven,
              onderhoudsbedrijven en opdrachtgevers in het Noorden persoonlijk — en
              dat netwerk werkt twee kanten op: opdrachtgevers krijgen snel de juiste
              vakmensen, en schilders komen via De Flexschilder binnen bij{' '}
              <strong>bedrijven waar je écht graag wilt werken</strong> — niet zomaar
              de eerstvolgende klus.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <div className="kaartje" style={{ padding: 26 }}>
              <span className="kicker">Verhalen van vakmensen</span>
              <h3>De bewijslaag: echte verhalen</h3>
              <p style={{ fontSize: 14.5 }}>
                &ldquo;Vakmensen door vakmensen&rdquo; is geen slogan. Hieronder
                stellen Tieme, Joryd, Jermaine en Julia zich voor — elk met een
                eigen verhaal over werken via De Flexschilder.
              </p>
              <a href="#team" className="verder">Ontmoet het team →</a>
            </div>
            <div className="kaartje" style={{ padding: 26 }}>
              <h3>Gecertificeerd &amp; aangesloten</h3>
              <p style={{ fontSize: 15 }}>
                SNA-keurmerk, VCU-gecertificeerd en ABU-lid — de basis op orde, zodat
                opdrachtgevers zonder risico met ons werken.
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
            Geleid en bemenst door échte schilders. Dit zijn de mensen die het vak
            van binnenuit kennen — de basis onder &ldquo;vakmensen door
            vakmensen&rdquo;.
          </p>
          <TeamSectie />
          <p style={{ fontSize: 13.5, color: 'var(--tekst-licht)', marginTop: 16 }}>
            Foto&rsquo;s volgen — André verzorgt een eigen fotoshoot van het team.
          </p>
        </div>
      </section>

      {/* Verhalen — per vakmens een verhaal-blok; interviews landen 1-op-1 vanuit
          lib/team.js zodra André ze aanlevert. */}
      <section className="sectie">
        <div className="container">
          <span className="kicker">Verhalen van vakmensen</span>
          <h2>Echte verhalen, geen lijstje kenmerken</h2>
          <p className="lead" style={{ maxWidth: 760 }}>
            Waarom vakmensen bewust voor De Flexschilder kiezen, vertellen ze het
            liefst zelf. André legt hun verhalen vast — hieronder verschijnen ze
            zodra ze klaar zijn.
          </p>
          <div style={{ marginTop: 26 }}>
            <VerhaalLijst />
          </div>
        </div>
      </section>

      <section className="sectie sectie--donker ctaband">
        <div className="container ctaband__grid">
          <div className="ctaband__kaart">
            <span className="kicker">Voor opdrachtgevers</span>
            <h3 style={{ fontSize: 22 }}>Kennismaken?</h3>
            <p>Vertel ons over uw onderhoudsopgave of project — we denken graag mee.</p>
            <Link href="/aanvraag" className="btn btn--primair" style={{ alignSelf: 'flex-start' }}>
              Plan een gesprek
            </Link>
          </div>
          <div className="ctaband__kaart">
            <span className="kicker">Voor schilders</span>
            <h3 style={{ fontSize: 22 }}>Bij ons aan de slag?</h3>
            <p>Schrijf je in — wij zoeken werk dat bij je past, dicht bij huis.</p>
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
