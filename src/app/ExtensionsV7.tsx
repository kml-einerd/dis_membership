import React, { useState } from 'react';
import {
    Download, Zap, Bell, Crown, Star, Shield, ChevronRight, Check,
    Sparkles, Gift, Timer, Users, ArrowRight, Lock, Flame, Package
} from 'lucide-react';
import { useNavigation } from './navigation/NavigationContext';
import { VeloxLayout } from '../components/layout/VeloxLayout';
import {
    GlassSurface,
    Button,
    Badge,
    Progress,
} from '../components/design-system';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/cn';

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
// ORDER BUMPS - Quick Add-ons
// ==========================================
const ORDER_BUMPS = [
    {
        id: 'bump-1',
        title: 'Extensão Chrome Premium',
        description: 'Compare preços em tempo real enquanto navega',
        price: 27,
        originalPrice: 47,
        icon: Download,
        popular: true,
    },
    {
        id: 'bump-2',
        title: 'Alertas Push Ilimitados',
        description: 'Notificações instantâneas no celular 24/7',
        price: 17,
        originalPrice: 29,
        icon: Bell,
        popular: false,
    },
    {
        id: 'bump-3',
        title: 'E-book: 101 Destinos Baratos',
        description: 'Guia completo + orçamentos reais detalhados',
        price: 19,
        originalPrice: 37,
        icon: Gift,
        popular: false,
    },
];

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
function HeroUpsellBanner() {
    const { navigate } = useNavigation();
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

                <div className="relative z-10 p-6 lg:p-10">
                    <div className="lg:flex lg:items-center lg:gap-10">
                        {/* Image */}
                        <div className="hidden lg:block flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-white/10">
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
                                    <span className="text-white text-4xl lg:text-5xl font-black">
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
                                onClick={() => navigate('sales-video')}
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
// V7 ORDER BUMP CARD
// ==========================================
interface OrderBumpCardProps {
    bump: typeof ORDER_BUMPS[0];
    isSelected: boolean;
    onToggle: () => void;
    index: number;
}

function OrderBumpCard({ bump, isSelected, onToggle, index }: OrderBumpCardProps) {
    const Icon = bump.icon;

    return (
        <motion.button
            onClick={onToggle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left"
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl p-4 transition-all duration-300",
                "border-2",
                isSelected
                    ? "bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]"
                    : "bg-[var(--v7-glass-2)] border-white/5 hover:border-white/20"
            )}>
                {/* Popular badge */}
                {bump.popular && (
                    <div className="absolute top-0 right-0 bg-[var(--accent-purchase)] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                        Mais Popular
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <div className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                        isSelected
                            ? "bg-[var(--accent-primary)] border-[var(--accent-primary)]"
                            : "border-white/20"
                    )}>
                        {isSelected && <Check className="w-4 h-4 text-black" />}
                    </div>

                    {/* Icon */}
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)]"
                    )}>
                        <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white text-sm font-bold truncate">{bump.title}</h4>
                            <span className="text-[var(--accent-purchase)] text-xs font-black">
                                -{Math.round((1 - bump.price / bump.originalPrice) * 100)}%
                            </span>
                        </div>
                        <p className="text-white/50 text-xs truncate">{bump.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                        <p className="text-white/40 text-xs line-through">R$ {bump.originalPrice}</p>
                        <p className="text-white text-lg font-black">R$ {bump.price}</p>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// ==========================================
// V7 EXTENSION CARD
// ==========================================
interface ExtensionCardProps {
    extension: typeof EXTENSIONS[0];
    index: number;
}

function ExtensionCard({ extension, index }: ExtensionCardProps) {
    const { navigate } = useNavigation();
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
            onClick={() => navigate(extension.status === 'locked' ? 'locked-preview' : 'sales-video')}
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
    const { navigate } = useNavigation();
    const [selectedBumps, setSelectedBumps] = useState<string[]>([]);

    const toggleBump = (bumpId: string) => {
        setSelectedBumps(prev =>
            prev.includes(bumpId)
                ? prev.filter(id => id !== bumpId)
                : [...prev, bumpId]
        );
    };

    const totalBumpPrice = ORDER_BUMPS
        .filter(bump => selectedBumps.includes(bump.id))
        .reduce((acc, bump) => acc + bump.price, 0);

    return (
        <VeloxLayout>
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
                                Extensões
                            </h1>
                        </div>
                        <p className="text-white/50 text-sm lg:text-lg">
                            Ferramentas poderosas para maximizar sua economia
                        </p>
                    </motion.div>

                    {/* Hero Upsell Banner */}
                    <HeroUpsellBanner />

                    {/* Order Bumps Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Gift className="w-5 h-5 text-[var(--accent-primary)]" />
                                <span className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">
                                    Adicione ao seu pedido
                                </span>
                            </div>
                            {selectedBumps.length > 0 && (
                                <span className="text-[var(--accent-primary)] text-sm font-bold">
                                    +R$ {totalBumpPrice}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            {ORDER_BUMPS.map((bump, index) => (
                                <OrderBumpCard
                                    key={bump.id}
                                    bump={bump}
                                    isSelected={selectedBumps.includes(bump.id)}
                                    onToggle={() => toggleBump(bump.id)}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Checkout Summary */}
                        {selectedBumps.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4"
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    onClick={() => navigate('sales-video')}
                                    className="font-black"
                                >
                                    Adicionar {selectedBumps.length} {selectedBumps.length === 1 ? 'item' : 'itens'} • R$ {totalBumpPrice}
                                </Button>
                            </motion.div>
                        )}
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
                                <ExtensionCard key={extension.id} extension={extension} index={index} />
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
