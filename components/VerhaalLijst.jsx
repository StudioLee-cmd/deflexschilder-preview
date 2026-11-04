import TeamFoto from './TeamFoto';
import { TEAM } from '@/lib/team';

// De verhalen-lijst op /over-ons: per vakmens een verhaal-blok (foto + titel +
// quote + tekst). Zolang het interview er nog niet is, toont het blok een nette
// "interview volgt"-staat met de titel die al klaarstaat. Zodra André het
// verhaal + de foto aanlevert (lib/team.js: `quote`, `verhaal[]`, `foto`), valt
// het hier 1-op-1 in — geen codewijziging nodig.
export default function VerhaalLijst() {
  return (
    <div className="verhalen">
      {TEAM.map((lid) => {
        const gepubliceerd = Array.isArray(lid.verhaal) && lid.verhaal.length > 0;
        return (
          <article key={lid.slug} id={`verhaal-${lid.slug}`} className={lid.video ? 'verhaal verhaal--video' : 'verhaal'}>
            {lid.video ? (
              <div className="verhaal__video">
                <video controls preload="none" playsInline poster={lid.foto || undefined} aria-label={`Video: ${lid.verhaalTitel}, ${lid.naam}`}>
                  <source src={lid.video} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="verhaal__foto">
                <TeamFoto lid={lid} />
              </div>
            )}
            <div className="verhaal__body">
              <span className="kicker">{lid.naam} · {lid.rol}</span>
              <h3 className="verhaal__titel">{lid.verhaalTitel}</h3>
              {gepubliceerd ? (
                <>
                  {lid.quote ? (
                    <p className="verhaal__quote">&ldquo;{lid.quote}&rdquo;</p>
                  ) : null}
                  {lid.verhaal.map((alinea, i) => (
                    <p key={i} className="verhaal__alinea">{alinea}</p>
                  ))}
                </>
              ) : (
                <p className="verhaal__wacht">
                  Het persoonlijke verhaal van {lid.naam} wordt hier toegevoegd zodra het gereed is.
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
