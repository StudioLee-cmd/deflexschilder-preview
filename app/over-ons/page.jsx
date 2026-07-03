import Link from 'next/link';

export const metadata = {
  title: 'Over ons — vakmensen door vakmensen',
  description:
    'De Flexschilder wordt geleid en bemenst door echte schilders. Ruim twintig jaar vakkennis in verf, onderhoud en RGS — dé schildersspecialist van Noord-Nederland.',
};

// E-E-A-T-laag: author-pagina (André) + verhalen. In de volledige site worden de
// verhalen (Tieme · Jordy · Julia) eigen content; toestemming bevestigen met André.
export default function OverOns() {
  return (
    <>
      <div className="container kruimel">
        <Link href="/">Home</Link> › Over ons
      </div>

      <section className="paginakop container">
        <span className="kicker">Over De Flexschilder</span>
        <h1>Vakmensen door vakmensen</h1>
        <p className="lead">
          De Flexschilder is geen kantoor-uitzender die schilders alleen op papier
          kent. Wij worden geleid en bemenst door échte schilders — en dat merk je in
          alles: de matches, de planning en de kwaliteit op de steiger.
        </p>
      </section>

      <section className="sectie">
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h2>André van der Hoogen</h2>
            <p>
              Ruim <strong>twintig jaar technische expertise</strong> in verf en
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
              <h3>Tieme · Jordy · Julia</h3>
              <p style={{ fontSize: 15 }}>
                Hoe is het om via De Flexschilder te werken? De verhalen van onze
                vakmensen krijgen hier hun plek. <em>(Content volgt — preview.)</em>
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
