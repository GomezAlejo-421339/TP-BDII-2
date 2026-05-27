import React, { useState } from 'react'
import { apiFetch } from '../utils/Fetch'
import { useToast } from './ToastProvider'

interface CrearNoticiaModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function CrearNoticiaModal({ onClose, onSuccess }: CrearNoticiaModalProps) {
  const [url, setUrl] = useState('')
  const [titulo, setTitulo] = useState('')
  const [tema, setTema] = useState('')
  const [autorNombre, setAutorNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const addToast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim() || !titulo.trim() || !tema.trim()) {
      addToast('URL, Título y Tema son obligatorios', 'error')
      return
    }

    setLoading(true)
    try {
      const response = await apiFetch<any>('/api/noticias', {
        method: 'POST',
        body: JSON.stringify({ url, titulo, tema, autorNombre })
      })
      
      if (response.yaExistia) {
        addToast('La noticia ya existía y fue recuperada', 'info')
      } else {
        addToast('Noticia publicada con éxito')
      }
      onSuccess()
      onClose()
    } catch (err) {
      addToast('Error al publicar la noticia (¿Falta X-User-Id?)', 'error')
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-modal p-6 max-w-lg w-full mx-4 space-y-4 animate-slide-up">
        <h2 className="text-lg font-bold text-gray-900">Publicar Noticia</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">URL (requerida para deduplicación)</label>
          <input value={url} onChange={e => setUrl(e.target.value)} required type="url" placeholder="https://..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Título</label>
          <input value={titulo} onChange={e => setTitulo(e.target.value)} required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tema (Texto libre)</label>
            <input value={tema} onChange={e => setTema(e.target.value)} required placeholder="Ej. Política"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Autor (Opcional)</label>
            <input value={autorNombre} onChange={e => setAutorNombre(e.target.value)} placeholder="Nombre del periodista"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  )
}
