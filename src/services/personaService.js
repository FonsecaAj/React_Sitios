import { apiFetch } from './api'

export function getPersonas(signal) {
  return apiFetch('/Persona', { signal })
}

export function getPersonaById(id, signal) {
  return apiFetch(`/Persona/${encodeURIComponent(id)}`, { signal })
}

export function createPersona(payload, signal) {
  return apiFetch('/Persona', { method: 'POST', body: payload, signal })
}
