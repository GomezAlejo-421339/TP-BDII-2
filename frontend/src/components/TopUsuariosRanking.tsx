import React from 'react'

export interface TopUsuariosRankingItem {
  nombre: string
  totalShares: number
}

export interface TopUsuariosRankingProps {
  data?: TopUsuariosRankingItem[]
  loading?: boolean
}

export default function TopUsuariosRanking({ data, loading }: TopUsuariosRankingProps) {
  if (loading) return <div className="skeleton h-52 rounded-xl" />
  if (!data?.length) return <div className="text-center py-10 text-sm text-gray-400">Sin usuarios que compartan</div>

  const maxShares = Math.max(...data.map(u => u.totalShares))

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card">
      <div className="space-y-3">
        {data.map((u, i) => {
          const pct = maxShares > 0 ? (u.totalShares / maxShares) * 100 : 0
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 text-sm font-semibold text-gray-400 text-right">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800 truncate">{u.nombre}</span>
                  <span className="text-xs font-semibold text-gray-600">{u.totalShares} shares</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: i < 3
                        ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                        : 'linear-gradient(90deg, #93c5fd, #a5b4fc)'
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
