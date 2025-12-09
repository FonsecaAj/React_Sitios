import { useEffect, useState } from "react";
import { getPermisosUsr6 } from "../../services/usr6Service";

export default function MisPermisos() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getPermisosUsr6().then(setLista);
  }, []);

  return (
    <div>
      <h2>Mis permisos</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Rango</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Adjunto</th>
          </tr>
        </thead>

        <tbody>
          {lista.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.fechaInicio} {p.horaInicio} → {p.fechaFin} {p.horaFin}</td>
              <td>{p.motivo}</td>
              <td>{p.estado}</td>
              <td>
                {p.adjunto ? (
                  <a href={p.adjunto} target="_blank">Ver</a>
                ) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
