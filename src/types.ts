/** Un link individual dentro de un grupo. `url` vacío => link "vacío". */
export interface ProjectLink {
  name: string;
  url: string;
  /**
   * Si es true, se muestra un indicador de estado (luz verde/roja) que sondea
   * el link periódicamente para avisar si el servidor está levantado o caído.
   * Pensado para servicios internos (p. ej. detrás de la VPN de Tailscale).
   */
  monitor?: boolean;
}

/** Un grupo de links. `name` null => grupo sin encabezado. */
export interface LinkGroup {
  name: string | null;
  links: ProjectLink[];
}

/** Una categoría de proyectos (cada tarjeta del área principal). */
export interface Category {
  name: string;
  /** grid-template-columns por defecto cuando hay más de un grupo */
  cols: string;
  groups: LinkGroup[];
}
