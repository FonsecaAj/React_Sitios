import { useEffect, useState, useRef } from 'react'
import { getPersonas } from '../services/personaService'

export function usePersonas() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const controllerRef = useRef(null)

  const fetchData = async () => {
    // cancel previous
    if (controllerRef.current) controllerRef.current.abort()
    const ctrl = new AbortController()
    controllerRef.current = ctrl

    setLoading(true)
    setError(null)
    try {
      const res = await getPersonas(ctrl.signal)
      setData(res || [])
    } catch (err) {
      if (err && err.name === 'AbortError') {
        // aborted, ignore
      } else {
        setError(err?.message || String(err))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    return () => {
      if (controllerRef.current) controllerRef.current.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error, refresh: fetchData }
}
