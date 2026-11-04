'use client';

import { useEffect, useRef, useState } from 'react';

// Cijfers-strip met count-up zodra hij in beeld komt (IntersectionObserver,
// geen library). items = [{ tot, suffix, label, vast }] — `vast` = geen teller.
function Teller({ tot, suffix = '' }) {
  const ref = useRef(null);
  // Server-render het echte getal (zoekmachines en no-JS zien nooit '0');
  // tel alleen op als de strip pas later in beeld scrolt.
  const [n, setN] = useState(tot);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r || r.top < window.innerHeight) return; // al in beeld: laat het getal staan
    setN(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duur = 900;
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duur);
          setN(Math.round(tot * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [tot]);

  return (
    <span ref={ref}>
      {n.toLocaleString('nl-NL')}
      {suffix}
    </span>
  );
}

export default function StatStrip({ items }) {
  return (
    <div className="statstrip">
      {items.map((it) => (
        <div key={it.label} className="statstrip__item">
          <span className="statstrip__cijfer">
            {it.vast ? it.vast : <Teller tot={it.tot} suffix={it.suffix} />}
          </span>
          <span className="statstrip__label">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
