import Link from 'next/link';
import { CITIES } from '@/lib/geo';
import { VIEW_W, VIEW_H, LON_MIN, LON_MAX, LAT_MIN, LAT_MAX, PROVINCIES } from '@/lib/nlkaart';

// Kaart met de ÉCHTE Nederlandse grenzen (CBS-provinciegrenzen): heel NL in
// lichtgrijs, het werkgebied ingekleurd (Groningen/Friesland/Drenthe oranje,
// Overijssel licht — kop van Overijssel hoort erbij, Zwolle is de zuidgrens),
// en de 15 steden als échte oranje knop-links er bovenop. Geen blauw vlak,
// geen externe geo-API — zelfde projectie voor kaart én knoppen.

function px(lng) {
  return ((lng - LON_MIN) / (LON_MAX - LON_MIN)) * VIEW_W;
}
function py(lat) {
  return ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEW_H;
}

// Label-richting per stad — met de hand gekozen zodat niets overlapt in het
// drukke oosten (r = rechts van de stip · l = links · b = onder · t = boven).
const LABEL_ZIJDE = {
  groningen: 't',
  leeuwarden: 'l',
  assen: 'l',
  emmen: 'r',
  zwolle: 'b',
  drachten: 'b',
  heerenveen: 'b',
  hoogeveen: 'r',
  meppel: 'l',
  sneek: 'l',
  kampen: 'l',
  stadskanaal: 'r',
  hardenberg: 'r',
  veendam: 'b',
  winschoten: 't',
};

const KLEUR = {
  noord: { fill: '#fde8cc', stroke: '#fb8500', width: 2 },
  kop: { fill: '#fff4e6', stroke: '#fb8500', width: 1.5 },
  rest: { fill: '#efedeb', stroke: '#d8d2cd', width: 1 },
};

export default function NoordMap() {
  return (
    <div className="kaart" role="navigation" aria-label="Werkgebied Noord-Nederland — kies een stad">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
        {/* eerst de rest van NL, dan het werkgebied er bovenop (nette randen) */}
        {PROVINCIES.filter((p) => p.zone === 'rest').map((p) => (
          <path key={p.naam} d={p.d} fill={KLEUR.rest.fill} stroke={KLEUR.rest.stroke} strokeWidth={KLEUR.rest.width} strokeLinejoin="round" />
        ))}
        {PROVINCIES.filter((p) => p.zone === 'kop').map((p) => (
          <path key={p.naam} d={p.d} fill={KLEUR.kop.fill} stroke={KLEUR.kop.stroke} strokeWidth={KLEUR.kop.width} strokeLinejoin="round" />
        ))}
        {PROVINCIES.filter((p) => p.zone === 'noord').map((p) => (
          <path key={p.naam} d={p.d} fill={KLEUR.noord.fill} stroke={KLEUR.noord.stroke} strokeWidth={KLEUR.noord.width} strokeLinejoin="round" />
        ))}
        <text x={px(4.6)} y={py(52.62)} fontSize="15" fill="#9a918d" fontStyle="italic">
          buiten werkgebied
        </text>
      </svg>

      {CITIES.map((c) => {
        const x = (px(c.lng) / VIEW_W) * 100;
        const y = (py(c.lat) / VIEW_H) * 100;
        const zijde = LABEL_ZIJDE[c.slug] || 'r';
        return (
          <Link
            key={c.slug}
            href={`/schilders-inhuren/${c.slug}`}
            className={`kaart__marker kaart__marker--${zijde}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={`Schilders inhuren in ${c.name}`}
          >
            <span className="stip" aria-hidden />
            <span className="naam">{c.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
