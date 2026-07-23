import { CITIES } from '@/lib/geo';
import { ARTIKELEN } from '@/lib/blog';
import { getAtsAdapter } from '@/lib/ats';
import { BASIS } from '@/lib/schema';

// Sitemap-infra staat klaar voor go-live (nu is de hele preview noindex, dus
// crawlers doen er niets mee — maar de 50-pagina-site erft dit 1-op-1).
export default async function sitemap() {
  const vacatures = await getAtsAdapter().getVacatures();
  const nu = '2026-07-03';

  const statisch = [
    '',
    '/schilders-inhuren',
    '/vacatures',
    '/soorten-schilders',
    '/vastgoedonderhoud-en-rgs',
    '/voor-aannemers',
    '/tools',
    '/blog',
    '/over-ons',
    '/auteur/andre',
    '/aanvraag',
    '/inschrijven',
  ];

  return [
    ...statisch.map((p) => ({ url: `${BASIS}${p}`, lastModified: nu, priority: p === '' ? 1 : 0.8 })),
    ...CITIES.map((c) => ({ url: `${BASIS}/schilders-inhuren/${c.slug}`, lastModified: nu, priority: 0.7 })),
    ...CITIES.map((c) => ({ url: `${BASIS}/vacatures/schilder-${c.slug}`, lastModified: nu, priority: 0.7 })),
    ...vacatures.map((v) => ({ url: `${BASIS}/vacatures/${v.slug}`, lastModified: v.datePosted || nu, priority: 0.6 })),
    ...ARTIKELEN.map((a) => ({ url: `${BASIS}/blog/${a.slug}`, lastModified: a.gepubliceerd, priority: 0.6 })),
  ];
}
