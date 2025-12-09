import { useEffect, useState } from "react";
import { getMotivosUsr5, justificarInconsistencia } from "../../services/usr5Service";

export default function Justificar({ inconsistencia, onBack }) {

  const [motivos, setMotivos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [idMotivo, setIdMotivo] = useState("");
  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    getMotivosUsr5().then(setMotivos);
  }, []);

  async function enviar() {
    const formData = new FormData();
    formData.append("id_inconsistencia", inconsistencia.id);
    formData.append("id_motivo", idMotivo);
    formData.append("descripcion", descripcion);

    if (archivo) formData.append("adjunto", archivo);

    try {
      await justificarInconsistencia(formData);
      alert("Justificación enviada");
      onBack();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div>
      <h2>Justificar inconsistencia</h2>

      <p><strong>Inconsistencia:</strong> {inconsistencia.nombre}</p>

      <select
        className="form-select"
        value={idMotivo}
        onChange={(e) => setIdMotivo(e.target.value)}
      >
        <option value="">Seleccione un motivo</option>
        {motivos.map((m) => (
          <option key={m.id} value={m.id}>{m.nombre}</option>
        ))}
      </select>

      <textarea
        className="form-control mt-3"
        placeholder="Descripción"
        maxLength={300}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        type="file"
        className="form-control mt-3"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => setArchivo(e.target.files[0])}
      />

      <button className="btn btn-success mt-3" onClick={enviar}>Enviar</button>
      <button className="btn btn-secondary mt-3 ms-2" onClick={onBack}>Volver</button>
    </div>
  );
}
