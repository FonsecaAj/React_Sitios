import { useState, useMemo } from 'react'
import { usePersonas } from '../hooks/usePersonas'
import CreatePersona from './CreatePersona'

function PersonaRow({ p }) {
  return (
    <tr>
      <td data-label="ID">{p.personaId}</td>
      <td data-label="Nombre">{p.nombre}</td>
      <td data-label="Tipo">{p.tipo}</td>
      <td data-label="Género">{p.gender}</td>
      <td data-label="Teléfono">{(p.telefono && p.telefono.length) ? p.telefono.join(', ') : '-'}</td>
      <td data-label="Rol">{(p.rol && p.rol.length) ? p.rol.join(', ') : '-'}</td>
    </tr>
  )
}

export default function Personas() {
  const { data: personas, loading, error, refresh } = usePersonas()
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const tipoLabel = (t) => {
    const n = Number(t)
    if (n === 1) return 'Usuario'
    if (n === 2) return 'Administrativo'
    return String(t)
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return personas
    return personas.filter((p) => {
      return (
        String(p.personaId).toLowerCase().includes(q) ||
        (p.nombre && p.nombre.toLowerCase().includes(q))
      )
    })
  }, [search, personas])

  return (
    <section className="personas-container">
      <div className="personas-card">
        <div className="personas-header">
          <div>
            <h2>Personas</h2>
            <p className="muted">Datos obtenidos</p>
          </div>

          <div className="toolbar">
            <div className="search-wrap">
              <input
                placeholder="Buscar por nombre o ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                aria-label="Buscar personas"
              />
              <button className="clear" onClick={() => setSearch('')} aria-label="Limpiar búsqueda">✕</button>
            </div>
            <div className="actions">
              <button className="btn btn-ghost" onClick={refresh} aria-label="Refrescar">⟳ Refrescar</button>
              <button className="btn" onClick={() => setShowCreate((s) => !s)} aria-label="Nueva persona">＋ Nueva persona</button>
            </div>
          </div>
        </div>

        {showCreate && (
          <div style={{ marginBottom: 12 }}>
            <CreatePersona onCreated={() => { setShowCreate(false); refresh(); }} onCancel={() => setShowCreate(false)} />
          </div>
        )}

        {loading && <div className="loading">Cargando...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && (
          <div className="cards-wrap">
            {filtered.length === 0 ? (
              <div className="no-results">No se encontraron personas.</div>
            ) : (
              <div className="cards-grid">
                {filtered.map((p) => (
                  <article className="person-card" key={p.personaId || p.id}>
                    <div className="card-top">
                      <div className="id">{p.personaId}</div>
                      <div className="role">{(p.rol && p.rol.length) ? p.rol.join(', ') : ''}</div>
                    </div>
                    <h3 className="name">{p.nombre}</h3>
                    <div className="meta">
                      <span className="chip">Tipo: {tipoLabel(p.tipo)}</span>
                      <span className="chip">Género: {p.gender}</span>
                    </div>
                    <div className="contact">
                      <strong>Teléfono:</strong>
                      <div>{(p.telefono && p.telefono.length) ? p.telefono.join(', ') : '-'}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
