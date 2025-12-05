import { useEffect, useState } from "react";
import { getInconsistencias } from "../services/inconsistenciasService";

export function useInconsistencias(idAdmin = 11) {

  const [lista, setLista] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [usuario, setUsuario] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function load() {
      const data = await getInconsistencias(idAdmin);

      // Orden descendente por fecha
      data.sort(
        (a, b) =>
          new Date(b.fecha_Inconsistencia) - new Date(a.fecha_Inconsistencia)
      );

      setLista(data);
      setFiltered(data);
    }
    load();
  }, [idAdmin]);

  // FILTROS
  useEffect(() => {
    let result = [...lista];

    if (fechaInicio)
      result = result.filter(
        (i) => new Date(i.fecha_Inconsistencia) >= new Date(fechaInicio)
      );

    if (fechaFin)
      result = result.filter(
        (i) => new Date(i.fecha_Inconsistencia) <= new Date(fechaFin)
      );

    if (usuario)
      result = result.filter(
        (i) => i.iD_Usuario === parseInt(usuario)
      );

    setFiltered(result);
    setPage(1);
  }, [fechaInicio, fechaFin, usuario, lista]);

  // PAGINACIÓN
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // EXPORTAR CSV
  const exportCSV = () => {
    const headers = ["Usuario", "Inconsistencia", "Fecha", "Estado", "Detalle", "Referencia"];
    const rows = filtered.map((i) => [
      i.iD_Usuario,
      i.nombre_Inconsistencia,
      i.fecha_Inconsistencia,
      i.estado,
      i.detalle || "",
      i.referencia || ""
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => (csv += row.join(",") + "\n"));

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "inconsistencias.csv";
    a.click();
  };

  return {
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
    exportCSV,
  };
}
