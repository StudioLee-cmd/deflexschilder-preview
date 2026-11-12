'use client';

import { useState } from 'react';

// Bruto→netto-INDICATIE (Randstad-patroon: hun meest gebruikte tool).
// Vereenvoudigd model o.b.v. IB-tarieven/kortingen 2026, onder de AOW-leeftijd (schijven +
// algemene heffingskorting + arbeidskorting, zonder persoonlijke situaties), bewust als
// indicatie gelabeld; geen rechten te ontlenen. Bron: Belastingdienst, "Voorlopige aanslag
// 2026: gebruikte tarieven en heffingskortingen" (gelezen 12-11-2026).
const SCHIJF1_GRENS = 38883;
const SCHIJF2_GRENS = 78426;
const T1 = 0.3575;
const T2 = 0.3756;
const T3 = 0.495;

function belastingJaar(j) {
  const s1 = Math.min(j, SCHIJF1_GRENS) * T1;
  const s2 = j > SCHIJF1_GRENS ? (Math.min(j, SCHIJF2_GRENS) - SCHIJF1_GRENS) * T2 : 0;
  const s3 = j > SCHIJF2_GRENS ? (j - SCHIJF2_GRENS) * T3 : 0;
  return s1 + s2 + s3;
}

function algemeneHeffingskorting(j) {
  const k = 3115 - 0.06398 * Math.max(0, j - 29736);
  return Math.max(0, Math.min(3115, k));
}

function arbeidskorting(j) {
  let k;
  if (j <= 11965) k = 0.08324 * j;
  else if (j <= 25845) k = 996 + 0.31009 * (j - 11965);
  else if (j <= 45592) k = 5300 + 0.0195 * (j - 25845);
  else k = 5685 - 0.0651 * (j - 45592);
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
        Indicatie op basis van de belastingtarieven en heffingskortingen 2026
        (Belastingdienst); je werkelijke nettoloon hangt af van je persoonlijke
        situatie, pensioen en cao-regelingen. Hieraan kunnen geen rechten worden
        ontleend.
      </p>
    </div>
  );
}
