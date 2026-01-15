import { ArrowLeft, Play } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { PaywallCard } from './components/PaywallCard';

export default function LockedContentPreview() {
  const benefits = [
    { text: 'Acesso completo a todas as 120 aulas' },
    { text: 'Materiais e templates para download' },
    { text: 'Certificado digital reconhecido' },
    { text: 'Suporte direto com mentores' },
    { text: 'Comunidade exclusiva de alunos' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="px-6 py-4 mb-2">
        <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-white/80" />
        </button>
      </div>

      <div className="px-6 pb-8">
        {/* Video Preview Section */}
        <div className="mb-6">
          <h1 className="text-white font-medium text-xl leading-tight mb-4">
            Fundamentos de Marketing Digital
          </h1>

          {/* Video player with preview */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1634812932028-3baa37d90b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY3MTA2MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Video preview"
              className="w-full h-full object-cover"
            />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-7 h-7 text-[#0a0a0f] ml-1" />
              </div>
            </div>

            {/* Preview badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg">
              <span className="text-white text-xs font-medium">Preview: 0:20</span>
            </div>

            {/* Gradient fade to indicate locked */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Preview text content */}
          <div className="space-y-3 mb-6">
            <p className="text-white/70 text-sm leading-relaxed">
              Nesta primeira aula você vai aprender os conceitos fundamentais que todo profissional 
              de marketing digital precisa dominar. Vamos cobrir:
            </p>

            <ul className="space-y-2 pl-5">
              <li className="text-white/70 text-sm leading-relaxed list-disc">
                O que é marketing digital e por que importa
              </li>
              <li className="text-white/70 text-sm leading-relaxed list-disc">
                Principais canais e estratégias
              </li>
              <li className="text-white/70 text-sm leading-relaxed list-disc">
                Como construir sua primeira campanha
              </li>
            </ul>

            {/* Fade/blur effect starts here */}
            <div className="relative">
              {/* Blurred content */}
              <div className="blur-sm select-none pointer-events-none opacity-50">
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  Você também vai conhecer as ferramentas essenciais que usamos no dia a dia, 
                  incluindo Google Analytics, Facebook Ads Manager, e plataformas de automação.
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Ao final desta aula, você terá um mapa claro do caminho que vamos percorrer 
                  juntos nos próximos módulos e já saberá montar sua primeira estratégia básica.
                </p>
              </div>

              {/* Fade gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#0a0a0f] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Paywall Card */}
        <PaywallCard
          benefits={benefits}
          price="R$ 497"
          originalPrice="R$ 1.247"
        />
      </div>
    </div>
  );
}
