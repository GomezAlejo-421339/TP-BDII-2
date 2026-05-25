import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import { useToast } from '../components/ToastProvider'

const empty = { id: '', texto: '', hash: '' }

const columns = [
  { key: 'id', label: 'ID' },
  {
    key: 'texto', label: 'Texto',
    render: (c) => <span className="truncate block max-w-xs">{c.texto}</span>
  },
  { key: 'hash', label: 'Hash' },
]

export default function ClaimsPage() {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const addToast = useToast()

  const load = () => {
    setLoading(true)
    fetch('/api/v1/claims')
      .then(r => r.json())
      .then(data => { setClaims(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => setForm({ ...empty })
  const openEdit = (c) => setForm({ ...c })
  const closeForm = () => setForm(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const body = { id: form.id, texto: form.texto, hash: form.hash }
    const method = claims.find(c => c.id === form.id) ? 'PUT' : 'POST'
    const url = method === 'PUT' ? `/api/v1/claims/${form.id}` : '/api/v1/claims'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Error al guardar')
      addToast(method === 'POST' ? 'Claim creado' : 'Claim actualizado')
      closeForm()
      load()
    } catch {
      addToast('Error al guardar claim', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (c) => {
    try {
      const res = await fetch(`/api/v1/claims/${c.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar')
      addToast('Claim eliminado')
      load()
    } catch {
      addToast('Error al eliminar claim', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Claims</h1>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          + Nuevo Claim
        </button>
      </div>

      <DataTable columns={columns} data={claims} loading={loading} onEdit={openEdit} onDelete={handleDelete} searchKeys={['texto', 'id', 'hash']} />

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {claims.find(c => c.id === form.id) ? 'Editar Claim' : 'Nuevo Claim'}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ID</label>
              <input value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Texto</label>
              <textarea value={form.texto} onChange={e => setForm({ ...form, texto: e.target.value })} required rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Hash</label>
              <input value={form.hash} onChange={e => setForm({ ...form, hash: e.target.value })} required
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
