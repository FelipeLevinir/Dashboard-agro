import Topbar from "../layout/Topbar";
import Card from "../ui/Card";

export default function Configuracion() {
  return (
    <div>
      <Topbar title="Configuración" subtitle="Parámetros de ejemplo (sin romper producción… todavía)" />
      <Card title="Conexiones" icon="⚙️">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="font-semibold text-slate-800">Broker MQTT</div>
            <div className="text-sm text-slate-500 mt-1">mqtt://localhost:1883</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="font-semibold text-slate-800">Frecuencia de muestreo</div>
            <div className="text-sm text-slate-500 mt-1">1s (simulado)</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
