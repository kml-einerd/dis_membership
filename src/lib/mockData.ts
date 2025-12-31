// Mock data for consistent testing and development
// In production, replace with actual API calls

export interface Content {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  type: 'video' | 'article';
  locked?: boolean;
  progress?: number;
  duration?: string;
  category?: string;
  instructor?: string;
}

export const heroContent: Content = {
  id: 'hero-1',
  title: 'Passagens para Europa a partir de R$ 1.500',
  subtitle: 'Aprenda as estratégias que uso para encontrar voos internacionais baratos',
  imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=800',
  type: 'video',
  progress: 35,
  category: 'Destinos',
  instructor: 'Carlos Vieira',
};

export const continueWatching: Content[] = [
  {
    id: 'cw-1',
    title: 'Como usar alertas de preço',
    thumbnailUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
    type: 'video',
    progress: 67,
    duration: '8 min restantes',
  },
  {
    id: 'cw-2',
    title: 'Melhor dia para comprar passagens',
    thumbnailUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
    type: 'video',
    progress: 34,
    duration: '15 min restantes',
  },
];

export const featuredContent: Content[] = [
  {
    id: 'f-1',
    imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
    title: 'Guia Completo de Passagens Baratas',
    subtitle: '12 aulas práticas',
    type: 'video',
  },
  {
    id: 'f-2',
    imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
    title: 'Destinos Econômicos 2025',
    subtitle: 'Lista atualizada',
    type: 'video',
  },
  {
    id: 'f-3',
    imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=400',
    title: 'Europa com Orçamento Limitado',
    subtitle: 'Premium',
    type: 'video',
    locked: true,
  },
  {
    id: 'f-4',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    title: 'Praias Paradisíacas Acessíveis',
    subtitle: '8 destinos',
    type: 'video',
  },
];

export const storeProducts: Content[] = [
  {
    id: 's-1',
    imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400',
    title: 'Rastreador de Preços Pro',
    subtitle: 'Alertas em tempo real',
    type: 'video',
  },
  {
    id: 's-2',
    imageUrl: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=400',
    title: 'Comparador Multi-Sites',
    subtitle: '10+ sites ao mesmo tempo',
    type: 'video',
  },
  {
    id: 's-3',
    imageUrl: 'https://images.unsplash.com/photo-1609765685592-703a97c877ba?w=400',
    title: 'Calendário de Tarifas',
    subtitle: 'Visualize o mês inteiro',
    type: 'video',
  },
  {
    id: 's-4',
    imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
    title: 'Alerta de Erro de Tarifa',
    subtitle: 'Notificações instantâneas',
    type: 'video',
    locked: true,
  },
];

export interface Article {
  id: string;
  title: string;
  preview: string;
  content?: string;
}

export const articles: Article[] = [
  {
    id: 'a-1',
    title: '10 Erros que Fazem Você Pagar Mais nas Passagens',
    preview: 'Descubra os erros mais comuns que fazem você perder oportunidades de economizar centenas de reais em suas viagens.',
  },
  {
    id: 'a-2',
    title: 'Como Usar o Modo Anônimo Para Encontrar Preços Melhores',
    preview: 'Técnica comprovada para evitar que sites aumentem os preços baseados no seu histórico de busca.',
  },
];
