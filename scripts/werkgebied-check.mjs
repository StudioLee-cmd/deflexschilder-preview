// Zelftoets van het werkgebied (lib/geo.js, de vijf regels bovenaan): hoe steden, plaatsen en
// vacatures samenhangen, en dat geen stadspagina een telling van plaatsen of een nul toont.
//
//   node scripts/werkgebied-check.mjs              alleen de data (lib/geo.js en lib/ats.js)
//   node scripts/werkgebied-check.mjs <adres>      ook de pagina's op dat adres: lokaal
//                                                  (http://localhost:3000), een preview of de site
//
// Groen is exit 0 en "alles groen". Elke rode regel zegt wat er stond.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { laad, haal, Teller, REPO } from './lib-laden.mjs';

const geo = await laad('geo.js');
const ats = await laad('ats.js');
const { CITIES, PLACES, WERKGEBIED_KM, citiesFor, belongsTo, werkgebied, getCity, resolvePlace } = geo;
const t = new Teller('werkgebied-check');
const stad = (s) => getCity(s);
const plek = (n) => PLACES.find((p) => p.name === n);
const slugs = (lijst) => lijst.map((x) => x.city.slug);

// --- De data ---
t.toets(new Set(PLACES.map((p) => p.name)).size === PLACES.length, 'data: elke plaats staat één keer in PLACES');
t.toets(WERKGEBIED_KM === 20, `data: het werkgebied is 20 km (staat op ${WERKGEBIED_KM})`);
const leeg = PLACES.filter((p) => citiesFor(p).length === 0).map((p) => p.name);
t.toets(leeg.length === 0, `data: elke plaats hoort bij een stad (zonder stad: ${leeg.join(', ')})`);
// Het werkgebied van elke stad één keer, als set namen: de toetsen hieronder lezen die, zodat de
// toets plaatsen × steden kost en niet plaatsen × plaatsen (review code 27-11).
const namenVan = new Map(CITIES.map((c) => [c.slug, new Set(werkgebied(c).map((x) => x.name))]));
const ergens = new Set([...namenVan.values()].flatMap((s) => [...s]));
const nergens = PLACES.filter((p) => !ergens.has(p.name)).map((p) => p.name);
// De index (lib/geo.js) is gelijk aan opnieuw meten: dezelfde steden voor elke plaats, ook als
// het punt geen plaats uit PLACES is (zo leest een vacature op die plek het).
const anders = PLACES.filter((p) => slugs(citiesFor(p)).join() !== slugs(citiesFor({ lat: p.lat, lng: p.lng })).join()).map((p) => p.name);
t.toets(anders.length === 0, `data: de index geeft elke plaats dezelfde steden als opnieuw meten (anders: ${anders.join(', ')})`);
t.toets(nergens.length === 0, `data: elke plaats staat in het werkgebied van een stad (nergens: ${nergens.join(', ')})`);

// Regel 2: elke stad binnen 20 km.
const hasselt = slugs(citiesFor(plek('Hasselt')));
t.toets(hasselt.includes('zwolle') && hasselt.includes('kampen'), `regel 2: Hasselt hoort bij Zwolle en Kampen (nu: ${hasselt.join(', ')})`);
t.toets(werkgebied(stad('zwolle')).some((p) => p.name === 'Hasselt') && werkgebied(stad('kampen')).some((p) => p.name === 'Hasselt'),
  'regel 2: Hasselt staat in het werkgebied van Zwolle én van Kampen');
const meerdere = PLACES.filter((p) => citiesFor(p).length > 1).length;
t.toets(meerdere > PLACES.length / 2, `regel 2: de meeste plaatsen horen bij meer steden (${meerdere} van ${PLACES.length})`);
for (const c of CITIES) {
  const fout = werkgebied(c).filter((p) => !p.verder && p.km > WERKGEBIED_KM).map((p) => p.name);
  const mist = PLACES.filter((p) => Math.round(geo.haversineKm(c, p)) <= WERKGEBIED_KM && !namenVan.get(c.slug).has(p.name)).map((p) => p.name);
  t.toets(fout.length === 0 && mist.length === 0, `regel 2: ${c.name} draagt precies de plaatsen binnen 20 km (te ver: ${fout.join(', ')}; mist: ${mist.join(', ')})`);
}
// De oude regel (alleen de dichtstbijzijnde stad) gaf Zwolle 3 plaatsen; binnen 20 km zijn het er meer.
t.toets(werkgebied(stad('zwolle')).length > 3, `regel 2: Zwolle draagt meer dan de 3 plaatsen van de oude regel (${werkgebied(stad('zwolle')).length})`);

// Regel 3: verder dan 20 km van elke stad → alleen de dichtstbijzijnde.
t.toets(slugs(citiesFor(plek('Delfzijl'))).join() === 'winschoten', `regel 3: Delfzijl hoort alleen bij Winschoten (nu: ${slugs(citiesFor(plek('Delfzijl'))).join(', ')})`);
t.toets(slugs(citiesFor(plek('Urk'))).join() === 'kampen' && slugs(citiesFor(plek('Emmeloord'))).join() === 'kampen', 'regel 3: Urk en Emmeloord horen bij Kampen');
t.toets(werkgebied(stad('winschoten')).find((p) => p.name === 'Delfzijl')?.verder === true, 'regel 3: Delfzijl staat op Winschoten als plaats verderop');

// Heino: door André genoemd en in de Zwolle-tekst.
t.toets(Boolean(plek('Heino')) && belongsTo(plek('Heino'), stad('zwolle')), 'data: Heino staat erin en hoort bij Zwolle');

// Regel 4: een vacature volgt dezelfde regel als de plaats.
const vac = (naam, p) => ({ slug: naam, titel: naam, plaats: p.name, lat: p.lat, lng: p.lng });
const lijst = PLACES.map((p) => vac(`v-${p.name}`, p));
let gelijk = 0, ongelijk = [];
for (const c of CITIES) {
  const v = new Set(ats.vacaturesVoorStad(lijst, c).map((x) => x.plaats));
  const p = new Set(werkgebied(c).map((x) => x.name));
  if (v.size === p.size && [...p].every((n) => v.has(n))) gelijk++;
  else ongelijk.push(c.name);
}
t.toets(ongelijk.length === 0, `regel 4: op elke stad zijn de vacatures en de plaatsen dezelfde set (${gelijk} van ${CITIES.length}; anders: ${ongelijk.join(', ')})`);
const vh = vac('vacature-hasselt', plek('Hasselt'));
t.toets(ats.vacaturesVoorStad([vh], stad('zwolle')).length === 1 && ats.vacaturesVoorStad([vh], stad('kampen')).length === 1,
  'regel 4: een vacature in Hasselt staat op Zwolle en op Kampen');
const vd = vac('vacature-delfzijl', plek('Delfzijl'));
t.toets(ats.vacaturesVoorStad([vd], stad('winschoten')).length === 1, 'regel 4: een vacature in Delfzijl staat op Winschoten');
t.toets(ats.vacaturesVoorStad([{ slug: 'x', titel: 'x', plaats: 'Heel Nederland', lat: null, lng: null }], stad('zwolle')).length === 0,
  'regel 4: een vacature zonder plek staat op geen stadspagina');
const zw = ats.vacaturesVoorStad([vac('a', plek('Hasselt')), vac('b', plek('Heino'))], stad('zwolle')).map((x) => x.afstandKm);
t.toets(zw.length === 2 && zw[0] <= zw[1], 'regel 4: dichtstbijzijnde vacature eerst');

// Regel 5: de zoekbalk kiest één stad (de dichtstbijzijnde) en kent de andere.
const scheef = PLACES.filter((p) => citiesFor(p)[0].city.slug !== geo.nearestCity(p).city.slug).map((p) => p.name);
t.toets(scheef.length === 0, `regel 5: de eerste stad van elke plaats is de stad die de zoekbalk opent (anders: ${scheef.join(', ')})`);
const r = resolvePlace('Hasselt');
t.toets(r?.city.slug === 'zwolle' && slugs(r.cities).includes('kampen'), 'regel 5: Hasselt opent Zwolle, en weet dat Kampen er ook bij hoort');

// Eén bron voor de straal: geen pagina of blok schrijft hem met de hand (review code 27-11: de home
// schreef "binnen 20 km" terwijl de stadspagina's WERKGEBIED_KM lazen). Commentaar telt niet mee.
const bronnen = (map) => readdirSync(path.join(REPO, map), { recursive: true })
  .filter((f) => /\.(jsx?|mjs)$/.test(f)).map((f) => path.join(map, f));
const metDeHand = new RegExp(`\\b${WERKGEBIED_KM}\\s*(km|kilometer)\\b`, 'i');
const handwerk = [...bronnen('app'), ...bronnen('components')].filter((f) => {
  const code = readFileSync(path.join(REPO, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '');
  return metDeHand.test(code);
});
t.toets(handwerk.length === 0, `bron: de straal staat met de hand in ${handwerk.join(', ')} (lees WERKGEBIED_KM uit lib/geo.js)`);
// De zoekbalk biedt geen afstand meer aan: een stadspagina toont altijd haar werkgebied.
const zoekbalk = readFileSync(path.join(REPO, 'components/ZoekBalk.jsx'), 'utf8');
t.toets(!/name="straal"|straal=/.test(zoekbalk), 'bron: de zoekbalk biedt nog een afstand aan die niets verandert');

// --- De pagina's (alleen met een adres) ---
const basis = process.argv[2];
if (basis) {
  const telling = /\d+\s*(plaatsen onder|kernen onder|kernen eromheen|kernen binnen|plaatsen gedekt|stadspagina)/i;
  for (const c of CITIES) {
    const plaatsen = werkgebied(c);
    for (const [soort, pad] of [['inhuren', `/schilders-inhuren/${c.slug}`], ['vacatures', `/vacatures/schilder-${c.slug}`]]) {
      let pagina;
      try { pagina = await haal(basis, pad); } catch (e) { t.toets(false, `${pad}: ${e.message}`); continue; }
      const { html, tekst } = pagina;
      const m = tekst.match(telling);
      t.toets(!m && !/In totaal vallen/.test(tekst), `${pad}: telt nog plaatsen ("${m ? m[0] : 'In totaal vallen'}")`);
      t.toets(!/\b0 open vacatures/.test(tekst), `${pad}: toont een nul als cijfer ("0 open vacatures")`);
      const genoemd = plaatsen.filter((p) => tekst.includes(`${p.name} · ${p.km} km`)).length;
      t.toets(genoemd === plaatsen.length, `${pad}: ${genoemd} van ${plaatsen.length} plaatsen bij naam`);
      if (soort === 'inhuren') {
        const link = plaatsen.filter((p) => html.includes(`href="/aanvraag?plaats=${encodeURIComponent(p.name)}&stad=${encodeURIComponent(c.name)}&km=${p.km}"`)).length;
        t.toets(link === plaatsen.length, `${pad}: ${link} van ${plaatsen.length} plaatsen openen de aanvraag met die plaats ingevuld`);
        t.toets(/id="werkgebied"/.test(html) && /Zie het werkgebied/.test(tekst), `${pad}: de regel onder de knoppen wijst naar het werkgebied`);
      }
    }
  }
  try {
    const { html, tekst } = await haal(basis, '/');
    t.toets(!/kernen onder|valt onder de dichtstbijzijnde|vallen automatisch onder/.test(tekst), '/: de home zegt nog dat een plaats onder één stad valt');
    t.toets(!/·\s*\d+\s*plaatsen/.test(tekst), '/: de home telt plaatsen per stad');
    t.toets(html.includes('/schilders-inhuren/zwolle?van=Hasselt') && html.includes('/schilders-inhuren/kampen?van=Hasselt'), '/: Hasselt staat in de plaatsenlijst onder Zwolle én Kampen');
    t.toets(!/name="straal"/.test(html), '/: de zoekbalk biedt nog een afstand aan');
    t.toets(tekst.includes(`binnen ${WERKGEBIED_KM} km`) && tekst.includes(`tot ${WERKGEBIED_KM} km eromheen`), `/: de home noemt het werkgebied van ${WERKGEBIED_KM} km`);
  } catch (e) { t.toets(false, `/: ${e.message}`); }
  try {
    const { tekst } = await haal(basis, '/schilders-inhuren');
    t.toets(!/plaatsen gedekt|stadspagina’s in/.test(tekst), '/schilders-inhuren: de strip telt nog pagina\'s of plaatsen');
  } catch (e) { t.toets(false, `/schilders-inhuren: ${e.message}`); }
}

t.eind();
