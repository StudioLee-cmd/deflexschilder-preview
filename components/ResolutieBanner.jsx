'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CITIES, PLACES, citiesFor } from '@/lib/geo';

// De banner als een bezoeker via een plaats zonder eigen pagina binnenkomt (zoekbalk, of een
// plaats in het werkgebied op de home). De steden komen uit de data (lib/geo.js, regels 2 en 3),
// niet uit de link: een plaats hoort bij elke stad binnen 20 km, dus de banner noemt deze stad
// én de andere steden waar de plaats bij hoort, als links naar dezelfde soort pagina.
//   "Hasselt heeft geen eigen pagina en hoort bij het werkgebied van Zwolle · 8 km en ook van
//    Kampen · 13 km en Meppel · 13 km."
// Een plaats die niet in de lijst staat (of een oude link met alleen km) krijgt een gewone regel.
function norm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
}

function BannerInner({ stadNaam, pad }) {
  const params = useSearchParams();
  const van = params.get('van');
  const km = params.get('km');
  if (!van) return null;

  const stad = CITIES.find((c) => c.name === stadNaam);
  const plaats = PLACES.find((p) => norm(p.name) === norm(van));
  const steden = plaats ? citiesFor(plaats) : [];
  const hier = steden.find((x) => x.city.slug === stad?.slug);

  if (!plaats || !hier) {
    if (!km) return null;
    return (
      <div className="resolutie">
        <strong>{van}</strong> heeft geen eigen pagina. Je kijkt naar <strong>{stadNaam}</strong> · {km} km, de
        dichtstbijzijnde stad.
      </div>
    );
  }

  const ander = steden.filter((x) => x.city.slug !== stad.slug);
  return (
    <div className="resolutie">
      <strong>{plaats.name}</strong> heeft geen eigen pagina en hoort bij het werkgebied van{' '}
      <strong>{stadNaam}</strong> · {hier.km} km
      {ander.length > 0 && (
        <>
          {' '}en ook van{' '}
          {ander.map((x, i) => (
            <span key={x.city.slug}>
              {i > 0 && (i === ander.length - 1 ? ' en ' : ', ')}
              <Link href={`${pad}${x.city.slug}`}>{x.city.name}</Link> · {x.km} km
            </span>
          ))}
        </>
      )}
      .
    </div>
  );
}

export default function ResolutieBanner({ stadNaam, pad = '/schilders-inhuren/' }) {
  return (
    <Suspense fallback={null}>
      <BannerInner stadNaam={stadNaam} pad={pad} />
    </Suspense>
  );
}
