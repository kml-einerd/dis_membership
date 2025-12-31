import { Search, TrendingUp, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { NetflixStylePoster } from '../components/NetflixStylePoster';
import { useNavigation } from '../navigation/NavigationContext';

export default function Explore() {
  const { navigate, goBack, canGoBack } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const trending = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Caribe Barato',
      subtitle: 'Tendência #1',
      type: 'video' as const,
      courseData: {
        title: 'Guia Definitivo: Caribe Econômico',
        instructor: 'Marina Costa',
        category: 'Destinos',
        thumbnail: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=800',
        totalLessons: 15,
        totalDuration: '4h 00min',
        description: 'Descubra os segredos para viajar pelo Caribe gastando pouco, incluindo ilhas escondidas e períodos de baixa temporada.',
      },
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
      title: 'Europa Low Cost',
      subtitle: 'Tendência #2',
      type: 'video' as const,
      courseData: {
        title: 'Europa Low Cost: 20 Cidades Baratas',
        instructor: 'Pedro Alves',
        category: 'Destinos',
        thumbnail: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=800',
        totalLessons: 20,
        totalDuration: '5h 30min',
        description: 'Conheça 20 cidades europeias lindas e econômicas, com dicas práticas de transporte, hospedagem e alimentação.',
      },
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      title: 'Ásia Econômica',
      subtitle: 'Tendência #3',
      type: 'video' as const,
      courseData: {
        title: 'Ásia para Mochileiros: Guia Completo',
        instructor: 'Lucas Yamamoto',
        category: 'Aventura',
        thumbnail: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=800',
        totalLessons: 18,
        totalDuration: '6h 00min',
        description: 'Da Tailândia ao Japão: como viajar pela Ásia com orçamento de mochileiro, hospedagens baratas e comida local.',
      },
    },
  ];

  const categories = [
    { id: '1', name: 'Destinos Nacionais', count: 28 },
    { id: '2', name: 'América do Sul', count: 22 },
    { id: '3', name: 'Europa', count: 35 },
    { id: '4', name: 'Técnicas Avançadas', count: 18 },
  ];

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
            Explorar
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--app-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar destinos, técnicas..."
            className="w-full pl-11 pr-4 py-3 bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[var(--app-accent)]/50 transition-colors"
          />
        </div>
      </div>

      {/* Trending */}
      <div className="mb-6">
        <div className="flex items-center gap-2 px-6 mb-3">
          <TrendingUp className="w-4 h-4 text-[var(--app-accent)]" />
          <h2 className="text-[var(--app-text-primary)] text-base font-medium">
            Em alta agora
          </h2>
        </div>
        <div className="flex gap-3 px-6 overflow-x-auto scrollbar-hide">
          {trending.map((item) => (
            <div key={item.id} className="w-36 flex-shrink-0">
              <NetflixStylePoster
                {...item}
                onClick={() => navigate('course-detail', { course: item.courseData })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-6">
        <h2 className="text-[var(--app-text-primary)] text-base font-medium mb-3">
          Categorias
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate('library')}
              className="p-4 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] transition-all text-left"
            >
              <h3 className="text-[var(--app-text-primary)] text-sm font-medium mb-1">
                {category.name}
              </h3>
              <p className="text-[var(--app-text-muted)] text-xs">
                {category.count} guias
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}