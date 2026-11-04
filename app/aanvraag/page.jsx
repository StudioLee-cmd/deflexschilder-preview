import Kruimel from '@/components/Kruimel';
import AanvraagForm from '@/components/AanvraagForm';

export const metadata = {
  title: 'Schilders zoeken voor je bedrijf',
  description:
    'Vraag flexibele schilderscapaciteit aan voor je project of onderhoudsstroom in Noord-Nederland. Vertel wat er moet gebeuren. Wij plannen de juiste vakmensen in.',
  alternates: { canonical: '/aanvraag' },
};

export default function Aanvraag() {
  return (
    <>
      <Kruimel items={[{ naam: 'Schilders aanvragen' }]} />

      <section className="paginakop container">
        <span className="kicker">Voor opdrachtgevers</span>
        <h1>Schilders aanvragen</h1>
        <p className="lead">
          Vertel welk werk je bedrijf uitvoert, waar en voor welke periode je schilders zoekt. André bespreekt de benodigde ervaring en de mogelijkheden voor een passende match. Liever direct contact? Bel <a href="tel:+31613718172" style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>06 - 137 181 72</a>.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <AanvraagForm />
          <div className="kaartje" style={{ padding: 26 }}>
            <h3>Wat je van ons kunt verwachten</h3>
            <ul className="checklijst" style={{ marginTop: 10 }}>
              <li>Persoonlijk contact over het werk en je planning</li>
              <li>De juiste specialisatie op de juiste klus</li>
              <li>Duidelijke afspraken, geen verborgen kosten</li>
              <li>Afstemming over de gewenste periode en inzet</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
