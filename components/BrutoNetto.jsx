'use client';

import { useState } from 'react';

// Bruto→netto-INDICATIE (Randstad-patroon: hun meest gebruikte tool).
// Vereenvoudigd model o.b.v. IB-tarieven/kortingen 2025 (schijven + algemene
// heffingskorting + arbeidskorting, zonder persoonlijke situaties) — bewust
// als indicatie gelabeld; geen rechten te ontlenen.
const SCHIJF1_GRENS = 38441;
const SCHIJF2_GRENS = 76817;
const T1 = 0.3582;
const T2 = 0.3748;
const T3 = 0.495;

function belastingJaar(j) {
  const s1 = Math.min(j, SCHIJF1_GRENS) * T1;
  const s2 = j > SCHIJF1_GRENS ? (Math.min(j, SCHIJF2_GRENS) - SCHIJF1_GRENS) * T2 : 0;
  const s3 = j > SCHIJF2_GRENS ? (j - SCHIJF2_GRENS) * T3 : 0;
  return s1 + s2 + s3;
}

function algemeneHeffingskorting(j) {
  const k = 3068 - 0.06337 * Math.max(0, j - 28406);
  return Math.max(0, Math.min(3068, k));
}

function arbeidskorting(j) {
  let k;
  if (j <= 12169) k = 0.08053 * j;
  else k = 980 + 0.3003 * (j - 12169);
  k = Math.min(5599, k);
  if (j > 43071) k = 5599 - 0.0651 * (j - 43071);
  return Math.max(0, k);
}

export default function BrutoNetto() {
  const [bruto, setBruto] = useState(3000);

  const jaar = bruto * 12;
  const heffing = Math.max(0, belastingJaar(jaar) - algemeneHeffingskorting(jaar) - arbeidskorting(jaar));
  const nettoMaand = (jaar - heffing) / 12;
  const eur = (n) =>
    n.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  return (
    <div className="reken">
      <strong style={{ color: 'var(--ink)' }}>Bruto → netto (indicatie)</strong>
      <div className="reken__velden">
        <div className="reken__veld">
          <label>
            Bruto per maand
            <input
              type="number"
              min="0"
              max="10000"
              step="50"
              value={bruto}
              onChange={(e) => setBruto(Math.max(0, Number(e.target.value)))}
            />
          </label>
        </div>
        <div className="reken__veld" style={{ alignSelf: 'end' }}>
          <p style={{ fontSize: 13, color: 'var(--tekst-licht)' }}>
            Voltijd, zonder persoonlijke aftrek of toeslagen; vakantiegeld niet
            meegerekend.
          </p>
        </div>
      </div>
      <div className="reken__uitkomsten">
        <div className="reken__tegel">
          <div className="label">Bruto per maand</div>
          <div className="bedrag">{eur(bruto)}</div>
        </div>
        <div className="reken__tegel reken__tegel--accent">
          <div className="label">Netto-indicatie per maand</div>
          <div className="bedrag">≈ {eur(nettoMaand)}</div>
        </div>
        <div className="reken__tegel">
          <div className="label">Loonheffing per jaar (indicatie)</div>
          <div className="bedrag">{eur(heffing)}</div>
        </div>
      </div>
      <p className="reken__noot">
        Indicatie op basis van de belastingtarieven en heffingskortingen 2025
        (Belastingdienst); je werkelijke nettoloon hangt af van je persoonlijke
        situatie, pensioen en cao-regelingen. Hieraan kunnen geen rechten worden
        ontleend.
      </p>
    </div>
  );
}
