import { Link } from 'react-router-dom'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

function scoreColor(score) {
  if (score == null) return 'bg-gray-300 text-gray-600'
  if (score < 0.3) return 'bg-red-500 text-white'
  if (score < 0.6) return 'bg-yellow-500 text-white'
  return 'bg-green-500 text-white'
}

function scoreBarColor(score) {
  if (score == null) return 'bg-gray-300'
  if (score < 0.3) return 'bg-red-500'
  if (score < 0.6) return 'bg-yellow-500'
  return 'bg-green-500'
}

function scoreLabel(score) {
  if (score == null) return 'Sin score'
  if (score < 0.3) return 'Crítica'
  if (score < 0.6) return 'Dudosa'
  return 'Confiable'
}

export default function NoticiaCard({ noticia }) {
  const score = noticia.scoreCredibilidad ?? 0.5

  return (
    <Link
      to={`/noticia/${noticia.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 shadow-card hover:shadow-card-hover hover:border-gray-300 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {noticia.titulo}
            </h3>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
          </div>
          {noticia.contenido && (
            <p className="text-sm text-gray-500 line-clamp-2">{noticia.contenido}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              {noticia.fuente?.nombre || 'Fuente desconocida'}
            </span>
            {noticia.tema && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                {noticia.tema.nombre}
              </span>
            )}
            {noticia.fechaPublicacion && (
              <span>{new Date(noticia.fechaPublicacion).toLocaleDateString('es-AR')}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className={`w-12 h-12 rounded-full ${scoreColor(score)} flex items-center justify-center font-bold text-sm shadow-sm`}>
            {Math.round(score * 100)}
          </div>
          <span className="text-xs font-medium text-gray-500">{scoreLabel(score)}</span>
          <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${scoreBarColor(score)} rounded-full transition-all duration-500`}
              style={{ width: `${score * 100}%` }} />
          </div>
        </div>
      </div>
    </Link>
  )
}
