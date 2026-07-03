'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_PLACE_NAMES, resolvePlace } from '@/lib/geo';

// Locatie-zoeker mét kilometers (10/20 km, default 20) en duidelijke
// werkgevers/werkzoekenden-splitsing. De URL volgt de locatie:
//   opdrachtgever → /schilders-inhuren/<stad>
//   schilder      → /vacatures/schilder-<stad>
// Klein dorp getypt → dichtstbijzijnde grote stad, met de km-afstand zichtbaar.
export default function SearchBar({ mode: initialMode = 'inhuren', compact = false }) {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [plaats, setPlaats] = useState('');
  const [straal, setStraal] = useState('20');
  const [melding, setMelding] = useState('');

  function zoek(e) {
    e.preventDefault();
    const r = resolvePlace(plaats);
    if (!r) {
      setMelding(
        'Deze plaats kennen we (nog) niet in ons werkgebied — kies een stad uit de lijst of op de kaart.'
      );
      return;
    }
    setMelding('');
    const basis =
      mode === 'inhuren'
        ? `/schilders-inhuren/${r.city.slug}`
        : `/vacatures/schilder-${r.city.slug}`;
    if (r.type === 'mapped') {
      const q = new URLSearchParams({
        van: r.place.name,
        km: String(r.km),
        straal,
      });
      router.push(`${basis}?${q.toString()}`);
    } else {
      router.push(`${basis}?straal=${straal}`);
    }
  }

  return (
    <div className="zoek">
      {!compact && (
        <div className="zoek__tabs" role="tablist" aria-label="Ik zoek">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'inhuren'}
            className={`zoek__tab${mode === 'inhuren' ? ' actief' : ''}`}
            onClick={() => setMode('inhuren')}
          >
            Ik zoek schilders
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'werk'}
            className={`zoek__tab${mode === 'werk' ? ' actief' : ''}`}
            onClick={() => setMode('werk')}
          >
            Ik zoek werk
          </button>
        </div>
      )}

      <form className="zoek__rij" onSubmit={zoek}>
        <div className="zoek__veld">
          <label htmlFor="plaats">Plaats in Noord-Nederland</label>
          <input
            id="plaats"
            list="plaatsen"
            placeholder="Bijv. Groningen, Meppel of Wolvega"
            value={plaats}
            onChange={(e) => setPlaats(e.target.value)}
            autoComplete="off"
            required
          />
          <datalist id="plaatsen">
            {ALL_PLACE_NAMES.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>
        </div>

        <div className="zoek__veld">
          <label htmlFor="straal">Straal</label>
          <select id="straal" value={straal} onChange={(e) => setStraal(e.target.value)}>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
        </div>

        <button type="submit" className="btn btn--primair zoek__knop">
          {mode === 'inhuren' ? 'Zoek schilders' : 'Zoek vacatures'}
        </button>
      </form>

      {melding && <p className="zoek__melding">{melding}</p>}
    </div>
  );
}
