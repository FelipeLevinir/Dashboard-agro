import React, { useEffect, useState } from "react";
import { obtenerUltimaMedida } from "../services/backend_api";
import { useModal } from "./modal/useModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf, faWater, faTint, faTachometerAlt, faQuestionCircle, faChartLine, faBoltLightning, faFlask, faCube, faLayerGroup  } from "@fortawesome/free-solid-svg-icons";

function parseLocationSensor(location) {    
  const abreviaturas = ['Pto', 'Av', 'Dr', 'Ing', 'Lic', 'Prof'];
  const regexAbrev = abreviaturas.join('|');

  const pattern = new RegExp(`(?<!${regexAbrev})[.:]\\s*`, 'g');

  return location.split(pattern)
      .map(part => part.trim())
      .filter(part => part.length > 0);
}

export const DetailSensors = ({sensor}) => {
  const [sensorMeasurements, setSensorMeasurements] = useState([]);
  const [sensorTimeMeasurements, setSensorTimeMeasurements] = useState("");
  const [sensorGeneral, setSensorGeneral] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateModalConfig } = useModal();
  

  useEffect(() => {
    let isMounted = true;

    const cargarDatos = async () => {
      try {
        setLoading(true);
        const data = await obtenerUltimaMedida(sensor.sensorId);
        const measurements = data.data || [];
        const timeMeasurements = data.time || "";
        let assetMeasurements = data.asset || "";
        const pointMeasurements = data.point || [];

        assetMeasurements = assetMeasurements.replace(/^[a-zA-Z0-9]+\.\s*/, '');

        // console.log("Detalle sensor data:", parseLocationSensor(pointMeasurements));

        setSensorGeneral({
          ...sensor,
          asset: assetMeasurements,
          point: pointMeasurements
        })

        updateModalConfig({title: <div className="flex flex-col lg:flex-row lg:justify-between gap-4 items-center justify-between rounded-full p-2"><span className="text-2xl font-bold">{assetMeasurements}</span><span className="text-sm rounded-full p-2 bg-slate-400 text-white whitespace-nowrap">ID: {sensor.sensorId}</span></div>})


        if (!isMounted) return;

        setSensorMeasurements(measurements);
        setSensorTimeMeasurements(timeMeasurements);
        setError("");

      } catch (e) {
        if (!isMounted) return;
        setError(e.message || "Error al cargar datos");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    cargarDatos();

    return () => {
      isMounted = false;
    };
  }, []);

  const getIcon = (nameMetric) => {
    const icons = {
      "Temperature": <FontAwesomeIcon className="bg-red-500/10 w-full h-full rounded-full p-2 text-red-400" icon={faThermometerHalf}></FontAwesomeIcon>,
      "Humidity": <FontAwesomeIcon className="bg-blue-500/10 w-full h-full rounded-full p-2 text-blue-400" icon={faTint} />,
      "Pressure": <FontAwesomeIcon  className="bg-rose-500/10 w-full h-full rounded-full p-2 text-rose-400" icon={faTachometerAlt} />,
      "Water": <FontAwesomeIcon className="bg-sky-500/10 w-full h-full rounded-full p-2 text-sky-400" icon={faWater} />,
      "Soil Dielectric Permittivity": <FontAwesomeIcon className="bg-green-500/10 w-full h-full rounded-full p-2 text-green-400" icon={faChartLine} />,
      "Soil Electrical Conductivity": <FontAwesomeIcon className="bg-purple-500/10 w-full h-full rounded-full p-2 text-purple-400" icon={faBoltLightning} />,
      "Pore Electrical Conductivity": <FontAwesomeIcon className="bg-amber-500/10 w-full h-full rounded-full p-2 text-amber-400" icon={faFlask} />,
      "period": <FontAwesomeIcon className="bg-yellow-900/10 w-full h-full rounded-full p-2 text-yellow-700" icon={faCube} />,
      "cumulative": <FontAwesomeIcon className="bg-lime-900/10 w-full h-full rounded-full p-2 text-lime-700" icon={faLayerGroup} />,
    };
    const metricLower = nameMetric.toLowerCase();
    
    for (const key in icons) {
        if (metricLower.includes(key.toLowerCase())) {
            return icons[key];
        }
    }
    return <FontAwesomeIcon icon={faQuestionCircle} />;
};

  return (
    <>
      <div>
        {loading && (
          <div className="mb-4 text-sm text-slate-500">
            Cargando datos…
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}
      </div>
      <>
        {
          sensorMeasurements.length > 0 && (
            <>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">Ubicación de la estación</h2>
              <div className="mb-4">
                <span>{sensorGeneral.point}</span>
              </div>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:space-y-0 md:grid md:grid-cols-2 md:space-y-0 gap-4">
              {sensorMeasurements.map((m, i) => (
                <div key={i} className="bg-white rounded-xl border p-4">
                  <div className="flex flex-col lg:flex-row md:flex-row gap-4 items-center justify-between">
                    <span className="text-2xl">{getIcon(m.nameMetric)}</span>
                    <div className="flex flex-col">
                      <h2 className="text-sm text-slate-500">
                        {m.nameMetric}
                      </h2>
                      <div className="flex items-center space-x-4">
                        <span><span className="font-bold">{m.value}</span> {m.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <footer>
              <div className="mt-4 text-sm text-slate-500 justify-center flex">
                <span className="font-bold">Última actualización: </span>{new Date(sensorTimeMeasurements).toLocaleString("es-CL")}
              </div>
            </footer>
            </>
          )
        }
      </>
    </>
  )
}
