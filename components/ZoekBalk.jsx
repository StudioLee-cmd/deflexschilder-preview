'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CITIES, PLACES, nearestCity } from '@/lib/geo';

// Zoekbalk v2 — look van de live zoek-card (witte overlay-card), functioneel beter:
// • live suggesties met dorp→stad-resolutie IN de lijst ("Wolvega → Heerenveen · 12 km")
// • toetsenbord-navigatie (↑ ↓ Enter Esc) • straal 10/20 km (default 20)
// • URL volgt de locatie per doelgroep-intent (werkgever/werkzoekende gescheiden).
const ALLES = [
  ...CITIES.map((c) => ({ naam: c.name, type: 'stad', city: c, km: 0 })),
  ...PLACES.map((p) => {
    const n = nearestCity(p);
    return { naam: p.name, type: 'dorp', city: n.city, km: n.km };
  }),
].sort((a, b) => a.naam.localeCompare(b.naam, 'nl'));

function norm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// DEFAULT = "Ik zoek werk" (Tim 03-07). De opdrachtgever-kant is GEEN kies-lijst
// maar een aanvraag: die route gaat naar het formulier, met de plaats voorgevuld.
export default function ZoekBalk({ mode: startMode = 'werk', toonTabs = true }) {
  const router = useRouter();
  const [mode, setMode] = useState(startMode);
  const [q, setQ] = useState('');
  const [openLijst, setOpenLijst] = useState(false);
  const [hl, setHl] = useState(0);
  const [melding, setMelding] = useState('');
  const inputRef = useRef(null);

  const suggesties = useMemo(() => {
    const nq = norm(q);
    if (nq.length < 2) return [];
    const start = ALLES.filter((p) => norm(p.naam).startsWith(nq));
    const bevat = ALLES.filter((p) => !norm(p.naam).startsWith(nq) && norm(p.naam).includes(nq));
    return [...start, ...bevat].slice(0, 7);
  }, [q]);

  const exact = useMemo(() => ALLES.find((p) => norm(p.naam) === norm(q)) || null, [q]);

  function ga(plek, straal) {
    if (mode === 'inhuren') {
      // Opdrachtgever → aanvraagFORMULIER met plaats voorgevuld (geen kies-lijst).
      const params = new URLSearchParams({ plaats: plek.naam, stad: plek.city.name });
      if (plek.type === 'dorp') params.set('km', String(plek.km));
      router.push(`/aanvraag?${params.toString()}`);
      return;
    }
    const basis = `/vacatures/schilder-${plek.city.slug}`;
    if (plek.type === 'dorp') {
      const params = new URLSearchParams({ van: plek.naam, km: String(plek.km), straal });
      router.push(`${basis}?${params.toString()}`);
    } else {
      router.push(`${basis}?straal=${straal}`);
    }
  }

  function submit(e) {
    e.preventDefault();
    const straal = e.target.straal?.value || '20';
    const keuze = suggesties[hl] || exact || suggesties[0];
    if (!keuze) {
      setMelding(
        'Binnen Noord-Nederland werken we overal — deze plaats staat alleen nog niet in ons lijstje. Kies de dichtstbijzijnde stad op de kaart, of bel ons: 06 - 137 181 72.'
      );
      return;
    }
    setMelding('');
    ga(keuze, straal);
  }

  function toets(e) {
    if (!openLijst || suggesties.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHl((h) => (h + 1) % suggesties.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHl((h) => (h - 1 + suggesties.length) % suggesties.length);
    } else if (e.key === 'Escape') {
      setOpenLijst(false);
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

      <form className="zoek__rij" onSubmit={submit}>
        <div className="zoek__veld">
          <label htmlFor="plaats">Plaats</label>
          <input
            id="plaats"
            ref={inputRef}
            placeholder="Bijv. Groningen, Meppel of Wolvega"
            value={q}
            autoComplete="off"
            onChange={(e) => {
              setQ(e.target.value);
              setOpenLijst(true);
              setHl(0);
              setMelding('');
            }}
            onFocus={() => setOpenLijst(true)}
            onBlur={() => setTimeout(() => setOpenLijst(false), 150)}
            onKeyDown={toets}
            required
          />
          {openLijst && suggesties.length > 0 && (
            <div className="zoek__suggesties" role="listbox">
              {suggesties.map((s, i) => (
                <div
                  key={s.naam}
                  role="option"
                  aria-selected={i === hl}
                  className={`zoek__suggestie${i === hl ? ' hl' : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const straal = document.getElementById('straal')?.value || '20';
                    ga(s, straal);
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

        <div className="zoek__veld">
          <label htmlFor="straal">Afstand</label>
          <select id="straal" name="straal" defaultValue="20">
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
        </div>

        <button type="submit" className="btn btn--primair">
          {mode === 'inhuren' ? 'Schilders aanvragen' : 'Zoek vacatures'}
        </button>
      </form>

      {exact && exact.type === 'dorp' && (
        <p className="zoek__resolutie">
          {exact.naam} valt onder <strong>{exact.city.name}</strong> — {exact.km} km verderop.
        </p>
      )}
      {melding && <p className="zoek__resolutie">{melding}</p>}

      <div className="zoek__onder">
        <span className="zoek__alert">
          <span className="bol" aria-hidden /> Registreer voor onze vacature-alert!{' '}
          <em style={{ fontWeight: 400 }}>(volgt bij livegang)</em>
        </span>
        {mode === 'inhuren' ? (
          <Link href="/schilders-inhuren" className="tekstlink">
            Alles over schilders inhuren
          </Link>
        ) : (
          <Link href="/vacatures" className="tekstlink">
            Alle vacatures
          </Link>
        )}
      </div>
    </div>
  );
}
