import Link from 'next/link';

// Footer zoals live (LICHT grijs, contact + wit backoffice-kaartje met certs,
// logo onderin) — beter gestructureerd per doelgroep. Locaties zitten bewust
// in het hoofdmenu, niet hier (Tim 03-07).
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__contact">
            <h4>Contact gegevens</h4>
            <ul>
              <li><a href="tel:+31613718172">☎ 06 - 137 181 72</a></li>
              <li><a href="mailto:andre@deflexschilder.nl">✉ andre@deflexschilder.nl</a></li>
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
            <Link href="/aanvraag" className="btn btn--primair btn--klein">
              Contact opnemen
            </Link>
          </div>

          <div>
            <h4>Voor opdrachtgevers</h4>
            <ul>
              <li><Link href="/schilders-inhuren">Schilders inhuren</Link></li>
              <li><Link href="/voor-woningcorporaties">Woningcorporaties</Link></li>
              <li><Link href="/voor-aannemers">Aannemers &amp; onderhoud</Link></li>
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
              <li><Link href="/blog">Nieuws &amp; vakkennis</Link></li>
            </ul>
          </div>

          <div className="footer__backoffice">
            <strong>Gecertificeerd &amp; aangesloten</strong>
            <p style={{ marginTop: 4 }}>
              SNA-keurmerk · VCU-gecertificeerd · ABU-lid. Backoffice door Flexsupport.
            </p>
            <div className="certs">
              <img src="/SNA-1-1.svg" alt="SNA-keurmerk" />
              <img src="/vcu-2-1.svg" alt="VCU-certificering" />
              <img src="/abu-1-1.svg" alt="ABU-lid" />
            </div>
          </div>
        </div>

        <div className="footer__onder">
          <img src="/branding_flexschilder.svg" alt="De Flexschilder" width={150} height={43} />
          <span>© 2026 — De Flexschilder · vakmensen door vakmensen</span>
          <span>Algemene voorwaarden · Privacybeleid (volgt bij livegang)</span>
        </div>
      </div>
    </footer>
  );
}
