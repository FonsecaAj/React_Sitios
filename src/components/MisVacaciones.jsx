import { useEffect, useState } from "react";
import { obtenerMisSolicitudes } from "../services/vacacionesService";

export default function MisVacaciones({ idUsuario }) {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await obtenerMisSolicitudes(idUsuario, pagina);
      setData(res.datos);
      setPagina(res.paginaActual);
      setTotalPaginas(res.totalPaginas);
    }
    fetchData();
  }, [idUsuario, pagina]);

  return (
    <div>
      <h2>Mis Solicitudes de Vacaciones</h2>

      {data.length === 0 && <p>No tienes solicitudes.</p>}

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.fechaInicio?.substring(0, 10)}</td>
              <td>{v.fechaFin?.substring(0, 10)}</td>
              <td>{v.estado}</td>
              <td>{v.observacion || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10 }}>
        <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
          ◀ Anterior
        </button>

        <span style={{ margin: "0 12px" }}>
          Página {pagina} de {totalPaginas}
        </span>

        <button
          disabled={pagina === totalPaginas}
          onClick={() => setPagina(pagina + 1)}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}
