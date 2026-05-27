import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, PencilIcon, ShareIcon, ShieldExclamationIcon, EyeIcon, HandThumbUpIcon, HandThumbDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { CardSkeleton } from '../components/Skeleton'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../context/AuthContext'
import { Noticia } from '../types/Noticia'
import { apiFetch } from '../utils/Fetch'

interface CredibilidadDesglose {
  shares?: number
  desmentidos?: number
  fuenteVerificada?: boolean
}

interface DifusionDesglose {
  totalShares: number
  usuarios?: string[]
}

function badge(score: number | null) {
  if (score == null) return { color: 'bg-gray-200 text-gray-700', label: 'Sin evaluar' }
  if (score < 0.3) return { color: 'bg-red-100 text-red-700 border-red-200', label: 'Crítica' }
  if (score < 0.6) return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Dudosa' }
  return { color: 'bg-green-100 text-green-700 border-green-200', label: 'Confiable' }
}

export default function NoticiaDetail() {
  const { id } = useParams<{ id: string }>()
  const [noticia, setNoticia] = useState<Noticia | null>(null)
  const [credibilidad, setCredibilidad] = useState<CredibilidadDesglose | null>(null)
  const [difusion, setDifusion] = useState<DifusionDesglose | null>(null)
  const [loading, setLoading] = useState(true)
  
  const { isAuthenticated } = useAuth()
  const addToast = useToast()

  const load = () => {
    if (!id) return
    setLoading(true)
    Promise.all([
      apiFetch<Noticia>(`/api/noticias/${id}`).catch(() => null),
      apiFetch<CredibilidadDesglose>(`/api/noticias/${id}/credibilidad`).catch(() => null),
      apiFetch<DifusionDesglose>(`/api/noticias/${id}/difusion`).catch(() => null),
    ])
      .then(([n, c, d]) => {
        setNoticia(n)
        setCredibilidad(c && Object.keys(c).length ? c : null)
        setDifusion(d && Object.keys(d).length ? d : null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(load, [id])

  const handleVotar = async (tipoVoto: 'VERDADERO' | 'FALSO' | 'DUDOSO') => {
    if (!id) return
    if (!isAuthenticated) {
      addToast('Debes iniciar sesión para poder votar', 'warning')
      return
    }
    try {
      const res = await apiFetch<Noticia>(`/api/noticias/${id}/votar`, {
        method: 'POST',
        body: JSON.stringify({ tipoVoto, comentario: '' })
      })
      addToast('Voto registrado')
      setNoticia(res) // Update the score
      load() // Reload desglose
    } catch (e) {
      addToast('Error al votar', 'error')
    }
  }

  const handleRepostear = async () => {
    if (!id) return
    if (!isAuthenticated) {
      addToast('Debes iniciar sesión para poder repostear', 'warning')
      return
    }
    try {
      await apiFetch(`/api/noticias/${id}/repostear`, {
        method: 'POST'
      })
      addToast('Noticia reposteada con éxito')
      load() // Reload difusion
    } catch (e) {
      addToast('Error al repostear', 'error')
    }
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
  const percentScore = Math.round(score * 100)

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
        <ArrowLeftIcon className="w-4 h-4" /> Volver al dashboard
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 leading-snug">{noticia.titulo}</h1>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${b.color}`}>
              {b.label} ({percentScore})
            </span>
          </div>
        </div>

        {/* Barra tricolor de credibilidad */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4 overflow-hidden flex">
          <div className="bg-red-500 h-2.5" style={{ width: score < 0.3 ? '100%' : '0%' }}></div>
          <div className="bg-yellow-400 h-2.5" style={{ width: score >= 0.3 && score < 0.6 ? '100%' : '0%' }}></div>
          <div className="bg-green-500 h-2.5" style={{ width: score >= 0.6 ? '100%' : '0%' }}></div>
        </div>

        {noticia.url && (
          <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
            {noticia.url}
          </a>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm pt-2">
          {noticia.nombreFuente && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-gray-600 border border-gray-200">
              <ShieldExclamationIcon className="w-4 h-4 text-gray-400" />
              {noticia.nombreFuente}
              {noticia.fuenteVerificada
                ? <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Verificada</span>
                : <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">No verificada</span>
              }
            </span>
          )}
          {noticia.tema && (
            <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-xs border border-blue-200">
              {noticia.tema}
            </span>
          )}
          {noticia.fechaPublicacion && (
            <span className="text-gray-400 text-xs">
              {new Date(noticia.fechaPublicacion).toLocaleString('es-AR')}
            </span>
          )}
          {noticia.autorNombre && (
            <span className="text-gray-500 text-xs italic">
              por {noticia.autorNombre}
            </span>
          )}
        </div>

        {/* Acciones interactivas */}
        {!isAuthenticated && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700 flex items-center justify-between gap-3 mt-4">
            <span>Inicia sesión o regístrate para votar y compartir esta noticia.</span>
            <div className="flex gap-2">
              <Link to="/login" className="px-3 py-1 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 text-xs transition-colors shrink-0">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-100 mt-4 flex gap-3">
          <button onClick={() => handleVotar('VERDADERO')} className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors border border-green-200">
            <HandThumbUpIcon className="w-5 h-5" /> Verdadero
          </button>
          <button onClick={() => handleVotar('FALSO')} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors border border-red-200">
            <HandThumbDownIcon className="w-5 h-5" /> Falso
          </button>
          <button onClick={() => handleVotar('DUDOSO')} className="flex items-center gap-1.5 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors border border-yellow-200">
            <QuestionMarkCircleIcon className="w-5 h-5" /> Dudoso
          </button>
          
          <div className="flex-1"></div>

          <button onClick={handleRepostear} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <ShareIcon className="w-5 h-5" /> Repostear
          </button>
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
              <HandThumbDownIcon className="w-5 h-5 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{credibilidad.desmentidos ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Desmentidos Reales</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 text-center">
              <ShieldExclamationIcon className="w-5 h-5 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{credibilidad.fuenteVerificada ? 'Sí' : 'No'}</div>
              <div className="text-xs text-gray-500 mt-1">Fuente Verificada</div>
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
              <span key={i} className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium border border-gray-200">{u}</span>
            ))}
            {difusion.usuarios && difusion.usuarios.length > 20 && (
              <span className="px-3 py-1 text-xs text-gray-400 bg-gray-50 rounded-full">+{difusion.usuarios.length - 20} más</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
