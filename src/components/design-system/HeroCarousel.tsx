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
      className="relative w-full aspect-[21/9] md:aspect-[2.5/1] lg:aspect-[3/1] rounded-[var(--radius-2xl)] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Parallax Effect */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--app-bg)]/95 via-[var(--app-bg)]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)]/80 via-transparent to-transparent" />

      {/* Badge */}
      {currentSlide.badge && (
        <div className="absolute top-6 left-6">
          <Badge variant="primary">{currentSlide.badge}</Badge>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl"
          >
            {/* Tags */}
            {currentSlide.tags && currentSlide.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {currentSlide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--glass-surface-3)] backdrop-blur-md rounded-full text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-3">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-[var(--accent-primary)] font-medium mb-2">
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p className="text-sm md:text-base text-[var(--text-tertiary)] leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
              {currentSlide.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => onWatchClick?.(currentSlide)}
                className="shadow-lg"
              >
                <Play className="w-4 h-4" />
                Assistir
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => onDownloadClick?.(currentSlide)}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-surface-3)] hover:bg-[var(--glass-surface-hover)] transition-colors backdrop-blur-md">
                <MoreHorizontal className="w-5 h-5 text-[var(--text-tertiary)]" />
              </button>
            </div>

            {/* Progress bar if applicable */}
            {currentSlide.progress !== undefined && currentSlide.progress > 0 && (
              <div className="mt-4 h-1 bg-[var(--glass-surface-3)] rounded-full overflow-hidden max-w-xs">
                <div
                  className="h-full bg-[var(--accent-primary)] transition-all duration-500"
                  style={{ width: `${currentSlide.progress}%` }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-6 bottom-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-surface-3)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] backdrop-blur-md transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-surface-3)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] backdrop-blur-md transition-all"
        >
          <ChevronRight className="w-5 h-5 text-[var(--text-primary)]" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'w-8 bg-[var(--accent-primary)]'
                : 'w-1.5 bg-[var(--glass-surface-hover)] hover:bg-[var(--text-muted)]'
            )}
          />
        ))}
      </div>
    </div>
  );
}

