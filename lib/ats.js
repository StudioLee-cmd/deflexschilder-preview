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

import { CITIES, haversineKm, resolvePlace } from './geo';

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
    salarisMin: 2600,
    salarisMax: 3400,
    titel: 'Allround schilder',
    type: 'Allround schilder',
    citySlug: 'groningen',
    dienstverband: 'Detachering — langere opdracht',
    uren: '32–40 uur',
    salarisIndicatie: '€2.600 – €3.400 bruto p/m (indicatie)',
    beschrijving:
      'Binnen- en buitenschilderwerk voor een vastgoedbeheerder: mutatie-onderhoud en planmatig werk in series. Je draait mee in een vast team van vakmensen en schakelt rechtstreeks met de voorman.',
    datePosted: '2026-07-01',
    validThrough: '2026-08-15',
  },
  {
    slug: 'onderhoudsschilder-meppel',
    salarisMin: 2500,
    salarisMax: 3200,
    titel: 'Onderhoudsschilder',
    type: 'Onderhoudsschilder',
    citySlug: 'meppel',
    dienstverband: 'Detachering — planmatig onderhoud',
    uren: '40 uur',
    salarisIndicatie: '€2.500 – €3.200 bruto p/m (indicatie)',
    beschrijving:
      'Planmatig buitenonderhoud aan een portefeuille huurwoningen in de regio Meppel–Steenwijk. RGS-project: conditiegericht werken, kwaliteit vastleggen, netjes opleveren.',
    datePosted: '2026-06-28',
    validThrough: '2026-08-01',
  },
  {
    slug: 'spuiter-drachten',
    salarisMin: 2700,
    salarisMax: 3500,
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
    salarisMin: 2800,
    salarisMax: 3600,
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
    salarisMin: 2600,
    salarisMax: 3400,
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
    salarisMin: 2500,
    salarisMax: 3200,
    titel: 'Onderhoudsschilder',
    type: 'Onderhoudsschilder',
    citySlug: 'winschoten',
    dienstverband: 'Detachering — planmatig onderhoud',
    uren: '40 uur',
    salarisIndicatie: '€2.500 – €3.200 bruto p/m (indicatie)',
    beschrijving:
      'Planmatig onderhoud aan een vastgoedportefeuille in Oost-Groningen. Zelfstandig kunnen werken en netjes communiceren met bewoners is hier net zo belangrijk als de kwast.',
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

// ---------------------------------------------------------------------------
// EIGEN-INVOER-adapter — de vacatures die André ZELF aanlevert vanaf z'n telefoon
// (/vacature-opgeven → n8n /webhook/vacature-opgeven → Supabase client_vacatures).
//
// ⚑ WAAROM DIT EEN TWEEDE BRON IS EN GEEN VERVANGING. Het ATS (FlexSoftware) leest
//   vacatures UIT; deze route voert ze IN. Twee richtingen, één bestemming. Zou
//   `getAtsAdapter()` straks — zodra de API-key er is — simpelweg de FlexsoftwareAdapter
//   teruggeven, dan verdwijnt alles wat André zelf heeft ingetikt STIL van de site.
//   Vandaar de SamengesteldeAdapter hieronder: bronnen stapelen, nooit verdringen.
//
// Leest met de PUBLISHABLE key, niet met een service-key: de RLS-policy op
// client_vacatures geeft alleen `status = 'gepubliceerd'` vrij, en een vacature is
// per definitie publieke content. Zo hoeft er geen schrijf-sleutel op deze site te staan.
// ---------------------------------------------------------------------------
class EigenInvoerAdapter {
  constructor({ url, key, client }) {
    this.url = url.replace(/\/$/, '');
    this.key = key;
    this.client = client;
  }

  async getVacatures() {
    const q = new URLSearchParams({
      client: `eq.${this.client}`,
      status: 'eq.gepubliceerd',
      select: '*',
      order: 'date_posted.desc',
    });
    const res = await fetch(`${this.url}/rest/v1/client_vacatures?${q}`, {
      headers: { apikey: this.key, Authorization: `Bearer ${this.key}` },
      next: { revalidate: 300 }, // ISR: nieuwe vacature is binnen 5 min zichtbaar, óók
      //                            zonder rebuild. De opgeef-route doet daarnaast een
      //                            revalidatePath(), dus in de praktijk staat 'ie er meteen.
    });
    if (!res.ok) throw new Error(`eigen-invoer-fetch mislukt: ${res.status}`);
    return (await res.json()).map(mapEigenVacature);
  }

  async submitSollicitatie() {
    return { ok: false, message: 'Sollicitaties lopen via het vacaturesysteem (ATS).' };
  }
}

// Plaats → coördinaten via de bestaande geo-laag (257 plaatsen). Bewust GEEN tweede
// plaatsenlijst in n8n: dat zou dezelfde waarheid op twee plekken hardcoden (RULE 4).
// Een dorp houdt z'n eigen naam én z'n eigen coördinaten, zodat de radius-filter klopt.
function mapEigenVacature(row) {
  const res = resolvePlace(row.plaats);
  const punt = res ? (res.type === 'city' ? res.city : res.place) : null;
  return {
    slug: row.slug,
    titel: row.titel,
    type: row.functie_type || row.titel,
    plaats: punt ? punt.name : row.plaats,
    lat: punt ? punt.lat : null,
    lng: punt ? punt.lng : null,
    dienstverband: row.dienstverband || '',
    uren: row.uren || '',
    salarisIndicatie: row.salaris_indicatie || '',
    beschrijving: row.beschrijving,
    datePosted: row.date_posted,
    validThrough: row.valid_through,
    demo: false,
  };
}

// ---------------------------------------------------------------------------
// SamengesteldeAdapter — legt de bronnen op elkaar in plaats van ze te laten
// concurreren. Drie eigenschappen die met opzet zo zijn:
//   ① EEN KAPOTTE BRON HAALT DE SITE NIET NEER. Valt Supabase weg, dan tonen we de
//      rest; de vacaturepagina blijft staan i.p.v. dat de hele build faalt.
//   ② ECHTE DATA VERDRINGT DEMO-DATA. Zodra er één echte vacature is, verdwijnen de
//      8 demo-rijen vanzelf — anders staat de eerste échte vacature van André tussen
//      acht verzonnen collega's.
//   ③ DEDUPE OP SLUG, eerste bron wint, zodat dezelfde vacature uit twee bronnen
//      niet dubbel op de pagina komt.
// ---------------------------------------------------------------------------
class SamengesteldeAdapter {
  constructor(bronnen) {
    this.bronnen = bronnen.filter(Boolean);
  }

  async getVacatures() {
    const lijsten = await Promise.all(
      this.bronnen.map(async (bron) => {
        try {
          return await bron.getVacatures();
        } catch (e) {
          // Bewust loggen-en-doorgaan: zie ① hierboven.
          console.error('[ats] bron faalde, overgeslagen:', e.message);
          return [];
        }
      })
    );
    const alle = lijsten.flat();
    const echt = alle.filter((v) => !v.demo);
    const zichtbaar = echt.length > 0 ? echt : alle;

    const perSlug = new Map();
    for (const v of zichtbaar) if (!perSlug.has(v.slug)) perSlug.set(v.slug, v);

    return [...perSlug.values()].sort((a, b) =>
      String(b.datePosted || '').localeCompare(String(a.datePosted || ''))
    );
  }

  async submitSollicitatie(input) {
    return this.bronnen[0].submitSollicitatie(input);
  }
}

export function getAtsAdapter() {
  const apiKey = process.env.FLEXSOFTWARE_API_KEY;
  const baseUrl = process.env.FLEXSOFTWARE_BASE_URL;
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  // Bron 1 = het ATS (of de demo-set zolang de key ontbreekt).
  const bronnen = [
    apiKey && baseUrl ? new FlexsoftwareAdapter({ apiKey, baseUrl }) : new DemoAdapter(),
  ];
  // Bron 2 = wat André zelf instuurt. Ontbreken de env-vars, dan valt deze bron
  // gewoon weg en gedraagt de site zich exact als vóór 04-08 (fail-safe, geen crash).
  if (sbUrl && sbKey) {
    bronnen.push(new EigenInvoerAdapter({ url: sbUrl, key: sbKey, client: 'deflexschilder' }));
  }
  return new SamengesteldeAdapter(bronnen);
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
