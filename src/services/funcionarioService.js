const BASE_URL = "/proc1-api";

export const fetchFuncionarios = async () => {
  const url = `${BASE_URL}/funcionarios`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener funcionarios");

    const data = await res.json();
    console.log("API Funcionarios:", data);

    // Mapeamos SOLO lo que ocupas
    return (data.responseObject || []).map(f => ({
      id: f.iD_Usuario,
      nombreCompleto: f.nombre
    }));

  } catch (error) {
    console.error("Error fetchFuncionarios:", error);
    return [];
  }
};