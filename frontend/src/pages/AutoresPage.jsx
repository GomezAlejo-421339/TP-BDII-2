import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import { useToast } from '../components/ToastProvider'

const empty = { id: '', nombre: '', handle: '' }

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'handle', label: 'Handle' },
]

export default function AutoresPage() {
  const [autores, setAutores] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const addToast = useToast()

  const load = () => {
    setLoading(true)
    fetch('/api/v1/autores')
      .then(r => r.json())
      .then(data => { setAutores(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => setForm({ ...empty })
  const openEdit = (a) => setForm({ ...a })
  const closeForm = () => setForm(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const body = { id: form.id, nombre: form.nombre, handle: form.handle }
    const method = autores.find(a => a.id === form.id) ? 'PUT' : 'POST'
    const url = method === 'PUT' ? `/api/v1/autores/${form.id}` : '/api/v1/autores'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Error al guardar')
      addToast(method === 'POST' ? 'Autor creado' : 'Autor actualizado')
      closeForm()
      load()
    } catch {
      addToast('Error al guardar autor', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (a) => {
    try {
      const res = await fetch(`/api/v1/autores/${a.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar')
      addToast('Autor eliminado')
      load()
    } catch {
      addToast('Error al eliminar autor', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Autores</h1>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          + Nuevo Autor
        </button>
      </div>

      <DataTable columns={columns} data={autores} loading={loading} onEdit={openEdit} onDelete={handleDelete} searchKeys={['nombre', 'handle', 'id']} />

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {autores.find(a => a.id === form.id) ? 'Editar Autor' : 'Nuevo Autor'}
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
              <label className="block text-sm font-medium text-gray-600 mb-1">Handle</label>
              <input value={form.handle} onChange={e => setForm({ ...form, handle: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
    </div>
  )
}
