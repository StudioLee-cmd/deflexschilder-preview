# De Flexschilder — 50-pagina PREVIEW

Klikbare preview (review-object, **geen definitieve copy**) voor de nieuwe
deflexschilder.nl — onderdeel van de getekende 50-paginadeal (26-06-2026).
Gebouwd door StudioLee. **Noindex** — dit is een preview, niet de live site.

## Wat erin zit
- **Zelfde look als de huidige site** (logo, oranje #FB8500 / #332D2D, font
  Assistant, foto's) — met een betere menu-, hamburger- en footerstructuur.
- **Duidelijke werkgevers/werkzoekenden-splitsing** (SEO): elke intent z'n eigen
  pagina — `/schilders-inhuren/<stad>` (opdrachtgevers) naast
  `/vacatures/schilder-<stad>` (schilders).
- Homepage + 4 cluster-pillars (schilders-inhuren · vacatures ·
  soorten-schilders · vastgoedonderhoud-en-rgs) + over-ons + aanvraag + inschrijven.
- **15 stad-hoofdpagina's** (alleen Noord-NL, Zwolle en noordelijker) ×
  2 intents + klikbare Noord-NL-kaart (alleen het noorden ingekleurd).
- **Zoekbalk met kilometers**: URL volgt de locatie; klein dorp → de
  dichtstbijzijnde grote stad mét km-afstand, en de banner noemt de andere steden
  waar het dorp ook bij hoort. Simpele plaats→stad-data, geen geo-API.
- **Werkgebied per stad** (`lib/geo.js`, de vijf regels bovenaan die file): een
  plaats hoort bij élke stad binnen 20 km (Hasselt bij Zwolle én Kampen), verder
  weg bij de dichtstbijzijnde; vacatures volgen dezelfde regel
  (`vacaturesVoorStad` in `lib/ats.js`). De stadspagina's noemen de plaatsen bij
  naam, nooit een telling; op `/schilders-inhuren/<stad>` opent elke plaats de
  aanvraag met die plaats ingevuld.
- **Allround voorop** (André 27-11): op de home en op elke regio staat de allround
  schilder eerst. De eerste knop in de kop van elke `/schilders-inhuren/<stad>` en het
  eerste pad in de hero van de home zijn "Allround schilder aanvragen" (op het eerste
  scherm); direct daaronder het blok `components/AllroundVoorop.jsx` (ook eerst op elke
  `/vacatures/schilder-<stad>`, en als groep `#allround` op `/vacatures`). Allround
  vacatures staan overal eerst: `isAllround` en `allroundEerst` in `lib/ats.js` (de
  regel leest titel en functie, nooit de branchenaam van het ATS); de soorten in
  `SOORTEN` van `lib/salaris.js`. De gewone aanvraag staat in het menu.
- **Generieke ATS-adapter** (`lib/ats.js`): wire-ready op de FlexSoftware/
  Uitzendplaats-API (key volgt — todo `flexschilder-ats-api-key`); tot die tijd
  demo-vacatures met demo-label. JobPosting-schema op vacaturedetails.

## Draaien
```bash
npm install && npm run dev
```

## Bij livegang
1. `FLEXSOFTWARE_API_KEY` + `FLEXSOFTWARE_BASE_URL` op Vercel zetten en de
   endpoints/veldmapping in `lib/ats.js` invullen.
2. Formulieren aansluiten (aanvraag → André; sollicitatie → ATS terugschrijven).
3. Noindex verwijderen (`next.config.mjs` + `app/layout.jsx`).

## Zelftoetsen
Draai ze na elke wijziging aan steden, plaatsen, vacatures of de volgorde van de
pagina's. Zonder adres toetsen ze de data; met een adres ook elke pagina daar
(lokaal `npm run build && npx next start`, een preview, of de site zelf).
```bash
node scripts/werkgebied-check.mjs [adres]   # steden, plaatsen en vacatures; geen tellingen
node scripts/allround-check.mjs [adres]     # wie allround is, en allround eerst op elke pagina
```
`scripts/lib-laden.mjs` laat ze de echte modules uit `lib/` laden, zonder build.
