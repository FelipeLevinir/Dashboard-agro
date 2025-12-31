import { Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Sensores from "./pages/Sensores";
import Actuadores from "./pages/Actuadores";
import Historial from "./pages/Historial";
import Configuracion from "./pages/Configuracion";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="md:flex">
          <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sensores" element={<Sensores />} />
              <Route path="/actuadores" element={<Actuadores />} />
              <Route path="/historial" element={<Historial />} />
              <Route path="/configuracion" element={<Configuracion />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
