import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Zap, Bell, Search } from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import { NetflixStylePoster } from './components/NetflixStylePoster';

export default function Store() {
  const { navigate, goBack, canGoBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Tudo');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const featuredExtensions = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Rastreador de Preços Pro',
      subtitle: 'Alertas em tempo real',
      discount: 'Grátis',
      isOffer: true,
      type: 'video' as const,
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
      title: 'Comparador Multi-Sites',
      subtitle: '10+ sites ao mesmo tempo',
      discount: '-50%',
      isOffer: true,
      type: 'video' as const,
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      title: 'Calendário de Tarifas',
      subtitle: 'Visualize o mês inteiro',
      type: 'video' as const,
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Alerta de Erro de Tarifa',
      subtitle: 'Notificações instantâneas',
      discount: 'Premium',
      type: 'video' as const,
    },
  ];

  const quickAddons = [
    { id: '1', icon: Download, name: 'Chrome Extension', description: 'Instalar' },
    { id: '2', icon: Bell, name: 'Alertas Push', description: 'Ativar' },
    { id: '3', icon: Zap, name: 'API Access', description: 'Premium' },
    { id: '4', icon: Search, name: 'Busca Avançada', description: 'Grátis' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--app-bg)] pb-24">
        <div className="px-6 pt-4 pb-4">
          <div className="h-8 w-32 bg-[var(--app-surface)] rounded animate-pulse mb-4" />
          <div className="h-12 bg-[var(--app-surface)] rounded animate-pulse" />
        </div>
        <div className="px-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-[var(--app-surface)] rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-24">
      {/* Header */}
      <div className="px-6 pt-4 pb-4">
        <div className="flex items-center gap-3 mb-4">
          {canGoBack && (
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-full bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--app-text-secondary)]" />
            </button>
          )}
          <h1 className="text-[var(--app-text-primary)] text-2xl font-medium">
            Extensões
          </h1>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {['Tudo', 'Grátis', 'Premium', 'Populares'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-[var(--app-accent)] text-white'
                  : 'bg-[var(--app-surface-hover)] text-[var(--app-text-tertiary)] hover:bg-[var(--app-surface)] border border-[var(--app-border-subtle)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Premium Banner */}
      <div className="px-6 mb-6">
        <div className="relative p-5 bg-gradient-to-br from-[var(--app-accent)]/10 to-[var(--app-surface)] border border-[var(--app-accent)]/20 rounded-[var(--app-radius-lg)] overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[var(--app-accent)]/10 blur-3xl rounded-full" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--app-accent)]/20 rounded-md mb-2">
              <Zap className="w-3 h-3 text-[var(--app-accent)]" />
              <span className="text-[var(--app-accent)] text-xs font-medium">Premium</span>
            </div>
            <h2 className="text-[var(--app-text-primary)] font-medium text-lg mb-1">
              Pack Completo de Ferramentas
            </h2>
            <p className="text-[var(--app-text-tertiary)] text-sm mb-4 leading-relaxed">
              Todas as extensões + alertas ilimitados + suporte prioritário
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <span className="text-[var(--app-accent)] font-medium text-2xl">R$ 47</span>
                <span className="text-[var(--app-text-muted)] text-sm line-through ml-2">R$ 97</span>
              </div>
              <div className="px-2 py-0.5 bg-[var(--app-accent)]/20 rounded text-[var(--app-accent)] text-xs font-medium">
                -50%
              </div>
            </div>
            <button
              onClick={() => navigate('sales-video')}
              className="w-full py-3 bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] rounded-[var(--app-radius-md)] text-white font-medium transition-all"
            >
              Ver detalhes
            </button>
          </div>
        </div>
      </div>

      {/* Quick Add-ons */}
      <div className="px-6 mb-6">
        <h2 className="text-[var(--app-text-primary)] text-base font-medium mb-3">
          Acesso rápido
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickAddons.map((addon) => {
            const Icon = addon.icon;
            return (
              <button
                key={addon.id}
                onClick={() => navigate('sales-video')}
                className="flex items-center gap-3 p-3 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--app-accent-soft)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[var(--app-accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[var(--app-text-primary)] text-sm font-medium leading-tight mb-0.5 truncate">
                    {addon.name}
                  </h3>
                  <p className="text-[var(--app-text-muted)] text-xs truncate">
                    {addon.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Extensions Grid */}
      <div className="px-6">
        <h2 className="text-[var(--app-text-primary)] text-base font-medium mb-3">
          Extensões em destaque
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {featuredExtensions.map((ext) => (
            <div key={ext.id}>
              <NetflixStylePoster
                {...ext}
                onClick={() => navigate('sales-video')}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
