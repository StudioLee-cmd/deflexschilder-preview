'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CITIES, PLACES, nearestCity } from '@/lib/geo';

// Zoek-card met twee gezichten (Tim 03-07):
//   • default-tab "Ik zoek werk"  → plaats+afstand-zoeker → vacature-lijst per stad
//   • tab "Ik zoek schilders"     → DIRECT een aanvraagformulier IN de card
//     (geen kies-lijst; plaats met dezelfde dorp→stad-resolutie, demo-verzending)
const ALLES = [
  ...CITIES.map((c) => ({ naam: c.name, type: 'stad', city: c, km: 0 })),
  ...PLACES.map((p) => {
    const n = nearestCity(p);
    return { naam: p.name, type: 'dorp', city: n.city, km: n.km };
  }),
].sort((a, b) => a.naam.localeCompare(b.naam, 'nl'));

function norm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function PlaatsVeld({ q, setQ, onKies, label = 'Plaats' }) {
  const [open, setOpen] = useState(false);
  const [hl, setHl] = useState(0);

  const suggesties = useMemo(() => {
    const nq = norm(q);
    if (nq.length < 2) return [];
    const start = ALLES.filter((p) => norm(p.naam).startsWith(nq));
    const bevat = ALLES.filter((p) => !norm(p.naam).startsWith(nq) && norm(p.naam).includes(nq));
    return [...start, ...bevat].slice(0, 7);
  }, [q]);

  function kies(s) {
    setQ(s.naam);
    setOpen(false);
    onKies?.(s);
  }

  function toets(e) {
    if (!open || suggesties.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHl((h) => (h + 1) % suggesties.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHl((h) => (h - 1 + suggesties.length) % suggesties.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      kies(suggesties[hl] || suggesties[0]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="zoek__veld">
      <label htmlFor={`plaats-${label}`}>{label}</label>
      <input
        id={`plaats-${label}`}
        placeholder="Bijv. Groningen, Meppel of Hollandscheveld"
        value={q}
        autoComplete="off"
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setHl(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={toets}
        required
      />
      {open && suggesties.length > 0 && (
        <div className="zoek__suggesties" role="listbox">
          {suggesties.map((s, i) => (
            <div
              key={s.naam}
              role="option"
              aria-selected={i === hl}
              className={`zoek__suggestie${i === hl ? ' hl' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                kies(s);
              }}
              onMouseEnter={() => setHl(i)}
            >
              <strong>{s.naam}</strong>
              <span className="via">
                {s.type === 'stad' ? `stadspagina · ${s.city.provincie}` : `→ ${s.city.name} · ${s.km} km`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ZoekBalk({ mode: startMode = 'werk', toonTabs = true }) {
  const router = useRouter();
  const [mode, setMode] = useState(startMode);
  const [q, setQ] = useState('');
  const [gekozen, setGekozen] = useState(null);
  const [melding, setMelding] = useState('');
  const [verzonden, setVerzonden] = useState(false);

  const exact = useMemo(() => ALLES.find((p) => norm(p.naam) === norm(q)) || null, [q]);
  const plek = gekozen && norm(gekozen.naam) === norm(q) ? gekozen : exact;

  function zoekWerk(e) {
    e.preventDefault();
    const straal = e.target.straal?.value || '20';
    const keuze = plek || ALLES.find((p) => norm(p.naam).startsWith(norm(q)) && norm(q).length >= 3);
    if (!keuze) {
      setMelding(
        'Binnen Noord-Nederland werken we overal — deze plaats staat alleen nog niet in ons lijstje. Kies de dichtstbijzijnde stad op de kaart, of bel ons: 06 - 137 181 72.'
      );
      return;
    }
    setMelding('');
    const basis = `/vacatures/schilder-${keuze.city.slug}`;
    if (keuze.type === 'dorp') {
      const params = new URLSearchParams({ van: keuze.naam, km: String(keuze.km), straal });
      router.push(`${basis}?${params.toString()}`);
    } else {
      router.push(`${basis}?straal=${straal}`);
    }
  }

  function verstuurAanvraag(e) {
    e.preventDefault();
    setVerzonden(true);
  }

  return (
    <div className="zoek">
      {toonTabs && (
        <div className="zoek__tabs" role="tablist" aria-label="Ik zoek">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'werk'}
            className={`zoek__tab${mode === 'werk' ? ' actief' : ''}`}
            onClick={() => setMode('werk')}
          >
            Ik zoek werk
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'inhuren'}
            className={`zoek__tab${mode === 'inhuren' ? ' actief' : ''}`}
            onClick={() => setMode('inhuren')}
          >
            Ik zoek schilders
          </button>
        </div>
      )}

      {mode === 'werk' ? (
        <>
          <form className="zoek__rij" onSubmit={zoekWerk}>
            <PlaatsVeld q={q} setQ={setQ} onKies={setGekozen} label="Plaats" />
            <div className="zoek__veld">
              <label htmlFor="straal">Afstand</label>
              <select id="straal" name="straal" defaultValue="20">
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="15">15 km</option>
                <option value="20">20 km</option>
                <option value="25">25 km</option>
                <option value="30">30 km</option>
                <option value="40">40 km</option>
                <option value="50">50 km</option>
              </select>
            </div>
            <button type="submit" className="btn btn--primair">
              Zoek vacatures
            </button>
          </form>

          {plek && plek.type === 'dorp' && (
            <p className="zoek__resolutie">
              {plek.naam} valt onder <strong>{plek.city.name}</strong> — {plek.km} km verderop.
            </p>
          )}
          {melding && <p className="zoek__resolutie">{melding}</p>}

          <div className="zoek__onder">
            <span className="zoek__alert">
              <span className="bol" aria-hidden /> Registreer voor onze vacature-alert!{' '}
              <em style={{ fontWeight: 400 }}>(volgt bij livegang)</em>
            </span>
            <Link href="/vacatures" className="tekstlink">
              Alle vacatures
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Opdrachtgever: DIRECT het aanvraagformulier in de card (geen lijst). */}
          <form className="zoek__form" onSubmit={verstuurAanvraag}>
            <div className="zoek__formgrid">
              <div className="zoek__veld">
                <label htmlFor="bedrijf">Bedrijf / organisatie</label>
                <input id="bedrijf" placeholder="Naam van uw organisatie" required />
              </div>
              <div className="zoek__veld">
                <label htmlFor="contact">Contactpersoon</label>
                <input id="contact" placeholder="Uw naam" required />
              </div>
              <div className="zoek__veld">
                <label htmlFor="tel">Telefoon</label>
                <input id="tel" type="tel" placeholder="06 …" required />
              </div>
              <PlaatsVeld q={q} setQ={setQ} onKies={setGekozen} label="Plaats van het werk" />
            </div>
            {plek && plek.type === 'dorp' && (
              <p className="zoek__resolutie">
                {plek.naam} — regio <strong>{plek.city.name}</strong> ({plek.km} km). Wij werken
                in uw omgeving.
              </p>
            )}
            <div className="zoek__veld">
              <label htmlFor="wat">Wat moet er gebeuren?</label>
              <textarea id="wat" rows={3} placeholder="Soort werk, aantal schilders, periode…" required />
            </div>
            <div className="zoek__onder" style={{ marginTop: 4 }}>
              <button type="submit" className="btn btn--primair">
                Verstuur aanvraag
              </button>
              <span style={{ fontSize: 13.5 }}>
                Liever bellen? <a href="tel:+31613718172" style={{ fontWeight: 700 }}>06 - 137 181 72</a>
                {' · '}
                <Link href="/aanvraag" className="tekstlink" style={{ fontSize: 13.5 }}>
                  Volledig formulier
                </Link>
              </span>
            </div>
            {verzonden && (
              <p className="zoek__resolutie">
                Preview: bij livegang gaat uw aanvraag rechtstreeks naar André — er wordt nu
                nog niets verzonden.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
}
