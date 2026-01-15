import React, { useState, useEffect } from 'react';
import {
    Lock, Timer, Sparkles, Crown, Zap, ArrowRight,
    ChevronRight, Download, Bell, Users, Star, Gift,
    Clock
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { GlassSurface } from './GlassSurface';
import { Button } from './Button';
import { Badge } from './Badge';
import { motion } from 'motion/react';

// ============================================
// EXTENSIONCARDV2 - JOBS + MUSK PHILOSOPHY
// "Make it simple. Make it convert."
// ============================================

// ============================================
// SHARED TYPES & INTERFACES
// ============================================
interface BaseCardProps {
    title: string;
    subtitle?: string;
    onClick?: () => void;
    className?: string;
}

// ============================================
// VARIANT 1: BANNER CARD
// Full-width image with premium gradient overlay
// Philosophy: "One image. One message. One action."
// ============================================
interface BannerCardProps extends BaseCardProps {
    imageUrl: string;
    badge?: string;
    badgeVariant?: 'discount' | 'premium' | 'new' | 'hot';
    originalPrice?: string;
    discountedPrice?: string;
    ctaText?: string;
    socialProof?: string;
    urgencyText?: string;
}

export function BannerCard({
    imageUrl,
    title,
    subtitle,
    badge,
    badgeVariant = 'discount',
    originalPrice,
    discountedPrice,
    ctaText = 'QUERO AGORA',
    socialProof,
    urgencyText,
    onClick,
    className,
}: BannerCardProps) {
    const badgeColors = {
        discount: 'bg-red-500 text-white',
        premium: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black',
        new: 'bg-[var(--accent-primary)] text-black',
        hot: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    };

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
                'group/banner relative w-full rounded-[var(--radius-xl)] overflow-hidden',
                'ring-1 ring-white/10 hover:ring-[var(--accent-primary)]/50',
                'transition-all duration-500',
                className
            )}
        >
            {/* Banner Image - 16:9 or 21:9 */}
            <div className="relative aspect-[21/9] w-full">
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
                />

                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badge floating */}
                {badge && (
                    <div className="absolute top-4 right-4">
                        <span className={cn(
                            'px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg',
                            badgeColors[badgeVariant]
                        )}>
                            {badge}
                        </span>
                    </div>
                )}

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    {/* Urgency bar */}
                    {urgencyText && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 mb-4 self-start"
                        >
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-purchase)]/90 backdrop-blur-md rounded-full text-white text-xs font-bold">
                                <Timer className="w-3.5 h-3.5 animate-pulse" />
                                {urgencyText}
                            </span>
                        </motion.div>
                    )}

                    {/* Title - Jobs: Bold & Direct */}
                    <h3 className="text-white text-2xl lg:text-3xl font-black leading-tight mb-2 max-w-lg">
                        {title}
                    </h3>

                    {/* Subtitle - Benefit focused */}
                    {subtitle && (
                        <p className="text-white/70 text-sm lg:text-base mb-4 max-w-md">
                            {subtitle}
                        </p>
                    )}

                    {/* Price & CTA Row */}
                    <div className="flex flex-wrap items-center gap-4">
                        {(originalPrice || discountedPrice) && (
                            <div className="flex items-baseline gap-2">
                                {originalPrice && (
                                    <span className="text-white/40 text-sm line-through">{originalPrice}</span>
                                )}
                                {discountedPrice && (
                                    <span className="text-white text-2xl lg:text-3xl font-black">{discountedPrice}</span>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-primary)] text-black rounded-xl font-black text-sm uppercase tracking-wide group-hover/banner:bg-[var(--accent-secondary)] transition-colors shadow-lg shadow-[var(--accent-primary)]/30">
                            {ctaText}
                            <ArrowRight className="w-4 h-4 group-hover/banner:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Social Proof */}
                    {socialProof && (
                        <div className="flex items-center gap-2 mt-4 text-white/50 text-xs">
                            <Users className="w-3.5 h-3.5" />
                            {socialProof}
                        </div>
                    )}
                </div>
            </div>
        </motion.button>
    );
}

// ============================================
// VARIANT 2: TEXT-ONLY CARD
// Optimized for feature/benefit cards without images
// Philosophy: "Icon left. Text right. Scannable."
// ============================================
interface TextOnlyCardProps extends BaseCardProps {
    icon: React.ElementType;
    iconColor?: string;
    benefits?: string[];
    ctaText?: string;
    accentColor?: 'primary' | 'secondary' | 'premium' | 'purchase';
}

export function TextOnlyCard({
    icon: Icon,
    iconColor,
    title,
    subtitle,
    benefits,
    ctaText,
    accentColor = 'primary',
    onClick,
    className,
}: TextOnlyCardProps) {
    const colors = {
        primary: { bg: 'var(--accent-primary-soft)', border: 'var(--accent-primary-border)', text: 'var(--accent-primary)' },
        secondary: { bg: 'var(--accent-secondary-soft)', border: 'var(--accent-secondary-border)', text: 'var(--accent-secondary)' },
        premium: { bg: 'var(--accent-premium-soft)', border: 'var(--accent-premium-border)', text: 'var(--accent-premium)' },
        purchase: { bg: 'var(--accent-purchase-soft)', border: 'var(--accent-purchase-border)', text: 'var(--accent-purchase)' },
    };
    const color = colors[accentColor];

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'group/text w-full text-left rounded-[var(--radius-xl)] overflow-hidden',
                'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
                'hover:border-[var(--accent-primary)]/50 transition-all duration-300',
                className
            )}
        >
            <div className="p-5">
                {/* Header: Icon + Title side by side */}
                <div className="flex items-start gap-4 mb-3">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: color.bg, border: `1px solid ${color.border}` }}
                    >
                        <Icon className="w-7 h-7" style={{ color: iconColor || color.text }} />
                    </div>

                    <div className="flex-1 min-w-0 pt-1">
                        <h3 className="text-[var(--text-primary)] text-base font-black leading-tight mb-1">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-[var(--text-tertiary)] text-sm leading-snug">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* Benefits List - Musk: Data-driven persuasion */}
                {benefits && benefits.length > 0 && (
                    <ul className="space-y-2 mb-4 ml-[4.5rem]">
                        {benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ background: color.text }}
                                />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                )}

                {/* CTA Link */}
                {ctaText && (
                    <div className="flex items-center gap-1 ml-[4.5rem] text-sm font-bold group-hover/text:gap-2 transition-all" style={{ color: color.text }}>
                        {ctaText}
                        <ChevronRight className="w-4 h-4" />
                    </div>
                )}
            </div>
        </motion.button>
    );
}

// ============================================
// VARIANT 3: DISCOUNT CARD
// Aggressive discount presentation with urgency
// Philosophy: "Make the deal irresistible"
// ============================================
interface DiscountCardProps extends BaseCardProps {
    imageUrl: string;
    discount: string;
    originalPrice: string;
    discountedPrice: string;
    scarcityText?: string;
    ctaText?: string;
}

export function DiscountCard({
    imageUrl,
    title,
    subtitle,
    discount,
    originalPrice,
    discountedPrice,
    scarcityText,
    ctaText = 'APROVEITAR',
    onClick,
    className,
}: DiscountCardProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'group/discount relative w-full rounded-[var(--radius-xl)] overflow-hidden',
                'ring-1 ring-white/10 hover:ring-red-500/50',
                'shadow-lg hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]',
                'transition-all duration-500',
                // 3D tilt effect
                'transform-gpu perspective-1000',
                className
            )}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Card container with fixed aspect */}
            <div className="relative aspect-[3/4] w-full">
                {/* Background image */}
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/discount:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                {/* Discount Ribbon - Diagonal, Animated */}
                <div className="absolute -right-10 top-6 w-40 rotate-45 overflow-hidden">
                    <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        className="bg-gradient-to-r from-red-600 to-red-500 py-2 text-center shadow-xl"
                    >
                        <span className="text-white text-sm font-black uppercase tracking-wider drop-shadow-md">
                            {discount}
                        </span>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    {/* Scarcity warning */}
                    {scarcityText && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 bg-red-500/20 border border-red-500/40 rounded-full"
                        >
                            <Zap className="w-3 h-3 text-red-400" />
                            <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider">
                                {scarcityText}
                            </span>
                        </motion.div>
                    )}

                    {/* Title */}
                    <h3 className="text-white text-lg font-black leading-tight mb-1 group-hover/discount:text-[var(--accent-primary)] transition-colors">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="text-white/60 text-xs mb-4">{subtitle}</p>
                    )}

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-white/40 text-sm line-through">{originalPrice}</span>
                        <span className="text-white text-2xl font-black">{discountedPrice}</span>
                    </div>

                    {/* CTA Button */}
                    <div className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-black uppercase tracking-wider text-center rounded-xl transition-all shadow-lg shadow-red-500/30 group-hover/discount:shadow-red-500/50">
                        {ctaText}
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// ============================================
// VARIANT 4: LOCKED SALE CARD  
// Teases content and drives purchase
// Philosophy: "Show value, create desire"
// ============================================
interface LockedSaleCardProps extends BaseCardProps {
    imageUrl: string;
    blurLevel?: 'light' | 'medium' | 'heavy';
    price?: string;
    benefitTeaser?: string;
    ctaText?: string;
    isPremium?: boolean;
}

export function LockedSaleCard({
    imageUrl,
    title,
    subtitle,
    blurLevel = 'medium',
    price,
    benefitTeaser,
    ctaText = 'DESBLOQUEAR',
    isPremium = false,
    onClick,
    className,
}: LockedSaleCardProps) {
    const blurValues = {
        light: 'blur-[4px]',
        medium: 'blur-[8px]',
        heavy: 'blur-[12px]',
    };

    const accentColor = isPremium ? 'var(--accent-premium)' : 'var(--accent-purchase)';

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'group/locked relative w-full rounded-[var(--radius-xl)] overflow-hidden',
                'ring-2 transition-all duration-500',
                isPremium
                    ? 'ring-[var(--accent-premium)] shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.4)]'
                    : 'ring-[var(--accent-purchase)] shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.4)]',
                className
            )}
        >
            <div className="relative aspect-[2/3] w-full">
                {/* Blurred background image */}
                <img
                    src={imageUrl}
                    alt={title}
                    className={cn(
                        'absolute inset-0 w-full h-full object-cover scale-110 brightness-50',
                        blurValues[blurLevel]
                    )}
                />

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, ${accentColor}20 0%, transparent 30%, black 100%)`
                    }}
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <div
                        className={cn(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md',
                            isPremium
                                ? 'bg-[var(--accent-premium)]/20 border border-[var(--accent-premium)]/50'
                                : 'bg-[var(--accent-purchase)]/20 border border-[var(--accent-purchase)]/50'
                        )}
                    >
                        {isPremium ? (
                            <>
                                <Crown className="w-3.5 h-3.5 text-[var(--accent-premium)]" />
                                <span className="text-[var(--accent-premium)] text-[10px] font-black uppercase tracking-wider">Premium</span>
                            </>
                        ) : (
                            <>
                                <Lock className="w-3.5 h-3.5 text-[var(--accent-purchase)]" />
                                <span className="text-[var(--accent-purchase)] text-[10px] font-black uppercase tracking-wider">Exclusivo</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Center Lock Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={cn(
                            'w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md',
                            isPremium
                                ? 'bg-[var(--accent-premium)]/30 border border-[var(--accent-premium)]/50 shadow-[0_0_30px_var(--accent-premium)]'
                                : 'bg-[var(--accent-purchase)]/30 border border-[var(--accent-purchase)]/50 shadow-[0_0_30px_var(--accent-purchase)]'
                        )}
                    >
                        <Lock
                            className="w-7 h-7"
                            style={{ color: accentColor }}
                        />
                    </motion.div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    {/* Benefit teaser */}
                    {benefitTeaser && (
                        <div className="mb-3 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
                            <p className="text-white/80 text-xs italic line-clamp-2">
                                "{benefitTeaser}"
                            </p>
                        </div>
                    )}

                    {/* Title (blurred) */}
                    <div className="blur-[2px] mb-3">
                        <h3 className="text-white text-sm font-bold leading-tight line-clamp-2">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-white/50 text-[10px] uppercase tracking-wider mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* CTA Button */}
                    <div
                        className={cn(
                            'w-full py-3 text-sm font-black uppercase tracking-wider text-center rounded-xl transition-all shadow-lg',
                            isPremium
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400 hover:to-yellow-300'
                                : 'bg-[var(--accent-purchase)] text-white hover:bg-orange-500'
                        )}
                    >
                        {ctaText} {price && `• ${price}`}
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// ============================================
// VARIANT 5: LOCKED PROGRESS CARD
// Shows content unlocks progressively
// Philosophy: "Anticipation builds desire"
// ============================================
interface LockedProgressCardProps extends BaseCardProps {
    imageUrl: string;
    unlockDate: Date;
    lessonCount?: string;
    duration?: string;
    moduleNumber?: number;
    earlyAccessCta?: string;
    onEarlyAccessClick?: () => void;
}

export function LockedProgressCard({
    imageUrl,
    title,
    subtitle,
    unlockDate,
    lessonCount,
    duration,
    moduleNumber,
    earlyAccessCta,
    onEarlyAccessClick,
    onClick,
    className,
}: LockedProgressCardProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date().getTime();
            const distance = unlockDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [unlockDate]);

    const formatNumber = (n: number) => n.toString().padStart(2, '0');

    return (
        <motion.div
            className={cn(
                'group/progress relative w-full rounded-[var(--radius-xl)] overflow-hidden',
                'ring-1 ring-[var(--accent-secondary)]/50',
                'shadow-[0_0_25px_rgba(139,92,246,0.15)]',
                className
            )}
        >
            <div className="relative aspect-[2/3] w-full">
                {/* Blurred preview image */}
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover blur-[8px] scale-110 brightness-[0.4]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-secondary)]/20 via-transparent to-black/90" />

                {/* Coming Soon Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-secondary)]/20 backdrop-blur-md border border-[var(--accent-secondary)]/50 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                        <span className="text-[var(--accent-secondary)] text-[10px] font-black uppercase tracking-wider">
                            Libera em {timeLeft.days} dias
                        </span>
                    </div>

                    {moduleNumber && (
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <span className="text-white text-xs font-bold">{moduleNumber}</span>
                        </div>
                    )}
                </div>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
                    {/* Countdown Timer */}
                    <div className="flex items-center gap-2 mb-4">
                        {[
                            { value: formatNumber(timeLeft.days), label: 'D' },
                            { value: formatNumber(timeLeft.hours), label: 'H' },
                            { value: formatNumber(timeLeft.minutes), label: 'M' },
                            { value: formatNumber(timeLeft.seconds), label: 'S' },
                        ].map((unit, i) => (
                            <React.Fragment key={unit.label}>
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                        <span className="text-white text-lg font-mono font-black">{unit.value}</span>
                                    </div>
                                    <span className="text-white/40 text-[8px] uppercase font-bold">{unit.label}</span>
                                </div>
                                {i < 3 && <span className="text-white/30 text-lg font-bold pt-0">:</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Info pill */}
                    {(lessonCount || duration) && (
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                            {lessonCount && <span>{lessonCount}</span>}
                            {lessonCount && duration && <span>•</span>}
                            {duration && <span>{duration}</span>}
                        </div>
                    )}
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    {/* Title */}
                    <h3 className="text-white text-sm font-bold leading-tight mb-1 text-center">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-white/50 text-[10px] text-center mb-4">{subtitle}</p>
                    )}

                    {/* Early Access CTA */}
                    {earlyAccessCta && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEarlyAccessClick?.();
                            }}
                            className="w-full py-2.5 bg-[var(--accent-secondary)] hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider text-center rounded-xl transition-all shadow-lg shadow-purple-500/30"
                        >
                            {earlyAccessCta}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ============================================
// SHOWCASE COMPONENT - Demo all variants
// ============================================
export function ExtensionCardShowcase() {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 4);

    return (
        <div className="space-y-8 p-6">
            <h2 className="text-white text-2xl font-black">Extension Cards V2 - Jobs + Musk Edition</h2>

            {/* Banner Card */}
            <div>
                <h3 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wider">Banner Card</h3>
                <BannerCard
                    imageUrl="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200"
                    title="DOMINE O MUNDO DAS MILHAS"
                    subtitle="Economize até R$ 4.000 em cada viagem internacional"
                    badge="-80% OFF"
                    badgeVariant="discount"
                    originalPrice="R$ 497"
                    discountedPrice="R$ 97"
                    urgencyText="Oferta expira em 23:59:47"
                    socialProof="1.847 pessoas adquiriram hoje"
                />
            </div>

            {/* Text Only Cards */}
            <div>
                <h3 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wider">Text Only Cards</h3>
                <div className="grid grid-cols-2 gap-4">
                    <TextOnlyCard
                        icon={Gift}
                        title="GARANTIA VITALÍCIA"
                        subtitle="Acesso permanente com atualizações"
                        benefits={['Sem mensalidades', 'Sem taxas ocultas', 'Suporte prioritário']}
                        ctaText="Saiba mais"
                        accentColor="premium"
                    />
                    <TextOnlyCard
                        icon={Bell}
                        title="ALERTAS 24/7"
                        subtitle="Notificações em tempo real"
                        benefits={['WhatsApp, Email, Push', 'Erros de tarifa', 'Promoções exclusivas']}
                        ctaText="Ativar agora"
                        accentColor="primary"
                    />
                </div>
            </div>

            {/* Discount Cards */}
            <div>
                <h3 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wider">Discount Cards</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <DiscountCard
                        imageUrl="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600"
                        title="Rastreador de Voos"
                        subtitle="Alertas 24/7 no WhatsApp"
                        discount="-40%"
                        originalPrice="R$ 49"
                        discountedPrice="R$ 29"
                        scarcityText="Últimas 23 unidades"
                    />
                </div>
            </div>

            {/* Locked Cards */}
            <div>
                <h3 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wider">Locked Cards</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <LockedSaleCard
                        imageUrl="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600"
                        title="Estratégia Avançada de Milhas"
                        subtitle="12 aulas exclusivas"
                        benefitTeaser="Economizei R$ 12.000 em 6 meses usando essa técnica"
                        price="R$ 47"
                    />
                    <LockedSaleCard
                        imageUrl="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600"
                        title="Consultor de Milhas IA"
                        subtitle="Otimização automática"
                        benefitTeaser="IA que analisa todas as suas milhas"
                        price="R$ 67/mês"
                        isPremium
                    />
                    <LockedProgressCard
                        imageUrl="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600"
                        title="MÓDULO 3: Técnicas Avançadas"
                        subtitle="8 aulas de conteúdo exclusivo"
                        unlockDate={futureDate}
                        lessonCount="8 aulas"
                        duration="2h32min"
                        moduleNumber={3}
                        earlyAccessCta="Quero acesso antecipado"
                    />
                </div>
            </div>
        </div>
    );
}
