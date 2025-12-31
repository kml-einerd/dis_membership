import { useState } from 'react';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';

interface ArticleTopBarProps {
  onBack?: () => void;
}

export function ArticleTopBar({ onBack }: ArticleTopBarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        <ArrowLeft className="w-4 h-4 text-white/80" />
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-9 h-9 rounded-full transition-colors flex items-center justify-center ${
            isBookmarked
              ? 'bg-[#7c5dfa]/15 text-[#7c5dfa]'
              : 'bg-white/5 hover:bg-white/10 text-white/80'
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? 'fill-[#7c5dfa]' : ''}`}
          />
        </button>
        <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
          <Share2 className="w-4 h-4 text-white/80" />
        </button>
      </div>
    </div>
  );
}
