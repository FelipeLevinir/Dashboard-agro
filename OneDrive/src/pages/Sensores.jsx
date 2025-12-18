import { useEffect, useState } from "react";
import Topbar from "../layout/Topbar";
import Card from "../ui/Card";
import { dataBase, simularTickSensores } from "../data/data_base";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";

export default function Sensores() {
  const [sensores, setSensores] = useState(dataBase.sensores);

  useEffect(() => {
    const id = setInterval(() => setSensores((p) => simularTickSensores(p)), 1000);
    return () => clearInterval(id);
  }, []);

  const isInRange = (range, rangeMin, rangeMax) => {
    if ((range < rangeMin) || (range > rangeMax)) return false;
    if ((range >= rangeMin) || (range <= rangeMax)) return true;
  };
  const getRangeFill = (range, rangeMin, rangeMax) => {
    const rangeSize = rangeMax - rangeMin;
    const rangePosition = range - rangeMin;
    return (rangePosition / rangeSize) * 100;
  };

  return (
    <div>
      <Topbar title="Sensores" subtitle="Lecturas actuales y rangos esperados" />
      <Card title="Lecturas" icon="📡">
        <div className="space-y-3 flex flex-col lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {
            sensores.map((s) => (
              <div key={s.id} className="backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{s.label}</h2>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${s.label === "Temperature" ? "bg-red-500/10 text-red-400" : s.label === "Relative Humidity" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"}`}>
                      <span className="text-2xl">
                        {s.label === "Temperature" ? <FontAwesomeIcon icon={faThermometerHalf}></FontAwesomeIcon> : s.label === "Relative Humidity" ? <FontAwesomeIcon icon={faTint}></FontAwesomeIcon> : <FontAwesomeIcon icon={faWind}></FontAwesomeIcon>}
                        </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8 mt-4">
                  <div className="text-5xl font-bold mb-2">
                    {s.value}
                    <span className="text-3xl text-gray-400 ml-2">{s.unit}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${isInRange(s.value, s.min, s.max) ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="text-sm text-gray-800">{isInRange(s.value, s.min, s.max) ? "Dentro del rango" : "Fuera del rango"}</span>
                </div>
                
                <div className="rounded-xl p-5">
                  <div className="flex flex-col justify-between mb-2">
                    <span className="text-xl font-bold">Rango esperado</span>
                    <span>
                      {s.min}
                      {s.unit} - {s.max}
                      {s.unit}
                    </span>
                  </div>
                </div>

                <div className="h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${getRangeFill(s.value, s.min, s.max)}%` }}></div>
                </div>

                <div className="flex justify-between mt-4 text-sm">
                  <span className="text-blue-500">{s.min}{s.unit}</span>
                  <span className="text-orange-500">{s.max}{s.unit}</span>
                </div>
              </div>
            ))
          }
        </div>
      </Card>
      <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Última actualización: hoy a las {new Date().toLocaleTimeString()} • Sistema de monitoreo propio</p>
      </footer>
    </div>
  );
}
