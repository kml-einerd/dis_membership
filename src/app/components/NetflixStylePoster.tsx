import { Lock, Play, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NetflixStylePosterProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  locked?: boolean;
  isOffer?: boolean;
  discount?: string;
  type?: 'video' | 'article';
  onClick?: () => void;
}

export function NetflixStylePoster({
  imageUrl,
  title,
  subtitle,
  locked = false,
  isOffer = false,
  discount,
  type = 'video',
  onClick,
}: NetflixStylePosterProps) {
  return (
    <button
      onClick={onClick}
      className="relative group w-full text-left flex-shrink-0"
    >
      {/* Offer glow */}
      {isOffer && (
        <div className="absolute -inset-0.5 bg-[var(--app-accent)]/10 blur-md rounded-[var(--app-radius-lg)]" />
      )}

      {/* Offer flow line */}
      {isOffer && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--app-accent)] via-[var(--app-accent)]/60 to-transparent rounded-full z-10" />
      )}

      <div className={`relative bg-[var(--app-surface-hover)] rounded-[var(--app-radius-lg)] overflow-hidden transition-all duration-300 group-hover:scale-[1.02] ${
        isOffer ? 'border border-[var(--app-accent)]/20' : 'border border-[var(--app-border-subtle)]'
      }`}>
        {/* Vertical poster aspect ratio 2:3 */}
        <div className="aspect-[2/3] relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Subtle overlay with desaturation effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Discount badge - top right */}
          {discount && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-[var(--app-accent)] rounded-md">
              <span className="text-white text-xs font-medium">{discount}</span>
            </div>
          )}

          {/* Lock badge - top left */}
          {locked && (
            <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Lock className="w-3 h-3 text-white" />
            </div>
          )}

          {/* Type badge - top left (if not locked) */}
          {!locked && type && (
            <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              {type === 'video' ? (
                <Play className="w-3 h-3 text-white ml-0.5" />
              ) : (
                <FileText className="w-3 h-3 text-white" />
              )}
            </div>
          )}

          {/* Title overlay - Netflix style */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-medium text-sm leading-tight mb-0.5 line-clamp-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/60 text-xs leading-snug line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
