'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Toont de plaats→stad-resolutie uit de zoekbalk, mét km-afstand:
// "Wolvega → Heerenveen · 12 km (binnen je straal van 20 km)".
function BannerInner({ stadNaam }) {
  const params = useSearchParams();
  const van = params.get('van');
  const km = params.get('km');
  const straal = params.get('straal');
  if (!van || !km) return null;

  const kmNum = Number(km);
  const straalNum = Number(straal || 20);
  const binnen = kmNum <= straalNum;

  return (
    <div className="resolutie">
      <strong>{van}</strong> heeft geen eigen pagina — je kijkt naar de dichtstbijzijnde
      grote stad: <strong>{stadNaam}</strong> · {km} km
      {binnen
        ? ` (binnen je straal van ${straalNum} km)`
        : ` (buiten je straal van ${straalNum} km — dit is de dichtstbijzijnde stad)`}
      .
    </div>
  );
}

export default function ResolutieBanner({ stadNaam }) {
  return (
    <Suspense fallback={null}>
      <BannerInner stadNaam={stadNaam} />
    </Suspense>
  );
}
