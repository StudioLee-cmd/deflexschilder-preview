// Teamfoto met een nette "foto volgt"-placeholder zolang Andrés fotoshoot nog
// niet binnen is. 1-op-1 vervangbaar: zet in lib/team.js `foto:
// '/img/team/<slug>.jpg'` en drop het bestand → de echte foto verschijnt hier
// automatisch, zonder codewijziging. Geen AI-beeld (Andrés wens) — de
// placeholder is een merk-getinte initiaal, geen stockfoto.
export default function TeamFoto({ lid, badge = 'Foto volgt' }) {
  const initiaal = (lid.naam || '?').trim().charAt(0).toUpperCase();
  if (lid.foto) {
    return (
      <div className="teamfoto">
        <img src={lid.foto} alt={lid.fotoAlt || lid.naam} loading="lazy" />
      </div>
    );
  }
  return (
    <div className="teamfoto teamfoto--leeg">
      <span className="teamfoto__initiaal" aria-hidden="true">{initiaal}</span>
      <span className="teamfoto__badge">{badge}</span>
    </div>
  );
}
