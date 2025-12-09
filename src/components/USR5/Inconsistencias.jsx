import { useEffect, useState } from "react";
import { getInconsistencias } from "../../services/usr5Service";

export default function Inconsistencias({ onSelect }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInconsistencias().then(setData).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Inconsistencias pendientes</h2>

      {data.length === 0 && <p>No hay inconsistencias pendientes.</p>}

      <ul className="list-group">
        {data.map((inc) => (
          <li
            key={inc.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <strong>{inc.nombre}</strong><br />
              {inc.fechaInconsistencia}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onSelect(inc)}
            >
              Justificar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
