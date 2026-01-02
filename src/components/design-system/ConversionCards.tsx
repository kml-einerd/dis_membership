import { useState, useEffect } from 'react';
import { Lock, Play, Star, Users, Zap, ShoppingBag, Crown, Gift, Sparkles } from 'lucide-react';
import { cn } from '../../lib/cn';
import { GlassSurface } from './GlassSurface';
import { Button } from './Button';
import { Badge } from './Badge';

// ============================================
// ESTILO A: VIP LOCK - Elegante com blur e cadeado
// ============================================
interface VIPLockCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export function VIPLockCard({
  imageUrl,
  title,
  subtitle,
  onClick,
  className,
}: VIPLockCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group/vip relative w-full rounded-[var(--radius-xl)] overflow-hidden transition-all duration-500 active:scale-95',
        // Borda fina dourada com glow sutil
        'ring-[1.5px] ring-amber-500/60',
        'shadow-[0_0_25px_rgba(245,158,11,0.2),0_0_50px_rgba(245,158,11,0.1)]',
        'hover:shadow-[0_0_35px_rgba(245,158,11,0.35),0_0_70px_rgba(245,158,11,0.15)]',
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full">
        {/* Imagem com blur */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover blur-[6px] scale-105 brightness-50"
        />
        
        {/* Overlay dourado sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-black/80" />
        
        {/* VIP Badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-lg">
            <Crown className="w-3 h-3 text-black" />
            <span className="text-[10px] font-black text-black uppercase tracking-wider">VIP</span>
          </div>
        </div>
        
        {/* Lock Icon Central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-amber-500/30 flex items-center justify-center shadow-2xl">
            <Lock className="w-7 h-7 text-amber-400" />
          </div>
        </div>
        
        {/* Título borrado */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="blur-[4px]">
            <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/60 text-[10px] uppercase tracking-wider">
                {subtitle}
              </p>
            )}
          </div>
          <p className="text-amber-400 text-[10px] font-bold mt-2 uppercase tracking-wider">
            Conteúdo Exclusivo
          </p>
        </div>
      </div>
    </button>
  );
}

// ESTILO C: COMBO BUNDLE - Valor percebido com economia
// ============================================
interface ComboBundleCardProps {
  courseImages: [string, string];
  title: string;
  coursesIncluded: string[];
  originalPrice: string;
  discountedPrice: string;
  savings: string;
  onClick?: () => void;
  className?: string;
}

export function ComboBundleCard({
  courseImages,
  title,
  coursesIncluded,
  originalPrice,
  discountedPrice,
  savings,
  onClick,
  className,
}: ComboBundleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group/combo relative w-full rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 active:scale-95',
        'bg-[var(--glass-surface-2)] border border-[var(--glass-border)]',
        'hover:border-[var(--accent-primary)]/50',
        className
      )}
    >
      {/* Altura fixa igual aos cards de curso (180px * 1.5 = 270px) */}
      <div className="relative h-[210px] sm:h-[240px] lg:h-[270px] w-full flex flex-col">
        {/* Split image header - proporção fixa */}
        <div className="relative h-[40%] flex">
          <div className="w-1/2 relative overflow-hidden">
            <img src={courseImages[0]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
          </div>
          <div className="w-1/2 relative overflow-hidden">
            <img src={courseImages[1]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />
          </div>
          {/* Center overlap badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center border-3 border-[var(--app-bg)] shadow-xl">
              <span className="text-black text-sm font-black">2x</span>
            </div>
          </div>
          {/* Savings badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="success" className="shadow-lg text-[9px]">
              {savings}
            </Badge>
          </div>
        </div>
        
        {/* Content - flex grow */}
        <div className="flex-1 p-3 text-left flex flex-col justify-between">
          <div>
            <h3 className="text-[var(--text-primary)] text-sm font-bold mb-2 line-clamp-2">
              {title}
            </h3>
            
            <ul className="space-y-1">
              {coursesIncluded.slice(0, 2).map((course, i) => (
                <li key={i} className="flex items-center gap-2 text-[var(--text-tertiary)] text-[10px]">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)] flex-shrink-0" />
                  <span className="truncate">{course}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Pricing */}
          <div className="pt-2 border-t border-[var(--glass-border)]">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[var(--text-muted)] text-[10px] line-through">{originalPrice}</span>
              <span className="text-[var(--accent-primary)] text-lg font-black">{discountedPrice}</span>
            </div>
            <div className="w-full py-2 bg-[var(--accent-primary)] text-black rounded-lg text-[10px] font-black uppercase tracking-wider text-center group-hover/combo:scale-[1.02] transition-transform">
              Comprar Combo
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// ============================================
// ESTILO D: DISCOUNT TAG - Etiqueta diagonal de desconto
// ============================================
interface DiscountTagCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
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
  onClick,
  className,
}: DiscountTagCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group/discount relative w-full rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 active:scale-95',
        className
      )}
    >
      {/* Altura fixa igual aos cards de curso */}
      <div className="relative h-[210px] sm:h-[240px] lg:h-[270px] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/discount:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Ribbon diagonal */}
        <div className="absolute -right-8 top-5 w-32 rotate-45 bg-red-500 py-1.5 text-center shadow-lg">
          <span className="text-white text-[10px] font-black uppercase tracking-wider">
            {discount}
          </span>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1 group-hover/discount:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/60 text-[10px] uppercase tracking-wider mb-3">
              {subtitle}
            </p>
          )}
          
          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-white/40 text-xs line-through">{originalPrice}</span>
              <span className="text-[var(--accent-primary)] text-lg font-black">{discountedPrice}</span>
            </div>
          </div>
          
          <div className="mt-3 w-full py-2 bg-red-500 hover:bg-red-400 text-white text-xs font-bold uppercase tracking-wider text-center rounded-lg transition-colors">
            Ver Oferta
          </div>
        </div>
      </div>
    </button>
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
          {/* Avatars */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              {avatars.slice(0, 4).map((avatar, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-black overflow-hidden"
                >
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-white/70 text-xs font-medium">{studentsCount}</span>
          </div>
          
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

