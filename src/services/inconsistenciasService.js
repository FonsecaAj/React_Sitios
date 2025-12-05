const BASE_URL = "/marcas-api/inconsistencias";

export async function getInconsistencias(idUsuarioAccion = 11) {
  try {
    const url = `${BASE_URL}?idUsuarioAccion=${idUsuarioAccion}`;
    console.log("Llamando a inconsistencias:", url);

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Error HTTP:", response.status, response.statusText);
      throw new Error("Error al obtener inconsistencias");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getInconsistencias:", error);
    return [];
  }
}
