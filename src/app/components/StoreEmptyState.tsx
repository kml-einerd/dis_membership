import { Tag } from 'lucide-react';

interface StoreEmptyStateProps {
  message?: string;
  description?: string;
}

export function StoreEmptyState({
  message = 'Nenhuma oferta disponível',
  description = 'No momento não há ofertas para esta categoria. Volte em breve!',
}: StoreEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Tag className="w-10 h-10 text-white/30" />
      </div>
      <h3 className="text-white/70 font-medium text-base mb-2 text-center">
        {message}
      </h3>
      <p className="text-white/40 text-sm text-center max-w-xs">
        {description}
      </p>
    </div>
  );
}
