import { ArrowLeft } from 'lucide-react';

interface MinimalArticleTopBarProps {
  onBack?: () => void;
}

export function MinimalArticleTopBar({ onBack }: MinimalArticleTopBarProps) {
  return (
    <div className="px-6 py-4 mb-4">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        <ArrowLeft className="w-4 h-4 text-white/80" />
      </button>
    </div>
  );
}
