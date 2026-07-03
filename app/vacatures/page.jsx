import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import VacatureCard from '@/components/VacatureCard';
import { CITIES } from '@/lib/geo';
import { getAtsAdapter } from '@/lib/ats';

export const metadata = {
  title: 'Vacatures voor schilders in Noord-Nederland',
  description:
    'Vacature schilder gezocht? Structureel werk via De Flexschilder: vacatures voor schilders in Groningen, Friesland, Drenthe en de kop van Overijssel — met marktconforme salarissen.',
};

// PILLAR — cluster 2 (kandidaatkant, volume: "vacature schilder", "schilder gezocht").
export default async function Vacatures() {
  const vacatures = await getAtsAdapter().getVacatures();

  return (
    <>
      <div className="container kruimel">
        <Link href="/">Home</Link> › Vacatures
      </div>

      <section className="paginakop container">
        <span className="kicker">Voor schilders</span>
        <h1>Vacatures voor schilders</h1>
        <p className="lead">
          Structureel werk bij goede opdrachtgevers in heel Noord-Nederland — geen
          losse klusjes, maar plaatsingen waar je wat aan hebt. Marktconform salaris,
          eerlijke voorwaarden en begeleiding door vakmensen die het vak zelf kennen.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 32 }}>
        <div className="container">
          <SearchBar mode="werk" compact />
        </div>
      </section>

      <section className="sectie" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2>
            Alle vacatures{' '}
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--tekst-licht)' }}>
              ({vacatures.length}) — demo-data tot de ATS-koppeling live is
            </span>
          </h2>
          <div className="grid grid--2" style={{ marginTop: 22 }}>
            {vacatures.map((v) => (
              <VacatureCard key={v.slug} v={v} />
            ))}
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <h2>Vacatures per stad</h2>
          <div className="stedenchips" style={{ marginTop: 16 }}>
            {CITIES.map((c) => (
              <Link key={c.slug} href={`/vacatures/schilder-${c.slug}`} className="chip">
                Schilder gezocht {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sectie">
        <div className="container kaartwrap">
          <div>
            <h2>Zo werkt werken via De Flexschilder</h2>
            <div className="stappen" style={{ marginTop: 20 }}>
              <div className="stap">
                <p>
                  <strong>Schrijf je in</strong> — vertel wat je kunt en wat je zoekt.
                  Wij kennen de opdrachtgevers in het Noorden persoonlijk.
                </p>
              </div>
              <div className="stap">
                <p>
                  <strong>Wij matchen je op vakmanschap</strong> — het juiste werk op
                  het juiste niveau, met marktconform salaris.
                </p>
              </div>
              <div className="stap">
                <p>
                  <strong>Aan de slag, met begeleiding</strong> — coaching en de kans om
                  je vak te verdiepen, in theorie én praktijk.
                </p>
              </div>
            </div>
          </div>
          <div className="kaartje" style={{ padding: 28 }}>
            <h3>Niet gevonden wat je zoekt?</h3>
            <p>
              Zet ons aan het werk: schrijf je in en wij zoeken voor jou de juiste
              opdracht — vakmensen door vakmensen.
            </p>
            <Link href="/inschrijven" className="btn btn--primair" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
              Schrijf je in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
