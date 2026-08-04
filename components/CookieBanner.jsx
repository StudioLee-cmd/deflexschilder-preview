'use client';
import { useState, useEffect } from 'react';
import { FLAGS } from '@/lib/site';

/**
 * DE COOKIE-DEUR — en 'ie hangt aan FLAGS.chatbot, niet aan een eigen schakelaar.
 *
 * WAAROM DIE KOPPELING EN GEEN LOSSE VLAG: deze site zet vandaag NUL cookies — `next/font` host
 * de letters zelf, er is geen analytics, en de enige externe hosts in de HTML zijn een
 * schema.org-string en een wa.me-link. Een banner tonen op een site die niets zet is een leugen
 * in de andere richting, en 'm weglaten zodra de chat aangaat is er een in de eerste. Door 'm aan
 * dezelfde vlag te hangen die de widget aanzet, kan die tegenspraak niet ontstaan:
 * chat aan → cookies → banner. Chat uit → geen cookies → geen banner.
 *
 * DE VOLGORDE IS HET HELE PUNT: de HighLevel-widget laadt PAS na akkoord. Niet laden-en-verbergen,
 * maar niet-laden. Wie 'm bij het renderen al inlaadt heeft de cookie al gezet voordat de bezoeker
 * iets koos, en dan is het vinkje decoratie.
 *
 * ⚑ WAAROM DIT components/CookieBanner.jsx IS EN GEEN KOPIE OP src/components/CookieBanner.tsx
 *   (04-08, gemeten met een echte `npm run build` — niet beredeneerd).
 *   De 17 niche-repo's dragen die .tsx byte-identiek (sha256 49ea0091) en de opdracht was 'm
 *   over te nemen op dát pad. Dat pad breekt hier de build: jsconfig.json mapt `@/*` op `./*`,
 *   dus `@/components/CookieBanner` resolvet naar ./components/ en NOOIT naar ./src/components/.
 *   Gemeten uitkomst van de letterlijke opdracht:
 *       Failed to compile. ./app/layout.jsx
 *       Module not found: Can't resolve '@/components/CookieBanner'
 *   ⚠️ Wat NIET waar is, en wat ik onderweg eerst zelf fout aannam: dat de .tsx-EXTENSIE de build
 *   zou breken omdat typescript hier niet geïnstalleerd staat. Dat doet 'ie niet — SWC strookt de
 *   types gewoon, en Next's typescript-preflight vuurt alleen op een tsconfig.json of op TS-
 *   bestanden binnen app/. Een .tsx in components/ bouwt hier probleemloos. De reden voor .jsx is
 *   dus niet "het kan niet" maar CONVENTIE + VORM: alle 25 componenten hier zijn .jsx, de layout
 *   is app/layout.jsx, en de .tsx draagt de niche-AI-huisstijl (#141419 met StudioLee-groen
 *   #C1FF72) plus een <img src="/images/cookie.png"> terwijl deze repo z'n beelden in public/img/
 *   heeft en op #fb8500/#332d2d staat.
 *   De vorm hieronder is daarom de PORT die het systeem al kent: components/CookieBanner.jsx in
 *   StudioLee-cmd/alirijles, dat exact deze stap eerder zette ("hier geport naar .jsx en naar
 *   Ali's eigen tokens i.p.v. het StudioLee-groen"). Gedrag identiek aan de vloot; alleen de
 *   tokens zijn die van De Flexschilder (app/globals.css: --oranje/--tekst/--lijn/--wit/--radius).
 *
 * ⚑ DE PRIVACY-LINK WIJST NAAR EEN PAGINA DIE ER NOG NIET IS, EN DAT IS BEWUST GEEN BUG.
 *   /privacy/ bestaat vandaag niet (de footer zegt zelf "Privacybeleid (volgt bij livegang)").
 *   Deze banner rendert echter alleen als FLAGS.chatbot AAN staat, en livegang_klantsite.py
 *   gate ③ weigert de livegang van een site met formulieren zónder /privacy/. De link klopt dus
 *   op het moment dat 'ie zichtbaar wordt. Zet je de chat aan vóór die pagina bestaat, dan wijst
 *   'ie naar een 404 — bouw 'm dan eerst: bouw_privacyverklaring.py (zie lib/site.js).
 */

function laadChat(widgetId) {
  if (!widgetId) return;
  if (typeof document === 'undefined') return;
  if (document.querySelector('script[src*="leadconnectorhq"]')) return;
  const s = document.createElement('script');
  s.src = 'https://widgets.leadconnectorhq.com/loader.js';
  s.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
  s.setAttribute('data-widget-id', widgetId);
  document.body.appendChild(s);
}

export default function CookieBanner({ widgetId = '' }) {
  const [toon, setToon] = useState(false);

  useEffect(() => {
    if (!FLAGS.chatbot) return;               // geen chat = geen cookies = geen banner
    const keuze = localStorage.getItem('cookie_consent');
    if (keuze === 'accepted') { laadChat(widgetId); return; }
    if (keuze === 'declined') return;
    setToon(true);
  }, [widgetId]);

  if (!FLAGS.chatbot || !toon) return null;

  const knop = {
    border: 'none', borderRadius: '100px', padding: '9px 20px',
    fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit',
  };

  return (
    <div
      role="dialog"
      aria-label="Cookies voor de chatfunctie"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
        padding: '12px', display: 'flex', justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '560px', width: '100%', background: 'var(--wit)',
          border: '1px solid var(--lijn)', borderRadius: 'var(--radius)',
          padding: '16px 20px', display: 'flex', alignItems: 'center',
          gap: '14px', flexWrap: 'wrap',
          boxShadow: '0 -6px 32px rgba(51, 45, 45, 0.16)',
        }}
      >
        <p style={{ flex: '1 1 240px', color: 'var(--tekst)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
          We gebruiken cookies voor de chat. Meer hierover staat in de{' '}
          <a href="/privacy/" style={{ color: 'var(--oranje)', textDecoration: 'underline' }}>
            privacyverklaring
          </a>
          .
        </p>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => { localStorage.setItem('cookie_consent', 'declined'); setToon(false); }}
            style={{ ...knop, background: 'transparent', color: 'var(--tekst-licht)', border: '1px solid var(--lijn)' }}
          >
            Weigeren
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('cookie_consent', 'accepted');
              setToon(false);
              laadChat(widgetId);
            }}
            style={{ ...knop, background: 'var(--oranje)', color: 'var(--wit)', fontWeight: 700 }}
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
