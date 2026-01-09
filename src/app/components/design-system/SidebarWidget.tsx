import { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { ChevronRight, ArrowUpDown } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface SidebarWidgetProps {
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  sortable?: boolean;
  sortLabel?: string;
  onSortChange?: () => void;
  children: ReactNode;
  className?: string;
}

export function SidebarWidget({
  title,
  action,
  sortable,
  sortLabel,
  onSortChange,
  children,
  className,
}: SidebarWidgetProps) {
  return (
    <GlassSurface
      variant="surface-2"
      blur="medium"
      className={cn('rounded-[var(--radius-xl)] overflow-hidden', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--glass-border-subtle)]">
        <h3 className="text-[var(--text-primary)] text-sm font-semibold">
          {title}
        </h3>
        
        {sortable && (
          <button
            onClick={onSortChange}
            className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs font-medium hover:text-[var(--text-tertiary)] transition-colors"
          >
            <span>Sort by</span>
            <span className="text-[var(--text-primary)]">{sortLabel || 'Today'}</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        )}

        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-1 text-[var(--text-muted)] text-xs font-medium hover:text-[var(--accent-primary)] transition-colors"
          >
            {action.label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </GlassSurface>
  );
}

// Sidebar List Item Component
interface SidebarListItemProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SidebarListItem({
  imageUrl,
  title,
  subtitle,
  rightContent,
  onClick,
  className,
}: SidebarListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-2 rounded-[var(--radius-md)]',
        'hover:bg-[var(--glass-surface-hover)] transition-colors',
        'text-left',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-12 h-12 rounded-[var(--radius-sm)] overflow-hidden flex-shrink-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[var(--text-primary)] text-sm font-medium truncate">
          {title}
        </h4>
        {subtitle && (
          <p className="text-[var(--text-muted)] text-xs mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right content */}
      {rightContent && (
        <div className="flex-shrink-0">
          {rightContent}
        </div>
      )}
    </button>
  );
}

// Sidebar Trailer Card Component
interface SidebarTrailerCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export function SidebarTrailerCard({
  imageUrl,
  title,
  subtitle,
  onClick,
  className,
}: SidebarTrailerCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full aspect-[16/10] rounded-[var(--radius-lg)] overflow-hidden',
        'transition-all duration-300 active:scale-[0.98]',
        className
      )}
    >
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h4 className="text-white text-sm font-semibold truncate">
          {title}
        </h4>
        {subtitle && (
          <p className="text-white/60 text-xs mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* Play button */}
      <div className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--accent-primary)] transition-colors">
        <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </button>
  );
}

