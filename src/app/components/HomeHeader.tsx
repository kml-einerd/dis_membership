import { Bell, Search } from 'lucide-react';

interface HomeHeaderProps {
  userName?: string;
}

export function HomeHeader({ userName = 'Usuário' }: HomeHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c5dfa] to-[#5c3dda] flex items-center justify-center text-white font-medium">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="text-white/90">Olá, {userName}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
          <Bell className="w-5 h-5 text-white/70" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#7c5dfa] rounded-full" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
          <Search className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </div>
  );
}
