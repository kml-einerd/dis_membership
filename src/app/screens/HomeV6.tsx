import { useState, useMemo } from 'react';
import { Play, Clock, BookOpen, ChevronRight, CheckCircle2, MessageCircle, Crown, Zap } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import {
  ChipTabs,
  ContentCard,
  SectionHeader,
  Button,
  GlassSurface,
  HeroCarousel,
  SidebarWidget,
  SidebarTrailerCard,
  NetflixCarousel,
  ResumeBar,
  VIPLockCard,
  FlashOfferCard,
  ComboBundleCard,
  DiscountTagCard,
  BlurTeaserCard,
  UnlockCTACard,
  SocialProofCard,
  CountdownWidget,
} from '../../components/design-system';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// TIPOS E INTERFACES
// ==========================================
interface Course {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  badge?: string;
  locked?: boolean;
  category: string;
}

interface CategoryRow {
  id: string;
  title: string;
  category: string;
  courses: Course[];
  salesElement?: {
    type: 'vip-lock' | 'flash-offer' | 'combo-bundle' | 'discount-tag' | 'blur-teaser' | 'unlock-cta' | 'social-proof';
    position: number; // posição na fileira onde inserir
    data: any;
  };
}

export default function HomeV6() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Todos');

  // ==========================================
  // CATEGORIAS - Filtros de navegação
  // ==========================================
  const categories = [
    'Todos',
    'Fundamentos',
    'Destinos',
    'Milhas e Pontos',
    'Técnicas Avançadas',
  ];

  // ==========================================
  // DADOS DO HERO BANNER
  // ==========================================
  const heroSlides = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=1600',
      title: 'Estratégia do Mês',
      subtitle: '🔴 AO VIVO HOJE ÀS 20H',
      description: 'O Guia Definitivo das Emissões com João Marcos',
      tags: ['Ao Vivo', 'Exclusivo'],
      badge: 'AO VIVO',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600',
      title: 'Novo Módulo: Caribe',
      subtitle: '🆕 LANÇAMENTO',
      description: 'Descubra praias paradisíacas por menos de R$ 2.000',
      tags: ['Caribe', 'Praias'],
      badge: 'NOVO',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=1600',
      title: 'Europa 2025',
      subtitle: 'GUIA COMPLETO',
      description: 'Roteiros otimizados para 15 países europeus',
      tags: ['Europa', 'Roteiro'],
      badge: 'POPULAR',
    },
  ];

  // ==========================================
  // CONTINUAR ASSISTINDO - Sem destaque excessivo
  // ==========================================
  const continueWatching = {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
    title: 'ALIA 04 - O Segredo das Emissões Tabela Fixa',
    subtitle: 'Aula 3 de 8 • Módulo Avançado',
    progress: 50,
    timeRemaining: '12 min restantes',
  };

  // ==========================================
  // FILEIRAS DE CURSOS POR CATEGORIA
  // ==========================================
  const categoryRows: CategoryRow[] = [
    // CATEGORIA: FUNDAMENTOS
    {
      id: 'fundamentos',
      title: 'Fundamentos',
      category: 'Fundamentos',
      courses: [
        {
          id: 'f1',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          title: 'Método Completo: Passagens 70% Mais Baratas',
          subtitle: '32 aulas • 8h 45min',
          badge: 'Bestseller',
          category: 'Fundamentos',
        },
        {
          id: 'f2',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          title: 'Primeiros Passos: Economia em Viagens',
          subtitle: '18 aulas • 4h 20min',
          badge: 'Iniciante',
          category: 'Fundamentos',
        },
        {
          id: 'f3',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          title: 'Como Planejar Sua Primeira Viagem',
          subtitle: '15 aulas • 3h 45min',
          category: 'Fundamentos',
        },
        {
          id: 'f4',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          title: 'Alertas de Preço: Guia Completo',
          subtitle: '12 aulas • 2h 30min',
          category: 'Fundamentos',
        },
        {
          id: 'f5',
          imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
          title: 'Ferramentas Essenciais do Viajante',
          subtitle: '20 aulas • 5h',
          badge: 'Popular',
          category: 'Fundamentos',
        },
      ],
      salesElement: {
        type: 'vip-lock',
        position: 2,
        data: {
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
          title: 'Masterclass: Segredos dos Experts',
          subtitle: '40 aulas • 12h',
        },
      },
    },
    // CATEGORIA: DESTINOS
    {
      id: 'destinos',
      title: 'Destinos',
      category: 'Destinos',
      courses: [
        {
          id: 'd1',
          imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
          title: 'Nova York Econômica',
          subtitle: '22 aulas • 6h 15min',
          category: 'Destinos',
        },
        {
          id: 'd2',
          imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
          title: 'Paris com R$ 200/Dia',
          subtitle: '20 aulas • 5h 50min',
          badge: 'Atualizado',
          category: 'Destinos',
        },
        {
          id: 'd3',
          imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
          title: 'Tailândia Completa',
          subtitle: '24 aulas • 7h 20min',
          badge: 'TOP 5',
          category: 'Destinos',
        },
        {
          id: 'd4',
          imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
          title: 'Japão: Cerejeiras e Templos',
          subtitle: '30 aulas • 8h 30min',
          category: 'Destinos',
        },
        {
          id: 'd5',
          imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
          title: 'Dubai Luxuosa por R$ 180/Dia',
          subtitle: '16 aulas • 4h 45min',
          category: 'Destinos',
        },
      ],
      salesElement: {
        type: 'flash-offer',
        position: 3,
        data: {
          title: '🔥 Oferta Relâmpago: Pacote Europa + Ásia',
          subtitle: '2 cursos completos pelo preço de 1',
          originalPrice: 'R$ 997',
          discountedPrice: 'R$ 497',
        },
      },
    },
    // CATEGORIA: MILHAS E PONTOS
    {
      id: 'milhas',
      title: 'Milhas e Pontos',
      category: 'Milhas e Pontos',
      courses: [
        {
          id: 'm1',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          title: 'Milhas do Zero ao Avançado',
          subtitle: '36 aulas • 10h 40min',
          badge: 'Mais Vendido',
          category: 'Milhas e Pontos',
        },
        {
          id: 'm2',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          title: 'Cartões de Crédito para Milhas',
          subtitle: '18 aulas • 4h 30min',
          category: 'Milhas e Pontos',
        },
        {
          id: 'm3',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          title: 'Transferências Bonificadas',
          subtitle: '12 aulas • 3h',
          badge: 'Novo',
          category: 'Milhas e Pontos',
        },
        {
          id: 'm4',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          title: 'Resgate Inteligente de Passagens',
          subtitle: '15 aulas • 4h',
          category: 'Milhas e Pontos',
        },
      ],
      salesElement: {
        type: 'combo-bundle',
        position: 2,
        data: {
          courseImages: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          ],
          title: 'Combo Milhas PRO: 2 Cursos',
          coursesIncluded: ['Milhas do Zero ao Avançado', 'Erros de Tarifa Masterclass'],
          originalPrice: 'R$ 997',
          discountedPrice: 'R$ 497',
          savings: 'Economize R$ 500',
        },
      },
    },
    // CATEGORIA: TÉCNICAS AVANÇADAS
    {
      id: 'tecnicas',
      title: 'Técnicas Avançadas',
      category: 'Técnicas Avançadas',
      courses: [
        {
          id: 't1',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          title: 'Stopover Estratégico',
          subtitle: '12 aulas • 3h 30min',
          category: 'Técnicas Avançadas',
        },
        {
          id: 't2',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          title: 'Ferramentas de Busca Avançadas',
          subtitle: '15 aulas • 4h',
          category: 'Técnicas Avançadas',
        },
        {
          id: 't3',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          title: 'Erros de Tarifa: Como Encontrar',
          subtitle: '18 aulas • 5h',
          badge: 'Avançado',
          category: 'Técnicas Avançadas',
        },
        {
          id: 't4',
          imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
          title: 'Voos com Múltiplas Paradas',
          subtitle: '10 aulas • 2h 30min',
          category: 'Técnicas Avançadas',
        },
      ],
      salesElement: {
        type: 'discount-tag',
        position: 2,
        data: {
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          title: 'Erros de Tarifa Masterclass',
          subtitle: '25 aulas • 7h',
          discount: '-40% OFF',
          originalPrice: 'R$ 497',
          discountedPrice: 'R$ 297',
        },
      },
    },
  ];

  // ==========================================
  // FILTRAGEM POR CATEGORIA
  // ==========================================
  const filteredRows = useMemo(() => {
    if (activeFilter === 'Todos') {
      return categoryRows;
    }
    return categoryRows.filter(row => row.category === activeFilter);
  }, [activeFilter]);

  // ==========================================
  // TIMERS
  // ==========================================
  const countdownEndTime = new Date(Date.now() + (2 * 24 * 60 * 60 * 1000) + (4 * 60 * 60 * 1000) + (57 * 60 * 1000));
  const flashOfferEndTime = new Date(Date.now() + (2 * 60 * 60 * 1000) + (14 * 60 * 1000) + (55 * 1000));

  // ==========================================
  // SIDEBAR DATA
  // ==========================================
  const newTrailers = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400', title: 'Ásia Econômica', subtitle: 'Novo módulo' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400', title: 'Caribe Low Cost', subtitle: 'Em destaque' },
  ];

  // ==========================================
  // RENDER: Elemento de vendas por tipo
  // ==========================================
  const renderSalesElement = (salesElement: CategoryRow['salesElement']) => {
    if (!salesElement) return null;

    switch (salesElement.type) {
      case 'vip-lock':
        return (
          <div className="flex-shrink-0 w-[140px] sm:w-[160px] lg:w-[180px]">
            <VIPLockCard
              imageUrl={salesElement.data.imageUrl}
              title={salesElement.data.title}
              subtitle={salesElement.data.subtitle}
              onClick={() => navigate('locked-preview')}
            />
          </div>
        );
      case 'flash-offer':
        return (
          <div className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]">
            <FlashOfferCard
              title={salesElement.data.title}
              subtitle={salesElement.data.subtitle}
              originalPrice={salesElement.data.originalPrice}
              discountedPrice={salesElement.data.discountedPrice}
              endTime={flashOfferEndTime}
              onClick={() => navigate('store')}
            />
          </div>
        );
      case 'combo-bundle':
        return (
          <div className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[320px]">
            <ComboBundleCard
              courseImages={salesElement.data.courseImages}
              title={salesElement.data.title}
              coursesIncluded={salesElement.data.coursesIncluded}
              originalPrice={salesElement.data.originalPrice}
              discountedPrice={salesElement.data.discountedPrice}
              savings={salesElement.data.savings}
              onClick={() => navigate('store')}
            />
          </div>
        );
      case 'discount-tag':
        return (
          <div className="flex-shrink-0 w-[140px] sm:w-[160px] lg:w-[180px]">
            <DiscountTagCard
              imageUrl={salesElement.data.imageUrl}
              title={salesElement.data.title}
              subtitle={salesElement.data.subtitle}
              discount={salesElement.data.discount}
              originalPrice={salesElement.data.originalPrice}
              discountedPrice={salesElement.data.discountedPrice}
              onClick={() => navigate('store')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  // ==========================================
  // RENDER: Fileira de cursos com elemento de vendas intercalado
  // ==========================================
  const renderCategoryRow = (row: CategoryRow, index: number) => {
    const coursesWithSales: JSX.Element[] = [];
    
    row.courses.forEach((course, courseIndex) => {
      // Inserir elemento de vendas na posição correta
      if (row.salesElement && courseIndex === row.salesElement.position) {
        coursesWithSales.push(
          <div key={`sales-${row.id}`}>
            {renderSalesElement(row.salesElement)}
          </div>
        );
      }
      
      // Adicionar curso
      coursesWithSales.push(
        <div key={course.id} className="flex-shrink-0 w-[140px] sm:w-[160px] lg:w-[180px]">
          <ContentCard
            imageUrl={course.imageUrl}
            title={course.title}
            subtitle={course.subtitle}
            badge={course.badge}
            locked={course.locked}
            onClick={() => navigate('course-detail')}
          />
        </div>
      );
    });

    // Se o elemento de vendas deve ir no final
    if (row.salesElement && row.salesElement.position >= row.courses.length) {
      coursesWithSales.push(
        <div key={`sales-${row.id}`}>
          {renderSalesElement(row.salesElement)}
        </div>
      );
    }

    return (
      <motion.section
        key={row.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.1 + index * 0.08 }}
        className="mb-8"
      >
        <NetflixCarousel title={row.title}>
          {coursesWithSales}
        </NetflixCarousel>
      </motion.section>
    );
  };

  // ==========================================
  // SIDEBAR
  // ==========================================
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* Novidades Widget */}
      <SidebarWidget title="Novidades" sortable sortLabel="Hoje" onSortChange={() => {}}>
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

      {/* Seu Progresso Widget */}
      <GlassSurface variant="surface-2" blur="medium" className="p-5 rounded-[var(--radius-xl)]">
        <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">Seu progresso</h3>
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
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-tertiary)] text-xs">Próxima conquista</span>
              <span className="text-[var(--accent-primary)] text-xs font-semibold">85%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-[var(--glass-surface-3)] rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" />
              </div>
              <Crown className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-[var(--text-muted)] text-[10px] mt-1">Viajante Bronze</p>
          </div>
        </div>
      </GlassSurface>

      {/* Countdown Widget - Premium Upsell */}
      <CountdownWidget
        endTime={countdownEndTime}
        originalPrice="R$ 997"
        discountedPrice="R$ 397"
        onUpgrade={() => navigate('store')}
      />

      {/* Social Proof Widget */}
      <GlassSurface variant="surface-2" blur="medium" className="p-5 rounded-[var(--radius-xl)]">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex -space-x-2">
            {['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2', 'https://i.pravatar.cc/150?img=3'].map((img, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--app-bg)] overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex-1">
            <p className="text-[var(--text-primary)] text-xs font-bold">+2.847 alunos</p>
            <p className="text-[var(--text-muted)] text-[10px]">entraram esta semana</p>
          </div>
        </div>
        <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-4 italic">
          "Economizei R$ 3.200 na minha última viagem usando o que aprendi aqui"
        </p>
        <Button variant="primary" size="sm" fullWidth onClick={() => navigate('sales-video')}>
          Ver depoimentos
        </Button>
      </GlassSurface>
    </div>
  );

  // ==========================================
  // RENDER PRINCIPAL
  // ==========================================
  return (
    <VeloxLayout rightSidebar={renderRightSidebar()}>
      {/* Hero Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 lg:mb-8"
      >
        <HeroCarousel
          slides={heroSlides}
          onWatchClick={() => navigate('video-lesson')}
          onDownloadClick={() => {}}
          fullWidth
        />
      </motion.section>

      <div className="px-4 lg:px-6 pb-24 lg:pb-6">
        {/* RESUME BAR - Sem destaque excessivo, discreto */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <ResumeBar
            imageUrl={continueWatching.imageUrl}
            title={continueWatching.title}
            subtitle={continueWatching.subtitle}
            progress={continueWatching.progress}
            timeRemaining={continueWatching.timeRemaining}
            onClick={() => navigate('video-lesson')}
            highlighted={false}
          />
        </motion.section>

        {/* FILTROS DE CATEGORIA - Controla as fileiras visíveis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ChipTabs 
            tabs={categories} 
            activeTab={activeFilter} 
            onChange={setActiveFilter} 
          />
        </motion.div>

        {/* FILEIRAS DE CURSOS POR CATEGORIA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredRows.map((row, index) => renderCategoryRow(row, index))}
          </motion.div>
        </AnimatePresence>

        {/* SEÇÃO: Desbloqueie Mais (sempre visível) */}
        {activeFilter === 'Todos' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <SectionHeader
              title="Desbloqueie Mais"
              action={{ label: 'Ver premium', onClick: () => navigate('store') }}
            />
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              <BlurTeaserCard
                imageUrl="https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400"
                title="Japão: Cerejeiras e Templos"
                lessonCount="30 aulas"
                duration="8h 30min"
                onClick={() => navigate('locked-preview')}
              />
              <UnlockCTACard
                imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400"
                title="Milhas: Do Zero ao Primeira Classe"
                subtitle="O método mais completo"
                priceFrom="R$ 29/mês"
                onClick={() => navigate('store')}
              />
              <SocialProofCard
                imageUrl="https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400"
                title="Dubai Luxuosa por R$ 180/Dia"
                studentsCount="+6.789 alunos"
                rating={4.7}
                badge="Mais acessado"
                avatars={[
                  'https://i.pravatar.cc/150?img=1',
                  'https://i.pravatar.cc/150?img=2',
                  'https://i.pravatar.cc/150?img=3',
                  'https://i.pravatar.cc/150?img=4',
                ]}
                onClick={() => navigate('locked-preview')}
              />
              <div className="hidden lg:block">
                <VIPLockCard
                  imageUrl="https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400"
                  title="Maldivas: Paraíso Acessível"
                  subtitle="Exclusivo VIP"
                  onClick={() => navigate('locked-preview')}
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* INLINE SALES BANNER - Mobile Only */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-8 lg:hidden"
        >
          <GlassSurface
            variant="surface-3"
            blur="heavy"
            glow
            glowColor="var(--accent-purchase)"
            borderGradient="purchase"
            className="p-6 rounded-[var(--radius-2xl)] text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purchase)]/10 via-transparent to-[var(--accent-premium)]/10" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[var(--accent-purchase)] text-white text-[10px] font-black uppercase tracking-wider rounded-full mb-3">
                Oferta Relâmpago
              </span>
              <h3 className="text-[var(--text-primary)] text-xl font-black mb-2">
                Desbloqueie Tudo
              </h3>
              <p className="text-[var(--text-tertiary)] text-sm mb-4">
                Acesso vitalício a <span className="text-[var(--accent-purchase)] font-bold">120+ cursos</span>
              </p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-[var(--text-muted)] text-base line-through">R$ 1.497</span>
                <span className="text-[var(--text-primary)] text-3xl font-black">R$ 397</span>
              </div>
              <Button variant="purchase" size="lg" fullWidth onClick={() => navigate('sales-video')} className="font-black shadow-xl">
                GARANTIR 73% OFF
              </Button>
              <div className="flex items-center justify-center gap-4 mt-4 text-[var(--text-muted)] text-[10px]">
                <span>✓ 30 dias garantia</span>
                <span>✓ Certificados</span>
                <span>✓ Suporte VIP</span>
              </div>
            </div>
          </GlassSurface>
        </motion.section>

        {/* FOOTER CAPTURE BANNER - WhatsApp */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 -mx-4 lg:-mx-6"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0d3f2e] via-[#0a2f22] to-[#082a1e] py-12 lg:py-16">
            {/* WhatsApp Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2325D366'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0d3f2e] to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#082a1e] to-transparent" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#25D366]/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#25D366]/5 rounded-full blur-[80px]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 border border-[#25D366]/30 rounded-full mb-6">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-[#25D366] text-xs font-bold uppercase tracking-wider">Grupo Exclusivo WhatsApp</span>
                  </div>

                  <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-black leading-tight mb-4">
                    🚀 Não perca nenhuma<br />
                    <span className="text-[#25D366]">oportunidade!</span>
                  </h2>

                  <p className="text-[#a0b8ae] text-base lg:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                    Receba alertas em tempo real de promoções exclusivas e erros de tarifa direto no seu celular.
                  </p>

                  <ul className="space-y-4 mb-8 text-left max-w-md mx-auto lg:mx-0">
                    {[
                      'Alertas de Erro de Tarifa em primeira mão',
                      'Promoções relâmpago antes de todo mundo',
                      'Dicas exclusivas de economia em viagens'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                        </div>
                        <span className="text-white/90 text-sm lg:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20c55e] text-white text-lg font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] active:scale-95"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Quero Entrar no Grupo VIP Agora
                  </button>

                  <p className="text-[#6b8a7a] text-xs mt-4">
                    🔒 Grupo privado • Sem spam • Saia quando quiser
                  </p>
                </div>

                <div className="hidden lg:block relative">
                  <div className="relative aspect-[4/5] max-w-md mx-auto">
                    <div className="absolute inset-0 bg-[#25D366]/20 blur-[60px] rounded-full" />
                    <div className="relative rounded-3xl overflow-hidden border-2 border-[#25D366]/20 shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=750&fit=crop&crop=faces"
                        alt="Pessoa usando celular em lounge de aeroporto"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#082a1e]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 text-sm font-bold">Velox Alertas</p>
                            <p className="text-gray-600 text-xs mt-0.5">🔥 ERRO DE TARIFA! São Paulo → Paris por R$ 1.890 ida e volta!</p>
                            <p className="text-gray-400 text-[10px] mt-1">Agora</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Reads */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <SectionHeader
            title="Leituras rápidas"
            action={{ label: 'Ver artigos', onClick: () => navigate('explore') }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: '1', title: '10 Erros que Fazem Você Pagar Mais nas Passagens', preview: 'Descubra os erros mais comuns que fazem você perder oportunidades de economizar.' },
              { id: '2', title: 'Como Usar o Modo Anônimo Para Preços Melhores', preview: 'Técnica comprovada para evitar que sites aumentem os preços.' },
            ].map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + index * 0.05 }}
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
