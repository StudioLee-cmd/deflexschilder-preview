import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import NoordMap from '@/components/NoordMap';
import VacatureCard from '@/components/VacatureCard';
import { CITIES } from '@/lib/geo';
import { getAtsAdapter } from '@/lib/ats';

export const metadata = {
  title: 'Uitzendbureau voor schilders Noord-Nederland — De Flexschilder',
  description:
    'Schilders inhuren of aan het werk als schilder in Groningen, Friesland, Drenthe en de kop van Overijssel. Detachering, uitzenden en werving & selectie — vakmensen door vakmensen.',
};

export default async function Home() {
  const vacatures = await getAtsAdapter().getVacatures();

  return (
    <>
      {/* HERO — zelfde look als huidig (foto + wit), met de twee duidelijke paden */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="kicker">Uitzendbureau voor schilders · Noord-Nederland</span>
            <h1>Vakmensen door vakmensen</h1>
            <p className="lead" style={{ marginTop: 14 }}>
              De Flexschilder is dé schildersspecialist van het Noorden. Opdrachtgevers
              huren flexibel echte vakmensen in; schilders vinden structureel werk —
              geleid door schilders die het vak zelf kennen.
            </p>

            <div className="hero__paden">
              <Link href="/schilders-inhuren" className="pad pad--oranje">
                <span className="pad__label">Voor opdrachtgevers</span>
                <span className="pad__titel">Ik zoek schilders</span>
                <p className="pad__sub">
                  Flexibele capaciteit voor corporaties, vastgoedbeheer, aannemers en
                  RGS-projecten.
                </p>
                <span className="pad__pijl">→</span>
              </Link>
              <Link href="/vacatures" className="pad">
                <span className="pad__label">Voor schilders</span>
                <span className="pad__titel">Ik zoek werk</span>
                <p className="pad__sub">
                  Structurele opdrachten en vacatures bij goede opdrachtgevers in
                  Noord-Nederland.
                </p>
                <span className="pad__pijl">→</span>
              </Link>
            </div>
          </div>

          <div className="hero__foto">
            <img
              src="/schilderfoto.png"
              alt="Schilder van De Flexschilder aan het werk"
              width={960}
              height={720}
            />
          </div>
        </div>
      </section>

      {/* ZOEKEN — plaats + straal, twee doelgroepen */}
      <section className="sectie sectie--vlak" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="container">
          <SearchBar />
        </div>
      </section>

      {/* WERKGEBIED — klikbare Noord-NL-kaart */}
      <section className="sectie" id="werkgebied">
        <div className="container kaartwrap">
          <NoordMap />
          <div>
            <span className="kicker">Werkgebied</span>
            <h2>Noord-Nederland, van Zwolle tot de Waddenkust</h2>
            <p className="lead" style={{ marginTop: 12 }}>
              We werken in Groningen, Friesland, Drenthe en de kop van Overijssel —
              Zwolle is onze zuidgrens. Klik een stad op de kaart, of typ je eigen
              plaats in de zoekbalk: kleinere plaatsen vallen automatisch onder de
              dichtstbijzijnde grote stad, met de afstand er eerlijk bij.
            </p>
            <div className="stedenchips">
              {CITIES.map((c) => (
                <Link key={c.slug} href={`/schilders-inhuren/${c.slug}`} className="chip">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIENSTEN — de 4 clusters, klikbaar */}
      <section className="sectie sectie--vlak">
        <div className="container">
          <span className="kicker">Wat we doen</span>
          <h2>Eén specialist, twee kanten van het vak</h2>
          <div className="grid grid--4" style={{ marginTop: 26 }}>
            <Link href="/schilders-inhuren" className="kaartje">
              <h3>Schilders inhuren</h3>
              <p className="meta">Voor opdrachtgevers</p>
              <p>
                Flexibele schilderscapaciteit — detachering, uitzenden en werving &amp;
                selectie. Schaalbaar zonder vaste loonkosten.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/vacatures" className="kaartje">
              <h3>Vacatures &amp; werken</h3>
              <p className="meta">Voor schilders</p>
              <p>
                Structureel werk bij goede opdrachtgevers, eerlijke voorwaarden en
                begeleiding door vakmensen.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/soorten-schilders" className="kaartje">
              <h3>Soorten schilders</h3>
              <p className="meta">Specialisaties</p>
              <p>
                Van onderhoudsschilder tot industrieel schilder en spuiter — het juiste
                specialisme op de juiste klus.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/vastgoedonderhoud-en-rgs" className="kaartje">
              <h3>Vastgoedonderhoud &amp; RGS</h3>
              <p className="meta">Ons specialisme</p>
              <p>
                Resultaatgericht samenwerken, planmatig onderhoud en NEN 2767 — de
                langjarige onderhoudspartner.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* LAATSTE VACATURES — zoals huidig, uit de ATS-adapter */}
      <section className="sectie">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span className="kicker">Voor schilders</span>
              <h2>Laatste vacatures</h2>
            </div>
            <Link href="/vacatures" className="btn btn--secundair">
              Alle vacatures
            </Link>
          </div>
          <div className="grid grid--3" style={{ marginTop: 26 }}>
            {vacatures.slice(0, 3).map((v) => (
              <VacatureCard key={v.slug} v={v} />
            ))}
          </div>
        </div>
      </section>

      {/* OVER — copy van de huidige site, zelfde beeld */}
      <section className="sectie sectie--vlak">
        <div className="container kaartwrap">
          <div>
            <span className="kicker">Over De Flexschilder</span>
            <h2>Experts in de schildersbranche</h2>
            <div className="prose" style={{ marginTop: 14 }}>
              <p>
                De schildersbranche is de laatste jaren sterk veranderd. De wet- en
                regelgeving zijn aangepast, en ook de verfproducten zijn vernieuwd.
                Bovendien worden er nu andere eisen gesteld aan de opleiding en
                kwaliteit van vakmensen. Als experts in deze branche begrijpen wij als
                geen ander hoe de markt in elkaar steekt. Wij selecteren de juiste
                mensen voor de juiste baan.
              </p>
              <p>
                Kwaliteit is voor ons van groot belang. We bieden de vakmensen in ons
                netwerk de mogelijkheid om hun kennis te vergroten, zowel in theorie
                als in praktijk — inclusief coaching en begeleiding.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
              <Link href="/over-ons" className="btn btn--primair">
                Meer informatie
              </Link>
              <Link href="/aanvraag" className="btn btn--secundair">
                Contact opnemen
              </Link>
            </div>
          </div>
          <div className="hero__foto">
            <img src="/shilder2-1024x683.jpg" alt="Schilderwerk in uitvoering" width={1024} height={683} />
          </div>
        </div>
      </section>

      {/* CTA-BAND — beide doelgroepen, duidelijk gescheiden */}
      <section className="sectie sectie--donker ctaband">
        <div className="container">
          <div className="ctaband__grid">
            <div className="ctaband__kaart">
              <span className="kicker">Voor opdrachtgevers</span>
              <h3 style={{ fontSize: 24 }}>Schilderscapaciteit nodig?</h3>
              <p>
                Vertel ons wat er geschilderd moet worden en waar — wij plannen de
                juiste vakmensen in. Vandaag aangevraagd, snel geregeld.
              </p>
              <Link href="/aanvraag" className="btn btn--primair" style={{ alignSelf: 'flex-start' }}>
                Schilders aanvragen
              </Link>
            </div>
            <div className="ctaband__kaart">
              <span className="kicker">Voor schilders</span>
              <h3 style={{ fontSize: 24 }}>Op zoek naar een nieuwe baan?</h3>
              <p>
                Kom je er niet helemaal uit? Zet ons eerst aan het werk door je in te
                schrijven — dan zoeken wij voor jou de juiste opdracht.
              </p>
              <Link href="/inschrijven" className="btn btn--ghost" style={{ alignSelf: 'flex-start' }}>
                Schrijf je in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
