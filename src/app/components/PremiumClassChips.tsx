interface PremiumClassChipsProps {
  chips: string[];
  selectedChip: string;
  onSelectChip: (chip: string) => void;
}

export function PremiumClassChips({ chips, selectedChip, onSelectChip }: PremiumClassChipsProps) {
  return (
    <div className="flex gap-2 px-6 mb-5 overflow-x-auto scrollbar-hide pb-1">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelectChip(chip)}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            selectedChip === chip
              ? 'bg-[#7c5dfa]/15 text-[#7c5dfa] border border-[#7c5dfa]/30'
              : 'bg-white/5 text-white/50 hover:bg-white/8 hover:text-white/70 border border-white/10'
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
