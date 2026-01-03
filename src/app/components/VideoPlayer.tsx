import { useState } from 'react';
import { ArrowLeft, Play, Pause, Maximize } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoPlayerProps {
  thumbnailUrl: string;
  title: string;
  onBack?: () => void;
}

export function VideoPlayer({ thumbnailUrl, title, onBack }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(145); // 2:25
  const [duration] = useState(720); // 12:00

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="relative bg-black rounded-3xl overflow-hidden mb-5">
      <div className="aspect-video relative">
        {/* Video thumbnail */}
        <ImageWithFallback
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors flex items-center justify-center z-10"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>

        {/* Center play/pause */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-[#7c5dfa]/90 hover:bg-[#7c5dfa] backdrop-blur-sm transition-all hover:scale-105 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-white fill-white" />
            ) : (
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            )}
          </button>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress bar */}
          <div className="mb-3">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group">
              <div
                className="h-full bg-[#7c5dfa] rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Time and fullscreen */}
          <div className="flex items-center justify-between">
            <span className="text-white text-xs font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button className="w-8 h-8 rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors flex items-center justify-center">
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
