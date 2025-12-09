import { apiFetch } from "./api";

export function obtenerSolicitudes(pagina = 1) {
  return apiFetch(`/solicitud?pagina=${pagina}`);
}

export function obtenerDetalleSolicitud(id) {
  return apiFetch(`/solicitud/${id}`);
}

export function procesarSolicitud(data) {
  return apiFetch('/solicitud/procesar', {
    method: 'POST',
    body: data
  });
}
