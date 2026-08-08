'use client';

import { useState } from 'react';
import Link from 'next/link';

// De knop die de uitschrijving écht doet. Staat los van de pagina omdat die een server-component
// is: het token komt uit de URL en de POST hoort in de browser, zodat een link-scanner die de
// pagina vooruit ophaalt niemand uitschrijft (zie de kop van app/afmelden-voor-vacature-alert).
export default function AfmeldKnop({ token }) {
  const [bezig, setBezig] = useState(false);
  const [klaar, setKlaar] = useState(false);
  const [fout, setFout] = useState(null);

  async function afmelden() {
    setBezig(true);
    setFout(null);
    try {
      const res = await fetch('/api/vacature-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actie: 'afmelden', token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setFout('Uitschrijven lukte niet. Probeer het zo nog eens, of mail andre@deflexschilder.nl.');
      } else {
        setKlaar(true);
      }
    } catch {
      setFout('Geen verbinding. Probeer het zo nog eens.');
    } finally {
      setBezig(false);
    }
  }

  if (klaar) {
    return (
      <div>
        <h3 style={{ marginTop: 0 }}>Je bent uitgeschreven</h3>
        <p style={{ fontSize: 15.5 }}>
          Je krijgt geen bericht meer als er een nieuwe vacature bij komt. Van gedachten veranderd?
          Je kunt je altijd opnieuw aanmelden op de vacaturepagina.
        </p>
        <Link href="/vacatures" className="btn btn--secundair" style={{ marginTop: 6 }}>
          Naar de vacatures
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button type="button" className="btn btn--primair" onClick={afmelden} disabled={bezig}>
        {bezig ? 'Bezig…' : 'Ja, schrijf me uit'}
      </button>
      {fout && (
        <p className="zoek__melding" role="alert" style={{ marginTop: 12 }}>
          {fout}
        </p>
      )}
    </div>
  );
}
