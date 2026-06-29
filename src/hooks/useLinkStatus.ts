import { useEffect, useState } from "react";

export type LinkStatus = "checking" | "up" | "down";

interface Options {
  /** Cada cuánto re-sondear, en ms. Por defecto 20 s. */
  intervalMs?: number;
  /** Timeout de cada sondeo, en ms. Por defecto 6 s. */
  timeoutMs?: number;
}

/**
 * Sondea periódicamente una URL para saber si el servidor está levantado.
 *
 * Cómo funciona (y sus límites): el navegador no puede leer el contenido de un
 * dominio cruzado (CORS), así que usamos `fetch` en modo `no-cors`. En ese modo
 * la promesa SE RESUELVE si la conexión llega al servidor (cualquier respuesta
 * HTTP, aunque sea opaca) y SE RECHAZA si no hay conexión (servidor caído, fuera
 * de la VPN, DNS/TLS, o timeout). Por eso:
 *   - resuelve  -> "up"   (alcanzable desde este navegador ahora mismo)
 *   - rechaza   -> "down" (inalcanzable)
 *
 * Nota: refleja la alcanzabilidad DESDE ESTE NAVEGADOR. Para un servicio en
 * Tailscale, el equipo debe estar dentro de la tailnet (VPN) para verlo "up".
 *
 * Si pasás `url` undefined/"" el hook no hace nada (devuelve "checking"), de modo
 * que se puede llamar de forma incondicional respetando las reglas de hooks.
 */
export function useLinkStatus(
  url: string | undefined,
  { intervalMs = 20_000, timeoutMs = 6_000 }: Options = {},
): LinkStatus {
  const [status, setStatus] = useState<LinkStatus>("checking");

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    let inFlight: AbortController | null = null;

    const check = async () => {
      const controller = new AbortController();
      inFlight = controller;
      const timer = window.setTimeout(() => controller.abort(), timeoutMs);
      try {
        await fetch(url, {
          mode: "no-cors",
          cache: "no-store",
          redirect: "follow",
          signal: controller.signal,
        });
        if (!cancelled) setStatus("up");
      } catch {
        // Cuando el servidor está caído o estás fuera de la VPN, el navegador
        // imprime un "net::ERR_..." en la consola en cada sondeo: es inevitable
        // con fetch y es inofensivo — el catch lo maneja y marca "down".
        if (!cancelled) setStatus("down");
      } finally {
        window.clearTimeout(timer);
        if (inFlight === controller) inFlight = null;
      }
    };

    check();
    const interval = window.setInterval(check, intervalMs);

    return () => {
      // Al desmontar o cambiar de url: frenamos el bucle, evitamos setState
      // tardío y abortamos el sondeo en curso para no dejarlo colgado.
      cancelled = true;
      window.clearInterval(interval);
      inFlight?.abort();
    };
  }, [url, intervalMs, timeoutMs]);

  return status;
}
