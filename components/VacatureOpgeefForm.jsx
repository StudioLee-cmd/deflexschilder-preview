'use client';

import { useState } from 'react';
import { ALL_PLACE_NAMES } from '@/lib/geo';

// Het opgeef-formulier van André — bewust gebouwd voor een TELEFOON, niet voor een laptop.
// Vier keuzes die daaruit volgen:
//   ① drie verplichte velden bovenaan (functie · plaats · omschrijving), de rest optioneel
//      en ingeklapt: op een telefoon is elk extra veld een reden om het later te doen.
//   ② `inputMode`/`autoCapitalize` per veld, zodat het juiste toetsenbord opengaat.
//   ③ een <datalist> met alle 257 plaatsnamen uit lib/geo — dan typt hij twee letters en
//      staat de plaats er goed in, wat de radius-logica op de stadspagina's laat kloppen.
//   ④ na verzenden een BEVESTIGING met de directe link naar zijn vacature. Zonder die
//      bevestiging stuurt hij 'm een tweede keer (en dát was expliciet af_is (d)).
export default function VacatureOpgeefForm({ code }) {
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState(null);
  const [klaar, setKlaar] = useState(null);
  const [meer, setMeer] = useState(false);

  async function verstuur(e) {
    e.preventDefault();
    setBezig(true);
    setFout(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/vacature-opgeven', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setFout(data.error || 'Er ging iets mis bij het opslaan. Probeer het zo nog eens.');
      } else {
        setKlaar(data);
        e.target.reset();
      }
    } catch {
      setFout('Geen verbinding. Check je internet en probeer het nog eens.');
    } finally {
      setBezig(false);
    }
  }

  if (klaar) {
    return (
      <div className="kaartje" style={{ padding: 26 }}>
        <h3 style={{ marginTop: 0 }}>
          {klaar.nieuw ? 'Staat erop 👍' : 'Bijgewerkt 👍'}
        </h3>
        <p style={{ fontSize: 15.5 }}>
          <strong>{klaar.titel}</strong> in {klaar.plaats} staat nu op de site.
          {!klaar.nieuw && ' Deze vacature stond er al: die is bijgewerkt, dus hij staat er niet twee keer op.'}
        </p>
        <a
          href={`/vacatures/${klaar.slug}`}
          className="btn btn--primair"
          style={{ alignSelf: 'flex-start', marginTop: 6 }}
        >
          Bekijk de vacature
        </a>
        <button
          type="button"
          className="btn btn--secundair"
          style={{ alignSelf: 'flex-start', marginTop: 10 }}
          onClick={() => setKlaar(null)}
        >
          Nog één toevoegen
        </button>
      </div>
    );
  }

  return (
    <form className="formulier" onSubmit={verstuur}>
      <label>
        Welke functie? *
        <input
          name="titel"
          required
          placeholder="Bijv. Allround schilder"
          autoCapitalize="sentences"
          maxLength={120}
        />
      </label>

      <label>
        In welke plaats? *
        <input
          name="plaats"
          required
          list="plaatsen"
          placeholder="Bijv. Assen"
          autoCapitalize="words"
          autoComplete="off"
          maxLength={80}
        />
      </label>
      <datalist id="plaatsen">
        {ALL_PLACE_NAMES.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>

      <label>
        Wat houdt het werk in? *
        <textarea
          name="beschrijving"
          required
          rows={5}
          placeholder="Een paar zinnen: wat voor werk, voor wat voor opdrachtgever, wat verwacht je."
          autoCapitalize="sentences"
          maxLength={4000}
        />
      </label>

      {!meer && (
        <button
          type="button"
          className="btn btn--secundair btn--klein"
          style={{ justifySelf: 'start' }}
          onClick={() => setMeer(true)}
        >
          + Meer invullen (mag ook later)
        </button>
      )}

      {meer && (
        <>
          <label>
            Dienstverband
            <input name="dienstverband" placeholder="Bijv. Detachering, langere opdracht" maxLength={120} />
          </label>
          <label>
            Uren
            <input name="uren" placeholder="Bijv. 32-40 uur" maxLength={60} />
          </label>
          <label>
            Salaris-indicatie
            <input
              name="salaris_indicatie"
              placeholder="Bijv. €2.600 - €3.400 bruto p/m"
              maxLength={120}
            />
          </label>
          <label>
            Zichtbaar tot
            <input name="valid_through" type="date" />
          </label>
        </>
      )}

      <button
        type="submit"
        className="btn btn--primair"
        disabled={bezig}
        style={{ justifySelf: 'start' }}
      >
        {bezig ? 'Bezig…' : 'Zet op de site'}
      </button>

      {fout && (
        <p className="zoek__melding" role="alert" style={{ color: '#b3261e', fontWeight: 600 }}>
          {fout}
        </p>
      )}

      <p className="formulier__notitie">
        Laat je een veld leeg, dan vullen we dat later aan. Zichtbaar tot is standaard 60 dagen.
      </p>
    </form>
  );
}
