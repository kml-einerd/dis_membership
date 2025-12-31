interface ProgressDotsProps {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === current
              ? 'w-8 bg-[#7c5dfa]'
              : 'w-2 bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}
