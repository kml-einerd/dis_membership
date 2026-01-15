import { useState } from 'react';
import { ChevronDown, ChevronUp, Paperclip } from 'lucide-react';

interface ExpandableDescriptionProps {
  title: string;
  metadata: string;
  description: string;
  hasMaterials?: boolean;
}

export function ExpandableDescription({
  title,
  metadata,
  description,
  hasMaterials = false,
}: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="px-6 mb-5">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h1 className="text-white font-medium text-lg leading-tight mb-2">
            {title}
          </h1>
          <p className="text-white/50 text-xs font-medium mb-2">{metadata}</p>
        </div>
        {hasMaterials && (
          <div className="ml-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#7c5dfa]/10 border border-[#7c5dfa]/20 rounded-lg">
            <Paperclip className="w-3.5 h-3.5 text-[#7c5dfa]" />
            <span className="text-[#7c5dfa] text-xs font-medium">Materiais</span>
          </div>
        )}
      </div>

      <div className="relative">
        <p
          className={`text-white/70 text-sm leading-relaxed ${
            isExpanded ? '' : 'line-clamp-2'
          }`}
        >
          {description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[#7c5dfa] text-xs font-medium mt-2 hover:text-[#6b4de8] transition-colors"
        >
          <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
