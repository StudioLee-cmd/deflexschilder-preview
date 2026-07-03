import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import ZoekBalk from '@/components/ZoekBalk';
import ClusterBlok from '@/components/ClusterBlok';
import BeeldAI from '@/components/BeeldAI';
import { CITIES } from '@/lib/geo';

export const metadata = {
  title: 'Schilders inhuren — flexibele schilderscapaciteit in Noord-Nederland',
  description:
    'Schilders inhuren zonder vaste loonkosten: detachering, uitzenden en werving & selectie voor woningcorporaties, vastgoedbeheerders, aannemers en RGS-opdrachtgevers in Noord-Nederland.',
};

// PILLAR — cluster 1 (opdrachtgeverkant; kernkeyword "schilder(s) inhuren").
// NB (Tim 03-07): klus-intent-keywords ("schilder inhuren" enkelvoud = Werkspot-publiek)
// worden bewust vermeden — alle copy stuurt op capaciteit/B2B (meervoud, detacheren).
const FAQ = [
  {
    v: 'Wat kost het inhuren van schilders?',
    a: 'Dat hangt af van specialisme, aantal vakmensen, duur en type opdracht. We rekenen transparante tarieven zonder verborgen kosten — u weet vooraf precies waar u aan toe bent. Vraag een vrijblijvende offerte aan voor uw situatie.',
  },
  {
    v: 'Hoe snel kan een schilder starten?',
    a: 'Bij piekdrukte schakelen we vaak binnen enkele dagen. Voor grotere of planmatige trajecten plannen we de capaciteit ruim vooraf in op uw planning.',
  },
  {
    v: 'Doen jullie ook losse klussen voor particulieren?',
    a: 'Nee. De Flexschilder werkt uitsluitend zakelijk (B2B): structurele detachering en grotere opdrachten voor corporaties, beheerders, aannemers en RGS-opdrachtgevers.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.v,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function SchildersInhuren() {
  return (
    <>
      <Kruimel items={[{ naam: 'Schilders inhuren' }]} />

      <section className="paginakop container">
        <span className="kicker">Voor opdrachtgevers · pillar</span>
        <h1>Schilders inhuren in Noord-Nederland</h1>
        <p className="lead">
          Flexibele schilderscapaciteit van échte vakmensen — zonder vaste
          loonkosten. Voor structurele detachering en grotere opdrachten; geen losse
          klusjes. Geleid door schilders, dus wij snappen het vak én de planning.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 28 }}>
        <div className="container">
          <ZoekBalk mode="inhuren" toonTabs={false} />
        </div>
      </section>

      {/* Diensten — de drie vormen (menu-ankers) */}
      <section className="sectie sectie--vlak" style={{ paddingTop: 44 }}>
        <div className="container">
          <h2>
            Drie manieren om <span className="accent">schilders in te huren</span>
          </h2>
          <div className="grid grid--3" style={{ marginTop: 24 }}>
            <div className="kaartje" id="detachering">
              <h3>Detachering</h3>
              <p style={{ fontSize: 14.5 }}>
                Vakmensen voor langere tijd op uw project of in uw onderhoudsploeg. U
                stuurt aan op het werk, wij blijven werkgever — geen administratie,
                geen risico.
              </p>
            </div>
            <div className="kaartje" id="uitzenden">
              <h3>Uitzenden</h3>
              <p style={{ fontSize: 14.5 }}>
                Pieken opvangen zonder verplichtingen: extra schilders precies in de
                weken dat het nodig is. U betaalt alleen de gewerkte uren.
              </p>
            </div>
            <div className="kaartje" id="werving-selectie">
              <h3>Werving &amp; selectie</h3>
              <p style={{ fontSize: 14.5 }}>
                Een schilder in vaste dienst? Wij kennen de vakmensen in het Noorden
                persoonlijk en selecteren op vakmanschap — niet op cv-woorden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voor wie + beeld */}
      <section className="sectie">
        <div className="container kaartwrap">
          <div>
            <h2>Voor wie wij werken</h2>
            <div className="grid grid--2" style={{ marginTop: 20 }}>
              <Link href="/voor-woningcorporaties" className="kaartje">
                <h3>Woningcorporaties</h3>
                <p style={{ fontSize: 14 }}>Planmatig en mutatie-onderhoud, schaalbaar.</p>
                <span className="verder">Eigen pagina →</span>
              </Link>
              <Link href="/voor-aannemers" className="kaartje">
                <h3>Aannemers &amp; onderhoud</h3>
                <p style={{ fontSize: 14 }}>Pieken opvangen, onderaanneming schilderwerk.</p>
                <span className="verder">Eigen pagina →</span>
              </Link>
              <Link href="/vastgoedonderhoud-en-rgs" className="kaartje">
                <h3>RGS-opdrachtgevers</h3>
                <p style={{ fontSize: 14 }}>Langjarige onderhoudspartner, conditiegericht.</p>
                <span className="verder">Ons specialisme →</span>
              </Link>
              <div className="kaartje">
                <h3>VvE- &amp; vastgoedbeheerders</h3>
                <p style={{ fontSize: 14 }}>
                  Terugkerend schilderwerk over een portefeuille panden.
                </p>
                <span className="verder" style={{ color: 'var(--tekst-licht)' }}>
                  Pagina volgt in de uitbouw
                </span>
              </div>
            </div>
          </div>
          <BeeldAI
            src="/img/rgs-inspectie.jpg"
            alt="Schilder en vastgoedbeheerder inspecteren samen de conditie van een kozijn"
            ratio="3 / 2"
          />
        </div>
      </section>

      {/* Waarom — André's eigen tekst (steekwoorden-docx 03-07) */}
      <section className="sectie sectie--vlak">
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <span className="kicker">Meer dan bemiddeling, verstand van schilderwerk</span>
            <h2>Waarom opdrachtgevers voor ons kiezen</h2>
            <p>
              Met 23 jaar ervaring als technisch adviseur binnen de verf- en
              onderhoudsbranche begrijpen wij het schildersvak als geen ander. Wij
              leveren niet alleen vakmensen, maar denken mee over kwaliteit,
              onderhoud en uitvoering.
            </p>
            <p>
              Dankzij onze kennis van RGS, vastgoedonderhoud en schildertechniek
              spreken wij dezelfde taal als opdrachtgevers én schilders. Vanuit
              Noord-Nederland bouwen wij aan langdurige relaties, gebaseerd op
              vakmanschap, betrouwbaarheid en persoonlijk contact.
            </p>
            <ul className="checklijst" style={{ paddingLeft: 0 }}>
              <li>23 jaar technische expertise in verf en onderhoud</li>
              <li>Specialist in schilders en vastgoedonderhoud</li>
              <li>Kennis van RGS en planmatig onderhoud</li>
              <li>Sterk netwerk in Noord-Nederland</li>
              <li>Persoonlijke begeleiding en selectie</li>
              <li>Vakmensen door vakmensen</li>
            </ul>
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            <div className="kaartje">
              <h3>Geen cv-schuiver, maar een vakinhoudelijke matchmaker</h3>
              <p style={{ fontSize: 14.5 }}>
                Wij beoordelen schilders op vakkennis, werkhouding, ervaring,
                communicatie en geschiktheid voor uw specifieke project. Dat leidt
                tot betere matches en minder uitval — de juiste schilder op het
                juiste project.
              </p>
            </div>
            <div className="kaartje">
              <h3>Sparringpartner voor ondernemers</h3>
              <p style={{ fontSize: 14.5 }}>
                Meedenken over personeelsbeleid, cao-vraagstukken, duurzame
                inzetbaarheid en het binden en behouden van vakmensen — één
                aanspreekpunt met praktijkervaring, geen accountmanager zonder
                technische achtergrond.
              </p>
            </div>
            <div className="kaartje">
              <h3>Technisch advies inbegrepen</h3>
              <p style={{ fontSize: 14.5 }}>
                Verfsystemen, ondergrondbeoordeling, onderhoudscycli, kwaliteitseisen
                en uitvoeringsrisico&rsquo;s — wij plaatsen niet alleen schilders, wij
                begrijpen hun werk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="sectie">
        <div className="container">
          <h2>Zo werkt het</h2>
          <div className="stappen" style={{ marginTop: 22, maxWidth: 740 }}>
            <div className="stap">
              <p>
                <strong>Vertel wat er moet gebeuren.</strong> Project, periode,
                locatie en het soort schilderwerk — een belletje of het
                aanvraagformulier is genoeg.
              </p>
            </div>
            <div className="stap">
              <p>
                <strong>Wij plannen de juiste vakmensen in.</strong> Gematcht op
                specialisme; u weet vooraf wie er komt en wat het kost.
              </p>
            </div>
            <div className="stap">
              <p>
                <strong>Op- en afschalen wanneer u wilt.</strong> Meer werk? Extra
                capaciteit. Project klaar? Geen verplichtingen.
              </p>
            </div>
          </div>
          <Link href="/aanvraag" className="btn btn--primair" style={{ marginTop: 24 }}>
            Schilders aanvragen
          </Link>
        </div>
      </section>

      {/* Cluster-template: zo groeit dit cluster */}
      <section className="sectie">
        <div className="container">
          <ClusterBlok
            titel="Cluster: schilders inhuren (pillar + ondersteunende artikelen)"
            intro="Elke ondersteunende pagina beantwoordt één vraag van een opdrachtgever en linkt terug naar deze pillar — het hub-and-spoke-model waarmee de winnende concurrenten ranken."
            items={[
              { titel: 'Wat kost het inhuren van schilders?' },
              { titel: 'Inhuren vs. zelf in dienst nemen' },
              { titel: 'Flexibele capaciteit bij piekdrukte' },
              { titel: 'Schilders inhuren voor woningcorporaties', href: '/voor-woningcorporaties' },
              { titel: 'Inhuren voor vastgoedonderhoud & RGS', href: '/vastgoedonderhoud-en-rgs' },
              { titel: 'Kwaliteit borgen bij ingehuurde schilders' },
            ]}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="sectie sectie--vlak">
        <div className="container prose">
          <h2>Veelgestelde vragen</h2>
          {FAQ.map((f) => (
            <div key={f.v}>
              <h3>{f.v}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steden */}
      <section className="sectie">
        <div className="container">
          <h2>Schilders inhuren per stad</h2>
          <div className="stedenchips" style={{ marginTop: 16 }}>
            {CITIES.map((c) => (
              <Link key={c.slug} href={`/schilders-inhuren/${c.slug}`} className="chip">
                Schilders inhuren {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
    </>
  );
}
