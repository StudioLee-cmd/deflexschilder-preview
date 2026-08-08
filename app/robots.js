import { BASIS } from '@/lib/schema';

// SLOT 1 VAN 3 — het robots.txt-slot. De drie sloten (dit + de X-Robots-Tag-header in
// next.config.mjs + de robots-meta in app/layout.jsx) hangen sinds vandaag alle drie aan
// DEZELFDE schakelaar: de env-var NEXT_PUBLIC_INDEXEERBAAR. Dat is het hele punt — ze zijn
// driedubbel gezet omdat één vergeten plek de hele site uit de index houdt, en dus mogen ze
// ook maar op één manier open kunnen.
//
// Zolang de vlag niet op '1' staat blijft de preview op disallow: een tweede vindbare kopie
// van de site zou het echte domein beconcurreren met een dubbele van zichzelf — precies de
// dubbele-content-situatie naast Andrés bestaande WordPress-site die we willen vermijden.
// Op de livegang-dag zet `livegang_klantsite.py deflexschilder --live` de vlag op '1' en doet
// een productie-redeploy (NEXT_PUBLIC_* wordt bij de build ingebakken).
const indexeerbaar = process.env.NEXT_PUBLIC_INDEXEERBAAR === '1';

export default function robots() {
  return {
    rules: indexeerbaar
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    // De Sitemap-regel staat er in BEIDE toestanden, ook bij disallow. Dat is bewust en
    // wijkt af van alirijles: daar is 'ie conditioneel. Deze preview serveert 'm vandaag
    // (gemeten op /robots.txt), en de opdracht is dat de site zich zonder de env-vars exact
    // gedraagt zoals nu. Een sitemap-verwijzing onder een Disallow doet niets — een crawler
    // die de site niet mag lezen, leest de sitemap ook niet.
    sitemap: `${BASIS}/sitemap.xml`,
  };
}
