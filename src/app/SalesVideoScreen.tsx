import { ArrowLeft } from 'lucide-react';
import { SalesVideoPlayer } from './components/SalesVideoPlayer';
import { BenefitsList } from './components/BenefitsList';
import { WhatsIncluded } from './components/WhatsIncluded';
import { FAQAccordion } from './components/FAQAccordion';
import { StickyPurchaseCTA } from './components/StickyPurchaseCTA';

export default function SalesVideoScreen() {
  const benefits = [
    { text: 'Sistema validado por +12.847 alunos que já economizaram R$ 5,2 milhões em viagens' },
    { text: 'Acesso vitalício a 120+ cursos + atualizações mensais gratuitas para sempre' },
    { text: 'Ferramentas exclusivas: rastreador de preços, alertas de erro de tarifa, planilhas' },
    { text: 'Comunidade privada com +10.000 viajantes compartilhando ofertas diárias' },
    { text: 'Suporte VIP direto com especialistas + grupo no WhatsApp' },
    { text: 'Garantia incondicional de 30 dias - testou e não gostou? Devolvemos 100%' },
  ];

  const included = [
    {
      title: '120+ aulas práticas em vídeo',
      description: 'Mais de 45 horas ensinando exatamente como encontrar ofertas',
    },
    {
      title: 'Extensão Chrome Premium',
      description: 'Rastreie preços em 15+ sites automaticamente (valor: R$ 147)',
    },
    {
      title: 'Planilhas e calculadoras',
      description: 'Templates prontos para planejar viagens e controlar gastos',
    },
    {
      title: 'Alertas de Erro de Tarifa',
      description: 'Seja notificado antes de todo mundo sobre promoções relâmpago',
    },
    {
      title: 'Comunidade VIP no WhatsApp',
      description: '+10.000 membros compartilhando ofertas em tempo real',
    },
    {
      title: 'Guias de 50+ destinos',
      description: 'Roteiros completos com orçamentos reais e dicas locais',
    },
    {
      title: 'Curso de Milhas e Pontos',
      description: 'Sistema completo para voar de graça ou em primeira classe',
    },
    {
      title: 'Atualizações vitalícias',
      description: 'Novos cursos e ferramentas todo mês sem custo adicional',
    },
  ];

  const faqs = [
    {
      question: 'Quanto tempo tenho para concluir o curso?',
      answer:
        'Você tem acesso vitalício. Pode assistir no seu ritmo, pausar e retomar quando quiser. A maioria dos alunos conclui em 8 a 12 semanas dedicando 5 horas semanais.',
    },
    {
      question: 'Preciso de conhecimento prévio?',
      answer:
        'Não. O curso começa do absoluto zero e evolui gradualmente. Se você já tem experiência, pode pular módulos iniciais e focar nas partes avançadas.',
    },
    {
      question: 'Como funciona a garantia de 30 dias?',
      answer:
        'Se por qualquer motivo você não ficar satisfeito nos primeiros 30 dias, devolvemos 100% do valor investido. Sem perguntas, sem burocracia.',
    },
    {
      question: 'O certificado é reconhecido?',
      answer:
        'Sim. É um certificado digital que pode ser compartilhado no LinkedIn e outros portais. Mais de 80% dos nossos alunos reportam melhora na carreira após incluí-lo no currículo.',
    },
    {
      question: 'Posso parcelar o pagamento?',
      answer:
        'Sim, você pode parcelar em até 12x no cartão de crédito. Também aceitamos pagamento via PIX ou boleto à vista com desconto adicional.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-32">
      {/* Header */}
      <div className="px-6 py-4 mb-2">
        <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-white/80" />
        </button>
      </div>

      <div className="px-6">
        {/* URGENCY BANNER - Countdown Timer */}
        <div className="mb-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-xs font-black uppercase tracking-wider mb-1">⚡ Oferta Relâmpago</p>
              <p className="text-white text-sm font-medium">Desconto de 60% termina em:</p>
            </div>
            <div className="flex gap-2">
              {[{ value: '12', label: 'H' }, { value: '34', label: 'M' }, { value: '56', label: 'S' }].map((time, i) => (
                <div key={i} className="text-center">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 min-w-[40px]">
                    <span className="text-white text-lg font-black">{time.value}</span>
                  </div>
                  <span className="text-white/50 text-[10px] font-medium">{time.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCARCITY BANNER - Limited Spots */}
        <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-white/70 text-xs">
              <span className="text-orange-400 font-bold">23 pessoas</span> estão vendo esta oferta agora •
              <span className="text-white font-bold"> Apenas 7 vagas</span> restantes
            </p>
          </div>
        </div>

        {/* Video Player */}
        <SalesVideoPlayer
          thumbnailUrl="https://images.unsplash.com/photo-1634812932028-3baa37d90b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY3MTA2MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          videoTitle="Método Completo: Viaje Mais Gastando Menos"
          discount="-60%"
        />

        {/* Title & Description */}
        <div className="mb-6">
          <h1 className="text-white font-bold text-2xl leading-tight mb-3">
            Método Completo: Passagens Até 70% Mais Baratas
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            Sistema comprovado por +12.000 alunos para encontrar passagens aéreas baratas,
            viajar pelo mundo gastando menos e nunca mais pagar preço cheio.
          </p>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
              <p className="text-white text-lg font-black">12.847</p>
              <p className="text-white/50 text-[10px] uppercase tracking-wide">Alunos</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
              <p className="text-white text-lg font-black">4.9★</p>
              <p className="text-white/50 text-[10px] uppercase tracking-wide">Avaliação</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
              <p className="text-orange-400 text-lg font-black">R$ 5.2M</p>
              <p className="text-white/50 text-[10px] uppercase tracking-wide">Economizados</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <BenefitsList benefits={benefits} />

        {/* TESTIMONIALS - Social Proof com Resultados */}
        <div className="my-8">
          <h2 className="text-white font-bold text-xl mb-1">Resultados Reais</h2>
          <p className="text-white/50 text-xs mb-6">Veja quanto nossos alunos já economizaram</p>

          <div className="space-y-4">
            {[
              {
                name: 'Beatriz M.',
                location: 'São Paulo',
                avatar: 'https://i.pravatar.cc/150?img=1',
                result: 'Economizou R$ 4.850',
                text: 'Comprei passagem para Paris por R$ 2.100 ida e volta usando as técnicas do curso. O preço normal era R$ 6.950. Paguei o curso com o que economizei só nessa viagem!',
                trip: 'SP → Paris',
              },
              {
                name: 'Carlos T.',
                location: 'Rio de Janeiro',
                avatar: 'https://i.pravatar.cc/150?img=2',
                result: 'Economizou R$ 6.200',
                text: 'Encontrei um erro de tarifa para o Caribe - 7 dias em Punta Cana com hotel por R$ 1.800 total. Meus amigos pagaram R$ 8.000 pela mesma viagem.',
                trip: 'RJ → Punta Cana',
              },
              {
                name: 'Juliana S.',
                location: 'Brasília',
                avatar: 'https://i.pravatar.cc/150?img=3',
                result: 'Voou de 1ª Classe',
                text: 'Aprendi a usar milhas e resgatei primeira classe para Dubai por apenas 45.000 pontos. A passagem custaria R$ 28.000 se eu comprasse com dinheiro.',
                trip: 'BSB → Dubai (1ª Classe)',
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <img src={testimonial.avatar} className="w-12 h-12 rounded-full border-2 border-orange-500" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-bold text-sm">{testimonial.name}</p>
                      <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-[10px] font-black uppercase">
                        {testimonial.result}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">{testimonial.location} • {testimonial.trip}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-1 mt-3">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className="text-orange-400 text-sm">★</span>
                  ))}
                  <span className="text-white/50 text-xs ml-2">Verificado</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Included */}
        <WhatsIncluded items={included} />

        {/* VIDEO TESTIMONIALS - Simulado */}
        <div className="my-8">
          <h2 className="text-white font-bold text-xl mb-2">Depoimentos em Vídeo</h2>
          <p className="text-white/50 text-xs mb-6">Veja alunos reais compartilhando suas histórias</p>

          <div className="space-y-3">
            {[
              {
                name: 'Pedro Almeida',
                location: 'Belo Horizonte',
                thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                result: 'Europa por R$ 3.200',
                duration: '2:34',
              },
              {
                name: 'Mariana Costa',
                location: 'Porto Alegre',
                thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                result: 'Caribe: 7 dias por R$ 1.800',
                duration: '1:47',
              },
              {
                name: 'Lucas Fernandes',
                location: 'Recife',
                thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                result: 'Voou 1ª Classe',
                duration: '3:12',
              },
            ].map((video, i) => (
              <div key={i} className="relative flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                {/* Video Thumbnail */}
                <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 4l10 6-10 6V4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-white text-[10px] font-bold">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-white font-bold text-sm mb-1">{video.name}</p>
                  <p className="text-white/50 text-xs mb-2">{video.location}</p>
                  <div className="inline-block px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
                    <span className="text-orange-400 text-[10px] font-bold">{video.result}</span>
                  </div>
                </div>

                {/* Play indicator */}
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* CTA após vídeos */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl text-center">
            <p className="text-white/70 text-sm mb-3">
              Você pode ser o próximo a compartilhar sua história de sucesso
            </p>
            <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-lg transition-colors">
              COMEÇAR AGORA
            </button>
          </div>
        </div>

        {/* HOW IT WORKS - Visual Step by Step */}
        <div className="my-10">
          <h2 className="text-white font-bold text-xl mb-2">Como Funciona</h2>
          <p className="text-white/50 text-xs mb-6">É mais simples do que você imagina</p>

          <div className="space-y-4">
            {[
              {
                step: '1',
                icon: '📚',
                title: 'Acesse o Conteúdo',
                description: '120+ aulas organizadas em módulos progressivos. Comece do zero e evolua no seu ritmo.',
              },
              {
                step: '2',
                icon: '🎯',
                title: 'Aplique as Técnicas',
                description: 'Use as ferramentas exclusivas para rastrear preços e encontrar as melhores ofertas.',
              },
              {
                step: '3',
                icon: '✈️',
                title: 'Compre Mais Barato',
                description: 'Economize 70% nas passagens usando o que aprendeu. Primeira viagem já paga o curso.',
              },
              {
                step: '4',
                icon: '🌍',
                title: 'Viaje o Mundo',
                description: 'Com o dinheiro economizado, viaje mais vezes e conheça mais destinos incríveis.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-400 text-xs font-black">PASSO {item.step}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAVINGS CALCULATOR - Interactive */}
        <div className="my-10 p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl">
          <h2 className="text-white font-bold text-xl mb-2 text-center">Calculadora de Economia</h2>
          <p className="text-white/50 text-xs mb-6 text-center">Veja quanto você pode economizar</p>

          <div className="space-y-4">
            {/* Exemplo de cálculo visual */}
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-white/60 text-sm mb-3">Exemplo: Viagem para Paris</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Passagem (preço normal)</span>
                  <span className="text-white text-sm line-through">R$ 6.950</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Com nossas técnicas</span>
                  <span className="text-green-400 text-sm font-bold">R$ 2.100</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-base">Você economiza:</span>
                  <span className="text-green-400 text-xl font-black">R$ 4.850</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-xs font-bold text-center">
                  🎉 O curso se paga 12x só nesta viagem!
                </p>
              </div>
            </div>

            {/* Outros exemplos */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <p className="text-white/50 text-[10px] uppercase mb-1">Caribe</p>
                <p className="text-green-400 text-lg font-black">-R$ 6.200</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <p className="text-white/50 text-[10px] uppercase mb-1">Ásia 90 dias</p>
                <p className="text-green-400 text-lg font-black">-R$ 8.500</p>
              </div>
            </div>

            <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-black rounded-lg transition-colors">
              COMEÇAR A ECONOMIZAR AGORA
            </button>
          </div>
        </div>

        {/* FAQ */}
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Sticky CTA */}
      <StickyPurchaseCTA
        price="R$ 497"
        originalPrice="R$ 1.247"
      />
    </div>
  );
}
