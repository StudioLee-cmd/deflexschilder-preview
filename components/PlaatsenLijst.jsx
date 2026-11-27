import Link from 'next/link';
import { CITIES, werkgebied } from '@/lib/geo';

// Volledige dekking zichtbaar (Tim 03-07): alle dorpen en kernen per stad, uitklapbaar per stad.
// Sinds 27-11 per WERKGEBIED (lib/geo.js, regels 2 en 3): een plaats staat onder elke stad
// binnen 20 km, dus Hasselt staat onder Zwolle én Kampen. Geen telling per stad (Tim 27-11:
// een getal dat niets beantwoordt). Elke plaats linkt door naar de stadspagina, met de km.
export default function PlaatsenLijst() {
  return (
    // Eén compacte uitklapper (Tim 03-07: sectie was te groot op de home) —
    // dichtgeklapt is dit één regel; open toont de volledige dekking.
    <details className="plaatsen">
      <summary className="plaatsen__hoofdknop">
        <strong>Alle plaatsen in ons werkgebied</strong>
        <span className="meta">
          Klik je plaats. Ligt hij dicht bij twee steden, dan staat hij onder allebei
        </span>
      </summary>
      <div className="plaatsen__grid">
        {CITIES.map((c) => {
          const dorpen = werkgebied(c);
          return (
            <details key={c.slug} className="plaatsen__stad">
              <summary>
                <strong>{c.name}</strong>
                <span className="meta">{c.provincie}</span>
              </summary>
              <div className="plaatsen__dorpen">
                <Link href={`/schilders-inhuren/${c.slug}`} className="chip chip--stad">
                  {c.name} (stadspagina)
                </Link>
                {dorpen.map((d) => (
                  <Link
                    key={d.name}
                    href={`/schilders-inhuren/${c.slug}?van=${encodeURIComponent(d.name)}&km=${d.km}`}
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
