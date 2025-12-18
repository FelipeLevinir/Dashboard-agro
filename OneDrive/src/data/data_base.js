// data de prueba para el frontend

const nowIso = () => new Date().toISOString();

export const dataBase = {
  app: {
    title: "Control Panel - IoT Agronomía",
    location: "Invernadero A",
  },

  sensores: [
    { id: "temperature", label: "Temperature", unit: "°C", value: 18.6, min: 10, max: 35 },
    { id: "humidity", label: "Relative Humidity", unit: "%", value: 62, min: 20, max: 95 },
    { id: "co2", label: "Carbon Dioxide", unit: "ppm", value: 540, min: 300, max: 2000 },
  ],

  actuadores: [
    { id: "pumpA", name: "Pump A", description: "Side A pump", status: "Active", manual: true },
    { id: "pumpB", name: "Pump B", description: "Side B pump", status: "Inactive", manual: false },
    { id: "lightA", name: "Light A", description: "Side A Light", status: "Stand By", manual: false },
    { id: "lightB", name: "Light B", description: "Side B Light", status: "Stand By", manual: false },
    { id: "dehumidifier", name: "Dehumidifier", description: "Backside dehumidifier", status: "Stand By", manual: false },
    { id: "valveA", name: "Valve A", description: "CO2 Valve", status: "Stand By", manual: false },
    { id: "airA", name: "Air Conditioner A", description: "Frontside Air Conditioner", status: "Stand By", manual: false },
    { id: "airB", name: "Air Conditioner B", description: "Backside Air Conditioner", status: "Stand By", manual: false },
  ],

  historial: [
    { id: 1, at: nowIso(), type: "SENSOR", message: "Lecturas sincronizadas OK" },
    { id: 2, at: nowIso(), type: "ACTUATOR", message: "Pump A pasó a Active (manual)" },
    { id: 3, at: nowIso(), type: "SYSTEM", message: "Conexión MQTT estable" },
  ],
};

// Helpers “tipo backend” para simular cambios
export function simularTickSensores(sensores) {
  // Pequeñas variaciones para que se sienta vivo
  return sensores.map((s) => {
    const delta =
      s.id === "temperature" ? (Math.random() - 0.5) * 0.4 :
      s.id === "humidity" ? (Math.random() - 0.5) * 2.0 :
      (Math.random() - 0.5) * 30;

    let next = Number((s.value + delta).toFixed(1));
    if (next < s.min) next = s.min;
    if (next > s.max) next = s.max;

    return { ...s, value: next };
  });
}

export function colorEstado(status) {
  if (status === "Active") return "bg-green-100 text-green-700 border-green-200";
  if (status === "Inactive") return "bg-red-100 text-red-700 border-red-200";
  return "bg-slate-100 text-slate-700 border-slate-200"; // Stand By u otros
}
