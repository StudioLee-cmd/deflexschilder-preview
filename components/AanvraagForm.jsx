'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TOESTEMMING } from '@/lib/toestemming';

// Aanvraagformulier voor opdrachtgevers — de zoekbalk ("Ik zoek schilders") landt hier met de
// plaats voorgevuld. Geen kies-lijst: gewoon invullen.
//
// ⚑ DIT FORMULIER VERSTUURDE TOT 08-08 NIETS. Het rende `DemoForm`, dat op submit
//   `e.preventDefault()` deed en een preview-zin toonde. De velden waren echt, de knop was echt,
//   en er ging niets weg. Nu post 'ie naar `/api/aanvraag` → ledger + meld-rail.
//   `DemoForm` blijft bestaan voor /inschrijven: dát is de KANDIDAAT-kant, die hoort bij build_step
//   `sollicitatie-terugkoppeling` van het vacaturesysteem-project en wordt hier bewust niet
//   meegenomen (RULE 3, niet dubbel boeken).
function FormInner() {
  const params = useSearchParams();
  const plaatsUitUrl = params.get('plaats') || '';
  const stad = params.get('stad') || '';
  const km = params.get('km');

  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState(null);
  const [klaar, setKlaar] = useState(false);

  async function verstuur(e) {
    e.preventDefault();
    setBezig(true);
    setFout(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/aanvraag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          onderwerp: fd.get('onderwerp'),
          naam: fd.get('naam'),
          telefoon: fd.get('telefoon'),
          email: fd.get('email'),
          plaats: fd.get('plaats'),
          bericht: fd.get('bericht'),
          website: fd.get('website'), // honeypot
          consent_contact: fd.get('consent_contact') === 'on',
          consent_promotie: fd.get('consent_promotie') === 'on',
          // Reist mee zodat de server kan zien of deze bezoeker een oudere bundel had; de server
          // houdt z'n eigen tekst aan als record en zet deze er dan naast.
          consent_versie: TOESTEMMING.versie,
          consent_tekst: { contact: TOESTEMMING.contact, promotie: TOESTEMMING.promotie },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setFout(data.error || 'Er ging iets mis bij het versturen. Probeer het zo nog eens.');
      } else {
        setKlaar(true);
      }
    } catch {
      setFout('Geen verbinding. Check je internet en probeer het nog eens.');
    } finally {
      setBezig(false);
    }
  }

  if (klaar) {
    return (
      <div className="kaartje" style={{ padding: 26 }}>
        <h3 style={{ marginTop: 0 }}>Aanvraag ontvangen 👍</h3>
        <p style={{ fontSize: 15.5 }}>
          We hebben uw aanvraag binnen en nemen snel persoonlijk contact met u op. Liever direct?
          Bel{' '}
          <a href="tel:+31613718172" style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>
            06 - 137 181 72
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      {plaatsUitUrl && (
        <div className="resolutie" style={{ maxWidth: 560 }}>
          Aanvraag voor <strong>{plaatsUitUrl}</strong>
          {stad && stad !== plaatsUitUrl ? (
            <>
              {' '}
              — regio <strong>{stad}</strong>
              {km ? ` (${km} km)` : ''}. Wij werken in uw omgeving.
            </>
          ) : (
            <> — wij werken in uw omgeving.</>
          )}
        </div>
      )}

      <form className="formulier" onSubmit={verstuur}>
        <label>
          Bedrijf / organisatie *
          <input name="onderwerp" required placeholder="Naam van uw organisatie" maxLength={80} />
        </label>

        <label>
          Contactpersoon *
          <input name="naam" required placeholder="Uw naam" maxLength={120} />
        </label>

        <label>
          Telefoon *
          <input
            name="telefoon"
            type="tel"
            required
            placeholder="06 …"
            inputMode="tel"
            maxLength={40}
          />
        </label>

        <label>
          E-mail
          <input name="email" type="email" placeholder="naam@bedrijf.nl" maxLength={160} />
        </label>

        <label>
          Plaats van het werk *
          <input
            name="plaats"
            required
            placeholder="Bijv. Groningen"
            defaultValue={plaatsUitUrl}
            maxLength={80}
          />
        </label>

        <label>
          Wat moet er gebeuren? *
          <textarea
            name="bericht"
            rows={4}
            required
            placeholder="Soort werk, aantal schilders, periode…"
            maxLength={2000}
          />
        </label>

        {/* Spam-val: onzichtbaar voor een bezoeker, ingevuld door een bot. Een ingevuld veld krijgt
            een nette 200 en gaat nergens heen — de server dropt 'm en de meld-rail doet dat nog
            eens, want de gegenereerde klantsites posten rechtstreeks. */}
        <div aria-hidden style={{ position: 'absolute', left: '-9999px' }}>
          <label>
            Laat dit veld leeg
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* ⚑ TOESTEMMING IS DE VOORWAARDE, GEEN BIJLAGE. De teksten komen uit lib/toestemming.js —
            dezelfde bron die de server leest en die op /privacy/ staat, zodat er niet drie
            varianten van dezelfde belofte kunnen ontstaan. */}
        <label className="vinkje" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <input name="consent_contact" type="checkbox" required style={{ marginTop: 4 }} />
          <span style={{ fontSize: 14.5, fontWeight: 400 }}>{TOESTEMMING.contact} *</span>
        </label>

        <label className="vinkje" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <input name="consent_promotie" type="checkbox" style={{ marginTop: 4 }} />
          <span style={{ fontSize: 14.5, fontWeight: 400 }}>{TOESTEMMING.promotie}</span>
        </label>

        {fout && (
          <p className="zoek__melding" role="alert">
            {fout}
          </p>
        )}

        <button
          type="submit"
          className="btn btn--primair"
          style={{ justifySelf: 'start' }}
          disabled={bezig}
        >
          {bezig ? 'Versturen…' : 'Verstuur aanvraag'}
        </button>

        <p className="formulier__notitie">
          Uw gegevens gebruiken we alleen om op deze aanvraag te reageren. Zie ons{' '}
          <a href="/privacy">privacybeleid</a>.
        </p>
      </form>
    </div>
  );
}

export default function AanvraagForm() {
  return (
    <Suspense fallback={null}>
      <FormInner />
    </Suspense>
  );
}
