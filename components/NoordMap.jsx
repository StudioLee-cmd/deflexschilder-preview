import { CITIES } from '@/lib/geo';

// Klikbare Noord-NL-kaart: alléén het noorden (Zwolle en noordelijker) is
// ingekleurd en klikbaar. Vereenvoudigde omtrek (Waddenkust · Duitse grens ·
// zuidgrens bij Zwolle/Vechtdal · IJsselmeerkust), stippen = de 15 stadspagina's.
// Coördinaten worden 1-op-1 uit lat/lng geprojecteerd — geen externe geo-API.

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
    <div className="kaart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Werkgebied Noord-Nederland — klik een stad">
        {/* water/achtergrond */}
        <rect x="0" y="0" width={W} height={H} fill="#eef4f8" rx="12" />
        {/* het noorden — ingekleurd en klikbaar */}
        <path d={pad} fill="#fde8cc" stroke="#fb8500" strokeWidth="3" strokeLinejoin="round" />
        {/* zuidgrens-label */}
        <text x={px(5.62)} y={py(52.52)} fontSize="13" fill="#7a716e" fontStyle="italic">
          zuidgrens: Zwolle
        </text>
        <text x={px(5.44)} y={py(53.47)} fontSize="13" fill="#7a716e" fontStyle="italic">
          Waddenzee
        </text>
        {CITIES.map((c) => {
          const x = px(c.lng);
          const y = py(c.lat);
          // labelpositie: rechts van de stip, tenzij dicht bij de oostrand
          const links = x > W - 150;
          return (
            // native SVG-<a> (geen next/link) — veilig binnen de svg-namespace
            <a key={c.slug} href={`/schilders-inhuren/${c.slug}`} className="kaart__stip" aria-label={`Schilders inhuren in ${c.name}`}>
              <circle cx={x} cy={y} r="9" />
              <text x={links ? x - 14 : x + 14} y={y + 5} textAnchor={links ? 'end' : 'start'}>
                {c.name}
              </text>
            </a>
          );
        })}
      </svg>
    </div>
  );
}
