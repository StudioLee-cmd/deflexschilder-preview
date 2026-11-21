import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import ClusterBlok from '@/components/ClusterBlok';
import BeeldAI from '@/components/BeeldAI';

export const metadata = {
  title: 'Soorten schilders: van leerling tot voorman, met cao-salaris',
  description:
    'Leerling schilder, Schilder 1 en 2, allround schilder, voorman/teamleider en industrieel schilder: wat elke functie doet en wat de cao SAVG 2026 ervoor betaalt.',
  alternates: { canonical: '/soorten-schilders' },
};

import { SCHILDER_TYPES as TYPES, CAO_BRON } from '@/lib/salaris';

// PILLAR — cluster 3 (typepagina's). Salaris-range-bars = grafiek-template;
// de ranges komen uit lib/salaris.js (één bron, gedeeld met de salarischecker).
const S_MIN = 2800;
const S_MAX = 4700;

function RangeBar({ min, max }) {
  const links = ((min - S_MIN) / (S_MAX - S_MIN)) * 100;
  const breedte = ((max - min) / (S_MAX - S_MIN)) * 100;
  return (
    <div className="range">
      <div className="range__baan">
        <div className="range__vul" style={{ left: `${links}%`, width: `${breedte}%` }} />
      </div>
      <div className="range__labels">
        <span>€ {min.toLocaleString('nl-NL')}</span>
        <span>€ {max.toLocaleString('nl-NL')} bruto p/m</span>
      </div>
    </div>
  );
}

export default function SoortenSchilders() {
  return (
    <>
      <Kruimel items={[{ naam: 'Soorten schilders' }]} />

      <section className="paginakop container">
        <span className="kicker">Van leerling tot voorman</span>
        <h1>
          Soorten <span className="accent">schilders</span>
        </h1>
        <p className="lead">
          Van leerling schilder tot voorman: zo groei je in het schildersvak, en dit betaalt de cao voor elke stap. De bedragen zijn de bruto maandlonen van de {CAO_BRON} (37,5 uur per week), van de eerste tot de hoogste trede; je ervaring bepaalt waar je instapt.
        </p>
        <p className="meta" style={{ marginTop: 8 }}>
          Voor glaszetters geldt dezelfde opbouw, van leerling tot allround glaszetter.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 30 }}>
        <div className="container grid grid--2">
          {TYPES.map((t) => (
            <div key={t.naam} className="kaartje">
              <h3>{t.naam}</h3>
              <p className="meta">
                {t.loongroep ? `Cao-loongroep ${t.loongroep}` : 'Leren en werken'}
              </p>
              <p style={{ fontSize: 14.5 }}>{t.tekst}</p>
              {t.min ? (
                <RangeBar min={t.min} max={t.max} />
              ) : (
                <p className="meta" style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>
                  {t.salaris}
                </p>
              )}
              <p style={{ display: 'flex', gap: 14, marginTop: 4 }}>
                <Link href="/aanvraag" style={{ color: 'var(--oranje-donker)', fontWeight: 700, fontSize: 14.5 }}>
                  Inhuren →
                </Link>
                <Link href="/vacatures" style={{ color: 'var(--oranje-donker)', fontWeight: 700, fontSize: 14.5 }}>
                  Vacatures →
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="sectie sectie--vlak">
        <div className="container kaartwrap">
          <BeeldAI
            src="/img/werk/tieme-kozijn.jpg"
            alt="Tieme Smook werkt een kozijn af"
            badge={null}
            ratio="3 / 2"
          />
          <div>
            <h2 style={{ fontSize: 24 }}>Vakmanschap wordt doorgegeven</h2>
            <p className="lead" style={{ marginTop: 10 }}>
              Van leerling tot leermeester: onze vakmensen leren het vak van elkaar,
              in de praktijk, op echte projecten. Daarom durven we &ldquo;vakmensen
              door vakmensen&rdquo; te beloven.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
              <Link href="/aanvraag" className="btn btn--primair">
                Schilders aanvragen
              </Link>
              <Link href="/vacatures" className="btn btn--secundair">
                Bekijk vacatures
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sectie">
        <div className="container">
          <ClusterBlok
            titel="Van specialisme naar passend werk"
            intro="Zoek je vakmensen voor je bedrijf, of zoek je zelf werk als schilder? Kies de ingang die bij je past."
            items={[
              { titel: 'Schilders voor je bedrijf', href: '/schilders-inhuren' },
              { titel: 'Vacatures voor schilders', href: '/vacatures' },
              { titel: 'Inschrijven als schilder', href: '/inschrijven' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
