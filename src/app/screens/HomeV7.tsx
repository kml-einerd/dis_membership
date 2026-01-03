import React, { useState, useRef } from 'react';
import { Play, ChevronRight, ChevronLeft, Flame, Sparkles, MessageCircle, Lock, Crown, CheckCircle2, Users, Calendar, Zap, Download, TrendingUp, Gift, Star, Percent, Bell, Shield, ArrowRight } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import {
    GlassSurface,
    Button,
    Badge,
    ChipTabs,
} from '../../components/design-system';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/cn';
import { WhatsAppBannerV2 } from '../../components/banners/WhatsAppBannerV2';

// ==========================================
// V7 REVOLUTIONARY HOME - COMMAND CENTER
// ==========================================

const TRAVEL_IMAGES = {
    airplane1: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    airplane2: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800',
    beach1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    nyc: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    passport: 'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=800',
    miles: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
    tools1: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=800',
    tools2: 'https://images.unsplash.com/photo-1655722724447-2d2a3071e7f8?w=800',
    tools3: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=800',
    santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    clubBanner: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200',
};

const HERO_DATA = {
    backgroundImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920',
    title: 'Seu próximo destino',
    subtitle: 'te espera',
    tagline: 'Aprenda a viajar mais gastando menos',
};

const CONTINUE_DATA = {
    id: '1',
    imageUrl: TRAVEL_IMAGES.airplane1,
    title: 'O Segredo das Emissões Tabela Fixa',
    subtitle: 'Aula 3 de 8 • Módulo Avançado',
    progress: 50,
};

const CATEGORIES = ['Todas', 'Destinos', 'Técnicas', 'Milhas', 'Premium'];

// ==========================================
// COURSE TRACKS + EXTENSION CARDS MIXED
// ==========================================
const COURSE_TRACKS = {
    'Destinos': [
        { id: 'd1', type: 'course', imageUrl: TRAVEL_IMAGES.paris, title: 'Europa com R$ 200/dia', subtitle: '24 aulas', badge: 'Popular' },
        { id: 'd2', type: 'course', imageUrl: TRAVEL_IMAGES.bali, title: 'Sudeste Asiático', subtitle: '32 aulas', badge: 'Novo' },
        // EXTENSION CARD VARIANT 1: Simple with glow + border
        { id: 'ext-d1', type: 'extension', variant: 'simple', imageUrl: TRAVEL_IMAGES.tools1, title: 'Rastreador de Voos', subtitle: 'Alertas 24/7', icon: Bell, color: '#FF7E00', discount: 40 },
        { id: 'd3', type: 'course', imageUrl: TRAVEL_IMAGES.dubai, title: 'Dubai Luxuosa', subtitle: '16 aulas' },
        { id: 'd4', type: 'course', imageUrl: TRAVEL_IMAGES.tokyo, title: 'Japão Completo', subtitle: '30 aulas', locked: true },
        { id: 'd5', type: 'course', imageUrl: TRAVEL_IMAGES.maldives, title: 'Maldivas Acessível', subtitle: '18 aulas', locked: true },
        { id: 'd6', type: 'course', imageUrl: TRAVEL_IMAGES.nyc, title: 'Nova York Econômica', subtitle: '22 aulas' },
    ],
    'Técnicas': [
        { id: 't1', type: 'course', imageUrl: TRAVEL_IMAGES.airplane2, title: 'Passagens 70% OFF', subtitle: '36 aulas', badge: 'Bestseller' },
        // EXTENSION CARD VARIANT 2: With CTA button
        { id: 'ext-t1', type: 'extension', variant: 'cta', imageUrl: TRAVEL_IMAGES.tools2, title: 'Comparador PRO', subtitle: 'Compare 15+ sites', icon: TrendingUp, color: '#56E88A', ctaText: 'Testar Grátis' },
        { id: 't2', type: 'course', imageUrl: TRAVEL_IMAGES.passport, title: 'Erros de Tarifa', subtitle: '18 aulas', badge: 'Quente' },
        { id: 't3', type: 'course', imageUrl: TRAVEL_IMAGES.tools1, title: 'Multi-Destinos', subtitle: '24 aulas' },
        // EXTENSION CARD VARIANT 3: With discount badge
        { id: 'ext-t2', type: 'extension', variant: 'discount', imageUrl: TRAVEL_IMAGES.tools3, title: 'Pack Ferramentas', subtitle: '5 tools incluídas', icon: Gift, color: '#22F2EF', originalPrice: 'R$ 297', price: 'R$ 97', discount: 67 },
        { id: 't4', type: 'course', imageUrl: TRAVEL_IMAGES.tools2, title: 'Stopovers Gratuitos', subtitle: '12 aulas' },
    ],
    'Milhas': [
        { id: 'm1', type: 'course', imageUrl: TRAVEL_IMAGES.miles, title: 'Milhas do Zero', subtitle: '40 aulas', badge: 'Completo' },
        { id: 'm2', type: 'course', imageUrl: TRAVEL_IMAGES.airplane1, title: 'Acúmulo Acelerado', subtitle: '18 aulas' },
        // EXTENSION CARD VARIANT 4: Text-only with headline + icon
        { id: 'ext-m1', type: 'extension', variant: 'text', headline: 'Consultoria IA de Milhas', description: 'Nossa IA analisa seu perfil e sugere o melhor programa pra você', icon: Sparkles, color: '#A855F7' },
        { id: 'm3', type: 'course', imageUrl: TRAVEL_IMAGES.tools3, title: 'Resgate Inteligente', subtitle: '22 aulas', badge: 'Avançado' },
    ],
    'Premium': [
        { id: 'p1', type: 'course', imageUrl: TRAVEL_IMAGES.maldives, title: 'Executiva por R$ 2k', subtitle: '20 aulas', locked: true, badge: 'VIP' },
        // EXTENSION CARD: Wide combo card
        { id: 'ext-p1', type: 'extension', variant: 'combo', images: [TRAVEL_IMAGES.dubai, TRAVEL_IMAGES.maldives], title: 'Combo Milhas PRO: 2 Cursos', originalPrice: 'R$ 997', price: 'R$ 497', color: '#FF7E00' },
        { id: 'p2', type: 'course', imageUrl: TRAVEL_IMAGES.dubai, title: 'Primeira Classe', subtitle: '15 aulas', locked: true, badge: 'Exclusivo' },
        { id: 'p3', type: 'course', imageUrl: TRAVEL_IMAGES.paris, title: 'Hotéis 5 Estrelas', subtitle: '18 aulas', locked: true },
    ],
};

// Fixed bottom extensions
const FIXED_EXTENSIONS = [
    { id: 'fix1', variant: 'simple', imageUrl: TRAVEL_IMAGES.tools1, title: 'Alertas Push', subtitle: 'Promoções em tempo real', icon: Bell, color: '#FF7E00', discount: 50 },
    { id: 'fix2', variant: 'cta', imageUrl: TRAVEL_IMAGES.tools2, title: 'Chrome Extension', subtitle: 'Compare preços navegando', icon: Download, color: '#56E88A', ctaText: 'Instalar Grátis' },
    { id: 'fix3', variant: 'discount', imageUrl: TRAVEL_IMAGES.tools3, title: 'Consultor IA PRO', subtitle: 'Respostas ilimitadas', icon: Sparkles, color: '#22F2EF', originalPrice: 'R$ 197', price: 'R$ 47', discount: 76 },
    { id: 'fix4', variant: 'text', headline: 'Garantia Vitalícia', description: 'Acesso para sempre com atualizações inclusas', icon: Shield, color: '#A855F7' },
];

// ==========================================
// V7 FOCUS BAR - DARKER GLASS
// ==========================================
interface FocusBarProps {
    imageUrl: string;
    title: string;
    subtitle: string;
    progress: number;
    streakDays?: number;
    onClick: () => void;
}

function FocusBar({ imageUrl, title, subtitle, progress, streakDays = 0, onClick }: FocusBarProps) {
    return (
        <motion.button
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full group"
        >
            <div className={cn(
                "relative overflow-hidden",
                "backdrop-blur-xl bg-black/70",
                "border border-white/10 rounded-2xl lg:rounded-3xl",
                "p-4 lg:p-5",
                "transition-all duration-500",
                "hover:border-[var(--accent-primary)]/30",
                "hover:shadow-[var(--v7-accent-primary-glow)]"
            )}>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex items-center gap-4 lg:gap-5">
                    <div className="relative flex-shrink-0 w-16 h-12 lg:w-20 lg:h-14 rounded-xl overflow-hidden">
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-[var(--accent-primary)] group-hover:border-transparent transition-all duration-300">
                                <Play className="w-4 h-4 text-white ml-0.5 fill-current" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-white text-sm lg:text-base font-bold truncate group-hover:text-[var(--v7-accent-primary)] transition-colors">{title}</p>
                        <p className="text-white/50 text-xs lg:text-sm truncate">{subtitle}</p>
                    </div>

                    <div className="hidden sm:flex relative w-12 h-12 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                            <circle cx="24" cy="24" r="20" stroke="url(#focusProgressGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 20 * progress / 100} ${2 * Math.PI * 20}`} />
                            <defs>
                                <linearGradient id="focusProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--accent-primary)" />
                                    <stop offset="100%" stopColor="var(--accent-secondary)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{progress}%</span>
                        </div>
                    </div>

                    {streakDays > 0 && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-purchase-soft)] border border-[var(--accent-purchase-border)] rounded-full">
                            <Flame className="w-4 h-4 text-[var(--accent-purchase)]" />
                            <span className="text-[var(--accent-purchase)] text-xs font-bold">{streakDays} dias</span>
                        </div>
                    )}

                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
                    />
                </div>
            </div>
        </motion.button>
    );
}

// ==========================================
// EXTENSION CARD VARIANTS
// ==========================================

// VARIANT 1: Simple with glow + colored border
function ExtensionCardSimple({ item, onClick }: { item: any; onClick: () => void }) {
    const Icon = item.icon;
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 w-[160px] lg:w-[220px] snap-start group text-left"
        >
            <div
                className="relative overflow-hidden rounded-2xl transition-all duration-500"
                style={{
                    aspectRatio: '3/4',
                    border: `2px solid ${item.color}40`,
                    boxShadow: `0 0 30px ${item.color}20, inset 0 0 20px ${item.color}08`,
                }}
            >
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Discount Badge */}
                {item.discount && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg font-black text-xs text-white"
                        style={{ background: item.color }}>
                        -{item.discount}%
                    </div>
                )}

                {/* Icon */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.color}30`, border: `1px solid ${item.color}50` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white text-sm lg:text-base font-bold leading-tight mb-1">{item.title}</h4>
                    <p className="text-white/60 text-xs">{item.subtitle}</p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${item.color}15 0%, transparent 70%)` }} />
            </div>
        </motion.button>
    );
}

// VARIANT 2: With CTA Button
function ExtensionCardCTA({ item, onClick }: { item: any; onClick: () => void }) {
    const Icon = item.icon;
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 w-[160px] lg:w-[220px] snap-start group text-left"
        >
            <div
                className="relative overflow-hidden rounded-2xl transition-all duration-500 flex flex-col"
                style={{
                    aspectRatio: '3/4',
                    border: `2px solid ${item.color}40`,
                    boxShadow: `0 0 30px ${item.color}20`,
                }}
            >
                <img src={item.imageUrl} alt={item.title} className="w-full h-1/2 object-cover" />
                <div className="flex-1 p-4 flex flex-col justify-between" style={{ background: 'rgba(0,0,0,0.9)' }}>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}30` }}>
                                <Icon className="w-4 h-4" style={{ color: item.color }} />
                            </div>
                            <h4 className="text-white text-sm font-bold">{item.title}</h4>
                        </div>
                        <p className="text-white/60 text-xs">{item.subtitle}</p>
                    </div>
                    <div className="px-3 py-2 rounded-xl text-center text-xs font-bold transition-all"
                        style={{ background: item.color, color: '#000' }}>
                        {item.ctaText}
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// VARIANT 3: With Discount Badge + Prices
function ExtensionCardDiscount({ item, onClick }: { item: any; onClick: () => void }) {
    const Icon = item.icon;
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 w-[160px] lg:w-[220px] snap-start group text-left"
        >
            <div
                className="relative overflow-hidden rounded-2xl transition-all duration-500"
                style={{
                    aspectRatio: '3/4',
                    border: `2px solid ${item.color}40`,
                    boxShadow: `0 0 40px ${item.color}25, 0 0 80px ${item.color}10`,
                }}
            >
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Large Discount Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full font-black text-sm text-white"
                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
                    <Percent className="w-4 h-4" />
                    {item.discount}% OFF
                </div>

                {/* Icon */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-xl"
                    style={{ background: `${item.color}30`, border: `1px solid ${item.color}60` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white text-sm lg:text-base font-bold mb-1">{item.title}</h4>
                    <p className="text-white/60 text-xs mb-2">{item.subtitle}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-white/40 text-xs line-through">{item.originalPrice}</span>
                        <span className="font-black text-base" style={{ color: item.color }}>{item.price}</span>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// VARIANT 4: Text-only with Icon-Left Layout (V2 Design - Jobs philosophy)
function ExtensionCardText({ item, onClick }: { item: any; onClick: () => void }) {
    const Icon = item.icon;
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 w-[160px] lg:w-[220px] snap-start group text-left"
        >
            <div
                className="relative overflow-hidden rounded-2xl transition-all duration-500 p-4 lg:p-5 flex flex-col h-full"
                style={{
                    aspectRatio: '3/4',
                    border: `2px solid ${item.color}40`,
                    boxShadow: `0 0 30px ${item.color}20`,
                    background: `linear-gradient(180deg, ${item.color}10 0%, rgba(0,0,0,0.95) 100%)`,
                }}
            >
                {/* V2: Icon-Left Layout at Top */}
                <div className="flex items-start gap-3 mb-auto">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                        <h4 className="text-white text-sm lg:text-base font-black leading-tight mb-1">{item.headline}</h4>
                    </div>
                </div>

                {/* Description with benefits */}
                <div className="flex-1 flex flex-col justify-end mt-4">
                    <p className="text-white/60 text-xs leading-relaxed mb-3">{item.description}</p>

                    {/* Benefits bullets if provided */}
                    {item.benefits && (
                        <ul className="space-y-1.5 mb-3">
                            {item.benefits.slice(0, 3).map((benefit: string, i: number) => (
                                <li key={i} className="flex items-center gap-2 text-white/70 text-[10px]">
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Subtle CTA with arrow */}
                <div className="flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: item.color }}>
                    <span>Saiba mais</span>
                    <ArrowRight className="w-3 h-3" />
                </div>
            </div>
        </motion.button>
    );
}

// VARIANT 5: Combo Card - V2 with Single Banner (Jobs philosophy)
function ExtensionCardCombo({ item, onClick }: { item: any; onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 w-[280px] lg:w-[380px] snap-start group text-left"
        >
            <div
                className="relative overflow-hidden rounded-2xl transition-all duration-500"
                style={{
                    border: `2px solid ${item.color}50`,
                    boxShadow: `0 0 50px ${item.color}25, 0 0 100px ${item.color}10`,
                }}
            >
                {/* V2: Single Banner Image 16:9 */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img
                        src={item.images?.[0] || item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Urgency bar */}
                    {item.urgencyText && (
                        <div className="absolute top-0 left-0 right-0 py-1.5 px-3" style={{ background: item.color }}>
                            <div className="flex items-center justify-center gap-2">
                                <Zap className="w-3.5 h-3.5 text-black animate-pulse" />
                                <span className="text-black text-[10px] font-black uppercase tracking-wider">
                                    {item.urgencyText}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Discount badge */}
                    <div className="absolute top-3 right-3" style={{ marginTop: item.urgencyText ? '24px' : '0' }}>
                        <div className="px-2.5 py-1 rounded-lg font-black text-xs text-black" style={{ background: item.color }}>
                            -50% OFF
                        </div>
                    </div>

                    {/* Title on banner */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white text-lg lg:text-xl font-black leading-tight">{item.title}</h4>
                    </div>
                </div>

                {/* Content section */}
                <div className="p-4" style={{ background: 'rgba(0,0,0,0.95)' }}>
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-white/40 text-sm line-through">{item.originalPrice}</span>
                            <span className="font-black text-2xl" style={{ color: item.color }}>{item.price}</span>
                        </div>

                        {item.socialProof && (
                            <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                                <Users className="w-3.5 h-3.5" />
                                <span>{item.socialProof}</span>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="w-full py-3 rounded-xl text-center font-black text-sm uppercase tracking-wide transition-all"
                        style={{ background: item.color, color: '#000' }}>
                        Comprar Combo
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// Extension Card Router
function ExtensionCard({ item, onClick }: { item: any; onClick: () => void }) {
    switch (item.variant) {
        case 'simple': return <ExtensionCardSimple item={item} onClick={onClick} />;
        case 'cta': return <ExtensionCardCTA item={item} onClick={onClick} />;
        case 'discount': return <ExtensionCardDiscount item={item} onClick={onClick} />;
        case 'text': return <ExtensionCardText item={item} onClick={onClick} />;
        case 'combo': return <ExtensionCardCombo item={item} onClick={onClick} />;
        default: return <ExtensionCardSimple item={item} onClick={onClick} />;
    }
}

// ==========================================
// COURSE CARD (Normal)
// ==========================================
function CourseCard({ item, onClick }: { item: any; onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 w-[160px] lg:w-[220px] snap-start group text-left"
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl border transition-all duration-500",
                item.locked ? "border-[var(--accent-purchase)]/30 shadow-[0_0_20px_rgba(255,126,0,0.15)]" : "border-white/5 hover:border-[var(--accent-primary)]/20"
            )} style={{ aspectRatio: '3/4' }}>
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {item.locked && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[var(--accent-purchase)]/20 border-2 border-[var(--accent-purchase)]/50 flex items-center justify-center backdrop-blur-xl">
                            <Lock className="w-6 h-6 text-[var(--accent-purchase)]" />
                        </div>
                    </div>
                )}

                {item.badge && (
                    <div className="absolute top-3 left-3">
                        <Badge variant={item.locked ? "locked" : "primary"} className={cn(
                            "text-[10px] font-black",
                            item.locked ? "bg-[var(--accent-purchase)] text-white border-none" : "bg-[var(--accent-primary)] text-black border-none"
                        )}>
                            {item.badge}
                        </Badge>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className={cn(
                        "text-sm lg:text-base font-bold leading-tight mb-1 line-clamp-2 transition-colors",
                        item.locked ? "text-white/70" : "text-white group-hover:text-[var(--accent-primary)]"
                    )}>
                        {item.title}
                    </h4>
                    <p className="text-white/50 text-xs">{item.subtitle}</p>
                </div>
            </div>
        </motion.button>
    );
}

// ==========================================
// CAROUSEL ROW
// ==========================================
function CarouselRow({ title, items, onItemClick }: { title: string; items: any[]; onItemClick: (item: any) => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    return (
        <div className="relative">
            <h3 className="text-white/80 text-xs lg:text-sm font-black uppercase tracking-[0.2em] mb-4 px-4 lg:px-0">{title}</h3>

            <div className="relative group/carousel">
                <AnimatePresence>
                    {showLeftArrow && (
                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-black/80 hover:border-white/20 transition-all hidden lg:flex">
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showRightArrow && (
                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-black/80 hover:border-white/20 transition-all hidden lg:flex">
                            <ChevronRight className="w-6 h-6 text-white" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <div ref={scrollRef} onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-4 lg:px-0 snap-x snap-mandatory"
                    style={{ scrollPaddingLeft: '16px' }}>
                    {items.map((item) => (
                        item.type === 'extension' ? (
                            <ExtensionCard key={item.id} item={item} onClick={() => onItemClick(item)} />
                        ) : (
                            <CourseCard key={item.id} item={item} onClick={() => onItemClick(item)} />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}

// ==========================================
// WHATSAPP BANNER V2 WRAPPER
// Novo componente modular com design premium
// ==========================================

function WhatsAppLiveBanner() {
    return (
        <section className="px-4 lg:px-8 pb-8">
            <div className="max-w-[var(--v7-max-content)] mx-auto">
                <WhatsAppBannerV2
                    imageUrl={TRAVEL_IMAGES.clubBanner}
                    headline="Participe da Live do"
                    highlightText="Clube de Viagens"
                    description="Dúvidas ao vivo, ofertas secretas e técnicas exclusivas para membros VIP."
                    memberCount="2.847"
                    schedule="Toda quinta 20h"
                    ctaText="Entrar no Grupo VIP"
                    whatsappUrl="https://wa.me/5511999999999"
                />
            </div>
        </section>
    );
}

// ==========================================
// WHATSAPP FLOATING BUTTON
// ==========================================
function WhatsAppFloatingButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
            className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50"
        >
            <motion.button
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20c55e] text-white rounded-full shadow-lg transition-all duration-300"
                style={{ padding: isHovered ? '12px 20px 12px 16px' : '16px', boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' }}
            >
                <MessageCircle className="w-6 h-6" />
                <AnimatePresence>
                    {isHovered && (
                        <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
                            className="text-sm font-bold whitespace-nowrap overflow-hidden">
                            Grupo VIP
                        </motion.span>
                    )}
                </AnimatePresence>
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            </motion.button>
        </motion.div>
    );
}

// ==========================================
// MAIN COMPONENT: HomeV7
// ==========================================
export default function HomeV7() {
    const { navigate } = useNavigation();
    const [activeCategory, setActiveCategory] = useState('Todas');

    const getFilteredCourses = () => {
        if (activeCategory === 'Todas') {
            return Object.entries(COURSE_TRACKS);
        }
        const tracks = COURSE_TRACKS[activeCategory as keyof typeof COURSE_TRACKS];
        return tracks ? [[activeCategory, tracks]] : [];
    };

    const handleItemClick = (item: any) => {
        if (item.type === 'extension') {
            navigate('store');
        } else if (item.locked) {
            navigate('locked-preview');
        } else {
            navigate('course-detail');
        }
    };

    return (
        <VeloxLayout>
            {/* ZONE 1: HERO */}
            <section className="relative h-[var(--v7-hero-height-mobile)] lg:h-[var(--v7-hero-height-desktop)]">
                <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }} className="absolute inset-0">
                    <img src={HERO_DATA.backgroundImage} alt="Hero background" className="w-full h-full object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)] via-[var(--app-bg)]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--app-bg)]/40 to-transparent" />
                <div className="absolute inset-0" style={{ background: 'var(--v7-gradient-hero)' }} />

                <div className="absolute inset-0 flex flex-col justify-end pb-8 lg:pb-12 px-4 lg:px-8">
                    <div className="max-w-[var(--v7-max-content)] mx-auto w-full">
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }} className="mb-6 lg:mb-8">
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
                                {HERO_DATA.title}<br />
                                <span className="text-[var(--v7-accent-primary)]">{HERO_DATA.subtitle}</span>
                            </h1>
                            <p className="text-white/60 text-sm lg:text-lg mt-4 lg:mt-6 max-w-lg">{HERO_DATA.tagline}</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className="max-w-2xl">
                            <FocusBar imageUrl={CONTINUE_DATA.imageUrl} title={CONTINUE_DATA.title} subtitle={CONTINUE_DATA.subtitle} progress={CONTINUE_DATA.progress} streakDays={7} onClick={() => navigate('video-lesson')} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ZONE 2: CATEGORY FILTERS */}
            <section className="py-6 lg:py-10 px-4 lg:px-8">
                <div className="max-w-[var(--v7-max-content)] mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                        <ChipTabs tabs={CATEGORIES} activeTab={activeCategory} onChange={setActiveCategory} />
                    </motion.div>
                </div>
            </section>

            {/* ZONE 3: COURSE TRACKS + EXTENSION CARDS MIXED */}
            <section className="space-y-10 lg:space-y-14">
                {getFilteredCourses().map(([category, items], trackIndex) => (
                    <motion.div key={category as string} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: trackIndex * 0.1, duration: 0.5 }}>
                        <div className="max-w-[var(--v7-max-content)] mx-auto">
                            <CarouselRow title={category as string} items={items as any[]} onItemClick={handleItemClick} />
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* ZONE 4: FIXED EXTENSIONS ROW */}
            <section className="py-10 lg:py-14">
                <div className="max-w-[var(--v7-max-content)] mx-auto">
                    <CarouselRow
                        title="🔥 Extensões Premium"
                        items={FIXED_EXTENSIONS.map(ext => ({ ...ext, type: 'extension' }))}
                        onItemClick={(item) => navigate('store')}
                    />
                </div>
            </section>

            {/* ZONE 5: WHATSAPP + LIVE BANNER */}
            <WhatsAppLiveBanner />

            <div className="h-20 lg:h-10" />
            <WhatsAppFloatingButton />
        </VeloxLayout>
    );
}
