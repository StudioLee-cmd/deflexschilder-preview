'use client';

import { useState } from 'react';

// Rekentool-template: wat scheelt €0,23 → €0,25 per km jou per maand/jaar?
// (Interactief widget-voorbeeld voor André — zo kunnen berekeningen op de site werken.)
const OUD = 0.23;
const NIEUW = 0.25;
const WERKWEKEN_PER_JAAR = 46; // indicatie: 52 minus vakantie/feestdagen

export default function KmCalculator() {
  const [kmEnkel, setKmEnkel] = useState(25);
  const [dagen, setDagen] = useState(5);

  const kmPerWeek = kmEnkel * 2 * dagen;
  const jaarOud = kmPerWeek * WERKWEKEN_PER_JAAR * OUD;
  const jaarNieuw = kmPerWeek * WERKWEKEN_PER_JAAR * NIEUW;
  const eur = (n) =>
    n.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  return (
    <div className="reken">
      <strong style={{ color: 'var(--ink)' }}>
        Rekenvoorbeeld: wat scheelt het jou per jaar?
      </strong>
      <div className="reken__velden">
        <div className="reken__veld">
          <label>
            Kilometers enkele reis naar het werk
            <input
              type="number"
              min="0"
              max="200"
              value={kmEnkel}
              onChange={(e) => setKmEnkel(Math.max(0, Number(e.target.value)))}
            />
          </label>
        </div>
        <div className="reken__veld">
          <label>
            Werkdagen per week
            <input
              type="number"
              min="1"
              max="6"
              value={dagen}
              onChange={(e) => setDagen(Math.min(6, Math.max(1, Number(e.target.value))))}
            />
          </label>
        </div>
      </div>
      <div className="reken__uitkomsten">
        <div className="reken__tegel">
          <div className="label">Bij € 0,23 per km</div>
          <div className="bedrag">{eur(jaarOud)}</div>
          <div className="label">per jaar</div>
        </div>
        <div className="reken__tegel">
          <div className="label">Bij € 0,25 per km</div>
          <div className="bedrag">{eur(jaarNieuw)}</div>
          <div className="label">per jaar</div>
        </div>
        <div className="reken__tegel reken__tegel--accent">
          <div className="label">Verschil</div>
          <div className="bedrag">+{eur(jaarNieuw - jaarOud)}</div>
          <div className="label">onbelast per jaar</div>
        </div>
      </div>
      <p className="reken__noot">
        Indicatie op basis van {WERKWEKEN_PER_JAAR} werkweken en de maximale onbelaste
        vergoeding. Wat jij daadwerkelijk krijgt hangt af van de regeling van je
        werkgever of je cao.
      </p>
    </div>
  );
}
