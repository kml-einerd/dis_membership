import { useState } from 'react';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';

interface ArticleTopBarProps {
  onBack?: () => void;
}

export function ArticleTopBar({ onBack }: ArticleTopBarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--app-bg)]/60 backdrop-blur-xl border-b border-[var(--glass-border)]">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-all flex items-center justify-center group active:scale-95"
      >
        <ArrowLeft className="w-5 h-5 text-[var(--text-primary)] group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center active:scale-95 ${
            isBookmarked
              ? 'bg-[var(--accent-primary-soft)] border-[var(--accent-primary-border)] text-[var(--accent-primary)]'
              : 'bg-[var(--glass-surface-2)] border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] text-[var(--text-tertiary)]'
          }`}
        >
          <Bookmark
            className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-current' : ''}`}
          />
        </button>
        <button className="w-10 h-10 rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-all flex items-center justify-center text-[var(--text-tertiary)] active:scale-95">
          <Share2 className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
