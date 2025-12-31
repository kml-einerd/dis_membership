import { ArrowLeft } from 'lucide-react';
import { SalesVideoPlayer } from './components/SalesVideoPlayer';
import { BenefitsList } from './components/BenefitsList';
import { WhatsIncluded } from './components/WhatsIncluded';
import { FAQAccordion } from './components/FAQAccordion';
import { StickyPurchaseCTA } from './components/StickyPurchaseCTA';

export default function SalesVideoScreen() {
  const benefits = [
    { text: 'Método comprovado por mais de 5.000 alunos em 12 países' },
    { text: 'Aprenda no seu ritmo com acesso vitalício ao conteúdo' },
    { text: 'Certificado reconhecido para alavancar sua carreira' },
    { text: 'Comunidade exclusiva de profissionais da área' },
    { text: 'Garantia incondicional de 30 dias - risco zero' },
  ];

  const included = [
    {
      title: '120 aulas práticas em vídeo',
      description: 'Mais de 40 horas de conteúdo direto ao ponto',
    },
    {
      title: 'Projetos reais para portfólio',
      description: '8 cases completos que você implementa junto',
    },
    {
      title: 'Materiais e templates',
      description: 'Planilhas, checklists e frameworks prontos',
    },
    {
      title: 'Suporte direto com mentores',
      description: 'Tire dúvidas e receba feedback personalizado',
    },
    {
      title: 'Atualizações contínuas',
      description: 'Novos módulos adicionados a cada trimestre',
    },
    {
      title: 'Certificado digital',
      description: 'Reconhecido e compartilhável no LinkedIn',
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
        {/* Video Player */}
        <SalesVideoPlayer
          thumbnailUrl="https://images.unsplash.com/photo-1634812932028-3baa37d90b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY3MTA2MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          videoTitle="Formação Completa em Marketing Digital"
          discount="-60%"
        />

        {/* Title & Description */}
        <div className="mb-8">
          <h1 className="text-white font-medium text-2xl leading-tight mb-3">
            Formação Completa em Marketing Digital
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Do zero ao profissional: aprenda a criar estratégias de marketing que geram resultados 
            reais. Método validado, projetos práticos e suporte completo.
          </p>
        </div>

        {/* Benefits */}
        <BenefitsList benefits={benefits} />

        {/* What's Included */}
        <WhatsIncluded items={included} />

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
