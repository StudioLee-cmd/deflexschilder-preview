import Link from 'next/link';

// Zichtbare E-E-A-T-byline: de auteur (André, 23 jaar vakervaring) + datums.
export default function Byline({ gepubliceerd, bijgewerkt }) {
  return (
    <div className="byline">
      <span className="byline__avatar" aria-hidden>
        A
      </span>
      <div>
        <strong>
          Door <Link href="/auteur/andre">André van der Hoogen</Link>
        </strong>{' '}
        — eigenaar De Flexschilder, 23 jaar schilder- en onderhoudservaring
        <div className="datums">
          Gepubliceerd {gepubliceerd}
          {bijgewerkt ? ` · laatst bijgewerkt ${bijgewerkt}` : ''}
        </div>
      </div>
    </div>
  );
}
