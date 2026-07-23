// Geo-laag van de preview: 15 stad-hoofdpagina's (Noord-NL, Zwolle en noordelijker)
// + een plaats→dichtstbijzijnde-stad mapping op coördinaten. Bewust GEEN externe
// geo-API: de lijst hieronder ís de dekking (klein dorp getypt → dichtstbijzijnde
// grote stad, met de km-afstand zichtbaar).

// De 15 stad-hoofdpagina's (Tier 1 + grootste Tier 2 uit de kennisbank).
export const CITIES = [
  { slug: 'groningen',   name: 'Groningen',   lat: 53.2194, lng: 6.5665, provincie: 'Groningen',  blurb: 'De grootste stad van het Noorden. Veel bedrijfspanden en vastgoedbeheer, met een doorlopende stroom mutatie- en planmatig onderhoud — hier telt capaciteit die je snel op- en afschaalt.' },
  { slug: 'leeuwarden',  name: 'Leeuwarden',  lat: 53.2012, lng: 5.7999, provincie: 'Friesland',  blurb: 'Hoofdstad van Friesland. Vastgoedbeheerders en VvE’s met flinke portefeuilles, van binnenstadspanden tot naoorlogse wijken.' },
  { slug: 'assen',       name: 'Assen',       lat: 52.9967, lng: 6.5625, provincie: 'Drenthe',    blurb: 'Compacte Drentse hoofdstad. Planmatig onderhoud voor vastgoedbeheer en zorgvastgoed, met korte lijnen naar de hele provincie.' },
  { slug: 'emmen',       name: 'Emmen',       lat: 52.7850, lng: 6.8950, provincie: 'Drenthe',    blurb: 'De grootste plaats van Zuidoost-Drenthe. Series rijwoningen uit de jaren zestig tot tachtig — schilderwerk in volume, precies waar flexibele capaciteit rendeert.' },
  { slug: 'zwolle',      name: 'Zwolle',      lat: 52.5168, lng: 6.0830, provincie: 'Overijssel', blurb: 'Onze zuidgrens en het knooppunt van de regio. Grote aannemers en onderhoudsbedrijven die pieken moeten opvangen zonder vaste loonkosten.' },
  { slug: 'drachten',    name: 'Drachten',    lat: 53.1122, lng: 6.0989, provincie: 'Friesland',  blurb: 'De werkplaats van Zuidoost-Friesland. Industrie en bedrijfspanden dicht bij elkaar — binnen- én buitenschilderwerk het hele jaar door.' },
  { slug: 'heerenveen',  name: 'Heerenveen',  lat: 52.9602, lng: 5.9195, provincie: 'Friesland',  blurb: 'Centraal in Friesland, snel geschakeld naar Joure, Wolvega en Sneek. Sterke mix van bedrijfspanden en vastgoedbeheer.' },
  { slug: 'hoogeveen',   name: 'Hoogeveen',   lat: 52.7221, lng: 6.4866, provincie: 'Drenthe',    blurb: 'Bedrijvig Drents knooppunt aan de A28 en A37. Series rijwoningen en mkb-bedrijfspanden — werk dat om planning en tempo vraagt.' },
  { slug: 'meppel',      name: 'Meppel',      lat: 52.6951, lng: 6.1940, provincie: 'Drenthe',    blurb: 'De poort van Drenthe, met korte lijnen naar Steenwijk en Staphorst. Veel onderhoudsbedrijven en aannemers in een compacte regio.' },
  { slug: 'sneek',       name: 'Sneek',       lat: 53.0319, lng: 5.6583, provincie: 'Friesland',  blurb: 'Hart van de Friese meren. VvE’s, recreatievastgoed en historische panden — buitenschilderwerk waar vakkennis het verschil maakt.' },
  { slug: 'kampen',      name: 'Kampen',      lat: 52.5550, lng: 5.9114, provincie: 'Overijssel', blurb: 'Historische binnenstad met veel monumentaal schilderwerk, korte lijnen naar Zwolle en de polder.' },
  { slug: 'stadskanaal', name: 'Stadskanaal', lat: 52.9893, lng: 6.9506, provincie: 'Groningen',  blurb: 'Centrum van de Kanaalstreek. Veel naoorlogse woningen en vastgoedbeheer — planmatig onderhoud in series.' },
  { slug: 'hardenberg',  name: 'Hardenberg',  lat: 52.5758, lng: 6.6194, provincie: 'Overijssel', blurb: 'Groeigemeente in het Vechtdal met actieve aannemers en onderhoudsbedrijven — van nieuwbouw-afwerking tot planmatig onderhoud.' },
  { slug: 'veendam',     name: 'Veendam',     lat: 53.1067, lng: 6.8752, provincie: 'Groningen',  blurb: 'Kern van de Veenkoloniën. Vastgoedbeheer en mkb-bedrijfspanden, met de hele Oost-Groningse regio binnen handbereik.' },
  { slug: 'winschoten',  name: 'Winschoten',  lat: 53.1427, lng: 7.0344, provincie: 'Groningen',  blurb: 'Het centrum van Oost-Groningen. Vastgoedbeheer en zorgvastgoed, dicht op de Duitse grens — een regio waar lokale aanwezigheid telt.' },
];

// Plaatsen zonder eigen pagina → mappen naar de dichtstbijzijnde stad hierboven.
// DEKKINGSREGEL (Tim 03-07): élke kern in Noord-NL moet hier staan — een dorp
// typt nooit "onbekend" tenzij het buiten het werkgebied ligt. ~270 kernen over
// Groningen · Friesland · Drenthe · kop van Overijssel · Noordoostpolder.
// Coördinaten zijn benaderd (±2 km) — ruim voldoende om de dichtstbijzijnde
// grote stad te bepalen.
export const PLACES = [
  // — Drenthe (aanvulling: alle grotere kernen) —
  { name: 'Hollandscheveld', lat: 52.6900, lng: 6.5000 },
  { name: 'Elim', lat: 52.6600, lng: 6.5500 },
  { name: 'Nieuwlande', lat: 52.6600, lng: 6.6000 },
  { name: 'Noordscheschut', lat: 52.7500, lng: 6.5300 },
  { name: 'Pesse', lat: 52.7700, lng: 6.4500 },
  { name: 'Tiendeveen', lat: 52.7500, lng: 6.5900 },
  { name: 'De Wijk', lat: 52.6800, lng: 6.2700 },
  { name: 'Koekange', lat: 52.7100, lng: 6.3000 },
  { name: 'Ruinerwold', lat: 52.7300, lng: 6.2400 },
  { name: 'Nijeveen', lat: 52.7200, lng: 6.1400 },
  { name: 'Rolde', lat: 52.9800, lng: 6.6500 },
  { name: 'Gasselte', lat: 52.9700, lng: 6.7500 },
  { name: 'Gasselternijveen', lat: 52.9900, lng: 6.7900 },
  { name: 'Eext', lat: 53.0000, lng: 6.7200 },
  { name: 'Annen', lat: 53.0600, lng: 6.7200 },
  { name: 'Grolloo', lat: 52.9300, lng: 6.6600 },
  { name: 'Norg', lat: 53.0600, lng: 6.4600 },
  { name: 'Veenhuizen', lat: 53.0300, lng: 6.4100 },
  { name: 'Bovensmilde', lat: 52.9700, lng: 6.4700 },
  { name: 'Hoogersmilde', lat: 52.9100, lng: 6.4200 },
  { name: 'Hijken', lat: 52.8900, lng: 6.5000 },
  { name: 'Wijster', lat: 52.8300, lng: 6.5200 },
  { name: 'Spier', lat: 52.8100, lng: 6.4700 },
  { name: 'Vledder', lat: 52.8600, lng: 6.2000 },
  { name: 'Frederiksoord', lat: 52.8500, lng: 6.1700 },
  { name: 'Wilhelminaoord', lat: 52.8400, lng: 6.1500 },
  { name: 'Uffelte', lat: 52.8000, lng: 6.2500 },
  { name: 'Wapserveen', lat: 52.8100, lng: 6.1800 },
  { name: 'Wapse', lat: 52.8400, lng: 6.2500 },
  { name: 'Emmer-Compascuum', lat: 52.8100, lng: 7.0500 },
  { name: 'Nieuw-Weerdinge', lat: 52.8600, lng: 7.0000 },
  { name: 'Zwartemeer', lat: 52.7200, lng: 7.0300 },
  { name: 'Barger-Compascuum', lat: 52.7700, lng: 7.0400 },
  { name: 'Nieuw-Dordrecht', lat: 52.7500, lng: 6.9600 },
  { name: 'Erica', lat: 52.7200, lng: 6.9300 },
  { name: 'Schoonebeek', lat: 52.6600, lng: 6.8800 },
  { name: 'Nieuw-Schoonebeek', lat: 52.6600, lng: 6.9800 },
  { name: 'Oosterhesselen', lat: 52.7500, lng: 6.7700 },
  { name: 'Zweeloo', lat: 52.7900, lng: 6.7300 },
  { name: 'Aalden', lat: 52.7900, lng: 6.7200 },
  { name: 'Sleen', lat: 52.7400, lng: 6.8000 },
  { name: 'Schoonoord', lat: 52.8500, lng: 6.7600 },
  { name: 'Odoorn', lat: 52.8500, lng: 6.8500 },
  { name: 'Exloo', lat: 52.8800, lng: 6.8600 },
  { name: 'Valthe', lat: 52.8600, lng: 6.9200 },
  { name: 'Valthermond', lat: 52.9000, lng: 6.9800 },
  { name: 'Tweede Exloërmond', lat: 52.9200, lng: 6.9300 },
  { name: 'Buinen', lat: 52.9300, lng: 6.8200 },
  { name: 'Nieuw-Buinen', lat: 52.9600, lng: 6.9000 },
  { name: 'Drouwen', lat: 52.9500, lng: 6.8000 },
  { name: 'Dalen', lat: 52.7000, lng: 6.7600 },
  { name: 'Geesbrug', lat: 52.7100, lng: 6.6600 },
  { name: 'Orvelte', lat: 52.8500, lng: 6.6100 },
  { name: 'Tynaarlo', lat: 53.0800, lng: 6.6200 },
  { name: 'Paterswolde', lat: 53.1400, lng: 6.5700 },
  { name: 'Yde', lat: 53.1200, lng: 6.5900 },
  { name: 'Nieuw-Roden', lat: 53.1300, lng: 6.3900 },
  { name: 'Nietap', lat: 53.1500, lng: 6.4000 },
  // — Groningen (aanvulling) —
  { name: 'Sappemeer', lat: 53.1600, lng: 6.7900 },
  { name: 'Slochteren', lat: 53.2200, lng: 6.8000 },
  { name: 'Siddeburen', lat: 53.2500, lng: 6.8700 },
  { name: 'Wagenborgen', lat: 53.2600, lng: 6.9300 },
  { name: 'Loppersum', lat: 53.3300, lng: 6.7500 },
  { name: 'Ten Boer', lat: 53.2800, lng: 6.7000 },
  { name: 'Middelstum', lat: 53.3500, lng: 6.6500 },
  { name: 'Warffum', lat: 53.3900, lng: 6.5600 },
  { name: 'Usquert', lat: 53.4100, lng: 6.6000 },
  { name: 'Uithuizermeeden', lat: 53.4100, lng: 6.7200 },
  { name: 'Roodeschool', lat: 53.4100, lng: 6.7600 },
  { name: 'Zoutkamp', lat: 53.3400, lng: 6.3000 },
  { name: 'Ulrum', lat: 53.3600, lng: 6.3300 },
  { name: 'Leens', lat: 53.3600, lng: 6.3800 },
  { name: 'Eenrum', lat: 53.3600, lng: 6.4600 },
  { name: 'Baflo', lat: 53.3600, lng: 6.5100 },
  { name: 'Sauwerd', lat: 53.2800, lng: 6.5400 },
  { name: 'Aduard', lat: 53.2600, lng: 6.4600 },
  { name: 'Grijpskerk', lat: 53.2600, lng: 6.3000 },
  { name: 'Marum', lat: 53.1400, lng: 6.2600 },
  { name: 'Tolbert', lat: 53.1600, lng: 6.3600 },
  { name: 'Zevenhuizen', lat: 53.1200, lng: 6.3600 },
  { name: 'Glimmen', lat: 53.1400, lng: 6.6100 },
  { name: 'Hoogkerk', lat: 53.2000, lng: 6.5100 },
  { name: 'Zuidbroek', lat: 53.1600, lng: 6.8600 },
  { name: 'Muntendam', lat: 53.1100, lng: 6.8600 },
  { name: 'Meeden', lat: 53.1300, lng: 6.9200 },
  { name: 'Heiligerlee', lat: 53.1500, lng: 6.9900 },
  { name: 'Midwolda', lat: 53.1900, lng: 6.9800 },
  { name: 'Finsterwolde', lat: 53.2000, lng: 7.0800 },
  { name: 'Beerta', lat: 53.1900, lng: 7.0500 },
  { name: 'Bad Nieuweschans', lat: 53.1800, lng: 7.2100 },
  { name: 'Bellingwolde', lat: 53.1100, lng: 7.1600 },
  { name: 'Blijham', lat: 53.1100, lng: 7.0700 },
  { name: 'Wedde', lat: 53.0800, lng: 7.0700 },
  { name: 'Vlagtwedde', lat: 53.0300, lng: 7.1100 },
  { name: 'Sellingen', lat: 52.9500, lng: 7.1500 },
  { name: 'Onstwedde', lat: 53.0200, lng: 7.0400 },
  { name: 'Mussel', lat: 52.9900, lng: 7.0200 },
  { name: 'Nieuwe Pekela', lat: 53.0800, lng: 6.9700 },
  { name: 'Wildervank', lat: 53.0800, lng: 6.8700 },
  { name: 'Kropswolde', lat: 53.1400, lng: 6.7400 },
  { name: 'Niekerk', lat: 53.2200, lng: 6.3500 },
  { name: 'Oldekerk', lat: 53.2100, lng: 6.3400 },
  // — Friesland (aanvulling) —
  { name: 'Drachtstercompagnie', lat: 53.1000, lng: 6.1300 },
  { name: 'Ureterp', lat: 53.1000, lng: 6.1700 },
  { name: 'Beetsterzwaag', lat: 53.0600, lng: 6.0800 },
  { name: 'Bakkeveen', lat: 53.0800, lng: 6.2600 },
  { name: 'Haulerwijk', lat: 53.0700, lng: 6.3200 },
  { name: 'Donkerbroek', lat: 53.0300, lng: 6.2400 },
  { name: 'Appelscha', lat: 52.9500, lng: 6.3500 },
  { name: 'Noordwolde', lat: 52.8900, lng: 6.1300 },
  { name: 'De Westereen', lat: 53.2500, lng: 6.0400 },
  { name: 'Damwâld', lat: 53.2900, lng: 5.9900 },
  { name: 'Feanwâlden', lat: 53.2300, lng: 5.9900 },
  { name: 'Hurdegaryp', lat: 53.2100, lng: 5.9400 },
  { name: 'Gytsjerk', lat: 53.2500, lng: 5.8600 },
  { name: 'Hallum', lat: 53.3000, lng: 5.7100 },
  { name: 'Ferwert', lat: 53.3400, lng: 5.7200 },
  { name: 'Holwerd', lat: 53.3700, lng: 5.9000 },
  { name: 'Menaam', lat: 53.2200, lng: 5.6600 },
  { name: 'Dronryp', lat: 53.1900, lng: 5.6500 },
  { name: 'Wommels', lat: 53.1100, lng: 5.5900 },
  { name: 'Witmarsum', lat: 53.1000, lng: 5.4700 },
  { name: 'Sexbierum', lat: 53.2200, lng: 5.4800 },
  { name: 'Minnertsga', lat: 53.2500, lng: 5.5800 },
  { name: 'Sint Jacobiparochie', lat: 53.2800, lng: 5.6100 },
  { name: 'Koudum', lat: 52.9100, lng: 5.4500 },
  { name: 'Balk', lat: 52.9000, lng: 5.5800 },
  { name: 'Sloten', lat: 52.9000, lng: 5.6500 },
  { name: 'IJlst', lat: 53.0100, lng: 5.6200 },
  { name: 'Sint Nicolaasga', lat: 52.9300, lng: 5.7500 },
  { name: 'Echtenerbrug', lat: 52.8700, lng: 5.7900 },
  { name: 'Jubbega', lat: 53.0000, lng: 6.1000 },
  { name: 'De Knipe', lat: 52.9700, lng: 5.9700 },
  { name: 'Aldeboarn', lat: 53.0500, lng: 5.9000 },
  { name: 'Tijnje', lat: 53.0300, lng: 5.9700 },
  { name: 'Nij Beets', lat: 53.0500, lng: 6.0300 },
  { name: 'Boornbergum', lat: 53.0800, lng: 6.0300 },
  { name: 'Opeinde', lat: 53.1300, lng: 6.0600 },
  { name: 'Rottevalle', lat: 53.1400, lng: 6.1300 },
  { name: 'Garyp', lat: 53.1600, lng: 5.9700 },
  { name: 'Eastermar', lat: 53.2000, lng: 6.0700 },
  { name: 'Harkema', lat: 53.2200, lng: 6.1300 },
  { name: 'Drogeham', lat: 53.2100, lng: 6.1100 },
  { name: 'Twijzel', lat: 53.2400, lng: 6.1100 },
  { name: 'Kootstertille', lat: 53.2300, lng: 6.0900 },
  { name: 'Augustinusga', lat: 53.2200, lng: 6.1600 },
  { name: 'Kollumerzwaag', lat: 53.2800, lng: 6.0700 },
  { name: 'Anjum', lat: 53.3700, lng: 6.1500 },
  { name: 'Ternaard', lat: 53.3800, lng: 5.9800 },
  { name: 'Burdaard', lat: 53.3000, lng: 5.8800 },
  { name: 'Stavoren', lat: 52.8800, lng: 5.3600 },
  { name: 'Hindeloopen', lat: 52.9400, lng: 5.4000 },
  { name: 'Oudega', lat: 53.1200, lng: 5.9900 },
  { name: 'Terherne', lat: 53.0400, lng: 5.7800 },
  { name: 'Oppenhuizen', lat: 53.0100, lng: 5.6900 },
  { name: 'Scharnegoutum', lat: 53.0600, lng: 5.6800 },
  { name: 'Mantgum', lat: 53.1200, lng: 5.7100 },
  { name: 'Weidum', lat: 53.1400, lng: 5.7500 },
  { name: 'Wergea', lat: 53.1500, lng: 5.8400 },
  { name: 'Wytgaard', lat: 53.1500, lng: 5.7900 },
  // — Kop van Overijssel / Vechtdal (aanvulling) —
  { name: 'Oldemarkt', lat: 52.8100, lng: 5.9700 },
  { name: 'Steenwijkerwold', lat: 52.8000, lng: 6.0600 },
  { name: 'Giethoorn', lat: 52.7400, lng: 6.0800 },
  { name: 'Wanneperveen', lat: 52.7100, lng: 6.1200 },
  { name: 'Sint Jansklooster', lat: 52.6800, lng: 5.9800 },
  { name: 'Blokzijl', lat: 52.7300, lng: 5.9600 },
  { name: 'Kuinre', lat: 52.7900, lng: 5.8500 },
  { name: 'Willemsoord', lat: 52.8300, lng: 6.0500 },
  { name: 'Rouveen', lat: 52.6200, lng: 6.1800 },
  { name: 'IJhorst', lat: 52.6800, lng: 6.2900 },
  { name: 'Wilsum', lat: 52.5500, lng: 5.9600 },
  { name: 'Grafhorst', lat: 52.5800, lng: 5.9300 },
  { name: "'s-Heerenbroek", lat: 52.5600, lng: 6.0100 },
  { name: 'Mariënberg', lat: 52.5100, lng: 6.5800 },
  { name: 'Bergentheim', lat: 52.5400, lng: 6.6100 },
  { name: 'Kloosterhaar', lat: 52.5100, lng: 6.7000 },
  { name: 'De Krim', lat: 52.6300, lng: 6.6600 },
  { name: 'Lutten', lat: 52.6100, lng: 6.5800 },
  { name: 'Oudleusen', lat: 52.5300, lng: 6.3200 },
  // — Noordoostpolder —
  { name: 'Marknesse', lat: 52.7300, lng: 5.8600 },
  { name: 'Ens', lat: 52.6300, lng: 5.8300 },
  { name: 'Kraggenburg', lat: 52.6600, lng: 5.9100 },
  { name: 'Luttelgeest', lat: 52.7500, lng: 5.9000 },
  { name: 'Bant', lat: 52.7600, lng: 5.7500 },
  { name: 'Creil', lat: 52.7500, lng: 5.6300 },
  { name: 'Rutten', lat: 52.7900, lng: 5.6700 },
  { name: 'Espel', lat: 52.7300, lng: 5.6600 },
  { name: 'Tollebeek', lat: 52.6800, lng: 5.7000 },
  { name: 'Nagele', lat: 52.6500, lng: 5.7200 },
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
