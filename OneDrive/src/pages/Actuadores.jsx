import { useMemo, useState } from "react";
import Topbar from "../layout/Topbar";
import Card from "../ui/Card";
import Table from "../ui/Table";
import Toggle from "../ui/Toggle";
import { dataBase, colorEstado } from "../data/data_base";

export default function Actuadores() {
  const [actuadores, setActuadores] = useState(dataBase.actuadores);

  const columns = useMemo(
    () => [
      { key: "name", header: "Name" },
      { key: "description", header: "Description" },
      {
        key: "status",
        header: "Status",
        render: (r) => (
          <span className={`inline-flex items-center px-2 py-1 rounded-lg border text-xs ${colorEstado(r.status)}`}>
            {r.status}
          </span>
        ),
      },
      {
        key: "manual",
        header: "Toggle",
        render: (r) => (
          <Toggle
            checked={r.manual}
            onChange={(next) => {
              setActuadores((prev) =>
                prev.map((a) => (a.id === r.id ? { ...a, manual: next } : a))
              );
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Topbar title="Actuadores" subtitle="Control manual simulado y estados" />
      <Card title="Listado" icon="🧰">
        <Table columns={columns} rows={actuadores} rowKey="id" />
      </Card>
    </div>
  );
}
