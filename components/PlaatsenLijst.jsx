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
    <div className="plaatsen">
      <h2 style={{ fontSize: 24 }}>Alle plaatsen in ons werkgebied</h2>
      <p className="lead" style={{ marginTop: 8, fontSize: 15.5 }}>
        Elk dorp valt onder de dichtstbijzijnde grote stad — klik je plaats en je
        komt op de juiste regiopagina, met de afstand er eerlijk bij. In totaal{' '}
        {PLACES.length} kernen onder {CITIES.length} steden.
      </p>
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
    </div>
  );
}
