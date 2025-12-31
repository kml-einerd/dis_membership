import { useState } from 'react';

interface StoreHeaderProps {
  onFilterChange?: (filter: string) => void;
}

export function StoreHeader({ onFilterChange }: StoreHeaderProps) {
  const [selectedFilter, setSelectedFilter] = useState('Tudo');

  const filters = ['Tudo', 'Cursos', 'Complementos', 'Com desconto'];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className="mb-6">
      <h1 className="text-white font-medium text-2xl px-6 mb-4">Ofertas</h1>
      <div className="flex gap-2 overflow-x-auto px-6 scrollbar-hide pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedFilter === filter
                ? 'bg-[#7c5dfa]/15 text-[#7c5dfa] border border-[#7c5dfa]/30'
                : 'bg-white/5 text-white/50 hover:bg-white/8 hover:text-white/70 border border-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
