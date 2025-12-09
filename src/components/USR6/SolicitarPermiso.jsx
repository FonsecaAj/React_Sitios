import { useState, useEffect } from "react";
import { getMotivosUsr6, crearPermiso } from "../../services/usr6Service";

export default function SolicitarPermiso() {
  const [motivos, setMotivos] = useState([]);

  const [fechaInicio, setFechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [idMotivo, setIdMotivo] = useState("");
  const [obs, setObs] = useState("");
  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    getMotivosUsr6().then(setMotivos);
  }, []);

  async function enviar() {
    const formData = new FormData();
    formData.append("fecha_inicio", fechaInicio);
    formData.append("hora_inicio", horaInicio);
    formData.append("fecha_fin", fechaFin);
    formData.append("hora_fin", horaFin);
    formData.append("id_motivo", idMotivo);
    formData.append("observaciones", obs);

    if (archivo) formData.append("adjunto", archivo);

    try {
      await crearPermiso(formData);
      alert("Permiso enviado correctamente");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div>
      <h2>Solicitar permiso</h2>

      <div className="row">
        <div className="col-md-3">
          <label>Fecha inicio</label>
          <input type="date" className="form-control"
            value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label>Hora inicio</label>
          <input type="time" className="form-control"
            value={horaInicio} onChange={e => setHoraInicio(e.target.value)} />
        </div>

        <div className="col-md-3">
          <label>Fecha fin</label>
          <input type="date" className="form-control"
            value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label>Hora fin</label>
          <input type="time" className="form-control"
            value={horaFin} onChange={e => setHoraFin(e.target.value)} />
        </div>
      </div>

      <label className="mt-3">Motivo</label>
      <select className="form-select"
        value={idMotivo} onChange={e => setIdMotivo(e.target.value)}>
        <option value="">Seleccione</option>
        {motivos.map((m) => (
          <option key={m.id} value={m.id}>{m.nombre}</option>
        ))}
      </select>

      <label className="mt-3">Observaciones</label>
      <textarea
        className="form-control"
        value={obs}
        onChange={(e) => setObs(e.target.value)}
        maxLength={300}
      />

      <label className="mt-3">Adjunto (opcional)</label>
      <input
        type="file"
        className="form-control"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => setArchivo(e.target.files[0])}
      />

      <button className="btn btn-success mt-3" onClick={enviar}>Enviar</button>
    </div>
  );
}
