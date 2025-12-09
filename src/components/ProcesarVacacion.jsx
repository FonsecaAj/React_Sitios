import { procesarVacacion } from "../services/vacacionesService";
import { useState } from "react";

export default function ProcesarVacacion({ idSolicitud }) {
  const [observacion, setObservacion] = useState("");

  async function aprobar() {
    await procesarVacacion({
      idSolicitud,
      accion: "Aprobado",
      observacion
    });
    alert("Solicitud aprobada");
  }

  async function rechazar() {
    await procesarVacacion({
      idSolicitud,
      accion: "Rechazado",
      observacion
    });
    alert("Solicitud rechazada");
  }

  return (
    <div>
      <h3>Procesar Solicitud #{idSolicitud}</h3>

      <textarea
        placeholder="Observación"
        onChange={(e) => setObservacion(e.target.value)}
      />

      <div>
        <button onClick={aprobar}>Aprobar</button>
        <button onClick={rechazar} style={{ marginLeft: 10 }}>
          Rechazar
        </button>
      </div>
    </div>
  );
}
