import type { LinkStatus } from "../hooks/useLinkStatus";

const LABELS: Record<LinkStatus, string> = {
  up: "activo",
  down: "inactivo",
  checking: "comprobando",
};

const TITLES: Record<LinkStatus, string> = {
  up: "El servidor responde y es accesible ahora mismo",
  down: "Sin respuesta — el servidor está caído o estás fuera de la VPN",
  checking: "Comprobando el estado del servidor…",
};

/** Luz de alerta verde/roja que refleja el estado de un servicio monitoreado. */
export function StatusLight({ status }: { status: LinkStatus }) {
  return (
    <span
      className={`cz-status ${status}`}
      title={TITLES[status]}
      role="status"
      aria-live="polite"
    >
      <span className="cz-status-dot" />
      {LABELS[status]}
    </span>
  );
}
