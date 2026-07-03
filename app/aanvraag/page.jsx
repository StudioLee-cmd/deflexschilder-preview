import Kruimel from '@/components/Kruimel';
import AanvraagForm from '@/components/AanvraagForm';

export const metadata = {
  title: 'Schilders aanvragen — vandaag geregeld',
  description:
    'Vraag flexibele schilderscapaciteit aan voor uw project of onderhoudsstroom in Noord-Nederland. Vertel wat er moet gebeuren — wij plannen de juiste vakmensen in.',
};

export default function Aanvraag() {
  return (
    <>
      <Kruimel items={[{ naam: 'Schilders aanvragen' }]} />

      <section className="paginakop container">
        <span className="kicker">Voor opdrachtgevers</span>
        <h1>Schilders aanvragen</h1>
        <p className="lead">
          Vertel ons wat er geschilderd moet worden, waar en wanneer — wij komen snel
          terug met de juiste vakmensen en een duidelijke afspraak. Liever direct
          contact? Bel <a href="tel:+31613718172" style={{ fontWeight: 700, color: 'var(--oranje-donker)' }}>06 - 137 181 72</a>.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <AanvraagForm />
          <div className="kaartje" style={{ padding: 26 }}>
            <h3>Wat u van ons kunt verwachten</h3>
            <ul className="checklijst" style={{ marginTop: 10 }}>
              <li>Snel persoonlijk contact over uw aanvraag</li>
              <li>De juiste specialisatie op de juiste klus</li>
              <li>Duidelijke afspraken, geen verborgen kosten</li>
              <li>Op- en afschalen wanneer u dat wilt</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
