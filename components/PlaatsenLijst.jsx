import Link from 'next/link';
import { CITIES, PLACES, nearestCity } from '@/lib/geo';

// Volledige dekking zichtbaar (Tim 03-07): álle dorpen/kernen gegroepeerd onder
// hun dichtstbijzijnde stad, uitklapbaar per stad. Elke plaats linkt door naar
// de stadspagina mét de km-afstand in beeld — nooit "kan niet" binnen Noord-NL.
export default function PlaatsenLijst() {
  const groepen = new Map(CITIES.map((c) => [c.slug, []]));
  for (const p of PLACES) {
    const n = nearestCity(p);
    groepen.get(n.city.slug).push({ ...p, km: n.km });
  }

  return (
    // Eén compacte uitklapper (Tim 03-07: sectie was te groot op de home) —
    // dichtgeklapt is dit één regel; open toont de volledige dekking.
    <details className="plaatsen">
      <summary className="plaatsen__hoofdknop">
        <strong>Alle plaatsen in ons werkgebied</strong>
        <span className="meta">
          {PLACES.length} kernen onder {CITIES.length} steden — klik je dorp, elke
          plaats valt onder de dichtstbijzijnde stad
        </span>
      </summary>
      <div className="plaatsen__grid">
        {CITIES.map((c) => {
          const dorpen = groepen.get(c.slug).sort((a, b) => a.km - b.km);
          return (
            <details key={c.slug} className="plaatsen__stad">
              <summary>
                <strong>{c.name}</strong>
                <span className="meta">
                  {c.provincie} · {dorpen.length} plaatsen
                </span>
              </summary>
              <div className="plaatsen__dorpen">
                <Link href={`/schilders-inhuren/${c.slug}`} className="chip chip--stad">
                  {c.name} (stadspagina)
                </Link>
                {dorpen.map((d) => (
                  <Link
                    key={d.name}
                    href={`/schilders-inhuren/${c.slug}?van=${encodeURIComponent(d.name)}&km=${d.km}&straal=20`}
                    className="chip"
                  >
                    {d.name} · {d.km} km
                  </Link>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </details>
  );
}
