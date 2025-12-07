const BASE_URL = "/proc1-api";

/**
 * Ejecuta el proceso administrativo de generación de inconsistencias.
 *
 * @param {object} params - Los parámetros del filtro.
 * @param {string} params.fechaInicio - Fecha de inicio del rango.
 * @param {string} params.fechaFin - Fecha de fin del rango.
 * @param {number|null} [params.areaId=null] - ID del área seleccionada (opcional).
 * @param {number|null} [params.usuarioId=null] - ID del funcionario seleccionado (opcional).
 * @returns {Promise<object>} El objeto de respuesta del API si es exitoso.
 * @throws {Error} Si la respuesta HTTP no es exitosa (response.ok es false).
 */
export async function ejecutarPROC1({ fechaInicio, fechaFin, areaId = null, usuarioId = null }) {
    
    // Construye el cuerpo de la solicitud JSON
    const body = { fechaInicio, fechaFin, areaId, usuarioId };

    const response = await fetch(`${BASE_URL}/generar`, {
        method: "POST",
        headers: {
            // Es crucial para enviar JSON al backend
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(body)
    });

    // Intenta parsear la respuesta (necesario incluso si hay un error para leer el mensaje)
    const data = await response.json();


    // Si la respuesta NO es exitosa (código 4xx o 5xx), lanza un Error
    if (!response.ok) {
        // Usa el mensaje proporcionado por el backend o un mensaje genérico
        throw new Error(data.message || "Error al ejecutar proceso."); 
    }

    // Retorna los datos si el proceso fue exitoso (código 2xx)
    return data;
}