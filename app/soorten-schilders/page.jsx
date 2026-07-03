import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import ClusterBlok from '@/components/ClusterBlok';
import BeeldAI from '@/components/BeeldAI';

export const metadata = {
  title: 'Soorten schilders — specialisaties en salarisindicaties',
  description:
    'Van onderhoudsschilder tot industrieel schilder, spuiter en gevelschilder: alle specialisaties, wat ze doen en marktconforme salarisindicaties met visuele ranges.',
  alternates: { canonical: '/soorten-schilders' },
};

import { SCHILDER_TYPES as TYPES } from '@/lib/salaris';

// PILLAR — cluster 3 (typepagina's). Salaris-range-bars = grafiek-template;
// de ranges komen uit lib/salaris.js (één bron, gedeeld met de salarischecker).
const S_MIN = 2300;
const S_MAX = 3700;

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
        <span>€ {max.toLocaleString('nl-NL')} bruto p/m (indicatie)</span>
      </div>
    </div>
  );
}

export default function SoortenSchilders() {
  return (
    <>
      <Kruimel items={[{ naam: 'Soorten schilders' }]} />

      <section className="paginakop container">
        <span className="kicker">Specialisaties · pillar</span>
        <h1>
          Soorten <span className="accent">schilders</span>
        </h1>
        <p className="lead">
          Schilder is geen eenheidsworst: elk specialisme vraagt eigen vakkennis. Als
          opdrachtgever huurt u precies het juiste type in; als schilder zie je waar
          jouw vak naartoe kan groeien. Salarisranges zijn marktconforme indicaties —
          definitieve ranges volgen bij livegang.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 30 }}>
        <div className="container grid grid--2">
          {TYPES.map((t) => (
            <div key={t.naam} className="kaartje">
              <h3>{t.naam}</h3>
              <p className="meta">Zoekvolume {t.zoek}</p>
              <p style={{ fontSize: 14.5 }}>{t.tekst}</p>
              {t.min ? (
                <RangeBar min={t.min} max={t.max} />
              ) : (
                <p className="meta" style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>
                  {t.salaris} <em style={{ fontWeight: 400 }}>(indicatie)</em>
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
            src="/img/leerling-leermeester.jpg"
            alt="Leermeester leert een leerling-schilder strak afkitten langs een kozijn"
            ratio="3 / 2"
          />
          <div>
            <h2 style={{ fontSize: 24 }}>Vakmanschap wordt doorgegeven</h2>
            <p className="lead" style={{ marginTop: 10 }}>
              Van leerling tot leermeester: onze vakmensen leren het vak van elkaar —
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
            titel="Cluster: soorten schilders (pillar + typepagina's)"
            intro="In de volledige site krijgt elk specialisme een eigen typepagina met salarisrange, werkzaamheden en doorgroeipad — onderling gelinkt met de inhuren- en vacature-clusters."
            items={TYPES.map((t) => ({ titel: `${t.naam} — eigen typepagina` }))}
          />
        </div>
      </section>
    </>
  );
}
