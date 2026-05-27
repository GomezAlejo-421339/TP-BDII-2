import React, { useState, useEffect } from 'react'
import DataTable, { DataTableColumn } from '../components/DataTable'
import { ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface Usuario {
  id?: string
  nombre: string
  email: string
  seguidores: number
  antiguedadDias: number
  scoreCredibilidad: number
}

function maskEmail(email: string) {
  if (!email) return ''
  const parts = email.split('@')
  if (parts.length !== 2) return email
  const [local, domain] = parts
  if (local.length <= 2) return `${local[0]}***@${domain}`
  return `${local.substring(0, 2)}***@${domain}`
}

const columns: DataTableColumn<Usuario>[] = [
  { 
    key: 'id', 
    label: 'ID' 
  },
  { 
    key: 'nombre', 
    label: 'Usuario',
    render: (u) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold font-sans">
          {u.nombre.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-gray-900">{u.nombre}</span>
      </div>
    )
  },
  { 
    key: 'email', 
    label: 'Correo Electrónico',
    render: (u) => <span className="text-gray-500 font-mono text-sm">{maskEmail(u.email)}</span>
  },
  { 
    key: 'seguidores', 
    label: 'Seguidores',
    render: (u) => (
      <span className="text-gray-600 font-medium">
        {(u.seguidores ?? 0).toLocaleString('es-AR')}
      </span>
    )
  },
  {
    key: 'antiguedadDias', 
    label: 'Antigüedad',
    render: (u) => <span className="text-gray-600">{(u.antiguedadDias ?? 1)} días</span>
  },
  {
    key: 'scoreCredibilidad',
    label: 'Confiabilidad',
    render: (u) => {
      const score = u.scoreCredibilidad ?? 50
      let colorClass = 'bg-green-500'
      let textClass = 'text-green-700 bg-green-50 border-green-200'
      let label = 'Confiable'
      if (score < 30) {
        colorClass = 'bg-red-500'
        textClass = 'text-red-700 bg-red-50 border-red-200'
        label = 'Crítica'
      } else if (score < 70) {
        colorClass = 'bg-yellow-500'
        textClass = 'text-yellow-700 bg-yellow-50 border-yellow-200'
        label = 'Dudosa'
      }
      return (
        <div className="flex items-center gap-3 w-52">
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className={`h-full ${colorClass} transition-all duration-500`} style={{ width: `${score}%` }}></div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${textClass}`}>
            {label} ({score}%)
          </span>
        </div>
      )
    }
  }
]

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetch('/api/v1/usuarios')
      .then(r => {
        if (!r.ok) throw new Error('Error al cargar')
        return r.json()
      })
      .then(data => { 
        setUsuarios(data)
        setLoading(false) 
      })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <UserGroupIcon className="w-7 h-7 text-indigo-600" />
            Directorio de Usuarios y Reputación
          </h1>
          <p className="text-sm text-gray-500">
            Puntaje de confiabilidad del usuario calculado dinámicamente en base a su historial de votos y consenso.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-sm text-blue-700">
          <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
          <span>Sistema Automatizado de Auditoría</span>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={usuarios} 
        loading={loading} 
        searchKeys={['nombre', 'email', 'id']} 
        emptyMessage="No hay usuarios registrados en el sistema."
      />
    </div>
  )
}
