const BASE_URL = "/proc1-api";


export const fetchAreas = async () => {
  const url = `${BASE_URL}/areas`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener áreas");

    const data = await res.json();

    // Corregido: Usar 'id' y 'nombre' para que coincida con lo esperado en Proc1.jsx
    return data.responseObject.data.map(a => ({
      id: a.iD_Area, // Usar 'id'
      nombre: a.nombre_Area // Usar 'nombre'
    }));
  } catch (error) {
    console.error("Error fetchAreas:", error);
    return [];
  }
};