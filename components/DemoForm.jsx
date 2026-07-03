'use client';

import { useState } from 'react';

// Preview-formulier: velden zijn echt, verzenden is bewust uitgeschakeld.
// Bij livegang: opdrachtgever-aanvraag → mail/CRM; sollicitatie/inschrijving →
// terugschrijven naar het ATS via de adapter (lib/ats.js).
export default function DemoForm({ velden, knop }) {
  const [verzonden, setVerzonden] = useState(false);

  return (
    <form
      className="formulier"
      onSubmit={(e) => {
        e.preventDefault();
        setVerzonden(true);
      }}
    >
      {velden.map((veld) =>
        veld.type === 'textarea' ? (
          <label key={veld.naam}>
            {veld.naam}
            <textarea
              rows={4}
              placeholder={veld.placeholder}
              required={veld.verplicht}
              defaultValue={veld.standaard}
            />
          </label>
        ) : (
          <label key={veld.naam}>
            {veld.naam}
            <input
              type={veld.type || 'text'}
              placeholder={veld.placeholder}
              required={veld.verplicht}
              defaultValue={veld.standaard}
            />
          </label>
        )
      )}
      <button type="submit" className="btn btn--primair" style={{ justifySelf: 'start' }}>
        {knop}
      </button>
      {verzonden && (
        <p className="zoek__melding">
          Preview: dit formulier wordt bij livegang aangesloten (aanvragen → André,
          sollicitaties → het vacaturesysteem).
        </p>
      )}
      <p className="formulier__notitie">
        In deze preview wordt er nog niets verzonden.
      </p>
    </form>
  );
}
