import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { CITIES } from '@/lib/geo';

export const metadata = {
  title: 'Schilders inhuren — flexibele schilderscapaciteit in Noord-Nederland',
  description:
    'Schilders inhuren zonder vaste loonkosten: detachering, uitzenden en werving & selectie voor woningcorporaties, vastgoedbeheerders, aannemers en RGS-opdrachtgevers in Noord-Nederland.',
};

// PILLAR — cluster 1 (opdrachtgeverkant, hoogste waarde). Kernkeyword:
// "schilder(s) inhuren"; ondersteunend "uitzendbureau schilders".
export default function SchildersInhuren() {
  return (
    <>
      <div className="container kruimel">
        <Link href="/">Home</Link> › Schilders inhuren
      </div>

      <section className="paginakop container">
        <span className="kicker">Voor opdrachtgevers</span>
        <h1>Schilders inhuren in Noord-Nederland</h1>
        <p className="lead">
          Flexibele schilderscapaciteit van échte vakmensen — zonder vaste
          loonkosten. Voor structurele detachering en grotere opdrachten; geen losse
          klusjes. Geleid door schilders, dus wij snappen het vak én de planning.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 32 }}>
        <div className="container">
          <SearchBar mode="inhuren" compact />
        </div>
      </section>

      {/* Diensten — de drie vormen (menu-ankers) */}
      <section className="sectie sectie--vlak">
        <div className="container">
          <h2>Drie manieren om schilders in te huren</h2>
          <div className="grid grid--3" style={{ marginTop: 24 }}>
            <div className="kaartje" id="detachering">
              <h3>Detachering</h3>
              <p>
                Vakmensen voor langere tijd op uw project of in uw onderhoudsploeg.
                Volledige flexibiliteit, wij blijven werkgever — u stuurt aan op het
                werk, niet op de administratie.
              </p>
            </div>
            <div className="kaartje" id="uitzenden">
              <h3>Uitzenden</h3>
              <p>
                Pieken opvangen zonder risico: extra schilders precies in de weken dat
                het nodig is. Vandaag opschalen, morgen weer terug — u betaalt alleen
                de gewerkte uren.
              </p>
            </div>
            <div className="kaartje" id="werving-selectie">
              <h3>Werving &amp; selectie</h3>
              <p>
                Zoekt u een schilder in vaste dienst? Wij kennen de vakmensen in het
                Noorden persoonlijk en selecteren de juiste kandidaat — vakmanschap
                eerst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="sectie">
        <div className="container">
          <h2>Voor wie wij werken</h2>
          <div className="grid grid--4" style={{ marginTop: 24 }}>
            <div className="kaartje">
              <h3>Woningcorporaties</h3>
              <p>
                Planmatig en mutatie-onderhoud over uw hele bezit — schaalbare
                capaciteit zonder vaste formatie.
              </p>
            </div>
            <div className="kaartje">
              <h3>Aannemers &amp; onderhoudsbedrijven</h3>
              <p>
                Betrouwbare flex-schil bij piekdrukte en onderaanneming van
                schilderwerk, op locatie geregeld.
              </p>
            </div>
            <div className="kaartje">
              <h3>RGS-opdrachtgevers</h3>
              <p>
                Langjarige onderhoudspartner in resultaatgericht samenwerken —{' '}
                <Link href="/vastgoedonderhoud-en-rgs" style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
                  ons specialisme
                </Link>
                .
              </p>
            </div>
            <div className="kaartje">
              <h3>VvE- &amp; vastgoedbeheerders</h3>
              <p>
                Terugkerend binnen- en buitenschilderwerk over een portefeuille panden,
                netjes gepland en netjes opgeleverd.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="sectie sectie--vlak">
        <div className="container">
          <h2>Zo werkt het</h2>
          <div className="stappen" style={{ marginTop: 24, maxWidth: 760 }}>
            <div className="stap">
              <p>
                <strong>Vertel wat er moet gebeuren.</strong> Project, periode, locatie
                en het soort schilderwerk — een belletje of het aanvraagformulier is
                genoeg.
              </p>
            </div>
            <div className="stap">
              <p>
                <strong>Wij plannen de juiste vakmensen in.</strong> Op specialisme
                gematcht: onderhouds-, industrieel of allround. U weet vooraf wie er
                komt en wat het kost.
              </p>
            </div>
            <div className="stap">
              <p>
                <strong>Op- en afschalen wanneer u wilt.</strong> Meer werk? Extra
                capaciteit. Project klaar? Geen verplichtingen. Kwaliteit geborgd door
                vakmensen die het vak zelf kennen.
              </p>
            </div>
          </div>
          <Link href="/aanvraag" className="btn btn--primair" style={{ marginTop: 26 }}>
            Schilders aanvragen
          </Link>
        </div>
      </section>

      {/* Steden */}
      <section className="sectie">
        <div className="container">
          <h2>Schilders inhuren per stad</h2>
          <p className="lead" style={{ marginTop: 10 }}>
            Lokaal aanwezig in heel Noord-Nederland — kies uw regio.
          </p>
          <div className="stedenchips" style={{ marginTop: 18 }}>
            {CITIES.map((c) => (
              <Link key={c.slug} href={`/schilders-inhuren/${c.slug}`} className="chip">
                Schilders inhuren {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
