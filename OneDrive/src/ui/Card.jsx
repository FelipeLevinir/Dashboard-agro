export default function Card({ title, icon, children }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-200">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
        <div className="font-semibold text-slate-800">{title}</div>
        <div className="text-slate-400">{icon}</div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
