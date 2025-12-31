import { Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WideVideoCardProps {
  title: string;
  imageUrl: string;
  duration: string;
  progress: number;
  onClick?: () => void;
}

export function WideVideoCard({
  title,
  imageUrl,
  duration,
  progress,
  onClick,
}: WideVideoCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[220px] group"
    >
      <div className="relative rounded-2xl overflow-hidden mb-2">
        <div className="aspect-video bg-white/5">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        </div>
        
        {/* Duration badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Clock className="w-3 h-3 text-white/80" />
          <span className="text-white/90 text-xs">{duration}</span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-[#7c5dfa]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h4 className="text-white/90 text-sm text-left line-clamp-2 leading-snug">
        {title}
      </h4>
    </button>
  );
}
