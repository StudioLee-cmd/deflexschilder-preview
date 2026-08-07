import Link from 'next/link';

export default function VacatureCard({ v }) {
  // Vangnet op de tekst: de omschrijving komt uit een externe bron (het ATS, of de
  // eigen-invoer-tabel). Een rij zonder omschrijving hoort één kaartje zonder tekst te
  // geven, niet de hele vacaturepagina te laten crashen.
  const tekst = v.beschrijving || '';
  return (
    <Link href={`/vacatures/${v.slug}`} className="vacature">
      <div className="vacature__kop">
        <span className="vacature__titel">
          {v.titel} {v.demo && <span className="demolabel">demo</span>}
        </span>
        {v.afstandKm != null && v.afstandKm > 0 && (
          <span className="vacature__afstand">{v.afstandKm} km</span>
        )}
      </div>
      <div className="vacature__meta">
        <span>
          📍 <strong>{v.plaats}</strong>
        </span>
        {v.dienstverband && <span>{v.dienstverband}</span>}
        {v.uren && <span>{v.uren}</span>}
        {v.salarisIndicatie && <span>{v.salarisIndicatie}</span>}
      </div>
      {tekst && <p style={{ fontSize: 15 }}>{tekst.slice(0, 130)}…</p>}
      <span className="verder">Bekijk vacature →</span>
    </Link>
  );
}
