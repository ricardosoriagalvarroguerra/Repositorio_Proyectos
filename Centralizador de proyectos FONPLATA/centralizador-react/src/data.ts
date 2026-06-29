import type { Category } from "./types";

/**
 * Datos del centralizador. Rellena el campo `url` de cada proyecto cuando
 * tengas los enlaces — los que estén vacíos se muestran como "vacío".
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
          { name: "Proyecto 1", url: "" },
          { name: "Proyecto 2", url: "" },
          { name: "Proyecto 3", url: "" },
          { name: "Proyecto 4", url: "" },
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
            name: "Sectores MDB's",
            url: "https://sectoresmdbsfonp.streamlit.app",
          },
          { name: "Proyecto 1", url: "" },
          { name: "Proyecto 2", url: "" },
          { name: "Proyecto 3", url: "" },
          { name: "Proyecto 4", url: "" },
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
        links: [
          { name: "Proyecto 1", url: "" },
          { name: "Proyecto 2", url: "" },
          { name: "Proyecto 3", url: "" },
          { name: "Proyecto 4", url: "" },
        ],
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
          { name: "Proyecto 1", url: "" },
          { name: "Proyecto 2", url: "" },
          { name: "Proyecto 3", url: "" },
          { name: "Proyecto 4", url: "" },
        ],
      },
    ],
  },
];
