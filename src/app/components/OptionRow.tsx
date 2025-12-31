interface OptionRowProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionRow({ label, selected, onClick }: OptionRowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
        selected
          ? 'bg-[#7c5dfa]/15 border-2 border-[#7c5dfa]'
          : 'bg-white/5 border-2 border-transparent hover:bg-white/8'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            selected
              ? 'border-[#7c5dfa] bg-[#7c5dfa]'
              : 'border-white/30'
          }`}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
        <span className={`${selected ? 'text-white' : 'text-white/70'}`}>
          {label}
        </span>
      </div>
    </button>
  );
}
