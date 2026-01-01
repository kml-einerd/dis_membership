import { useState, useEffect } from 'react';
import { 
  Play, 
  Lock, 
  Crown, 
  Flame, 
  Clock, 
  CheckCircle2, 
  MessageCircle,
  ChevronRight,
  Sparkles,
  Star,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { useNavigation } from '../navigation/NavigationContext';
import { VeloxLayout } from '../../components/layout/VeloxLayout';
import {
  ChipTabs,
  SectionHeader,
  Button,
  GlassSurface,
  NetflixCarousel,
} from '../../components/design-system';
import { motion } from 'motion/react';
import { cn } from '../../lib/cn';

// Countdown Timer Hook
function useCountdown(targetSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(targetSeconds);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  
  return { hours, minutes, seconds, timeLeft };
}

// VIP Locked Card Component
function VIPLockedCard({ 
  imageUrl, 
  title, 
  onClick 
}: { 
  imageUrl: string; 
  title: string; 
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Orange border with glow */}
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-orange-400/40 to-amber-500/40 blur-md group-hover:blur-lg transition-all" />
      
      <div className="relative bg-[var(--app-bg)] rounded-2xl overflow-hidden">
        {/* Image with blur overlay */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover blur-[6px] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
          
          {/* VIP Badge */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg shadow-orange-500/30">
              <Crown className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-[10px] font-black uppercase tracking-wider">VIP</span>
            </div>
          </div>
          
          {/* Lock Icon Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          
          {/* Blurred title */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded blur-sm" />
              <div className="h-3 bg-white/10 rounded blur-sm w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Flash Sale Landscape Card
function FlashSaleCard({ onClick }: { onClick?: () => void }) {
  const { hours, minutes, seconds } = useCountdown(8095); // ~02:14:55
  
  const formatTime = (n: number) => n.toString().padStart(2, '0');
  
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group transition-all duration-300 hover:scale-[1.02] overflow-hidden rounded-2xl"
    >
      {/* Fiery background */}
      <div className="aspect-[16/9] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Animated fire particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-2 h-8 bg-gradient-to-t from-orange-500 to-transparent rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-0 left-1/2 w-3 h-12 bg-gradient-to-t from-red-500 to-transparent rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="absolute bottom-0 right-1/4 w-2 h-10 bg-gradient-to-t from-amber-500 to-transparent rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
            <span className="text-orange-300 text-xs font-black uppercase tracking-widest">Oferta Relâmpago</span>
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
          </div>
          
          {/* Title */}
          <h3 className="text-white text-lg lg:text-xl font-black text-center mb-3 drop-shadow-lg">
            🔥 Pacote Europa + Ásia
          </h3>
          
          {/* Countdown */}
          <div className="flex items-center gap-1 mb-4">
            <span className="text-orange-200 text-xs font-bold">Termina em</span>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-white font-mono text-lg font-black tabular-nums">{formatTime(hours)}</span>
              <span className="text-orange-400 font-black">:</span>
              <span className="text-white font-mono text-lg font-black tabular-nums">{formatTime(minutes)}</span>
              <span className="text-orange-400 font-black">:</span>
              <span className="text-white font-mono text-lg font-black tabular-nums">{formatTime(seconds)}</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-sm font-black uppercase tracking-wide rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 active:scale-95">
            Garantir Desconto
          </button>
        </div>
      </div>
    </div>
  );
}

// Sales Bundle Card
function SalesBundleCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
    >
      <GlassSurface
        variant="surface-3"
        blur="heavy"
        className="rounded-2xl overflow-hidden border border-[var(--accent-primary-border)]"
      >
        {/* Split image header */}
        <div className="relative h-28 flex">
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
              alt="Course 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--app-bg)]" />
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
              alt="Course 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--app-bg)]" />
          </div>
          {/* Center blend */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-[var(--app-bg)]/80 to-transparent" />
          
          {/* Bundle badge */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--accent-primary)] rounded-full">
              <Sparkles className="w-3 h-3 text-black" />
              <span className="text-black text-[9px] font-black uppercase tracking-wide">Combo</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              <span className="text-white text-[10px] font-bold">4.9</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h4 className="text-[var(--text-primary)] text-sm font-bold mb-1">
            Combo Milhas PRO: 2 Cursos
          </h4>
          <p className="text-[var(--text-tertiary)] text-xs mb-3">
            56 aulas • 18h de conteúdo • Certificados
          </p>
          
          {/* Pricing */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[var(--text-muted)] text-sm line-through">R$ 997</span>
            <span className="text-[var(--accent-primary)] text-2xl font-black">R$ 497</span>
            <span className="px-2 py-0.5 bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] text-[10px] font-bold rounded-full">
              -50%
            </span>
          </div>
          
          {/* CTA */}
          <Button variant="primary" size="sm" fullWidth className="font-bold">
            Comprar Combo
          </Button>
        </div>
      </GlassSurface>
    </div>
  );
}

// Instructor Portrait Card
function InstructorCard({ 
  imageUrl, 
  name, 
  role, 
  badge,
  onClick 
}: { 
  imageUrl: string; 
  name: string; 
  role: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative rounded-2xl overflow-hidden bg-[var(--glass-surface-2)] border border-[var(--glass-border)]">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-[var(--accent-primary)] text-black text-[9px] font-black uppercase tracking-wide rounded-full">
                {badge}
              </span>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <h4 className="text-white text-sm font-bold mb-0.5">{name}</h4>
            <p className="text-white/70 text-xs">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Landscape Destination Card
function DestinationCard({ 
  imageUrl, 
  title, 
  subtitle,
  badge,
  onClick 
}: { 
  imageUrl: string; 
  title: string; 
  subtitle: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="aspect-[16/10] relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {badge && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-[var(--accent-secondary)] text-black text-[9px] font-black uppercase tracking-wide rounded-full">
                {badge}
              </span>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <h4 className="text-white text-base font-bold mb-0.5">{title}</h4>
            <p className="text-white/70 text-xs">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Bundle Card
function IconBundleCard({ 
  icon: Icon, 
  title, 
  subtitle,
  onClick 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  subtitle: string;
  onClick?: () => void;
}) {
  return (
    <GlassSurface
      variant="surface-2"
      blur="medium"
      className="p-4 rounded-2xl cursor-pointer hover:bg-[var(--glass-surface-hover)] transition-all"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary-soft)] to-[var(--accent-secondary-soft)] border border-[var(--accent-primary-border)] flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
      </div>
      <h4 className="text-[var(--text-primary)] text-sm font-bold mb-0.5">{title}</h4>
      <p className="text-[var(--text-tertiary)] text-xs">{subtitle}</p>
    </GlassSurface>
  );
}

// Resume Bar Component
function ResumeBarEnhanced({
  imageUrl,
  title,
  progress,
  onClick,
}: {
  imageUrl: string;
  title: string;
  progress: number;
  onClick?: () => void;
}) {
  return (
    <div className="bg-[#0a1414] border border-white/5 rounded-2xl p-4 lg:p-5">
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div
          className="relative w-20 h-14 lg:w-28 lg:h-[72px] rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group"
          onClick={onClick}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 text-black fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1">
            Retomar
          </p>
          <h3 className="text-[var(--text-primary)] text-sm lg:text-base font-bold truncate">
            {title}
          </h3>

          {/* Progress Bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[var(--text-muted)] text-xs font-bold tabular-nums">
              {progress}%
            </span>
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={onClick}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-black font-bold text-sm rounded-xl transition-all active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" />
          Play
        </button>
      </div>
    </div>
  );
}

// Sidebar Upgrade Widget with Countdown
function SidebarUpgradeWidget() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 4, minutes: 57 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
        }
        return { days, hours, minutes };
      });
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <GlassSurface
      variant="surface-3"
      blur="heavy"
      glow
      glowColor="var(--accent-purchase)"
      className="p-5 rounded-2xl text-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
          <Crown className="w-7 h-7 text-white" />
        </div>
        
        <h3 className="text-[var(--text-primary)] text-lg font-black mb-2">
          Acesse Premium
        </h3>
        
        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="text-center">
            <div className="text-[var(--text-primary)] text-xl font-black tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[var(--text-muted)] text-[9px] uppercase tracking-wider">Dias</div>
          </div>
          <span className="text-[var(--text-muted)] text-xl font-bold">:</span>
          <div className="text-center">
            <div className="text-[var(--text-primary)] text-xl font-black tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[var(--text-muted)] text-[9px] uppercase tracking-wider">Horas</div>
          </div>
          <span className="text-[var(--text-muted)] text-xl font-bold">:</span>
          <div className="text-center">
            <div className="text-[var(--text-primary)] text-xl font-black tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[var(--text-muted)] text-[9px] uppercase tracking-wider">Minutos</div>
          </div>
        </div>
        
        <p className="text-[var(--text-tertiary)] text-xs mb-4">
          Todos os cursos + Certificados + Suporte VIP
        </p>
        
        <Button variant="purchase" size="md" fullWidth className="font-black">
          Upgrade Now
        </Button>
      </div>
    </GlassSurface>
  );
}

export default function VeloxDashboardV6() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Meus Cursos', 'Em Alta', 'Ofertas Exclusivas', 'Ao Vivo'];

  // Instructor cards data
  const instructors = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      name: 'Carlos Vieira',
      role: 'Especialista em Emissões',
      badge: 'Top Instrutor',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      name: 'Maria Santos',
      role: 'Travel Hacker',
      badge: 'Bestseller',
    },
    // VIP card will be inserted at position 3
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      name: 'Ana Costa',
      role: 'Beach Hunter',
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      name: 'João Ferreira',
      role: 'Nômade Digital',
    },
  ];

  // Destination cards data
  const destinations = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=800',
      title: 'Nova York Econômica',
      subtitle: '22 aulas • 6h 15min',
      badge: 'Popular',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=800',
      title: 'Paris Low Cost',
      subtitle: '20 aulas • 5h 50min',
      badge: 'Atualizado',
    },
    // Flash sale card will be inserted at position 3
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1590077066281-edbd16178b7e?w=800',
      title: 'Japão Econômico',
      subtitle: '30 aulas • 8h 30min',
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1721592872734-3398900b195c?w=800',
      title: 'Tailândia Praias',
      subtitle: '24 aulas • 7h 20min',
      badge: 'TOP 5',
    },
  ];

  // Icon techniques data
  const techniques = [
    // Sales bundle will be first
    {
      id: '2',
      icon: TrendingUp,
      title: 'Análise de Preços',
      subtitle: '12 aulas avançadas',
    },
    {
      id: '3',
      icon: Award,
      title: 'Milhas Premium',
      subtitle: '18 aulas exclusivas',
    },
    {
      id: '4',
      icon: Zap,
      title: 'Erros de Tarifa',
      subtitle: '8 aulas práticas',
    },
  ];

  // Sidebar trailers
  const newTrailers = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=400',
      title: 'Ásia Econômica',
      subtitle: 'Novo módulo',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1579077926357-365f07b70b01?w=400',
      title: 'Caribe Low Cost',
      subtitle: 'Em destaque',
    },
  ];

  // Render sidebar
  const renderRightSidebar = () => (
    <div className="space-y-6">
      {/* Novidades Widget */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[var(--text-primary)] text-sm font-bold">Novidades</h3>
          <span className="text-[var(--text-muted)] text-xs">Hoje</span>
        </div>
        <div className="space-y-3">
          {newTrailers.map((trailer) => (
            <div
              key={trailer.id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--glass-surface-hover)] transition-colors cursor-pointer"
              onClick={() => navigate('video-lesson')}
            >
              <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={trailer.imageUrl}
                  alt={trailer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[var(--text-primary)] text-sm font-semibold truncate">
                  {trailer.title}
                </h4>
                <p className="text-[var(--text-muted)] text-xs">{trailer.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassSurface>

      {/* Seu Progresso Widget */}
      <GlassSurface
        variant="surface-2"
        blur="medium"
        className="p-5 rounded-2xl"
      >
        <h3 className="text-[var(--text-primary)] text-sm font-bold mb-4">
          Seu progresso
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-tertiary)] text-xs">Módulos completos</span>
              <span className="text-[var(--text-primary)] text-xs font-bold">3 de 8</span>
            </div>
            <div className="h-2 bg-[var(--glass-surface-3)] rounded-full overflow-hidden">
              <div className="h-full w-[37.5%] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-tertiary)] text-xs">Tempo esta semana</span>
              <span className="text-[var(--text-primary)] text-xs font-bold">4h 30min</span>
            </div>
            <div className="h-2 bg-[var(--glass-surface-3)] rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-[var(--accent-purchase)] to-[var(--accent-premium)] rounded-full" />
            </div>
          </div>
        </div>
      </GlassSurface>

      {/* Acesse Premium Widget with Countdown */}
      <SidebarUpgradeWidget />
    </div>
  );

  return (
    <VeloxLayout rightSidebar={renderRightSidebar()}>
      {/* Hero Section - Tropical Background */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-6 lg:mb-8"
      >
        <div className="relative h-[380px] lg:h-[440px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
              alt="Tropical Beach"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)] via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-6 lg:px-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] rounded-full w-fit mb-4">
              <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-wider">
                Estratégia do Mês
              </span>
            </div>
            
            <h1 className="text-white text-3xl lg:text-5xl font-black leading-tight mb-4 drop-shadow-lg">
              O Guia Definitivo<br />das Emissões
            </h1>
            
            <p className="text-white/80 text-base lg:text-lg mb-6 max-w-xl">
              Domine as técnicas avançadas de emissão de milhas e economize até 70% nas suas próximas viagens.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('video-lesson')}
                className="gap-2 font-black"
              >
                <Play className="w-5 h-5 fill-current" />
                Assistir Agora
              </Button>
              <button
                onClick={() => navigate('course-detail')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-xl transition-all border border-white/20"
              >
                Ver Detalhes do Evento
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="px-4 lg:px-6 pb-24 lg:pb-6">
        {/* Resume Bar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ResumeBarEnhanced
            imageUrl="https://images.unsplash.com/photo-1721592872734-3398900b195c?w=400"
            title="ALIA 04 - O Segredo das Emissões Tabela Fixa"
            progress={50}
            onClick={() => navigate('video-lesson')}
          />
        </motion.section>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <ChipTabs tabs={filters} activeTab={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        {/* Recomendados para você - Portrait Instructor Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <NetflixCarousel title="Recomendados para você">
            {/* First two instructors */}
            {instructors.slice(0, 2).map((instructor) => (
              <div key={instructor.id} className="flex-shrink-0 w-[160px] lg:w-[180px]">
                <InstructorCard
                  imageUrl={instructor.imageUrl}
                  name={instructor.name}
                  role={instructor.role}
                  badge={instructor.badge}
                  onClick={() => navigate('course-detail')}
                />
              </div>
            ))}
            
            {/* VIP Locked Card - Third position */}
            <div className="flex-shrink-0 w-[160px] lg:w-[180px]">
              <VIPLockedCard
                imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                title="Conteúdo VIP Exclusivo"
                onClick={() => navigate('locked-preview')}
              />
            </div>
            
            {/* Rest of instructors */}
            {instructors.slice(2).map((instructor) => (
              <div key={instructor.id} className="flex-shrink-0 w-[160px] lg:w-[180px]">
                <InstructorCard
                  imageUrl={instructor.imageUrl}
                  name={instructor.name}
                  role={instructor.role}
                  badge={instructor.badge}
                  onClick={() => navigate('course-detail')}
                />
              </div>
            ))}
          </NetflixCarousel>
        </motion.section>

        {/* Destinos Populares - Landscape Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <NetflixCarousel title="Destinos Populares">
            {/* First two destinations */}
            {destinations.slice(0, 2).map((dest) => (
              <div key={dest.id} className="flex-shrink-0 w-[280px] lg:w-[320px]">
                <DestinationCard
                  imageUrl={dest.imageUrl}
                  title={dest.title}
                  subtitle={dest.subtitle}
                  badge={dest.badge}
                  onClick={() => navigate('course-detail')}
                />
              </div>
            ))}
            
            {/* Flash Sale Card - Third position */}
            <div className="flex-shrink-0 w-[280px] lg:w-[320px]">
              <FlashSaleCard onClick={() => navigate('sales-video')} />
            </div>
            
            {/* Rest of destinations */}
            {destinations.slice(2).map((dest) => (
              <div key={dest.id} className="flex-shrink-0 w-[280px] lg:w-[320px]">
                <DestinationCard
                  imageUrl={dest.imageUrl}
                  title={dest.title}
                  subtitle={dest.subtitle}
                  badge={dest.badge}
                  onClick={() => navigate('course-detail')}
                />
              </div>
            ))}
          </NetflixCarousel>
        </motion.section>

        {/* Técnicas Avançadas - Icons/Bundles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10"
        >
          <SectionHeader
            title="Técnicas Avançadas"
            action={{ label: 'Ver todas', onClick: () => navigate('explore') }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sales Bundle Card - First position */}
            <div className="col-span-2 lg:col-span-1 lg:row-span-2">
              <SalesBundleCard onClick={() => navigate('sales-video')} />
            </div>
            
            {/* Rest of technique cards */}
            {techniques.map((tech) => (
              <div key={tech.id}>
                <IconBundleCard
                  icon={tech.icon}
                  title={tech.title}
                  subtitle={tech.subtitle}
                  onClick={() => navigate('course-detail')}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* WhatsApp Footer Capture Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="-mx-4 lg:-mx-6"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0d3f2e] via-[#0a2f22] to-[#082a1e] py-12 lg:py-16">
            {/* WhatsApp Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2325D366'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />

            {/* Gradient Overlays */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#25D366]/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#25D366]/5 rounded-full blur-[80px]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Copy */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 border border-[#25D366]/30 rounded-full mb-6">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-[#25D366] text-xs font-bold uppercase tracking-wider">
                      Grupo Exclusivo WhatsApp
                    </span>
                  </div>

                  <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-black leading-tight mb-4">
                    🚀 Não perca nenhuma<br />
                    <span className="text-[#25D366]">oportunidade!</span>
                  </h2>

                  <p className="text-[#a0b8ae] text-base lg:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                    Receba alertas em tempo real de promoções exclusivas e erros de tarifa.
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-4 mb-8 text-left max-w-md mx-auto lg:mx-0">
                    {[
                      'Alertas de Erro de Tarifa em primeira mão',
                      'Promoções relâmpago antes de todo mundo',
                      'Dicas exclusivas de economia em viagens'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                        </div>
                        <span className="text-white/90 text-sm lg:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20c55e] text-white text-lg font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] active:scale-95"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Quero Entrar no Grupo VIP Agora
                  </button>

                  <p className="text-[#6b8a7a] text-xs mt-4">
                    🔒 Grupo privado • Sem spam • Saia quando quiser
                  </p>
                </div>

                {/* Right Column - Image */}
                <div className="hidden lg:block relative">
                  <div className="relative aspect-[4/5] max-w-md mx-auto">
                    <div className="absolute inset-0 bg-[#25D366]/20 blur-[60px] rounded-full" />
                    
                    <div className="relative rounded-3xl overflow-hidden border-2 border-[#25D366]/20 shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=750&fit=crop&crop=faces"
                        alt="Person in airport lounge"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#082a1e]/80 via-transparent to-transparent" />

                      {/* Notification Mockup */}
                      <div className="absolute bottom-8 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 text-sm font-bold">Velox Alertas</p>
                            <p className="text-gray-600 text-xs mt-0.5">
                              🔥 ERRO DE TARIFA! São Paulo → Paris por R$ 1.890!
                            </p>
                            <p className="text-gray-400 text-[10px] mt-1">Agora</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </VeloxLayout>
  );
}

