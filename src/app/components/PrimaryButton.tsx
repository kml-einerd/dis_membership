import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = true,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        px-8 py-4 rounded-2xl font-medium text-white transition-all duration-200
        ${
          disabled || loading
            ? 'bg-white/10 cursor-not-allowed'
            : 'bg-[#7c5dfa] hover:bg-[#6b4de8] active:scale-[0.98]'
        }
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
