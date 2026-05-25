import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDownIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const entidades = [
  { label: 'Usuarios', path: '/usuarios' },
  { label: 'Autores', path: '/autores' },
  { label: 'Temas', path: '/temas' },
  { label: 'Claims', path: '/claims' },
  { label: 'Fuentes', path: '/fuentes' },
]

export default function Header() {
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')

  const isActive = (path) => location.pathname === path

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      window.location.href = `/noticia/${search.trim()}`
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            FG
          </div>
          <span className="text-xl font-bold">
            <span className="text-fake-600">Fake</span>
            <span className="text-gray-700">Graph</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/"
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
            Dashboard
          </Link>

          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${dropdownOpen || entidades.some(e => isActive(e.path)) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              Entidades <ChevronDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 animate-fade-in">
                {entidades.map(e => (
                  <Link key={e.path} to={e.path}
                    className={`block px-4 py-2 text-sm transition-colors ${isActive(e.path) ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                    {e.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/stats"
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/stats') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
            Estadísticas
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar noticia por ID..."
              className="w-56 pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
            />
          </div>
        </form>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 space-y-2 animate-fade-in">
          <Link to="/" onClick={() => setMobileOpen(false)}
            className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/') ? 'bg-gray-100' : ''}`}>Dashboard</Link>
          {entidades.map(e => (
            <Link key={e.path} to={e.path} onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive(e.path) ? 'bg-gray-100' : ''}`}>{e.label}</Link>
          ))}
          <Link to="/stats" onClick={() => setMobileOpen(false)}
            className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/stats') ? 'bg-gray-100' : ''}`}>Estadísticas</Link>
          <form onSubmit={handleSearch} className="pt-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar noticia por ID..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl" />
          </form>
        </div>
      )}
    </header>
  )
}
