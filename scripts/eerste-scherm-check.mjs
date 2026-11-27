// Zelftoets van het EERSTE SCHERM: staat de allround schilder erop zonder te scrollen, op de
// telefoon (390 x 844) en op de desktop (1280 x 800)? André 27-11: allround is "the thing you
// want to show first", en wat een bezoeker eerst ziet is het eerste scherm.
//
//   node scripts/eerste-scherm-check.mjs <adres> [--fotos <map>]
//
// Per breedte, zonder scrollen gemeten:
//   - de home: het eerste pad in de hero, "Allround schilder aanvragen", staat heel op het scherm;
//   - elke /schilders-inhuren/<stad>: de eerste knop in de kop, "Allround schilder aanvragen in
//     <stad>", staat heel op het scherm;
//   - elke /vacatures/schilder-<stad>: de kop van het allround blok begint op het scherm;
//   - geen pagina schuift zijwaarts.
// Met --fotos bewaart hij per pagina en breedte het eerste scherm en de hele pagina.
// Een browser is nodig: zie scripts/cdp.mjs (CHROME=<pad> als hij er geen vindt).
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { start } from './cdp.mjs';
import { Teller, laad } from './lib-laden.mjs';

const basis = process.argv[2];
if (!basis) { console.log('gebruik: node scripts/eerste-scherm-check.mjs <adres> [--fotos <map>]'); process.exit(2); }
const fi = process.argv.indexOf('--fotos');
const fotos = fi > 0 ? process.argv[fi + 1] : null;
if (fotos) mkdirSync(fotos, { recursive: true });

const { CITIES } = await laad('geo.js');
const t = new Teller('eerste-scherm-check');
const pagina_s = [
  ['/', 'home', `document.querySelector('.hero__paden a')`, 'Allround schilder aanvragen'],
  ...CITIES.map((c) => [`/schilders-inhuren/${c.slug}`, 'inhuren', `document.querySelector('.paginakop a.btn--primair')`, `Allround schilder aanvragen in ${c.name}`]),
  ...CITIES.map((c) => [`/vacatures/schilder-${c.slug}`, 'vacatures', `document.querySelector('.allround .allround__kop')`, `Allround schilder in en rond ${c.name}`]),
];

const b = await start();
try {
  for (const [breed, hoog, mobiel] of [[390, 844, true], [1280, 800, false]]) {
    const p = await b.pagina({ breed, hoog, mobiel });
    for (const [pad, soort, kies, tekst] of pagina_s) {
      try {
        await p.open(new URL(pad, basis).href);
        const m = await p.meet(`(() => { scrollTo(0, 0); const e = ${kies}; const r = e && e.getBoundingClientRect();
          return { tekst: e ? e.textContent.replace(/\\s+/g, ' ').trim() : null, href: e && e.getAttribute('href'),
            boven: r && Math.round(r.top), onder: r && Math.round(r.bottom), hoog: innerHeight,
            zijwaarts: document.documentElement.scrollWidth > innerWidth }; })()`);
        const hoe = `${breed} breed`;
        if (soort === 'vacatures') {
          t.toets(m.tekst === tekst && m.boven >= 0 && m.boven < m.hoog - 40, `${pad} (${hoe}): de kop "${tekst}" begint op het eerste scherm (staat op ${m.boven} van ${m.hoog} px; tekst: ${m.tekst})`);
        } else {
          t.toets(m.tekst?.startsWith(tekst) && /soort=allround/.test(m.href || '') && m.boven >= 0 && m.onder <= m.hoog,
            `${pad} (${hoe}): "${tekst}" staat heel op het eerste scherm (${m.boven} tot ${m.onder} van ${m.hoog} px; tekst: ${m.tekst})`);
        }
        t.toets(!m.zijwaarts, `${pad} (${hoe}): de pagina schuift niet zijwaarts`);
        if (fotos) {
          const naam = (pad === '/' ? 'home' : pad.slice(1).replace(/\//g, '_')) + `-${breed}`;
          await p.foto(path.join(fotos, `${naam}-eerste-scherm.jpg`));
          await p.foto(path.join(fotos, `${naam}-heel.jpg`), { heel: true });
        }
      } catch (e) { t.toets(false, `${pad} (${breed}): ${e.message}`); }
    }
  }
} finally { await b.sluit(); }
t.eind();
