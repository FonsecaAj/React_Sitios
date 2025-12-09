import { useState } from "react";
import { crearVacacion } from "../services/vacacionesService";

export default function NuevaVacacion({ idUsuario }) {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  async function enviar() {
    const res = await crearVacacion({
      idSolicitante: idUsuario,
      fechaInicio: inicio,
      fechaFin: fin,
      motivo: "Vacaciones solicitadas desde React",
      adjuntos: null
    });

    alert(res.status === "success" ? "Solicitud enviada" : "Error");
  }

  return (
    <div>
      <h3>Nueva Solicitud de Vacaciones</h3>

      <label>Fecha Inicio</label>
      <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />

      <label>Fecha Fin</label>
      <input type="date" value={fin} onChange={(e) => setFin(e.target.value)} />

      <button onClick={enviar} style={{ marginTop: 10 }}>
        Enviar Solicitud
      </button>
    </div>
  );
}
