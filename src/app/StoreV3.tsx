import { useState } from 'react';
import { Download, Zap, Bell, Search, Crown, Star, Shield, ChevronRight } from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import { VeloxLayout } from '../components/layout/VeloxLayout';
import {
  ChipTabs,
  ContentCard,
  SectionHeader,
  GlassSurface,
  Button,
  SidebarWidget,
} from '../components/design-system';
import { motion } from 'motion/react';
import { cn } from '../lib/cn';

export default function StoreV3() {
  const { navigate } = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('Tudo');

  const filters = ['Tudo', 'Grátis', 'Premium', 'Populares'];

  const products = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Rastreador de Preços Pro',
      subtitle: 'Alertas em tempo real • WhatsApp',
      discount: 'Grátis',
      price: 'R$ 0',
      badge: 'Popular',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
      title: 'Comparador Multi-Sites Premium',
      subtitle: 'Compare 15+ sites simultaneamente',
      discount: '-60%',
      price: 'R$ 19,90',
      originalPrice: 'R$ 49,90',
      badge: 'Oferta',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      title: 'Calendário Flex de Tarifas',
      subtitle: 'Veja mês inteiro + previsões IA',
      price: 'R$ 29,90',
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Alerta Erro de Tarifa VIP',
      subtitle: 'Notificações 24/7 antes de todos',
      price: 'R$ 47,90/mês',
      locked: true,
      badge: 'VIP',
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      title: 'Planilha Automática de Viagens',
      subtitle: 'Organize tudo + calculadora de gastos',
      discount: '-40%',
      price: 'R$ 17,90',
      originalPrice: 'R$ 29,90',
    },
    {
      id: '6',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Bundle: Todas as Ferramentas',
      subtitle: 'Economize 70% comprando tudo junto',
      discount: '-70%',
      price: 'R$ 97',
      originalPrice: 'R$ 327',
      badge: 'Melhor Oferta',
    },
    {
      id: '7',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      title: 'Consultor de Milhas IA',
      subtitle: 'Otimize suas milhas com inteligência artificial',
      price: 'R$ 67/mês',
      locked: true,
      badge: 'Novo',
    },
    {
      id: '8',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      title: 'E-book: 101 Destinos Baratos',
      subtitle: 'Guia completo + orçamentos reais',
      price: 'R$ 27',
    },
  ];

  const quickAddons = [
    { id: '1', icon: Download, name: 'Chrome Extension', description: 'Instalar grátis', available: true },
    { id: '2', icon: Bell, name: 'Alertas Push', description: 'Ativar notificações', available: true },
    { id: '3', icon: Zap, name: 'API Access', description: 'Acesso Premium', available: false },
    { id: '4', icon: Search, name: 'Busca Avançada', description: 'Incluído no plano', available: true },
  ];

  const premiumBenefits = [
    { icon: Crown, title: 'Acesso completo', description: 'Todos os módulos e aulas' },
    { icon: Zap, title: 'Ferramentas exclusivas', description: 'Extensões e alertas premium' },
    { icon: Star, title: 'Suporte prioritário', description: 'Resposta em 24h' },
    { icon: Shield, title: 'Garantia de 30 dias', description: 'Satisfação garantida' },
  ];

  // Sidebar content
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] flex items-center justify-center">
            <Crown className="w-5 h-5 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h3 className="text-[var(--text-primary)] text-sm font-semibold">
              Plano Atual
            </h3>
            <p className="text-[var(--accent-primary)] text-xs font-medium">
              Básico
            </p>
          </div>
        </div>
        <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-4">
          Faça upgrade para desbloquear todas as ferramentas e conteúdos premium.
        </p>
        <Button variant="primary" size="md" fullWidth onClick={() => navigate('sales-video')}>
          Ver planos
        </Button>
      </GlassSurface>

      {/* Installed Tools */}
      <SidebarWidget title="Instalados">
        <div className="space-y-3">
          {quickAddons.filter(a => a.available).slice(0, 3).map((addon) => {
            const Icon = addon.icon;
            return (
              <div key={addon.id} className="flex items-center gap-3 p-2 rounded-[var(--radius-md)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-secondary-soft)] border border-[var(--accent-secondary-border)] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--accent-secondary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[var(--text-primary)] text-sm font-medium truncate">
                    {addon.name}
                  </h4>
                  <p className="text-[var(--text-muted)] text-xs">Ativo</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              </div>
            );
          })}
        </div>
      </SidebarWidget>

      {/* Help */}
      <GlassSurface
        variant="surface-1"
        blur="light"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-2">
          Precisa de ajuda?
        </h3>
        <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-4">
          Nossa equipe está pronta para ajudar com qualquer dúvida sobre as ferramentas.
        </p>
        <button className="flex items-center gap-2 text-[var(--accent-primary)] text-sm font-medium hover:underline">
          Falar com suporte
          <ChevronRight className="w-4 h-4" />
        </button>
      </GlassSurface>
    </div>
  );

  return (
    <VeloxLayout rightSidebar={renderRightSidebar()}>
      <div className="px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-[var(--text-primary)] text-2xl lg:text-3xl font-bold mb-2">
            Loja
          </h1>
          <p className="text-[var(--text-tertiary)] text-sm lg:text-base">
            Extensões e ferramentas para encontrar as melhores ofertas
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <ChipTabs tabs={filters} activeTab={selectedFilter} onChange={setSelectedFilter} />
        </motion.div>

        {/* Quick Actions - Mobile */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <SectionHeader title="Acesso rápido" />
          <div className="grid grid-cols-2 gap-3">
            {quickAddons.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <GlassSurface
                    variant="surface-1"
                    blur="light"
                    className={cn(
                      'p-4 rounded-[var(--radius-lg)] cursor-pointer transition-all',
                      'hover:bg-[var(--glass-surface-hover)]',
                      !addon.available && 'opacity-50'
                    )}
                    onClick={() => navigate('sales-video')}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-xl mb-3 flex items-center justify-center',
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
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Featured Products */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SectionHeader
            title="Extensões em destaque"
            action={{ label: 'Ver tudo', onClick: () => {} }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <ContentCard
                  imageUrl={product.imageUrl}
                  title={product.title}
                  subtitle={product.subtitle}
                  discount={product.discount}
                  locked={product.locked}
                  onClick={() => {
                    if (product.locked) {
                      navigate('locked-preview');
                    } else {
                      navigate('sales-video');
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Premium Upgrade Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassSurface
            variant="surface-3"
            blur="heavy"
            glow
            glowColor="var(--accent-purchase)"
            borderGradient="purchase"
            className="p-6 lg:p-10 rounded-[var(--radius-3xl)] overflow-hidden"
          >
            <div className="lg:flex lg:items-center lg:gap-12 relative z-10">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-purchase)] to-[var(--accent-premium)] shadow-xl shadow-orange-500/20 flex items-center justify-center mx-auto lg:mx-0 mb-6"
                >
                  <Zap className="w-8 h-8 text-white fill-current" />
                </motion.div>
                <h2 className="text-[var(--text-primary)] text-2xl lg:text-4xl font-black mb-3 tracking-tight">
                  Acesso Premium Completo
                </h2>
                <p className="text-[var(--text-tertiary)] text-sm lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
                  Desbloqueie todas as extensões, ferramentas exclusivas e suporte prioritário para maximizar sua economia.
                </p>
              </div>

              {/* Benefits Grid - Desktop */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-6 flex-shrink-0">
                {premiumBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[var(--accent-premium)]" />
                      </div>
                      <div>
                        <h4 className="text-[var(--text-primary)] text-sm font-bold">
                          {benefit.title}
                        </h4>
                        <p className="text-[var(--text-muted)] text-[11px] font-medium leading-normal mt-0.5">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="lg:flex-shrink-0 lg:ml-8 flex flex-col items-center">
                <Button 
                  variant="purchase" 
                  size="lg" 
                  fullWidth 
                  onClick={() => navigate('sales-video')}
                  className="lg:w-auto lg:px-12 lg:h-14 lg:text-lg shadow-2xl shadow-orange-500/30 font-black tracking-wide"
                >
                  FAZER UPGRADE
                </Button>
                <div className="flex items-center gap-2 mt-4 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest">
                  <Shield className="w-3 h-3" />
                  Garantia de 30 dias
                </div>
              </div>
            </div>
          </GlassSurface>
        </motion.section>
      </div>
    </VeloxLayout>
  );
}

