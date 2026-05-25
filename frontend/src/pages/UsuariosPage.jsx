import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import { useToast } from '../components/ToastProvider'

const empty = { id: '', nombre: '', seguidores: '', antiguedadDias: '' }

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'seguidores', label: 'Seguidores' },
  {
    key: 'antiguedadDias', label: 'Antigüedad (días)',
    render: (u) => `${u.antiguedadDias} días`
  },
]

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const addToast = useToast()

  const load = () => {
    setLoading(true)
    fetch('/api/v1/usuarios')
      .then(r => r.json())
      .then(data => { setUsuarios(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => setForm({ ...empty })
  const openEdit = (u) => setForm({ ...u })
  const closeForm = () => setForm(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const body = {
      id: form.id,
      nombre: form.nombre,
      seguidores: parseInt(form.seguidores) || 0,
      antiguedadDias: parseInt(form.antiguedadDias) || 0,
    }
    const method = usuarios.find(u => u.id === form.id) ? 'PUT' : 'POST'
    const url = method === 'PUT' ? `/api/v1/usuarios/${form.id}` : '/api/v1/usuarios'
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Error al guardar')
      addToast(method === 'POST' ? 'Usuario creado' : 'Usuario actualizado')
      closeForm()
      load()
    } catch {
      addToast('Error al guardar usuario', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (u) => {
    try {
      const res = await fetch(`/api/v1/usuarios/${u.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar')
      addToast('Usuario eliminado')
      load()
    } catch {
      addToast('Error al eliminar usuario', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          + Nuevo Usuario
        </button>
      </div>

      <DataTable columns={columns} data={usuarios} loading={loading} onEdit={openEdit} onDelete={handleDelete} searchKeys={['nombre', 'id']} />

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {usuarios.find(u => u.id === form.id) ? 'Editar Usuario' : 'Nuevo Usuario'}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Seguidores</label>
                <input type="number" value={form.seguidores} onChange={e => setForm({ ...form, seguidores: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Antigüedad (días)</label>
                <input type="number" value={form.antiguedadDias} onChange={e => setForm({ ...form, antiguedadDias: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
    </div>
  )
}
