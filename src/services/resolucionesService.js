import { apiFetch } from "./api";

export function verResoluciones(pagina = 1) {
  return apiFetch(`/resoluciones?pagina=${pagina}`);
}
