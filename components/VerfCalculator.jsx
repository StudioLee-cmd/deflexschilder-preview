'use client';

import { useState } from 'react';

// Verfcalculator per muur (gesprek 06-11: "hoeveel verf heb ik nodig voor deze muur"). Een
// rekentool die een schilder op het werk echt gebruikt, naast de salaris- en km-tools.
// Rekent: (breedte x hoogte x aantal muren) min ramen en deuren, keer het aantal lagen,
// gedeeld door de dekking van het blik, plus 10% voor de rol, de bak en een ruwe plek.
const MARGE = 0.1;
const BLIK = 2.5; // liter, de gangbare maat muurverf

const getal = (v, min, max) => Math.min(max, Math.max(min, Number(String(v).replace(',', '.')) || 0));

export default function VerfCalculator() {
  const [breedte, setBreedte] = useState(4);
  const [hoogte, setHoogte] = useState(2.6);
  const [muren, setMuren] = useState(1);
  const [aftrek, setAftrek] = useState(0);
  const [lagen, setLagen] = useState(2);
  const [dekking, setDekking] = useState(10);

  const oppervlak = Math.max(0, breedte * hoogte * muren - aftrek);
  const liters = (oppervlak * lagen) / Math.max(1, dekking) * (1 + MARGE);
  const blikken = Math.ceil(liters / BLIK - 1e-9);
  const nl = (n, d = 1) => n.toLocaleString('nl-NL', { maximumFractionDigits: d, minimumFractionDigits: d });

  const veld = (label, value, set, props, min, max) => (
    <div className="reken__veld">
      <label>
        {label}
        <input type="number" value={value} onChange={(e) => set(getal(e.target.value, min, max))} {...props} />
      </label>
    </div>
  );

  return (
    <div className="reken">
      <strong style={{ color: 'var(--ink)' }}>Verfcalculator: hoeveel verf heb je nodig voor deze muur?</strong>
      <div className="reken__velden">
        {veld('Breedte van de muur (m)', breedte, setBreedte, { min: 0, max: 100, step: 0.1 }, 0, 100)}
        {veld('Hoogte van de muur (m)', hoogte, setHoogte, { min: 0, max: 30, step: 0.1 }, 0, 30)}
        {veld('Aantal van zulke muren', muren, setMuren, { min: 1, max: 50, step: 1 }, 1, 50)}
        {veld('Ramen en deuren eraf (m²)', aftrek, setAftrek, { min: 0, max: 500, step: 0.5 }, 0, 500)}
        {veld('Aantal lagen', lagen, setLagen, { min: 1, max: 4, step: 1 }, 1, 4)}
        {veld('Dekking volgens het blik (m² per liter)', dekking, setDekking, { min: 1, max: 20, step: 1 }, 1, 20)}
      </div>
      <div className="reken__uitkomsten">
        <div className="reken__tegel">
          <div className="label">Te schilderen</div>
          <div className="bedrag">{nl(oppervlak)} m²</div>
          <div className="label">per laag</div>
        </div>
        <div className="reken__tegel">
          <div className="label">Verf nodig</div>
          <div className="bedrag">{nl(liters)} liter</div>
          <div className="label">{lagen} {lagen === 1 ? 'laag' : 'lagen'}, met 10% marge</div>
        </div>
        <div className="reken__tegel reken__tegel--accent">
          <div className="label">Blikken van {nl(BLIK)} liter</div>
          <div className="bedrag">{blikken}</div>
          <div className="label">om mee te nemen</div>
        </div>
      </div>
      <p className="reken__noot">
        De dekking staat op het blik of in het technisch blad. Muurverf haalt meestal 8 tot 12 m² per
        liter per laag. Een ruwe, zuigende of donkere ondergrond vraagt meer, en een eerste laag op
        kaal stucwerk ook.
      </p>
    </div>
  );
}
