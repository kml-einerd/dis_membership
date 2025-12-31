import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  firstName?: string;
}

export function Header({ firstName = "André" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-[#0a0a0f]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/30 flex items-center justify-center border border-purple-500/20">
          <span className="text-sm text-white/90">{firstName[0]}</span>
        </div>
        <div>
          <p className="text-xs text-white/50">Olá,</p>
          <p className="text-sm text-white/90">{firstName}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-white/70 hover:text-white/90 transition-colors">
          <Search size={20} />
        </button>
        <button className="relative text-white/70 hover:text-white/90 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#7c5dfa] rounded-full" />
        </button>
      </div>
    </header>
  );
}
