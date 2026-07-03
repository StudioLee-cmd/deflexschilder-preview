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
- **Zoekbalk met kilometers** (10/20 km, default 20): URL volgt de locatie;
  klein dorp → dichtstbijzijnde grote stad mét km-afstand zichtbaar
  ("Wolvega → Heerenveen · 12 km"). Simpele plaats→stad-mapping, geen geo-API.
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
