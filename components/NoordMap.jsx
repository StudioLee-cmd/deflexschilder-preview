import Link from 'next/link';
import { CITIES } from '@/lib/geo';

// Klikbare Noord-NL-kaart: alléén het noorden (Zwolle en noordelijker) is
// ingekleurd. De SVG tekent de vorm; de stad-markers zijn ECHTE HTML-links
// (absoluut gepositioneerd op dezelfde projectie) — betrouwbaar klikbaar en
// toegankelijk, geen SVG-anchor-gedoe. Geen externe geo-API.

const LON_MIN = 5.25;
const LON_MAX = 7.30;
const LAT_MIN = 52.40;
const LAT_MAX = 53.55;
const W = 800;
const H = 730;

function px(lng) {
  return ((lng - LON_MIN) / (LON_MAX - LON_MIN)) * W;
}
function py(lat) {
  return ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
}

// Vereenvoudigde omtrek van het werkgebied (lon, lat) — met de klok mee.
const OMTREK = [
  [5.42, 53.18], // Harlingen
  [5.60, 53.31], // Zwarte Haan
  [5.90, 53.39], // Holwerd
  [6.20, 53.41], // Lauwersoog
  [6.55, 53.44], // Noord-Groningse kust
  [6.83, 53.46], // Eemshaven
  [6.93, 53.33], // Delfzijl
  [7.10, 53.30], // Dollard
  [7.21, 53.18], // Bad Nieuweschans
  [7.09, 52.88], // Duitse grens (Ter Apel)
  [7.05, 52.65], // grens Zuidoost-Drenthe
  [6.95, 52.63], // Coevorden
  [6.65, 52.52], // Hardenberg-zuid
  [6.42, 52.47], // Ommen-zuid
  [6.08, 52.46], // Zwolle-zuid (zuidgrens)
  [5.85, 52.55], // IJssel bij Kampen
  [5.75, 52.59], // Ketelmeer
  [5.60, 52.65], // Urk
  [5.60, 52.76], // Noordoostpolder-west
  [5.71, 52.83], // Lemmer
  [5.36, 52.88], // Stavoren
  [5.40, 53.05], // Makkum
];

export default function NoordMap() {
  const pad =
    OMTREK.map(([lng, lat], i) => `${i === 0 ? 'M' : 'L'}${px(lng).toFixed(1)},${py(lat).toFixed(1)}`).join(' ') +
    ' Z';

  return (
    <div className="kaart" role="navigation" aria-label="Werkgebied Noord-Nederland — kies een stad">
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <rect x="0" y="0" width={W} height={H} fill="#eef4f8" rx="12" />
        <path d={pad} fill="#fde8cc" stroke="#fb8500" strokeWidth="3" strokeLinejoin="round" />
        <text x={px(5.62)} y={py(52.52)} fontSize="13" fill="#7a716e" fontStyle="italic">
          zuidgrens: Zwolle
        </text>
        <text x={px(5.44)} y={py(53.47)} fontSize="13" fill="#7a716e" fontStyle="italic">
          Waddenzee
        </text>
      </svg>

      {CITIES.map((c) => {
        const x = (px(c.lng) / W) * 100;
        const y = (py(c.lat) / H) * 100;
        const rechtsUit = px(c.lng) > W - 150; // label links van de stip bij de oostrand
        return (
          <Link
            key={c.slug}
            href={`/schilders-inhuren/${c.slug}`}
            className={`kaart__marker${rechtsUit ? ' kaart__marker--links' : ''}`}
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
