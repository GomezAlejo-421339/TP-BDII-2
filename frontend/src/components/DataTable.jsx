import { useState } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ConfirmModal from './ConfirmModal'
import { TableSkeleton } from './Skeleton'

export default function DataTable({ columns, data, loading, onEdit, onDelete, emptyMessage, searchKeys }) {
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = search && searchKeys
    ? data.filter(row =>
        searchKeys.some(key =>
          String(row[key] ?? '').toLowerCase().includes(search.toLowerCase())
        )
      )
    : data

  if (loading) return <TableSkeleton rows={5} cols={columns.length} />

  return (
    <div className="space-y-3 animate-fade-in">
      {searchKeys && (
        <div className="relative max-w-xs">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      )}

      {(!filtered || filtered.length === 0) ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <MagnifyingGlassIcon className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">{search ? 'Sin resultados para esa búsqueda' : (emptyMessage || 'No hay registros')}</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                {columns.map(col => (
                  <th key={col.key} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.id || i} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors even:bg-gray-50/30">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-gray-900">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {onEdit && (
                          <button onClick={() => onEdit(row)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            Editar
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => setDeleteTarget(row)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          message={`¿Eliminar ${deleteTarget.nombre || deleteTarget.texto || deleteTarget.id}?`}
          onConfirm={() => { onDelete(deleteTarget); setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
