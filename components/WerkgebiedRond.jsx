import { placesWithin } from '@/lib/geo';

// HET WERKGEBIED ROND EEN STAD — de eigen inhoud van /vacatures/schilder-<stad>.
//
// Waarom dit blok bestaat: zonder dit was de stad-vacaturepagina een omhulsel om de
// vacatures die er toevallig in stonden. Gemeten 11-08 op de live preview droeg de
// pagina 65 unieke woorden in ~565 tekens, en de 15 stadspagina's waren onderling
// 84,6% identiek (mediaan over 105 paren) — het enige verschil was de stadsnaam, de
// provincie en vier buursteden. Voor 12 van de 15 steden stond er bovendien geen
// enkele vacature, dus daar was het een omhulsel om niets.
//
// Waarom JUIST de kernen en niet de blurb uit CITIES: die blurb is de lead van
// /schilders-inhuren/<stad> (de opdrachtgeverkant). 'M hier herhalen zou de twee
// intenties naar elkaar toe trekken, precies de scheiding die Tim 03-07 hard maakte
// ("de splitsing werkgevers <-> werkzoekenden moet glashelder zijn, ook voor SEO").
// Gemeten: de blurb erbij zetten tilt de overlap met de inhuren-pagina van 66% naar
// 74%, en 100% van de toegevoegde woorden stond daar al.
//
// De kernen zijn wél werkzoekende-eigen, feitelijk en per stad verschillend: ze komen
// uit de coordinaten die al in lib/geo.js staan, ze verschillen 14 tot 42 per stad, en
// ze beantwoorden de vraag die een schilder hier echt heeft — waar kom ik terecht als
// ik reageer.
//
// ⚑ 11-08, DE TWEEDE LAAG: de kernenlijst alleen is niet genoeg zodra twee buursteden
// hun straal delen. Gemeten op de live preview stond 96,2% van de woorden van
// /vacatures/schilder-winschoten óók op /vacatures/schilder-veendam, want 23 van
// Winschotens 24 kernen liggen óók binnen 20 km van Veendam. Dat is feitelijk juist en
// mag niet "gefixt" worden door de straal te knijpen of er een canonical tussen te
// leggen: dan sneuvelt precies de stadszoekopdracht waarvoor de pagina bestaat.
// Daarom draagt elke stad sinds vandaag `werkgebied` in lib/geo.js, hieronder als lead
// gerenderd. Let op de mechanica als je hier ooit tekst SCHRAPT: de overlap is
// |A∩B|/|A|, dus een gedeeld woord weghalen verhoogt 'm en alleen stad-eigen tekst
// toevoegen verlaagt 'm.
export default function WerkgebiedRond({ stad, straal = 20, zichtbaar = 12 }) {
  const plaatsen = placesWithin(stad, straal);
  if (plaatsen.length === 0) return null;

  const getoond = plaatsen.slice(0, zichtbaar);
  const rest = plaatsen.slice(zichtbaar);
  const [a, b] = plaatsen;

  return (
    <section className="sectie">
      <div className="container">
        <h2 style={{ fontSize: 22 }}>Waar je terechtkomt rond {stad.name}</h2>

        {/* De stad-eigen tekst gaat VOOR de afgeleide regel: eerst waar je terechtkomt in
            gewone taal, dan pas de mechanica van de straal. Dit is het enige blok op deze
            pagina dat niet uit de coordinaten volgt, en daarmee het enige dat twee
            buursteden met hetzelfde werkgebied uit elkaar trekt (zie lib/geo.js
            §werkgebied voor de meting die dit veld afdwong). */}
        {stad.werkgebied && (
          <p className="lead" style={{ marginTop: 10, maxWidth: 720 }}>
            {stad.werkgebied}
          </p>
        )}

        <p style={{ marginTop: 14, fontSize: 15, maxWidth: 720 }}>
          Het werk op deze pagina ligt binnen {straal} km van {stad.name}, en dat is
          meer dan de stad zelf. Komt er een opdracht binnen in {a.name} ({a.km} km)
          {b ? ` of ${b.name} (${b.km} km)` : ''}, dan zie je die hier ook staan. In
          totaal vallen {plaatsen.length} kernen in {stad.provincie} en omgeving binnen
          die straal.
        </p>

        <div className="stedenchips" style={{ marginTop: 16 }}>
          {getoond.map((p) => (
            <span key={p.name} className="chip chip--plaats">
              {p.name} · {p.km} km
            </span>
          ))}
        </div>

        {/* Bij een stad als Drachten vallen er 42 kernen binnen de straal. Die alle 42
            uitschrijven maakt van een leesbare sectie een muur, dus gaat de staart in
            dezelfde uitklapper die de home-pagina al gebruikt (Tim 03-07). Dichtgeklapt
            staat de tekst wél gewoon in de HTML, dus voor een zoekmachine telt 'ie mee. */}
        {rest.length > 0 && (
          <details className="plaatsen" style={{ marginTop: 14 }}>
            <summary className="plaatsen__hoofdknop">
              <strong>Nog {rest.length} kernen binnen {straal} km</strong>
              <span className="meta">
                van {rest[0].name} ({rest[0].km} km) tot {rest[rest.length - 1].name} (
                {rest[rest.length - 1].km} km)
              </span>
            </summary>
            <div className="plaatsen__dorpen" style={{ padding: '14px 0 0' }}>
              {rest.map((p) => (
                <span key={p.name} className="chip chip--plaats">
                  {p.name} · {p.km} km
                </span>
              ))}
            </div>
          </details>
        )}

        <p style={{ marginTop: 20, fontSize: 15, maxWidth: 720 }}>
          Woon je in een van deze plaatsen? Dan reis je niet naar de stad omdat de
          vacature daar staat. Wij plannen het werk zoveel mogelijk dicht bij huis, en
          bij het inplannen kijken we eerst naar wat het dichtst bij je zit.
        </p>
      </div>
    </section>
  );
}
