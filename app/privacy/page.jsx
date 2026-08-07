import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import { ORGANISATIE } from '@/lib/schema';

// ⚑ GEGENEREERD door alpha1/scripts/bouw_privacyverklaring.py — bewerk die, niet dit bestand.
//
// WAAR DE FEITEN VANDAAN KOMEN. Naam, telefoon en mail komen uit lib/schema.js §ORGANISATIE en
// worden hieronder als {ORGANISATIE.…} gelezen, niet overgetypt: die graph is de bron van dit
// bedrijf en blijft dat. De KvK staat één plek verderop (components/SiteFooter.jsx) en komt hier
// als tekst binnen omdat de graph 'm niet draagt. Verandert er iets aan die twee bestanden, dan
// hoort deze pagina opnieuw gegenereerd te worden.
//
// WAT ER GEMETEN IS voor de opsomming "wie het verder ziet" (04-08-2026): app/api/ kent één
// route naar buiten (vacature-opgeven → n8n → Supabase), en lib/ats.js draagt het
// vacaturesysteem als adapter die nog op z'n API-key wacht. Verandert er een route, dan
// verandert deze opsomming mee: een verzwegen ontvanger is precies wat AVG art. 13 verbiedt.

export const metadata = {
  title: 'Privacyverklaring',
  description:
    'Wat er met je gegevens gebeurt als je schilders aanvraagt of je inschrijft. Wie ze krijgt, hoe lang ze blijven staan en hoe je ze laat verwijderen.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <>
      <Kruimel items={[{ naam: 'Privacyverklaring' }]} />

      <section className="paginakop container">
        <span className="kicker">Privacy</span>
        <h1>Wat er met je gegevens gebeurt</h1>
        <p className="lead">
          Je vult een formulier in om schilders aan te vragen of om je in te schrijven. Hieronder
          staat wat we daarmee doen, wie het verder ziet en hoe je het laat weghalen.
        </p>
      </section>

      <section className="sectie container">
        <div className="prose">
          <h2>Wat we van je vragen</h2>
          <p>
            Alleen wat nodig is om je terug te bellen. Meer staat er niet in het formulier, en er
            wordt niets bijgekocht of van elders aangevuld.
          </p>

          <h3>Vraag je schilders aan</h3>
          <ul>
            <li>
              <strong>je bedrijf of organisatie</strong>, om te weten voor wie we schilders zoeken
            </li>
            <li>
              <strong>je naam</strong>, om je aan te kunnen spreken
            </li>
            <li>
              <strong>je telefoonnummer</strong>, want het antwoord komt per telefoon of WhatsApp
            </li>
            <li>
              <strong>je e-mailadres</strong>, alleen als je het zelf invult, want verplicht is het niet
            </li>
            <li>
              <strong>de plaats van het werk</strong>, om te kijken of dat binnen ons werkgebied valt
            </li>
            <li>
              <strong>wat er moet gebeuren</strong>, zodat we weten welke schilders erbij passen
            </li>
          </ul>

          <h3>Schrijf je je in als schilder</h3>
          <ul>
            <li>
              <strong>je naam</strong>, om je aan te kunnen spreken
            </li>
            <li>
              <strong>je woonplaats</strong>, om te kijken welk werk bij je in de buurt zit
            </li>
            <li>
              <strong>je telefoonnummer</strong>, want het antwoord komt per telefoon of WhatsApp
            </li>
            <li>
              <strong>je e-mailadres</strong>, alleen als je het zelf invult, want verplicht is het niet
            </li>
            <li>
              <strong>wat voor schilder je bent</strong>, om je aan het juiste werk te koppelen
            </li>
            <li>
              <strong>wat je zelf over jezelf vertelt</strong>, alleen wat je er zelf bij typt
            </li>
          </ul>

          <p>
            Je hoeft dit niet in te vullen. Doe je het niet, dan kunnen we alleen niet terugbellen.
            Bellen of appen op{' '}
            <a href={`tel:${ORGANISATIE.telephone}`}>06 - 137 181 72</a> kan altijd.
          </p>

          <h2>Waarom we het mogen vragen</h2>
          <p>
            Omdat je er zelf om vraagt. Je vult het formulier in om schilders te regelen of om aan
            het werk te komen, en dat zijn de stappen vóór een opdracht of een contract. Dat is de
            grondslag in de wet. Verkopen doen we je gegevens aan niemand.
          </p>
        </div>
      </section>

      <section className="sectie container">
        <div className="prose">
          <h2>Wie het verder ziet</h2>
          <p>
            We lezen je bericht zelf. Om het bij ons te krijgen loopt het langs een paar systemen,
            en die noemen we hier bij naam, ook al zie je ze niet.
          </p>
        </div>
        <div className="grid grid--3" style={{ marginTop: 18 }}>
          <article className="kaartje">
            <h3>n8n</h3>
            <p>
              De automatiseringsserver die DigitalStudioLee zelf beheert en die je bericht doorzet. Die server heeft de koppeling met de mailprovider; de website zelf niet.
              <br />
              <span className="meta">Staat op een eigen server van DigitalStudioLee in Nederland.</span>
            </p>
          </article>
          <article className="kaartje">
            <h3>Supabase</h3>
            <p>
              De databank achter deze site, waarin je bericht wordt vastgelegd. Zonder vastlegging kan een bericht wegvallen zonder dat iemand het merkt.
              <br />
              <span className="meta">Staat op servers binnen de Europese Unie (Ierland).</span>
            </p>
          </article>
          <article className="kaartje">
            <h3>Flexsoftware B.V.</h3>
            <p>
              De leverancier van Uitzendplaats, het systeem waarin wij onze vacatures bijhouden. De vacatures die je op deze site ziet, komen daaruit.
              <br />
              <span className="meta">Het verkeer loopt maar één kant op: deze site haalt de vacatures daar op, en er gaat niets van jou naartoe. Het sollicitatieformulier verstuurt op dit moment nog niets. Zodra dat verandert, komt je sollicitatie daar binnen en staat hier ook waar je gegevens dan bewaard worden.</span>
            </p>
          </article>
        </div>
        <div className="prose" style={{ marginTop: 18 }}>
          <p>
            De website en die koppelingen zijn gebouwd en worden beheerd door{' '}
            <a href="https://www.studiolee.nl" target="_blank" rel="noopener noreferrer">
              DigitalStudioLee
            </a>{' '}
            (KvK 98933353, 3448 CJ Woerden). Zij werken alleen in onze
            opdracht en mogen je gegevens nergens anders voor gebruiken. Dat staat vast in een
            verwerkersovereenkomst.
          </p>
        </div>
      </section>

      <section className="sectie container">
        <div className="prose">
          <h2>Hoe lang het blijft staan</h2>
          <p>Je aanvraag wordt 6 maanden bewaard, gerekend vanaf het moment dat je hem verstuurde. Daarna wordt hij verwijderd.</p>
          <p>
            Ga je voor ons werken of word je opdrachtgever, dan horen je gegevens bij onze gewone
            administratie en bewaren we ze zolang dat voor het werk en de administratie nodig is.
          </p>

          <h2>Cookies</h2>
          <p>
            Deze site zet geen cookies. Er staat geen Google Analytics op, geen advertentiepixel
            en geen meekijk-script, en de lettertypen worden vanaf deze site zelf geladen in
            plaats van bij Google opgehaald. Daarom zie je hier ook geen cookiemelding: er valt
            niets te accepteren of te weigeren.
          </p>

          <h2>Wat je kunt vragen</h2>
          <p>
            Je mag altijd vragen wat we van je hebben, het laten aanpassen als het niet klopt, of
            het laten weghalen. Eén berichtje is genoeg en er hoeft geen reden bij. Kom je er met
            ons niet uit, dan kun je terecht bij de{' '}
            <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
              Autoriteit Persoonsgegevens
            </a>
            .
          </p>
        </div>

        <div className="kerndata" style={{ maxWidth: 820, marginTop: 20 }}>
          <strong>Wie verantwoordelijk is</strong>
          <dl>
            <div>
              <dt>Bedrijf</dt>
              <dd>{ORGANISATIE.name}</dd>
            </div>
            <div>
              <dt>KvK</dt>
              <dd>83856323</dd>
            </div>
            <div>
              <dt>Adres</dt>
              <dd>
                {ORGANISATIE.address.streetAddress}, {ORGANISATIE.address.postalCode}{' '}
                {ORGANISATIE.address.addressLocality}
              </dd>
            </div>
            <div>
              <dt>Mail</dt>
              <dd>
                <a href={`mailto:${ORGANISATIE.email}`}>{ORGANISATIE.email}</a>
              </dd>
            </div>
            <div>
              <dt>Telefoon</dt>
              <dd>
                <a href={`tel:${ORGANISATIE.telephone}`}>06 - 137 181 72</a>
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <Link href="/aanvraag">Naar het contactformulier</Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
