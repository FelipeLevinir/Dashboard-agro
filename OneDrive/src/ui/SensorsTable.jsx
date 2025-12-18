function chipClass(tipo) {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  if (tipo === "new") return `${base} bg-green-100 text-green-700`;
  return `${base} bg-slate-100 text-slate-700`;
}

function rssiClass(rssi) {
  if (rssi === null || rssi === undefined) return "text-slate-500";
  if (rssi >= -70) return "text-green-700 font-semibold";
  if (rssi >= -85) return "text-amber-700 font-semibold";
  return "text-red-700 font-semibold";
}

function batteryClass(battery) {
  if (battery === null || battery === undefined) return "text-slate-500";
  if (battery >= 40) return "text-green-700 font-semibold";
  if (battery >= 20) return "text-amber-700 font-semibold";
  return "text-red-700 font-semibold";
}

function formatIso(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("es-CL");
}

export default function SensorsTable({ sensors }) {
  const sensorsOrdenados = [...sensors].sort((a, b) => {
    const ta = a.lastTime ? new Date(a.lastTime).getTime() : 0;
    const tb = b.lastTime ? new Date(b.lastTime).getTime() : 0;
    return tb - ta; // más reciente primero
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="font-semibold">Sensores</div>
          <div className="text-sm text-slate-500">
            Ordenado por última lectura (más reciente primero)
          </div>
        </div>
      </div>

      {/* Scroll SOLO en tabla */}
      <div className="overflow-y-auto max-h-[60vh]">
        <table className="min-w-full text-sm">
          {/* Sticky header */}
          <thead className="sticky top-0 z-10 bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3">Sensor</th>
              <th className="text-left px-4 py-3">Última lectura</th>
              <th className="text-left px-4 py-3">RSSI</th>
              <th className="text-left px-4 py-3">Batería</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>

          <tbody>
            {sensorsOrdenados.map((s) => (
              <tr key={s.sensorId} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-mono">{s.sensorId}</td>
                <td className="px-4 py-3">{formatIso(s.lastTime)}</td>
                <td className={`px-4 py-3 ${rssiClass(s.rssi)}`}>
                  {s.rssi ?? "-"} <span className="text-slate-400">dBm</span>
                </td>
                <td className={`px-4 py-3 ${batteryClass(s.battery)}`}>
                  {s.battery ?? "-"} <span className="text-slate-400">%</span>
                </td>
                <td className="px-4 py-3">
                  <span className={chipClass(s.novelty)}>
                    {s.novelty === "new" ? "Activo" : "Antiguo"}
                  </span>
                </td>
              </tr>
            ))}

            {sensorsOrdenados.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  Sin datos por ahora…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
