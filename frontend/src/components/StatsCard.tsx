import React, { ReactNode } from 'react'

export interface StatsCardProps {
  icon: ReactNode
  label: string
  value?: string | number | null
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple'
  loading?: boolean
}

export default function StatsCard({ icon, label, value, color = 'blue', loading }: StatsCardProps) {
  const colors = {
    blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-700',
    red: 'from-red-500 to-red-600 bg-red-50 text-red-700',
    green: 'from-green-500 to-green-600 bg-green-50 text-green-700',
    yellow: 'from-yellow-500 to-yellow-600 bg-yellow-50 text-yellow-700',
    purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-700',
  }

  const gradientClasses = colors[color] || colors.blue

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientClasses.split(' ')[0]} ${gradientClasses.split(' ')[1]} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          {loading ? (
            <div className="skeleton h-7 w-16 mt-1" />
          ) : (
            <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
          )}
        </div>
      </div>
    </div>
  )
}
