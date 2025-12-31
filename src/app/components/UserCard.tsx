import { Crown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserCardProps {
  avatarUrl: string;
  name: string;
  email: string;
  plan?: 'free' | 'premium' | 'pro';
}

export function UserCard({ avatarUrl, name, email, plan = 'free' }: UserCardProps) {
  const planLabels = {
    free: 'Gratuito',
    premium: 'Premium',
    pro: 'Pro',
  };

  const planColors = {
    free: 'bg-[var(--app-surface-hover)] text-[var(--app-text-muted)]',
    premium: 'bg-[var(--app-accent-soft)] text-[var(--app-accent)]',
    pro: 'bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] text-white',
  };

  return (
    <div className="bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-2xl p-5 mb-6">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <ImageWithFallback
            src={avatarUrl}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {(plan === 'premium' || plan === 'pro') && (
            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-[var(--app-accent)] flex items-center justify-center border-2 border-[var(--app-bg)]">
              <Crown className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-[var(--app-text-primary)] font-medium text-lg leading-tight mb-1 truncate">
            {name}
          </h2>
          <p className="text-[var(--app-text-muted)] text-sm truncate mb-2">{email}</p>
          
          {/* Plan badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${planColors[plan]}`}
          >
            {(plan === 'premium' || plan === 'pro') && (
              <Crown className="w-3 h-3" />
            )}
            <span>{planLabels[plan]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}