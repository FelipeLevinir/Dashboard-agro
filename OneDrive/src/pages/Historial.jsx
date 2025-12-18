import { useState } from "react";
import Topbar from "../layout/Topbar";
import Card from "../ui/Card";
import Table from "../ui/Table";
import { dataBase } from "../data/data_base";

export default function Historial() {
  const [rows] = useState(dataBase.historial);

  const columns = [
    { key: "at", header: "Fecha/Hora" },
    { key: "type", header: "Tipo" },
    { key: "message", header: "Mensaje" },
  ];

  return (
    <div>
      <Topbar title="Historial" subtitle="Eventos del sistema (para culpar al MQTT cuando falle)" />
      <Card title="Logs" icon="🧾">
        <Table columns={columns} rows={rows} rowKey="id" />
      </Card>
    </div>
  );
}
