import { LinkRow } from "./LinkRow";
import type { ProjectLink } from "../types";

/** Grupo ya resuelto para el render (links filtrados + flag de encabezado). */
export interface RenderedGroup {
  name: string | null;
  hasName: boolean;
  links: ProjectLink[];
}

/** Categoría ya resuelta para el render. */
export interface RenderedCategory {
  name: string;
  cols: string;
  count: number;
  groups: RenderedGroup[];
}

function Group({ group }: { group: RenderedGroup }) {
  return (
    <div className="cz-group">
      {group.hasName && <div className="cz-group-name">{group.name}</div>}
      <div className="cz-links">
        {group.links.map((link, i) => (
          <LinkRow key={`${link.name}-${i}`} link={link} />
        ))}
      </div>
    </div>
  );
}

export function CategorySection({ cat }: { cat: RenderedCategory }) {
  return (
    <section className="cz-section">
      <div className="cz-section-head">
        <h2 className="cz-section-title">{cat.name}</h2>
        <span className="cz-section-count">{cat.count}</span>
        <div className="cz-section-rule" />
      </div>

      <div
        className="cz-section-grid"
        style={{ gridTemplateColumns: cat.cols }}
      >
        {cat.groups.map((group, i) => (
          <Group key={group.name ?? `g-${i}`} group={group} />
        ))}
      </div>
    </section>
  );
}
