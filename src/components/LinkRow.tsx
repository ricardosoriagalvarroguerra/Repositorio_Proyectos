import { useLinkStatus } from "../hooks/useLinkStatus";
import { StatusLight } from "./StatusLight";
import type { ProjectLink } from "../types";

export function LinkRow({ link }: { link: ProjectLink }) {
  // Hook llamado siempre (orden estable). Si no hay que monitorear, pasamos
  // undefined y el hook no hace nada.
  const monitored = !!link.monitor && !!link.url;
  const status = useLinkStatus(monitored ? link.url : undefined);

  if (link.url) {
    return (
      <a className="cz-link" href={link.url} target="_blank" rel="noopener noreferrer">
        <span className="cz-link-dot" />
        <span className="cz-link-name">{link.name}</span>
        {monitored && <StatusLight status={status} />}
        <span className="cz-link-arrow">↗</span>
      </a>
    );
  }

  return (
    <div className="cz-link-empty">
      <span className="cz-link-empty-dot" />
      <span className="cz-link-empty-name">{link.name}</span>
      <span className="cz-link-empty-tag">vacío</span>
    </div>
  );
}
