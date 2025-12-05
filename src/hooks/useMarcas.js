import { useEffect, useState } from "react";
import { getMarcasByUser } from "../services/marcasService";

export function useMarcas(idUsuario = 14) {
  const [marcas, setMarcas] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [area, setArea] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function load() {
      const data = await getMarcasByUser(idUsuario);

      // Ordenar descendente por fecha
      data.sort((a, b) => new Date(b.fecha_Hora) - new Date(a.fecha_Hora));
      setMarcas(data);
      setFiltered(data);
    }
    load();
  }, [idUsuario]);

  // Filtrado en frontend
  useEffect(() => {
    let result = [...marcas];

    if (fechaInicio)
      result = result.filter(m => new Date(m.fecha_Hora) >= new Date(fechaInicio));

    if (fechaFin)
      result = result.filter(m => new Date(m.fecha_Hora) <= new Date(fechaFin));

    if (area)
      result = result.filter(m => m.iD_Area === parseInt(area));

    setFiltered(result);
    setPage(1);
  }, [fechaInicio, fechaFin, area, marcas]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Exportar CSV
  const exportCSV = () => {
    const headers = ["FechaHora", "Tipo", "Area", "Detalle"];
    const rows = filtered.map(m => [
      m.fecha_Hora,
      m.tipo_Marca,
      m.iD_Area,
      m.detalle || ""
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach(row => (csv += row.join(",") + "\n"));

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "marcas.csv";
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
    area,
    setArea,
    exportCSV
  };
}
