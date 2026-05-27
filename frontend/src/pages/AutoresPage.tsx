import React, { useState, useEffect } from 'react'
import DataTable, { DataTableColumn } from '../components/DataTable'
import { useToast } from '../components/ToastProvider';
import { apiFetch } from '../utils/Fetch';

interface Autor {
  id?: string | number
  nombre: string
  biografia: string
}

const empty: Autor = { nombre: '', biografia: '' }

const columns: DataTableColumn<Autor>[] = [
  { key: 'id', label: '#', render: (_, i) => i + 1 },
  { key: 'nombre', label: 'Nombre' },
  { key: 'biografia', label: 'Biografía' },
]

export default function AutoresPage() {
  const [autores, setAutores] = useState<Autor[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<Autor | null>(null)
  const [saving, setSaving] = useState(false)
  const addToast = useToast()

  const load = () => {
    setLoading(true)
    apiFetch<Autor[]>('/autores').then(data => { setAutores(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => setForm({ ...empty })
  const openEdit = (a: Autor) => setForm({ ...a })
  const closeForm = () => setForm(null)

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    const isEdit = autores.some(a => a.id === form.id)
    const body = { nombre: form.nombre, biografia: form.biografia };
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/autores/${form.id}` : '/autores';
    try {
      await apiFetch<any>(url, { method, body: JSON.stringify(body) })
      addToast(method === 'POST' ? 'Autor creado' : 'Autor actualizado')
      closeForm()
      load()
    } catch {
      addToast('Error al guardar autor', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (a: Autor) => {
    if (!a.id) {
      addToast('Autor sin ID, no se puede eliminar', 'error');
      return;
    }
    try {
      await apiFetch<void>(`/autores/${a.id}`, { method: 'DELETE' })
      addToast('Autor eliminado')
      load()
    } catch {
      addToast('Error al eliminar autor', 'error')
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Autores</h1>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          + Nuevo Autor
        </button>
      </div>

      <DataTable columns={columns} data={autores} loading={loading} onEdit={openEdit} onDelete={handleDelete} searchKeys={['nombre', 'biografia', 'id']} />

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form onSubmit={handleSave} className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {autores.some(a => a.id === form.id) ? 'Editar Autor' : 'Nuevo Autor'}
            </h2>
            {autores.some(a => a.id === form.id) && (
              <></>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-600 mb-1">Biografía</div>
              <textarea
                value={form.biografia}
                onChange={e => setForm({ ...form, biografia: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
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
