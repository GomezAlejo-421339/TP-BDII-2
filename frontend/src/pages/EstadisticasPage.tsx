import React, { useState, useEffect } from 'react'
import { NewspaperIcon, ShieldCheckIcon, UserGroupIcon, ChartBarIcon, GlobeAltIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import StatsCard from '../components/StatsCard'
import CredibilidadDonut, { CredibilidadDonutItem } from '../components/CredibilidadDonut'
import FuentesBarChart, { FuenteBarChartItem } from '../components/FuentesBarChart'
import TemaBarChart, { TemaBarChartItem } from '../components/TemaBarChart'
import TopUsuariosRanking, { TopUsuariosRankingItem } from '../components/TopUsuariosRanking'
import TendenciaLineChart, { TendenciaLineChartItem } from '../components/TendenciaLineChart'
import { CardSkeleton } from '../components/Skeleton'

interface ResumenDb {
  totalNoticias: number
  credibilidadPromedio: number
  totalFuentes: number
  totalFuentesVerificadas: number
  totalClaims: number
  totalUsuarios: number
}
import { apiFetch } from '../utils/Fetch'

export default function EstadisticasPage() {
  const [resumen, setResumen] = useState<ResumenDb | null>(null)
  const [distribucion, setDistribucion] = useState<CredibilidadDonutItem[]>([])
  const [porFuente, setPorFuente] = useState<FuenteBarChartItem[]>([])
  const [porTema, setPorTema] = useState<TemaBarChartItem[]>([])
  const [usuariosTop, setUsuariosTop] = useState<TopUsuariosRankingItem[]>([])
  const [tendencia, setTendencia] = useState<TendenciaLineChartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      apiFetch<ResumenDb>('/api/estadisticas/resumen-bd').catch(() => null),
      apiFetch<CredibilidadDonutItem[]>('/api/estadisticas/distribucion').catch(() => []),
      apiFetch<FuenteBarChartItem[]>('/api/estadisticas/por-fuente').catch(() => []),
      apiFetch<TemaBarChartItem[]>('/api/estadisticas/por-tema').catch(() => []),
      apiFetch<TopUsuariosRankingItem[]>('/api/estadisticas/usuarios-top').catch(() => []),
      apiFetch<TendenciaLineChartItem[]>('/api/estadisticas/tendencia').catch(() => []),
    ])
      .then(([r, d, f, t, u, te]) => {
        setResumen(r)
        setDistribucion(d)
        setPorFuente(f)
        setPorTema(t)
        setUsuariosTop(u)
        setTendencia(te)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const fuentesVerifPct = (resumen && resumen.totalFuentes > 0)
    ? Math.round((resumen.totalFuentesVerificadas / resumen.totalFuentes) * 100)
    : 0

  const getCredColor = (cred?: number) => {
    if (cred == null) return 'blue'
    if (cred >= 0.6) return 'green'
    if (cred >= 0.3) return 'yellow'
    return 'red'
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Estadísticas de la base de datos</h1>
        <p className="text-sm text-gray-500 mt-1">Métricas y análisis sobre los datos almacenados en Neo4j</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatsCard icon={<NewspaperIcon className="w-6 h-6" />} label="Noticias" value={resumen?.totalNoticias ?? '—'} color="blue" loading={loading} />
        <StatsCard icon={<ChartBarIcon className="w-6 h-6" />} label="Credibilidad prom." value={resumen?.credibilidadPromedio ? resumen.credibilidadPromedio.toFixed(2) : '—'} color={getCredColor(resumen?.credibilidadPromedio)} loading={loading} />
        <StatsCard icon={<GlobeAltIcon className="w-6 h-6" />} label="Fuentes" value={resumen?.totalFuentes ?? '—'} color="purple" loading={loading} />
        <StatsCard icon={<ShieldCheckIcon className="w-6 h-6" />} label="Fuentes verificadas" value={resumen?.totalFuentes ? `${fuentesVerifPct}%` : '—'} color={fuentesVerifPct >= 50 ? 'green' : 'yellow'} loading={loading} />
        <StatsCard icon={<DocumentTextIcon className="w-6 h-6" />} label="Claims" value={resumen?.totalClaims ?? '—'} color="blue" loading={loading} />
        <StatsCard icon={<UserGroupIcon className="w-6 h-6" />} label="Usuarios" value={resumen?.totalUsuarios ?? '—'} color="purple" loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Distribución de credibilidad</h2>
          <CredibilidadDonut data={distribucion} loading={loading} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Noticias por fuente</h2>
          <FuentesBarChart data={porFuente} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Noticias por tema</h2>
          <TemaBarChart data={porTema} loading={loading} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Top usuarios que más comparten</h2>
          <TopUsuariosRanking data={usuariosTop} loading={loading} />
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Tendencia temporal</h2>
        {loading ? <CardSkeleton lines={4} /> : <TendenciaLineChart data={tendencia} loading={loading} />}
      </div>
    </div>
  )
}
