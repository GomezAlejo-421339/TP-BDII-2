import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  nombre: string
  email: string
  scoreCredibilidad?: number
  seguidores?: number
  antiguedadDias?: number
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const userNombre = localStorage.getItem('userNombre')
    const userEmail = localStorage.getItem('userEmail')
    if (userId && userNombre && userEmail) {
      setUser({ id: userId, nombre: userNombre, email: userEmail })
    }
    setLoading(false)
  }, [])

  const login = (userData: User) => {
    localStorage.setItem('userId', userData.id)
    localStorage.setItem('userNombre', userData.nombre)
    localStorage.setItem('userEmail', userData.email)
    setUser(userData)
  };

  const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userNombre')
    localStorage.removeItem('userEmail')
    setUser(null)
  };

  if (loading) {
    return null; // O un spinner de carga si fuera necesario
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }
  return context
}
