import { apiFetch } from "./api";

// Obtener inconsistencias del usuario
export function getInconsistencias() {
  return apiFetch("/api/usr5/inconsistencias");
}

// Obtener motivos de ausencia
export function getMotivosUsr5() {
  return apiFetch("/api/usr5/motivos");
}

// Enviar justificación (con archivo)
export async function justificarInconsistencia(formData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/usr5/justificar`,
    {
      method: "POST",
      body: formData // NO va JSON
    }
  );

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}
