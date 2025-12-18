import { useEffect, useState } from "react";
import { obtenerUltimaTelemetria } from "../services/backend_api";
import { mapTelemetryToSensors, buildKpis } from "../utils/aranetMapper";
import SensorsTable from "../ui/SensorsTable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faBatteryEmpty } from "@fortawesome/free-solid-svg-icons";


const REFRESH_MS = 60_000;

export default function Dashboard() {
  const [sensors, setSensors] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const cargarDatos = async () => {
      try {
        setLoading(true);
        const data = await obtenerUltimaTelemetria();

        if (!isMounted) return;

        const mapped = mapTelemetryToSensors(data);
        setSensors(mapped);
        setKpis(buildKpis(mapped));
        setError("");
      } catch (e) {
        if (!isMounted) return;
        setError(e.message || "Error al cargar datos");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargarDatos();
    const intervalId = setInterval(cargarDatos, REFRESH_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      {loading && (
        <div className="mb-4 text-sm text-slate-500">
          Actualizando datos…
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      <div>
        {kpis && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Kpi title="Batería promedio" value={`${kpis.avgBattery} %`} />
            <Kpi title="RSSI promedio" value={`${kpis.avgRssi} dBm`} />
            <Kpi title="Sensores activos" value={kpis.activeSensors} />
            <Kpi title="Batería baja" value={kpis.lowBattery} />
          </div>
        )}

          <SensorsTable sensors={sensors} />
      </div>
    </div>
  );
}

function Kpi({ title, value }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-slate-500">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className={`rounded-xl p-2 ${title === "Batería promedio" ? "bg-green-500/10 text-green-400" : title === "RSSI promedio" ? "bg-blue-500/10 text-blue-400" : title === "Sensores activos" ? "bg-pink-500/10 text-pink-400" : "bg-red-500/10 text-red-400"}`}>
            <span className="text-2xl">
              {title === "Batería promedio" ? <FontAwesomeIcon icon={faBatteryThreeQuarters}></FontAwesomeIcon> : title === "RSSI promedio" ? <FontAwesomeIcon icon={faWifi}></FontAwesomeIcon> : title === "Sensores activos" ? <FontAwesomeIcon icon={faMicrochip}></FontAwesomeIcon> : <FontAwesomeIcon icon={faBatteryEmpty}></FontAwesomeIcon>}
            </span>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold ">{value}</div>
    </div>
  );
}