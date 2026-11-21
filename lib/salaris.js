// Eén bron voor de soorten schilders en hun salarisindicatie (RULE 3-patroon):
// gebruikt door /soorten-schilders en de salarischecker.
//
// DE ROLLEN zijn André's eigen lijst (feedback 16-11, "Website aanpassing 16-11 (AvdH).docx"):
// Leerling schilder · Schilder 1 & 2 (beginnende schilder) · Allround schilder ·
// Voorman/teamleider · Industrieel schilder. "Bij glaszetters hetzelfde maar hoeft niet benoemt
// te worden": glaszetters staan daarom niet als eigen rol in de lijst, de pagina noemt het in één zin.
//
// DE BEDRAGEN komen uit de cao SAVG (Schilders-, Afwerkings-, Vastgoedonderhoud- en
// Glaszetbedrijf, 1-11-2025 t/m 31-12-2028), loontabel 2026, bijlage 1/2 (functie → loongroep)
// en bijlage 5 (uurlonen, Staatscourant 2026, 27574). Maandbedrag = uurloon × 162,5
// (37,5 uur per week), afgerond, zoals FNV en salaristabel.nl het omrekenen:
//   Schilder 1           loongroep 2   € 18,18 – € 22,74 p/u   € 2.954 – € 3.695 p/m
//   Schilder 2           loongroep 4   € 20,30 – € 25,37 p/u   € 3.299 – € 4.123 p/m
//   Allround schilder    loongroep 5   € 21,40 – € 26,71 p/u   € 3.478 – € 4.340 p/m
//   Voorman/teamleider   loongroep 6   € 22,57 – € 28,19 p/u   € 3.668 – € 4.581 p/m
//   Industrieel schilder: de cao kent die naam niet; het werk (staal conserveren) is de
//   cao-functie Constructieschilder, loongroep 3: € 19,18 – € 24,00 p/u, € 3.117 – € 3.900 p/m.
//   Leerling (BBL): cao art. 58, eigen leerlingloon per niveau en leeftijd; geen range.
// Per 1-1-2027 stijgen de lonen 3,7%: dan deze tabel bijwerken.
export const CAO_BRON = 'cao SAVG, loontabel 2026';

export const SCHILDER_TYPES = [
  {
    naam: 'Leerling schilder',
    loongroep: null,
    min: null,
    max: null,
    salaris: 'cao-leerlingloon (BBL)',
    tekst:
      'Werken en leren tegelijk: vier dagen op het werk met een ervaren schilder naast je, één dag naar school. De start van het vak, ook als zij-instromer.',
  },
  {
    naam: 'Schilder 1 & 2 (beginnende schilder)',
    loongroep: '2 en 4',
    min: 2954,
    max: 4123,
    tekst:
      'Je papieren op zak en de eerste jaren in het vak. Als Schilder 1 werk je mee in een ploeg, als Schilder 2 neem je zelfstandig binnen- en buitenwerk voor je rekening.',
  },
  {
    naam: 'Allround schilder',
    loongroep: '5',
    min: 3478,
    max: 4340,
    tekst:
      'Breed inzetbaar op binnen- én buitenwerk, van onderhoud tot renovatie, en zelfstandig van voorbehandeling tot afwerking. De meest gevraagde kracht in ons netwerk.',
  },
  {
    naam: 'Voorman/teamleider',
    loongroep: '6',
    min: 3668,
    max: 4581,
    tekst:
      'Je stuurt een ploeg aan op het werk: planning per dag, kwaliteit van het schilderwerk en het contact met de opdrachtgever en de uitvoerder.',
  },
  {
    naam: 'Industrieel schilder',
    loongroep: '3 (constructieschilder)',
    min: 3117,
    max: 3900,
    tekst:
      'Conservering van staal en industriële installaties: stralen, systemen opbouwen volgens spec, laagdiktes meten en vastleggen.',
  },
];

// Cao SAVG: 37,5 uur per week ≈ 162,5 uur per maand (de omrekening van de loontabel).
export const UREN_PER_MAAND = 162.5;
