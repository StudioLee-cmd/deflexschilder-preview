import { revalidatePath } from 'next/cache';

// Doorgeefluik van het opgeef-formulier naar n8n.
//
// WAAROM DEZE HOP BESTAAT en het formulier niet rechtstreeks naar n8n post:
//   ① GEEN CORS-GEDOE — same-origin, dus geen preflight en geen allowlist die stil breekt.
//   ② DE WEBHOOK-URL BLIJFT UIT DE BROWSER. Stond 'ie in de client-bundle, dan kon
//      iedereen die de pagina ooit opende hem uitlezen en houden.
//   ③ REVALIDATE. Meteen ná het opslaan verversen we de vacature-pagina's, zodat André
//      z'n vacature ECHT ziet als hij op "Bekijk de vacature" tikt — niet pas over 5 min.
//
// ⛔ De code wordt hier gecheckt én in de n8n-flow. Deze check is de snelle; die van n8n
//    is de echte (fail-closed, want de webhook is van buiten bereikbaar).
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const verwacht = process.env.VACATURE_OPGEVEN_CODE || '';
  const webhook = process.env.N8N_VACATURE_WEBHOOK || '';

  if (!verwacht || !webhook) {
    // Config-fout aan onze kant, geen invoerfout van André — zeg dat ook zo.
    return Response.json(
      { ok: false, error: 'De opgeef-route is nog niet helemaal ingesteld. Laat Tim even kijken.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Onleesbare invoer.' }, { status: 400 });
  }

  if (String(body.code || '') !== verwacht) {
    return Response.json(
      { ok: false, error: 'Deze link werkt niet (meer). Vraag Tim om een nieuwe.' },
      { status: 401 }
    );
  }

  let res;
  try {
    res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return Response.json(
      { ok: false, error: 'Het vacaturesysteem is even niet bereikbaar. Probeer het zo nog eens.' },
      { status: 502 }
    );
  }

  const data = await res.json().catch(() => ({
    ok: false,
    error: 'Onverwacht antwoord van het vacaturesysteem.',
  }));

  if (res.ok && data.ok) {
    // Zowel de lijst als de detail- en stadspagina's: een nieuwe vacature verschijnt
    // op meerdere plekken tegelijk (radius-logica), dus één pad verversen is te weinig.
    revalidatePath('/vacatures');
    revalidatePath('/vacatures/[slug]', 'page');
    revalidatePath('/sitemap.xml');
  }

  return Response.json(data, { status: res.status });
}
