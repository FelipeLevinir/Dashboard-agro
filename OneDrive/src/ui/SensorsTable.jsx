import "primereact/resources/primereact.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'primereact/button';

// import { useModal } from './modal/useModal';
// import { DetailSensors } from "./DetailSensors";

// import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { Modal } from "./Modal";

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

function rssiClassBackground(rssi) {
  if (rssi === null || rssi === undefined) return "bg-slate-500";
  if (rssi >= -70) return "bg-green-700";
  if (rssi >= -85) return "bg-amber-700";
  return "bg-red-700";
}

function batteryClass(battery) {
  if (battery === null || battery === undefined) return "text-slate-500";
  if (battery >= 40) return "text-green-700 font-semibold";
  if (battery >= 20) return "text-amber-700 font-semibold";
  return "text-red-700 font-semibold";
}

function batteryBadgeClass(battery) {
  if (battery >= 80) return "bg-green-500";
  if (battery >= 60) return "bg-yellow-500";
  if (battery >= 40) return "bg-orange-500";
  return "bg-red-500";
}

function formatIso(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("es-CL");
}

export default function SensorsTable({ sensors, onViewDetails }) {
  const sensorsOrdenados = [...sensors].sort((a, b) => {
    const ta = a.lastTime ? new Date(a.lastTime).getTime() : 0;
    const tb = b.lastTime ? new Date(b.lastTime).getTime() : 0;
    return tb - ta; // más reciente primero
  });

  // const { openModal } = useModal();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-700/50 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <FontAwesomeIcon icon={faListOl} color="blue"></FontAwesomeIcon>
          <h2 className="text-xl font-semibold">Sensores</h2>
          <span className="ml-3 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
            {sensorsOrdenados.length} sensores
          </span>
        </div>
        <div className="text-sm text-slate-500">
          Ordenado por última lectura (más reciente primero)
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
              <th className="text-left px-4 py-3">Detalles</th>
            </tr>
          </thead>

          <tbody>
            {sensorsOrdenados.map((s) => (
              <tr key={s.sensorId} className="border-t border-slate-100 hover:bg-slate-50">

                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${s.novelty === "new" ? "bg-green-500" : "bg-gray-500"} mr-3`}></div>
                    <span className="font-medium font-mono">{s.sensorId}</span>
                  </div>
                </td>
                
                <td className="px-4 py-3 font-mono text-sm">{formatIso(s.lastTime)}</td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className={`${rssiClass(s.rssi)}`}>
                      {s.rssi ?? "-"} <span className="text-slate-400">dBm</span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-16 h-6 bg-gray-700/50 rounded-full overflow-hidden mr-3">
                      <div className={`h-full ${batteryBadgeClass(s.battery)}`} style={{ width: `${s.battery}%`}}></div>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-2">{s.battery ?? "-"}%</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <span className={chipClass(s.novelty)}>
                    {s.novelty === "new" ? "Activo" : "Antiguo"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <Button icon="pi pi-eye" onClick={
                    () => onViewDetails?.(s) }/>
                  {/* <Modal /> */}
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
