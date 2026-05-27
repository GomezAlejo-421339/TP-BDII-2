import React, { useState, useEffect } from 'react'
import DataTable, { DataTableColumn } from '../components/DataTable'
import { useToast } from '../components/ToastProvider'
import { apiFetch } from '../utils/Fetch';

interface Tema {
  id?: string | number
  nombre: string
}

const empty: Tema = { nombre: '' }

const columns: DataTableColumn<Tema>[] = [
  { key: 'id', label: '#', render: (_, i) => i + 1 },
  { key: 'nombre', label: 'Nombre' },
]

export default function TemasPage() {
  const [temas, setTemas] = useState<Tema[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<Tema | null>(null)
  const [saving, setSaving] = useState(false)
  const addToast = useToast()

  const load = async () => {
    setLoading(true)
    try {
      const data = await apiFetch<Tema[]>('/temas');
      setTemas(data);
    } catch {
      // keep loading false on error as well
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const openCreate = () => setForm({ ...empty })
  const openEdit = (t: Tema) => setForm({ ...t })
  const closeForm = () => setForm(null)

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    const isEdit = temas.some(t => t.id === form.id)
    const body = isEdit
      ? { id: form.id, nombre: form.nombre }
      : { nombre: form.nombre }
    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit ? `/temas/${form.id}` : '/temas'
    try {
      await apiFetch<any>(url, { method, body: JSON.stringify(body) })
      addToast(method === 'POST' ? 'Tema creado' : 'Tema actualizado')
      closeForm()
      load()
    } catch {
      addToast('Error al guardar tema', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (t: Tema) => {
    try {
      await apiFetch<void>(`/temas/${t.id}`, { method: 'DELETE' })
      addToast('Tema eliminado')
      load()
    } catch {
      addToast('Error al eliminar tema', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Temas</h1>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          + Nuevo Tema
        </button>
      </div>

      <DataTable columns={columns} data={temas} loading={loading} onEdit={openEdit} onDelete={handleDelete} searchKeys={['nombre', 'id']} />

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {temas.some(t => t.id === form.id) ? 'Editar Tema' : 'Nuevo Tema'}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required
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
