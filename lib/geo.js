// Geo-laag van de preview: 15 stad-hoofdpagina's (Noord-NL, Zwolle en noordelijker)
// + een plaats→dichtstbijzijnde-stad mapping op coördinaten. Bewust GEEN externe
// geo-API: de lijst hieronder ís de dekking (klein dorp getypt → dichtstbijzijnde
// grote stad, met de km-afstand zichtbaar).

// De 15 stad-hoofdpagina's (Tier 1 + grootste Tier 2 uit de kennisbank).
//
// TWEE TEKSTVELDEN, ÉÉN PER INTENTIE — verwissel ze niet:
//   blurb      → de lead van /schilders-inhuren/<stad>   (OPDRACHTGEVER: capaciteit, portefeuilles)
//   werkgebied → de lead van /vacatures/schilder-<stad>  (WERKZOEKENDE: waar kom ik terecht, hoe ver rijd ik)
//
// Waarom `werkgebied` bestaat, en waarom 'm vullen met de blurb een gemeten fout is: de twee
// intenties moeten glashelder gescheiden blijven, óók voor SEO (Tim 03-07, kennisbank.md). Op
// 11-08 is gemeten wat er gebeurt als je de blurb hier tóch hergebruikt: de overlap tussen de
// twee stadspagina's springt van 66% naar 74%, en 100% van de toegevoegde woorden stond al op de
// inhuren-pagina. Dat ruilt de ene kannibalisatie in voor de andere.
//
// Waarom 'ie er per 11-08 wél staat: zonder dit veld hád de vacaturekant geen eigen tekst, en dan
// verschilden twee buursteden alleen in hun kernenlijst. Buursteden délen dat werkgebied echt
// (Winschoten en Veendam liggen 11 km uit elkaar), dus die lijst kán en mág niet uit elkaar
// lopen. Gemeten gevolg: 96,2% van de woorden van /vacatures/schilder-winschoten stond ook op
// /vacatures/schilder-veendam. Dit veld is de enige laag die twee buursteden eerlijk uit elkaar
// trekt, want het is het enige dat niet uit hun (gedeelde) coördinaten volgt.
//
// SCHRIJFREGELS voor een nieuwe regel hier (writing-style.md): je-vorm, korte zinnen, geen em
// dashes, geen "uitzendbureau" of "schilder inhuren", en ALLEEN natrekbare geografie. Geen
// uitspraken over de lokale arbeidsmarkt of het woningbestand die je niet kunt staven (RULE 9),
// en geen superlatief dat je niet gemeten hebt.
export const CITIES = [
  { slug: 'groningen',   name: 'Groningen',   lat: 53.2194, lng: 6.5665, provincie: 'Groningen',  blurb: 'De grootste stad van het Noorden. Veel bedrijfspanden en vastgoedbeheer, met een doorlopende stroom mutatie- en planmatig onderhoud — hier telt capaciteit die je snel op- en afschaalt.',
    werkgebied: 'Vanuit Groningen werk je alle kanten op. Het meeste ligt ten zuiden en westen van de stad, richting Leek, Zuidhorn en Roden. Noordelijker kom je in Bedum, Winsum en Baflo terecht. Woon je in de stad zelf, dan pak je meestal de ring en sta je zo weer voor de deur.' },
  { slug: 'leeuwarden',  name: 'Leeuwarden',  lat: 53.2012, lng: 5.7999, provincie: 'Friesland',  blurb: 'Hoofdstad van Friesland. Vastgoedbeheerders en VvE’s met flinke portefeuilles, van binnenstadspanden tot naoorlogse wijken.',
    werkgebied: 'Leeuwarden ligt midden in het Friese kleigebied en het werk waaiert vooral naar het oosten uit, richting Burgum en Hurdegaryp. Noordelijk zit je in de terpdorpen: Stiens, Hallum en Ferwert. Fries spreken hoeft niet, maar op de steiger scheelt het.' },
  { slug: 'assen',       name: 'Assen',       lat: 52.9967, lng: 6.5625, provincie: 'Drenthe',    blurb: 'Compacte Drentse hoofdstad. Planmatig onderhoud voor vastgoedbeheer en zorgvastgoed, met korte lijnen naar de hele provincie.',
    werkgebied: 'Assen ligt centraal in Drenthe, dus je rijdt zelden lang. Het werk ligt gespreid, met de meeste kernen ten noorden en oosten van de stad, richting Vries, Tynaarlo en Rolde. Zuidelijk kom je bij Grolloo en Westerbork uit.' },
  { slug: 'emmen',       name: 'Emmen',       lat: 52.7850, lng: 6.8950, provincie: 'Drenthe',    blurb: 'De grootste plaats van Zuidoost-Drenthe. Series rijwoningen uit de jaren zestig tot tachtig — schilderwerk in volume, precies waar flexibele capaciteit rendeert.',
    werkgebied: 'Emmen is uitgestrekt en bestaat uit veel losse wijken en dorpen die vroeger apart lagen. Je werkt er even goed in Klazienaveen of Nieuw-Dordrecht als in het centrum. Naar het oosten stopt het werkgebied bij de grens, naar het noorden loopt het door tot Musselkanaal.' },
  { slug: 'zwolle',      name: 'Zwolle',      lat: 52.5168, lng: 6.0830, provincie: 'Overijssel', blurb: 'Onze zuidgrens en het knooppunt van de regio. Grote aannemers en onderhoudsbedrijven die pieken moeten opvangen zonder vaste loonkosten.',
    werkgebied: 'Zwolle is onze zuidelijkste plaats, dus het werk ligt hier vrijwel altijd ten noorden van de stad. Je komt in de IJsseldelta terecht, bij Hasselt, Genemuiden en Zwartsluis, of oostwaarts langs de Vecht richting Dalfsen en Nieuwleusen. Vanaf de stad rijd je over de N340 of de N331 zo het gebied in. Naar het zuiden sturen we je niet: daar houdt ons gebied op.' },
  { slug: 'drachten',    name: 'Drachten',    lat: 53.1122, lng: 6.0989, provincie: 'Friesland',  blurb: 'De werkplaats van Zuidoost-Friesland. Industrie en bedrijfspanden dicht bij elkaar — binnen- én buitenschilderwerk het hele jaar door.',
    werkgebied: 'Drachten heeft van alle plaatsen op deze lijst de meeste kernen binnen bereik. Ten noorden liggen de Wouden met Rottevalle, Harkema en Drogeham, ten zuiden de Friese venen bij Gorredijk en Jubbega. Elf kernen liggen binnen tien kilometer.' },
  { slug: 'heerenveen',  name: 'Heerenveen',  lat: 52.9602, lng: 5.9195, provincie: 'Friesland',  blurb: 'Centraal in Friesland, snel geschakeld naar Joure, Wolvega en Sneek. Sterke mix van bedrijfspanden en vastgoedbeheer.',
    werkgebied: 'Heerenveen ligt op de kruising van de A7 en de A32, en dat merk je aan de reistijd. Naar het westen kom je bij Joure en Terherne, naar het oosten bij Gorredijk en Jubbega. Richting het zuiden loopt het door tot Wolvega en Lemmer.' },
  { slug: 'hoogeveen',   name: 'Hoogeveen',   lat: 52.7221, lng: 6.4866, provincie: 'Drenthe',    blurb: 'Bedrijvig Drents knooppunt aan de A28 en A37. Series rijwoningen en mkb-bedrijfspanden — werk dat om planning en tempo vraagt.',
    werkgebied: 'Hoogeveen ligt tussen de veenkoloniale linten in, en die dorpen vormen het meeste werk: Hollandscheveld, Elim en Noordscheschut liggen alle drie binnen tien kilometer. Naar het westen kom je bij Ruinen en Dwingeloo terecht.' },
  { slug: 'meppel',      name: 'Meppel',      lat: 52.6951, lng: 6.1940, provincie: 'Drenthe',    blurb: 'De poort van Drenthe, met korte lijnen naar Steenwijk en Staphorst. Veel onderhoudsbedrijven en aannemers in een compacte regio.',
    werkgebied: 'Meppel is compact en je zit er snel buiten de bebouwde kom. Elf kernen liggen binnen tien kilometer, waaronder De Wijk, Nijeveen en Ruinerwold. Naar het zuiden kruis je de provinciegrens richting Staphorst en Rouveen, naar het noordwesten kom je richting Havelte en Diever.' },
  { slug: 'sneek',       name: 'Sneek',       lat: 53.0319, lng: 5.6583, provincie: 'Friesland',  blurb: 'Hart van de Friese meren. VvE’s, recreatievastgoed en historische panden — buitenschilderwerk waar vakkennis het verschil maakt.',
    werkgebied: 'Sneek ligt tussen de Friese meren, dus je rijdt hier vaker om het water heen dan er dwars doorheen. De dichtstbijzijnde kernen liggen op een paar kilometer: Oppenhuizen, IJlst en Scharnegoutum. Naar het westen kom je richting Bolsward en Workum.' },
  { slug: 'kampen',      name: 'Kampen',      lat: 52.5550, lng: 5.9114, provincie: 'Overijssel', blurb: 'Historische binnenstad met veel monumentaal schilderwerk, korte lijnen naar Zwolle en de polder.',
    werkgebied: 'Kampen ligt aan de IJssel, met de Noordoostpolder aan de overkant. Het werk ligt vrijwel volledig ten noorden en oosten van de stad, want naar het zuidwesten begint het water van het Ketelmeer. IJsselmuiden ligt op een kilometer, aan de overkant van de brug. Grafhorst, Wilsum en Genemuiden zijn ook zo bereikt.' },
  { slug: 'stadskanaal', name: 'Stadskanaal', lat: 52.9893, lng: 6.9506, provincie: 'Groningen',  blurb: 'Centrum van de Kanaalstreek. Veel naoorlogse woningen en vastgoedbeheer — planmatig onderhoud in series.',
    werkgebied: 'Stadskanaal loopt als een lint langs het kanaal en de dorpen eromheen liggen in dezelfde structuur. Naar het zuidwesten kom je op de Hondsrug bij Borger en Exloo, naar het noordoosten in Westerwolde bij Onstwedde en Vlagtwedde. Musselkanaal en Nieuw-Buinen liggen vlakbij.' },
  { slug: 'hardenberg',  name: 'Hardenberg',  lat: 52.5758, lng: 6.6194, provincie: 'Overijssel', blurb: 'Groeigemeente in het Vechtdal met actieve aannemers en onderhoudsbedrijven — van nieuwbouw-afwerking tot planmatig onderhoud.',
    werkgebied: 'Hardenberg ligt in het Vechtdal en het werkgebied volgt de Vecht mee. Negen van de kernen liggen binnen tien kilometer, waaronder Bergentheim, Lutten en Gramsbergen. Naar het oosten ligt de grens dicht bij, dus het meeste werk zit ten noorden en westen van de stad.' },
  { slug: 'veendam',     name: 'Veendam',     lat: 53.1067, lng: 6.8752, provincie: 'Groningen',  blurb: 'Kern van de Veenkoloniën. Vastgoedbeheer en mkb-bedrijfspanden, met de hele Oost-Groningse regio binnen handbereik.',
    werkgebied: 'Veendam ligt midden in de oude turfstreek en de dorpen liggen er dicht op elkaar. Muntendam en Wildervank liggen op een paar kilometer. Naar het westen kom je richting Hoogezand en Zuidbroek, naar het zuidwesten rij je Drenthe in, langs Gieten en Zuidlaren. Het Winschoterdiep en de spoorlijn naar Groningen lopen er dwars doorheen.' },
  { slug: 'winschoten',  name: 'Winschoten',  lat: 53.1427, lng: 7.0344, provincie: 'Groningen',  blurb: 'Het centrum van Oost-Groningen. Vastgoedbeheer en zorgvastgoed, dicht op de Duitse grens — een regio waar lokale aanwezigheid telt.',
    werkgebied: 'Winschoten is de hoofdplaats van gemeente Oldambt en ligt dicht tegen de landsgrens aan, dus het werkgebied loopt hier vooral naar het westen. De A7 brengt je in een rechte lijn naar Hoogezand en Sappemeer. Elf kernen liggen binnen tien kilometer, van Heiligerlee en Blijham tot Scheemda en Beerta. Ook Blauwestad en het Oldambtmeer vallen binnen die straal. Naar het oosten reikt het tot Bad Nieuweschans, en daarachter houdt Nederland op.' },
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

// De kernen binnen de straal van een stad, op afstand gesorteerd.
// BEWUST DEZELFDE TOETS als vacaturesBinnenStraal() in lib/ats.js: afstand tot de
// stad <= straal. Daardoor is de belofte op de vacature-stadspagina ("staat er werk
// in een van deze plaatsen, dan vind je het hier") per constructie waar — zodra de
// straal verandert, verandert de lijst mee. Een met de hand geschreven opsomming
// zou stil uit de pas gaan lopen met het filter dat de vacatures kiest.
// Overlap tussen buursteden is correct en geen fout: Havelte ligt binnen de straal
// van Meppel (10 km) én Hoogeveen (17 km), en de vacature daar staat ook echt op
// allebei de pagina's.
export function placesWithin(city, straalKm = 20) {
  return PLACES.map((p) => ({ ...p, km: Math.round(haversineKm(city, p)) }))
    .filter((p) => p.km <= straalKm)
    .sort((a, b) => a.km - b.km || a.name.localeCompare(b.name, 'nl'));
}

// Alle typbare namen (voor de autocomplete van de zoekbalk).
export const ALL_PLACE_NAMES = [
  ...CITIES.map((c) => c.name),
  ...PLACES.map((p) => p.name),
].sort((a, b) => a.localeCompare(b, 'nl'));
