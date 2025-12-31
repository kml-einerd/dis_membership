import { useState } from 'react';
import { Bell, Search, Play, Sparkles } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import {
  ChipTabs,
  PosterCard,
  ContinueWatchingCard,
  ArticleCard,
  SectionHeader,
  Button,
  IconButton,
  Badge,
} from '../../components/design-system';
import { GlassSurface } from '../../components/design-system/GlassSurface';

export default function HomeV4() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Tudo');

  const filters = ['Tudo', 'Comece aqui', 'Módulos', 'Artigos', 'Favoritos'];

  // Mock data
  const continueWatching = [
    {
      id: '1',
      thumbnailUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Como usar alertas de preço',
      progress: 67,
      duration: '8 min restantes',
    },
    {
      id: '2',
      thumbnailUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
      title: 'Melhor dia para comprar passagens',
      progress: 34,
      duration: '15 min restantes',
    },
  ];

  const featured = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      title: 'Guia Completo de Passagens Baratas',
      subtitle: '12 aulas práticas',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Destinos Econômicos 2025',
      subtitle: 'Lista atualizada',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Europa com Orçamento Limitado',
      subtitle: 'Premium',
      locked: true,
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      title: 'Praias Paradisíacas Acessíveis',
      subtitle: '8 destinos',
    },
  ];

  const offers = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Extensão: Rastreador de Preços',
      subtitle: 'Alertas automáticos',
      discount: 'Grátis',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      title: 'Pack: Todas as Ferramentas',
      subtitle: 'Oferta especial',
      discount: '-50%',
    },
  ];

  const articles = [
    {
      id: '1',
      title: '10 Erros que Fazem Você Pagar Mais nas Passagens',
      preview: 'Descubra os erros mais comuns que fazem você perder oportunidades de economizar centenas de reais em suas viagens.',
    },
    {
      id: '2',
      title: 'Como Usar o Modo Anônimo Para Encontrar Preços Melhores',
      preview: 'Técnica comprovada para evitar que sites aumentem os preços baseados no seu histórico de busca.',
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[var(--text-muted)] text-xs mb-0.5">Olá,</p>
            <h1 className="text-[var(--text-primary)] text-xl font-semibold">
              {'{{contact.first_name}}'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <IconButton onClick={() => navigate('explore')} size="md">
              <Search className="w-4.5 h-4.5 text-[var(--text-tertiary)]" />
            </IconButton>
            <IconButton size="md" className="relative">
              <Bell className="w-4.5 h-4.5 text-[var(--text-tertiary)]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent-primary)] rounded-full" />
            </IconButton>
            <button
              onClick={() => navigate('profile')}
              className="w-10 h-10 rounded-full overflow-hidden border border-[var(--glass-border)]"
            >
              <img
                src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=100"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="px-6 mb-6">
        <div className="relative h-64 rounded-[var(--radius-xl)] overflow-hidden">
          {/* Hero image */}
          <img
            src="https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=800"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Unified vignette overlay - desaturate and reduce contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)] via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6">
            <Badge variant="primary" icon={<Sparkles className="w-3 h-3" />} className="self-start mb-3">
              Novo conteúdo
            </Badge>

            <h2 className="text-white text-2xl font-bold leading-tight mb-2 max-w-[280px]">
              Passagens para Europa a partir de R$ 1.500
            </h2>

            <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2 max-w-[300px]">
              Aprenda as estratégias que uso para encontrar voos internacionais baratos
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('video-lesson')}
              >
                <Play className="w-4 h-4" />
                Continuar
              </Button>
            </div>

            {/* Progress bar integrated */}
            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden max-w-[280px]">
              <div className="h-full bg-[var(--accent-primary)] w-[35%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Chip Tabs */}
      <div className="mb-6">
        <ChipTabs tabs={filters} activeTab={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Continue Watching - Compact & Elegant */}
      <section className="px-6 mb-8">
        <SectionHeader title="Continue assistindo" />
        <div className="space-y-2">
          {continueWatching.map((item) => (
            <ContinueWatchingCard
              key={item.id}
              {...item}
              onClick={() => navigate('video-lesson')}
            />
          ))}
        </div>
      </section>

      {/* Featured - Netflix-style Vertical Posters */}
      <section className="mb-8">
        <SectionHeader title="Em destaque" className="px-6" />
        <div className="flex gap-3 px-6 overflow-x-auto scrollbar-hide">
          {featured.map((item) => (
            <div key={item.id} className="w-36 flex-shrink-0">
              <PosterCard
                {...item}
                onClick={() => {
                  if (item.locked) {
                    navigate('locked-preview');
                  } else {
                    navigate('video-lesson');
                  }
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Offers - Embedded with Velox-grade highlighting */}
      <section className="mb-8">
        <SectionHeader title="Ofertas especiais" className="px-6" />
        <div className="flex gap-3 px-6 overflow-x-auto scrollbar-hide">
          {offers.map((item) => (
            <div key={item.id} className="w-36 flex-shrink-0">
              <GlassSurface
                variant="surface-2"
                blur="medium"
                glow
                glowColor="var(--accent-primary)"
                className="rounded-[var(--radius-lg)] overflow-hidden"
              >
                <PosterCard
                  {...item}
                  onClick={() => navigate('store')}
                  className="border-0"
                />
              </GlassSurface>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Reads - Mixed text-first articles */}
      <section className="px-6">
        <SectionHeader title="Leituras rápidas" />
        <div className="space-y-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              onClick={() => navigate('article-reader')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
