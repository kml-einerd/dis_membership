import { Play, Pause } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SalesVideoPlayerProps {
  thumbnailUrl: string;
  videoTitle?: string;
  discount?: string;
}

export function SalesVideoPlayer({
  thumbnailUrl,
  videoTitle,
  discount,
}: SalesVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-6">
      {/* Video thumbnail */}
      <ImageWithFallback
        src={thumbnailUrl}
        alt={videoTitle || 'Video'}
        className="w-full h-full object-cover"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Discount pill - top right */}
      {discount && (
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#7c5dfa] rounded-lg backdrop-blur-sm">
          <span className="text-white text-xs font-medium">{discount}</span>
        </div>
      )}

      {/* Play button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
          {isPlaying ? (
            <Pause className="w-7 h-7 text-[#0a0a0f] ml-0" />
          ) : (
            <Play className="w-7 h-7 text-[#0a0a0f] ml-1" />
          )}
        </div>
      </button>

      {/* Title overlay */}
      {videoTitle && (
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-medium text-base leading-tight">
            {videoTitle}
          </h3>
        </div>
      )}
    </div>
  );
}
