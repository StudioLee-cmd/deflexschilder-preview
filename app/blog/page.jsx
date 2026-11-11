import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import { ARTIKELEN, CATEGORIEEN } from '@/lib/blog';

export const metadata = {
  title: 'Nieuws & vakkennis: voor opdrachtgevers en schilders',
  description:
    'Nieuws en vakkennis van De Flexschilder: regelgeving, salaris en reiskosten, vastgoedonderhoud en RGS. Geschreven door vakmensen uit Noordoost-Nederland.',
  alternates: { canonical: '/blog' },
};

// Blog-hub: de 4 cluster-categorieën uit de contentstructuur. Elk artikel hangt
// aan één categorie en linkt omhoog naar zijn pillar (hub-and-spoke).
export default function Blog() {
  return (
    <>
      <Kruimel items={[{ naam: 'Nieuws & vakkennis' }]} />

      <section className="paginakop container">
        <span className="kicker">Nieuws &amp; vakkennis</span>
        <h1>
          Laatste <span className="accent">nieuws</span>
        </h1>
        <p className="lead">
          Geschreven door vakmensen, niet door een marketingbureau: regelgeving die
          jouw portemonnee raakt, vakkennis over onderhoud en RGS, en nieuws uit het
          Noorden.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="stedenchips" style={{ marginBottom: 26 }}>
            {CATEGORIEEN.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>

          <div className="grid grid--2">
            {ARTIKELEN.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="kaartje">
                <img
                  src={a.hero}
                  alt=""
                  loading="lazy"
                  style={{ borderRadius: 8, aspectRatio: '16/9', objectFit: 'cover' }}
                />
                <span className="meta">
                  {a.categorie} · {a.gepubliceerdLabel} · {a.leestijd} lezen
                </span>
                <h3>{a.titel}</h3>
                <p style={{ fontSize: 14.5 }}>{a.excerpt.slice(0, 160)}…</p>
                <span className="verder">Lees verder →</span>
              </Link>
            ))}

            <div className="kaartje" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
              <span className="meta">Elke week nieuw</span>
              <h3>Een vraag voor het volgende artikel?</h3>
              <p style={{ fontSize: 14.5 }}>
                Elke week schrijven we over een vraag die opdrachtgevers of
                schilders aan André stellen. Over inhuren, salaris, cao,
                onderhoud of doorgroeien in het vak. Heb je een vraag die hier
                thuishoort? Laat het André weten.
              </p>
              <a href="tel:+31613718172" className="verder">
                Bel André: 06 - 137 181 72 →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
