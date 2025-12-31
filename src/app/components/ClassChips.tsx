interface ClassChipsProps {
  chips: string[];
  selectedChip: string;
  onSelectChip: (chip: string) => void;
}

export function ClassChips({ chips, selectedChip, onSelectChip }: ClassChipsProps) {
  return (
    <div className="flex gap-2 px-6 mb-4 overflow-x-auto scrollbar-hide pb-2">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelectChip(chip)}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedChip === chip
              ? 'bg-[#7c5dfa]/20 text-[#7c5dfa] border border-[#7c5dfa]/40'
              : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
