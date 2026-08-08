import { NextResponse } from 'next/server';
import { TOESTEMMING } from '@/lib/toestemming';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * De vacature-alert: aanmelden en afmelden.
 *
 * ⚑ WAAROM DEZE LIJST VAN ONS IS EN NIET VAN HET ATS — gemeten 08-08, niet gekozen op smaak.
 *    Uitzendplaats HEEFT een aanmeld-endpoint (`POST /v3/company/{uuid}/vacancy-alerts`; verplicht
 *    zijn `email`, `accept_terms` en `fully_qualified_domain_name`). Dat was de eerste kandidaat:
 *    één lijst, de bestaande abonnees van de oude WordPress-site erbij. Twee metingen maakten er
 *    de verkeerde keuze van:
 *      ① ER IS GEEN UITSCHRIJF-ENDPOINT. `DELETE …/vacancy-alerts` → 405 ("Supported methods:
 *         POST"), `…/vacancy-alerts/unsubscribe` → 404. We zouden dus een lijst aanleggen die we
 *         niet kunnen opzeggen, terwijl een wérkende uitschrijf-route de expliciete eis is en AVG
 *         art. 7(3) 'm hoe dan ook vraagt.
 *      ② HET ZOU DE LIVEGANG BLOKKEREN. Stuurt deze site persoonsgegevens naar Flexsoftware, dan
 *         eist art. 13(1)(f) dat /privacy zegt waar die terechtkomen — en dat feit is onbekend
 *         (hun eigen privacypagina noemt geen land). Gate ③ van livegang_klantsite.py slaat daar
 *         rood op, en de vraag ligt open bij Tim.
 *    n8n en Supabase staan al ALLEBEI als ontvanger op /privacy mét een plek, dus langs deze route
 *    komt er geen ontvanger bij.
 *
 * ⚑ EN DE MAIL LOOPT LANGS N8N, net als de aanvraag-rail: Brevo hanteert een IP-allowlist en
 *    weigert een Vercel-functie met `401 unrecognised IP address`.
 */

const MELD_URL =
  process.env.VACATURE_ALERT_WEBHOOK_URL ||
  'https://n8n.aireclamestudio.nl/webhook/site-vacature-alert';
const CLIENT = 'deflexschilder';

// n8n zit achter Cloudflare en weigert een kale bot-User-Agent met 403.
const UA = 'Mozilla/5.0 (compatible; deflexschilder-site/1.0)';

const kort = (v, n = 300) => {
  if (typeof v !== 'string') return null;
  const s = v.trim().slice(0, n);
  return s || null;
};

async function naarRail(payload) {
  const res = await fetch(MELD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': UA },
    body: JSON.stringify({ ...payload, client_slug: CLIENT }),
  });
  const tekst = await res.text();
  let uit = {};
  try {
    uit = JSON.parse(tekst);
  } catch {
    /* een niet-JSON body telt als mislukt, niet als stil geslaagd */
  }
  return { httpOk: res.ok, uit, tekst };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'ongeldige body' }, { status: 400 });
  }

  // spam-val: een ingevuld honeypot-veld krijgt een nette 200 en gaat nergens heen
  if (kort(body.website)) return NextResponse.json({ ok: true });

  const actie = body.actie === 'afmelden' ? 'afmelden' : 'aanmelden';

  // ── AFMELDEN — op token, want dat is het enige bewijs dat de opzegger dit adres bezit ──
  if (actie === 'afmelden') {
    const token = kort(body.token, 120);
    if (!token) return NextResponse.json({ error: 'geen token' }, { status: 400 });
    try {
      const { httpOk, uit, tekst } = await naarRail({ actie: 'afmelden', token });
      if (!httpOk || uit.ok !== true) {
        console.error('[vacature-alert] afmelden gefaald', tekst);
        return NextResponse.json({ error: 'afmelden lukte niet' }, { status: 502 });
      }
      // `gevonden: false` = het token bestaat niet (of is al opgezegd). Dat is voor de bezoeker
      // geen fout: hij wilde eraf en hij staat er niet meer op.
      return NextResponse.json({ ok: true, gevonden: uit.gevonden === true });
    } catch (err) {
      console.error('[vacature-alert] rail onbereikbaar', err?.message || err);
      return NextResponse.json({ error: 'afmelden lukte niet' }, { status: 502 });
    }
  }

  // ── AANMELDEN ──
  const email = kort(body.email, 160);
  // Bewust dezelfde soepele toets als een browser: de echte controle is dat de bevestigingsmail
  // aankomt. Een strenge regex weigert geldige adressen en bewijst niets.
  if (!email || !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'vul een geldig e-mailadres in' }, { status: 400 });
  }
  if (body.consent_contact !== true) {
    return NextResponse.json({ error: 'toestemming is verplicht' }, { status: 400 });
  }

  try {
    const { httpOk, uit, tekst } = await naarRail({
      actie: 'aanmelden',
      email,
      // Het moment komt van de rail (server), niet van de browser.
      consent_versie: TOESTEMMING.versie,
      consent_tekst: { alert: TOESTEMMING.alert },
    });
    if (!httpOk || uit.ok !== true) {
      console.error('[vacature-alert] aanmelden gefaald', tekst);
      return NextResponse.json({ error: 'aanmelden lukte niet' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, nieuw: uit.nieuw === true });
  } catch (err) {
    console.error('[vacature-alert] rail onbereikbaar', err?.message || err);
    return NextResponse.json({ error: 'aanmelden lukte niet' }, { status: 502 });
  }
}
