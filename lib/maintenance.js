import { ORGANISATIE, PERSOON } from './schema';

// Shared by the review route and emergency mode; contact details stay in schema.js.
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const phone = ORGANISATIE.telephone;
const digits = phone.replace(/\D/g, '');
const displayPhone = phone.replace(/^\+31(\d)(\d{3})(\d{3})(\d{2})$/, '0$1 $2 $3 $4');

export const maintenanceHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};

export function maintenancePage() {
  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#fb8500">
  <title>We werken aan onze website | ${escape(ORGANISATIE.name)}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; min-height: 100svh; background: #f6f4f0; color: #332d2d; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; border-top: 6px solid #fb8500; }
    .shell { width: min(100% - 48px, 1080px); margin: auto; }
    header { padding: 36px 0; }
    .logo { display: block; width: 225px; max-width: 75%; height: auto; }
    main { display: grid; grid-template-columns: 1.3fr 1fr; gap: 72px; align-items: center; padding: 64px 0 96px; }
    .label { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 750; letter-spacing: .1em; text-transform: uppercase; }
    .label::before { content: ''; width: 10px; height: 10px; background: #fb8500; border-radius: 2px; }
    h1 { margin: 24px 0; font-size: clamp(36px, 4.8vw, 58px); line-height: 1.08; letter-spacing: -.045em; font-weight: 750; max-width: 12ch; }
    .intro { font-size: 18px; line-height: 1.7; max-width: 38ch; margin: 0; color: #625a54; }
    .contact { padding: 32px; border: 1px solid #e2ded8; border-top: 4px solid #fb8500; border-radius: 8px; background: white; }
    h2 { font-size: 23px; letter-spacing: -.025em; line-height: 1.3; margin: 0 0 8px; }
    .name { color: #625a54; margin: 0 0 24px; line-height: 1.5; }
    a { color: inherit; text-decoration-thickness: 1px; text-underline-offset: 4px; }
    a:focus-visible { outline: 3px solid #332d2d; outline-offset: 5px; }
    .button { display: flex; align-items: center; justify-content: center; min-height: 52px; padding: 13px 16px; border-radius: 6px; font-size: 16px; font-weight: 700; text-decoration: none; text-align: center; transition: background-color .15s; }
    .call { background: #fb8500; border: 1px solid #fb8500; }
    .call:hover { background: #ee7900; }
    .whatsapp { margin-top: 12px; border: 1px solid #d9d2cb; }
    .whatsapp:hover { background: #f6f4f0; }
    .email { text-align: center; margin: 22px 0 0; font-size: 15px; line-height: 1.6; overflow-wrap: anywhere; }
    footer { padding: 24px 0 32px; border-top: 1px solid #ded9d2; color: #625a54; font-size: 13px; line-height: 1.6; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    @media (max-width: 760px) {
      .shell { width: min(100% - 40px, 480px); }
      header { padding: 28px 0; }
      .logo { width: 200px; }
      main { grid-template-columns: 1fr; gap: 32px; padding: 32px 0 48px; }
      h1 { margin: 20px 0; max-width: 13ch; }
      .intro { font-size: 17px; }
      .contact { padding: 26px 22px; }
      footer { display: block; }
      footer span { display: block; margin-bottom: 4px; }
    }
    @media (prefers-reduced-motion: reduce) { .button { transition: none; } }
  </style>
</head>
<body>
  <div class="shell">
    <header><img class="logo" src="/branding_flexschilder.svg" alt="${escape(ORGANISATIE.name)}" width="250" height="72"></header>
    <main>
      <section aria-labelledby="page-title">
        <div class="label">Even aan het werk</div>
        <h1 id="page-title">We werken aan onze website.</h1>
        <p class="intro">Schilders nodig of op zoek naar werk? Je kunt ons gewoon bereiken. Bel, app of mail André, hij helpt je verder.</p>
      </section>
      <section class="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Neem gerust contact op</h2>
        <p class="name">${escape(PERSOON.name)}</p>
        <a class="button call" href="tel:${escape(phone)}">Bel ${escape(displayPhone)}</a>
        <a class="button whatsapp" href="https://wa.me/${escape(digits)}">Stuur een WhatsApp</a>
        <p class="email"><a href="mailto:${escape(ORGANISATIE.email)}">${escape(ORGANISATIE.email)}</a></p>
      </section>
    </main>
    <footer><span>${escape(ORGANISATIE.name)} · Vakmensen door vakmensen</span><span>${escape(ORGANISATIE.address.addressLocality)}</span></footer>
  </div>
</body>
</html>`;
}
