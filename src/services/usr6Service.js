import { apiFetch } from "./api";

// Motivos para permiso
export function getMotivosUsr6() {
  return apiFetch("/api/usr6/motivos");
}

// Historial de permisos
export function getPermisosUsr6() {
  return apiFetch("/api/usr6/permisos");
}

// Crear un permiso (también con archivo)
export async function crearPermiso(formData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/usr6/permiso`,
    {
      method: "POST",
      body: formData
    }
  );

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
