import { useState } from 'react';
import { Play, TrendingUp, Clock, Award, Zap, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import {
  ChipTabs,
  ContentCard,
  SectionHeader,
  Button,
  GlassSurface,
  HeroCarousel,
  StatsWidget,
  SidebarWidget,
  SidebarListItem,
  SidebarTrailerCard,
} from '../../components/design-system';
import { motion } from 'motion/react';

export default function HomeV5() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Tudo');

  const filters = ['Tudo', 'Comece aqui', 'Módulos', 'Artigos', 'Favoritos'];

  // Hero carousel data
  const heroSlides = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=1200',
      title: 'Passagens para Europa a partir de R$ 1.500',
      subtitle: 'Guia Completo de Viagens',
      description: 'Aprenda as estratégias comprovadas que uso para encontrar voos internacionais baratos. Do básico ao avançado, com métodos testados por milhares de alunos.',
      tags: ['Destinos', 'Europa'],
      badge: 'Novo',
      progress: 35,
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      title: 'Caribe Econômico: Praias Paradisíacas',
      subtitle: 'Destinos Exclusivos',
      description: 'Descubra as ilhas mais bonitas do Caribe gastando menos do que você imagina. Roteiros completos e dicas de hospedagem.',
      tags: ['Caribe', 'Praias'],
      badge: 'Popular',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=1200',
      title: 'Técnicas Avançadas de Busca',
      subtitle: 'Masterclass Premium',
      description: 'Domine as ferramentas e extensões que os especialistas usam para encontrar erros de tarifa e promoções exclusivas.',
      tags: ['Avançado', 'Ferramentas'],
      badge: 'Premium',
    },
  ];

  // Stats data
  const userStats = [
    { label: 'Aulas concluídas', value: 24, change: 12, icon: <Play className="w-5 h-5" />, color: 'primary' as const },
    { label: 'Horas de estudo', value: '18h', change: 8, icon: <Clock className="w-5 h-5" />, color: 'secondary' as const },
    { label: 'Economia estimada', value: 'R$ 4.2k', change: 25, icon: <TrendingUp className="w-5 h-5" />, color: 'purchase' as const },
    { label: 'Conquistas', value: 7, change: 0, icon: <Award className="w-5 h-5" />, color: 'premium' as const },
  ];

  // Continue watching data
  const continueWatching = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Como usar alertas de preço',
      subtitle: 'Aula 3 de 8 • 8 min restantes',
      progress: 67,
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
      title: 'Melhor dia para comprar passagens',
      subtitle: 'Aula 2 de 12 • 15 min restantes',
      progress: 34,
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Voos com múltiplas paradas',
      subtitle: 'Aula 1 de 6 • 22 min restantes',
      progress: 10,
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      title: 'Destinos fora do radar',
      subtitle: 'Aula 4 de 10 • 5 min restantes',
      progress: 85,
    },
  ];

  // Featured content
  const featured = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      title: 'Guia Completo de Passagens Baratas',
      subtitle: '12 aulas práticas',
      category: 'Destinos',
      duration: '3h 20min',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Destinos Econômicos 2025',
      subtitle: 'Lista atualizada',
      badge: 'Novo',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Europa com Orçamento Limitado',
      subtitle: 'Premium exclusivo',
      locked: true,
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      title: 'Praias Paradisíacas Acessíveis',
      subtitle: '8 destinos imperdíveis',
    },
  ];

  // New trailers/content
  const newTrailers = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      title: 'Ásia Econômica',
      subtitle: 'Novo módulo',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Caribe Low Cost',
      subtitle: 'Em destaque',
    },
  ];

  // Sidebar content for desktop
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* New Content Widget */}
      <SidebarWidget
        title="Novidades"
        sortable
        sortLabel="Hoje"
        onSortChange={() => {}}
      >
        <div className="space-y-3">
          {newTrailers.map((trailer) => (
            <SidebarTrailerCard
              key={trailer.id}
              imageUrl={trailer.imageUrl}
              title={trailer.title}
              subtitle={trailer.subtitle}
              onClick={() => navigate('video-lesson')}
            />
          ))}
        </div>
      </SidebarWidget>

      {/* Continue Watching Widget */}
      <SidebarWidget
        title="Continue Assistindo"
        action={{ label: 'Ver tudo', onClick: () => navigate('library') }}
      >
        <div className="space-y-1">
          {continueWatching.slice(0, 4).map((item) => (
            <SidebarListItem
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              subtitle={`${item.progress}% concluído`}
              onClick={() => navigate('video-lesson')}
              rightContent={
                <div className="w-8 h-8 rounded-full bg-[var(--glass-surface-3)] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-[var(--text-tertiary)] ml-0.5" />
                </div>
              }
            />
          ))}
        </div>
      </SidebarWidget>

      {/* Quick Stats */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-[var(--radius-xl)]"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
          Seu progresso
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-tertiary)] text-xs">Módulos completos</span>
              <span className="text-[var(--text-primary)] text-xs font-semibold">3 de 8</span>
            </div>
            <div className="h-2 bg-[var(--glass-surface-3)] rounded-full overflow-hidden">
              <div className="h-full w-[37.5%] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-tertiary)] text-xs">Tempo esta semana</span>
              <span className="text-[var(--text-primary)] text-xs font-semibold">4h 30min</span>
            </div>
            <div className="h-2 bg-[var(--glass-surface-3)] rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-[var(--accent-purchase)] to-[var(--accent-premium)] rounded-full" />
            </div>
          </div>
        </div>
      </GlassSurface>

      {/* Upgrade Banner */}
      <GlassSurface
        variant="surface-3"
        blur="heavy"
        glow
        glowColor="var(--accent-purchase)"
        className="p-5 rounded-[var(--radius-xl)] text-center"
      >
        <div className="w-12 h-12 rounded-full bg-[var(--accent-purchase-soft)] border border-[var(--accent-purchase-border)] flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 text-[var(--accent-purchase)]" />
        </div>
        <h3 className="text-[var(--text-primary)] text-base font-bold mb-2">
          Acesso Premium
        </h3>
        <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-4">
          Desbloqueie todos os módulos e ferramentas exclusivas
        </p>
        <Button variant="purchase" size="md" fullWidth onClick={() => navigate('store')}>
          Fazer upgrade
        </Button>
      </GlassSurface>
    </div>
  );

  return (
    <VeloxLayout rightSidebar={renderRightSidebar()}>
      <div className="px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        {/* Welcome Message - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mb-6"
        >
          <p className="text-[var(--text-muted)] text-sm">Bem-vindo de volta,</p>
          <h1 className="text-[var(--text-primary)] text-2xl font-bold mt-1">
            Ana Carolina
          </h1>
        </motion.div>

        {/* Hero Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <HeroCarousel
            slides={heroSlides}
            onWatchClick={() => navigate('video-lesson')}
            onDownloadClick={() => {}}
          />
        </motion.section>

        {/* Stats - Desktop */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block mb-8"
        >
          <StatsWidget stats={userStats} layout="grid" />
        </motion.section>

        {/* Stats - Mobile (horizontal scroll) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:hidden mb-8"
        >
          <StatsWidget stats={userStats} layout="horizontal" />
        </motion.section>

        {/* Chip Tabs Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <ChipTabs tabs={filters} activeTab={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        {/* Continue Watching - Mobile Only */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:hidden mb-8"
        >
          <SectionHeader
            title="Continue assistindo"
            action={{ label: 'Ver tudo', onClick: () => navigate('library') }}
          />
          <div className="space-y-2">
            {continueWatching.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
              >
                <ContentCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  progress={item.progress}
                  variant="compact"
                  onClick={() => navigate('video-lesson')}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* You Might Like - Featured Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <SectionHeader
            title="Recomendados para você"
            action={{ label: 'Ver tudo', onClick: () => navigate('explore') }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {featured.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <ContentCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  badge={item.badge}
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
        </motion.section>

        {/* Featured Wide Cards - Desktop */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden lg:block mb-8"
        >
          <SectionHeader
            title="Cursos em destaque"
            action={{ label: 'Ver catálogo', onClick: () => navigate('explore') }}
          />
          <div className="grid grid-cols-2 gap-4">
            {featured.slice(0, 2).map((item, index) => (
              <motion.div
                key={`wide-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <ContentCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle="Aprenda as melhores técnicas para economizar em suas viagens internacionais."
                  category={item.category}
                  duration={item.duration}
                  badge={item.badge}
                  variant="wide"
                  onClick={() => navigate('video-lesson')}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Reads */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <SectionHeader
            title="Leituras rápidas"
            action={{ label: 'Ver artigos', onClick: () => navigate('explore') }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: '1',
                title: '10 Erros que Fazem Você Pagar Mais nas Passagens',
                preview: 'Descubra os erros mais comuns que fazem você perder oportunidades de economizar.',
              },
              {
                id: '2',
                title: 'Como Usar o Modo Anônimo Para Preços Melhores',
                preview: 'Técnica comprovada para evitar que sites aumentem os preços.',
              },
            ].map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.05 }}
              >
                <GlassSurface
                  variant="surface-1"
                  blur="light"
                  className="p-5 rounded-[var(--radius-xl)] cursor-pointer hover:bg-[var(--glass-surface-hover)] transition-colors"
                  onClick={() => navigate('article-reader')}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-secondary-soft)] border border-[var(--accent-secondary-border)] flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-[var(--accent-secondary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[var(--text-primary)] text-sm font-semibold leading-snug mb-1">
                        {article.title}
                      </h4>
                      <p className="text-[var(--text-tertiary)] text-xs leading-relaxed line-clamp-2">
                        {article.preview}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[var(--accent-primary)] text-xs font-medium mt-3 hover:underline">
                        Ler artigo
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </VeloxLayout>
  );
}

