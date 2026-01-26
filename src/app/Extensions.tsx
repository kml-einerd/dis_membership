import React, { useState } from 'react';
import {
    Download, Zap, Bell, Crown, Star, Shield, ChevronRight, Check,
    Sparkles, Gift, Timer, Users, ArrowRight, Lock, Flame, Package, Percent as Percentage
} from 'lucide-react';
import { VeloxLayout } from './components/layout/VeloxLayout';
import {
    GlassSurface,
    Button,
    Badge,
    Progress,
} from './components/design-system';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils/cn';
import { useNavigation } from './App';

// ==========================================
// V7 EXTENSIONS - UPSELL & ORDER BUMP OPTIMIZED
// Philosophy: High-Converting Funnel Design
// Focus: Urgency, Scarcity, Social Proof, Value Stack
// ==========================================

// ==========================================
// UPSELL PRODUCTS - Main Revenue Drivers
// ==========================================
const MAIN_UPSELL = {
    id: 'bundle-master',
    title: 'Pack Completo Viajante PRO',
    subtitle: 'Tudo que você precisa para viajar pagando até 70% menos',
    originalPrice: 497,
    price: 97,
    discount: 80,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    features: [
        { text: 'Rastreador de Preços Premium', included: true },
        { text: 'Alerta Erro de Tarifa 24/7', included: true },
        { text: 'Calculadora de Milhas IA', included: true },
        { text: 'Comparador Multi-Sites (15+)', included: true },
        { text: 'Planilha Automática de Viagens', included: true },
        { text: 'Suporte VIP Prioritário', included: true },
    ],
    urgency: '⚡ Oferta expira em 23:59:47',
    socialProof: '1.847 pessoas adquiriram hoje',
};

// ==========================================
// COMBO ITEMS - "Monte seu Combo"
// ==========================================
const COMBO_ITEMS = [
    {
        id: 'bump-1',
        title: 'Extensão Chrome Premium',
        subtitle: 'O "Cérebro" do Viajante no seu Browser',
        description: 'Não perca tempo abrindo 10 abas. Nossa extensão analisa a página da cia aérea em tempo real e diz se o preço está bom ou não.',
        price: 27,
        originalPrice: 47,
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
        features: [
            'Análise de preço em tempo real',
            'Histórico de alterações (30 dias)',
            'Aplicação automática de cupons'
        ],
        icon: Download,
        popular: true,
    },
    {
        id: 'bump-2',
        title: 'Alertas Push Ilimitados',
        subtitle: 'Velocidade é quem manda no jogo',
        description: 'As melhores tarifas duram minutos. Receba notificações instantâneas no seu celular antes que o bug seja corrigido.',
        price: 17,
        originalPrice: 29,
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d87?w=800&q=80',
        features: [
            'Notificações Instantâneas (WhatsApp)',
            'Filtros personalizados de origem',
            'Prioridade na fila de envio'
        ],
        icon: Bell,
        popular: false,
    },
    {
        id: 'bump-3',
        title: 'Kit Nômade Digital',
        subtitle: 'Trabalhe de qualquer lugar',
        description: 'Guia completo com os melhores destinos baratos, coworkings, internet e vistos para quem quer viver viajando.',
        price: 19,
        originalPrice: 37,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        features: [
            'E-book: 101 Destinos Baratos',
            'Planilha de Custos de Vida',
            'Comunidade de Nômades'
        ],
        icon: Gift,
        popular: false,
    },
];

// ==========================================
// V7 COMBO CARD - "Tome" Style
// ==========================================
interface ComboItemCardProps {
    item: typeof COMBO_ITEMS[0];
    isSelected: boolean;
    onToggle: () => void;
    index: number;
}

function ComboItemCard({ item, isSelected, onToggle, index }: ComboItemCardProps) {
    const Icon = item.icon;

    return (
        <motion.button
            onClick={onToggle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="w-full text-left group"
        >
            <div className={cn(
                "relative overflow-hidden rounded-3xl transition-all duration-500",
                "bg-[#0f172a] border",
                isSelected
                    ? "border-[var(--accent-primary)] shadow-[0_0_30px_-5px_rgba(86,232,138,0.3)]"
                    : "border-white/5 hover:border-white/20 hover:bg-[#15203b]"
            )}>
                {/* Selection Indicator - Premium Style */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--accent-primary)] to-transparent opacity-0 transition-opacity duration-300"
                    style={{ opacity: isSelected ? 1 : 0 }} />

                <div className="flex flex-col md:flex-row">
                    {/* Visual Section */}
                    <div className="relative md:w-48 h-48 md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r" />
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Popular Badge */}
                        {item.popular && (
                            <div className="absolute top-3 left-3 bg-[var(--accent-purchase)] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                                Mais Escolhido
                            </div>
                        )}

                        {/* Mobile Checkbox Overlay */}
                        <div className="absolute top-3 right-3 md:hidden">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-sm",
                                isSelected
                                    ? "bg-[var(--accent-primary)] text-black"
                                    : "bg-black/50 text-white/50 border border-white/20"
                            )}>
                                {isSelected ? <Check className="w-5 h-5" /> : <div className="w-5 h-5" />}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                                <h3 className="text-white text-lg font-bold mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-wider mb-2">
                                    {item.subtitle}
                                </p>
                            </div>

                            {/* Desktop Price */}
                            <div className="hidden md:block text-right">
                                <p className="text-white/40 text-sm line-through">R$ {item.originalPrice}</p>
                                <p className="text-white text-2xl font-black">R$ {item.price}</p>
                            </div>
                        </div>

                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                            {item.description}
                        </p>

                        {/* Features Bullet Points */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4">
                            {item.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                                    <span className="text-white/70 text-xs font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Price & Desktop Action */}
                        <div className="flex items-center justify-between mt-auto md:hidden pt-4 border-t border-white/5">
                            <div>
                                <p className="text-white/40 text-xs line-through">R$ {item.originalPrice}</p>
                                <p className="text-white text-xl font-black">R$ {item.price}</p>
                            </div>
                            <div className={cn(
                                "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                                isSelected
                                    ? "bg-[var(--accent-primary)] text-black"
                                    : "bg-white/10 text-white"
                            )}>
                                {isSelected ? 'Adicionado' : 'Adicionar'}
                            </div>
                        </div>

                        {/* Desktop Checkbox/Action Area */}
                        <div className="hidden md:flex items-center justify-end gap-3 mt-2">
                            <span className={cn(
                                "text-sm font-medium transition-colors",
                                isSelected ? "text-[var(--accent-primary)]" : "text-white/40"
                            )}>
                                {isSelected ? 'Item selecionado no combo' : 'Clique para adicionar ao combo'}
                            </span>
                            <div className={cn(
                                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                isSelected
                                    ? "bg-[var(--accent-primary)] border-[var(--accent-primary)]"
                                    : "border-white/20"
                            )}>
                                {isSelected && <Check className="w-4 h-4 text-black" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// ==========================================
// INDIVIDUAL EXTENSIONS
// ==========================================
const EXTENSIONS = [
    {
        id: 'ext-1',
        title: 'Rastreador de Preços',
        description: 'Alertas em tempo real no WhatsApp',
        price: 0,
        status: 'free',
        icon: Bell,
        color: 'primary',
    },
    {
        id: 'ext-2',
        title: 'Comparador Premium',
        description: 'Compare 15+ sites simultaneamente',
        price: 29,
        originalPrice: 49,
        status: 'paid',
        icon: Zap,
        color: 'purchase',
        badge: '-40%',
    },
    {
        id: 'ext-3',
        title: 'Alerta Erro de Tarifa',
        description: 'Seja o primeiro a saber das ofertas',
        price: 47,
        status: 'locked',
        icon: Flame,
        color: 'premium',
        badge: 'VIP',
    },
    {
        id: 'ext-4',
        title: 'Consultor de Milhas IA',
        description: 'Otimize suas milhas automaticamente',
        price: 67,
        status: 'locked',
        icon: Sparkles,
        color: 'secondary',
        badge: 'NOVO',
    },
];

// ==========================================
// SOCIAL PROOF ITEMS
// ==========================================
const TESTIMONIALS = [
    { name: 'Maria S.', text: 'Economizei R$ 4.200 na minha primeira viagem!', rating: 5 },
    { name: 'João P.', text: 'O alerta de erro de tarifa se paga no primeiro uso', rating: 5 },
    { name: 'Ana C.', text: 'Consegui passagem SP-Paris por R$ 1.800', rating: 5 },
];

// ==========================================
// V7 HERO UPSELL BANNER
// ==========================================
function HeroUpsellBanner({ onNavigate }: { onNavigate: (route: string) => void }) {
    const [timeLeft] = useState({ hours: 23, minutes: 59, seconds: 47 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <GlassSurface
                variant="surface-3"
                blur="heavy"
                glow
                glowColor="var(--accent-purchase)"
                borderGradient="purchase"
                className="relative overflow-hidden rounded-3xl"
            >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purchase)]/10 via-transparent to-[var(--accent-premium)]/10" />

                {/* Urgency bar */}
                <div className="relative z-10 bg-[var(--accent-purchase)] px-4 py-2.5 flex items-center justify-center gap-3">
                    <Timer className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-white text-sm font-black tracking-wide">
                        {MAIN_UPSELL.urgency}
                    </span>
                </div>

                <div className="relative z-10 p-5 lg:p-12">
                    <div className="lg:flex lg:items-center lg:gap-10">
                        {/* Image */}
                        <div className="hidden lg:block flex-shrink-0 w-56 h-56 rounded-2xl overflow-hidden ring-4 ring-white/10">
                            <img
                                src={MAIN_UPSELL.image}
                                alt={MAIN_UPSELL.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-premium)]/20 border border-[var(--accent-premium)]/40 rounded-full mb-4">
                                <Crown className="w-4 h-4 text-[var(--accent-premium)]" />
                                <span className="text-[var(--accent-premium)] text-xs font-black uppercase tracking-wider">
                                    Oferta Especial
                                </span>
                            </div>

                            <h2 className="text-white text-2xl lg:text-3xl font-black mb-2 tracking-tight">
                                {MAIN_UPSELL.title}
                            </h2>
                            <p className="text-white/60 text-sm lg:text-base mb-6">
                                {MAIN_UPSELL.subtitle}
                            </p>

                            {/* Features List */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {MAIN_UPSELL.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-[var(--accent-primary)]" />
                                        </div>
                                        <span className="text-white/80 text-xs lg:text-sm">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="flex flex-wrap items-end gap-4 mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-white/40 text-lg line-through">
                                        R$ {MAIN_UPSELL.originalPrice}
                                    </span>
                                    <span className="text-white text-3xl lg:text-6xl font-black">
                                        R$ {MAIN_UPSELL.price}
                                    </span>
                                </div>
                                <Badge variant="discount" className="text-sm font-black">
                                    -{MAIN_UPSELL.discount}% OFF
                                </Badge>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] ring-2 ring-[var(--app-bg)]" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-1 text-white/60 text-sm">
                                    <Users className="w-4 h-4" />
                                    {MAIN_UPSELL.socialProof}
                                </div>
                            </div>

                            {/* CTA */}
                            <Button
                                variant="purchase"
                                size="lg"
                                fullWidth
                                onClick={() => onNavigate('sales-video')}
                                className="lg:w-auto lg:px-10 font-black tracking-wide shadow-2xl shadow-orange-500/30"
                            >
                                QUERO ECONOMIZAR AGORA
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </GlassSurface>
        </motion.div>
    );
}

// ==========================================
// V7 EXTENSION CARD
// ==========================================
interface ExtensionCardProps {
    extension: typeof EXTENSIONS[0];
    index: number;
    onNavigate: (route: string) => void;
}

function ExtensionCard({ extension, index, onNavigate }: ExtensionCardProps) {
    const Icon = extension.icon;

    const colors = {
        primary: { bg: 'var(--accent-primary-soft)', border: 'var(--accent-primary-border)', text: 'var(--accent-primary)' },
        secondary: { bg: 'var(--accent-secondary-soft)', border: 'var(--accent-secondary-border)', text: 'var(--accent-secondary)' },
        purchase: { bg: 'var(--accent-purchase-soft)', border: 'var(--accent-purchase-border)', text: 'var(--accent-purchase)' },
        premium: { bg: 'var(--accent-premium-soft)', border: 'var(--accent-premium-border)', text: 'var(--accent-premium)' },
    };
    const color = colors[extension.color as keyof typeof colors];

    return (
        <motion.button
            onClick={() => onNavigate(extension.status === 'locked' ? 'locked-preview' : 'sales-video')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full text-left"
        >
            <GlassSurface
                variant={extension.status === 'locked' ? "surface-3" : "surface-2"}
                blur="medium"
                glow={extension.status === 'locked'}
                glowColor={color.text}
                className="p-5 rounded-2xl transition-all duration-500"
            >
                {/* Badge */}
                {extension.badge && (
                    <div className="absolute top-4 right-4">
                        <Badge
                            variant={extension.status === 'locked' ? 'locked' : 'discount'}
                            className={cn(
                                "text-[10px] font-black",
                                extension.status !== 'locked' && "bg-[var(--accent-purchase)] text-white"
                            )}
                        >
                            {extension.badge}
                        </Badge>
                    </div>
                )}

                {/* Icon */}
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: color.bg, border: `1px solid ${color.border}` }}
                >
                    {extension.status === 'locked' ? (
                        <Lock className="w-6 h-6" style={{ color: color.text }} />
                    ) : (
                        <Icon className="w-6 h-6" style={{ color: color.text }} />
                    )}
                </div>

                {/* Content */}
                <h4 className={cn(
                    "text-base font-bold mb-1",
                    extension.status === 'locked' ? "text-white/60" : "text-white"
                )}>
                    {extension.title}
                </h4>
                <p className="text-white/40 text-sm mb-4">{extension.description}</p>

                {/* Price/Status */}
                <div className="flex items-center justify-between">
                    {extension.status === 'free' ? (
                        <span className="text-[var(--accent-primary)] font-black">Grátis</span>
                    ) : extension.status === 'locked' ? (
                        <span className="text-[var(--accent-purchase)] font-black">R$ {extension.price}/mês</span>
                    ) : (
                        <div className="flex items-baseline gap-2">
                            <span className="text-white/40 text-sm line-through">R$ {extension.originalPrice}</span>
                            <span className="text-white font-black">R$ {extension.price}</span>
                        </div>
                    )}
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all" />
                </div>
            </GlassSurface>
        </motion.button>
    );
}

// ==========================================
// V7 TESTIMONIALS SECTION
// ==========================================
function TestimonialsSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
        >
            <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[var(--accent-premium)]" />
                <span className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">
                    O que nossos alunos dizem
                </span>
            </div>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {TESTIMONIALS.map((testimonial, index) => (
                    <GlassSurface
                        key={index}
                        variant="surface-1"
                        blur="light"
                        className="flex-shrink-0 w-[280px] p-4 rounded-2xl"
                    >
                        <div className="flex items-center gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-[var(--accent-premium)] fill-current" />
                            ))}
                        </div>
                        <p className="text-white/80 text-sm italic mb-3">"{testimonial.text}"</p>
                        <p className="text-white/40 text-xs font-bold">{testimonial.name}</p>
                    </GlassSurface>
                ))}
            </div>
        </motion.section>
    );
}

// ==========================================
// MAIN COMPONENT: ExtensionsV7
// ==========================================
export default function ExtensionsV7() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Handler para navegação
    const { navigate, currentScreen } = useNavigation();

    const handleNavigate = (route: string) => {
        navigate(route);
    };

    const toggleItem = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const totalComboPrice = COMBO_ITEMS
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.price, 0);

    const totalOriginalPrice = COMBO_ITEMS
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.originalPrice, 0);

    const totalSavings = totalOriginalPrice - totalComboPrice;

    return (
        <VeloxLayout
            currentTab={currentScreen as any}
            onNavigateTab={(tab) => navigate(tab)}
            onNavigate={(route) => navigate(route)}
        >
            <div className="px-4 lg:px-8 py-6 lg:py-10 pb-24 lg:pb-10">
                <div className="max-w-[var(--v7-max-content)] mx-auto">

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 lg:mb-8"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-[var(--accent-purchase-soft)] border border-[var(--accent-purchase-border)] flex items-center justify-center">
                                <Package className="w-5 h-5 text-[var(--accent-purchase)]" />
                            </div>
                            <h1 className="text-white text-3xl lg:text-5xl font-black tracking-tight">
                                Conteúdo Extra
                            </h1>
                        </div>
                        <p className="text-white/50 text-sm lg:text-lg">
                            Ferramentas poderosas para maximizar sua economia
                        </p>
                    </motion.div>

                    {/* Hero Upsell Banner */}
                    <HeroUpsellBanner onNavigate={handleNavigate} />

                    {/* "Monte seu Combo" Section - Redesigned as Boxed Full Width */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <GlassSurface
                            variant="surface-2"
                            blur="medium"
                            borderGradient="primary"
                            className="relative overflow-hidden rounded-3xl p-1"
                        >
                            {/* Header Section of the Box */}
                            <div className="bg-white/5 rounded-t-[20px] p-4 md:p-6 pb-4 border-b border-white/5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h2 className="text-white text-lg md:text-xl font-black flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-[var(--accent-primary)] mb-1" />
                                        Monte seu Combo
                                    </h2>
                                    <Badge variant="discount" className="text-[10px] font-bold self-start sm:self-auto">
                                        OFERTA LIMITADA
                                    </Badge>
                                </div>
                                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-2xl">
                                    Adicione itens essenciais ao seu pedido e economize até 40% agora.
                                    Seleção curada para acelerar seus resultados.
                                </p>
                            </div>

                            {/* List of Compact Items */}
                            <div className="p-4 space-y-3 bg-[#0a1018]/50">
                                {COMBO_ITEMS.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => toggleItem(item.id)}
                                        whileHover={{ scale: 1.005 }}
                                        whileTap={{ scale: 0.99 }}
                                        className={cn(
                                            "w-full flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 text-left relative overflow-hidden",
                                            selectedItems.includes(item.id)
                                                ? "bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]"
                                                : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                        )}
                                    >
                                        {item.popular && (
                                            <div className="absolute top-0 right-0 bg-[var(--accent-purchase)] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
                                                Popular
                                            </div>
                                        )}

                                        {/* Checkbox */}
                                        <div className={cn(
                                            "flex-shrink-0 w-7 h-7 rounded-md border-2 flex items-center justify-center transition-colors",
                                            selectedItems.includes(item.id)
                                                ? "bg-[var(--accent-primary)] border-[var(--accent-primary)]"
                                                : "border-white/20 group-hover:border-white/40"
                                        )}>
                                            {selectedItems.includes(item.id) && <Check className="w-4 h-4 text-black stroke-[3]" />}
                                        </div>

                                        {/* Thumbnail/Icon */}
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cover bg-center border border-white/10"
                                            style={{ backgroundImage: `url(${item.image})` }}>
                                        </div>

                                        {/* info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className={cn(
                                                "text-sm font-bold truncate transition-colors",
                                                selectedItems.includes(item.id) ? "text-white" : "text-white/90"
                                            )}>
                                                {item.title}
                                            </h4>
                                            <p className="text-white/50 text-xs truncate pr-4">
                                                {item.subtitle}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="flex-shrink-0 text-right">
                                            <div className="text-white/40 text-[10px] line-through">
                                                R$ {item.originalPrice}
                                            </div>
                                            <div className="text-[var(--accent-primary)] text-base font-black">
                                                R$ {item.price}
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Footer / Summary Action - Integrated into the Box */}
                            <AnimatePresence>
                                {selectedItems.length > 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-white/10 bg-white/5"
                                    >
                                        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                                                    <Percentage className="w-5 h-5 text-[var(--accent-primary)]" />
                                                </div>
                                                <div>
                                                    <div className="text-white text-sm font-bold">
                                                        Economia Total: <span className="text-[var(--accent-primary)]">R$ {totalSavings}</span>
                                                    </div>
                                                    <div className="text-white/50 text-xs">
                                                        {selectedItems.length} itens selecionados
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                variant="purchase"
                                                size="lg"
                                                onClick={() => handleNavigate('sales-video')}
                                                className="w-full sm:w-auto font-black shadow-lg shadow-green-500/20"
                                            >
                                                Adicionar ao Combo (+R$ {totalComboPrice})
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </GlassSurface>
                    </motion.section>

                    {/* Testimonials */}
                    <TestimonialsSection />

                    {/* Individual Extensions Grid */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-5 h-5 text-[var(--accent-secondary)]" />
                            <span className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">
                                Extensões individuais
                            </span>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {EXTENSIONS.map((extension, index) => (
                                <ExtensionCard
                                    key={extension.id}
                                    extension={extension}
                                    index={index}
                                    onNavigate={handleNavigate}
                                />
                            ))}
                        </div>
                    </motion.section>

                    {/* Bottom CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <GlassSurface
                            variant="surface-2"
                            blur="medium"
                            className="p-6 rounded-3xl text-center"
                        >
                            <Shield className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-4" />
                            <h3 className="text-white text-lg font-black mb-2">
                                Garantia Incondicional de 30 Dias
                            </h3>
                            <p className="text-white/50 text-sm max-w-md mx-auto">
                                Se você não economizar pelo menos o valor investido na primeira viagem, devolvemos 100% do seu dinheiro.
                            </p>
                        </GlassSurface>
                    </motion.section>
                </div>
            </div>
        </VeloxLayout>
    );
}
