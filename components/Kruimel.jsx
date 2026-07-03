import Link from 'next/link';

const BASIS = 'https://deflexschilder-preview.vercel.app';

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
