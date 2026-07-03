'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DemoForm from '@/components/DemoForm';

// Aanvraagformulier voor opdrachtgevers — de zoekbalk ("Ik zoek schilders")
// landt hier met de plaats voorgevuld. Geen kies-lijst: gewoon invullen.
function FormInner() {
  const params = useSearchParams();
  const plaats = params.get('plaats') || '';
  const stad = params.get('stad') || '';
  const km = params.get('km');

  return (
    <div>
      {plaats && (
        <div className="resolutie" style={{ maxWidth: 560 }}>
          Aanvraag voor <strong>{plaats}</strong>
          {stad && stad !== plaats ? (
            <>
              {' '}
              — regio <strong>{stad}</strong>
              {km ? ` (${km} km)` : ''}. Wij werken in uw omgeving.
            </>
          ) : (
            <> — wij werken in uw omgeving.</>
          )}
        </div>
      )}
      <DemoForm
        velden={[
          { naam: 'Bedrijf / organisatie', placeholder: 'Naam van uw organisatie', verplicht: true },
          { naam: 'Contactpersoon', placeholder: 'Uw naam', verplicht: true },
          { naam: 'Telefoon', type: 'tel', placeholder: '06 …', verplicht: true },
          { naam: 'E-mail', type: 'email', placeholder: 'naam@bedrijf.nl', verplicht: false },
          {
            naam: 'Plaats van het werk',
            placeholder: 'Bijv. Groningen',
            verplicht: true,
            standaard: plaats,
          },
          {
            naam: 'Wat moet er gebeuren?',
            type: 'textarea',
            placeholder: 'Soort werk, aantal schilders, periode…',
            verplicht: true,
          },
        ]}
        knop="Verstuur aanvraag"
      />
    </div>
  );
}

export default function AanvraagForm() {
  return (
    <Suspense fallback={null}>
      <FormInner />
    </Suspense>
  );
}
