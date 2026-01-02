import { useState, useMemo } from 'react';
import { BookOpen, ChevronRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import {
  ChipTabs,
  ContentCard,
  SectionHeader,
  Button,
  GlassSurface,
  HeroCarousel,
  NetflixCarousel,
  ResumeBar,
  VIPLockCard,
  ComboBundleCard,
  DiscountTagCard,
  BlurTeaserCard,
  UnlockCTACard,
  SocialProofCard
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
    type: 'vip-lock' | 'combo-bundle' | 'discount-tag' | 'blur-teaser' | 'unlock-cta' | 'social-proof';
    position: number;
    data: any;
  };
}

// ==========================================
// IMAGENS DE VIAGEM (NÃO ROSTOS)
// ==========================================
const TRAVEL_IMAGES = {
  // Aviões e Aeroportos
  airplane1: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
  airplane2: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400',
  airport: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400',
  
  // Praias
  beach1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
  beach2: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400',
  maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400',
  caribbean: 'https://images.unsplash.com/photo-1580541631950-7282082b03fe?w=400',
  
  // Europa
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
  amsterdam: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400',
  
  // Ásia
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
  thailand: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
  
  // América
  nyc: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
  rio: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400',
  
  // Passagens e Milhas
  passport: 'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=400',
  luggage: 'https://images.unsplash.com/photo-1553531384-411a247ccd73?w=400',
  creditCard: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
  miles: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400',
  
  // Mapas e Planejamento
  map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400',
  planning: 'https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?w=400',
};

const CATEGORIES = [
  'Todos',
  'Fundamentos',
  'Destinos',
  'Milhas e Pontos',
  'Técnicas Avançadas',
];

const HERO_SLIDES = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600',
    title: 'Estratégia do Mês',
    subtitle: '🔴 AO VIVO HOJE ÀS 20H',
    description: 'O Guia Definitivo das Emissões com João Marcos',
    tags: ['Ao Vivo', 'Exclusivo'],
    badge: 'AO VIVO',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1580541631950-7282082b03fe?w=1600',
    title: 'Novo Módulo: Caribe',
    subtitle: '🆕 LANÇAMENTO',
    description: 'Descubra praias paradisíacas por menos de R$ 2.000',
    tags: ['Caribe', 'Praias'],
    badge: 'NOVO',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600',
    title: 'Europa 2025',
    subtitle: 'GUIA COMPLETO',
    description: 'Roteiros otimizados para 15 países europeus',
    tags: ['Europa', 'Roteiro'],
    badge: 'POPULAR',
  },
];

const CONTINUE_WATCHING = {
  id: '1',
  imageUrl: TRAVEL_IMAGES.airplane1,
  title: 'ALIA 04 - O Segredo das Emissões Tabela Fixa',
  subtitle: 'Aula 3 de 8 • Módulo Avançado',
  progress: 50,
  timeRemaining: '12 min restantes',
};

const HERO_UPDATES = [
  { title: 'Nova trilha Caribe', detail: 'Aulas fresquinhas com roteiro completo e checklist de bagagem', badge: 'Lançamento' },
  { title: 'Clube VIP reaberto', detail: 'Vagas limitadas para mentorias semanais com especialistas', badge: 'VIP' },
  { title: 'Alerta de tarifa', detail: 'São Paulo → Lisboa por R$ 2.150 (taxas inclusas)', badge: 'Urgente' },
];

const QUICK_ARTICLES = [
  { id: '1', title: '10 Erros que Fazem Você Pagar Mais nas Passagens', preview: 'Descubra os erros mais comuns que fazem você perder oportunidades de economizar.' },
  { id: '2', title: 'Como Usar o Modo Anônimo Para Preços Melhores', preview: 'Técnica comprovada para evitar que sites aumentem os preços.' },
];

// ==========================================
// FILEIRAS DE CURSOS POR CATEGORIA
// ==========================================
const CATEGORY_ROWS: CategoryRow[] = [
  // CATEGORIA: FUNDAMENTOS
  {
    id: 'fundamentos',
    title: 'Fundamentos',
    category: 'Fundamentos',
    courses: [
      {
        id: 'f1',
        imageUrl: TRAVEL_IMAGES.airplane2,
        title: 'Método Completo: Passagens 70% Mais Baratas',
        subtitle: '32 aulas • 8h 45min',
        badge: 'Bestseller',
        category: 'Fundamentos',
      },
      {
        id: 'f2',
        imageUrl: TRAVEL_IMAGES.planning,
        title: 'Primeiros Passos: Economia em Viagens',
        subtitle: '18 aulas • 4h 20min',
        badge: 'Iniciante',
        category: 'Fundamentos',
      },
      {
        id: 'f3',
        imageUrl: TRAVEL_IMAGES.map,
        title: 'Como Planejar Sua Primeira Viagem',
        subtitle: '15 aulas • 3h 45min',
        category: 'Fundamentos',
      },
      {
        id: 'f4',
        imageUrl: TRAVEL_IMAGES.airport,
        title: 'Alertas de Preço: Guia Completo',
        subtitle: '12 aulas • 2h 30min',
        category: 'Fundamentos',
      },
      {
        id: 'f5',
        imageUrl: TRAVEL_IMAGES.luggage,
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
        imageUrl: TRAVEL_IMAGES.passport,
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
        imageUrl: TRAVEL_IMAGES.nyc,
        title: 'Nova York Econômica',
        subtitle: '22 aulas • 6h 15min',
        category: 'Destinos',
      },
      {
        id: 'd2',
        imageUrl: TRAVEL_IMAGES.paris,
        title: 'Paris com R$ 200/Dia',
        subtitle: '20 aulas • 5h 50min',
        badge: 'Atualizado',
        category: 'Destinos',
      },
      {
        id: 'd3',
        imageUrl: TRAVEL_IMAGES.thailand,
        title: 'Tailândia Completa',
        subtitle: '24 aulas • 7h 20min',
        badge: 'TOP 5',
        category: 'Destinos',
      },
      {
        id: 'd4',
        imageUrl: TRAVEL_IMAGES.tokyo,
        title: 'Japão: Cerejeiras e Templos',
        subtitle: '30 aulas • 8h 30min',
        category: 'Destinos',
      },
      {
        id: 'd5',
        imageUrl: TRAVEL_IMAGES.dubai,
        title: 'Dubai Luxuosa por R$ 180/Dia',
        subtitle: '16 aulas • 4h 45min',
        category: 'Destinos',
      },
    ],
    salesElement: {
      type: 'vip-lock',
      position: 3,
      data: {
        imageUrl: TRAVEL_IMAGES.rome,
        title: 'Roma: Roteiro Secreto',
        subtitle: 'Conteúdo VIP',
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
        imageUrl: TRAVEL_IMAGES.miles,
        title: 'Milhas do Zero ao Avançado',
        subtitle: '36 aulas • 10h 40min',
        badge: 'Mais Vendido',
        category: 'Milhas e Pontos',
      },
      {
        id: 'm2',
        imageUrl: TRAVEL_IMAGES.creditCard,
        title: 'Cartões de Crédito para Milhas',
        subtitle: '18 aulas • 4h 30min',
        category: 'Milhas e Pontos',
      },
      {
        id: 'm3',
        imageUrl: TRAVEL_IMAGES.airplane1,
        title: 'Transferências Bonificadas',
        subtitle: '12 aulas • 3h',
        badge: 'Novo',
        category: 'Milhas e Pontos',
      },
      {
        id: 'm4',
        imageUrl: TRAVEL_IMAGES.passport,
        title: 'Resgate Inteligente de Passagens',
        subtitle: '15 aulas • 4h',
        category: 'Milhas e Pontos',
      },
    ],
    salesElement: {
      type: 'combo-bundle',
      position: 2,
      data: {
        courseImages: [TRAVEL_IMAGES.miles, TRAVEL_IMAGES.creditCard],
        title: 'Combo Milhas PRO',
        coursesIncluded: ['Milhas do Zero ao Avançado', 'Erros de Tarifa Masterclass'],
        originalPrice: 'R$ 997',
        discountedPrice: 'R$ 497',
        savings: '-50%',
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
        imageUrl: TRAVEL_IMAGES.map,
        title: 'Stopover Estratégico',
        subtitle: '12 aulas • 3h 30min',
        category: 'Técnicas Avançadas',
      },
      {
        id: 't2',
        imageUrl: TRAVEL_IMAGES.planning,
        title: 'Ferramentas de Busca Avançadas',
        subtitle: '15 aulas • 4h',
        category: 'Técnicas Avançadas',
      },
      {
        id: 't3',
        imageUrl: TRAVEL_IMAGES.airport,
        title: 'Erros de Tarifa: Como Encontrar',
        subtitle: '18 aulas • 5h',
        badge: 'Avançado',
        category: 'Técnicas Avançadas',
      },
      {
        id: 't4',
        imageUrl: TRAVEL_IMAGES.airplane2,
        title: 'Voos com Múltiplas Paradas',
        subtitle: '10 aulas • 2h 30min',
        category: 'Técnicas Avançadas',
      },
    ],
    salesElement: {
      type: 'discount-tag',
      position: 2,
      data: {
        imageUrl: TRAVEL_IMAGES.luggage,
        title: 'Erros de Tarifa Masterclass',
        subtitle: '25 aulas • 7h',
        discount: '-40% OFF',
        originalPrice: 'R$ 497',
        discountedPrice: 'R$ 297',
      },
    },
  },
];

export default function HomeV6() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState(CATEGORIES[0]);

  // ==========================================
  // FILTRAGEM POR CATEGORIA
  // ==========================================
  const filteredRows = useMemo(() => {
    if (activeFilter === 'Todos') {
      return CATEGORY_ROWS;
    }
    return CATEGORY_ROWS.filter(row => row.category === activeFilter);
  }, [activeFilter]);

  // ==========================================
  // LARGURA PADRÃO DOS CARDS (consistente)
  // ==========================================
  const CARD_WIDTH = "w-[140px] sm:w-[160px] lg:w-[180px]";
  // Cards de vendas mais largos (horizontal)
  const SALES_CARD_WIDTH = "w-[220px] sm:w-[260px] lg:w-[280px]";

  // ==========================================
  // RENDER: Elemento de vendas (mais largos que cursos, mesma altura)
  // ==========================================
  const renderSalesElement = (salesElement: CategoryRow['salesElement']) => {
    if (!salesElement) return null;

    switch (salesElement.type) {
      case 'vip-lock':
        return (
          <div className={`flex-shrink-0 ${CARD_WIDTH}`}>
            <VIPLockCard
              imageUrl={salesElement.data.imageUrl}
              title={salesElement.data.title}
              subtitle={salesElement.data.subtitle}
              onClick={() => navigate('locked-preview')}
            />
          </div>
        );
      case 'combo-bundle':
        return (
          <div className={`flex-shrink-0 ${SALES_CARD_WIDTH}`}>
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
          <div className={`flex-shrink-0 ${SALES_CARD_WIDTH}`}>
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
  // RENDER: Fileira de cursos
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
      
      // Adicionar curso com mesma largura
      coursesWithSales.push(
        <div key={course.id} className={`flex-shrink-0 ${CARD_WIDTH}`}>
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
  // RENDER PRINCIPAL
  // ==========================================
  return (
    <VeloxLayout>
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 lg:pt-8 pb-24">
        {/* Hero full width com overlay de atualizações e barra de player */}
        <section className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-[var(--radius-2xl)] overflow-hidden shadow-2xl shadow-black/20"
          >
            <HeroCarousel
              slides={HERO_SLIDES}
              onWatchClick={() => navigate('video-lesson')}
              onDownloadClick={() => {}}
              fullWidth
            />

            {/* Atualizações flutuantes no canto direito */}
            <div className="absolute right-4 top-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 max-w-[340px] w-full z-30">
              <GlassSurface
                variant="surface-2"
                blur="medium"
                className="p-5 rounded-[var(--radius-xl)] border border-[var(--glass-border)]/80 backdrop-blur-2xl bg-white/5"
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <p className="text-[var(--text-primary)] text-sm font-semibold">Atualizações</p>
                    <p className="text-[var(--text-tertiary)] text-xs">Tudo que chegou esta semana</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[var(--accent-secondary-soft)] text-[10px] font-black uppercase tracking-widest text-[var(--accent-secondary)]">
                    ao vivo
                  </span>
                </div>

                <div className="space-y-3">
                  {HERO_UPDATES.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[var(--glass-surface-3)] border border-[var(--glass-border)]/60"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)]/15 to-[var(--accent-secondary)]/15 flex items-center justify-center text-[10px] font-black text-[var(--accent-primary)] uppercase">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[var(--text-primary)] text-sm font-semibold leading-tight">{item.title}</p>
                          <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[var(--text-tertiary)] text-xs leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassSurface>
            </div>

            {/* Continue watching fixado na base do hero */}
            <div className="absolute left-0 right-0 bottom-0 px-4 pb-4 pointer-events-none">
              <div className="max-w-[900px] mx-auto pointer-events-auto drop-shadow-2xl">
                <ResumeBar
                  imageUrl={CONTINUE_WATCHING.imageUrl}
                  title={CONTINUE_WATCHING.title}
                  subtitle={CONTINUE_WATCHING.subtitle}
                  progress={CONTINUE_WATCHING.progress}
                  timeRemaining={CONTINUE_WATCHING.timeRemaining}
                  onClick={() => navigate('video-lesson')}
                  highlighted
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* FILTROS DE CATEGORIA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ChipTabs 
            tabs={CATEGORIES} 
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

        {/* SEÇÃO: Desbloqueie Mais - SEMPRE VISÍVEL (não afetada pelo filtro) */}
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
              imageUrl={TRAVEL_IMAGES.tokyo}
              title="Japão: Cerejeiras e Templos"
              lessonCount="30 aulas"
              duration="8h 30min"
              onClick={() => navigate('locked-preview')}
            />
            <UnlockCTACard
              imageUrl={TRAVEL_IMAGES.maldives}
              title="Milhas: Do Zero ao Primeira Classe"
              subtitle="O método mais completo"
              priceFrom="R$ 29/mês"
              onClick={() => navigate('store')}
            />
            <SocialProofCard
              imageUrl={TRAVEL_IMAGES.dubai}
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
                imageUrl={TRAVEL_IMAGES.maldives}
                title="Maldivas: Paraíso Acessível"
                subtitle="Exclusivo VIP"
                onClick={() => navigate('locked-preview')}
              />
            </div>
          </div>
        </motion.section>

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
            {QUICK_ARTICLES.map((article, index) => (
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
