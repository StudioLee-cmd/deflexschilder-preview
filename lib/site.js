// ── DE SCHAKELAARS VAN DEZE SITE ───────────────────────────────────────────────────────────────
// Dit bestand draagt bewust ALLEEN schakelaars en géén bedrijfsfeiten. Dat is geen halve
// invulling maar de regel "één bron, nooit twee kopieën": naam, telefoon, mail en adres van De
// Flexschilder staan al in lib/schema.js (ORGANISATIE) en de KvK + NAW in components/SiteFooter.jsx.
// Ze hier nog een derde keer neerzetten maakt een waarde die op drie plekken kan gaan afwijken.
//
// ⚑ GEVOLG DAT JE MOET WETEN VOOR JE `bouw_privacyverklaring.py deflexschilder` DRAAIT (04-08):
//   dat script leest `BEDRIJF.naam` en `PAGINAS` uit DIT bestand en stopt zonder allebei —
//   sinds vandaag met "BEDRIJF.naam niet gelezen uit lib/site.js" i.p.v. een 404 op het bestand.
//   Dat is geen vormfout in dit bestand: deze repo bouwt z'n sitemap in app/sitemap.js uit
//   lib/geo.js en heeft geen PAGINAS-array, en z'n bedrijfsfeiten leven in lib/schema.js. Het
//   script moet die twee bronnen leren kennen; vul hier NIET alsnog een tweede kopie in om 'm
//   stil te krijgen. (Zie de todo die hierover open staat bij de cookie-deur-rij van 04-08.)

// ── Schakelaars die op een BESLISSING wachten, niet op werk ─────────────────────────────────────
// Ze staan hier zodat het aanzetten één regel is en geen zoektocht door de pagina's.
export const FLAGS = {
  // De HighLevel-chatwidget. Staat UIT: deze preview zet vandaag nul cookies — next/font host de
  // letters zelf, er is geen analytics, en de enige externe hosts in de HTML zijn een
  // schema.org-string en een wa.me-link.
  //
  // ⚑ ZET 'M NIET AAN ZONDER DEZE DRIE, in deze volgorde (livegang_klantsite.py bewaakt ze):
  //   ① CHAT_WIDGET_ID hieronder gevuld met de echte HighLevel-widget-id
  //   ② /privacy/ bestaat  — gate ③ weigert een site met formulieren zonder privacyverklaring,
  //      en deze repo heeft er meerdere (AanvraagForm · DemoForm · VacatureOpgeefForm +
  //      app/api/vacature-opgeven/route.js). Bouwen: bouw_privacyverklaring.py — lees eerst de
  //      waarschuwing bovenaan dit bestand.
  //   ③ de cookie-deur staat gemount — dat is components/CookieBanner.jsx, sinds 04-08 in
  //      app/layout.jsx. Gate ④ meet 'm via check_cookie_signaal.py.
  // Chat aan → cookies → banner. Chat uit → geen van beide. De banner hangt aan déze vlag, dus
  // die tegenspraak kan niet ontstaan.
  chatbot: false,
};

// De HighLevel-chatwidget-id. Leeg = geen chat, en dan mount app/layout.jsx de cookie-deur niet:
// de banner zou anders toestemming vragen voor een cookie die niemand zet.
export const CHAT_WIDGET_ID = '';
