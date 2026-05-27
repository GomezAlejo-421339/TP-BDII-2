import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

type ToastType = 'success' | 'error'

interface Toast {
  id: number
  message: string
  type: ToastType
}

type AddToastFn = (message: string, type?: ToastType) => void

const ToastContext = createContext<AddToastFn | null>(null)

export function useToast(): AddToastFn {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback<AddToastFn>((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-modal text-sm font-medium animate-slide-up max-w-sm ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success'
              ? <CheckCircleIcon className="w-5 h-5 shrink-0" />
              : <XCircleIcon className="w-5 h-5 shrink-0" />
            }
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="shrink-0 opacity-70 hover:opacity-100">
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
