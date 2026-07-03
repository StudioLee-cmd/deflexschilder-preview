'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Zelfde look als de huidige header (logo links · menu · tel · oranje knop),
// maar met een duidelijke werkgevers/werkzoekenden-splitsing in het menu en
// een echte hamburger-structuur op mobiel.
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="header__logo" aria-label="De Flexschilder — home">
          <img src="/branding_flexschilder.svg" alt="De Flexschilder" width={190} height={55} />
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
              <Link href="/vastgoedonderhoud-en-rgs">Vastgoedonderhoud &amp; RGS</Link>
              <Link href="/aanvraag">Schilders aanvragen</Link>
            </div>
          </div>

          <div className="nav__item">
            <Link href="/vacatures" className="nav__link">
              Voor schilders <span className="pijl">▾</span>
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
              Werkgebied
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
          <Link href="/inschrijven" className="btn btn--secundair">
            Inschrijven
          </Link>
          <Link href="/aanvraag" className="btn btn--primair">
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
        <Link href="/schilders-inhuren#detachering">Detachering</Link>
        <Link href="/schilders-inhuren#uitzenden">Uitzenden</Link>
        <Link href="/schilders-inhuren#werving-selectie">Werving &amp; selectie</Link>
        <Link href="/vastgoedonderhoud-en-rgs">Vastgoedonderhoud &amp; RGS</Link>

        <div className="drop__kop">Voor schilders — ik zoek werk</div>
        <Link href="/vacatures">Vacatures</Link>
        <Link href="/soorten-schilders">Soorten schilders</Link>
        <Link href="/inschrijven">Inschrijven</Link>
        <a href="http://deflexschilder.onlineuur.nl/" target="_blank" rel="noreferrer">
          Uren doorgeven
        </a>

        <div className="drop__kop">De Flexschilder</div>
        <Link href="/#werkgebied">Werkgebied Noord-Nederland</Link>
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
