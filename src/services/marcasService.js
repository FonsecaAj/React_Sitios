const BASE_URL = "/marcas-api/marcas";

export async function getMarcasByUser(idUsuarioAccion) {
  try {
    const url = `${BASE_URL}/${idUsuarioAccion}?idUsuarioAccion=${idUsuarioAccion}`;
    console.log("Llamando a:", url);

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Error HTTP:", response.status, response.statusText);
      throw new Error("Error al obtener marcas");
    }

    const data = await response.json();
    console.log("DATA API:", data);
    return data;
  } catch (error) {
    console.error("Error en getMarcasByUser:", error);
    return [];
  }
}
