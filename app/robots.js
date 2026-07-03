import { BASIS } from '@/lib/schema';

// PREVIEW: alles geblokkeerd (naast de noindex-header/meta — driedubbel slot).
// Bij go-live: rules → { userAgent: '*', allow: '/' } en de noindex weghalen
// (next.config.mjs headers + app/layout.jsx robots) — zie de go-live-checklist
// in het audit-doc.
export default function robots() {
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: `${BASIS}/sitemap.xml`,
  };
}
