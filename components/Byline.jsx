import Link from 'next/link';
import { ANDRE_AVATAR } from '@/lib/schema';

// Zichtbare E-E-A-T-byline: de auteur (André, 23 jaar vakervaring, met zijn eigen foto) + datums.
export default function Byline({ gepubliceerd, bijgewerkt }) {
  return (
    <div className="byline">
      <img className="byline__avatar" src={ANDRE_AVATAR} alt="" width={46} height={46} />
      <div>
        <strong>
          Door <Link href="/auteur/andre">André van der Hoogen</Link>
        </strong>
        , eigenaar De Flexschilder, 23 jaar schilder- en onderhoudservaring
        <div className="datums">
          Gepubliceerd {gepubliceerd}
          {bijgewerkt ? ` · laatst bijgewerkt ${bijgewerkt}` : ''}
        </div>
      </div>
    </div>
  );
}
