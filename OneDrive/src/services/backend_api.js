import { getDateRangeForAPI } from "../utils/dateConvert";

async function httpGetJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}: ${text}`);
  }
  return response.json();
}

export function obtenerUltimaTelemetria() {
  return httpGetJson("/api/aranet/telemetry/last");
}

export function obtenerSensores() {
  return httpGetJson("/api/aranet/sensors");
}

export function obtenerAlarmasActuales() {
  return httpGetJson("/api/aranet/alarms/actual");
}

export function obtenerUltimaMedida(sensor) {
  return httpGetJson(`/api/aranet/measurements?sensor=${sensor}`);
}
