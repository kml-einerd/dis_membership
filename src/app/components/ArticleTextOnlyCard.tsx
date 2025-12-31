import { BookOpen, ArrowRight } from 'lucide-react';

interface ArticleTextOnlyCardProps {
  title: string;
  preview: string;
  readTime: string;
  onClick?: () => void;
}

export function ArticleTextOnlyCard({
  title,
  preview,
  readTime,
  onClick,
}: ArticleTextOnlyCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[260px] p-5 bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl border border-white/[0.08] transition-all duration-200 group text-left"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-[#7c5dfa]/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-3.5 h-3.5 text-[#7c5dfa]" />
        </div>
        <span className="text-[#7c5dfa] text-[10px] font-medium px-2 py-0.5 bg-[#7c5dfa]/10 rounded-md">
          Artigo
        </span>
      </div>

      <h4 className="text-white font-medium mb-2.5 line-clamp-2 leading-snug text-sm">
        {title}
      </h4>

      <p className="text-white/50 text-xs mb-4 line-clamp-3 leading-relaxed">
        {preview}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-white/40 text-[10px] font-medium">{readTime} leitura</span>
        <div className="flex items-center gap-1 text-[#7c5dfa] text-xs font-medium group-hover:gap-1.5 transition-all">
          <span>Ler mais</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
}
