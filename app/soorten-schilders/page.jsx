import Link from 'next/link';

export const metadata = {
  title: 'Soorten schilders — specialisaties en salarisindicaties',
  description:
    'Van onderhoudsschilder tot industrieel schilder, spuiter en gevelschilder: alle specialisaties, wat ze doen en marktconforme salarisindicaties.',
};

// PILLAR — cluster 3 (typepagina's). In de volledige site krijgt elk type een
// eigen pagina; in deze preview staan ze als secties op de pillar.
const TYPES = [
  {
    naam: 'Onderhoudsschilder',
    zoek: '~60/mnd',
    salaris: '€2.500 – €3.200 bruto p/m',
    tekst:
      'De ruggengraat van planmatig vastgoedonderhoud: buiten- en binnenwerk in series, conditiegericht werken en netjes communiceren met bewoners.',
  },
  {
    naam: 'Industrieel schilder',
    zoek: '~110/mnd',
    salaris: '€2.800 – €3.600 bruto p/m',
    tekst:
      'Conservering van staal en industriële installaties: stralen, systemen opbouwen volgens spec, laagdiktes meten en vastleggen.',
  },
  {
    naam: 'Allround schilder',
    zoek: '~90/mnd',
    salaris: '€2.600 – €3.400 bruto p/m',
    tekst:
      'Breed inzetbaar op binnen- én buitenwerk, van mutatie-onderhoud tot renovatieprojecten. De meest gevraagde kracht in ons netwerk.',
  },
  {
    naam: 'Leerling schilder (BBL)',
    zoek: '~300/mnd',
    salaris: 'cao-leerlingsalaris',
    tekst:
      'Werken en leren tegelijk: vier dagen in een vast team met een leermeester, één dag school. De start van het vak.',
  },
  {
    naam: 'ZZP schilder',
    zoek: '~70/mnd',
    salaris: 'marktconform uurtarief',
    tekst:
      'Structurele opdrachten in plaats van losse klusjes: doorlopende projecten bij goede opdrachtgevers, met duidelijke afspraken.',
  },
  {
    naam: 'Gevelschilder',
    zoek: 'volgt',
    salaris: '€2.600 – €3.400 bruto p/m',
    tekst:
      'Specialist in buitengevels: voorbehandeling, houtrotherstel en verfsystemen die tegen het noordelijke klimaat kunnen.',
  },
  {
    naam: 'Spuiter',
    zoek: 'volgt',
    salaris: '€2.700 – €3.500 bruto p/m',
    tekst:
      'Airless en airmix spuitwerk voor strakke, snelle afwerking — in de bouw, industrie en op projectbasis.',
  },
];

export default function SoortenSchilders() {
  return (
    <>
      <div className="container kruimel">
        <Link href="/">Home</Link> › Soorten schilders
      </div>

      <section className="paginakop container">
        <span className="kicker">Specialisaties</span>
        <h1>Soorten schilders</h1>
        <p className="lead">
          Schilder is geen eenheidsworst: elk specialisme vraagt eigen vakkennis. Als
          opdrachtgever huurt u precies het juiste type in; als schilder zie je waar
          jouw vak naartoe kan groeien. Salarisindicaties zijn marktconform
          (definitieve ranges volgen bij livegang).
        </p>
      </section>

      <section className="sectie">
        <div className="container grid grid--2">
          {TYPES.map((t) => (
            <div key={t.naam} className="kaartje">
              <h3>{t.naam}</h3>
              <p className="meta">
                Zoekvolume {t.zoek} · Salarisindicatie: <strong>{t.salaris}</strong>{' '}
                <em>(indicatie)</em>
              </p>
              <p>{t.tekst}</p>
              <p style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                <Link href="/aanvraag" style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
                  Inhuren →
                </Link>
                <Link href="/vacatures" style={{ color: 'var(--oranje-donker)', fontWeight: 700 }}>
                  Vacatures →
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: 24 }}>Het juiste specialisme op de juiste klus</h2>
            <p className="lead">Wij matchen op vakmanschap — niet op wie er toevallig vrij is.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/aanvraag" className="btn btn--primair">Schilders aanvragen</Link>
            <Link href="/vacatures" className="btn btn--secundair">Bekijk vacatures</Link>
          </div>
        </div>
      </section>
    </>
  );
}
