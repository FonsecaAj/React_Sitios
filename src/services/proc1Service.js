const BASE_URL = "/proc1-api";

export async function ejecutarPROC1({ fechaInicio, fechaFin, areaId = null, usuarioId = null }) {
    const body = { fechaInicio, fechaFin, areaId, usuarioId };

    const response = await fetch(`${BASE_URL}/generar`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();


    if (!response.ok) throw new Error(data.message || "Error al ejecutar proceso.");

    return data;
}
