// Grafiek-template (puur CSS, geen library): staafdiagram met bron-noot.
// rows = [{ label, waarde, weergave, actief }] — waarde bepaalt de balkbreedte.
export default function StaafDiagram({ titel, sub, rows, bron, max }) {
  const m = max ?? Math.max(...rows.map((r) => r.waarde));
  return (
    <figure className="grafiek">
      <div className="grafiek__titel">{titel}</div>
      {sub && <div className="grafiek__sub">{sub}</div>}
      <div className="grafiek__rijen">
        {rows.map((r) => (
          <div key={r.label} className="grafiek__rij">
            <span>{r.label}</span>
            <div className="grafiek__balkbaan">
              <div
                className={`grafiek__balk${r.actief ? ' grafiek__balk--actief' : ''}`}
                style={{ width: `${Math.round((r.waarde / m) * 100)}%` }}
              />
            </div>
            <span className="grafiek__waarde">{r.weergave}</span>
          </div>
        ))}
      </div>
      {bron && <figcaption className="grafiek__bron">{bron}</figcaption>}
    </figure>
  );
}
