import Kruimel from '@/components/Kruimel';
import AfmeldKnop from '@/components/AfmeldKnop';

/**
 * De uitschrijf-route van de vacature-alert.
 *
 * ⚑ DIT PAD IS GEEN VRIJE KEUZE — het is de URL die op Andrés oude WordPress-site al bestond
 *   (/afmelden-voor-vacature-alert/, "Je bent uitgeschreven"). Die stond tot 08-08 in
 *   `managed.json §identity.pariteit_uitzonderingen` als GEDECLAREERDE uitzondering, met de reden
 *   "de nieuwe build heeft die alert nog niet, dus er is geen uitschrijf-route om heen te wijzen"
 *   en de notitie dat 'ie er alsnog heen moet zodra de alert bestaat. Die alert bestaat nu, dus
 *   dit is die route en de uitzondering vervalt.
 *
 * ⚑ EN DE UITSCHRIJVING GEBEURT OP EEN KLIK, NIET OP HET LADEN VAN DEZE PAGINA. Dat is bewust en
 *   het scheelt een klasse stille fouten: mailclients en beveiligings-scanners halen links in een
 *   bericht vooruit op. Zou deze GET zelf uitschrijven, dan zegt een scanner die de mail
 *   controleert namens de ontvanger z'n alert op — en de bezoeker merkt pas weken later dat er
 *   niets meer komt. Eén knop lost dat op; het blijft één klik vanaf de mail.
 */
export const metadata = {
  title: 'Uitschrijven voor de vacature-alert',
  description:
    'Schrijf je met één klik uit voor de vacature-alert van De Flexschilder. Je ontvangt dan geen bericht meer als er een nieuwe vacature bij komt.',
  alternates: { canonical: '/afmelden-voor-vacature-alert' },
  // Een uitschrijf-pagina hoort niet in de zoekresultaten: 'ie heeft geen zoekintentie en is
  // alleen zinvol met een token uit een mail.
  robots: { index: false, follow: false },
};

export default async function Afmelden({ searchParams }) {
  const params = await searchParams;
  const token = typeof params?.token === 'string' ? params.token : '';

  return (
    <>
      <Kruimel items={[{ naam: 'Uitschrijven voor de vacature-alert' }]} />

      <section className="paginakop container">
        <span className="kicker">Vacature-alert</span>
        <h1>Uitschrijven</h1>
        <p className="lead">
          {token
            ? 'Je staat op het punt je uit te schrijven voor de vacature-alert. Daarna krijg je geen bericht meer als er een nieuwe vacature bij komt.'
            : 'Deze link is niet compleet: het uitschrijf-kenmerk ontbreekt. Gebruik de link onderaan de mail die je van ons kreeg, of mail ons en we halen je er met de hand af.'}
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="kaartje" style={{ padding: 26, maxWidth: 560 }}>
            {token ? (
              <AfmeldKnop token={token} />
            ) : (
              <p style={{ margin: 0, fontSize: 15.5 }}>
                Mail naar{' '}
                <a href="mailto:andre@deflexschilder.nl" style={{ fontWeight: 700 }}>
                  andre@deflexschilder.nl
                </a>{' '}
                en we schrijven je uit.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
