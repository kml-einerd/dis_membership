import { Info, Lightbulb, TriangleAlert } from 'lucide-react';

interface CalloutProps {
  type: 'tip' | 'note' | 'warning';
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  const config = {
    tip: {
      icon: Lightbulb,
      bgColor: 'bg-[#7c5dfa]/5',
      borderColor: 'border-l-[#7c5dfa]',
      iconColor: 'text-[#7c5dfa]',
      label: 'Dica',
    },
    note: {
      icon: Info,
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-l-blue-400',
      iconColor: 'text-blue-400',
      label: 'Nota',
    },
    warning: {
      icon: TriangleAlert,
      bgColor: 'bg-yellow-500/5',
      borderColor: 'border-l-yellow-400',
      iconColor: 'text-yellow-400',
      label: 'Atenção',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, label } = config[type];

  return (
    <div
      className={`${bgColor} ${borderColor} border-l-[3px] rounded-r-xl p-4 my-6`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${iconColor} mt-0.5`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className={`${iconColor} text-xs font-medium mb-1.5`}>
            {label}
          </div>
          <div className="text-white/80 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
