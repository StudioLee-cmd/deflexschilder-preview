// Generieke ATS-adapter (Pad A — kennisbank + projects/vacaturesysteem.md).
// De site leest vacatures via één interface; de echte backend (FlexSoftware /
// "Uitzendplaats", API-key volgt — todo flexschilder-ats-api-key) wordt hier
// ingeplugd zonder dat één pagina verandert. Tot die tijd draait de DemoAdapter
// met duidelijk gemarkeerde demo-vacatures.
//
// Interface:
//   getVacatures()            → [{ slug, titel, type, plaats, lat, lng, dienstverband,
//                                  uren, salarisIndicatie, beschrijving, datePosted, validThrough, demo }]
//   submitSollicitatie(input) → { ok, message }

import { CITIES, haversineKm } from './geo';

const cityBySlug = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

// ---------------------------------------------------------------------------
// FlexSoftware-adapter — WIRE-READY STUB.
// Zodra de API-key + docs binnen zijn (todo flexschilder-ats-api-key):
//   1. FLEXSOFTWARE_API_KEY + FLEXSOFTWARE_BASE_URL als env vars op Vercel zetten.
//   2. `endpoints` + `mapVacature()` invullen op de echte veldnamen
//      (functie · locatie · omschrijving · datums — zie vacaturesysteem.md §Pad A).
//   3. Beslis-ladder locatie (vacaturesysteem.md §🪜): levert de API locatie/filter
//      → 1-op-1 meelezen; alleen een platte lijst → geocoden via lib/geo (zit erin).
// ---------------------------------------------------------------------------
class FlexsoftwareAdapter {
  constructor({ apiKey, baseUrl }) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.endpoints = {
      vacatures: '/vacatures', // TODO: echte endpoint uit de FlexSoftware-docs
      solliciteer: '/sollicitaties', // TODO: terugschrijf-route (sollicitatie → ATS)
    };
  }

  async getVacatures() {
    const res = await fetch(`${this.baseUrl}${this.endpoints.vacatures}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
      next: { revalidate: 86400 }, // dagelijkse revalidatie (cron-patroon uit Pad A)
    });
    if (!res.ok) throw new Error(`ATS-fetch mislukt: ${res.status}`);
    const data = await res.json();
    return (Array.isArray(data) ? data : data.vacatures || []).map(mapVacature);
  }

  async submitSollicitatie(input) {
    const res = await fetch(`${this.baseUrl}${this.endpoints.solliciteer}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    return { ok: res.ok, message: res.ok ? 'Sollicitatie doorgestuurd naar het ATS.' : 'Doorsturen mislukt.' };
  }
}

// TODO (bij key): veldmapping ATS → site. Nu 1-op-1 aannames, expliciet gehouden.
function mapVacature(row) {
  return {
    slug: row.slug || String(row.id),
    titel: row.functie || row.titel,
    type: row.type || '',
    plaats: row.locatie || row.plaats,
    lat: row.lat ?? null, // scenario (b): geen coördinaten uit de API → geocoden via lib/geo
    lng: row.lng ?? null,
    dienstverband: row.dienstverband || '',
    uren: row.uren || '',
    salarisIndicatie: row.salaris || '',
    beschrijving: row.omschrijving || '',
    datePosted: row.datum_geplaatst || null,
    validThrough: row.geldig_tot || null,
    demo: false,
  };
}

// ---------------------------------------------------------------------------
// Demo-adapter — draait tot de key er is. Alle rijen zijn gemarkeerd `demo: true`
// en tonen op de site een demo-label (preview = review-object, geen echte data).
// ---------------------------------------------------------------------------
const DEMO_VACATURES = [
  {
    slug: 'allround-schilder-groningen',
    titel: 'Allround schilder',
    type: 'Allround schilder',
    citySlug: 'groningen',
    dienstverband: 'Detachering — langere opdracht',
    uren: '32–40 uur',
    salarisIndicatie: '€2.600 – €3.400 bruto p/m (indicatie)',
    beschrijving:
      'Binnen- en buitenschilderwerk voor een woningcorporatie: mutatie-onderhoud en planmatig werk in series. Je draait mee in een vast team van vakmensen en schakelt rechtstreeks met de voorman.',
    datePosted: '2026-07-01',
    validThrough: '2026-08-15',
  },
  {
    slug: 'onderhoudsschilder-meppel',
    titel: 'Onderhoudsschilder',
    type: 'Onderhoudsschilder',
    citySlug: 'meppel',
    dienstverband: 'Detachering — planmatig onderhoud',
    uren: '40 uur',
    salarisIndicatie: '€2.500 – €3.200 bruto p/m (indicatie)',
    beschrijving:
      'Planmatig buitenonderhoud aan een portefeuille corporatiewoningen in de regio Meppel–Steenwijk. RGS-project: conditiegericht werken, kwaliteit vastleggen, netjes opleveren.',
    datePosted: '2026-06-28',
    validThrough: '2026-08-01',
  },
  {
    slug: 'spuiter-drachten',
    titel: 'Spuiter',
    type: 'Spuiter',
    citySlug: 'drachten',
    dienstverband: 'Detachering — projectbasis',
    uren: '36–40 uur',
    salarisIndicatie: '€2.700 – €3.500 bruto p/m (indicatie)',
    beschrijving:
      'Spuitwerk (airless en airmix) voor een industriële opdrachtgever in Drachten. Ervaring met voorbehandeling en werken volgens spec is een must.',
    datePosted: '2026-06-30',
    validThrough: '2026-08-10',
  },
  {
    slug: 'leerling-schilder-bbl-leeuwarden',
    titel: 'Leerling schilder (BBL)',
    type: 'Leerling schilder',
    citySlug: 'leeuwarden',
    dienstverband: 'BBL — werken en leren',
    uren: '32–40 uur',
    salarisIndicatie: 'cao-leerlingsalaris (indicatie)',
    beschrijving:
      'Leer het vak van echte schilders: vier dagen werken in een vast team, één dag school. Begeleiding door een leermeester met tientallen jaren ervaring.',
    datePosted: '2026-07-02',
    validThrough: '2026-09-01',
  },
  {
    slug: 'industrieel-schilder-emmen',
    titel: 'Industrieel schilder',
    type: 'Industrieel schilder',
    citySlug: 'emmen',
    dienstverband: 'Detachering — langere opdracht',
    uren: '40 uur',
    salarisIndicatie: '€2.800 – €3.600 bruto p/m (indicatie)',
    beschrijving:
      'Conserveringswerk aan staalconstructies bij een industriële opdrachtgever in Emmen. Stralen/voorbehandelen, systemen opbouwen volgens spec, laagdiktes meten en vastleggen.',
    datePosted: '2026-06-25',
    validThrough: '2026-07-31',
  },
  {
    slug: 'gevelschilder-zwolle',
    titel: 'Gevelschilder',
    type: 'Gevelschilder',
    citySlug: 'zwolle',
    dienstverband: 'Detachering — seizoenspiek',
    uren: '36–40 uur',
    salarisIndicatie: '€2.600 – €3.400 bruto p/m (indicatie)',
    beschrijving:
      'Buitenschilderwerk en gevelbehandeling voor een onderhoudsbedrijf in de regio Zwolle–Kampen. Hoogwerker-certificaat is een pre.',
    datePosted: '2026-07-01',
    validThrough: '2026-08-20',
  },
  {
    slug: 'zzp-schilder-heerenveen',
    titel: 'ZZP-schilder (structurele opdrachten)',
    type: 'ZZP schilder',
    citySlug: 'heerenveen',
    dienstverband: 'ZZP — structurele samenwerking',
    uren: 'in overleg',
    salarisIndicatie: 'marktconform uurtarief (indicatie)',
    beschrijving:
      'Voor meerdere opdrachtgevers in Midden-Friesland zoeken we zzp-schilders die structureel werk willen — geen losse klusjes, maar doorlopende projecten met duidelijke afspraken.',
    datePosted: '2026-06-29',
    validThrough: '2026-08-31',
  },
  {
    slug: 'onderhoudsschilder-winschoten',
    titel: 'Onderhoudsschilder',
    type: 'Onderhoudsschilder',
    citySlug: 'winschoten',
    dienstverband: 'Detachering — planmatig onderhoud',
    uren: '40 uur',
    salarisIndicatie: '€2.500 – €3.200 bruto p/m (indicatie)',
    beschrijving:
      'Planmatig onderhoud aan corporatiebezit in Oost-Groningen. Zelfstandig kunnen werken en netjes communiceren met bewoners is hier net zo belangrijk als de kwast.',
    datePosted: '2026-06-27',
    validThrough: '2026-08-05',
  },
];

class DemoAdapter {
  async getVacatures() {
    return DEMO_VACATURES.map((v) => {
      const c = cityBySlug[v.citySlug];
      return { ...v, plaats: c.name, lat: c.lat, lng: c.lng, demo: true };
    });
  }

  async submitSollicitatie() {
    return {
      ok: false,
      message:
        'Preview: het sollicitatieformulier wordt bij livegang aangesloten op het vacaturesysteem (ATS).',
    };
  }
}

export function getAtsAdapter() {
  const apiKey = process.env.FLEXSOFTWARE_API_KEY;
  const baseUrl = process.env.FLEXSOFTWARE_BASE_URL;
  if (apiKey && baseUrl) return new FlexsoftwareAdapter({ apiKey, baseUrl });
  return new DemoAdapter();
}

// Vacatures binnen een straal rond een punt (stadspagina's / radius-zoek).
export function vacaturesBinnenStraal(vacatures, point, straalKm) {
  return vacatures
    .map((v) => ({
      ...v,
      afstandKm:
        v.lat != null && v.lng != null
          ? Math.round(haversineKm(point, { lat: v.lat, lng: v.lng }))
          : null,
    }))
    .filter((v) => v.afstandKm != null && v.afstandKm <= straalKm)
    .sort((a, b) => a.afstandKm - b.afstandKm);
}
