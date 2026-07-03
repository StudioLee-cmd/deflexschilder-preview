import Link from 'next/link';
import Kruimel from '@/components/Kruimel';

export const metadata = {
  title: 'Over ons — vakmensen door vakmensen',
  description:
    'De Flexschilder wordt geleid en bemenst door echte schilders. 23 jaar vakkennis in verf, onderhoud en RGS — dé schildersspecialist van Noord-Nederland.',
};

// E-E-A-T-laag: author-pagina (André) + verhalen. In de volledige site worden de
// verhalen (Tieme · Jordy · Julia) eigen content; toestemming bevestigen met André.
export default function OverOns() {
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
      </section>

      <section className="sectie">
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h2>André van der Hoogen</h2>
            <p>
              <strong>23 jaar technische expertise</strong> in verf en
              onderhoud, diepgaande kennis van <strong>RGS en planmatig onderhoud</strong>,
              en een sterk regionaal netwerk in Noord-Nederland. André is
              sparringpartner voor ondernemers, corporaties en beheerders — iemand die
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
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <div className="kaartje" style={{ padding: 26 }}>
              <span className="kicker">Verhalen van vakmensen</span>
              <h3>De bewijslaag: echte verhalen</h3>
              <ul style={{ paddingLeft: 18, fontSize: 14.5, display: 'grid', gap: 6 }}>
                <li>&ldquo;Van zij-instromer naar vakman: het verhaal van Tieme&rdquo;</li>
                <li>&ldquo;Hoe Jordy zijn plek vond binnen het schildersvak&rdquo;</li>
                <li>&ldquo;Waarom Julia bewust kiest voor werken via De Flexschilder&rdquo;</li>
              </ul>
              <p style={{ fontSize: 13.5, color: 'var(--tekst-licht)' }}>
                Interviews volgen — verhalen overtuigen meer dan een lijst kenmerken.
              </p>
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
    </>
  );
}
