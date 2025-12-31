import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log non-CORS errors
    if (!error.message.includes('CORS') && !error.message.includes('cross-origin')) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--app-bg)] p-6">
          <div className="text-center">
            <h2 className="text-[var(--app-text-primary)] text-lg font-medium mb-2">
              Algo deu errado
            </h2>
            <p className="text-[var(--app-text-tertiary)] text-sm mb-4">
              Tente recarregar a página
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--app-accent)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
