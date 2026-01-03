import React, { useState, useEffect } from 'react';
import { Lock, Play, Star, Users, Zap, ShoppingBag, Crown, Gift, Sparkles, Clock, Timer } from 'lucide-react';
import { cn } from '../../lib/cn';
import { GlassSurface } from './GlassSurface';
import { Button } from './Button';
import { Badge } from './Badge';
import { motion } from 'motion/react';

// ============================================
// ESTILO A: VIP LOCK - Elegante com blur e cadeado
// V2: Dual-mode support (sale/progress)
// ============================================
interface VIPLockCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  mode?: 'sale' | 'progress';
  // Sale mode props
  price?: string;
  benefitTeaser?: string;
  ctaText?: string;
  // Progress mode props
  unlockDate?: Date;
  moduleNumber?: number;
  lessonCount?: string;
  duration?: string;
  earlyAccessCta?: string;
  onEarlyAccessClick?: () => void;
  // Common
  onClick?: () => void;
  className?: string;
}

export function VIPLockCard({
  imageUrl,
  title,
  subtitle,
  mode = 'sale',
  price,
  benefitTeaser,
  ctaText = 'DESBLOQUEAR',
  unlockDate,
  moduleNumber,
  lessonCount,
  duration,
  earlyAccessCta,
  onEarlyAccessClick,
  onClick,
  className,
}: VIPLockCardProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (mode !== 'progress' || !unlockDate) return;

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
  }, [mode, unlockDate]);

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group/vip relative w-full rounded-[var(--radius-xl)] overflow-hidden transition-all duration-500',
        mode === 'sale'
          ? 'ring-2 ring-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.4)]'
          : 'ring-1 ring-purple-500/50 shadow-[0_0_25px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]',
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full">
        {/* Imagem com blur */}
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "absolute inset-0 w-full h-full object-cover scale-110 brightness-[0.4]",
            mode === 'sale' ? 'blur-[6px]' : 'blur-[8px]'
          )}
        />

        {/* Overlay gradient */}
        <div className={cn(
          "absolute inset-0",
          mode === 'sale'
            ? "bg-gradient-to-b from-amber-900/20 via-transparent to-black/90"
            : "bg-gradient-to-b from-purple-900/20 via-transparent to-black/90"
        )} />

        {/* Top Badge */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg",
            mode === 'sale'
              ? "bg-gradient-to-r from-amber-500 to-yellow-400"
              : "bg-purple-500/20 backdrop-blur-md border border-purple-500/50"
          )}>
            {mode === 'sale' ? (
              <>
                <Crown className="w-3 h-3 text-black" />
                <span className="text-[10px] font-black text-black uppercase tracking-wider">VIP</span>
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 text-purple-400" />
                <span className="text-[10px] font-black text-purple-300 uppercase tracking-wider">
                  Libera em {timeLeft.days}d
                </span>
              </>
            )}
          </div>

          {moduleNumber && (
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <span className="text-white text-xs font-bold">{moduleNumber}</span>
            </div>
          )}
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {mode === 'sale' ? (
            /* Lock Icon for sale mode */
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-amber-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <Lock className="w-7 h-7 text-amber-400" />
            </motion.div>
          ) : (
            /* Countdown for progress mode */
            <div className="flex items-center gap-1.5">
              {[
                { value: formatNumber(timeLeft.days), label: 'D' },
                { value: formatNumber(timeLeft.hours), label: 'H' },
                { value: formatNumber(timeLeft.minutes), label: 'M' },
                { value: formatNumber(timeLeft.seconds), label: 'S' },
              ].map((unit, i) => (
                <React.Fragment key={unit.label}>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <span className="text-white text-sm font-mono font-black">{unit.value}</span>
                    </div>
                    <span className="text-white/40 text-[8px] uppercase font-bold">{unit.label}</span>
                  </div>
                  {i < 3 && <span className="text-white/30 font-bold">:</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Info pill */}
          {(lessonCount || duration) && mode === 'progress' && (
            <div className="flex items-center gap-2 mt-3 text-white/50 text-xs">
              {lessonCount && <span>{lessonCount}</span>}
              {lessonCount && duration && <span>•</span>}
              {duration && <span>{duration}</span>}
            </div>
          )}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Benefit teaser for sale mode */}
          {mode === 'sale' && benefitTeaser && (
            <div className="mb-3 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
              <p className="text-white/80 text-[10px] italic line-clamp-2">
                "{benefitTeaser}"
              </p>
            </div>
          )}

          {/* Title */}
          <div className={mode === 'sale' ? 'blur-[2px]' : ''}>
            <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1 text-center">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/50 text-[10px] uppercase tracking-wider text-center">
                {subtitle}
              </p>
            )}
          </div>

          {/* CTA */}
          {mode === 'sale' ? (
            <div className="mt-3 w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black uppercase tracking-wider text-center rounded-xl hover:from-amber-400 hover:to-yellow-300 transition-all shadow-lg shadow-amber-500/30">
              {ctaText} {price && `• ${price}`}
            </div>
          ) : earlyAccessCta && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEarlyAccessClick?.();
              }}
              className="mt-3 w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-white text-xs font-black uppercase tracking-wider text-center rounded-xl transition-all shadow-lg shadow-purple-500/30"
            >
              {earlyAccessCta}
            </button>
          )}

          {mode === 'sale' && (
            <p className="text-amber-400/60 text-[9px] font-bold mt-2 uppercase tracking-wider text-center">
              Conteúdo Exclusivo
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ESTILO C: COMBO BUNDLE - Valor percebido com economia
// V2: Banner único full-width (Jobs philosophy)
// ============================================
interface ComboBundleCardProps {
  bannerImage: string;
  courseImages?: [string, string]; // Deprecated, use bannerImage
  title: string;
  subtitle?: string;
  coursesIncluded: string[];
  originalPrice: string;
  discountedPrice: string;
  savings: string;
  urgencyText?: string;
  socialProof?: string;
  onClick?: () => void;
  className?: string;
}

export function ComboBundleCard({
  bannerImage,
  courseImages,
  title,
  subtitle,
  coursesIncluded,
  originalPrice,
  discountedPrice,
  savings,
  urgencyText,
  socialProof,
  onClick,
  className,
}: ComboBundleCardProps) {
  // Use bannerImage or fallback to first courseImage for backwards compatibility
  const mainImage = bannerImage || courseImages?.[0] || '';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'group/combo relative w-full rounded-[var(--radius-xl)] overflow-hidden',
        'ring-1 ring-[var(--accent-primary)]/30',
        'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
        'hover:ring-[var(--accent-primary)]/60 hover:shadow-[0_0_50px_rgba(16,185,129,0.25)]',
        'transition-all duration-500',
        className
      )}
    >
      {/* V2 Layout: Banner + Content Stack */}
      <div className="flex flex-col">
        {/* Banner Image - Full Width 16:9 */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/combo:scale-105"
          />

          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Urgency bar on top */}
          {urgencyText && (
            <div className="absolute top-0 left-0 right-0 bg-[var(--accent-purchase)] px-3 py-1.5">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
                <span className="text-white text-[10px] font-black uppercase tracking-wider">
                  {urgencyText}
                </span>
              </div>
            </div>
          )}

          {/* Savings badge - top right */}
          <div className="absolute top-3 right-3" style={{ marginTop: urgencyText ? '24px' : '0' }}>
            <Badge variant="success" className="shadow-lg text-xs font-black px-3 py-1.5">
              {savings}
            </Badge>
          </div>

          {/* Title overlay on banner */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-lg lg:text-xl font-black leading-tight mb-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/70 text-sm">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Content section */}
        <div className="p-4 bg-[var(--glass-surface-2)]">
          {/* What's Included - as chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {coursesIncluded.slice(0, 3).map((course, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                <span className="text-[var(--accent-primary)] text-[10px] font-bold">{course}</span>
              </div>
            ))}
          </div>

          {/* Pricing row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[var(--text-muted)] text-sm line-through">{originalPrice}</span>
              <span className="text-white text-2xl font-black">{discountedPrice}</span>
            </div>

            {/* Social proof */}
            {socialProof && (
              <div className="flex items-center gap-1.5 text-[var(--text-tertiary)] text-[10px]">
                <Users className="w-3.5 h-3.5" />
                <span>{socialProof}</span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="w-full py-3 bg-[var(--accent-primary)] text-black rounded-xl text-sm font-black uppercase tracking-wide text-center shadow-lg shadow-[var(--accent-primary)]/30 group-hover/combo:bg-[var(--accent-secondary)] transition-colors">
            Comprar Combo
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ============================================
// ESTILO D: DISCOUNT TAG - Etiqueta diagonal de desconto
// V2: Ribbon maior animado + 3D tilt + scarcity (Musk philosophy)
// ============================================
interface DiscountTagCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
  scarcityText?: string;
  ctaText?: string;
  onClick?: () => void;
  className?: string;
}

export function DiscountTagCard({
  imageUrl,
  title,
  subtitle,
  discount,
  originalPrice,
  discountedPrice,
  scarcityText,
  ctaText = 'Ver Oferta',
  onClick,
  className,
}: DiscountTagCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, rotateY: 3, rotateX: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group/discount relative w-full rounded-[var(--radius-xl)] overflow-hidden',
        'ring-1 ring-white/10 hover:ring-red-500/50',
        'shadow-lg hover:shadow-[0_0_40px_rgba(239,68,68,0.25)]',
        'transition-all duration-500 transform-gpu perspective-1000',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Altura fixa igual aos cards de curso */}
      <div className="relative h-[210px] sm:h-[240px] lg:h-[270px] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/discount:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

        {/* Animated Ribbon diagonal - LARGER */}
        <div className="absolute -right-12 top-6 w-44 rotate-45 overflow-hidden">
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-center shadow-xl"
          >
            <span className="text-white text-sm font-black uppercase tracking-wider drop-shadow-md">
              {discount}
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
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

          <h3 className="text-white text-base font-black leading-tight line-clamp-2 mb-1 group-hover/discount:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/60 text-xs mb-3">
              {subtitle}
            </p>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-white/40 text-sm line-through">{originalPrice}</span>
            <span className="text-white text-xl font-black">{discountedPrice}</span>
          </div>

          <div className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-black uppercase tracking-wider text-center rounded-xl transition-all shadow-lg shadow-red-500/30">
            {ctaText}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ============================================
// ESTILO E: BLUR TEASER - Imagem borrada com teaser
// ============================================
interface BlurTeaserCardProps {
  imageUrl: string;
  title: string;
  lessonCount: string;
  duration: string;
  onClick?: () => void;
  className?: string;
}

export function BlurTeaserCard({
  imageUrl,
  title,
  lessonCount,
  duration,
  onClick,
  className,
}: BlurTeaserCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group/blur relative w-full rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 active:scale-95',
        'ring-1 ring-white/10',
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full">
        {/* Heavily blurred background */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover blur-[12px] scale-110 brightness-[0.3]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Premium badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Premium</span>
          </div>
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white/80" />
          </div>
          <h3 className="text-white text-sm font-bold leading-tight mb-2">
            Conteúdo Exclusivo Premium
          </h3>
          <p className="text-white/50 text-xs">
            {lessonCount} • {duration}
          </p>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-center text-purple-400 text-[10px] font-bold uppercase tracking-wider">
            Desbloqueie para acessar
          </div>
        </div>
      </div>
    </button>
  );
}

// ============================================
// ESTILO F: UNLOCK CTA - Botão de desbloqueio destacado
// ============================================
interface UnlockCTACardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  priceFrom: string;
  onClick?: () => void;
  className?: string;
}

export function UnlockCTACard({
  imageUrl,
  title,
  subtitle,
  priceFrom,
  onClick,
  className,
}: UnlockCTACardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group/unlock relative w-full rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 active:scale-95',
        'ring-1 ring-purple-500/30 hover:ring-purple-500/60',
        'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
        'hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] transition-all duration-500 group-hover/unlock:brightness-[0.5]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent" />

        {/* Premium badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
            <Crown className="w-3 h-3 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-wider">Premium</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/60 text-[10px] mb-4">
              {subtitle}
            </p>
          )}

          {/* Unlock button */}
          <div className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-black uppercase tracking-wider text-center rounded-xl group-hover/unlock:from-purple-400 group-hover/unlock:to-pink-400 transition-all shadow-lg">
            Desbloquear Agora
          </div>

          <p className="text-white/40 text-[10px] text-center mt-2">
            A partir de {priceFrom}
          </p>
        </div>
      </div>
    </button>
  );
}

// ============================================
// ESTILO G: SOCIAL PROOF - Com avatares e rating
// ============================================
interface SocialProofCardProps {
  imageUrl: string;
  title: string;
  studentsCount: string;
  rating: number;
  badge?: string;
  avatars: string[];
  onClick?: () => void;
  className?: string;
  recentActivity?: string; // "3 pessoas compraram nas últimas 2h"
}

export function SocialProofCard({
  imageUrl,
  title,
  studentsCount,
  rating,
  badge,
  avatars,
  onClick,
  className,
  recentActivity,
}: SocialProofCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group/social relative w-full rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 active:scale-95',
        'ring-1 ring-white/10 hover:ring-[var(--accent-primary)]/50',
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5] transition-transform duration-700 group-hover/social:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning" className="shadow-lg">
              {badge}
            </Badge>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Avatars and Activity */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              {avatars.slice(0, 4).map((avatar, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-6 h-6 rounded-full border-2 border-black overflow-hidden"
                >
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <span className="text-white/70 text-xs font-medium">{studentsCount}</span>
          </div>

          {/* Real-time activity badge */}
          {recentActivity && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 px-2 py-1 bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 rounded-full text-[9px] font-bold text-[var(--accent-primary)] flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />
              {recentActivity}
            </motion.div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3 h-3',
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-white/20'
                )}
              />
            ))}
            <span className="text-white/70 text-xs ml-1">{rating}</span>
          </div>

          <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-3 group-hover/social:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>

          <div className="w-full py-2 bg-[var(--accent-primary)] text-black text-xs font-bold uppercase tracking-wider text-center rounded-lg group-hover/social:bg-[var(--accent-secondary)] transition-colors">
            Quero Acesso
          </div>
        </div>
      </div>
    </button>
  );
}

// ============================================
// COUNTDOWN WIDGET - Para sidebar
// ============================================
interface CountdownWidgetProps {
  endTime: Date;
  originalPrice: string;
  discountedPrice: string;
  onUpgrade?: () => void;
  className?: string;
}

export function CountdownWidget({
  endTime,
  originalPrice,
  discountedPrice,
  onUpgrade,
  className,
}: CountdownWidgetProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

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
  }, [endTime]);

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <GlassSurface
      variant="surface-3"
      blur="heavy"
      glow
      glowColor="var(--accent-purchase)"
      className={cn(
        'p-5 rounded-[var(--radius-xl)] text-center relative overflow-hidden',
        className
      )}
    >
      {/* Badge */}
      <div className="absolute top-3 right-3">
        <span className="px-2 py-1 bg-[var(--accent-purchase)] text-white text-[9px] font-black uppercase tracking-wider rounded-full animate-pulse">
          ⚡ Oferta Limitada
        </span>
      </div>

      <div className="w-12 h-12 rounded-full bg-[var(--accent-purchase-soft)] border border-[var(--accent-purchase-border)] flex items-center justify-center mx-auto mb-4">
        <Zap className="w-6 h-6 text-[var(--accent-purchase)]" />
      </div>

      <h3 className="text-[var(--text-primary)] text-base font-black mb-3">
        Acesse Premium
      </h3>

      {/* Countdown */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="text-center">
          <div className="px-2 py-1 bg-[var(--glass-surface-3)] rounded text-[var(--text-primary)] text-lg font-mono font-black">
            {formatNumber(timeLeft.days)}
          </div>
          <span className="text-[var(--text-muted)] text-[8px] uppercase">Dias</span>
        </div>
        <span className="text-[var(--text-muted)] font-bold">:</span>
        <div className="text-center">
          <div className="px-2 py-1 bg-[var(--glass-surface-3)] rounded text-[var(--text-primary)] text-lg font-mono font-black">
            {formatNumber(timeLeft.hours)}
          </div>
          <span className="text-[var(--text-muted)] text-[8px] uppercase">Horas</span>
        </div>
        <span className="text-[var(--text-muted)] font-bold">:</span>
        <div className="text-center">
          <div className="px-2 py-1 bg-[var(--glass-surface-3)] rounded text-[var(--text-primary)] text-lg font-mono font-black">
            {formatNumber(timeLeft.minutes)}
          </div>
          <span className="text-[var(--text-muted)] text-[8px] uppercase">Min</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[var(--text-muted)] text-xs line-through">{originalPrice}</span>
          <span className="text-[var(--text-primary)] text-2xl font-black">{discountedPrice}</span>
        </div>
        <span className="text-[var(--text-tertiary)] text-[10px]">ou 12x de R$ 39,70</span>
      </div>

      <Button variant="purchase" size="md" fullWidth onClick={onUpgrade} className="font-black">
        UPGRADE NOW
      </Button>

      <p className="text-[var(--text-muted)] text-[9px] mt-3 uppercase tracking-wider">
        🛡️ Garantia de 30 dias
      </p>
    </GlassSurface>
  );
}

