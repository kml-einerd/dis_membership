import { useState } from 'react';
import { Search, TrendingUp, Sparkles, Filter, Grid3X3, List } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import {
  ChipTabs,
  ContentCard,
  SectionHeader,
  GlassSurface,
  IconButton,
  SidebarWidget,
  SidebarTrailerCard,
} from '../../components/design-system';
import { motion } from 'motion/react';
import { cn } from '../../lib/cn';

export default function ExploreV2() {
  const { navigate } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['Tudo', 'Destinos', 'Técnicas', 'Ferramentas', 'Premium'];

  const trending = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Caribe Econômico',
      subtitle: 'Tendência #1 • 15 aulas',
      badge: 'Popular',
      category: 'Destinos',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Europa Low Cost',
      subtitle: 'Tendência #2 • 20 aulas',
      category: 'Destinos',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      title: 'Ásia para Mochileiros',
      subtitle: 'Tendência #3 • 18 aulas',
      badge: 'Novo',
      category: 'Aventura',
    },
  ];

  const allContent = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      title: 'Guia Definitivo: Passagens Baratas',
      subtitle: '24 aulas • 6h 30min',
      category: 'Técnicas',
      duration: '6h 30min',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      title: 'Praias Paradisíacas Acessíveis',
      subtitle: '8 destinos exclusivos',
      category: 'Destinos',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Extensão: Rastreador de Preços',
      subtitle: 'Alertas em tempo real',
      discount: 'Grátis',
      category: 'Ferramentas',
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
      title: 'Milhas e Pontos: Maximizando',
      subtitle: 'Curso completo • Premium',
      locked: true,
      category: 'Premium',
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Roteiro Caribe 15 Dias',
      subtitle: 'Passo a passo completo',
      category: 'Destinos',
    },
    {
      id: '6',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Erro de Tarifa: Como Encontrar',
      subtitle: 'Técnicas avançadas',
      badge: 'Avançado',
      category: 'Técnicas',
    },
  ];

  const categoryCards = [
    { id: '1', name: 'Destinos Nacionais', count: 28, color: 'primary' },
    { id: '2', name: 'América do Sul', count: 22, color: 'secondary' },
    { id: '3', name: 'Europa', count: 35, color: 'purchase' },
    { id: '4', name: 'Técnicas Avançadas', count: 18, color: 'premium' },
  ];

  const filteredContent = allContent.filter(item => 
    activeCategory === 'Tudo' || item.category === activeCategory
  );

  // Sidebar content
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* Search Tips */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h3 className="text-[var(--text-primary)] text-sm font-semibold">
              Dica de Busca
            </h3>
            <p className="text-[var(--text-muted)] text-xs">
              Use filtros para refinar
            </p>
          </div>
        </div>
        <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">
          Combine categorias e use palavras-chave específicas como "Europa barato" ou "milhas aéreas" para encontrar conteúdo mais relevante.
        </p>
      </GlassSurface>

      {/* Popular Searches */}
      <GlassSurface
        variant="surface-1"
        blur="light"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          Buscas populares
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Passagens baratas', 'Europa', 'Milhas', 'Caribe', 'Promoções', 'Erro de tarifa'].map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-3 py-1.5 bg-[var(--glass-surface-2)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] rounded-full text-[var(--text-secondary)] text-xs font-medium transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </GlassSurface>

      {/* Trending Widget */}
      <SidebarWidget
        title="Em Alta"
        action={{ label: 'Ver mais', onClick: () => {} }}
      >
        <div className="space-y-3">
          {trending.slice(0, 2).map((item) => (
            <SidebarTrailerCard
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              subtitle={item.subtitle}
              onClick={() => navigate('video-lesson')}
            />
          ))}
        </div>
      </SidebarWidget>
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
            Explorar
          </h1>
          <p className="text-[var(--text-tertiary)] text-sm lg:text-base">
            Descubra novos conteúdos e treinamentos
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] focus-within:border-[var(--accent-primary-border)] transition-colors">
                <Search className="w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar destinos, técnicas, ferramentas..."
                  className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                />
                <kbd className="hidden lg:flex items-center gap-1 px-2 py-1 bg-[var(--glass-surface-3)] rounded-md text-[10px] text-[var(--text-muted)] font-medium">
                  ⌘ K
                </kbd>
              </div>
              <IconButton size="lg" className="hidden lg:flex">
                <Filter className="w-5 h-5 text-[var(--text-tertiary)]" />
              </IconButton>
              <div className="hidden lg:flex items-center gap-1 p-1 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-[var(--radius-lg)]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-[var(--radius-md)] transition-colors',
                    viewMode === 'grid' ? 'bg-[var(--glass-surface-hover)]' : 'hover:bg-[var(--glass-surface-hover)]'
                  )}
                >
                  <Grid3X3 className={cn('w-4 h-4', viewMode === 'grid' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]')} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-[var(--radius-md)] transition-colors',
                    viewMode === 'list' ? 'bg-[var(--glass-surface-hover)]' : 'hover:bg-[var(--glass-surface-hover)]'
                  )}
                >
                  <List className={cn('w-4 h-4', viewMode === 'list' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]')} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <ChipTabs tabs={categories} activeTab={activeCategory} onChange={setActiveCategory} />
        </motion.div>

        {/* Trending Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SectionHeader
            title={
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--accent-purchase)]" />
                Em alta agora
              </span>
            }
          />
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
            {trending.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="w-40 flex-shrink-0 lg:w-full"
              >
                <ContentCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  badge={item.badge}
                  onClick={() => navigate('video-lesson')}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Category Cards - Mobile Only */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:hidden mb-8"
        >
          <SectionHeader title="Categorias" />
          <div className="grid grid-cols-2 gap-3">
            {categoryCards.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                onClick={() => setActiveCategory(category.name.split(' ')[0])}
                className="p-4 bg-[var(--glass-surface-2)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] transition-all text-left"
              >
                <h3 className="text-[var(--text-primary)] text-sm font-medium mb-1">
                  {category.name}
                </h3>
                <p className="text-[var(--text-muted)] text-xs">
                  {category.count} conteúdos
                </p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* All Content Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionHeader
            title="Todos os conteúdos"
            action={{ label: 'Ver mais', onClick: () => {} }}
          />
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.03 }}
                >
                  <ContentCard
                    imageUrl={item.imageUrl}
                    title={item.title}
                    subtitle={item.subtitle}
                    badge={item.badge}
                    discount={item.discount}
                    locked={item.locked}
                    onClick={() => {
                      if (item.locked) {
                        navigate('locked-preview');
                      } else {
                        navigate('video-lesson');
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.03 }}
                >
                  <ContentCard
                    imageUrl={item.imageUrl}
                    title={item.title}
                    subtitle={item.subtitle}
                    category={item.category}
                    duration={item.duration}
                    badge={item.badge}
                    discount={item.discount}
                    locked={item.locked}
                    variant="wide"
                    onClick={() => {
                      if (item.locked) {
                        navigate('locked-preview');
                      } else {
                        navigate('video-lesson');
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </VeloxLayout>
  );
}

