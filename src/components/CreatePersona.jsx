import { useState } from 'react'
import { createPersona } from '../services/personaService'

export default function CreatePersona({ onCreated, onCancel }) {
  const [form, setForm] = useState({ personaId: '', nombre: '', tipo: '1', gender: 'male', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    // basic validation
    if (!form.personaId || !form.nombre || !form.password || !form.tipo) {
      setError('Completa los campos obligatorios')
      return
    }
    setLoading(true)
    try {
      const payload = {
        personaId: String(form.personaId),
        nombre: String(form.nombre),
        tipo: Number(form.tipo),
        gender: form.gender,
        password: String(form.password),
      }
      await createPersona(payload)
      setLoading(false)
      if (onCreated) onCreated()
    } catch (err) {
      setLoading(false)
      setError(err?.message || String(err))
    }
  }

  return (
    <form className="create-form" onSubmit={submit}>
      <div className="create-grid">
        <label>
          ID *
          <input value={form.personaId} onChange={update('personaId')} />
        </label>
        <label>
          Nombre *
          <input value={form.nombre} onChange={update('nombre')} />
        </label>
        <label>
          Tipo *
          <select value={form.tipo} onChange={update('tipo')}>
            <option value="1">Usuario</option>
            <option value="2">Administrativo</option>
          </select>
        </label>
        <label>
          Género
          <select value={form.gender} onChange={update('gender')}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Contraseña *
          <input type="password" value={form.password} onChange={update('password')} />
        </label>
      </div>

      {error && <div className="error" style={{ marginTop: '8px' }}>{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={loading}>Cancelar</button>
        <button type="submit" className="btn" disabled={loading}>{loading ? 'Creando...' : 'Crear persona'}</button>
      </div>
    </form>
  )
}
