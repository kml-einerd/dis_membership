import React, { useState, useEffect } from 'react';
import { Play, Lock, Clock, BookOpen, Timer, Zap } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Badge } from './Badge';
import { Progress } from './Progress';
import { motion } from 'motion/react';

interface ContentCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  duration?: string;
  type?: 'video' | 'article' | 'course';
  progress?: number;
  locked?: boolean;
  badge?: string;
  discount?: string;
  category?: string;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'wide' | 'featured';
  className?: string;
  // V2 Enhanced Locked Props
  lockedMode?: 'sale' | 'progress';
  unlockDate?: Date;
  unlockPrice?: string;
  upgradeCtaText?: string;
  blurLevel?: 'light' | 'medium' | 'heavy';
  benefitTeaser?: string;
}

export function ContentCard({
  imageUrl,
  title,
  subtitle,
  duration,
  type = 'video',
  progress,
  locked = false,
  badge,
  discount,
  category,
  onClick,
  variant = 'default',
  className,
  // V2 Enhanced Locked Props
  lockedMode = 'sale',
  unlockDate,
  unlockPrice,
  upgradeCtaText = 'Desbloquear',
  blurLevel = 'medium',
  benefitTeaser,
}: ContentCardProps) {
  const TypeIcon = type === 'article' ? BookOpen : Play;
  const isPremium = badge?.toLowerCase().includes('premium') || badge?.toLowerCase().includes('exclusivo');

  // Countdown state for progress mode
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (!locked || lockedMode !== 'progress' || !unlockDate) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = unlockDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, [locked, lockedMode, unlockDate]);

  const blurValues = {
    light: 'blur-[4px]',
    medium: 'blur-[6px]',
    heavy: 'blur-[10px]',
  };

  // Default variant - poster style (2:3 ratio)
  const renderDefault = () => (
    <button
      onClick={onClick}
      className={cn(
        'group/card relative w-full rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 ease-out active:scale-[0.97]',
        'hover:shadow-2xl hover:-translate-y-1 transform',
        // Glow intensificado para conteúdo bloqueado
        locked && lockedMode === 'sale' && 'ring-2 ring-[#f97316] shadow-[0_0_30px_rgba(249,115,22,0.4),0_0_60px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5),0_0_80px_rgba(249,115,22,0.3)]',
        locked && lockedMode === 'progress' && 'ring-1 ring-purple-500/60 shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]',
        // Glow para conteúdo premium exclusivo
        isPremium && !locked && 'ring-2 ring-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.4),0_0_60px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5),0_0_80px_rgba(234,179,8,0.3)]',
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full">
        {/* Image with adjustable blur for locked content */}
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
            locked ? cn(blurValues[blurLevel], 'scale-110 brightness-[0.4]') : 'group-hover/card:scale-105 group-hover/card:brightness-110'
          )}
        />

        {/* Glow overlay for paid/premium */}
        {(locked || isPremium) && (
          <div className={cn(
            "absolute inset-0 opacity-20 group-hover/card:opacity-30 transition-opacity",
            locked && lockedMode === 'sale' ? "bg-[var(--accent-purchase)]" :
              locked && lockedMode === 'progress' ? "bg-purple-500" :
                "bg-[var(--accent-premium)]"
          )} />
        )}

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Border accent */}
        {locked && lockedMode === 'sale' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-purchase)]" />}
        {locked && lockedMode === 'progress' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />}
        {isPremium && !locked && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-premium)]" />}

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div>
            {locked && lockedMode === 'progress' ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/20 backdrop-blur-md border border-purple-500/50 rounded-full">
                <Clock className="w-3 h-3 text-purple-400" />
                <span className="text-[10px] font-black text-purple-300 uppercase tracking-wider">
                  {timeLeft.days}d {timeLeft.hours}h
                </span>
              </div>
            ) : discount ? (
              <Badge variant="discount">{discount}</Badge>
            ) : badge ? (
              <Badge variant="primary" className={cn(isPremium && 'bg-[var(--accent-premium-soft)] text-[var(--accent-premium)] border-[var(--accent-premium-border)]')}>
                {badge}
              </Badge>
            ) : null}
          </div>
          {locked && lockedMode === 'sale' && (
            <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-[var(--accent-purchase)]/30">
              <Lock className="w-3.5 h-3.5 text-[var(--accent-purchase)]" />
            </div>
          )}
        </div>

        {/* Center content for locked mode */}
        {locked && lockedMode === 'sale' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-[var(--accent-purchase)]/40 flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.3)]">
              <Lock className="w-6 h-6 text-[var(--accent-purchase)]" />
            </div>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Benefit teaser for locked sale */}
          {locked && lockedMode === 'sale' && benefitTeaser && (
            <div className="mb-2 px-2 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
              <p className="text-white/80 text-[9px] italic line-clamp-2">
                "{benefitTeaser}"
              </p>
            </div>
          )}

          <h3 className={cn(
            "text-white text-sm font-bold leading-tight line-clamp-2 mb-1 transition-colors",
            locked && lockedMode === 'sale' && 'blur-[1px]',
            !locked && 'group-hover/card:text-[var(--accent-primary)]'
          )}>
            {title}
          </h3>
          {subtitle && (
            <p className={cn(
              "text-white/60 text-[10px] uppercase tracking-wider font-semibold line-clamp-1",
              locked && lockedMode === 'sale' && 'blur-[1px]'
            )}>
              {subtitle}
            </p>
          )}

          {/* Progress bar */}
          {progress !== undefined && progress > 0 && !locked && (
            <div className="mt-2.5 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* CTA for locked content */}
          {locked && lockedMode === 'sale' && unlockPrice && (
            <div className="mt-3 w-full py-2 bg-[var(--accent-purchase)] text-white text-[10px] font-black uppercase tracking-wider text-center rounded-lg">
              {upgradeCtaText} • {unlockPrice}
            </div>
          )}
        </div>
      </div>
    </button>
  );

  // Compact variant - horizontal layout
  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-4 p-3 rounded-[var(--radius-lg)]',
          'bg-[var(--glass-surface-1)] border border-[var(--glass-border-subtle)] backdrop-blur-md',
          'hover:bg-[var(--glass-surface-hover)] hover:border-[var(--glass-border)]',
          'transition-all duration-300 active:scale-[0.98]',
          locked && 'border-l-2 border-l-[var(--accent-purchase)] bg-[var(--accent-purchase-soft)]/5 shadow-[0_0_15px_rgba(249,115,22,0.05)]',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-20 h-14 rounded-[var(--radius-md)] overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            {locked ? (
              <Lock className="w-4 h-4 text-[var(--accent-purchase)]" />
            ) : (
              <TypeIcon className="w-4 h-4 text-white" />
            )}
          </div>
          {progress !== undefined && progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div
                className="h-full bg-[var(--accent-primary)] shadow-[0_0_5px_var(--accent-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          <h4 className="text-[var(--text-primary)] text-sm font-semibold leading-snug truncate hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h4>
          {subtitle && (
            <p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-wide font-bold mt-1 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Play indicator */}
        <div className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all",
          locked ? "bg-[var(--accent-purchase-soft)] border-[var(--accent-purchase-border)]" : "bg-white/5 border-white/10 hover:bg-[var(--accent-primary)] hover:border-transparent hover:text-black"
        )}>
          {locked ? <Lock className="w-3.5 h-3.5 text-[var(--accent-purchase)]" /> : <TypeIcon className="w-3.5 h-3.5" />}
        </div>
      </button>
    );
  }

  // Wide variant - horizontal with more details
  if (variant === 'wide') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-start gap-5 p-5 rounded-[var(--radius-xl)]',
          'bg-[var(--glass-surface-2)] border border-[var(--glass-border)] backdrop-blur-xl',
          'hover:bg-[var(--glass-surface-hover)] hover:border-[var(--glass-border-strong)]',
          'transition-all duration-300 active:scale-[0.99] group/wide',
          locked && 'border-l-4 border-l-[var(--accent-purchase)] bg-[var(--accent-purchase-soft)]/5',
          isPremium && 'border-l-4 border-l-[var(--accent-premium)] bg-[var(--accent-premium-soft)]/5',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-36 h-24 lg:w-48 lg:h-32 rounded-[var(--radius-xl)] overflow-hidden flex-shrink-0 shadow-2xl">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover/wide:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            {badge && (
              <Badge variant={isPremium ? 'warning' : 'primary'} className="backdrop-blur-md">
                {badge}
              </Badge>
            )}
          </div>

          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-purchase)] flex items-center justify-center shadow-[0_0_20px_var(--accent-purchase)]">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
          )}

          {duration && !locked && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 rounded-full backdrop-blur-md border border-white/10">
              <Clock className="w-3 h-3 text-white/80" />
              <span className="text-white text-[10px] font-bold">{duration}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left pt-1">
          {category && (
            <span className="text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
              {category}
            </span>
          )}
          <h3 className="text-[var(--text-primary)] text-lg lg:text-xl font-bold leading-tight mt-1 line-clamp-2 group-hover/wide:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[var(--text-tertiary)] text-sm mt-2 line-clamp-2 leading-relaxed">
              {subtitle}
            </p>
          )}
          {progress !== undefined && progress > 0 && (
            <div className="mt-4">
              <Progress value={progress} size="sm" variant="primary" />
              <span className="text-[var(--text-muted)] text-[10px] font-bold mt-1.5 block uppercase tracking-wider">
                {progress}% concluído
              </span>
            </div>
          )}
        </div>
      </button>
    );
  }

  return renderDefault();
}
