import { useEffect, useState } from "react";
import { getResoluciones } from "../services/jefaturaService";

export default function JefaturaResoluciones() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [tipo, setTipo] = useState(""); 
  const [estado, setEstado] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const cargarResoluciones = async (usarFiltros = false) => {
    setCargando(true);
    setError("");

    const filtros = {};

    if (usarFiltros) {
      if (tipo) filtros.tipo = tipo;
      if (estado) filtros.estado = estado;
      if (idUsuario) filtros.idUsuario = Number(idUsuario);
      if (desde) filtros.desde = desde;
      if (hasta) filtros.hasta = hasta;
    }

    try {
      const data = await getResoluciones(filtros);

      if (data && Array.isArray(data.items)) {
        setLista(data.items);
      } else if (Array.isArray(data)) {
        setLista(data);
      } else {
        setLista([]);
      }
    } catch (e) {
      console.error("Error al cargar resoluciones:", e);
      setLista([]);
      setError(
        "No se pudieron cargar las resoluciones de jefatura. " +
          "Si estás en local puede ser un problema de conexión con el servidor de la U."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarResoluciones(false);
  }, []);

  const limpiarFiltros = () => {
    setTipo("");
    setEstado("");
    setIdUsuario("");
    setDesde("");
    setHasta("");
    cargarResoluciones(false);
  };

  const formatearFecha = (valor) => {
    if (!valor) return "—";
    const d = new Date(valor);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Resoluciones de Jefatura</h2>

      {/* Filtros */}
      <div className="card mb-3">
        <div className="card-body">
          {/* Fila 1: Tipo, Estado, ID Funcionario */}
          <div className="row g-3 justify-content-center align-items-end">
            <div className="col-md-3">
              <label className="form-label">Tipo</label>
              <select
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="">(Todo)</option>
                <option value="Permiso">Permiso</option>
                <option value="Justificación">Justificación</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">(Todo)</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">ID Funcionario</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 14"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}
              />
            </div>
          </div>

          {/* Fila 2: Desde / Hasta */}
          <div className="row g-3 justify-content-center align-items-end mt-1">
            <div className="col-md-3">
              <label className="form-label">Desde</label>
              <input
                type="date"
                className="form-control"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Hasta</label>
              <input
                type="date"
                className="form-control"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="mt-3 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={limpiarFiltros}
              disabled={cargando}
            >
              Limpiar filtros
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => cargarResoluciones(true)}
              disabled={cargando}
            >
              {cargando ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!cargando && !error && lista.length === 0 && (
        <p>No hay resoluciones registradas.</p>
      )}

      {/* Tabla */}
      {lista.length > 0 && (
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Funcionario</th>
                <th>Fecha solicitud</th>
                <th>Fecha resolución</th>
                <th>Decisión</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((r, idx) => {
                const idRegistro = r.idRegistro ?? r.IdRegistro;
                const tipo = r.tipo ?? r.Tipo;
                const funcionario = r.funcionario ?? r.Funcionario;
                const fechaDesde = r.fechaDesde ?? r.FechaDesde;
                const fechaResolucion = r.fechaResolucion ?? r.FechaResolucion;
                const decision = r.decision ?? r.Decision;
                const observacion = r.observacion ?? r.Observacion;

                return (
                  <tr key={`${tipo ?? "tipo"}-${idRegistro ?? idx}`}>
                    <td>{idRegistro ?? "—"}</td>
                    <td>{tipo ?? "—"}</td>
                    <td>{funcionario ?? "—"}</td>
                    <td>{formatearFecha(fechaDesde)}</td>
                    <td>{formatearFecha(fechaResolucion)}</td>
                    <td>{decision ?? "—"}</td>
                    <td>{observacion || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
