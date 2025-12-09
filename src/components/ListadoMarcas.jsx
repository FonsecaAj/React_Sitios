import React from "react";
import { useMarcas } from "../hooks/useMarcas";
import "../styles/marcas.css";
import { useAuthContext } from "../context/AuthContext";

export default function ListadoMarcas() {
  const { user } = useAuthContext();

  if (!user || !user.datos) {
    console.log("Usuario aún no cargado...");
    return <div>Cargando datos del usuario...</div>;
  }

  const idReal =
    user.datos.idUsuario ??   
    user.datos.ID_Usuario ??
    user.datos.IdUsuario ??
    user.datos.iD_Usuario ??
    0;

  console.log(">>> ID REAL DETECTADO PARA MARCAS:", idReal);

  const {
    paginated,
    page,
    totalPages,
    setPage,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    area,
    setArea,
    exportCSV,
  } = useMarcas(idReal);

  return (
    <div className="marcas-wrapper">
      <div className="marcas-container">
        <h2>Mis marcas recientes</h2>

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
            <label>Área:</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="ID Área"
            />
          </div>

          <button onClick={exportCSV}>Exportar CSV</button>
        </div>

        <table className="tabla-marcas">
          <thead>
            <tr>
              <th>Fecha/Hora</th>
              <th>Tipo</th>
              <th>Área</th>
              <th>Detalle</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(paginated) && paginated.length > 0 ? (
              paginated.map((m) => (
                <tr key={m.iD_Marca}>
                  <td>{new Date(m.fecha_Hora).toLocaleString()}</td>
                  <td>{m.tipo_Marca}</td>
                  <td>{m.iD_Area}</td>
                  <td>{m.detalle}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay marcas para mostrar.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </button>

          <span>
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
