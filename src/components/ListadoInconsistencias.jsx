import React from "react";
import { useInconsistencias } from "../hooks/useInconsistencias";
import "../styles/marcas.css"; // usamos mismo estilo

export default function ListadoInconsistencias() {
  const {
    paginated,
    page,
    totalPages,
    setPage,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    usuario,
    setUsuario,
    exportCSV
  } = useInconsistencias(11); // id quemado admin

  return (
    <div className="marcas-wrapper">
      <div className="marcas-container">

        <h2>Reporte de Inconsistencias</h2>

        {/* FILTROS */}
        <div className="filtros">
          <div>
            <label>Fecha inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div>
            <label>Fecha fin:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          <div>
            <label>ID Usuario:</label>
            <input
              type="number"
              placeholder="ID usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <button onClick={exportCSV}>Exportar CSV</button>
        </div>

        {/* TABLA */}
        <table className="tabla-marcas">
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Inconsistencia</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Detalle</th>
              <th>Referencia</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length > 0 ? (
              paginated.map((i, index) => (
                <tr key={index}>
                  <td>{i.iD_Usuario}</td>
                  <td>{i.nombre_Inconsistencia}</td>
                  <td>{new Date(i.fecha_Inconsistencia).toLocaleString()}</td>
                  <td>{i.estado}</td>
                  <td>{i.detalle}</td>
                  <td>{i.referencia || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No hay inconsistencias para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINACIÓN */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </button>

          <span>Página {page} de {totalPages}</span>

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Siguiente
          </button>
        </div>

      </div>
    </div>
  );
}
