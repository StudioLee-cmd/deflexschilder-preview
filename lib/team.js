// Het team van De Flexschilder — de vakmensen achter het merk.
// ─────────────────────────────────────────────────────────────────────────────
// ⭐ 1-OP-1 VERVANGBAAR (Andrés wens, 22-07): André levert zélf de interviews +
// eigen foto's aan — een dame neemt de gesprekken op, schrijft ze uit en maakt
// meteen de foto's voor de site. Onze kant is alléén: een plek klaar hebben waar
// dat 1-op-1 in valt. Deze file is die plek — de ENIGE die je aanpast:
//
//   FOTO    → zet `foto: '/img/team/<slug>.jpg'` en drop het bestand in
//             public/img/team/ (zie de README daar). Leeg (null) = een nette
//             "foto volgt"-placeholder met initialen; nooit een kapotte <img>.
//   VERHAAL → vul `quote` (één pakkende zin) + `verhaal` (array alinea's) in.
//             Leeg = een nette "interview volgt"-staat. De titel staat al klaar.
//
// De teamsectie (components/TeamSectie) én de verhalen-lijst (components/
// VerhaalLijst) op /over-ons lezen allebei uit déze ene bron, plus het
// Person-schema voor E-E-A-T (teamPersonSchema, alleen voor leden met een écht
// gepubliceerd verhaal — nooit een lege/verzonnen entiteit, RULE 12). Eén file
// bijwerken → team, verhaal én structured data lopen automatisch mee.
//
// NAAM-CHECK: André schreef in zijn mail 22-07 "Tieme, Joryd, Jermaine en
// Julia". Ons oudere dossier had "Jordy vd Corput" (vermoedelijk dezelfde
// persoon: Joryd) en kende Jermaine nog niet. Aangehouden = Andrés laatste
// schrijfwijze; spelling + rollen bevestigt hij bij de aanlevering.

export const TEAM = [
  {
    slug: 'tieme',
    naam: 'Tieme',
    rol: 'Schilder',
    tag: 'zij-instromer',
    intro: 'Vanuit een heel ander vak de schilderswereld in — en niet meer weg te denken.',
    foto: null,
    fotoAlt: 'Tieme, schilder bij De Flexschilder',
    verhaalTitel: 'Van zij-instromer naar vakman: het verhaal van Tieme',
    quote: null,
    verhaal: [],
  },
  {
    slug: 'joryd',
    naam: 'Joryd',
    rol: 'Schilder',
    tag: 'zij-instromer',
    intro: 'Vond via De Flexschilder zijn plek binnen het schildersvak.',
    foto: null,
    fotoAlt: 'Joryd, schilder bij De Flexschilder',
    verhaalTitel: 'Hoe Joryd zijn plek vond binnen het schildersvak',
    quote: null,
    verhaal: [],
  },
  {
    slug: 'jermaine',
    naam: 'Jermaine',
    rol: 'Schilder', // rol o.v.b. — André bevestigt bij de aanlevering
    tag: null,
    intro: 'Onderdeel van het team van vakmensen — zijn verhaal volgt binnenkort.',
    foto: null,
    fotoAlt: 'Jermaine, schilder bij De Flexschilder',
    verhaalTitel: 'Het verhaal van Jermaine',
    quote: null,
    verhaal: [],
  },
  {
    slug: 'julia',
    naam: 'Julia',
    rol: 'Medewerker',
    tag: null,
    intro: 'Koos bewust voor werken via De Flexschilder.',
    foto: null,
    fotoAlt: 'Julia, medewerker bij De Flexschilder',
    verhaalTitel: 'Waarom Julia bewust kiest voor werken via De Flexschilder',
    quote: null,
    verhaal: [],
  },
];

// Heeft minstens één lid een gepubliceerd verhaal? Bepaalt of we het
// team-Person-schema überhaupt injecteren.
export function heeftGepubliceerdVerhaal() {
  return TEAM.some((m) => Array.isArray(m.verhaal) && m.verhaal.length > 0);
}

// Person-schema voor E-E-A-T — alléén voor leden met een gepubliceerd verhaal,
// zodat de graph nooit een lege of verzonnen entiteit draagt (RULE 12). Zodra
// een verhaal + foto landt, verschijnt de Person automatisch, gekoppeld aan de
// Organization via worksFor.
export function teamPersonSchema(basis, orgId) {
  return TEAM
    .filter((m) => Array.isArray(m.verhaal) && m.verhaal.length > 0)
    .map((m) => ({
      '@type': 'Person',
      '@id': `${basis}/over-ons#${m.slug}`,
      name: m.naam,
      jobTitle: m.rol,
      worksFor: { '@id': orgId },
      ...(m.foto ? { image: `${basis}${m.foto}` } : {}),
    }));
}
