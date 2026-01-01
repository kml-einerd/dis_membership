import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Download, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/cn';
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
}

export function HeroCarousel({
  slides,
  onWatchClick,
  onDownloadClick,
  autoPlay = true,
  autoPlayInterval = 6000,
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
      className="relative w-full aspect-[16/10] md:aspect-[21/9] lg:aspect-[2.4/1] rounded-[var(--radius-2xl)] overflow-hidden group"
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

            {/* Subtitle - Elegant */}
            <p className="text-[10px] md:text-[11px] text-[var(--accent-primary)] font-black uppercase tracking-[0.35em] mb-3 opacity-90">
              {currentSlide.subtitle}
            </p>

            {/* Title - Large & Punchy - REDUZIDO */}
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-4 tracking-tighter">
              {currentSlide.title}
            </h1>

            {/* Description - REMOVIDO em mobile, mínimo em desktop */}
            <p className="hidden lg:block text-sm text-white/50 leading-snug mb-8 max-w-md font-light">
              {currentSlide.description}
            </p>

            {/* Actions - Smaller & Sophisticated */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onWatchClick?.(currentSlide)}
                className="group flex items-center gap-2.5 px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold transition-all hover:bg-[var(--accent-primary)] hover:text-black hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                ASSISTIR AGORA
              </button>
              
              <button
                onClick={() => onDownloadClick?.(currentSlide)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                DETALHES
              </button>

              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal Navigation Overlay */}
      <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-8">
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

