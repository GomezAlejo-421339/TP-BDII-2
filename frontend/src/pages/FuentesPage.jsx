import { useState, useEffect } from 'react'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../components/ToastProvider'

const empty = { id: '', nombre: '', dominio: '', verificada: false, puntajeHistorial: '' }

export default function FuentesPage() {
  const [fuentes, setFuentes] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const addToast = useToast()

  const load = () => {
    setLoading(true)
    fetch('/api/v1/fuentes')
      .then(r => r.json())
      .then(data => { setFuentes(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => setForm({ ...empty })
  const openEdit = (f) => setForm({ ...f, puntajeHistorial: f.puntajeHistorial ?? '' })
  const closeForm = () => setForm(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const body = {
      id: form.id, nombre: form.nombre, dominio: form.dominio,
      verificada: form.verificada,
      puntajeHistorial: form.puntajeHistorial !== '' ? parseFloat(form.puntajeHistorial) : null,
    }
    const method = fuentes.find(f => f.id === form.id) ? 'PUT' : 'POST'
    const url = method === 'PUT' ? `/api/v1/fuentes/${form.id}` : '/api/v1/fuentes'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Error al guardar')
      addToast(method === 'POST' ? 'Fuente creada' : 'Fuente actualizada')
      closeForm()
      load()
    } catch {
      addToast('Error al guardar fuente', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (f) => {
    try {
      const res = await fetch(`/api/v1/fuentes/${f.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar')
      addToast('Fuente eliminada')
      setDeleteTarget(null)
      load()
    } catch {
      addToast('Error al eliminar fuente', 'error')
    }
  }

  if (loading) return <div className="text-center py-12 text-gray-400">Cargando...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fuentes</h1>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          + Nueva Fuente
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fuentes.map(f => (
          <div key={f.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{f.nombre}</h3>
              <div className="flex items-center gap-2">
                {f.verificada
                  ? <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Verificada</span>
                  : <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">No verificada</span>
                }
              </div>
            </div>
            <p className="text-sm text-gray-500">{f.dominio}</p>
            {f.puntajeHistorial != null && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${f.puntajeHistorial > 0.6 ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${f.puntajeHistorial * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{Math.round(f.puntajeHistorial * 100)}%</span>
              </div>
            )}
            <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => openEdit(f)}
                className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">Editar</button>
              <button onClick={() => setDeleteTarget(f)}
                className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {fuentes.find(f => f.id === form.id) ? 'Editar Fuente' : 'Nueva Fuente'}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ID</label>
              <input value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Dominio</label>
              <input value={form.dominio} onChange={e => setForm({ ...form, dominio: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Puntaje Historial</label>
                <input type="number" step="0.1" min="0" max="1" value={form.puntajeHistorial}
                  onChange={e => setForm({ ...form, puntajeHistorial: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Verificada</label>
                <select value={form.verificada} onChange={e => setForm({ ...form, verificada: e.target.value === 'true' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value={false}>No</option>
                  <option value={true}>Sí</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={closeForm}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
              <button type="submit" disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          message={`¿Eliminar la fuente "${deleteTarget.nombre}"?`}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
