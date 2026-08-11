// Centrale schema-graph — alle structured data hangt aan elkaar via @id's:
// WebSite → Organization (EmploymentAgency) → Person (André). Pagina's verwijzen
// naar deze @id's i.p.v. losse kopieën — één bron, overal consistent (schaalbaar
// naar de volle 50 pagina's).
//
// ⚑ BASIS IS DE ENIGE PLEK WAAR HET DOMEIN VAN DEZE SITE STAAT. Alles hangt eraan: elk @id
//   hierboven, `metadataBase` in app/layout.jsx (en daarmee de 17 relatieve canonicals), de
//   sitemap in app/sitemap.js, de breadcrumb-URL's in components/Kruimel.jsx en de
//   Sitemap-regel in app/robots.js. Zet 'm daarom nooit een tweede keer ergens neer —
//   importeer 'm hier vandaan, ook in een component.
//   Op de livegang-dag zet `livegang_klantsite.py deflexschilder --live` de env-var
//   NEXT_PUBLIC_SITE_URL op https://deflexschilder.nl en doet een productie-redeploy; alle
//   bovenstaande verhuizen dan in díe ene build mee, zonder sweep. Staat de env-var niet
//   (elke preview-deploy van vandaag), dan valt 'ie terug op de preview-URL en gedraagt de
//   site zich exact zoals 'ie nu doet. De `.replace` haalt een eventuele slash aan het eind
//   weg, want elke gebruiker hierboven plakt er zelf een pad achter.
export const BASIS = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://deflexschilder-preview.vercel.app'
).replace(/\/$/, '');

export const ORG_ID = `${BASIS}#organisatie`;
export const PERSOON_ID = `${BASIS}/auteur/andre#persoon`;
export const WEBSITE_ID = `${BASIS}#website`;
export const LOGO_ID = `${BASIS}#logo`;

export const LOGO = {
  '@type': 'ImageObject',
  '@id': LOGO_ID,
  url: `${BASIS}/branding_flexschilder.svg`,
  contentUrl: `${BASIS}/branding_flexschilder.svg`,
  caption: 'De Flexschilder',
};

export const ORGANISATIE = {
  '@type': 'EmploymentAgency',
  '@id': ORG_ID,
  name: 'De Flexschilder',
  alternateName: 'De Flexschilder Uitzendbureau',
  description:
    'Specialistische partner voor schilders en vastgoedonderhoud in Noord-Nederland: detachering, uitzenden en werving & selectie. Vakmensen door vakmensen.',
  url: BASIS,
  logo: LOGO,
  image: `${BASIS}/img/hero-steiger.jpg`,
  telephone: '+31613718172',
  email: 'andre@deflexschilder.nl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Oldemarktseweg 74',
    postalCode: '8341 SH',
    addressLocality: 'Steenwijkerwold',
    addressRegion: 'Overijssel',
    addressCountry: 'NL',
  },
  areaServed: [
    { '@type': 'State', name: 'Groningen' },
    { '@type': 'State', name: 'Friesland' },
    { '@type': 'State', name: 'Drenthe' },
    { '@type': 'State', name: 'Overijssel' },
  ],
  founder: { '@id': PERSOON_ID },
  knowsAbout: [
    'schilderwerk',
    'vastgoedonderhoud',
    'resultaatgericht samenwerken (RGS)',
    'detachering van schilders',
    'NEN 2767-conditiemeting',
  ],
  memberOf: { '@type': 'Organization', name: 'ABU (Algemene Bond Uitzendondernemingen)' },
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'SNA-keurmerk (NEN 4400-1)' },
    { '@type': 'EducationalOccupationalCredential', name: 'VCU-certificering' },
  ],
};

export const PERSOON = {
  '@type': 'Person',
  '@id': PERSOON_ID,
  name: 'André van der Hoogen',
  jobTitle: 'Eigenaar & vakschilder',
  worksFor: { '@id': ORG_ID },
  url: `${BASIS}/auteur/andre`,
  telephone: '+31613718172',
  email: 'andre@deflexschilder.nl',
  description:
    '23 jaar technische expertise in verf en onderhoud. Adviseert over verfsystemen, ondergrondbeoordeling, onderhoudscycli, kwaliteitseisen en uitvoeringsrisico’s; sparringpartner voor ondernemers over personeelsbeleid en cao.',
  knowsAbout: [
    'verfsystemen en verftechniek',
    'ondergrondbeoordeling',
    'onderhoudscycli en planmatig onderhoud',
    'resultaatgericht samenwerken (RGS)',
    'NEN 2767-conditiemeting',
    'personeelsbeleid en cao schilders',
  ],
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: BASIS,
  name: 'De Flexschilder',
  inLanguage: 'nl',
  publisher: { '@id': ORG_ID },
};

// De site-brede graph (in layout): één blok, alles gekoppeld.
export const SITE_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [WEBSITE, ORGANISATIE, PERSOON],
};

export function jsonLd(obj) {
  return JSON.stringify(obj);
}
