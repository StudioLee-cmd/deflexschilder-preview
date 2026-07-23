import TeamFoto from './TeamFoto';
import { TEAM } from '@/lib/team';

// De teamsectie op /over-ons: één kaart per vakmens (foto + naam + rol + korte
// intro). Leest uit lib/team.js — voeg je een lid toe of vul je een foto in,
// dan loopt deze sectie automatisch mee. Foto's zijn placeholders tot Andrés
// eigen fotoshoot binnen is (1-op-1 vervangbaar via lib/team.js).
export default function TeamSectie() {
  return (
    <div className="team">
      {TEAM.map((lid) => (
        <article key={lid.slug} className="teamlid">
          <TeamFoto lid={lid} />
          <div className="teamlid__body">
            <div className="teamlid__naam">{lid.naam}</div>
            <div className="teamlid__rol">
              {lid.rol}{lid.tag ? ` · ${lid.tag}` : ''}
            </div>
            {lid.intro ? <p className="teamlid__intro">{lid.intro}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
