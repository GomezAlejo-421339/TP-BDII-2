import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ToastProvider } from './components/ToastProvider'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import NoticiaDetail from './pages/NoticiaDetail'
import FuentesPage from './pages/FuentesPage'
import UsuariosPage from './pages/UsuariosPage'
import TemasPage from './pages/TemasPage'
import EstadisticasPage from './pages/EstadisticasPage'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ToastProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/noticia/:id" element={<NoticiaDetail />} />
              <Route path="/fuentes" element={<FuentesPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/temas" element={<TemasPage />} />
              <Route path="/stats" element={<EstadisticasPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </ToastProvider>
      </div>
    </AuthProvider>
  )
}
