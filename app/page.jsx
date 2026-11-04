import Link from 'next/link';
import ZoekBalk from '@/components/ZoekBalk';
import NoordMap from '@/components/NoordMap';
import PlaatsenLijst from '@/components/PlaatsenLijst';
import BeeldAI from '@/components/BeeldAI';
import { CITIES } from '@/lib/geo';
import { getAtsAdapter } from '@/lib/ats';
import { ARTIKELEN } from '@/lib/blog';
import { TEAM } from '@/lib/team';

export const metadata = {
  title: 'Schilders inhuren in Noord-Nederland | De Flexschilder',
  description:
    'Schilders inhuren of aan het werk als schilder in Groningen, Friesland, Drenthe en de kop van Overijssel. Detachering, uitzenden en werving & selectie. Vakmensen door vakmensen.',
  alternates: { canonical: '/' },
};

export default async function Home() {
  const vacatures = await getAtsAdapter().getVacatures();
  const artikel = ARTIKELEN[0];

  return (
    <>
      {/* HERO — oranje gradient + schilder + witte zoek-card, zoals live.
          Het schilder-beeld is decoratief en zit in globals.css als .hero::before,
          binnen de desktop-query: mobiel verbergt 'm toch en hoeft 'm dus niet te laden. */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <span className="kicker" style={{ color: '#ffd9a8' }}>
              Vakmensen door vakmensen · Noord-Nederland
            </span>
            <h1>Schilders inhuren in Noord-Nederland</h1>
            <p className="hero__sub">
              Je zoekt schilders die passen bij het werk en bij je ploeg. De Flexschilder brengt bedrijven en vakmensen bij elkaar voor structureel schilderwerk in Noord-Nederland. Met verstand van verf, onderhoud en de mensen die het uitvoeren.
            </p>
            <div className="hero__paden">
              <Link href="/vacatures" className="hero__pad">
                Ik zoek werk →
              </Link>
              <Link href="/aanvraag" className="hero__pad">
                Ik zoek schilders →
              </Link>
            </div>
            <ZoekBalk />
          </div>
        </div>
      </section>

      {/* WAT WE DOEN — de B2B-propositie in één oogopslag (bron: brand.md,
          writing-style.md 21-10: structureel, terugkerend, langere inzet; geen
          losse klusdagen; geen minimumduur of werkgeversconstructie verzinnen). */}
      <section className="sectie">
        <div className="container">
          <span className="kicker">Voor bedrijven</span>
          <h2>
            Vakmensen voor werk dat <span className="accent">blijft komen</span>
          </h2>
          <p className="lead" style={{ maxWidth: 780, marginTop: 10 }}>
            De Flexschilder levert schilders aan bedrijven met een vaste of
            terugkerende behoefte: aannemers, onderhoudsbedrijven en
            vastgoedbeheerders in Groningen, Friesland, Drenthe en de kop van
            Overijssel.
          </p>
          <div className="grid grid--3" style={{ marginTop: 24 }}>
            <div className="kaartje">
              <h3>Voor projecten en onderhoudsploegen</h3>
              <p style={{ fontSize: 15 }}>
                Een renovatie, een onderhoudsplanning over meerdere panden of een
                drukke periode die maanden duurt. De schilder draait mee in je ploeg
                zolang het werk er ligt. Losse klusdagen doen we niet.
              </p>
            </div>
            <div className="kaartje">
              <h3>Zonder schilder op je loonlijst</h3>
              <p style={{ fontSize: 15 }}>
                Je hebt het hele jaar schilderwerk, maar wilt geen eigen schilder in
                dienst nemen. Dan werkt de schilder via De Flexschilder. De afspraken over
                inzet, tarief en contract stem je vooraf met André af.
              </p>
            </div>
            <div className="kaartje">
              <h3>Gekozen op vakkennis</h3>
              <p style={{ fontSize: 15 }}>
                André van der Hoogen was 23 jaar technisch adviseur in de
                verfindustrie. Hij weet wat onderhoud, renovatie of nieuwbouw vraagt
                en kiest de vakman op het werk dat er ligt. Een cv zegt daar weinig over.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/aanvraag" className="btn btn--primair">Schilders aanvragen</Link>
            <Link href="/schilders-inhuren" className="tekstlink">Zo werkt schilders inhuren</Link>
            <span style={{ fontSize: 14, color: 'var(--tekst-licht)' }}>
              Alleen zakelijk. Geen klussen voor particulieren.
            </span>
          </p>
        </div>
      </section>

      {/* VERHALEN — echte vakmensen, echte video's (interviews 28-10). */}
      <section className="sectie sectie--vlak">
        <div className="container">
          <span className="kicker">Vakmensen door vakmensen</span>
          <h2>
            Wie er via ons <span className="accent">aan het werk</span> is
          </h2>
          <div className="grid grid--4" style={{ marginTop: 24 }}>
            {TEAM.filter((l) => l.video).map((lid) => (
              <article key={lid.slug} className="kaartje verhaalkaart">
                {/* De video speelt hier af; preload="none" houdt de homepage licht. */}
                <video
                  className="verhaalkaart__beeld"
                  controls
                  preload="none"
                  playsInline
                  poster={lid.foto}
                  aria-label={`Video: ${lid.naam} over werken via De Flexschilder`}
                >
                  <source src={lid.video} type="video/mp4" />
                </video>
                <p className="verhaalkaart__quote">&ldquo;{lid.quote}&rdquo;</p>
                <span className="meta">{lid.naam} · {lid.rol}</span>
                <Link href={`/over-ons#verhaal-${lid.slug}`} className="verder">
                  Lees het hele verhaal →
                </Link>
              </article>
            ))}
          </div>
          <div className="verhaalcta">
            <div>
              <strong>Ook aan de slag als schilder?</strong>
              <span>Schrijf je in, dan neemt André contact met je op.</span>
            </div>
            <div className="verhaalcta__knoppen">
              <Link href="/inschrijven" className="btn btn--primair">Inschrijven als schilder</Link>
              <Link href="/vacatures" className="btn btn--secundair">Bekijk vacatures</Link>
            </div>
          </div>
          <p style={{ marginTop: 12, fontSize: 14.5 }}>
            Zoek je zulke vakmensen voor je bedrijf?{' '}
            <Link href="/aanvraag" className="tekstlink">Schilders aanvragen</Link>
          </p>
        </div>
      </section>

      {/* LAATSTE VACATURES — grijs, oranje accentwoord, zoals live */}
      <section className="sectie sectie--vlak">
        <div className="container">
          <h2>
            Laatste <span className="accent">vacatures</span>
          </h2>
          <div className="grid grid--3" style={{ marginTop: 24 }}>
            {vacatures.slice(0, 3).map((v) => (
              <div key={v.slug} className="vacature">
                <span className="vacature__titel">
                  {v.titel} {(v.demo || v.voorbeeld) && <span className="demolabel">{v.voorbeeld ? 'voorbeeld' : 'demo'}</span>}
                </span>
                <div className="vacature__meta">
                  <span className="m">{v.plaats}</span>
                  <span className="m">{v.dienstverband}</span>
                  <span className="m">{v.salarisIndicatie}</span>
                </div>
                <p style={{ fontSize: 14.5 }}>{v.beschrijving.slice(0, 110)}…</p>
                <Link href={`/vacatures/${v.slug}`} className="btn btn--primair btn--klein">
                  Bekijk vacature
                </Link>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/vacatures" className="tekstlink">
              Alle vacatures
            </Link>
          </p>
        </div>
      </section>

      {/* WERKGEBIED — klikbare Noord-NL-kaart */}
      <section className="sectie" id="werkgebied">
        <div className="container kaartwrap">
          <NoordMap />
          <div>
            <span className="kicker">Locaties</span>
            <h2>Werkgebied: Noord-Nederland, van Zwolle tot de Waddenkust</h2>
            <p className="lead" style={{ marginTop: 12 }}>
              Groningen, Friesland, Drenthe en de kop van Overijssel. Zwolle is onze
              zuidgrens. Klik een stad op de kaart of typ je eigen plaats in de
              zoekbalk: kleinere plaatsen vallen automatisch onder de dichtstbijzijnde
              grote stad, met de afstand er eerlijk bij.
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
        <div className="container" style={{ marginTop: 44 }}>
          <PlaatsenLijst />
        </div>
      </section>

      {/* TWEE KANTEN — de 4 clusters, duidelijk gesplitst */}
      <section className="sectie sectie--vlak">
        <div className="container">
          <h2>
            Eén specialist, <span className="accent">twee kanten</span> van het vak
          </h2>
          <div className="grid grid--4" style={{ marginTop: 24 }}>
            <Link href="/schilders-inhuren" className="kaartje">
              <span className="meta">Voor opdrachtgevers</span>
              <h3>Schilders inhuren</h3>
              <p style={{ fontSize: 14.5 }}>
                Een vaste behoefte aan extra vakmensen? Bespreek het werk, de periode en de ervaring die je zoekt.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/vacatures" className="kaartje">
              <span className="meta">Voor schilders</span>
              <h3>Vacatures &amp; werken</h3>
              <p style={{ fontSize: 14.5 }}>
                Structureel werk bij goede opdrachtgevers, met marktconform salaris en
                begeleiding.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/soorten-schilders" className="kaartje">
              <span className="meta">Specialisaties</span>
              <h3>Soorten schilders</h3>
              <p style={{ fontSize: 14.5 }}>
                Onderhouds-, industrieel, allround, spuiter: het juiste specialisme op
                de juiste klus.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/vastgoedonderhoud-en-rgs" className="kaartje">
              <span className="meta">Ons specialisme</span>
              <h3>Vastgoedonderhoud &amp; RGS</h3>
              <p style={{ fontSize: 14.5 }}>
                Schilderscapaciteit voor planmatig onderhoud, met kennis van verfsystemen en onderhoudsplanning.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* OVER — copy van live + AI-voorbeeldbeeld */}
      <section className="sectie">
        <div className="container kaartwrap">
          <div>
            <span className="kicker">Over De Flexschilder</span>
            <h2>Experts in de schildersbranche</h2>
            <div className="prose" style={{ marginTop: 14 }}>
              <p>
                Bij een goede match telt meer dan beschikbaarheid. Wat voor ondergrond ligt er, welk verfsysteem wordt gebruikt en hoeveel zelfstandigheid vraagt het werk? André van der Hoogen neemt zijn ervaring als technisch adviseur mee in het gesprek met bedrijven en schilders.
              </p>
              <p>
                Ook de voorkeuren van de schilder tellen mee: het soort werk, de reistijd en de mogelijkheid om verder te leren. Zo begint de samenwerking met een duidelijk beeld van beide kanten.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 22, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/over-ons" className="btn btn--primair">
                Meer informatie
              </Link>
              <Link href="/aanvraag" className="tekstlink">
                Contact opnemen
              </Link>
            </div>
          </div>
          <BeeldAI
            src="/img/werk/tieme-ploeg.jpg"
            alt="Tieme Smook overlegt met een collega bij de bus van Erik Pit Schilderwerken"
            badge={null}
            ratio="3 / 2"
          />
        </div>
      </section>

      {/* LAATSTE NIEUWS — oranje band zoals live, gevoed door de blog */}
      <section className="sectie oranjeband">
        <div className="container oranjeband__grid">
          <div>
            <h2>Laatste nieuws</h2>
            <p style={{ marginTop: 8, fontSize: 15.5 }}>
              Vakkennis en nieuws over schilderwerk, onderhoud en werken in de branche. Voor opdrachtgevers en schilders.
            </p>
            <p style={{ marginTop: 14 }}>
              <Link href="/blog" className="tekstlink">
                Alle nieuwsberichten
              </Link>
            </p>
          </div>
          <Link href={`/blog/${artikel.slug}`} className="nieuwskaart">
            <span className="meta" style={{ fontSize: 13, color: 'var(--tekst-licht)' }}>
              {artikel.categorie} · {artikel.gepubliceerdLabel} · {artikel.leestijd} lezen
            </span>
            <h3 style={{ fontSize: 18 }}>{artikel.titel}</h3>
            <p style={{ fontSize: 14.5 }}>{artikel.excerpt.slice(0, 150)}…</p>
            <span className="verder" style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
              Lees het artikel →
            </span>
          </Link>
        </div>
      </section>

      {/* FOTO-CTA — zoals live: foto + oranje kaart */}
      <section className="fotocta">
        <img className="fotocta__bg" src="/img/cta-roller.webp" alt="" aria-hidden loading="lazy" />
        <div className="fotocta__scrim" aria-hidden />
        <div className="container fotocta__inner">
          <div className="fotocta__kaart">
            <h2>Ben jij op zoek naar een nieuwe baan?</h2>
            <p>
              Op zoek naar een nieuwe baan als schilder, maar kom je er niet helemaal
              uit? Zet ons eerst aan het werk door je in te schrijven. Dan gaan wij
              voor jou op zoek naar jouw nieuwe baan.
            </p>
            <Link href="/inschrijven" className="btn btn--donker">
              Schrijf je in
            </Link>
            <p className="fotocta__wissel">
              Opdrachtgever? <Link href="/aanvraag">Vraag hier schilders aan →</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
