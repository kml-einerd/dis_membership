import { Lock } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Badge } from './Badge';

interface PosterCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  locked?: boolean;
  discount?: string;
  onClick?: () => void;
  className?: string;
}

export function PosterCard({ imageUrl, title, subtitle, locked, discount, onClick, className }: PosterCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full rounded-[var(--radius-lg)] overflow-hidden',
        'transition-all duration-300 active:scale-95',
        className
      )}
    >
      {/* 2:3 ratio container */}
      <div className="relative aspect-[2/3] w-full">
        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Locked badge */}
        {locked && (
          <div className="absolute top-3 right-3">
            <Badge variant="locked" icon={<Lock className="w-3 h-3" />}>
              Premium
            </Badge>
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 left-3">
            <Badge variant="discount">
              {discount}
            </Badge>
          </div>
        )}

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2 mb-0.5">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/70 text-xs leading-snug line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-[var(--accent-primary)]/0 group-hover:bg-[var(--accent-primary)]/10 transition-colors duration-300" />
      </div>
    </button>
  );
}
