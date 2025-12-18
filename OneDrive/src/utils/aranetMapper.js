export function mapTelemetryToSensors(data) {
  const sensorsMap = {};

  for (const r of data.readings) {
    if (!sensorsMap[r.sensor]) {
      sensorsMap[r.sensor] = {
        sensorId: r.sensor,
        lastTime: r.time,
        rssi: null,
        battery: null,
        novelty: r.novelty,
      };
    }

    // Última lectura manda
    if (new Date(r.time) > new Date(sensorsMap[r.sensor].lastTime)) {
      sensorsMap[r.sensor].lastTime = r.time;
      sensorsMap[r.sensor].novelty = r.novelty;
    }

    if (r.metric === "61") {
      sensorsMap[r.sensor].rssi = r.value;
    }

    if (r.metric === "62") {
      sensorsMap[r.sensor].battery = r.value;
    }
  }

  return Object.values(sensorsMap);
}

export function buildKpis(sensors) {
  const withBattery = sensors.filter(s => s.battery !== null);
  const withRssi = sensors.filter(s => s.rssi !== null);

  const avgBattery =
    withBattery.reduce((a, b) => a + b.battery, 0) / withBattery.length;

  const avgRssi =
    withRssi.reduce((a, b) => a + b.rssi, 0) / withRssi.length;

  const activeSensors = sensors.filter(s => s.novelty === "new").length;
  const lowBattery = sensors.filter(s => s.battery !== null && s.battery < 20).length;

  return {
    avgBattery: avgBattery.toFixed(1),
    avgRssi: avgRssi.toFixed(1),
    activeSensors,
    lowBattery,
  };
}
