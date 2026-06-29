import type { Category } from "./types";

/**
 * Datos del centralizador. Para agregar un proyecto, sumá un objeto
 * `{ name, url }` al grupo correspondiente (opcional: `monitor: true` para
 * mostrar la luz de estado en vivo).
 */
export const data: Category[] = [
  {
    name: "FONPLATA",
    cols: "1fr 1fr",
    groups: [
      {
        name: "Vicepresidencia de Finanzas",
        links: [
          {
            name: "Modelo Financiero",
            url: "https://ricardos-macbook-pro.tailb407e9.ts.net/",
            monitor: true,
          },
          {
            name: "Presentación a Inversores",
            url: "https://fonplata-investors-production.up.railway.app",
          },
        ],
      },
      {
        name: "General",
        links: [
          {
            name: "Tablero Inteligente Internacional",
            url: "https://frontinttablero-production.up.railway.app",
          },
          {
            name: "Tablero Inteligente BOL",
            url: "https://fronttablerobol-production.up.railway.app",
          },
          {
            name: "Tablero Inteligente URU",
            url: "https://fronttablerouru-production.up.railway.app",
          },
          {
            name: "Sectores MDB's",
            url: "https://sectoresmdbsfonp.streamlit.app",
          },
        ],
      },
    ],
  },
  {
    name: "Política",
    cols: "1fr 1fr",
    groups: [
      {
        name: null,
        links: [],
      },
    ],
  },
  {
    name: "Masterminds",
    cols: "1fr 1fr",
    groups: [
      {
        name: null,
        links: [
          {
            name: "Centro de Inteligencia",
            url: "https://mastermindscentrointeligencia-production.up.railway.app",
          },
          {
            name: "ATLAS",
            url: "https://mastermindsatlas-production.up.railway.app",
          },
        ],
      },
    ],
  },
];
