# Centralizador de proyectos · FONPLATA

Réplica en **React + TypeScript** (con Vite) del diseño original (`Centralizador.dc.html`).
Un tablero oscuro que centraliza enlaces de proyectos por categoría, con buscador
y filtrado por categoría.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Estructura

```
src/
  main.tsx                    # punto de entrada
  App.tsx                     # estado (búsqueda + categoría activa) y lógica de filtrado
  data.ts                     # ← EDITÁ ACÁ: categorías, grupos y URLs de los proyectos
  types.ts                    # tipos (Category, LinkGroup, ProjectLink)
  lib.ts                      # helpers (conteo de links por categoría)
  styles.css                  # estilos (paleta, fuentes, hover/focus)
  components/
    Sidebar.tsx               # barra lateral: logo, buscador, navegación
    CategorySection.tsx       # tarjeta de categoría con sus grupos y links
```

## Cómo agregar tus enlaces

Editá [`src/data.ts`](src/data.ts) y completá el campo `url` de cada proyecto.
Los proyectos con `url: ""` se muestran como **vacío** (placeholder punteado).
Cada link relleno muestra su nombre y una flecha ↗ (abre en una pestaña nueva).

```ts
{ name: "Proyecto 1", url: "https://ejemplo.com/ruta" }
```

## Monitoreo en vivo (luz verde/roja)

Cualquier link puede mostrar un indicador de estado en vivo agregando `monitor: true`
en [`src/data.ts`](src/data.ts):

```ts
{ name: "Modelo Financiero", url: "https://…ts.net/", monitor: true }
```

El indicador sondea la URL cada 20 s y muestra:

- 🟢 **activo** — el servidor respondió y es accesible ahora mismo.
- 🔴 **inactivo** — sin respuesta (caído, o estás fuera de la VPN de Tailscale).
- 🟠 **comprobando** — durante el primer chequeo.

**Cómo lo verifica (y sus límites).** El navegador no puede leer el contenido de un
dominio cruzado por CORS, así que el chequeo usa `fetch(..., { mode: "no-cors" })` y
mide solo la *alcanzabilidad*: si la conexión llega → verde; si falla o da timeout
(6 s) → rojo. Implicaciones:

- El equipo que abra el panel debe estar **dentro de la tailnet** (VPN) para ver verde.
- Verde = "el host responde", no garantiza al 100 % que la app interna esté sana
  (p. ej. si Tailscale responde pero el proceso detrás cayó con un 502, igual da verde).
- Cuando está caído, el navegador imprime un `net::ERR_...` en consola en cada sondeo:
  es inofensivo e inevitable con `fetch`.

**Para un chequeo 100 % preciso** (verificar contenido/estado real), exponé un endpoint
`/health` en el servidor del Modelo Financiero con cabecera `Access-Control-Allow-Origin: *`
y cambiá el sondeo a `mode: "cors"` comprobando `response.ok`. Avísame y lo ajusto.

## Detalles fieles al diseño original

- Paleta: fondo `#0d1117`, acento naranja `#ed8b4e`, tarjetas `#161b22`, bordes `#21262d`.
- Tipografías: **Space Grotesk** (texto) y **JetBrains Mono** (etiquetas/conteos).
- Buscador: filtra por nombre o URL; durante la búsqueda solo se muestran links con URL.
- Estados: hover en links (borde naranja + desplazamiento), focus en el buscador, "Sin resultados".
- Responsive: por debajo de 820px la barra lateral pasa arriba (una sola columna).
