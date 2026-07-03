'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SCHILDER_TYPES, UREN_PER_MAAND } from '@/lib/salaris';

// Salarischecker (Randstad-patroon): kies je specialisme → marktconforme range,
// schakelbaar per maand of per uur. Zelfde databron als /soorten-schilders.
export default function SalarisChecker() {
  const metRange = SCHILDER_TYPES.filter((t) => t.min);
  const [keuze, setKeuze] = useState(metRange[2]?.naam || metRange[0].naam);
  const [eenheid, setEenheid] = useState('maand');

  const t = SCHILDER_TYPES.find((x) => x.naam === keuze);
  const eur = (n, dec = 0) =>
    n.toLocaleString('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: dec,
      minimumFractionDigits: dec,
    });
  const toon = (n) => (eenheid === 'maand' ? eur(n) : eur(n / UREN_PER_MAAND, 2));

  return (
    <div className="reken">
      <strong style={{ color: 'var(--ink)' }}>Salarischecker voor schilders</strong>
      <div className="reken__velden">
        <div className="reken__veld">
          <label>
            Jouw specialisme
            <select
              value={keuze}
              onChange={(e) => setKeuze(e.target.value)}
              style={{ fontFamily: 'inherit', fontSize: 16, padding: '10px 12px', border: '1.5px solid #ffd9a8', borderRadius: 6, background: '#fff', width: '100%' }}
            >
              {SCHILDER_TYPES.map((x) => (
                <option key={x.naam} value={x.naam}>
                  {x.naam}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="reken__veld">
          <label>
            Weergave
            <select
              value={eenheid}
              onChange={(e) => setEenheid(e.target.value)}
              style={{ fontFamily: 'inherit', fontSize: 16, padding: '10px 12px', border: '1.5px solid #ffd9a8', borderRadius: 6, background: '#fff', width: '100%' }}
            >
              <option value="maand">per maand (bruto)</option>
              <option value="uur">per uur (bruto, o.b.v. 40 u/wk)</option>
            </select>
          </label>
        </div>
      </div>

      {t.min ? (
        <div className="reken__uitkomsten">
          <div className="reken__tegel">
            <div className="label">Vanaf</div>
            <div className="bedrag">{toon(t.min)}</div>
          </div>
          <div className="reken__tegel reken__tegel--accent">
            <div className="label">Marktconforme range</div>
            <div className="bedrag" style={{ fontSize: 17 }}>
              {toon(t.min)} – {toon(t.max)}
            </div>
          </div>
          <div className="reken__tegel">
            <div className="label">Tot</div>
            <div className="bedrag">{toon(t.max)}</div>
          </div>
        </div>
      ) : (
        <p style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>
          {t.salaris} <em style={{ fontWeight: 400 }}>(indicatie — bespreken we persoonlijk)</em>
        </p>
      )}

      <p className="reken__noot">
        Marktconforme indicatie, afhankelijk van ervaring en project (definitieve
        ranges volgen bij livegang).{' '}
        <Link href="/vacatures" style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>
          Bekijk de vacatures →
        </Link>
      </p>
    </div>
  );
}
