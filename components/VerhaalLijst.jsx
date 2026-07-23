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
          <article key={lid.slug} id={`verhaal-${lid.slug}`} className="verhaal">
            <div className="verhaal__foto">
              <TeamFoto lid={lid} />
            </div>
            <div className="verhaal__body">
              <span className="kicker">Verhaal van een vakmens</span>
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
                  Interview volgt. André legt de verhalen van zijn vakmensen zelf
                  vast — opname, uitwerking én eigen foto&rsquo;s. Zodra het klaar
                  is, verschijnt {lid.naam}&rsquo;s verhaal hier.
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
