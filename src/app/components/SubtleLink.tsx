interface SubtleLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function SubtleLink({ children, onClick }: SubtleLinkProps) {
  return (
    <button
      onClick={onClick}
      className="text-white/40 text-sm hover:text-white/60 transition-colors"
    >
      {children}
    </button>
  );
}
