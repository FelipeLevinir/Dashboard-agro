import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'primereact/button';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const itemBase =
  "flex items-center gap-3 px-4 py-2 rounded-xl transition text-sm font-medium";

const active = "bg-slate-800 text-white";
const idle = "text-slate-300 hover:bg-slate-800/60 hover:text-white";

function Item({ to, label, icon, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${itemBase} ${isActive ? active : idle}`}
      onClick={onClick}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sideBarContent = (
    <>
      <div className="px-5 py-5">
          <div className="text-white font-semibold text-lg leading-tight">
            IA Agrónoma
          </div>
          <div className="text-slate-400 text-xs mt-1">
            Dashboard IoT (modo “Prime vibes”)
          </div>
        </div>

        <nav className="px-3 space-y-2">
          <Item to="/" label="Dashboard" icon="📊" onClick={() => setIsOpen(false)} />
          <Item to="/sensores" label="Sensores" icon="🌡️" onClick={() => setIsOpen(false)} />
          <Item to="/actuadores" label="Actuadores" icon="🧰" onClick={() => setIsOpen(false)} />
          <Item to="/historial" label="Historial" icon="🧾" onClick={() => setIsOpen(false)} />
          <Item to="/configuracion" label="Configuración" icon="⚙️" onClick={() => setIsOpen(false)} />
        </nav>

        <div className="mt-auto px-5 py-5 text-xs text-slate-500">
          <div>Estado: Online</div>
          <div>MQTT: OK (en teoría)</div>
        </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-colors"
          aria-label="Abrir menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        {
          isOpen && (
            <div className="inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            >  
            </div>
          )
        }
        <aside 
          className="fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-out"
          role="navigation"
          style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          <Button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Cerrar menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        <div className="mt-4">
          {sideBarContent} 
        </div>     
        </aside>
      </>
    )
  }


  return (
    <aside className="w-72 shrink-0 h-screen sticky top-0 bg-slate-900 border-r border-slate-800">
      {sideBarContent}  
    </aside>
  );
}