import VacatureOpgeefForm from '@/components/VacatureOpgeefForm';

// De opgeef-route: André tikt hier vanaf z'n TELEFOON een vacature in en die staat
// meteen op de site. Geen CMS, geen login, geen wachtwoord — één bladwijzer met een
// code erin, die hij op z'n beginscherm zet.
//
// ⛔ DE CODE-CHECK STAAT HIER ÉN IN DE n8n-FLOW. Deze pagina is maar een formulier;
//    de webhook is de echte deur. Een gate op één van twee deuren is geen gate.
//
// ⛔ DEZE PAGINA BLIJFT NOINDEX, OOK NA DE LIVEGANG — en dat is de reden dat 'ie hier
//    apart staat opgeschreven. Sinds 08-08 hangen de drie site-brede noindex-sloten
//    (next.config.mjs · app/layout.jsx · app/robots.js) aan één env-var
//    NEXT_PUBLIC_INDEXEERBAAR, die op de flip-dag alle drie tegelijk opent. Het `robots`
//    hieronder hangt daar met opzet NIET aan: page-metadata wint van layout-metadata, dus
//    deze route blijft noindex terwijl de rest van de site indexeerbaar wordt.
//    Wie op de flip-dag 'alle noindex eruit' leest en ook deze weghaalt, zet Andrés
//    ongeauthenticeerde opgeef-formulier publiek in Google. Niet doen.
//    De pagina staat bewust ook niet in de sitemap of in een menu: alleen via de link.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vacature opgeven',
  robots: { index: false, follow: false },
};

export default function VacatureOpgeven({ searchParams }) {
  const verwacht = process.env.VACATURE_OPGEVEN_CODE || '';
  const gegeven = String(searchParams?.code || '');
  const toegang = verwacht.length > 0 && gegeven === verwacht;

  if (!toegang) {
    // Bewust nietszeggend: geen "verkeerde code" (dat bevestigt dat de pagina bestaat
    // en nodigt uit tot proberen), en geen hint over de vorm van de code.
    return (
      <section className="paginakop container">
        <h1>Pagina niet gevonden</h1>
        <p className="lead">Deze pagina bestaat niet of is verlopen.</p>
      </section>
    );
  }

  return (
    <>
      <section className="paginakop container">
        <span className="kicker">Alleen voor De Flexschilder</span>
        <h1>
          Nieuwe <span className="accent">vacature</span>
        </h1>
        <p className="lead">
          Vul in wat je kwijt wilt en druk op verzenden. De vacature staat er dan meteen
          op, ook op de stadspagina&apos;s in de buurt. Drie velden is genoeg.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 24 }}>
        <div className="container" style={{ maxWidth: 620 }}>
          <VacatureOpgeefForm code={gegeven} />
        </div>
      </section>
    </>
  );
}
