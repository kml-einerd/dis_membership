import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Zap, Bell, Search, ShoppingBag } from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import {
  GlassSurface,
  Button,
  IconButton,
  ChipTabs,
  PosterCard,
  SectionHeader,
} from '../components/design-system';
import { cn } from '../lib/cn';

export default function StoreV2() {
  const { navigate, goBack, canGoBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Tudo');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filters = ['Tudo', 'Grátis', 'Premium', 'Populares'];

  const products = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Rastreador de Preços Pro',
      subtitle: 'Alertas em tempo real',
      discount: 'Grátis',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
      title: 'Comparador Multi-Sites',
      subtitle: '10+ sites ao mesmo tempo',
      discount: '-50%',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      title: 'Calendário de Tarifas',
      subtitle: 'Visualize o mês inteiro',
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Alerta de Erro de Tarifa',
      subtitle: 'Notificações instantâneas',
      locked: true,
    },
  ];

  const quickAddons = [
    { id: '1', icon: Download, name: 'Chrome Extension', description: 'Instalar grátis', available: true },
    { id: '2', icon: Bell, name: 'Alertas Push', description: 'Ativar', available: true },
    { id: '3', icon: Zap, name: 'API Access', description: 'Premium', available: false },
    { id: '4', icon: Search, name: 'Busca Avançada', description: 'Incluído', available: true },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24">
        <div className="px-6 pt-4 pb-4 space-y-4 animate-pulse">
          <div className="h-8 w-32 bg-[var(--glass-surface-2)] rounded-[var(--radius-md)]" />
          <div className="h-12 bg-[var(--glass-surface-2)] rounded-[var(--radius-lg)]" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-[var(--glass-surface-2)] rounded-[var(--radius-lg)]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-4 pb-4">
        <div className="flex items-center gap-3 mb-6">
          {canGoBack && (
            <IconButton onClick={goBack} size="md">
              <ArrowLeft className="w-4.5 h-4.5 text-[var(--text-secondary)]" />
            </IconButton>
          )}
          <div className="flex-1">
            <h1 className="text-[var(--text-primary)] text-2xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[var(--accent-primary)]" />
              Loja
            </h1>
            <p className="text-[var(--text-tertiary)] text-sm mt-0.5">
              Extensões e ferramentas premium
            </p>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mb-6">
        <ChipTabs tabs={filters} activeTab={selectedFilter} onChange={setSelectedFilter} />
      </div>

      {/* Quick Actions */}
      <section className="px-6 mb-8">
        <SectionHeader title="Acesso rápido" />
        <div className="grid grid-cols-2 gap-3">
          {quickAddons.map((addon) => {
            const Icon = addon.icon;
            return (
              <GlassSurface
                key={addon.id}
                variant="surface-1"
                blur="light"
                className={cn(
                  'p-4 rounded-[var(--radius-lg)] cursor-pointer transition-all',
                  'hover:bg-[var(--glass-surface-2)]',
                  !addon.available && 'opacity-50'
                )}
                onClick={() => navigate('sales-video')}
                role="button"
              >
                <div className={cn(
                  'w-10 h-10 rounded-full mb-3 flex items-center justify-center',
                  'bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)]'
                )}>
                  <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-1 leading-snug">
                  {addon.name}
                </h3>
                <p className="text-[var(--text-muted)] text-xs">
                  {addon.description}
                </p>
              </GlassSurface>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 mb-8">
        <SectionHeader
          title="Extensões em destaque"
          action={{ label: 'Ver tudo', onClick: () => {} }}
        />
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="w-full">
              <PosterCard
                {...product}
                onClick={() => {
                  if (product.locked) {
                    navigate('locked-preview');
                  } else {
                    navigate('sales-video');
                  }
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Premium Upgrade Banner */}
      <section className="px-6">
        <GlassSurface
          variant="surface-2"
          blur="heavy"
          glow
          glowColor="var(--accent-purchase)"
          className="p-6 rounded-[var(--radius-xl)] text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--accent-purchase-soft)] border border-[var(--accent-purchase)] flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-[var(--accent-purchase)]" />
          </div>
          <h3 className="text-[var(--text-primary)] text-lg font-bold mb-2">
            Acesso Premium
          </h3>
          <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-5 max-w-[280px] mx-auto">
            Desbloqueie todas as extensões, ferramentas exclusivas e suporte prioritário
          </p>
          <Button variant="purchase" size="lg" fullWidth onClick={() => navigate('sales-video')}>
            Fazer upgrade
          </Button>
        </GlassSurface>
      </section>
    </div>
  );
}
