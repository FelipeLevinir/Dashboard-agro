import {useState, useEffect} from 'react'
import {obtenerAlarmasActuales} from '../../services/backend_api'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf, faWater, faTint, faTachometerAlt, faQuestionCircle, faChartLine, faBoltLightning, faFlask, faCube, faLayerGroup, faBatteryThreeQuarters, faBatteryQuarter, faBatteryFull, faBatteryEmpty, faBell, faCircleCheck, faCheckCircle  } from "@fortawesome/free-solid-svg-icons";

export const Alertas = () => {
    const [dataAlertas, setDataAlertas] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        let isMounted = true
        const cargarDatos = async () => {
            try {
                setLoading(true)
                const data = await obtenerAlarmasActuales()
                console.log(data)
                if (!isMounted) return
                setDataAlertas(data)
                setError("")
            } catch (e) {
                if (!isMounted) return
                setError(e.message || "Error al cargar datos")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        cargarDatos()
        return () => {
            isMounted = false
        }
    }, [])

    const batteryBadgeClass = (battery) => {
        if (battery >= 80) return "bg-green-500/10 w-full h-full rounded-full p-2 text-green-400";
        if (battery >= 60) return "bg-yellow-500/10 w-full h-full rounded-full p-2 text-yellow-400";
        if (battery >= 40) return "bg-orange-500/10 w-full h-full rounded-full p-2 text-orange-400";
    return "bg-red-500/10 w-full h-full rounded-full p-2 text-red-400";
    }

    const batteryBadgeIcon = (battery) => {
        if (battery >= 80) return faBatteryThreeQuarters;
        if (battery >= 60) return faBatteryQuarter;
        if (battery >= 40) return faBatteryFull;
    return faBatteryEmpty;
    }

    const getIcon = (nameMetric, value) => {
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
            "voltage": <FontAwesomeIcon className={batteryBadgeClass(value)} icon={batteryBadgeIcon(value)} />,
        };
        console.log(nameMetric)
        const metricLower = nameMetric.toLowerCase();
        
        for (const key in icons) {
            if (metricLower.includes(key.toLowerCase())) {
                return icons[key];
            }
        }
        return <FontAwesomeIcon icon={faQuestionCircle} />;
    };

    const formatAlertDateSimple = (fecha) => {
        const date = new Date(fecha);
        const now = new Date();
        
        // Diferencia en días
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        // Meses en español (abreviados sin punto)
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day} ${month} ${year}, ${hours}:${minutes} (${diffDays} días)`;
        };
    
        const resolvedAlerts = () => {
            return dataAlertas.filter(a => a.resolved).length;
        }


  return (
    <div className='p-4 bg-white'>
        {loading ? (
            <div className="mb-4 text-sm text-slate-500">
                Actualizando datos…
            </div>
        ): (
            <>
                <div className='flex flex-col-4 gap-4 mb-4 justify-center'>
                    <div className='flex items-center justify-between gap-8 md:gap-4 sm:gap-2 rounded-xl p-4 border border-slate-500 bg-white'>
                        <div>
                            <h2 className="text-sm text-slate-500">Total Alertas</h2>
                            <span className='text-xl font-bold'>{dataAlertas.length}</span>
                        </div>
                        <FontAwesomeIcon className='text-2xl text-blue-500' icon={faBell}></FontAwesomeIcon>
                    </div>
                    <div className='flex items-center justify-between gap-8 md:gap-4 sm:gap-2 rounded-xl p-4 border border-slate-500 bg-white'>
                        <div>
                            <h2 className="text-sm text-slate-500">Resueltas</h2>
                            <span className='text-xl font-bold'>{resolvedAlerts()}</span>
                        </div>
                        <FontAwesomeIcon className='text-2xl text-green-500' icon={faCheckCircle}></FontAwesomeIcon>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between rounded-full">
                        <table className="min-w-full text-sm">
                            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-600">
                                <tr>
                                    <th className="text-left px-4 py-3">Tipo</th>
                                    <th className="text-left px-4 py-3">Sensor</th>
                                    <th className="text-left px-4 py-3">Regla</th>
                                    <th className="text-left px-4 py-3">Umbral</th>
                                    <th className="text-left px-4 py-3">Severidad</th>
                                    <th className="text-left px-4 py-3">Fecha</th>
                                    <th className="text-left px-4 py-3">Estado</th>
                                </tr>                        
                            </thead>
                            <tbody>
                                {dataAlertas.map((a, i) => (
                                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-row items-center">
                                                <span className="text-sm mr-2">{getIcon(a.name, a.value)}</span>
                                                <span className="text-sm font-mono text-slate-500">{a.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-sm">{a.sensor}</td>
                                        <td className="px-4 py-3 font-mono text-sm">{a.rule}</td>
                                        <td className="px-4 py-3 font-mono text-sm"><span className={`flex w-max ${a.threshold === "Sobre el limite" ? "bg-red-500/10 rounded-full p-2 text-red-500" : "bg-yellow-500/10 rounded-full p-2 text-yellow-500"}`}>{a.threshold}</span></td>
                                        <td className="px-4 py-3 font-mono text-sm"><span className={`flex w-max font-bold ${a.severity === "Alta Gravedad" ? "bg-red-500/10 rounded-full p-2 text-red-500" : "bg-blue-500/10 rounded-full p-2 text-blue-500"}`}>{a.severity}</span></td>
                                        <td className="px-4 py-3 font-mono text-sm"><span className='flex w-max'>{formatAlertDateSimple(a.alarmed)}</span></td>
                                        <td className="px-4 py-3 font-mono text-sm">
                                            <span className={`font-bold ${a.resolved ? "bg-green-500/10 rounded-full p-2 text-green-500" : "bg-red-500/10 rounded-full p-2 text-red-500"}`}>{a.resolved ? "Resuelto" : "Pendiente"}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer>
                    <div className="mt-4 text-sm text-slate-500 justify-center flex">
                    <span className="font-bold">Última actualización: </span>{new Date().toLocaleString("es-CL")}
                    </div>
                </footer>
            </>
        )}
        {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
                {error}
            </div>
        )}
    </div>
  )
}
