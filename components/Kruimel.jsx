import Link from 'next/link';
import { BASIS } from '@/lib/schema';

// ⚑ Geen eigen BASIS-constante hier. Tot 08-08 stond het domein in dit bestand een tweede
//   keer hardcoded, en die kopie zou op de livegang-dag op de preview-URL zijn blijven
//   staan: de env-var verhuist lib/schema.js, niet een handkopie ernaast. Elke
//   BreadcrumbList op de site zou dan naar een ander domein wijzen dan de canonical op
//   diezelfde pagina. Eén bron, geïmporteerd (RULE 3).

// Zichtbare breadcrumbs + BreadcrumbList-schema (E-E-A-T/SEO-basis, op elke pagina).
// items = [{ naam, href }] — de laatste is de huidige pagina (geen link).
export default function Kruimel({ items }) {
  const alle = [{ naam: 'Home', href: '/' }, ...items];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: alle.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.naam,
      ...(it.href ? { item: `${BASIS}${it.href}` } : {}),
    })),
  };

  return (
    <nav className="container kruimel" aria-label="Kruimelpad">
      <ol>
        {alle.map((it, i) =>
          i < alle.length - 1 ? (
            <li key={i}>
              <Link href={it.href}>{it.naam}</Link>
            </li>
          ) : (
            <li key={i} aria-current="page">
              {it.naam}
            </li>
          )
        )}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}
