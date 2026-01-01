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
  NetflixCarousel,
} from '../../components/design-system';
import { motion } from 'motion/react';

export default function HomeV5() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Tudo');

  const filters = ['Tudo', 'Comece aqui', 'Módulos', 'Artigos', 'Favoritos'];

  // Hero carousel data - OTIMIZADO: Menos texto, mais impacto visual
  const heroSlides = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=1600',
      title: 'Voe Mais. Gaste Menos.',
      subtitle: 'MÉTODO EXCLUSIVO',
      description: 'O sistema completo para encontrar passagens até 70% mais baratas.',
      tags: ['Exploração', 'Liberdade'],
      badge: 'NOVO',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600',
      title: 'Caribe por R$ 1.200',
      subtitle: 'CASE REAL',
      description: 'Aprenda as estratégias que levaram +3.000 alunos ao paraíso.',
      tags: ['Caribe', 'Paraíso'],
      badge: 'POPULAR',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=1600',
      title: 'Europa em 2025',
      subtitle: 'GUIA COMPLETO',
      description: 'Passagens, hospedagem e roteiros para 15 países gastando pouco.',
      tags: ['Europa', 'Budget'],
      badge: 'LANÇAMENTO',
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=1600',
      title: 'Ásia Low Cost',
      subtitle: 'AVENTURA',
      description: '30 dias viajando pela Ásia com menos de R$ 50/dia.',
      tags: ['Ásia', 'Mochilão'],
      badge: 'TOP 1',
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

  // Cursos organizados por categoria (estilo Netflix) - EXPANDIDO COM CONTEÚDO REALISTA
  const coursesByCategory = [
    {
      category: 'Recomendados para você',
      courses: [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          title: 'Método Completo: Passagens 70% Mais Baratas',
          subtitle: '32 aulas • 8h 45min',
          badge: 'Bestseller',
          courseData: {
            title: 'Método Completo: Passagens 70% Mais Baratas',
            instructor: 'Carlos Vieira',
            instructorTitle: 'Especialista em Economia de Viagens',
            category: 'Fundamentos',
            instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
            totalLessons: 32,
            totalDuration: '8h 45min',
            rating: 4.9,
            studentsCount: '12.847 alunos',
            description: 'Carlos Vieira é consultor de viagens há 8 anos e já ajudou +10.000 pessoas a economizarem mais de R$ 5 milhões em passagens. Neste curso, ele revela o sistema exato que usa para encontrar tarifas até 70% mais baratas, incluindo erros de tarifa, milhas e estratégias avançadas.',
          },
        },
        {
          id: '2',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          title: 'TOP 50 Destinos Baratos 2025',
          subtitle: '25 aulas • 6h 20min • Atualizado Jan/2025',
          badge: 'Novo',
          courseData: {
            title: 'TOP 50 Destinos Baratos 2025',
            instructor: 'Maria Santos',
            instructorTitle: 'Travel Hacker & Criadora de Conteúdo',
            category: 'Destinos',
            instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
            totalLessons: 25,
            totalDuration: '6h 20min',
            rating: 4.8,
            studentsCount: '8.392 alunos',
            description: 'Maria Santos viajou para 73 países nos últimos 5 anos gastando em média R$ 80/dia. Neste curso recém-atualizado, ela revela os 50 destinos mais econômicos para 2025, com roteiros completos, dicas de hospedagem barata e truques locais para economizar em cada destino.',
          },
        },
        {
          id: '3',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          title: 'Europa Completa: 15 Países em 30 Dias',
          subtitle: '42 aulas • 12h 30min',
          locked: true,
          badge: 'Premium',
          courseData: {
            title: 'Europa Completa: 15 Países em 30 Dias',
            instructor: 'João Ferreira',
            instructorTitle: 'Ex-Executivo que virou Nômade Digital',
            category: 'Premium',
            instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
            totalLessons: 42,
            totalDuration: '12h 30min',
            rating: 5.0,
            studentsCount: '4.128 alunos',
            description: 'João largou o emprego corporativo e mora na Europa há 6 anos. Ele visitou todos os 44 países do continente gastando menos que a maioria gasta em um só. Curso completo com passes de trem, voos low-cost, hostels secretos e roteiros otimizados para maximizar experiências minimizando gastos.',
          },
        },
        {
          id: '4',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          title: 'Caribe Secreto: Praias Paradisíacas por R$ 1.200',
          subtitle: '18 aulas • 5h 10min',
          courseData: {
            title: 'Caribe Secreto: Praias Paradisíacas por R$ 1.200',
            instructor: 'Ana Costa',
            instructorTitle: 'Beach Hunter & Fotógrafa de Viagens',
            category: 'Praias',
            instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
            totalLessons: 18,
            totalDuration: '5h 10min',
            rating: 4.9,
            studentsCount: '6.234 alunos',
            description: 'Ana já visitou mais de 200 praias pelo mundo e especializa-se em encontrar paraísos escondidos. Neste curso, ela revela ilhas caribenhas pouco conhecidas onde é possível passar uma semana completa gastando menos de R$ 1.200, incluindo passagem. Bônus: técnicas de fotografia para registrar suas viagens como uma profissional.',
          },
        },
        {
          id: '5',
          imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
          title: 'Sudeste Asiático: 90 Dias por R$ 4.500',
          subtitle: '28 aulas • 9h 15min',
          badge: 'Popular',
          courseData: {
            title: 'Sudeste Asiático: 90 Dias por R$ 4.500',
            instructor: 'Pedro Lima',
            instructorTitle: 'Mochileiro Profissional & Blogueiro',
            category: 'Ásia',
            instructorImage: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=800',
            totalLessons: 28,
            totalDuration: '9h 15min',
            rating: 4.7,
            studentsCount: '9.567 alunos',
            description: 'Pedro viajou 2 anos seguidos pelo Sudeste Asiático, conhecendo Tailândia, Vietnã, Camboja, Laos, Indonésia, Malásia e Filipinas. Seu orçamento médio? R$ 50/dia. Curso com roteiros dia a dia, táticas de negociação, transportes baratos, hospedagens de R$ 10/noite e as melhores comidas de rua.',
          },
        },
        {
          id: '6',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
          title: 'Milhas e Pontos: Do Zero ao Primeira Classe',
          subtitle: '36 aulas • 10h 40min',
          locked: true,
          badge: 'Exclusivo',
          courseData: {
            title: 'Milhas e Pontos: Do Zero ao Primeira Classe',
            instructor: 'Lucas Silva',
            instructorTitle: 'Especialista em Milhagem & Ex-Piloto',
            category: 'Milhas',
            instructorImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
            totalLessons: 36,
            totalDuration: '10h 40min',
            rating: 4.9,
            studentsCount: '3.891 alunos',
            description: 'Lucas voou mais de 2 milhões de milhas nos últimos 5 anos, a maioria em executiva e primeira classe, sem pagar. Ex-piloto comercial, ele conhece todos os segredos das companhias aéreas. Aprenda o sistema completo: cartões de crédito, bônus, transferências, sweet spots e como resgatar passagens que valeriam R$ 50.000 por 25.000 milhas.',
          },
        },
      ],
    },
    {
      category: 'Destinos Populares',
      courses: [
        {
          id: '7',
          imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
          title: 'Nova York Econômica: O Guia Definitivo',
          subtitle: '22 aulas • 6h 15min',
          courseData: {
            title: 'Nova York Econômica: O Guia Definitivo',
            instructor: 'Fernanda Rocha',
            instructorTitle: 'Guia de Turismo Certificada em NYC',
            category: 'América do Norte',
            instructorImage: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=800',
            totalLessons: 22,
            totalDuration: '6h 15min',
            rating: 4.8,
            studentsCount: '7.456 alunos',
            description: 'Fernanda morou 4 anos em NYC e trabalhou como guia turística. Ela conhece todos os truques para economizar na cidade mais cara dos EUA. Passagens baratas, hotéis acessíveis, metrô, atrações gratuitas, restaurantes bons e baratos, compras com desconto e roteiros otimizados para 3, 5 ou 7 dias.',
          },
        },
        {
          id: '8',
          imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
          title: 'Paris com Menos de R$ 200/Dia',
          subtitle: '20 aulas • 5h 50min',
          badge: 'Atualizado',
          courseData: {
            title: 'Paris com Menos de R$ 200/Dia',
            instructor: 'Juliana Alves',
            instructorTitle: 'Brasileira em Paris há 7 Anos',
            category: 'Europa',
            instructorImage: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=800',
            totalLessons: 20,
            totalDuration: '5h 50min',
            rating: 4.9,
            studentsCount: '11.234 alunos',
            description: 'Juliana se mudou para Paris em 2018 e domina a arte de viver bem gastando pouco na Cidade Luz. Descubra museus gratuitos, restaurantes deliciosos e baratos, acomodações econômicas, transporte público, passes de trem e como aproveitar Paris como um local, não como turista. Inclui roteiro de 7 dias completo.',
          },
        },
        {
          id: '9',
          imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
          title: 'Japão: Cerejeiras e Templos por R$ 250/Dia',
          subtitle: '30 aulas • 8h 30min',
          locked: true,
          badge: 'Premium',
          courseData: {
            title: 'Japão: Cerejeiras e Templos por R$ 250/Dia',
            instructor: 'Ricardo Tanaka',
            instructorTitle: 'Nipo-Brasileiro & Tradutor no Japão',
            category: 'Ásia',
            instructorImage: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=800',
            totalLessons: 30,
            totalDuration: '8h 30min',
            rating: 5.0,
            studentsCount: '5.123 alunos',
            description: 'Ricardo nasceu no Brasil, se mudou para o Japão aos 18 e mora lá há 12 anos. Curso completo sobre como viajar pelo Japão gastando muito menos do que você imagina: JR Pass estratégico, hospedagens cápsula, onsen públicos, comida de conveniência (que é ótima!), templos gratuitos, época das cerejeiras e roteiros de 7, 14 e 21 dias.',
          },
        },
        {
          id: '10',
          imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
          title: 'Tailândia: Praias, Templos e Ilhas Secretas',
          subtitle: '24 aulas • 7h 20min',
          badge: 'TOP 5',
          courseData: {
            title: 'Tailândia: Praias, Templos e Ilhas Secretas',
            instructor: 'Thiago Souza',
            instructorTitle: 'Nômade Digital Baseado em Bangkok',
            category: 'Ásia',
            instructorImage: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=800',
            totalLessons: 24,
            totalDuration: '7h 20min',
            rating: 4.8,
            studentsCount: '10.892 alunos',
            description: 'Thiago vive na Tailândia há 3 anos e conhece o país como ninguém. Bangkok, Chiang Mai, ilhas paradisíacas, praias escondidas, templos impressionantes, comida de rua incrível por R$ 5, massagens tailandesas, festas de lua cheia e muito mais. Orçamento médio: R$ 60/dia incluindo hospedagem.',
          },
        },
        {
          id: '11',
          imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
          title: 'Dubai Luxuosa por R$ 180/Dia (Sim, é Possível!)',
          subtitle: '16 aulas • 4h 45min',
          courseData: {
            title: 'Dubai Luxuosa por R$ 180/Dia',
            instructor: 'Amanda Costa',
            instructorTitle: 'Influencer de Viagens de Luxo Acessível',
            category: 'Oriente Médio',
            instructorImage: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=800',
            totalLessons: 16,
            totalDuration: '4h 45min',
            rating: 4.7,
            studentsCount: '6.789 alunos',
            description: 'Dubai é conhecida por ser caríssima, mas Amanda descobriu todos os truques para visitar a cidade com orçamento de mochileiro. Hotéis 4 estrelas baratos, restaurantes locais deliciosos, Burj Khalifa com desconto, desert safari econômico, praias públicas, mercados tradicionais e como aproveitar o luxo de Dubai sem gastar uma fortuna.',
          },
        },
      ],
    },
    {
      category: 'Técnicas Avançadas',
      courses: [
        {
          id: '12',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          title: 'Milhas e Pontos',
          subtitle: '25 aulas • 7h',
          locked: true,
          courseData: {
            title: 'Milhas Avançado',
            instructor: 'Roberto Milhas',
            instructorTitle: 'Especialista em Milhas',
            category: 'Técnicas',
            instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
            totalLessons: 25,
            totalDuration: '7h 00min',
            description: 'Domine o sistema de milhas e pontos.',
          },
        },
        {
          id: '13',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          title: 'Erros de Tarifa',
          subtitle: '18 aulas • 5h',
          locked: true,
          courseData: {
            title: 'Erros de Tarifa',
            instructor: 'Carla Erros',
            instructorTitle: 'Especialista em Erros',
            category: 'Técnicas',
            instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
            totalLessons: 18,
            totalDuration: '5h 00min',
            description: 'Como encontrar e aproveitar erros de tarifa.',
          },
        },
        {
          id: '14',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          title: 'Stopover Estratégico',
          subtitle: '12 aulas • 3h 30min',
          courseData: {
            title: 'Stopover',
            instructor: 'Marcos Stop',
            instructorTitle: 'Especialista em Stopover',
            category: 'Técnicas',
            instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
            totalLessons: 12,
            totalDuration: '3h 30min',
            description: 'Aprenda a usar stopovers para conhecer mais destinos.',
          },
        },
        {
          id: '15',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          title: 'Ferramentas de Busca',
          subtitle: '15 aulas • 4h',
          courseData: {
            title: 'Ferramentas',
            instructor: 'Paula Tools',
            instructorTitle: 'Especialista em Ferramentas',
            category: 'Técnicas',
            instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
            totalLessons: 15,
            totalDuration: '4h 00min',
            description: 'Domine as melhores ferramentas de busca.',
          },
        },
      ],
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

      {/* Upgrade Banner - FORMATO 1: Direto com Urgência */}
      <GlassSurface
        variant="surface-3"
        blur="heavy"
        glow
        glowColor="var(--accent-purchase)"
        className="p-5 rounded-[var(--radius-xl)] text-center relative overflow-hidden"
      >
        {/* Badge de urgência */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-[var(--accent-purchase)] text-white text-[9px] font-black uppercase tracking-wider rounded-full">
            ⚡ 48h
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-[var(--accent-purchase-soft)] border border-[var(--accent-purchase-border)] flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 text-[var(--accent-purchase)]" />
        </div>
        <h3 className="text-[var(--text-primary)] text-base font-black mb-1">
          Acesso Premium
        </h3>
        <p className="text-[var(--accent-purchase)] text-xs font-bold mb-2">
          -60% OFF por tempo limitado
        </p>
        <p className="text-[var(--text-tertiary)] text-xs leading-relaxed mb-4">
          Todos os cursos + Certificados + Suporte VIP
        </p>
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[var(--text-muted)] text-xs line-through">R$ 997</span>
            <span className="text-[var(--text-primary)] text-2xl font-black">R$ 397</span>
          </div>
          <span className="text-[var(--text-tertiary)] text-[10px]">ou 12x de R$ 39,70</span>
        </div>
        <Button variant="purchase" size="md" fullWidth onClick={() => navigate('store')} className="font-black">
          GARANTIR DESCONTO
        </Button>
        <p className="text-[var(--text-muted)] text-[9px] mt-3 uppercase tracking-wider">
          🛡️ Garantia de 30 dias
        </p>
      </GlassSurface>

      {/* Upgrade Banner - FORMATO 2: Social Proof */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-[var(--radius-xl)]"
      >
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

        {/* INLINE SALES BANNER - Entre Stats e Cursos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
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
            {/* Animated background */}
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

        {/* Cursos Recomendados - Estilo Netflix com múltiplas categorias */}
        {coursesByCategory.map((category, categoryIndex) => (
          <motion.section
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + categoryIndex * 0.1 }}
            className="mb-8"
          >
            <NetflixCarousel title={category.category}>
              {category.courses.map((course) => (
                <div
                  key={course.id}
                  className="flex-shrink-0 w-[140px] sm:w-[160px] lg:w-[180px]"
                >
                  <ContentCard
                    imageUrl={course.imageUrl}
                    title={course.title}
                    subtitle={course.subtitle}
                    badge={course.badge}
                    locked={course.locked}
                    onClick={() => {
                      if (course.locked) {
                        navigate('locked-preview');
                      } else {
                        navigate('course-detail', { course: course.courseData });
                      }
                    }}
                  />
                </div>
              ))}
            </NetflixCarousel>
          </motion.section>
        ))}


        {/* INLINE SALES BANNER - Comparação de Planos (Desktop) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.53 }}
          className="hidden lg:block mb-8"
        >
          <GlassSurface
            variant="surface-3"
            blur="heavy"
            className="p-8 rounded-[var(--radius-3xl)] overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 via-[var(--accent-purchase)]/5 to-[var(--accent-premium)]/5" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-[var(--text-primary)] text-2xl font-black mb-2">
                  Escolha Seu Plano
                </h3>
                <p className="text-[var(--text-tertiary)] text-sm">
                  Acesso ilimitado, cancele quando quiser
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Plano Básico */}
                <GlassSurface variant="surface-2" blur="medium" className="p-6 rounded-[var(--radius-xl)] text-center">
                  <h4 className="text-[var(--text-primary)] text-lg font-bold mb-2">Básico</h4>
                  <div className="mb-4">
                    <span className="text-[var(--text-primary)] text-3xl font-black">R$ 97</span>
                    <span className="text-[var(--text-muted)] text-xs block">ou 12x R$ 9,70</span>
                  </div>
                  <ul className="text-left text-xs text-[var(--text-tertiary)] space-y-2 mb-6">
                    <li>✓ 20 cursos selecionados</li>
                    <li>✓ Suporte por email</li>
                    <li>✓ Certificados</li>
                    <li className="text-[var(--text-muted)]">✗ Sem atualizações</li>
                  </ul>
                  <Button variant="secondary" size="sm" fullWidth onClick={() => navigate('store')}>
                    Selecionar
                  </Button>
                </GlassSurface>

                {/* Plano Premium - DESTAQUE */}
                <GlassSurface
                  variant="surface-3"
                  blur="heavy"
                  glow
                  glowColor="var(--accent-purchase)"
                  borderGradient="purchase"
                  className="p-6 rounded-[var(--radius-xl)] text-center relative scale-105 shadow-2xl"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-[var(--accent-purchase)] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                  <h4 className="text-[var(--text-primary)] text-lg font-black mb-2 mt-2">Premium</h4>
                  <div className="mb-4">
                    <span className="text-[var(--text-muted)] text-sm line-through block">R$ 997</span>
                    <span className="text-[var(--text-primary)] text-4xl font-black">R$ 397</span>
                    <span className="text-[var(--text-muted)] text-xs block">ou 12x R$ 39,70</span>
                  </div>
                  <ul className="text-left text-xs text-[var(--text-secondary)] space-y-2 mb-6">
                    <li>✓ <strong>120+ cursos completos</strong></li>
                    <li>✓ Suporte VIP prioritário</li>
                    <li>✓ Certificados premium</li>
                    <li>✓ Atualizações vitalícias</li>
                    <li>✓ Acesso a comunidade</li>
                    <li>✓ Ferramentas exclusivas</li>
                  </ul>
                  <Button variant="purchase" size="md" fullWidth onClick={() => navigate('sales-video')} className="font-black shadow-xl">
                    GARANTIR 60% OFF
                  </Button>
                </GlassSurface>

                {/* Plano VIP */}
                <GlassSurface variant="surface-2" blur="medium" className="p-6 rounded-[var(--radius-xl)] text-center">
                  <h4 className="text-[var(--text-primary)] text-lg font-bold mb-2">VIP</h4>
                  <div className="mb-4">
                    <span className="text-[var(--text-primary)] text-3xl font-black">R$ 697</span>
                    <span className="text-[var(--text-muted)] text-xs block">ou 12x R$ 69,70</span>
                  </div>
                  <ul className="text-left text-xs text-[var(--text-tertiary)] space-y-2 mb-6">
                    <li>✓ Tudo do Premium</li>
                    <li>✓ Mentoria 1 a 1 (2h/mês)</li>
                    <li>✓ Análise de roteiros</li>
                    <li>✓ Grupo exclusivo VIP</li>
                  </ul>
                  <Button variant="premium" size="sm" fullWidth onClick={() => navigate('store')}>
                    Selecionar
                  </Button>
                </GlassSurface>
              </div>

              <p className="text-center text-[var(--text-muted)] text-xs mt-6">
                🛡️ Garantia incondicional de 30 dias em todos os planos
              </p>
            </div>
          </GlassSurface>
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

