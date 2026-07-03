'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CITIES } from '@/lib/geo';

// Zelfde look als live (logo · menu · tel · oranje knop), betere structuur:
// werkgevers/werkzoekenden gescheiden + LOCATIES als eigen menu-item met de
// steden onder elkaar (Strikt-patroon, maar schilder-specialist).
export default function SiteHeader({ vacatureCount = 0 }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="header__logo" aria-label="De Flexschilder — home">
          <img src="/branding_flexschilder.svg" alt="De Flexschilder" width={180} height={52} />
        </Link>

        <nav className="nav" aria-label="Hoofdmenu">
          <div className="nav__item">
            <Link href="/schilders-inhuren" className="nav__link">
              Voor opdrachtgevers <span className="pijl">▾</span>
            </Link>
            <div className="nav__drop">
              <div className="drop__kop">Ik zoek schilders</div>
              <Link href="/schilders-inhuren">Schilders inhuren</Link>
              <Link href="/schilders-inhuren#detachering">Detachering</Link>
              <Link href="/schilders-inhuren#uitzenden">Uitzenden</Link>
              <Link href="/schilders-inhuren#werving-selectie">Werving &amp; selectie</Link>
              <div className="drop__kop">Voor uw organisatie</div>
              <Link href="/voor-woningcorporaties">Woningcorporaties</Link>
              <Link href="/voor-aannemers">Aannemers &amp; onderhoudsbedrijven</Link>
              <Link href="/vastgoedonderhoud-en-rgs">Vastgoedonderhoud &amp; RGS</Link>
              <Link href="/aanvraag">Schilders aanvragen</Link>
            </div>
          </div>

          <div className="nav__item">
            <Link href="/vacatures" className="nav__link">
              Voor schilders{' '}
              {vacatureCount > 0 && <span className="nav__badge">{vacatureCount}</span>}{' '}
              <span className="pijl">▾</span>
            </Link>
            <div className="nav__drop">
              <div className="drop__kop">Ik zoek werk</div>
              <Link href="/vacatures">Vacatures</Link>
              <Link href="/soorten-schilders">Soorten schilders</Link>
              <Link href="/inschrijven">Inschrijven</Link>
              <a href="http://deflexschilder.onlineuur.nl/" target="_blank" rel="noreferrer">
                Uren doorgeven
              </a>
            </div>
          </div>

          <div className="nav__item">
            <Link href="/#werkgebied" className="nav__link">
              Locaties <span className="pijl">▾</span>
            </Link>
            <div className="nav__drop">
              <div className="drop__kop">Werkgebied Noord-Nederland</div>
              {CITIES.map((c) => (
                <Link key={c.slug} href={`/schilders-inhuren/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
              <Link href="/#werkgebied" style={{ color: 'var(--oranje-donker)' }}>
                Bekijk de kaart →
              </Link>
            </div>
          </div>

          <div className="nav__item">
            <Link href="/blog" className="nav__link">
              Nieuws
            </Link>
          </div>

          <div className="nav__item">
            <Link href="/over-ons" className="nav__link">
              Over ons
            </Link>
          </div>
        </nav>

        <div className="header__acties">
          <a className="header__tel" href="tel:+31613718172">
            ☎ 06 - 137 181 72
          </a>
          <Link href="/inschrijven" className="btn btn--secundair btn--klein">
            Inschrijven
          </Link>
          <Link href="/aanvraag" className="btn btn--primair btn--klein">
            Schilders aanvragen
          </Link>
          <button
            className="hamburger"
            aria-expanded={open}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobielmenu${open ? ' open' : ''}`}>
        <div className="drop__kop">Voor opdrachtgevers — ik zoek schilders</div>
        <Link href="/schilders-inhuren">Schilders inhuren</Link>
        <Link href="/voor-woningcorporaties">Woningcorporaties</Link>
        <Link href="/voor-aannemers">Aannemers &amp; onderhoudsbedrijven</Link>
        <Link href="/vastgoedonderhoud-en-rgs">Vastgoedonderhoud &amp; RGS</Link>

        <div className="drop__kop">Voor schilders — ik zoek werk</div>
        <Link href="/vacatures">Vacatures {vacatureCount > 0 ? `(${vacatureCount})` : ''}</Link>
        <Link href="/soorten-schilders">Soorten schilders</Link>
        <Link href="/inschrijven">Inschrijven</Link>
        <a href="http://deflexschilder.onlineuur.nl/" target="_blank" rel="noreferrer">
          Uren doorgeven
        </a>

        <div className="drop__kop">Locaties — Noord-Nederland</div>
        <div className="mobielmenu__kolommen">
          {CITIES.map((c) => (
            <Link key={c.slug} href={`/schilders-inhuren/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>

        <div className="drop__kop">De Flexschilder</div>
        <Link href="/blog">Nieuws</Link>
        <Link href="/over-ons">Over ons</Link>

        <div className="mobielmenu__acties">
          <Link href="/aanvraag" className="btn btn--primair">
            Schilders aanvragen
          </Link>
          <Link href="/inschrijven" className="btn btn--secundair">
            Inschrijven als schilder
          </Link>
          <a className="header__tel" href="tel:+31613718172" style={{ display: 'block', textAlign: 'center' }}>
            ☎ 06 - 137 181 72
          </a>
        </div>
      </div>
    </header>
  );
}
