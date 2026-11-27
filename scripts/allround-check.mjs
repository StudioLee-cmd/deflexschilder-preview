// Zelftoets van "allround voorop" (André 27-11 via Tim: "for the homepage and for the separate
// regions, the all-around painters is the thing you want to show first").
//
//   node scripts/allround-check.mjs              de regel en de volgorde in lib/ats.js en lib/salaris.js
//   node scripts/allround-check.mjs <adres>      ook de home, /vacatures, /soorten-schilders, /tools
//                                                en alle 30 stadspagina's op dat adres
//
// De gevallen hebben de vorm van de echte feed: bij het ATS is `type` de branchenaam van het
// bureau (altijd "schilder") en `functie` leeg; bij André's eigen invoer is `functie` het
// functieveld. Groen is exit 0 en "alles groen".
import { laad, haal, Teller } from './lib-laden.mjs';

const ats = await laad('ats.js');
const salaris = await laad('salaris.js');
const geo = await laad('geo.js');
const { isAllround, allroundEerst, vacaturesVoorStad } = ats;
const t = new Teller('allround-check');

const BRANCHE = 'Schilders- en onderhoudsbedrijven';
const live = (titel) => ({ slug: titel, titel, type: BRANCHE, functie: '' });
const eigen = (titel, functie) => ({ slug: titel, titel, type: functie || titel, functie: functie || '' });
const demo = (titel) => ({ slug: titel, titel, type: titel, functie: titel });

// --- Wie is allround ---
const ja = [
  ['demo', demo('Allround schilder')],
  ['live', live('Allround schilder Regio Zwolle')],
  ['live', live('Allround onderhoudsschilder Regio Assen')],
  ['live', live('All-round schilder Groningen')],
  ['eigen invoer', eigen('Vakman', 'Allround schilder')],
];
const nee = [
  ['live', live('Allround houtrotspecialist Regio Zwolle')],
  ['live', live('Allround medewerker glaswerk')],
  ['live', live('Allround glaszetter')],
  ['live', live('Allround spuiter')],
  ['live', live('Allround stukadoor')],
  ['live', live('Allround vakman')],
  ['live', live('Allround leerling schilder')],
  ['live', live('Onderhoudsschilder Regio Zwolle')],
  ['live', { slug: 'v', titel: 'Vakman', type: 'Allround schilder', functie: '' }],
  ['eigen invoer', eigen('Allround vakman', 'Glaszetter')],
  ['demo', demo('Leerling schilder (BBL)')],
  ['demo', demo('Spuiter')],
];
for (const [vorm, v] of ja) t.toets(isAllround(v) === true, `regel: "${v.titel}" (${vorm}${v.functie ? `, functie ${v.functie}` : ''}) is een allround schilder`);
for (const [vorm, v] of nee) t.toets(isAllround(v) === false, `regel: "${v.titel}" (${vorm}${v.type !== v.titel ? `, type ${v.type}` : ''}) is géén allround schilder`);

// --- De volgorde ---
const lijst = [live('Onderhoudsschilder A'), live('Allround schilder B'), live('Spuiter C'), live('Allround schilder D')];
const volg = allroundEerst(lijst).map((v) => v.titel);
t.toets(volg.join('|') === 'Allround schilder B|Allround schilder D|Onderhoudsschilder A|Spuiter C', `volgorde: allround eerst, elke groep in zijn eigen volgorde (nu: ${volg.join(', ')})`);
const zwolle = geo.getCity('zwolle');
const plek = (n) => geo.PLACES.find((p) => p.name === n);
const opPlek = (v, n) => ({ ...v, plaats: n, lat: plek(n).lat, lng: plek(n).lng });
const stad = vacaturesVoorStad([opPlek(live('Onderhoudsschilder Hasselt'), 'Hasselt'), opPlek(live('Allround schilder Heino'), 'Heino')], zwolle);
t.toets(stad[0]?.titel === 'Allround schilder Heino' && stad[0].afstandKm > stad[1].afstandKm,
  'volgorde: op een stadspagina staat een allround vacature verder weg vóór ander werk dichterbij');
const feed = await ats.getAtsAdapter().getVacatures();
const eersteNiet = feed.findIndex((v) => !isAllround(v));
const laatsteWel = feed.map(isAllround).lastIndexOf(true);
t.toets(laatsteWel === -1 || eersteNiet === -1 || laatsteWel < eersteNiet, 'volgorde: getVacatures geeft de allround vacatures eerst');

// --- De soorten ---
t.toets(salaris.SOORTEN[0]?.naam === 'Allround schilder', `soorten: de allround schilder staat eerst (nu: ${salaris.SOORTEN[0]?.naam})`);
t.toets(salaris.SOORTEN.length === salaris.SCHILDER_TYPES.length, 'soorten: SOORTEN heeft alle soorten van de loonladder');
t.toets(salaris.SCHILDER_TYPES[0].naam === 'Leerling schilder', 'soorten: de loonladder zelf begint nog bij de leerling');
t.toets(salaris.OVERIGE_IN_ZIN === 'leerling schilder, Schilder 1 & 2, voorman/teamleider en industrieel schilder', `soorten: de andere soorten in een zin (nu: ${salaris.OVERIGE_IN_ZIN})`);
t.toets(salaris.ALLROUND.min > 0 && salaris.ALLROUND.max > salaris.ALLROUND.min, 'soorten: het cao-loon van de allround schilder staat erin');

// --- De pagina's (alleen met een adres) ---
const basis = process.argv[2];
const titels = (html) => [...html.matchAll(/class="vacature__titel">([^<]*)/g)].map((m) => m[1].trim());
const deel = (html, van, tot) => {
  const a = html.indexOf(van);
  if (a < 0) return '';
  const b = tot ? html.indexOf(tot, a + van.length) : -1;
  return html.slice(a, b < 0 ? undefined : b);
};
// Het eerste <section> na de kop (paginakop of hero).
const naKop = (html, kop) => {
  const a = html.indexOf(`<section class="${kop}`);
  const b = html.indexOf('</section>', a);
  return (html.slice(b).match(/<section[^>]*>/) || [''])[0];
};

if (basis) {
  try {
    const { html } = await haal(basis, '/');
    const hero = deel(html, '<section class="hero', '</section>');
    const paden = [...deel(hero, 'hero__paden', '</div>').matchAll(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)/g)];
    t.toets(paden[0]?.[1] === '/aanvraag?soort=allround' && /Allround schilder aanvragen/.test(paden[0]?.[2]),
      `/: in de hero (het eerste scherm) staat als eerste pad "Allround schilder aanvragen" (nu: ${paden[0]?.[2] || 'geen'})`);
    t.toets(/class="allround"/.test(naKop(html, 'hero')), '/: het allround blok staat direct onder de hero');
    t.toets(/Allround schilders inhuren/.test(deel(html, 'class="allround"', '</section>')) && /Allround schilder</.test(deel(html, 'class="allround"', '</section>')),
      '/: het blok heeft de bedrijvenkant en de schilderskant');
    t.toets(/Allround schilder voorop, dan leerling/.test(html), '/: de kaart "Soorten schilders" zet allround voorop');
  } catch (e) { t.toets(false, `/: ${e.message}`); }

  for (const c of geo.CITIES) {
    const pad = `/schilders-inhuren/${c.slug}`;
    try {
      const { html } = await haal(basis, pad);
      const kop = deel(html, '<section class="paginakop', '</section>');
      const knop = kop.match(/<a class="btn btn--primair" href="([^"]*)">([^<]*)/);
      const verwacht = `/aanvraag?soort=allround&plaats=${encodeURIComponent(c.name)}&stad=${encodeURIComponent(c.name)}`;
      t.toets(knop && knop[1].replace(/\+/g, '%20') === verwacht && knop[2].trim() === `Allround schilder aanvragen in ${c.name}`,
        `${pad}: de eerste knop in de kop is "Allround schilder aanvragen in ${c.name}" (nu: ${knop ? knop[2].trim() : 'geen'})`);
      t.toets(/class="allround"/.test(naKop(html, 'paginakop')), `${pad}: het allround blok staat direct onder de kop`);
      const werk = titels(deel(html, 'Werk als schilder rond', '</section>'));
      const i = werk.findIndex((x) => !isAllround({ titel: x })), j = werk.map((x) => isAllround({ titel: x })).lastIndexOf(true);
      t.toets(j === -1 || i === -1 || j < i, `${pad}: in "Werk als schilder" staan de allround vacatures eerst (${werk.join(', ')})`);
    } catch (e) { t.toets(false, `${pad}: ${e.message}`); }

    const vpad = `/vacatures/schilder-${c.slug}`;
    try {
      const { html } = await haal(basis, vpad);
      t.toets(/class="allround"/.test(naKop(html, 'paginakop')), `${vpad}: het allround blok staat direct onder de kop`);
      const blok = titels(deel(html, 'class="allround"', '</section>'));
      t.toets(blok.every((x) => isAllround({ titel: x })), `${vpad}: in het allround blok staan alleen allround vacatures (${blok.join(', ')})`);
      const ander = titels(deel(html, 'Ander werk in en rond', '</section>'));
      t.toets(!ander.some((x) => isAllround({ titel: x })), `${vpad}: onder "Ander werk" staat geen allround vacature`);
      t.toets(!/\b0 (open )?(allround )?vacatures?\b/.test(deel(html, 'class="allround"', '</section>')), `${vpad}: het blok toont geen nul`);
    } catch (e) { t.toets(false, `${vpad}: ${e.message}`); }
  }

  try {
    const { html } = await haal(basis, '/vacatures');
    const a = html.indexOf('id="allround"'), b = html.indexOf('>Ander werk');
    t.toets(a > 0, '/vacatures: de groep "Allround schilder" met anker #allround staat er altijd');
    t.toets(a > 0 && (b < 0 || a < b), '/vacatures: de allround groep staat boven "Ander werk"');
    const ander = titels(deel(html, '>Ander werk', '</section>'));
    t.toets(!ander.some((x) => isAllround({ titel: x })), '/vacatures: onder "Ander werk" staat geen allround vacature');
  } catch (e) { t.toets(false, `/vacatures: ${e.message}`); }

  try {
    const { html } = await haal(basis, '/soorten-schilders');
    const eerste = (html.match(/<div[^>]*class="kaartje[^"]*"[^>]*>(?:(?!<h3).)*<h3>([^<]*)/s) || [])[1];
    t.toets(eerste === 'Allround schilder', `/soorten-schilders: eerste soort: ${eerste}`);
    t.toets(/id="allround"/.test(html) && /Meest gevraagd/.test(html), '/soorten-schilders: de allround kaart heeft anker #allround en "Meest gevraagd"');
    t.toets(/Allround voorop/.test(deel(html, '<section class="paginakop', '</section>')), '/soorten-schilders: de kicker zet allround voorop');
  } catch (e) { t.toets(false, `/soorten-schilders: ${e.message}`); }

  try {
    const { html } = await haal(basis, '/tools');
    const opties = [...html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>/g)].map((m) => m[1]);
    t.toets(opties[0] === 'Allround schilder', `/tools: de salarischecker begint bij de allround schilder (nu: ${opties[0]})`);
    t.toets(/<option[^>]*value="Allround schilder"[^>]*selected/.test(html) || /<select[^>]*>[^]*?<option selected="" value="Allround schilder"/.test(html),
      '/tools: de salarischecker opent op de allround schilder');
  } catch (e) { t.toets(false, `/tools: ${e.message}`); }
}

t.eind();
