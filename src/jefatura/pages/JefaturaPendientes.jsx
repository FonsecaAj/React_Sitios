import { useEffect, useState } from "react";
import {
  getPendientes,
  resolverPermiso,
  resolverJustificacion,
  resolverVacacion,
} from "../services/jefaturaService";

export default function JefaturaPendientes() {
  const [data, setData] = useState({
    permisos: [],
    justificaciones: [],
    vacaciones: [],
  });
  const [loading, setLoading] = useState(true);
  const [tabActiva, setTabActiva] = useState("permisos");

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroDesde, setFiltroDesde] = useState("");
  const [filtroHasta, setFiltroHasta] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalTipo, setModalTipo] = useState(null); 
  const [modalDecision, setModalDecision] = useState(null);

  const [modalRegistro, setModalRegistro] = useState(null);

  const [observacion, setObservacion] = useState("");
  const [errorObs, setErrorObs] = useState("");
  const [procesando, setProcesando] = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      const res = await getPendientes();
      const permisos = Array.isArray(res.data?.permisos) ? res.data.permisos : [];
      const justificaciones = Array.isArray(res.data?.justificaciones)
        ? res.data.justificaciones
        : [];
      const vacaciones = Array.isArray(res.data?.vacaciones)
        ? res.data.vacaciones
        : [];

      console.log("Respuesta getPendientes:", res);
      setData({ permisos, justificaciones, vacaciones });
    } catch (err) {
      console.error("Error al cargar pendientes", err);
      alert("Error al cargar pendientes de jefatura.");
      setData({ permisos: [], justificaciones: [], vacaciones: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirModalResolver = (tipo, registro, decision) => {
    console.log("abrirModalResolver ->", { tipo, registro, decision });

    setModalTipo(tipo);
    setModalDecision(decision);
    setObservacion("");
    setErrorObs("");
    setProcesando(false);
    setModalRegistro(registro);

    setModalAbierto(true);
  };

  const cerrarModalResolver = () => {
    if (procesando) return;
    setModalAbierto(false);
    setModalTipo(null);
    setModalDecision(null);
    setModalRegistro(null);
    setObservacion("");
    setErrorObs("");
  };

  const confirmarResolver = async () => {
    const obsLimpia = observacion.trim();

    if (!obsLimpia || obsLimpia.length < 10) {
      setErrorObs("La observación debe tener al menos 10 caracteres.");
      return;
    }

    setProcesando(true);
    setErrorObs("");

    try {
      if (modalTipo === "permiso") {
        await resolverPermiso(modalRegistro, modalDecision, obsLimpia);
      } else if (modalTipo === "justificacion") {
        await resolverJustificacion(modalRegistro, modalDecision, obsLimpia);
      } else if (modalTipo === "vacacion") {
        await resolverVacacion(modalRegistro, modalDecision, obsLimpia);
      }

      alert("Solicitud resuelta correctamente.");
      cerrarModalResolver();
      await cargar();
    } catch (err) {
      console.error("Error al resolver solicitud", err);
      const msgBackend =
        err.response?.data?.mensaje ||
        err.response?.data?.message ||
        err.message;
      alert("Ocurrió un error al resolver la solicitud: " + msgBackend);
    } finally {
      setProcesando(false);
    }
  };

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroDesde("");
    setFiltroHasta("");
    setFiltroEstado("");
  };

  const getNombreFuncionario = (item) =>
    item.Funcionario ??
    item.funcionario ??
    item.NombreFuncionario ??
    item.nombreFuncionario ??
    item.Nombre ??
    item.nombre ??
    "";

  const getTipoPermiso = (p) =>
    p.Tipo ??
    p.tipo ??
    p.Tipo_Permiso ??
    p.tipoPermiso ??
    p.Motivo ??
    p.motivo ??
    "";

  const getFechasPermiso = (p) => {
    const fIni =
      p.Fecha_Inicio ??
      p.fecha_Inicio ??
      p.fechaInicio ??
      p.FechaDesde ??
      p.fechaDesde ??
      "";
    const hIni = p.Hora_Inicio ?? p.hora_Inicio ?? p.horaInicio ?? "";
    const fFin =
      p.Fecha_Fin ??
      p.fecha_Fin ??
      p.fechaFin ??
      p.FechaHasta ??
      p.fechaHasta ??
      "";
    const hFin = p.Hora_Fin ?? p.hora_Fin ?? p.horaFin ?? "";
    if (!fIni && !fFin) return "—";
    return `${fIni} ${hIni || ""} → ${fFin} ${hFin || ""}`.trim();
  };

  const getEstado = (item) =>
    item.Estado ?? item.estado ?? item.EstadoJustificacion ?? item.estadoJust ?? "";

  const getTipoJustificacion = (j) =>
    j.Tipo_Inconsistencia ??
    j.tipoInconsistencia ??
    j.Tipo ??
    j.tipo ??
    j.Motivo ??
    j.motivo ??
    "";

  const getFechaJustificacion = (j) =>
    j.Fecha_Inconsistencia ??
    j.fechaInconsistencia ??
    j.Fecha ??
    j.fecha ??
    "—";

  const getFechasVacacion = (v) => {
    const fIni =
      v.Fecha_Inicio ?? v.fecha_Inicio ?? v.fechaInicio ?? v.Fecha_Desde ?? "";
    const fFin =
      v.Fecha_Fin ?? v.fecha_Fin ?? v.fechaFin ?? v.Fecha_Hasta ?? "";
    if (!fIni && !fFin) return "—";
    return `${fIni} → ${fFin}`.trim();
  };

  const filtraPorComunes = (item) => {
    const nombre = getNombreFuncionario(item).toLowerCase();
    const estado = getEstado(item)?.toLowerCase() || "";
    const fechaComparar =
      item.Fecha_Solicitud ??
      item.Fecha_Inicio ??
      item.Fecha_Inconsistencia ??
      item.Fecha ??
      "";

    if (filtroNombre && !nombre.includes(filtroNombre.toLowerCase())) {
      return false;
    }

    if (filtroEstado && estado !== filtroEstado.toLowerCase()) {
      return false;
    }

    if (filtroDesde && fechaComparar && fechaComparar < filtroDesde) {
      return false;
    }
    if (filtroHasta && fechaComparar && fechaComparar > filtroHasta) {
      return false;
    }

    return true;
  };

  const permisosFiltrados = data.permisos.filter(filtraPorComunes);
  const justificacionesFiltradas = data.justificaciones.filter(filtraPorComunes);
  const vacacionesFiltradas = data.vacaciones.filter(filtraPorComunes);

  const noHayNada =
    permisosFiltrados.length === 0 &&
    justificacionesFiltradas.length === 0 &&
    vacacionesFiltradas.length === 0;

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>Pendientes de Jefatura</h2>

      <div className="card mt-3">
        <div className="card-body">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  tabActiva === "permisos" ? "active" : ""
                }`}
                onClick={() => setTabActiva("permisos")}
              >
                Permisos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  tabActiva === "justificaciones" ? "active" : ""
                }`}
                onClick={() => setTabActiva("justificaciones")}
              >
                Justificaciones
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  tabActiva === "vacaciones" ? "active" : ""
                }`}
                onClick={() => setTabActiva("vacaciones")}
              >
                Vacaciones
              </button>
            </li>
          </ul>

          {/* Filtros */}
          <div className="row g-3 align-items-end mb-3">
            <div className="col-md-3">
              <label className="form-label">Funcionario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Desde</label>
              <input
                type="date"
                className="form-control"
                value={filtroDesde}
                onChange={(e) => setFiltroDesde(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Hasta</label>
              <input
                type="date"
                className="form-control"
                value={filtroHasta}
                onChange={(e) => setFiltroHasta(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">(Todos)</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={limpiarFiltros}
              >
                Limpiar
                <br />
                filtros
              </button>
            </div>
          </div>

          {noHayNada && (
            <p>No hay pendientes para los filtros seleccionados.</p>
          )}

          {/* PERMISOS */}
          {tabActiva === "permisos" && (
            <>
              {permisosFiltrados.length === 0 ? (
                <p>No hay permisos pendientes.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Funcionario</th>
                        <th>Tipo</th>
                        <th>Fechas</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permisosFiltrados.map((p) => {
                        const nombre = getNombreFuncionario(p);
                        const tipo = getTipoPermiso(p);
                        const fechas = getFechasPermiso(p);

                        console.log("Render PERMISO fila:", p);

                        const key =
                          p.ID_Permiso ??
                          p.idPermiso ??
                          p.IdPermiso ??
                          p.id_Permiso ??
                          Math.random();

                        return (
                          <tr key={key}>
                            <td>{nombre || "—"}</td>
                            <td>{tipo || "—"}</td>
                            <td>{fechas}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  abrirModalResolver("permiso", p, "Aprobado")
                                }
                              >
                                Aprobar
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  abrirModalResolver(
                                    "permiso",
                                    p,
                                    "Rechazado"
                                  )
                                }
                              >
                                Rechazar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* JUSTIFICACIONES */}
          {tabActiva === "justificaciones" && (
            <>
              {justificacionesFiltradas.length === 0 ? (
                <p>No hay justificaciones pendientes.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Funcionario</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {justificacionesFiltradas.map((j) => {
                        const nombre = getNombreFuncionario(j);
                        const tipo = getTipoJustificacion(j);
                        const fecha = getFechaJustificacion(j);

                        const idJust =
                          j.ID_Justificacion ??
                          j.idJustificacion ??
                          j.IdJustificacion;
                        const idInconsistencia =
                          j.ID_Inconsistencia_Usuario ??
                          j.idInconsistenciaUsuario ??
                          j.IdInconsistenciaUsuario;

                        const idParaResolver = idInconsistencia || idJust;

                        return (
                          <tr key={idParaResolver}>
                            <td>{nombre || "—"}</td>
                            <td>{tipo || "—"}</td>
                            <td>{fecha}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  abrirModalResolver(
                                    "justificacion",
                                    idParaResolver,
                                    "Aprobada"
                                  )
                                }
                              >
                                Aprobar
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  abrirModalResolver(
                                    "justificacion",
                                    idParaResolver,
                                    "Rechazada"
                                  )
                                }
                              >
                                Rechazar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* VACACIONES */}
          {tabActiva === "vacaciones" && (
            <>
              {vacacionesFiltradas.length === 0 ? (
                <p>No hay vacaciones pendientes.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Funcionario</th>
                        <th>Fechas</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacacionesFiltradas.map((v) => {
                        const nombre = getNombreFuncionario(v);
                        const fechas = getFechasVacacion(v);
                        const idVac =
                          v.ID_Permiso ??
                          v.ID_Vacacion ??
                          v.idVacacion ??
                          v.IdVacacion;

                        return (
                          <tr key={idVac}>
                            <td>{nombre || "—"}</td>
                            <td>{fechas}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  abrirModalResolver(
                                    "vacacion",
                                    idVac, 
                                    "Aprobado"
                                  )
                                }
                              >
                                Aprobar
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  abrirModalResolver(
                                    "vacacion",
                                    idVac, 
                                    "Rechazado"
                                  )
                                }
                              >
                                Rechazar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalAbierto && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-white rounded shadow p-4"
            style={{ minWidth: "380px", maxWidth: "90%" }}
          >
            <h5 className="mb-3">
              {modalTipo === "permiso"
                ? "Resolver permiso"
                : modalTipo === "justificacion"
                ? "Resolver justificación"
                : "Resolver vacación"}
            </h5>

            <p className="mb-2">
              Decisión seleccionada: <strong>{modalDecision}</strong>
            </p>

            <div className="mb-3">
              <label className="form-label">
                Observación <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows={3}
                maxLength={300}
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Detalle la razón de la resolución (mínimo 10 caracteres)..."
              />
              {errorObs && (
                <div className="text-danger small mt-1">{errorObs}</div>
              )}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={cerrarModalResolver}
                disabled={procesando}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmarResolver}
                disabled={procesando}
              >
                {procesando ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
