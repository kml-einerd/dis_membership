import { ReactNode, useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'motion/react';

interface NetflixCarouselProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showArrows?: boolean;
  itemWidth?: number;
  gap?: number;
}

export function NetflixCarousel({
  title,
  children,
  className,
  showArrows = true,
  itemWidth = 200,
  gap = 12,
}: NetflixCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);
      checkScrollability();
      setTimeout(() => setIsScrolling(false), 150);
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cn('relative netflix-carousel-container', className)}>
      {/* Title */}
      {title && (
        <h3 className="text-[var(--text-primary)] text-lg lg:text-xl font-bold mb-4 px-4 lg:px-0">
          {title}
        </h3>
      )}

      {/* Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showArrows && canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('left')}
            className={cn(
              'absolute left-0 top-0 bottom-0 z-10 w-12 lg:w-16',
              'flex items-center justify-center',
              'bg-gradient-to-r from-[var(--app-bg)] via-[var(--app-bg)]/80 to-transparent',
              'opacity-0 hover:opacity-100 transition-opacity duration-200',
              '[.netflix-carousel-container:hover_&]:opacity-100'
            )}
            aria-label="Scroll left"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] backdrop-blur-xl flex items-center justify-center shadow-lg">
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--text-primary)]" />
            </div>
          </motion.button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={cn(
            'flex gap-3 lg:gap-4 overflow-x-auto overflow-y-visible',
            'scrollbar-hide',
            'scroll-smooth',
            'px-4 lg:px-0',
            'pb-2',
            isScrolling && 'scrollbar-show'
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>

        {/* Right Arrow */}
        {showArrows && canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('right')}
            className={cn(
              'absolute right-0 top-0 bottom-0 z-10 w-12 lg:w-16',
              'flex items-center justify-center',
              'bg-gradient-to-l from-[var(--app-bg)] via-[var(--app-bg)]/80 to-transparent',
              'opacity-0 hover:opacity-100 transition-opacity duration-200',
              '[.netflix-carousel-container:hover_&]:opacity-100'
            )}
            aria-label="Scroll right"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] backdrop-blur-xl flex items-center justify-center shadow-lg">
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--text-primary)]" />
            </div>
          </motion.button>
        )}

        {/* Fade edges - Mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none lg:hidden">
          <div className="h-full bg-gradient-to-r from-[var(--app-bg)] to-transparent" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none lg:hidden">
          <div className="h-full bg-gradient-to-l from-[var(--app-bg)] to-transparent" />
        </div>
      </div>
    </div>
  );
}

