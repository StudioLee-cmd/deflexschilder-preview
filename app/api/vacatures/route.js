import { NextResponse } from 'next/server';
import { getAtsAdapter } from '@/lib/ats';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * De vacaturelijst als JSON, voor de vacature-alert-rail op n8n.
 *
 * ⚑ WAAROM DE RAIL HIER LEEST EN NIET ZELF BIJ HET ATS — dit is de hele reden dat deze route
 *   bestaat. n8n zou de Uitzendplaats-API ook rechtstreeks kunnen bevragen, maar dan moet 'ie de
 *   veldmapping, de radius-logica, de `is_open`-filter, de slug-vorming én de tweede bron (de
 *   vacatures die André zelf instuurt via /vacature-opgeven → Supabase) NOG een keer bevatten. Dat
 *   is een tweede kopie van "wat staat er op deze site", en die loopt stil uit de pas: de alert
 *   mailt dan over een vacature met een slug die op de site niet bestaat, of mist er juist een.
 *   `lib/ats.js` is de ene bron; deze route is z'n uitgang (RULE 3).
 *
 * ⚑ AFGESCHERMD MET EEN GEDEELD GEHEIM, want deze lijst is publiek leesbaar op /vacatures maar
 *   deze VORM is machine-leesbaar en dus goedkoop te scrapen. Zonder sleutel: 404, niet 401 —
 *   een 401 vertelt een scanner dat er iets te halen valt.
 */
export async function GET(request) {
  const verwacht = process.env.VACATURE_FEED_TOKEN || '';
  const gegeven = request.headers.get('x-feed-token') || '';
  if (!verwacht || gegeven !== verwacht) {
    return new NextResponse('Not found', { status: 404 });
  }

  const vacatures = await getAtsAdapter().getVacatures();
  return NextResponse.json({
    ok: true,
    aantal: vacatures.length,
    vacatures: vacatures.map((v) => ({
      slug: v.slug,
      titel: v.titel,
      plaats: v.plaats,
      dienstverband: v.dienstverband || null,
      uren: v.uren || null,
    })),
  });
}
