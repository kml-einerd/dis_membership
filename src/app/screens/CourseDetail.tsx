import { ArrowLeft, Play, FileText, ShoppingBag, Clock, BookOpen, Search } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigation } from '../navigation/NavigationContext';

interface ContentItem {
  id: string;
  title: string;
  instructor?: string;
  duration: string;
  type: 'video' | 'article' | 'extension';
  thumbnail?: string;
  locked?: boolean;
  completed?: boolean;
}

export default function CourseDetail() {
  const { navigate, goBack, params } = useNavigation();
  const [activeModule, setActiveModule] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Get course data from params or use default
  const courseData = params?.course || {
    title: 'Guia Completo: Passagens Baratas para Europa',
    instructor: 'Carlos Vieira',
    category: 'Destinos',
    thumbnail: 'https://images.unsplash.com/photo-1758797316117-8d133af25f8c?w=800',
    totalLessons: 24,
    totalDuration: '6h 30min',
    description: 'Aprenda todas as técnicas e estratégias que uso para encontrar passagens aéreas para Europa por menos de R$ 1.500. Do básico ao avançado, com métodos comprovados.',
  };

  const modules = ['Todos', 'Fundamentos', 'Técnicas', 'Ferramentas', 'Bônus'];

  // Content based on active module
  const allContent: ContentItem[] = [
    {
      id: '1',
      title: 'Introdução: Por que você paga caro em passagens',
      instructor: 'Carlos Vieira',
      duration: '12 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
      completed: true,
    },
    {
      id: '2',
      title: 'Os 10 melhores sites para comparar preços',
      instructor: 'Carlos Vieira',
      duration: '18 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      completed: true,
    },
    {
      id: '3',
      title: 'Quando comprar: o timing perfeito',
      instructor: 'Carlos Vieira',
      duration: '22 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
    },
    {
      id: '4',
      title: 'Checklist completo antes de comprar',
      duration: '8 min leitura',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
    },
    {
      id: '5',
      title: 'Ferramenta: Rastreador de Preços Automático',
      duration: 'Grátis',
      type: 'extension',
      thumbnail: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
    },
    {
      id: '6',
      title: 'Técnicas avançadas: Voos com conexões',
      instructor: 'Carlos Vieira',
      duration: '28 min',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      locked: true,
    },
    {
      id: '7',
      title: 'Como usar milhas e pontos para maximizar economia',
      duration: '15 min leitura',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      locked: true,
    },
    {
      id: '8',
      title: 'Pack Premium: Todas as Ferramentas',
      duration: 'R$ 47',
      type: 'extension',
      thumbnail: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
      locked: true,
    },
  ];

  const filteredContent = allContent.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeModule === 'Todos') return matchesSearch;
    // Simple filter logic - you can enhance this
    return matchesSearch;
  });

  const handleContentClick = (item: ContentItem) => {
    if (item.locked) {
      navigate('locked-preview');
      return;
    }

    switch (item.type) {
      case 'video':
        navigate('video-lesson', { lesson: item });
        break;
      case 'article':
        navigate('article-reader', { article: item });
        break;
      case 'extension':
        navigate('store');
        break;
    }
  };

  const getIconForType = (type: ContentItem['type']) => {
    switch (type) {
      case 'video':
        return Play;
      case 'article':
        return FileText;
      case 'extension':
        return ShoppingBag;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-24">
      {/* Hero Section */}
      <div className="relative h-80">
        <ImageWithFallback
          src={courseData.thumbnail}
          alt={courseData.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)] via-[var(--app-bg)]/60 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={goBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center justify-center z-10"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Course info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="inline-flex items-center px-3 py-1 bg-[var(--app-accent)]/90 rounded-lg mb-3">
            <span className="text-white text-xs font-medium">{courseData.category}</span>
          </div>
          
          <h1 className="text-white text-2xl font-medium leading-tight mb-2">
            {courseData.title}
          </h1>
          
          <p className="text-white/80 text-sm mb-3">
            com {courseData.instructor}
          </p>
          
          <div className="flex items-center gap-3 text-white/70 text-sm">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{courseData.totalLessons} aulas</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{courseData.totalDuration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className="text-[var(--app-text-tertiary)] text-sm leading-relaxed">
          {courseData.description}
        </p>
      </div>

      {/* Module Tabs */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {modules.map((module) => (
            <button
              key={module}
              onClick={() => setActiveModule(module)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeModule === module
                  ? 'bg-[var(--app-accent)] text-white'
                  : 'bg-[var(--app-surface-hover)] text-[var(--app-text-tertiary)] hover:bg-[var(--app-surface)] border border-[var(--app-border-subtle)]'
              }`}
            >
              {module}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--app-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar aulas, artigos..."
            className="w-full pl-11 pr-4 py-3 bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[var(--app-accent)]/50 transition-colors"
          />
        </div>
      </div>

      {/* Content List */}
      <div className="px-6 space-y-3">
        {filteredContent.map((item) => {
          const Icon = getIconForType(item.type);
          
          return (
            <button
              key={item.id}
              onClick={() => handleContentClick(item)}
              className="w-full flex items-center gap-3 p-3 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] transition-all text-left group"
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden bg-black">
                {item.thumbnail ? (
                  <ImageWithFallback
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--app-surface)]">
                    <Icon className="w-6 h-6 text-[var(--app-text-muted)]" />
                  </div>
                )}
                
                {/* Type badge */}
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-md bg-black/80 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-3 h-3 text-white" />
                </div>

                {/* Completed checkmark */}
                {item.completed && (
                  <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[var(--app-accent)] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content info */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-medium leading-snug mb-1 line-clamp-2 ${
                  item.locked ? 'text-[var(--app-text-muted)]' : 'text-[var(--app-text-primary)]'
                }`}>
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)]">
                  {item.instructor && <span>{item.instructor}</span>}
                  {item.instructor && <span>•</span>}
                  <span>{item.duration}</span>
                  {item.locked && (
                    <>
                      <span>•</span>
                      <span className="text-[var(--app-accent)]">Premium</span>
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
