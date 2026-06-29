import type { Category } from "./types";

/** Cuenta los links con URL (no vacíos) de una categoría. */
export function countCat(cat: Category): number {
  return cat.groups.reduce(
    (n, g) => n + g.links.filter((l) => l.url).length,
    0,
  );
}
