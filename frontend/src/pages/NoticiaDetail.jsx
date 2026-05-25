import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, PencilIcon, ShareIcon, ShieldExclamationIcon, EyeIcon } from '@heroicons/react/24/outline'
import { CardSkeleton } from '../components/Skeleton'
import { useToast } from '../components/ToastProvider'

function badge(score) {
  if (score == null) return { color: 'bg-gray-200 text-gray-700', label: 'Sin evaluar' }
  if (score < 0.3) return { color: 'bg-red-100 text-red-700 border-red-200', label: 'Crítica' }
  if (score < 0.6) return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Dudosa' }
  return { color: 'bg-green-100 text-green-700 border-green-200', label: 'Confiable' }
}

export default function NoticiaDetail() {
  const { id } = useParams()
  const [noticia, setNoticia] = useState(null)
  const [credibilidad, setCredibilidad] = useState(null)
  const [difusion, setDifusion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ titulo: '', contenido: '', url: '' })
  const [saving, setSaving] = useState(false)
  const addToast = useToast()

  const load = () => {
    setLoading(true)
    Promise.all([
      fetch(`/api/v1/noticias/${id}`).then(r => r.json()),
      fetch(`/api/v1/noticias/${id}/credibilidad`).then(r => r.json()),
      fetch(`/api/v1/noticias/${id}/difusion`).then(r => r.json()),
    ])
      .then(([n, c, d]) => {
        setNoticia(n)
        setCredibilidad(Object.keys(c).length ? c : null)
        setDifusion(Object.keys(d).length ? d : null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(load, [id])

  const startEdit = () => {
    setForm({ titulo: noticia.titulo, contenido: noticia.contenido, url: noticia.url })
    setEditing(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/v1/noticias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, scoreCredibilidad: noticia.scoreCredibilidad }),
      })
      if (!res.ok) throw new Error('Error al guardar')
      addToast('Noticia actualizada')
      setEditing(false)
      load()
    } catch {
      addToast('Error al actualizar noticia', 'error')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="max-w-3xl mx-auto space-y-4">
      <CardSkeleton lines={3} />
      <CardSkeleton lines={2} />
    </div>
  )

  if (!noticia) return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <EyeIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 font-medium">Noticia no encontrada</p>
      <Link to="/" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Volver al dashboard</Link>
    </div>
  )

  const score = noticia.scoreCredibilidad ?? 0.5
  const b = badge(score)

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
        <ArrowLeftIcon className="w-4 h-4" /> Volver al dashboard
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 leading-snug">{noticia.titulo}</h1>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={startEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
              <PencilIcon className="w-4 h-4" />
            </button>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${b.color}`}>
              {b.label} ({Math.round(score * 100)})
            </span>
          </div>
        </div>

        {noticia.contenido && (
          <p className="text-sm text-gray-600 leading-relaxed">{noticia.contenido}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {noticia.fuente && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-gray-600">
              <ShieldExclamationIcon className="w-4 h-4 text-gray-400" />
              {noticia.fuente.nombre}
              {noticia.fuente.verificada
                ? <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Verificada</span>
                : <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">No verificada</span>
              }
            </span>
          )}
          {noticia.tema && (
            <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-xs">
              {noticia.tema.nombre}
            </span>
          )}
          {noticia.fechaPublicacion && (
            <span className="text-gray-400 text-xs">
              {new Date(noticia.fechaPublicacion).toLocaleString('es-AR')}
            </span>
          )}
        </div>
      </div>

      {credibilidad && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Desglose de credibilidad</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 text-center">
              <ShareIcon className="w-5 h-5 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{credibilidad.shares ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Comparticiones</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 text-center">
              <ShieldExclamationIcon className="w-5 h-5 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{credibilidad.desmentidos ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Desmentidos</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 text-center">
              <EyeIcon className="w-5 h-5 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{credibilidad.fuenteVerificada ? 'Sí' : 'No'}</div>
              <div className="text-xs text-gray-500 mt-1">Fuente verificada</div>
            </div>
          </div>
        </div>
      )}

      {difusion && difusion.totalShares > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Difusión</h2>
          <p className="text-sm text-gray-600 mb-3">
            Compartida por <span className="font-semibold text-gray-800">{difusion.totalShares}</span> usuarios
          </p>
          <div className="flex flex-wrap gap-2">
            {difusion.usuarios?.slice(0, 20).map((u, i) => (
              <span key={i} className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">{u}</span>
            ))}
            {difusion.usuarios?.length > 20 && (
              <span className="px-3 py-1 text-xs text-gray-400 bg-gray-50 rounded-full">+{difusion.usuarios.length - 20} más</span>
            )}
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
          <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-modal p-6 max-w-lg w-full mx-4 space-y-4 animate-slide-up">
            <h2 className="text-lg font-bold text-gray-900">Editar Noticia</h2>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Título</label>
              <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contenido</label>
              <textarea value={form.contenido} onChange={e => setForm({ ...form, contenido: e.target.value })} rows={4}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">URL</label>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancelar</button>
              <button type="submit" disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
