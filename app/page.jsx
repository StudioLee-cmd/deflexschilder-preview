import Link from 'next/link';
import ZoekBalk from '@/components/ZoekBalk';
import NoordMap from '@/components/NoordMap';
import PlaatsenLijst from '@/components/PlaatsenLijst';
import BeeldAI from '@/components/BeeldAI';
import { CITIES } from '@/lib/geo';
import { getAtsAdapter } from '@/lib/ats';
import { ARTIKELEN } from '@/lib/blog';

export const metadata = {
  title: 'Uitzendbureau voor schilders Noord-Nederland — De Flexschilder',
  description:
    'Schilders inhuren of aan het werk als schilder in Groningen, Friesland, Drenthe en de kop van Overijssel. Detachering, uitzenden en werving & selectie — vakmensen door vakmensen.',
};

export default async function Home() {
  const vacatures = await getAtsAdapter().getVacatures();
  const artikel = ARTIKELEN[0];

  return (
    <>
      {/* HERO — oranje gradient + schilder + witte zoek-card, zoals live */}
      <section className="hero">
        <img
          src="/schilderfoto.png"
          alt=""
          aria-hidden
          className="hero__schilder"
          width={960}
          height={360}
        />
        <div className="container">
          <div className="hero__inner">
            <span className="kicker" style={{ color: '#ffd9a8' }}>
              Vakmensen door vakmensen · Noord-Nederland
            </span>
            <h1>Uitzendbureau voor schilders</h1>
            <p className="hero__sub">
              Meer dan bemiddeling, verstand van schilderwerk. Opdrachtgevers huren
              flexibel échte vakmensen in, schilders vinden werk dat bij ze past —
              persoonlijk gematcht door mensen die het vak zelf kennen.
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
                  {v.titel} {v.demo && <span className="demolabel">demo</span>}
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
              Groningen, Friesland, Drenthe en de kop van Overijssel — Zwolle is onze
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
                Detachering, uitzenden en werving &amp; selectie — schaalbaar zonder
                vaste loonkosten.
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
                Onderhouds-, industrieel, allround, spuiter — het juiste specialisme op
                de juiste klus.
              </p>
              <span className="verder">Bekijk →</span>
            </Link>
            <Link href="/vastgoedonderhoud-en-rgs" className="kaartje">
              <span className="meta">Ons specialisme</span>
              <h3>Vastgoedonderhoud &amp; RGS</h3>
              <p style={{ fontSize: 14.5 }}>
                Resultaatgericht samenwerken, NEN 2767 en MJOP — de langjarige
                onderhoudspartner.
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
            src="/img/corporatie-rijwoningen.jpg"
            alt="Schilders van De Flexschilder bereiden buitenschilderwerk voor aan een rij corporatiewoningen"
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
              Vakkennis en nieuws voor opdrachtgevers én schilders — geschreven door
              vakmensen, niet door een marketingbureau.
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
        <img className="fotocta__bg" src="/img/cta-roller.jpg" alt="" aria-hidden />
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
