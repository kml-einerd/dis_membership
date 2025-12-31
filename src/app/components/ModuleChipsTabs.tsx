interface ModuleChipsTabsProps {
  modules: string[];
  selectedModule: string;
  onSelectModule: (module: string) => void;
}

export function ModuleChipsTabs({
  modules,
  selectedModule,
  onSelectModule,
}: ModuleChipsTabsProps) {
  return (
    <div className="px-6 mb-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {modules.map((module) => (
          <button
            key={module}
            onClick={() => onSelectModule(module)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedModule === module
                ? 'bg-[#7c5dfa]/15 text-[#7c5dfa] border border-[#7c5dfa]/30'
                : 'bg-white/5 text-white/50 hover:bg-white/8 hover:text-white/70 border border-white/10'
            }`}
          >
            {module}
          </button>
        ))}
      </div>
    </div>
  );
}
