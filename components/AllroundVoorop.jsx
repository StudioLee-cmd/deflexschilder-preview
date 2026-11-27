import Link from 'next/link';
import VacatureCard from '@/components/VacatureCard';
import { OVERIGE_IN_ZIN } from '@/lib/salaris';
import { ORGANISATIE } from '@/lib/schema';

// ALLROUND VOOROP: het eerste blok op de home, op elke /schilders-inhuren/<stad> en op elke
// /vacatures/schilder-<stad>, en de groep #allround op /vacatures. André 27-11 via Tim: "for the
// homepage and for the separate regions, the all-around painters is the thing you want to show
// first." Eén blok, drie kanten:
//   kant="bedrijf"  (inhurenpagina's)  allround schilders inhuren in <stad>, één tik naar de
//                                      aanvraag met allround en de stad ingevuld
//   kant="schilder" (vacaturepagina's) de open allround vacatures; staat er geen open, dan een app of belletje
//                                      naar André (nooit een nul, en geen loon of prijs: Tim 27-11,
//                                      André noemt zelf zijn bedragen)
//   kant="beide"    (home)             de twee naast elkaar
// Welke vacature allround is beslist isAllround in lib/ats.js; de soorten en het loon komen uit
// lib/salaris.js. Het inschrijfformulier staat hier bewust niet: dat verstuurt nog niets
// (components/DemoForm.jsx, build_step sollicitatie-terugkoppeling).

// Het telefoonnummer uit de organisatiegegevens, en zoals de site het schrijft: "06 - 137 181 72".
const TEL = ORGANISATIE.telephone;
const cijfers = TEL.replace(/^\+31/, '');
const TEL_LEESBAAR = `0${cijfers[0]} - ${cijfers.slice(1, 4)} ${cijfers.slice(4, 7)} ${cijfers.slice(7)}`;

// De aanvraag voor een allround schilder, met de stad ingevuld als die er is. Ook gelezen door
// de knop in de kop van elke inhurenpagina en het eerste pad in de hero van de home.
export function aanvraag(stad) {
  const p = new URLSearchParams({ soort: 'allround' });
  if (stad) {
    p.set('plaats', stad.name);
    p.set('stad', stad.name);
  }
  return `/aanvraag?${p.toString()}`;
}

function whatsapp(stad) {
  const zin = stad
    ? `Hoi André, ik ben allround schilder en zoek werk in en rond ${stad.name}.`
    : 'Hoi André, ik ben allround schilder en zoek werk.';
  return `https://wa.me/${TEL.replace(/^\+/, '')}?text=${encodeURIComponent(zin)}`;
}

function Bedrijf({ stad, kop: Kop }) {
  return (
    <div className="allround__kant">
      <span className="kicker">Voor bedrijven · meest gevraagd</span>
      <Kop className="allround__kop">Allround schilders inhuren{stad ? ` in ${stad.name}` : ''}</Kop>
      <p>
        Een allround schilder doet binnen- en buitenwerk, van onderhoud tot renovatie, en werkt
        zelfstandig van voorbehandeling tot afwerking. André kiest hem op het werk dat er ligt.
      </p>
      <p className="allround__knoppen">
        <Link href={aanvraag(stad)} className="btn btn--primair">Allround schilder aanvragen</Link>
      </p>
      <p className="allround__ook">
        Ook: {OVERIGE_IN_ZIN}.{' '}
        <Link href="/soorten-schilders" className="tekstlink">Alle soorten schilders</Link>
      </p>
    </div>
  );
}

function Schilder({ stad, vacatures, kop: Kop, max }) {
  const getoond = max ? vacatures.slice(0, max) : vacatures;
  return (
    <div className="allround__kant">
      <span className="kicker">Voor schilders · allround</span>
      <Kop className="allround__kop">Allround schilder{stad ? ` in en rond ${stad.name}` : ''}</Kop>
      {getoond.length > 0 ? (
        <>
          <div className={max ? 'allround__lijst' : 'grid grid--2'} style={{ marginTop: 14 }}>
            {getoond.map((v) =>
              max ? (
                <Link key={v.slug} href={`/vacatures/${v.slug}`} className="allround__vacature">
                  <strong>{v.titel}</strong> · {v.plaats}
                </Link>
              ) : (
                <VacatureCard key={v.slug} v={v} />
              )
            )}
          </div>
          {max && vacatures.length > max && (
            <p style={{ marginTop: 12 }}>
              <Link href="/vacatures#allround" className="tekstlink">Alle allround vacatures</Link>
            </p>
          )}
        </>
      ) : (
        <>
          <p>
            Er komt doorlopend allround werk bij
            {stad ? ` in en rond ${stad.name}` : ''}: app of bel André, dan hoor je het als eerste.
          </p>
          <p className="allround__knoppen">
            <a href={whatsapp(stad)} className="btn btn--primair" target="_blank" rel="noreferrer">
              App André
            </a>
            <a href={`tel:${TEL}`} className="btn btn--secundair">☎ {TEL_LEESBAAR}</a>
          </p>
        </>
      )}
    </div>
  );
}

export default function AllroundVoorop({ kant, stad = null, vacatures = [], kop = 'h2', id }) {
  return (
    <section className="allround" aria-label="Allround schilder" id={id}>
      <div className="container">
        <div className={kant === 'beide' ? 'allround__vak allround__vak--twee' : 'allround__vak'}>
          {kant !== 'schilder' && <Bedrijf stad={stad} kop={kop} />}
          {kant !== 'bedrijf' && (
            <Schilder stad={stad} vacatures={vacatures} kop={kop} max={kant === 'beide' ? 3 : null} />
          )}
        </div>
      </div>
    </section>
  );
}
