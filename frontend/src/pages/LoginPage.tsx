import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { EnvelopeIcon, ArrowRightIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../utils/Fetch'

interface LoginResponse {
  id: string
  nombre: string
  email: string
  scoreCredibilidad: number
  seguidores: number
  antiguedadDias: number
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const addToast = useToast()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      addToast('Por favor, completa todos los campos', 'error')
      return
    }

    setLoading(true)
    try {
      const data = await apiFetch<LoginResponse>('/api/usuarios/login', {
        method: 'POST',
        body: JSON.stringify({ 
          email: email.trim(),
          password: password.trim()
        }),
      })

      login({
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        scoreCredibilidad: data.scoreCredibilidad,
        seguidores: data.seguidores,
        antiguedadDias: data.antiguedadDias
      })

      addToast(`¡Bienvenido de nuevo, ${data.nombre}!`, 'success')
      navigate('/')
    } catch (error: any) {
      addToast(error.message || 'Error al iniciar sesión. Verifica el correo.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-md border border-gray-100 p-8 rounded-2xl shadow-modal animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <EnvelopeIcon className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Ingresa tu correo registrado para acceder al sistema
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                  placeholder="••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Ingresar <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta aún?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
