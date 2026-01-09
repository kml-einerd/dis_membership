import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Download, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from './Badge';
import { Button } from './Button';

interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  badge?: string;
  progress?: number;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  onWatchClick?: (slide: HeroSlide) => void;
  onDownloadClick?: (slide: HeroSlide) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  fullWidth?: boolean;
  sidebarOverlay?: boolean; // Quando sidebar flutua sobre o hero
}

export function HeroCarousel({
  slides,
  onWatchClick,
  onDownloadClick,
  autoPlay = true,
  autoPlayInterval = 6000,
  fullWidth = false,
  sidebarOverlay = false,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(() => paginate(1), autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, autoPlayInterval, paginate]);

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden group",
        fullWidth
          ? "aspect-[16/10] md:aspect-[21/9] lg:aspect-[2.6/1] rounded-none"
          : "aspect-[16/10] md:aspect-[21/9] lg:aspect-[2.6/1] rounded-[var(--radius-2xl)]"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with subtle Ken Burns effect */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 35 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Sophisticated Gradients */}
      {/* Main atmospheric dark fade from left and bottom */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--app-bg)]/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)]/60 via-transparent to-transparent" />

      {/* Decorative accent glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--accent-primary-soft)] rounded-full blur-[120px] opacity-20" />

      {/* Subtle Noise Texture for film grain feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Badge - Minimalist */}
            {currentSlide.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4"
              >
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white/90">
                  {currentSlide.badge}
                </span>
              </motion.div>
            )}

            {/* JOBS: "Insanely Great" - Cinematic text animation */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] md:text-[11px] text-[var(--accent-primary)] font-black uppercase tracking-[0.4em] mb-4"
            >
              {currentSlide.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-5 tracking-tighter"
            >
              {currentSlide.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:block text-base text-white/50 leading-relaxed mb-10 max-w-md font-light"
            >
              {currentSlide.description}
            </motion.p>

            {/* Actions - Insanely Great hover state */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={() => onWatchClick?.(currentSlide)}
                className="group flex items-center gap-3 px-8 py-4 min-h-[52px] bg-white text-black rounded-full text-sm font-black transition-all duration-300 hover:bg-[var(--accent-primary)] hover:scale-105 hover:shadow-[0_0_40px_rgba(73,220,122,0.4)] active:scale-95"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                COMEÇAR
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal Navigation Overlay - Posicionado para não conflitar com sidebar */}
      <div className={cn(
        "absolute bottom-10 hidden md:flex items-center gap-8",
        sidebarOverlay ? "right-[360px] xl:right-[380px]" : "right-10"
      )}>
        {/* Slide Numbers with animated underline */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tighter italic">0{currentIndex + 1}</span>
            <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[var(--accent-primary)]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
                key={currentIndex}
              />
            </div>
            <span className="text-xs font-bold text-white/30">0{slides.length}</span>
          </div>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">PRÓXIMO: {slides[(currentIndex + 1) % slides.length].title.split('.')[0]}</span>
        </div>

        {/* Minimal Circle Progress for autoplay */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-white/10"
            />
            <motion.circle
              key={currentIndex}
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="138.23"
              initial={{ strokeDashoffset: 138.23 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
              className="text-[var(--accent-primary)]"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={() => paginate(1)} className="group">
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Indicators */}
      <div className="absolute bottom-6 left-6 flex md:hidden items-center gap-1.5">
        {slides.map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              index === currentIndex ? 'w-6 bg-[var(--accent-primary)]' : 'w-2 bg-white/20'
            )}
          />
        ))}
      </div>
    </div>
  );
}

