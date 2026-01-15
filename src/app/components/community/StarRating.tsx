import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';
import type { StarRatingProps } from './types';

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const gapClasses = {
  sm: 'gap-0.5',
  md: 'gap-1',
  lg: 'gap-1.5',
};

export function StarRating({
  value,
  onChange,
  size = 'md',
  readonly = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div
      className={cn('flex items-center', gapClasses[size])}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= displayValue;
        const isHovered = hoverValue > 0 && star <= hoverValue;

        return (
          <motion.button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            disabled={readonly}
            className={cn(
              'relative transition-colors focus:outline-none',
              readonly ? 'cursor-default' : 'cursor-pointer'
            )}
            whileHover={readonly ? {} : { scale: 1.15 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
            animate={
              isFilled && !readonly
                ? {
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          >
            {/* Glow effect for filled stars */}
            {isFilled && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, transparent 70%)',
                }}
              />
            )}

            <Star
              className={cn(
                sizeClasses[size],
                'relative z-10 transition-all duration-200',
                isFilled
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                  : 'text-white/20',
                isHovered && !isFilled && 'text-amber-400/50'
              )}
            />
          </motion.button>
        );
      })}

      {/* Rating text */}
      {value > 0 && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            'ml-2 font-semibold text-amber-400',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base'
          )}
        >
          {value.toFixed(1)}
        </motion.span>
      )}
    </div>
  );
}

export default StarRating;
