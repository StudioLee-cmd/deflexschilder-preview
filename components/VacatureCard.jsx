import Link from 'next/link';

export default function VacatureCard({ v }) {
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
        <span>{v.dienstverband}</span>
        <span>{v.uren}</span>
        <span>{v.salarisIndicatie}</span>
      </div>
      <p style={{ fontSize: 15 }}>{v.beschrijving.slice(0, 130)}…</p>
      <span className="verder">Bekijk vacature →</span>
    </Link>
  );
}
