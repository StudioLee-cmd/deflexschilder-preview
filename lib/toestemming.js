import { ORGANISATIE } from '@/lib/schema';

/**
 * De TEKSTEN van het toestemmings-blok. Bewust een lib-module en geen React-component: de
 * server-route moet exact dezelfde zinnen kunnen lezen als de bezoeker zag, en die kan geen JSX
 * importeren. Eén bron, drie consumenten: het aanvraagformulier, de /privacy/-pagina en
 * `app/api/aanvraag/route.js`.
 *
 * ⚑ DE VORM IS OVERGENOMEN VAN alirijles.nl (`lib/toestemming.js`) EN DAT IS EXPRES — dit is de
 *   tweede klantsite die 'm draagt, en de fouten die daar gemeten zijn hoeven hier niet opnieuw
 *   gemaakt te worden. Wat mee moest: de versie is AFGELEID van de tekst (verandert er een woord,
 *   dan verandert de versie mee, zodat een oude lead leesbaar blijft op wat híj zag), en een
 *   promotie-belofte zonder bron wordt genegeerd i.p.v. meegeschreven.
 *
 * ⚑ WAT HIER STAAT IS KLANT-ONAFHANKELIJK, WAT DE KLANT BELOOFT NIET. De kale promotie-zin doet
 *   geen enkele toezegging over frequentie of inhoud. Op alirijles stond ooit "maximaal 3 tot 4
 *   keer per jaar, en nooit verkooppraat" — twee toezeggingen die de klant nooit gedaan had, en
 *   ze werden bij élke inzending als `consent_tekst` vastgelegd. Dat is geen copy maar een
 *   bewijsstuk: stuurt de klant straks wekelijks een aanbieding, dan ligt er bij elke lead een
 *   vastgelegde tegenspraak met onze naam eronder.
 *
 * ⚑ ANDRÉ HEEFT NIETS TOEGEZEGD, en daarom staat hier `null` en geen zin. Zegt hij later wél iets
 *   toe over hoe vaak hij mailt of waarover, dan komt dat hier te staan MÉT de bron waar 'ie dat
 *   zei ({ zin, bron }). Zonder bron telt de belofte niet — een toezegging die we niet kunnen
 *   herleiden is een toezegging die wij bedacht hebben.
 */
const PROMOTIE_BELOFTE = null;

// De STRUCTUUR-versie: welke vinkjes er staan en wat ze betekenen. Deze bump je met de hand, en
// alleen als de OPBOUW verandert (een vinkje erbij, een vinkje niet langer verplicht).
// Tekst-wijzigingen zitten in het achtervoegsel hieronder en gaan vanzelf.
const STRUCTUUR = 'v2';

// FNV-1a, 32 bit. Klein, dependency-vrij en bit-identiek in de browser en op de server — dat
// laatste is de eis: de route moet dezelfde versie berekenen als de pagina toonde.
function vingerafdruk(tekst) {
  let h = 0x811c9dc5;
  for (let i = 0; i < tekst.length; i++) {
    h ^= tekst.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

function belofte() {
  const b = PROMOTIE_BELOFTE;
  if (!b || typeof b !== 'object') return null;
  const zin = typeof b.zin === 'string' ? b.zin.trim() : '';
  const bron = typeof b.bron === 'string' ? b.bron.trim() : '';
  if (!zin) return null;
  if (!bron) {
    // Niet stil: een half ingevulde belofte is een fout van ons, geen keuze van de klant.
    console.warn(
      '[toestemming] PROMOTIE_BELOFTE draagt een zin zonder bron en wordt daarom genegeerd. ' +
        'Zet erbij waar André dit gezegd heeft, of haal de zin weg.',
    );
    return null;
  }
  return { zin, bron };
}

// De naam komt uit lib/schema.js (ORGANISATIE) en niet uit deze regel — dat is de enige plek waar
// de bedrijfsfeiten van De Flexschilder staan (zie de kop van lib/site.js).
const BEDRIJF = ORGANISATIE.name;

// Het vinkje staat in de stem van de BEZOEKER ("… mag mijn naam gebruiken"), dus derde persoon
// met de naam van de klant erin.
//
// ⚑ EN DE BEZOEKER IS HIER EEN OPDRACHTGEVER, GEEN PARTICULIER: wie dit formulier invult doet dat
//   namens een bedrijf dat schilders zoekt. Vandaar "over deze aanvraag" en niet "over je lessen".
const CONTACT = `${BEDRIJF} mag mijn naam, telefoonnummer en e-mailadres gebruiken om contact met me op te nemen over deze aanvraag.`;

// De kale promotie-zin: wél specifiek genoeg om geldige toestemming te zijn (de bezoeker weet van
// wie en waarover), maar zónder frequentie en zónder inhouds-belofte. Het afmelden staat er wel
// in: dat is geen toezegging van de klant maar een recht van de bezoeker (AVG art. 7(3)).
const PROMOTIE_KERN = `${BEDRIJF} mag me ook berichten sturen die niet over deze aanvraag gaan, zoals nieuws of een aanbieding.`;
const PROMOTIE_AFMELDEN = 'Ik kan me hier altijd voor afmelden.';

const B = belofte();
const PROMOTIE = B
  ? `${PROMOTIE_KERN} ${B.zin} ${PROMOTIE_AFMELDEN}`
  : `${PROMOTIE_KERN} ${PROMOTIE_AFMELDEN}`;

// ⚑ DE VACATURE-ALERT IS EEN DERDE, APARTE TOESTEMMING en geen variant van de twee hierboven.
//   Wie zich voor de alert aanmeldt is een SCHILDER die werk zoekt, niet een opdrachtgever die
//   een aanvraag doet — ander doel, andere gegevens (alleen een e-mailadres), andere opzegging.
//   Ze op één vinkje laten leunen zou toestemming voor het ene laten gelden voor het andere, en
//   dat is precies wat AVG art. 6(1)(a) 'voor één of meer specifieke doeleinden' uitsluit.
//   Het afmelden staat in de zin zelf: dat is geen toezegging van de klant maar een recht van de
//   bezoeker (art. 7(3)), en het is de route die deze site ECHT draagt
//   (/afmelden-voor-vacature-alert).
const ALERT = `${BEDRIJF} mag mijn e-mailadres gebruiken om me een bericht te sturen als er een nieuwe vacature bij komt. Ik kan me hier met één klik voor afmelden.`;

export const TOESTEMMING = {
  versie: `${STRUCTUUR}.${vingerafdruk(`${CONTACT}|${PROMOTIE}|${ALERT}`)}`,
  contact: CONTACT,
  promotie: PROMOTIE,
  alert: ALERT,
  // Alleen gevuld als de klant écht iets heeft toegezegd. Reist mee naar de ledger, zodat bij élke
  // lead terug te vinden is wáár die toezegging vandaan komt.
  beloftebron: B ? B.bron : null,
};
