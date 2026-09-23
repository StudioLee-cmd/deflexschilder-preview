# Temporary contact page

Prepared at Tim's request on 23 September 2026. André's approval to use it on the
public domain is still pending. This page makes no launch-date or outage-duration promise.

## Review and staging

- `/onderhoud` shows the page without changing the rest of the website.
- Contact details derive from `lib/schema.js`; the existing logo is reused.
- It renders without the normal layout, ATS, forms, analytics, external fonts or client JavaScript.
- Use a Vercel **Preview** deployment of this change in the existing project
  `deflexschilder-preview`. Its current production branch is `main`; committing
  there automatically deploys, so preview changes must not be pushed to `main`.
- Previews require the project's existing Vercel authentication. Do not weaken
  project-wide deployment protection to share this page.
- Production/custom domains and DNS remain unchanged during this preparation.

## Enable only if needed and approved

1. Record the current good production deployment and DNS records. Complete client
   approval and the existing `livegang_klantsite.py` preflight first.
2. In an isolated Preview build, set `MAINTENANCE_MODE=1` and redeploy. Check `/`,
   a deep link, an API POST, logo, phone/WhatsApp/email links, and mobile rendering.
   HTML and API responses must be **503** with `Retry-After: 300` and `no-store`.
   The five-minute retry interval is a crawler hint, not a restoration promise.
3. Only if an approved live fallback is needed, use the existing release process
   to build/promote with `MAINTENANCE_MODE=1`. No DNS redirect to `/onderhoud` is needed.
4. To restore the full site, remove the variable (or set `0`), redeploy and verify
   the real domain, forms and deep links. A previously verified production deployment
   can also be restored with Vercel's rollback workflow.

Maintenance mode rejects API requests before they reach the form/ATS handlers.
It also serves 503 for robots/sitemap requests while enabled. An existing redirect
may run before middleware; verify its final destination as well.

## Transfer plan

Keep the old WordPress hosting and working DNS available while testing the Vercel
preview. A registrar transfer, nameserver migration and website cutover are
separate operations. Preserve mail records and verify DNSSEC with the current
provider before initiating the transfer. Switch website records only after the
new deployment, custom-domain/TLS configuration and rollback have been checked.

An hour offline is not an inherent requirement. During DNS propagation some users
can reach the old site and others the new site; both should remain usable. A page
on Vercel cannot help if DNS itself is broken. Use maintenance only when needed,
not for routine testing. Final production-domain checks still happen after cutover.

References:
- https://vercel.com/docs/deployments/environments
- https://vercel.com/docs/instant-rollback
- https://www.hostinger.com/support/8925103-which-nameservers-to-choose-when-transferring-a-domain-to-hostinger/
