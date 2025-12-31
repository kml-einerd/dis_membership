import { Play, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoLessonCardProps {
  title: string;
  imageUrl: string;
  duration: string;
  onClick?: () => void;
}

export function VideoLessonCard({
  title,
  imageUrl,
  duration,
  onClick,
}: VideoLessonCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[170px] group"
    >
      <div className="relative rounded-2xl overflow-hidden mb-2">
        <div className="aspect-video bg-white/5">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-[#7c5dfa]/90 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-1" />
            </div>
          </div>
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Clock className="w-3 h-3 text-white/80" />
          <span className="text-white/90 text-xs">{duration}</span>
        </div>
      </div>

      <h4 className="text-white/90 text-sm text-left line-clamp-2 leading-snug">
        {title}
      </h4>
    </button>
  );
}
