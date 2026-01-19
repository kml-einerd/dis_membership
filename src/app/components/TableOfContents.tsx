import { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="px-6 mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] rounded-2xl transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <List className="w-4 h-4 text-white/70" />
          </div>
          <span className="text-white font-medium text-sm">Sumário</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-white/50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/50" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 p-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className="w-full text-left py-3 px-3 hover:bg-white/[0.03] rounded-lg transition-colors border-l-[3px] border-transparent hover:border-[#7c5dfa]"
              style={{ paddingLeft: `${item.level * 12 + 12}px` }}
            >
              <span className="text-white/70 text-sm hover:text-white transition-colors">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
