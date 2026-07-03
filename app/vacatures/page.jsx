import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import ZoekBalk from '@/components/ZoekBalk';
import ClusterBlok from '@/components/ClusterBlok';
import VacatureCard from '@/components/VacatureCard';
import { CITIES } from '@/lib/geo';
import { getAtsAdapter } from '@/lib/ats';

export const metadata = {
  title: 'Vacatures voor schilders in Noord-Nederland',
  description:
    'Vacature schilder gezocht? Structureel werk via De Flexschilder: vacatures voor schilders in Groningen, Friesland, Drenthe en de kop van Overijssel — met marktconforme salarissen.',
  alternates: { canonical: '/vacatures' },
};

// PILLAR — cluster 2 (kandidaatkant; "vacature schilder", "schilder gezocht").
export default async function Vacatures() {
  const vacatures = await getAtsAdapter().getVacatures();

  return (
    <>
      <Kruimel items={[{ naam: 'Vacatures' }]} />

      <section className="paginakop container">
        <span className="kicker">Voor schilders · pillar</span>
        <h1>
          Vacatures voor <span className="accent">schilders</span>
        </h1>
        <p className="lead">
          Structureel werk bij goede opdrachtgevers in heel Noord-Nederland — geen
          losse klusjes. Marktconform salaris, eerlijke voorwaarden en begeleiding
          door vakmensen die het vak zelf kennen.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container">
          <ZoekBalk mode="werk" toonTabs={false} />
        </div>
      </section>

      <section className="sectie sectie--vlak" style={{ paddingTop: 44 }}>
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

      <section className="sectie">
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

      <section className="sectie sectie--vlak">
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
                  <strong>Wij matchen op vakmanschap</strong> — het juiste werk op het
                  juiste niveau, met marktconform salaris.
                </p>
              </div>
              <div className="stap">
                <p>
                  <strong>Aan de slag, met begeleiding</strong> — coaching en de kans
                  om je vak te verdiepen, in theorie én praktijk.
                </p>
              </div>
            </div>
          </div>
          <div className="kaartje" style={{ padding: 28, alignSelf: 'start' }}>
            <h3>Niet gevonden wat je zoekt?</h3>
            <p style={{ fontSize: 14.5 }}>
              Zet ons aan het werk: schrijf je in en wij zoeken voor jou de juiste
              opdracht — vakmensen door vakmensen.
            </p>
            <Link href="/inschrijven" className="btn btn--primair" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
              Schrijf je in
            </Link>
            <p style={{ fontSize: 14, marginTop: 10 }}>
              <Link href="/blog/kilometervergoeding-2026-25-cent" className="tekstlink">
                Nieuw: kilometervergoeding 2026 omhoog
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Maatwerk — André's steekwoorden: uitzenden is maatwerk, de juiste match */}
      <section className="sectie">
        <div className="container kaartwrap">
          <div className="prose">
            <span className="kicker">Uitzenden is maatwerk</span>
            <h2>Niet de snelste match, maar de juiste match</h2>
            <p>
              Elke vakman heeft andere behoeftes: vrijheid, het soort werk dat je
              leuk vindt, reistijd, ontwikkeling. Wij peilen eerst wat jíj wilt — en
              zoeken daar een passende opdrachtgever bij. Geen cv-schuiven, maar een
              vakinhoudelijke match door mensen die je werk kunnen beoordelen.
            </p>
            <p>
              En we kijken verder dan de plaatsing: wij investeren in mensen en
              helpen je groeien binnen het vak — van zij-instromer tot allround
              vakman.
            </p>
          </div>
          <div className="kaartje" style={{ alignSelf: 'center' }}>
            <h3>Verhalen van vakmensen</h3>
            <p style={{ fontSize: 14.5 }}>
              Hoe dat uitpakt? Dat vertellen onze mensen straks zelf: het verhaal van
              zij-instromers Tieme en Jordy, en waarom Julia bewust voor werken via De
              Flexschilder kiest.
            </p>
            <Link href="/over-ons" className="verder">
              Lees over ons team →
            </Link>
          </div>
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container">
          <ClusterBlok
            titel="Cluster: werken als schilder (pillar + ondersteunende artikelen)"
            intro="De vragen die werkzoekende schilders googelen — elk artikel linkt terug naar dit vacature-overzicht."
            items={[
              { titel: 'Kilometervergoeding 2026: wat scheelt het jou?', href: '/blog/kilometervergoeding-2026-25-cent' },
              { titel: 'Salaris van een schilder (per specialisme)', href: '/soorten-schilders' },
              { titel: 'Leerling of BBL-schilder worden' },
              { titel: 'Als zzp-schilder aan de slag' },
              { titel: 'Doorgroeien als schilder' },
              { titel: 'Hoe werken via De Flexschilder werkt' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
