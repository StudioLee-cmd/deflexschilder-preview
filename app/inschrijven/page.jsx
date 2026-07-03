import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import DemoForm from '@/components/DemoForm';

export const metadata = {
  title: 'Inschrijven als schilder — wij zoeken werk dat bij je past',
  description:
    'Schrijf je in bij De Flexschilder: structureel schilderswerk in Noord-Nederland, marktconform salaris en begeleiding door vakmensen.',
};

export default function Inschrijven() {
  return (
    <>
      <Kruimel items={[{ naam: 'Inschrijven' }]} />

      <section className="paginakop container">
        <span className="kicker">Voor schilders</span>
        <h1>Schrijf je in</h1>
        <p className="lead">
          Op zoek naar een nieuwe baan als schilder, maar kom je er niet helemaal uit?
          Zet ons eerst aan het werk: schrijf je in, dan zoeken wij voor jou de juiste
          opdracht — structureel werk, dicht bij huis.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <DemoForm
            velden={[
              { naam: 'Naam', placeholder: 'Je naam', verplicht: true },
              { naam: 'Woonplaats', placeholder: 'Bijv. Meppel', verplicht: true },
              { naam: 'Telefoon', type: 'tel', placeholder: '06 …', verplicht: true },
              { naam: 'E-mail', type: 'email', placeholder: 'naam@voorbeeld.nl', verplicht: false },
              {
                naam: 'Wat voor schilder ben je?',
                placeholder: 'Bijv. allround, onderhoud, spuiter, leerling…',
                verplicht: true,
              },
              {
                naam: 'Vertel kort iets over jezelf',
                type: 'textarea',
                placeholder: 'Ervaring, wat je zoekt, wanneer je kunt beginnen…',
                verplicht: false,
              },
            ]}
            knop="Inschrijven"
          />
          <div className="kaartje" style={{ padding: 26 }}>
            <h3>Waarom via De Flexschilder?</h3>
            <ul className="checklijst" style={{ marginTop: 10 }}>
              <li>Structurele opdrachten — geen losse klusjes</li>
              <li>Marktconform salaris en eerlijke voorwaarden</li>
              <li>Begeleiding en opleiding door vakmensen</li>
              <li>Werk zoveel mogelijk in je eigen regio</li>
            </ul>
            <Link href="/vacatures" className="verder" style={{ marginTop: 12 }}>
              Bekijk eerst de vacatures →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
