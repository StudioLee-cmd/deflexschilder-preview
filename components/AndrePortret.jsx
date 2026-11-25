import { ANDRE_FOTO } from '@/lib/schema';

// André's eigen foto (25-11). Op een telefoon staat het portret boven de tekst over hem
// (globals.css, .kaartwrap--portret); op een breed scherm ernaast.
// bijschrift={false} waar zijn naam er al pal naast staat (/auteur/andre).
export default function AndrePortret({ onderschrift = 'Eigenaar · 23 jaar in verf en onderhoud', laden = 'eager', bijschrift = true }) {
  return (
    <figure className="portret">
      <img src={ANDRE_FOTO} alt="André van der Hoogen, eigenaar van De Flexschilder" width={800} height={1000} loading={laden} />
      {bijschrift ? (
        <figcaption>
          <strong>André van der Hoogen</strong>
          <span>{onderschrift}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
