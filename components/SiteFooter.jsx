import Link from 'next/link';
import { CITIES } from '@/lib/geo';

// Betere footer-structuur, zelfde stijl: merk + certificeringen · opdrachtgevers ·
// schilders · contact (echte gegevens van de huidige site) + steden-index.
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__merk">
            <div className="naam">
              De <span>Flexschilder</span>
            </div>
            <p style={{ marginTop: 8, fontSize: 15 }}>
              Vakmensen door vakmensen. Dé schildersspecialist van Noord-Nederland —
              detachering, uitzenden en werving &amp; selectie.
            </p>
            <div className="footer__certs" aria-label="Certificeringen">
              <span className="cert"><img src="/SNA-1-1.svg" alt="SNA-keurmerk" /></span>
              <span className="cert"><img src="/vcu-2-1.svg" alt="VCU-certificering" /></span>
              <span className="cert"><img src="/abu-1-1.svg" alt="ABU-lid" /></span>
            </div>
          </div>

          <div>
            <h4>Voor opdrachtgevers</h4>
            <ul>
              <li><Link href="/schilders-inhuren">Schilders inhuren</Link></li>
              <li><Link href="/schilders-inhuren#detachering">Detachering</Link></li>
              <li><Link href="/schilders-inhuren#uitzenden">Uitzenden</Link></li>
              <li><Link href="/schilders-inhuren#werving-selectie">Werving &amp; selectie</Link></li>
              <li><Link href="/vastgoedonderhoud-en-rgs">Vastgoedonderhoud &amp; RGS</Link></li>
              <li><Link href="/aanvraag">Schilders aanvragen</Link></li>
            </ul>
          </div>

          <div>
            <h4>Voor schilders</h4>
            <ul>
              <li><Link href="/vacatures">Alle vacatures</Link></li>
              <li><Link href="/soorten-schilders">Soorten schilders</Link></li>
              <li><Link href="/inschrijven">Inschrijven</Link></li>
              <li>
                <a href="http://deflexschilder.onlineuur.nl/" target="_blank" rel="noreferrer">
                  Uren doorgeven
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+31613718172">06 - 137 181 72</a></li>
              <li><a href="mailto:andre@deflexschilder.nl">andre@deflexschilder.nl</a></li>
              <li>
                <a href="https://wa.me/31613718172" target="_blank" rel="noreferrer">
                  Stuur een WhatsApp
                </a>
              </li>
              <li style={{ marginTop: 8 }}>
                Oldemarktseweg 74
                <br />
                8341 SH Steenwijkerwold
              </li>
              <li>KvK: 83856323</li>
            </ul>
          </div>
        </div>

        <div className="footer__steden">
          <strong style={{ color: '#fff' }}>Werkgebied Noord-Nederland: </strong>
          {CITIES.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/schilders-inhuren/${c.slug}`}>Schilders inhuren {c.name}</Link>
              {i < CITIES.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>

        <div className="footer__onder">
          <span>© 2026 De Flexschilder — vakmensen door vakmensen</span>
          <span>Algemene voorwaarden · Privacybeleid (volgt bij livegang)</span>
        </div>
      </div>
    </footer>
  );
}
