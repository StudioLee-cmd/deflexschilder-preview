'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CITIES, PLACES, WERKGEBIED_KM, citiesFor, nearestCity } from '@/lib/geo';
import { TOESTEMMING } from '@/lib/toestemming';

// Zoek-card met twee gezichten (Tim 03-07):
//   • default-tab "Ik zoek werk"  → plaats-zoeker → vacature-lijst van de dichtstbijzijnde stad.
//     Geen afstandskeuze meer (review code 27-11): elke stadspagina toont haar werkgebied, de
//     plaatsen binnen WERKGEBIED_KM (lib/geo.js), dus een gekozen straal veranderde niets.
//   • tab "Ik zoek schilders"     → DIRECT een aanvraagformulier IN de card
//     (geen kies-lijst; plaats met dezelfde dorp→stad-resolutie)
//
// Beide formulieren in deze card posten sinds 08-08 ECHT: de aanvraag naar /api/aanvraag en de
// vacature-alert naar /api/vacature-alert. Tot die dag deden ze allebei `preventDefault()` en
// toonden ze een preview-zin — de zichtbaarste voordeur van de site nam gegevens aan en gooide
// ze weg.
const ALLES = [
  ...CITIES.map((c) => ({ naam: c.name, type: 'stad', city: c, km: 0 })),
  ...PLACES.map((p) => {
    const n = nearestCity(p);
    return { naam: p.name, type: 'dorp', city: n.city, km: n.km, steden: citiesFor(p) };
  }),
].sort((a, b) => a.naam.localeCompare(b.naam, 'nl'));

// Bij welke steden een plaats hoort (lib/geo.js, regels 2 en 3), in gewone taal: binnen
// WERKGEBIED_KM van twee steden staat hij bij allebei; de zoekknop opent de dichtstbijzijnde.
function WerkgebiedZin({ plek }) {
  const [eerste, ...andere] = plek.steden;
  if (eerste.km > WERKGEBIED_KM) {
    return (
      <>
        {plek.naam} ligt verder dan {WERKGEBIED_KM} km van onze steden. Je ziet het werk rond{' '}
        <strong>{eerste.city.name}</strong>, de dichtstbijzijnde ({eerste.km} km).
      </>
    );
  }
  if (andere.length === 0) {
    return (
      <>
        {plek.naam} hoort bij <strong>{eerste.city.name}</strong> ({eerste.km} km).
      </>
    );
  }
  const namen = andere.map((x) => `${x.city.name} (${x.km} km)`);
  const rest = namen.length === 1 ? namen[0] : `${namen.slice(0, -1).join(', ')} en ${namen[namen.length - 1]}`;
  return (
    <>
      {plek.naam} hoort bij <strong>{eerste.city.name}</strong> ({eerste.km} km) en ook bij {rest}. Je
      ziet eerst het werk rond {eerste.city.name}.
    </>
  );
}

function norm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function PlaatsVeld({ q, setQ, onKies, label = 'Plaats' }) {
  const [open, setOpen] = useState(false);
  const [hl, setHl] = useState(0);

  const suggesties = useMemo(() => {
    const nq = norm(q);
    if (nq.length < 2) return [];
    const start = ALLES.filter((p) => norm(p.naam).startsWith(nq));
    const bevat = ALLES.filter((p) => !norm(p.naam).startsWith(nq) && norm(p.naam).includes(nq));
    return [...start, ...bevat].slice(0, 7);
  }, [q]);

  // Staat de plaats er al precies en is hij de enige keuze, dan valt er niets te kiezen: de lijst
  // blijft dicht, zodat hij op de telefoon niet over de zoekknop eronder valt.
  const alGekozen = suggesties.length === 1 && norm(suggesties[0].naam) === norm(q);

  function kies(s) {
    setQ(s.naam);
    setOpen(false);
    onKies?.(s);
  }

  function toets(e) {
    if (!open || suggesties.length === 0 || alGekozen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHl((h) => (h + 1) % suggesties.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHl((h) => (h - 1 + suggesties.length) % suggesties.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      kies(suggesties[hl] || suggesties[0]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="zoek__veld">
      <label htmlFor={`plaats-${label}`}>{label}</label>
      <input
        id={`plaats-${label}`}
        placeholder="Bijv. Groningen, Meppel of Hollandscheveld"
        value={q}
        autoComplete="off"
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setHl(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={toets}
        required
      />
      {open && suggesties.length > 0 && !alGekozen && (
        <div className="zoek__suggesties" role="listbox">
          {suggesties.map((s, i) => (
            <div
              key={s.naam}
              role="option"
              aria-selected={i === hl}
              className={`zoek__suggestie${i === hl ? ' hl' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                kies(s);
              }}
              onMouseEnter={() => setHl(i)}
            >
              <strong>{s.naam}</strong>
              <span className="via">
                {s.type === 'stad' ? `stadspagina · ${s.city.provincie}` : `→ ${s.city.name} · ${s.km} km`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ZoekBalk({ mode: startMode = 'werk', toonTabs = true }) {
  const router = useRouter();
  const [mode, setMode] = useState(startMode);
  const [q, setQ] = useState('');
  const [gekozen, setGekozen] = useState(null);
  const [melding, setMelding] = useState('');
  const [verzonden, setVerzonden] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState(null);
  const [alertBezig, setAlertBezig] = useState(false);
  const [alertFout, setAlertFout] = useState(null);

  const exact = useMemo(() => ALLES.find((p) => norm(p.naam) === norm(q)) || null, [q]);
  const plek = gekozen && norm(gekozen.naam) === norm(q) ? gekozen : exact;

  function zoekWerk(e) {
    e.preventDefault();
    const keuze = plek || ALLES.find((p) => norm(p.naam).startsWith(norm(q)) && norm(q).length >= 3);
    if (!keuze) {
      setMelding(
        'Binnen Noordoost-Nederland werken we overal. Deze plaats staat alleen nog niet in ons lijstje. Kies de dichtstbijzijnde stad op de kaart, of bel ons: 06 - 137 181 72.'
      );
      return;
    }
    setMelding('');
    const basis = `/vacatures/schilder-${keuze.city.slug}`;
    if (keuze.type === 'dorp') {
      const params = new URLSearchParams({ van: keuze.naam, km: String(keuze.km) });
      router.push(`${basis}?${params.toString()}`);
    } else {
      router.push(basis);
    }
  }

  // ⚑ DEZE TWEE HANDLERS DEDEN TOT 08-08 ALLEBEI NIETS. `verstuurAanvraag` was
  //   `e.preventDefault(); setVerzonden(true)` — een preview-melding, geen verzending. Dat is
  //   ernstiger dan hetzelfde gat op /aanvraag, want DIT formulier staat in de zoek-card op de
  //   homepage: het is de eerste voordeur die een opdrachtgever ziet.
  async function verstuurAanvraag(e) {
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
          // De plaats komt uit de dorp→stad-resolutie van PlaatsVeld, niet uit een los tekstveld:
          // dat is precies wat deze card toevoegt boven het formulier op /aanvraag.
          plaats: plek ? plek.naam : q,
          bericht: fd.get('bericht'),
          website: fd.get('website'), // honeypot
          consent_contact: fd.get('consent_contact') === 'on',
          consent_promotie: fd.get('consent_promotie') === 'on',
          consent_versie: TOESTEMMING.versie,
          consent_tekst: { contact: TOESTEMMING.contact, promotie: TOESTEMMING.promotie },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setFout(data.error || 'Er ging iets mis bij het versturen. Probeer het zo nog eens.');
      } else {
        setVerzonden(true);
      }
    } catch {
      setFout('Geen verbinding. Check je internet en probeer het nog eens.');
    } finally {
      setBezig(false);
    }
  }

  // De vacature-alert. Stond hier als de tekst "(volgt bij livegang)" — een belofte aan de
  // bezoeker waar geen enkel mechanisme achter zat.
  async function meldAanVoorAlert(e) {
    e.preventDefault();
    setAlertBezig(true);
    setAlertFout(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/vacature-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: fd.get('email'),
          website: fd.get('website'), // honeypot
          consent_contact: fd.get('alert_consent') === 'on',
          consent_versie: TOESTEMMING.versie,
          consent_tekst: { alert: TOESTEMMING.alert },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setAlertFout(data.error || 'Aanmelden lukte niet. Probeer het zo nog eens.');
      } else {
        router.push('/bedankt-voor-het-registreren');
      }
    } catch {
      setAlertFout('Geen verbinding. Check je internet en probeer het nog eens.');
    } finally {
      setAlertBezig(false);
    }
  }

  return (
    <div className="zoek">
      {toonTabs && (
        <div className="zoek__tabs" role="tablist" aria-label="Ik zoek">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'werk'}
            className={`zoek__tab${mode === 'werk' ? ' actief' : ''}`}
            onClick={() => setMode('werk')}
          >
            Ik zoek werk
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'inhuren'}
            className={`zoek__tab${mode === 'inhuren' ? ' actief' : ''}`}
            onClick={() => setMode('inhuren')}
          >
            Ik zoek schilders
          </button>
        </div>
      )}

      {mode === 'werk' ? (
        <>
          <form className="zoek__rij" onSubmit={zoekWerk}>
            <PlaatsVeld q={q} setQ={setQ} onKies={setGekozen} label="Plaats" />
            <button type="submit" className="btn btn--primair">
              Zoek vacatures
            </button>
          </form>

          {plek && plek.type === 'dorp' ? (
            <p className="zoek__resolutie">
              <WerkgebiedZin plek={plek} />
            </p>
          ) : (
            !melding && (
              <p className="zoek__uitleg">
                Je ziet het werk in de stad en in de plaatsen tot {WERKGEBIED_KM} km eromheen.
              </p>
            )
          )}
          {melding && <p className="zoek__resolutie">{melding}</p>}

          <div className="zoek__onder">
            <span className="zoek__alert">
              <span className="bol" aria-hidden /> Nieuwe vacature in je mailbox?
            </span>
            <Link href="/vacatures" className="tekstlink">
              Alle vacatures
            </Link>
          </div>

          <form className="zoek__form" onSubmit={meldAanVoorAlert} style={{ marginTop: 4 }}>
            <div className="zoek__formgrid">
              <div className="zoek__veld">
                <label htmlFor="alert-email">Je e-mailadres</label>
                <input
                  id="alert-email"
                  name="email"
                  type="email"
                  required
                  placeholder="uw@email.nl"
                  maxLength={160}
                />
              </div>
              <div className="zoek__veld" style={{ alignSelf: 'end' }}>
                <button type="submit" className="btn btn--primair" disabled={alertBezig}>
                  {alertBezig ? 'Aanmelden…' : 'Alerts ontvangen'}
                </button>
              </div>
            </div>

            {/* Spam-val — onzichtbaar voor een bezoeker, ingevuld door een bot. */}
            <div aria-hidden style={{ position: 'absolute', left: '-9999px' }}>
              <label>
                Laat dit veld leeg
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5 }}>
              <input name="alert_consent" type="checkbox" required style={{ marginTop: 3 }} />
              <span>{TOESTEMMING.alert}</span>
            </label>

            {alertFout && (
              <p className="zoek__resolutie" role="alert">
                {alertFout}
              </p>
            )}
          </form>
        </>
      ) : (
        <>
          {/* Opdrachtgever: DIRECT het aanvraagformulier in de card (geen lijst). */}
          <form className="zoek__form" onSubmit={verstuurAanvraag}>
            <div className="zoek__formgrid">
              <div className="zoek__veld">
                <label htmlFor="bedrijf">Bedrijf / organisatie</label>
                <input
                  id="bedrijf"
                  name="onderwerp"
                  placeholder="Naam van uw organisatie"
                  required
                  maxLength={80}
                />
              </div>
              <div className="zoek__veld">
                <label htmlFor="contact">Contactpersoon</label>
                <input id="contact" name="naam" placeholder="Uw naam" required maxLength={120} />
              </div>
              <div className="zoek__veld">
                <label htmlFor="tel">Telefoon</label>
                <input
                  id="tel"
                  name="telefoon"
                  type="tel"
                  placeholder="06 …"
                  required
                  maxLength={40}
                />
              </div>
              <PlaatsVeld q={q} setQ={setQ} onKies={setGekozen} label="Plaats van het werk" />
            </div>
            {plek && plek.type === 'dorp' && (
              <p className="zoek__resolutie">
                {plek.naam}, regio <strong>{plek.city.name}</strong> ({plek.km} km). Wij werken
                in uw omgeving.
              </p>
            )}
            <div className="zoek__veld">
              <label htmlFor="wat">Wat moet er gebeuren?</label>
              <textarea
                id="wat"
                name="bericht"
                rows={3}
                placeholder="Soort werk, aantal schilders, periode…"
                required
                maxLength={2000}
              />
            </div>

            {/* Spam-val — onzichtbaar voor een bezoeker, ingevuld door een bot. */}
            <div aria-hidden style={{ position: 'absolute', left: '-9999px' }}>
              <label>
                Laat dit veld leeg
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {/* ⚑ TOESTEMMING IS DE VOORWAARDE, GEEN BIJLAGE — en de server weigert zonder het
                eerste vinkje, dus dit is geen decoratie maar de enige manier waarop deze card een
                aanvraag door de gate krijgt. Zelfde tekst als /aanvraag en /privacy: één bron. */}
            <label
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, marginTop: 6 }}
            >
              <input name="consent_contact" type="checkbox" required style={{ marginTop: 3 }} />
              <span>{TOESTEMMING.contact}</span>
            </label>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5 }}>
              <input name="consent_promotie" type="checkbox" style={{ marginTop: 3 }} />
              <span>{TOESTEMMING.promotie}</span>
            </label>

            {fout && (
              <p className="zoek__resolutie" role="alert">
                {fout}
              </p>
            )}

            <div className="zoek__onder" style={{ marginTop: 4 }}>
              <button type="submit" className="btn btn--primair" disabled={bezig}>
                {bezig ? 'Versturen…' : 'Verstuur aanvraag'}
              </button>
              <span style={{ fontSize: 13.5 }}>
                Liever bellen? <a href="tel:+31613718172" style={{ fontWeight: 700 }}>06 - 137 181 72</a>
                {' · '}
                <Link href="/aanvraag" className="tekstlink" style={{ fontSize: 13.5 }}>
                  Volledig formulier
                </Link>
              </span>
            </div>
            {verzonden && (
              <p className="zoek__resolutie">
                Uw aanvraag is binnen. We nemen snel persoonlijk contact met u op.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
}
