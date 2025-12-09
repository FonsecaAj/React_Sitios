import { apiFetch } from "./api";

// Crear nueva solicitud de vacaciones
export function crearVacacion(data) {
  return apiFetch('/usr7/vacaciones/nueva', {
    method: 'POST',
    body: data
  });
}

// Ver mis solicitudes de vacaciones
export function obtenerMisSolicitudes(idUsuario, pagina = 1, pageSize = 10) {
  return apiFetch(`/usr7/mis-solicitudes/${idUsuario}?pagina=${pagina}&pageSize=${pageSize}`);
}

// Procesar solicitud (jefatura)
export function procesarVacacion(data) {
  return apiFetch('/usr7/vacaciones/procesar', {
    method: 'POST',
    body: data
  });
}
