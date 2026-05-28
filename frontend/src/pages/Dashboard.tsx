import React, { useState, useEffect } from 'react'
import { NewspaperIcon, ShieldCheckIcon, UserGroupIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import NoticiaCard from '../components/NoticiaCard'
import type { Noticia } from '../types/Noticia'
import CredibilidadChart from '../components/CredibilidadChart'
import GrafoSimple from '../components/GrafoSimple'

import StatsCard from '../components/StatsCard'
import { CardSkeleton } from '../components/Skeleton'
import { apiFetch } from '../utils/Fetch'

interface Stats {
  noticias: number | null
  fuentes: number | null
  usuarios: number | null
}

export default function Dashboard() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [stats, setStats] = useState<Stats>({ noticias: null, fuentes: null, usuarios: null })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      apiFetch<any>('/api/noticias?page=0&size=1').catch(() => ({ totalElements: 0 })),
      apiFetch<any[]>('/api/fuentes').catch(() => []),
      apiFetch<any[]>('/api/usuarios').catch(() => []),
    ])
      .then(([n, f, u]) => {
        setStats({ noticias: n.totalElements ?? 0, fuentes: f.length, usuarios: u.length })
        setStatsLoading(false)
      })
      .catch(() => setStatsLoading(false))
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    apiFetch<any>(`/api/noticias?page=${page}&size=12&sortBy=scoreCredibilidad&direction=asc`)
      .then(data => {
        setNoticias(data.content || [])
        setTotalPages(data.totalPages || 1)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [page])

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de monitoreo</h1>
        <p className="text-sm text-gray-500 mt-1">Resumen general del estado del sistema</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={<NewspaperIcon className="w-6 h-6" />} label="Noticias" value={stats.noticias} color="blue" loading={statsLoading} />
        <StatsCard icon={<ShieldCheckIcon className="w-6 h-6" />} label="Fuentes" value={stats.fuentes} color="green" loading={statsLoading} />
        <StatsCard icon={<UserGroupIcon className="w-6 h-6" />} label="Usuarios" value={stats.usuarios} color="purple" loading={statsLoading} />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Noticias con menor credibilidad</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-red-600 font-medium mb-1">Error al cargar datos</p>
              <p className="text-sm text-red-500 mb-4">{error}</p>
              <button onClick={() => setPage(0)} className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium">
                Reintentar
              </button>
            </div>
          ) : noticias.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <NewspaperIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No hay noticias cargadas</p>
              <p className="text-sm text-gray-400 mt-1">Ejecutá el seed data en Neo4j para comenzar.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {noticias.map(n => (
                <NoticiaCard key={n.id} noticia={n} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              ← Anterior
            </button>
            <span className="text-sm text-gray-500">
              Página <span className="font-medium text-gray-700">{page + 1}</span> de {totalPages}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribuci\u00f3n de scores</h2>
            <CredibilidadChart noticias={noticias} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Grafo de relaciones</h2>
            <GrafoSimple noticias={noticias} />
          </div>
        </div>
      </div>
    </div>
  )
}
