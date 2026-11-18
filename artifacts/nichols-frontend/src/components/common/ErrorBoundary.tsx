import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

const CHUNK_RELOAD_KEY = 'app_chunk_reload'

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo)

    // Check if error is caused by dynamic chunk loading failure
    const msg = (error?.message || '').toLowerCase()
    const isChunkError =
      msg.includes('failed to fetch dynamically imported module') ||
      msg.includes('error loading dynamically imported module') ||
      msg.includes('loading chunk') ||
      msg.includes('importing a module script failed') ||
      msg.includes('unexpected token <')

    if (isChunkError && typeof window !== 'undefined') {
      const last = sessionStorage.getItem(CHUNK_RELOAD_KEY)
      const now = Date.now()
      if (!last || now - parseInt(last, 10) > 10000) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, now.toString())
        window.location.reload()
      }
    }
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY)
      window.location.reload()
    }
  }

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-brand-black text-white flex items-center justify-center p-6 selection:bg-lime-500 selection:text-black">
          <div className="max-w-md w-full bg-brand-charcoal border border-brand-border rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-2">
              Unable to load view
            </h2>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              A newer version of the website may be available or a network disruption interrupted loading. Please refresh to continue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-lime-500 text-black font-semibold text-sm hover:bg-lime-400 transition-colors shadow-sm cursor-pointer"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-brand-surface border border-brand-border text-neutral-300 font-semibold text-sm hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
