const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://tiusr13pl.cuc-carrera-ti.ac.cr/apiprograv/api'


export async function apiFetch(path, options = {}) {
  const { method = 'GET', body, headers = {}, signal, timeout = 15000 } = options


  let controller
  let combinedSignal = signal
  if (!signal) {
    controller = new AbortController()
    combinedSignal = controller.signal
  }

  const timer = timeout && !signal ? setTimeout(() => controller.abort(), timeout) : null

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
      signal: combinedSignal,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => null)
      throw new Error(text || `HTTP ${res.status}`)
    }

    const data = await res.json().catch(() => null)
    return data
  } finally {
    if (timer) clearTimeout(timer)
  }
}
