import { Play, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MediumVideoCardProps {
  title: string;
  imageUrl: string;
  duration: string;
  onClick?: () => void;
}

export function MediumVideoCard({
  title,
  imageUrl,
  duration,
  onClick,
}: MediumVideoCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[160px] group"
    >
      <div className="relative rounded-xl overflow-hidden mb-2">
        <div className="aspect-video bg-[#141419]">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-11 h-11 rounded-full bg-[#7c5dfa]/90 flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 text-white/80" />
          <span className="text-white/90 text-[10px]">{duration}</span>
        </div>
      </div>

      <h4 className="text-white/85 text-xs text-left line-clamp-2 leading-snug">
        {title}
      </h4>
    </button>
  );
}
