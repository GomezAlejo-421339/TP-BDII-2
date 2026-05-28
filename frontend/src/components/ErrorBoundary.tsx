import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="bg-white border border-red-200 rounded-xl p-8 max-w-lg text-center shadow-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Algo sali\u00f3 mal</h2>
            <p className="text-sm text-gray-500 mb-4">
              Ocurri\u00f3 un error inesperado.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              Recargar p\u00e1gina
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
