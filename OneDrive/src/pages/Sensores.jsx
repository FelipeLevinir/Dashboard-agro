import { useEffect, useState } from "react";
import Topbar from "../layout/Topbar";
import Card from "../ui/Card";
import { dataBase, simularTickSensores } from "../data/data_base";

export default function Sensores() {
  const [sensores, setSensores] = useState(dataBase.sensores);

  useEffect(() => {
    const id = setInterval(() => setSensores((p) => simularTickSensores(p)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <Topbar title="Sensores" subtitle="Lecturas actuales y rangos esperados" />
      <Card title="Lecturas" icon="📡">
        <div className="space-y-3">
          {sensores.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
              <div>
                <div className="font-semibold text-slate-800">{s.label}</div>
                <div className="text-xs text-slate-500">Rango: {s.min}–{s.max} {s.unit}</div>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {s.value} <span className="text-base text-slate-500">{s.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
