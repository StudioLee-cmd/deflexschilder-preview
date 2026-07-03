import Link from 'next/link';
import Kruimel from '@/components/Kruimel';
import { ARTIKELEN } from '@/lib/blog';
import { BASIS, PERSOON_ID, jsonLd } from '@/lib/schema';

export const metadata = {
  title: 'André van der Hoogen — eigenaar De Flexschilder, 23 jaar vakervaring',
  description:
    'André van der Hoogen is eigenaar van De Flexschilder: 23 jaar technische expertise in verf en onderhoud, kennis van RGS en planmatig onderhoud, en een sterk netwerk in Noord-Nederland.',
  alternates: { canonical: '/auteur/andre' },
  openGraph: {
    title: 'André van der Hoogen — De Flexschilder',
    description: '23 jaar technische expertise in verf en onderhoud.',
  },
};

// Author-pagina (E-E-A-T-anker): ProfilePage-schema verwijst naar het centrale
// Person-@id in de site-graph (lib/schema.js) — één bron, geen dubbele data.
const PROFIEL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${BASIS}/auteur/andre#profiel`,
  mainEntity: { '@id': PERSOON_ID },
  inLanguage: 'nl',
  dateModified: '2026-07-03',
};

export default function AuteurAndre() {
  return (
    <>
      <Kruimel items={[{ naam: 'Over ons', href: '/over-ons' }, { naam: 'André van der Hoogen' }]} />

      <section className="paginakop container">
        <span className="kicker">Auteur &amp; eigenaar</span>
        <h1>André van der Hoogen</h1>
        <p className="lead">
          Eigenaar van De Flexschilder. <strong>23 jaar technische expertise</strong>{' '}
          in verf en onderhoud, diepgaande kennis van RGS en planmatig onderhoud, en
          een sterk regionaal netwerk in Noord-Nederland. Alles wat hier verschijnt,
          is geschreven of beoordeeld door iemand die het vak zelf uitoefent.
        </p>
      </section>

      <section className="sectie" style={{ paddingTop: 30 }}>
        <div className="container kaartwrap" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h2>Waarom een vakman schrijft</h2>
            <p>
              Google en AI-zoekmachines wegen steeds zwaarder wie er achter een tekst
              zit: echte ervaring, aantoonbare expertise, een herkenbare auteur. Bij
              De Flexschilder is dat simpel geregeld — de eigenaar ís de vakman. André
              begon 23 jaar geleden op de steiger en adviseert vandaag corporaties en
              ondernemers over onderhoud, RGS en capaciteit.
            </p>
            <h2>Expertise</h2>
            <ul className="checklijst" style={{ paddingLeft: 0 }}>
              <li>
                Technisch advies: verfsystemen · ondergrondbeoordeling ·
                onderhoudscycli · kwaliteitseisen · uitvoeringsrisico&rsquo;s
              </li>
              <li>Planmatig en mutatie-onderhoud voor corporatiebezit</li>
              <li>Resultaatgericht samenwerken (RGS) en NEN 2767-conditiemeting</li>
              <li>
                Sparringpartner voor ondernemers: personeelsbeleid, cao en het binden
                en behouden van vakmensen
              </li>
              <li>Persoonlijke selectie — geen cv-schuiver, maar een vakinhoudelijke matchmaker</li>
            </ul>
            <blockquote>
              &ldquo;Ik plaats niet alleen schilders, ik begrijp hun werk.&rdquo;
            </blockquote>
            <h2>Artikelen van André</h2>
            <ul>
              {ARTIKELEN.map((a) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`}>{a.titel}</Link>{' '}
                  <span style={{ color: 'var(--tekst-licht)', fontSize: 14 }}>
                    ({a.gepubliceerdLabel})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <div className="kaartje">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="byline__avatar" style={{ width: 64, height: 64, fontSize: 26 }}>
                  A
                </span>
                <img src="/branding_flexschilder.svg" alt="De Flexschilder" width={130} height={38} style={{ marginLeft: 'auto', height: 36, width: 'auto' }} />
              </div>
              <h3 style={{ marginTop: 8 }}>André van der Hoogen</h3>
              <p className="meta">Eigenaar &amp; vakschilder · De Flexschilder</p>
              {/* Feiten zichtbaar — dezelfde data als het Person-schema */}
              <dl style={{ display: 'grid', gap: 6, fontSize: 14.5, marginTop: 4 }}>
                <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 700, minWidth: 110, color: 'var(--tekst-licht)' }}>Vakervaring</dt><dd style={{ margin: 0 }}><strong>23 jaar</strong> (verf &amp; onderhoud)</dd></div>
                <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 700, minWidth: 110, color: 'var(--tekst-licht)' }}>Specialisme</dt><dd style={{ margin: 0 }}>RGS · NEN 2767 · verfsystemen</dd></div>
                <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 700, minWidth: 110, color: 'var(--tekst-licht)' }}>Regio</dt><dd style={{ margin: 0 }}>Noord-Nederland</dd></div>
                <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 700, minWidth: 110, color: 'var(--tekst-licht)' }}>Telefoon</dt><dd style={{ margin: 0 }}><a href="tel:+31613718172" style={{ fontWeight: 700 }}>06 - 137 181 72</a></dd></div>
                <div style={{ display: 'flex', gap: 8 }}><dt style={{ fontWeight: 700, minWidth: 110, color: 'var(--tekst-licht)' }}>E-mail</dt><dd style={{ margin: 0 }}><a href="mailto:andre@deflexschilder.nl" style={{ fontWeight: 700 }}>andre@deflexschilder.nl</a></dd></div>
              </dl>
              <p className="meta" style={{ fontSize: 12.5 }}>
                Profielfoto volgt — aan te leveren door André.
              </p>
            </div>
            <div className="kaartje">
              <h3>Verhalen van vakmensen</h3>
              <p style={{ fontSize: 14.5 }}>
                Na André volgen de verhalen van de vakmensen zelf (Tieme · Jordy ·
                Julia) — zodra de toestemming en content rond zijn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(PROFIEL_SCHEMA) }} />
    </>
  );
}
