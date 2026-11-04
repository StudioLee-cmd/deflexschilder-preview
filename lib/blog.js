// Blog-index (cluster-categorieën uit de kennisbank-blogstructuur).
// Eerste artikel live; de rest van de clusters vult zich in de contentfase.
export const CATEGORIEEN = [
  'Voor opdrachtgevers',
  'Voor schilders',
  'Vakkennis & vastgoedonderhoud',
  'Regio & nieuws',
];

export const ARTIKELEN = [
  {
    slug: 'extra-schilders-nodig-opdracht-omschrijven',
    titel: 'Extra schilders nodig? Zo omschrijf je de opdracht',
    categorie: 'Voor opdrachtgevers',
    excerpt:
      'Schilders inhuren voor een project of je onderhoudsploeg? Met zes punten over het werk, de ervaring, de werkplek en de planning sluit de juiste vakman aan.',
    gepubliceerd: '2026-11-04',
    gepubliceerdLabel: '4 november 2026',
    leestijd: '4 min',
    hero: '/video/julia.jpg',
  },
  {
    slug: 'kilometervergoeding-2026-25-cent',
    titel: 'Kilometervergoeding 2026: van 23 naar 25 cent. Wat betekent dat voor schilders?',
    categorie: 'Voor schilders',
    excerpt:
      'De maximale onbelaste reiskostenvergoeding gaat in 2026 omhoog naar € 0,25 per kilometer, met terugwerkende kracht tot 1 januari. Wat verandert er, wat is het níet (geen verplichting), en wat scheelt het jou als schilder die dagelijks naar wisselende projectlocaties rijdt?',
    gepubliceerd: '2026-07-03',
    gepubliceerdLabel: '3 juli 2026',
    leestijd: '5 min',
    hero: '/img/werk/bus-glasrek.jpg',
  },
];
