// Generieke ATS-adapter (Pad A — kennisbank + projects/vacaturesysteem.md).
// De site leest vacatures via één interface; welke bron eronder hangt maakt voor geen
// enkele pagina uit.
//
// Interface:
//   getVacatures()            → [{ slug, titel, type, plaats, lat, lng, dienstverband,
//                                  uren, salarisIndicatie, beschrijving, beschrijvingHtml,
//                                  datePosted, validThrough, demo, … }]
//   submitSollicitatie(input) → { ok, message }

import { CITIES, haversineKm, resolvePlace } from './geo';

const cityBySlug = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

// ---------------------------------------------------------------------------
// UITZENDPLAATS-ADAPTER — de echte koppeling met André's ATS (FlexSoftware
// "Uitzendplaats"), gemeten en aangesloten 07-08-2026.
//
// ⚑ HOE DE ROUTE GEVONDEN IS, zodat een volgende bouwer 'm niet opnieuw hoeft te zoeken:
//   de WordPress-plugin `wordpress-plugin-uitzendplaats` op deflexschilder.nl draagt de
//   koppeling al (wp-admin → Uitzendplaats → Instellingen: `uzp-api-url` + `uzp-token`).
//   Er hoefde dus géén key bij FlexSoftware aangevraagd te worden — de sleutel die André
//   22-07 gaf (zijn WP-login) gaf toegang tot de sleutel die er al was.
//
// DE API — v3, REST/JSON, `Authorization: Bearer <token>`:
//   GET  {base}/v3/company/{uuid}/vacancies?include=…&per_page=&page=   → lijst (paginated)
//   GET  {base}/v3/company/{uuid}/vacancies/{id}?include=…              → detail
//   POST {base}/v3/company/{uuid}/vacancies/{id}/apply                  → sollicitatie TERUG
//   GET  {base}/v3/education · /v3/branches · /v3/licenses · /v3/employment/types
//   Het `apply`-endpoint is bewust NIET aangesloten in deze stap: dat is build_step
//   `sollicitatie-terugkoppeling`, met z'n eigen rij. Hier staat alleen dat 'ie BESTAAT —
//   dat was tot vandaag een open vraag in projects/vacaturesysteem.md §Verificatie-checklist.
//
// FALLBACK ZONDER SLEUTEL (gemeten, niet gebruikt): de plugin publiceert dezelfde
//   vacatures ook als publieke feed op deflexschilder.nl — /xmlvacancies (rijkst),
//   /rssvacancies, /indeedvacancies. Bruikbaar als de token ooit wegvalt, maar die feed
//   verdwijnt zodra de nieuwe site het domein overneemt. Daarom is de API de bron.
// ---------------------------------------------------------------------------
const UZP_INCLUDE = 'recruiter-profile,licenses,client,company';

class UitzendplaatsAdapter {
  constructor({ apiKey, baseUrl, companyUuid }) {
    this.token = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.companyUuid = companyUuid;
  }

  async _haal(page) {
    const q = new URLSearchParams({ include: UZP_INCLUDE, per_page: '100', page: String(page) });
    const res = await fetch(
      `${this.baseUrl}/v3/company/${this.companyUuid}/vacancies?${q}`,
      {
        headers: { Authorization: `Bearer ${this.token}`, accept: 'application/json' },
        next: { revalidate: 300 }, // zelfde venster als de eigen-invoer-bron; de cron/webhook
        //                            uit build_step `cron-revalidatie-webhook` komt hier bovenop.
      }
    );
    if (!res.ok) throw new Error(`Uitzendplaats-fetch mislukt: ${res.status}`);
    return res.json();
  }

  async getVacatures() {
    const eerste = await this._haal(1);
    const rijen = [...(eerste.data || [])];
    const laatste = eerste.meta?.last_page || 1;
    for (let p = 2; p <= laatste; p++) {
      const volgende = await this._haal(p);
      rijen.push(...(volgende.data || []));
    }
    // `is_open: false` = gesloten in het ATS. Die hoort niet op de site: een bezoeker die
    // solliciteert op een dichte vacature krijgt geen antwoord, en Google straft een
    // JobPosting af die blijft staan nadat 'ie vervuld is.
    return dedupeSlugs(rijen.filter((r) => r.is_open !== false).map(mapUitzendplaats));
  }

  async submitSollicitatie() {
    // Bewust niet aangesloten — zie build_step `sollicitatie-terugkoppeling`. Het endpoint
    // bestaat (POST …/vacancies/{id}/apply); het aansluiten ervan is een eigen stap, want er
    // hangen een AVG-tekst en een privacy-gate aan (bouw_privacyverklaring.py §ATS_ONTVANGER).
    return {
      ok: false,
      message:
        'Het sollicitatieformulier wordt in de volgende stap aangesloten op het vacaturesysteem.',
    };
  }
}

// ── Veldmapping ATS → site ────────────────────────────────────────────────────────────────
// Gemeten op de échte v3-respons van 07-08 (2 open vacatures), niet op documentatie:
// FlexSoftware publiceert die niet. De namen links zijn de velden die de pagina's al lezen.
const EMPLOYMENT_TYPE = {
  et1: 'FULL_TIME', // Loondienst
  et2: 'INTERN', // Stage
  et3: 'CONTRACTOR', // ZZP
  et4: 'TEMPORARY', // Tijdelijk
  et5: 'TEMPORARY', // Seizoenswerk
  et6: 'PER_DIEM', // Nul Uren
};

function mapUitzendplaats(row) {
  const plaats = row.nationwide ? 'Heel Nederland' : row.city || '';
  const dienstverband = row.employment_type?.data?.name || '';
  const code = row.employment_type?.data?.code;
  const urenMax = getal(row.hours_max);
  const urenMin = getal(row.hours_min);

  // Contractvorm uit het ATS; alleen FULL_TIME wordt op de úren gecorrigeerd, want dat is
  // het enige geval waar de vorm niets over de omvang zegt. Niets verzinnen: staan er geen
  // uren, dan blijft de ATS-waarde staan.
  let schemaType = EMPLOYMENT_TYPE[code] || 'OTHER';
  if (schemaType === 'FULL_TIME' && urenMax != null && urenMax < 32) schemaType = 'PART_TIME';

  return {
    slug: slugify(`${row.title}-${plaats}`) || `vacature-${row.id}`,
    atsId: row.id,
    refno: row.refno ? String(row.refno) : null,
    titel: row.title || '',
    type: row.branches?.data?.[0]?.name || row.title || '',
    plaats,
    // Scenario (a) uit de beslis-ladder (§🪜): het ATS lévert coördinaten, dus de
    // radius-logica leest ze 1-op-1 mee en er hoeft niets gegeocodeerd te worden.
    // Ontbreken ze tóch, dan valt 'ie terug op de plaatsnaam via lib/geo (scenario b).
    ...coordinaten(row, plaats),
    dienstverband,
    uren: urenLabel(urenMin, urenMax),
    salarisIndicatie: salarisLabel(row),
    beschrijving: platteTekst(row.description || row.description_html || ''),
    beschrijvingHtml: veiligeHtml(row.description_html || ''),
    opleiding: (row.education?.data || []).map((e) => e.name).join(', '),
    rijbewijzen: (row.licenses?.data || []).map((l) => l.name),
    postcode: row.zip ? row.zip.toUpperCase() : null,
    straat: row.street || null,
    regio: row.region || null,
    land: row.country_code || 'NL',
    schemaEmploymentType: schemaType,
    datePosted: datum(row.created_at),
    validThrough: datum(row.valid_through),
    demo: false,
  };
}

function coordinaten(row, plaats) {
  const lat = getal(row.latitude);
  const lng = getal(row.longitude);
  if (lat != null && lng != null) return { lat, lng };
  const res = resolvePlace(plaats);
  const punt = res ? (res.type === 'city' ? res.city : res.place) : null;
  return { lat: punt ? punt.lat : null, lng: punt ? punt.lng : null };
}

// Uitzendplaats levert getallen als NL-string ("40,0" · "53.21048000"). Zonder deze
// normalisatie wordt `Number("40,0")` NaN en verdwijnt de vacature stil uit de radius-filter.
function getal(v) {
  if (v == null || v === '') return null;
  const n = Number(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function urenLabel(min, max) {
  if (min != null && max != null && min !== max) return `${afgerond(min)}–${afgerond(max)} uur`;
  const een = max ?? min;
  return een != null ? `${afgerond(een)} uur` : '';
}

const afgerond = (n) => (Number.isInteger(n) ? n : Math.round(n));

// Salaris alleen tonen als het ATS 'm draagt — nooit een indicatie verzinnen (RULE 9).
function salarisLabel(row) {
  const bedrag = row.pay_estimate;
  const periode = row.pay_period?.data?.name;
  if (!bedrag) return '';
  return periode ? `€ ${bedrag} per ${periode}` : `€ ${bedrag}`;
}

function datum(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

// ── Tekst uit het ATS ─────────────────────────────────────────────────────────────────────
// De omschrijving is de tekst van de klant en komt als HTML binnen. We renderen 'm als HTML
// (anders verdwijnen de opsommingen die de vakman juist leest), maar door een allowlist:
// een ATS is een systeem waar meerdere mensen in typen, dus behandel de inhoud als invoer.
const TOEGESTAAN = /^(p|br|ul|ol|li|strong|b|em|i|h3|h4|ul|blockquote)$/i;

function veiligeHtml(html) {
  return String(html)
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (tag, naam) =>
      TOEGESTAAN.test(naam) ? tag.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '') : ''
    )
    .trim();
}

function platteTekst(html) {
  return String(html)
    .replace(/<\s*(br|\/p|\/li|\/h[1-6])\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Twee vacatures met dezelfde functie in dezelfde plaats leveren dezelfde slug. Dan wint niet
// stil de eerste (dat laat de tweede verdwijnen van de site): de tweede krijgt z'n ATS-id
// erachter, zodat de URL uniek is en stabiel blijft zolang de vacature bestaat.
function dedupeSlugs(vacatures) {
  const gezien = new Set();
  return vacatures.map((v) => {
    if (!gezien.has(v.slug)) {
      gezien.add(v.slug);
      return v;
    }
    const uniek = `${v.slug}-${v.atsId}`;
    gezien.add(uniek);
    return { ...v, slug: uniek };
  });
}

// ---------------------------------------------------------------------------
// Demo-adapter — draait alleen nog als er géén ATS-sleutel is (lokaal, of een fork van deze
// repo). Alle rijen zijn gemarkeerd `demo: true` en tonen op de site een demo-label.
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
      return { ...v, plaats: c.name, lat: c.lat, lng: c.lng, beschrijvingHtml: '', demo: true };
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
//   `getAtsAdapter()` de UitzendplaatsAdapter simpelweg teruggeven, dan verdwijnt alles wat
//   André zelf heeft ingetikt STIL van de site. Vandaar de SamengesteldeAdapter hieronder:
//   bronnen stapelen, nooit verdringen. Sinds 07-08 is dat geen theorie meer — de ATS-bron
//   staat áán en de eigen-invoer-bron staat er gewoon naast.
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
    beschrijvingHtml: '',
    datePosted: row.date_posted,
    validThrough: row.valid_through,
    demo: false,
  };
}

// ---------------------------------------------------------------------------
// SamengesteldeAdapter — legt de bronnen op elkaar in plaats van ze te laten
// concurreren. Drie eigenschappen die met opzet zo zijn:
//   ① EEN KAPOTTE BRON HAALT DE SITE NIET NEER. Valt Supabase of het ATS weg, dan tonen we
//      de rest; de vacaturepagina blijft staan i.p.v. dat de hele build faalt.
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

// Het bureau-id waar de vacatures onder hangen. Staat 'ie niet als env-var, dan leest 'ie
// 'm uit de token zelf (`sub`) — dat is precies wat die claim IS, en het scheelt een tweede
// sleutel die uit de pas kan lopen met de eerste (RULE 4). Faalt dat, dan valt de bron weg
// en draait de site verder op z'n andere bronnen i.p.v. te crashen.
function bureauId(token) {
  try {
    const deel = token.split('.')[1];
    const b64 = deel.replace(/-/g, '+').replace(/_/g, '/');
    const json =
      typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('utf8');
    return JSON.parse(json).sub || null;
  } catch {
    return null;
  }
}

export function getAtsAdapter() {
  const apiKey = process.env.FLEXSOFTWARE_API_KEY;
  const baseUrl = process.env.FLEXSOFTWARE_BASE_URL;
  const companyUuid = process.env.FLEXSOFTWARE_COMPANY_UUID || (apiKey ? bureauId(apiKey) : null);
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  // Bron 1 = het ATS (of de demo-set zolang de sleutel ontbreekt).
  const bronnen = [
    apiKey && baseUrl && companyUuid
      ? new UitzendplaatsAdapter({ apiKey, baseUrl, companyUuid })
      : new DemoAdapter(),
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
