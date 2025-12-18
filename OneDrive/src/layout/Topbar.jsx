export default function Topbar({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm hover:bg-slate-50">
          🔔 Alertas
        </button>
        <div className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm">
          Pipe Mode: ON
        </div>
      </div>
    </div>
  );
}
