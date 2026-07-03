// Eén bron voor de salaris-indicaties per soort schilder (RULE 3-patroon):
// gebruikt door /soorten-schilders, de salarischecker en de vacature-templates.
// Marktconforme indicaties — definitieve ranges volgen bij livegang.
export const SCHILDER_TYPES = [
  {
    naam: 'Onderhoudsschilder',
    zoek: '~60/mnd',
    min: 2500,
    max: 3200,
    tekst:
      'De ruggengraat van planmatig vastgoedonderhoud: buiten- en binnenwerk in series, conditiegericht werken en netjes communiceren met bewoners.',
  },
  {
    naam: 'Industrieel schilder',
    zoek: '~110/mnd',
    min: 2800,
    max: 3600,
    tekst:
      'Conservering van staal en industriële installaties: stralen, systemen opbouwen volgens spec, laagdiktes meten en vastleggen.',
  },
  {
    naam: 'Allround schilder',
    zoek: '~90/mnd',
    min: 2600,
    max: 3400,
    tekst:
      'Breed inzetbaar op binnen- én buitenwerk, van mutatie-onderhoud tot renovatie. De meest gevraagde kracht in ons netwerk.',
  },
  {
    naam: 'Leerling schilder (BBL)',
    zoek: '~300/mnd',
    min: null,
    max: null,
    salaris: 'cao-leerlingsalaris',
    tekst:
      'Werken en leren tegelijk: vier dagen in een vast team met een leermeester, één dag school. De start van het vak.',
  },
  {
    naam: 'ZZP schilder',
    zoek: '~70/mnd',
    min: null,
    max: null,
    salaris: 'marktconform uurtarief',
    tekst:
      'Structurele opdrachten in plaats van losse klusjes: doorlopende projecten bij goede opdrachtgevers, met duidelijke afspraken.',
  },
  {
    naam: 'Gevelschilder',
    zoek: 'tracking volgt',
    min: 2600,
    max: 3400,
    tekst:
      'Specialist in buitengevels: voorbehandeling, houtrotherstel en verfsystemen die tegen het noordelijke klimaat kunnen.',
  },
  {
    naam: 'Spuiter',
    zoek: 'tracking volgt',
    min: 2700,
    max: 3500,
    tekst:
      'Airless en airmix spuitwerk voor strakke, snelle afwerking — in de bouw, industrie en op projectbasis.',
  },
];

// Vuistregel maandloon ⇄ uurloon bij voltijd (40 u/wk ≈ 173,3 u/mnd).
export const UREN_PER_MAAND = 173.33;
