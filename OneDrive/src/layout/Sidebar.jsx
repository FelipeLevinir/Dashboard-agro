import { NavLink } from "react-router-dom";

const itemBase =
  "flex items-center gap-3 px-4 py-2 rounded-xl transition text-sm font-medium";

const active = "bg-slate-800 text-white";
const idle = "text-slate-300 hover:bg-slate-800/60 hover:text-white";

function Item({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${itemBase} ${isActive ? active : idle}`}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-72 shrink-0 h-screen sticky top-0 bg-slate-900 border-r border-slate-800">
      <div className="px-5 py-5">
        <div className="text-white font-semibold text-lg leading-tight">
          IA Agrónoma
        </div>
        <div className="text-slate-400 text-xs mt-1">
          Dashboard IoT (modo “Prime vibes”)
        </div>
      </div>

      <nav className="px-3 space-y-2">
        <Item to="/" label="Dashboard" icon="📊" />
        <Item to="/sensores" label="Sensores" icon="🌡️" />
        <Item to="/actuadores" label="Actuadores" icon="🧰" />
        <Item to="/historial" label="Historial" icon="🧾" />
        <Item to="/configuracion" label="Configuración" icon="⚙️" />
      </nav>

      <div className="mt-auto px-5 py-5 text-xs text-slate-500">
        <div>Estado: Online</div>
        <div>MQTT: OK (en teoría)</div>
      </div>
    </aside>
  );
}
