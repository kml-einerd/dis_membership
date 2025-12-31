import { useState } from 'react';
import { Bell, Search, Play, Plane } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { NetflixStylePoster } from '../components/NetflixStylePoster';
import { ContinueWatchingItem } from '../components/ContinueWatchingItem';
import { ChipTabs } from '../components/ChipTabs';
import { useNavigation } from '../navigation/NavigationContext';

export default function Home() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Tudo');

  const filters = ['Tudo', 'Iniciante', 'Ferramentas', 'Dicas', 'Favoritos'];

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
      type: 'video' as const,
      courseData: {
        title: 'Guia Completo: Passagens Baratas para Europa',
        instructor: 'Carlos Vieira',
        category: 'Destinos',
        thumbnail: 'https://images.unsplash.com/photo-1758797316117-8d133af25f8c?w=800',
        totalLessons: 24,
        totalDuration: '6h 30min',
        description: 'Aprenda todas as técnicas e estratégias que uso para encontrar passagens aéreas para Europa por menos de R$ 1.500. Do básico ao avançado, com métodos comprovados.',
      },
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Destinos Econômicos 2025',
      subtitle: 'Lista atualizada',
      type: 'video' as const,
      courseData: {
        title: 'Destinos Econômicos: Caribe e América do Sul',
        instructor: 'Maria Santos',
        category: 'Dicas',
        thumbnail: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=800',
        totalLessons: 18,
        totalDuration: '4h 15min',
        description: 'Descubra os destinos mais baratos e bonitos para 2025, com dicas de hospedagem, alimentação e passeios econômicos.',
      },
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Europa com Orçamento Limitado',
      subtitle: 'Premium',
      type: 'video' as const,
      locked: true,
      courseData: {
        title: 'Roteiro Europa Econômico',
        instructor: 'João Ferreira',
        category: 'Premium',
        thumbnail: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=800',
        totalLessons: 30,
        totalDuration: '8h 00min',
        description: 'Roteiro completo para conhecer 10 países europeus gastando menos de R$ 5.000. Inclui técnicas de acomodação barata e transporte econômico.',
      },
    },
  ];

  const offers = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      title: 'Extensão: Rastreador de Preços',
      subtitle: 'Alertas automáticos',
      isOffer: true,
      discount: 'Grátis',
      type: 'video' as const,
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      title: 'Pack: Todas as Ferramentas',
      subtitle: 'Oferta especial',
      isOffer: true,
      discount: '-50%',
      type: 'video' as const,
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
    <div className="min-h-screen bg-[var(--app-bg)] pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-4">
        <div>
          <p className="text-[var(--app-text-muted)] text-xs mb-0.5">Olá,</p>
          <h1 className="text-[var(--app-text-primary)] text-xl font-medium">Viajante</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('explore')}
            className="w-9 h-9 rounded-full bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] transition-colors flex items-center justify-center"
          >
            <Search className="w-4 h-4 text-[var(--app-text-tertiary)]" />
          </button>
          <button className="relative w-9 h-9 rounded-full bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] transition-colors flex items-center justify-center">
            <Bell className="w-4 h-4 text-[var(--app-text-tertiary)]" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--app-accent)] rounded-full" />
          </button>
          <button 
            onClick={() => navigate('profile')}
            className="w-9 h-9 rounded-full overflow-hidden border border-[var(--app-border)]"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=100"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative px-6 mb-4">
        <div className="relative h-56 rounded-[var(--app-radius-xl)] overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=800"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--app-accent)]/90 rounded-md mb-2">
              <Plane className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Novo</span>
            </div>
            <h2 className="text-white text-xl font-medium leading-tight mb-2">
              Passagens para Europa a partir de R$ 1.500
            </h2>
            <p className="text-white/70 text-sm leading-snug mb-3 line-clamp-2">
              Aprenda as estratégias que uso para encontrar voos internacionais baratos
            </p>
            <button
              onClick={() => navigate('video-lesson')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-white/90 rounded-xl text-[var(--app-bg)] text-sm font-medium transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Assistir agora</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chip Tabs */}
      <div className="mb-4">
        <ChipTabs tabs={filters} activeTab={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Continue Watching */}
      <div className="px-6 mb-6">
        <h2 className="text-[var(--app-text-primary)] text-base font-medium mb-3">
          Continue assistindo
        </h2>
        <div className="space-y-2">
          {continueWatching.map((item) => (
            <ContinueWatchingItem
              key={item.id}
              {...item}
              onClick={() => navigate('video-lesson')}
            />
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="mb-6">
        <h2 className="text-[var(--app-text-primary)] text-base font-medium mb-3 px-6">
          Treinamentos em destaque
        </h2>
        <div className="flex gap-3 px-6 overflow-x-auto scrollbar-hide">
          {featured.map((item) => (
            <div key={item.id} className="w-36 flex-shrink-0">
              <NetflixStylePoster
                {...item}
                onClick={() => {
                  if (item.locked) {
                    navigate('locked-preview');
                  } else {
                    navigate('course-detail', { course: item.courseData });
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Extensions/Tools */}
      <div className="mb-6">
        <h2 className="text-[var(--app-text-primary)] text-base font-medium mb-3 px-6">
          Extensões e ferramentas
        </h2>
        <div className="flex gap-3 px-6 overflow-x-auto scrollbar-hide">
          {offers.map((item) => (
            <div key={item.id} className="w-36 flex-shrink-0">
              <NetflixStylePoster
                {...item}
                onClick={() => navigate('store')}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="px-6">
        <h2 className="text-[var(--app-text-primary)] text-base font-medium mb-3">
          Dicas essenciais
        </h2>
        <div className="space-y-3">
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => navigate('article-reader')}
              className="w-full text-left p-4 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] transition-all"
            >
              <h3 className="text-[var(--app-text-primary)] text-sm font-medium leading-snug mb-2">
                {article.title}
              </h3>
              <p className="text-[var(--app-text-tertiary)] text-xs leading-relaxed mb-2 line-clamp-2">
                {article.preview}
              </p>
              <span className="text-[var(--app-accent)] text-xs font-medium">
                Ler mais →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}