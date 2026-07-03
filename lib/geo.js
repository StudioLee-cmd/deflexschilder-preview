// Geo-laag van de preview: 15 stad-hoofdpagina's (Noord-NL, Zwolle en noordelijker)
// + een plaats→dichtstbijzijnde-stad mapping op coördinaten. Bewust GEEN externe
// geo-API: de lijst hieronder ís de dekking (klein dorp getypt → dichtstbijzijnde
// grote stad, met de km-afstand zichtbaar).

// De 15 stad-hoofdpagina's (Tier 1 + grootste Tier 2 uit de kennisbank).
export const CITIES = [
  { slug: 'groningen',   name: 'Groningen',   lat: 53.2194, lng: 6.5665, provincie: 'Groningen',  blurb: 'De grootste stad van het Noorden. Veel corporatiebezit en een doorlopende stroom mutatie- en planmatig onderhoud — hier telt capaciteit die je snel op- en afschaalt.' },
  { slug: 'leeuwarden',  name: 'Leeuwarden',  lat: 53.2012, lng: 5.7999, provincie: 'Friesland',  blurb: 'Hoofdstad van Friesland. Corporaties en VvE-beheerders met flinke portefeuilles, van binnenstadspanden tot naoorlogse wijken.' },
  { slug: 'assen',       name: 'Assen',       lat: 52.9967, lng: 6.5625, provincie: 'Drenthe',    blurb: 'Compacte Drentse hoofdstad. Planmatig onderhoud voor corporaties en zorgvastgoed, met korte lijnen naar de hele provincie.' },
  { slug: 'emmen',       name: 'Emmen',       lat: 52.7850, lng: 6.8950, provincie: 'Drenthe',    blurb: 'De grootste plaats van Zuidoost-Drenthe. Series rijwoningen uit de jaren zestig tot tachtig — schilderwerk in volume, precies waar flexibele capaciteit rendeert.' },
  { slug: 'zwolle',      name: 'Zwolle',      lat: 52.5168, lng: 6.0830, provincie: 'Overijssel', blurb: 'Onze zuidgrens en het knooppunt van de regio. Grote aannemers en onderhoudsbedrijven die pieken moeten opvangen zonder vaste loonkosten.' },
  { slug: 'drachten',    name: 'Drachten',    lat: 53.1122, lng: 6.0989, provincie: 'Friesland',  blurb: 'De werkplaats van Zuidoost-Friesland. Industrie en corporatiebezit dicht bij elkaar — binnen- én buitenschilderwerk het hele jaar door.' },
  { slug: 'heerenveen',  name: 'Heerenveen',  lat: 52.9602, lng: 5.9195, provincie: 'Friesland',  blurb: 'Centraal in Friesland, snel geschakeld naar Joure, Wolvega en Sneek. Sterke mix van bedrijfspanden en corporatiewoningen.' },
  { slug: 'hoogeveen',   name: 'Hoogeveen',   lat: 52.7221, lng: 6.4866, provincie: 'Drenthe',    blurb: 'Bedrijvig Drents knooppunt aan de A28 en A37. Series rijwoningen en mkb-bedrijfspanden — werk dat om planning en tempo vraagt.' },
  { slug: 'meppel',      name: 'Meppel',      lat: 52.6951, lng: 6.1940, provincie: 'Drenthe',    blurb: 'De poort van Drenthe, met korte lijnen naar Steenwijk en Staphorst. Veel onderhoudsbedrijven en aannemers in een compacte regio.' },
  { slug: 'sneek',       name: 'Sneek',       lat: 53.0319, lng: 5.6583, provincie: 'Friesland',  blurb: 'Hart van de Friese meren. VvE’s, recreatievastgoed en historische panden — buitenschilderwerk waar vakkennis het verschil maakt.' },
  { slug: 'kampen',      name: 'Kampen',      lat: 52.5550, lng: 5.9114, provincie: 'Overijssel', blurb: 'Historische binnenstad met veel monumentaal schilderwerk, korte lijnen naar Zwolle en de polder.' },
  { slug: 'stadskanaal', name: 'Stadskanaal', lat: 52.9893, lng: 6.9506, provincie: 'Groningen',  blurb: 'Centrum van de Kanaalstreek. Veel naoorlogse rijwoningen in corporatiebezit — planmatig onderhoud in series.' },
  { slug: 'hardenberg',  name: 'Hardenberg',  lat: 52.5758, lng: 6.6194, provincie: 'Overijssel', blurb: 'Groeigemeente in het Vechtdal met actieve aannemers en onderhoudsbedrijven — van nieuwbouw-afwerking tot planmatig onderhoud.' },
  { slug: 'veendam',     name: 'Veendam',     lat: 53.1067, lng: 6.8752, provincie: 'Groningen',  blurb: 'Kern van de Veenkoloniën. Corporatiebezit en mkb-bedrijfspanden, met de hele Oost-Groningse regio binnen handbereik.' },
  { slug: 'winschoten',  name: 'Winschoten',  lat: 53.1427, lng: 7.0344, provincie: 'Groningen',  blurb: 'Het centrum van Oost-Groningen. Corporaties en zorgvastgoed, dicht op de Duitse grens — een regio waar lokale aanwezigheid telt.' },
];

// Plaatsen zonder eigen pagina → mappen naar de dichtstbijzijnde stad hierboven.
// (Tier 2/3-restant uit de kennisbank + de gangbare kernen in het werkgebied.)
export const PLACES = [
  // Friesland
  { name: 'Harlingen', lat: 53.1746, lng: 5.4204 },
  { name: 'Franeker', lat: 53.1874, lng: 5.5403 },
  { name: 'Dokkum', lat: 53.3272, lng: 5.9986 },
  { name: 'Wolvega', lat: 52.8756, lng: 5.9928 },
  { name: 'Joure', lat: 52.9633, lng: 5.8000 },
  { name: 'Lemmer', lat: 52.8464, lng: 5.7106 },
  { name: 'Bolsward', lat: 53.0644, lng: 5.5217 },
  { name: 'Grou', lat: 53.0942, lng: 5.8378 },
  { name: 'Burgum', lat: 53.1919, lng: 5.9922 },
  { name: 'Surhuisterveen', lat: 53.1861, lng: 6.1703 },
  { name: 'Gorredijk', lat: 53.0067, lng: 6.0631 },
  { name: 'Oosterwolde', lat: 53.0069, lng: 6.2917 },
  { name: 'Stiens', lat: 53.2622, lng: 5.7583 },
  { name: 'Sint Annaparochie', lat: 53.2772, lng: 5.6572 },
  { name: 'Kollum', lat: 53.2769, lng: 6.1544 },
  { name: 'Buitenpost', lat: 53.2519, lng: 6.1453 },
  { name: 'Makkum', lat: 53.0561, lng: 5.4028 },
  { name: 'Workum', lat: 52.9800, lng: 5.4467 },
  { name: 'Heeg', lat: 52.9700, lng: 5.6100 },
  { name: 'Akkrum', lat: 53.0500, lng: 5.8400 },
  // Groningen
  { name: 'Delfzijl', lat: 53.3306, lng: 6.9223 },
  { name: 'Appingedam', lat: 53.3217, lng: 6.8583 },
  { name: 'Hoogezand', lat: 53.1630, lng: 6.7625 },
  { name: 'Zuidhorn', lat: 53.2481, lng: 6.4069 },
  { name: 'Leek', lat: 53.1622, lng: 6.3758 },
  { name: 'Haren', lat: 53.1725, lng: 6.6047 },
  { name: 'Bedum', lat: 53.3008, lng: 6.6008 },
  { name: 'Winsum', lat: 53.3306, lng: 6.5150 },
  { name: 'Ter Apel', lat: 52.8767, lng: 7.0592 },
  { name: 'Musselkanaal', lat: 52.9406, lng: 7.0264 },
  { name: 'Oude Pekela', lat: 53.1050, lng: 6.9958 },
  { name: 'Scheemda', lat: 53.1717, lng: 6.9722 },
  { name: 'Uithuizen', lat: 53.4092, lng: 6.6725 },
  { name: 'Grootegast', lat: 53.2122, lng: 6.2622 },
  // Drenthe
  { name: 'Roden', lat: 53.1372, lng: 6.4214 },
  { name: 'Peize', lat: 53.1467, lng: 6.4986 },
  { name: 'Zuidlaren', lat: 53.0947, lng: 6.6867 },
  { name: 'Eelde', lat: 53.1300, lng: 6.5617 },
  { name: 'Vries', lat: 53.0764, lng: 6.5817 },
  { name: 'Gieten', lat: 53.0086, lng: 6.7614 },
  { name: 'Borger', lat: 52.9236, lng: 6.7936 },
  { name: 'Beilen', lat: 52.8622, lng: 6.5119 },
  { name: 'Westerbork', lat: 52.8514, lng: 6.6083 },
  { name: 'Smilde', lat: 52.9550, lng: 6.4600 },
  { name: 'Dwingeloo', lat: 52.8342, lng: 6.3706 },
  { name: 'Diever', lat: 52.8558, lng: 6.3186 },
  { name: 'Havelte', lat: 52.7728, lng: 6.2364 },
  { name: 'Ruinen', lat: 52.7614, lng: 6.3542 },
  { name: 'Zuidwolde', lat: 52.6667, lng: 6.4239 },
  { name: 'Coevorden', lat: 52.6613, lng: 6.7405 },
  { name: 'Klazienaveen', lat: 52.7267, lng: 6.9903 },
  { name: 'Nieuw-Amsterdam', lat: 52.7194, lng: 6.8481 },
  // Kop van Overijssel / rand
  { name: 'Steenwijk', lat: 52.7853, lng: 6.1191 },
  { name: 'Vollenhove', lat: 52.6800, lng: 5.9500 },
  { name: 'Zwartsluis', lat: 52.6392, lng: 6.0736 },
  { name: 'Genemuiden', lat: 52.6258, lng: 6.0367 },
  { name: 'Hasselt', lat: 52.5919, lng: 6.0942 },
  { name: 'Staphorst', lat: 52.6450, lng: 6.2100 },
  { name: 'Nieuwleusen', lat: 52.5789, lng: 6.2822 },
  { name: 'Dalfsen', lat: 52.5122, lng: 6.2589 },
  { name: 'Ommen', lat: 52.5217, lng: 6.4206 },
  { name: 'Dedemsvaart', lat: 52.6042, lng: 6.4611 },
  { name: 'Balkbrug', lat: 52.6017, lng: 6.3894 },
  { name: 'IJsselmuiden', lat: 52.5622, lng: 5.9214 },
  { name: 'Gramsbergen', lat: 52.6119, lng: 6.6858 },
  { name: 'Slagharen', lat: 52.6236, lng: 6.5589 },
  { name: 'Emmeloord', lat: 52.7108, lng: 5.7480 },
  { name: 'Urk', lat: 52.6622, lng: 5.6015 },
];

// Afstand in km (haversine).
export function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function normalize(q) {
  return (q || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function getCity(slug) {
  return CITIES.find((c) => c.slug === slug) || null;
}

// Zoek-resolutie: stad → direct; bekend dorp → dichtstbijzijnde stad + km; anders null.
export function resolvePlace(query) {
  const q = normalize(query);
  if (!q) return null;
  const city = CITIES.find((c) => normalize(c.name) === q);
  if (city) return { type: 'city', city };
  const place = PLACES.find((p) => normalize(p.name) === q);
  if (place) {
    const nearest = nearestCity(place);
    return { type: 'mapped', place, city: nearest.city, km: nearest.km };
  }
  // prefix-match als vangnet (bv. "wolveg")
  const cityPre = CITIES.find((c) => normalize(c.name).startsWith(q) && q.length >= 3);
  if (cityPre) return { type: 'city', city: cityPre };
  const placePre = PLACES.find((p) => normalize(p.name).startsWith(q) && q.length >= 3);
  if (placePre) {
    const nearest = nearestCity(placePre);
    return { type: 'mapped', place: placePre, city: nearest.city, km: nearest.km };
  }
  return null;
}

export function nearestCity(point) {
  let best = null;
  for (const c of CITIES) {
    const km = haversineKm(point, c);
    if (!best || km < best.km) best = { city: c, km };
  }
  return { city: best.city, km: Math.round(best.km) };
}

export function nearbyCities(city, n = 4) {
  return CITIES.filter((c) => c.slug !== city.slug)
    .map((c) => ({ city: c, km: Math.round(haversineKm(city, c)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, n);
}

// Alle typbare namen (voor de autocomplete van de zoekbalk).
export const ALL_PLACE_NAMES = [
  ...CITIES.map((c) => c.name),
  ...PLACES.map((p) => p.name),
].sort((a, b) => a.localeCompare(b, 'nl'));
