import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Lock, Play, Star, TrendingUp, Users, Award, Shield, Zap, Target, ArrowRight, X } from 'lucide-react';

const LandingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--glass-surface-base)]">
      {/* HERO SECTION - Above the Fold */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 via-transparent to-[var(--accent-secondary)]/10" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6"
          >
            <Award className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-xs text-white/80 font-medium">Escolhido por mais de 15.000 pessoas</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 tracking-tighter"
          >
            Transforme Seus Resultados<br />
            <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Em Tempo Recorde
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Método comprovado usado por milhares de pessoas para alcançar objetivos extraordinários
            sem complicação ou perda de tempo
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-black rounded-xl text-base uppercase tracking-wider hover:scale-105 transition-transform shadow-2xl shadow-[var(--accent-primary)]/30 w-full sm:w-auto">
              Começar Agora
            </button>
            <button
              onClick={() => setShowVideoModal(true)}
              className="px-8 py-4 bg-white/5 backdrop-blur-xl text-white font-bold rounded-xl text-base border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <Play className="w-5 h-5" />
              Assistir Demo
            </button>
          </motion.div>

          {/* Social proof stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { value: '15.847', label: 'Membros Ativos' },
              { value: '4.9/5', label: 'Avaliação Média' },
              { value: '94%', label: 'Taxa de Sucesso' }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                <p className="text-white text-2xl font-black mb-1">{stat.value}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 bg-gradient-to-b from-red-500/5 to-transparent">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-12">
            Você está cansado de...
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: X, title: 'Resultados Lentos', description: 'Métodos tradicionais que levam meses ou anos para funcionar' },
              { icon: X, title: 'Informação Dispersa', description: 'Perder tempo tentando juntar as peças de múltiplas fontes' },
              { icon: X, title: 'Falta de Direção', description: 'Não saber qual o próximo passo ou se está no caminho certo' }
            ].map((problem, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-red-500/20">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white text-xl font-black mb-2">{problem.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              A Solução Completa em <span className="text-[var(--accent-primary)]">Um Só Lugar</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Sistema passo a passo validado por milhares de membros com resultados comprovados
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Método Validado',
                description: 'Framework testado e aprovado por + de 15.000 pessoas',
                benefit: 'Evite erros e economize anos de tentativa e erro'
              },
              {
                icon: Zap,
                title: 'Resultados Rápidos',
                description: 'Primeiros resultados visíveis nas primeiras semanas',
                benefit: 'Acelere sua jornada com atalhos comprovados'
              },
              {
                icon: Users,
                title: 'Comunidade Ativa',
                description: 'Grupo exclusivo com networking e suporte contínuo',
                benefit: 'Nunca mais se sinta sozinho na jornada'
              },
              {
                icon: TrendingUp,
                title: 'Atualizações Constantes',
                description: 'Conteúdo novo adicionado mensalmente sem custo adicional',
                benefit: 'Sempre à frente com estratégias atualizadas'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[var(--accent-primary)]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-white text-xl font-black mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm mb-3">{feature.description}</p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-green-400/90 text-xs font-medium">{feature.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-4">
            Resultados Reais de Membros
          </h2>
          <p className="text-white/60 text-center mb-12">Veja o que outros estão conquistando</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ana Carolina',
                role: 'Membro há 4 meses',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                rating: 5,
                result: '3x mais resultados',
                quote: 'Em 4 meses consegui resultados que antes levaria anos. O método é incrivelmente eficiente e prático.'
              },
              {
                name: 'Ricardo Mendes',
                role: 'Membro há 8 meses',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                rating: 5,
                result: 'Superou expectativas',
                quote: 'Melhor investimento que já fiz. A comunidade sozinha já vale o preço da assinatura.'
              },
              {
                name: 'Juliana Santos',
                role: 'Membro há 1 ano',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                rating: 5,
                result: 'Mudança completa',
                quote: 'Transformou completamente minha abordagem. Sigo o método até hoje e os resultados continuam vindo.'
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-bold text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="mb-3 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg inline-block">
                  <p className="text-green-400 text-xs font-bold">✓ {testimonial.result}</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-white/60 text-lg mb-6">Todos os planos incluem acesso completo ao conteúdo</p>

            {/* Toggle Monthly/Annual */}
            <div className="inline-flex items-center gap-3 p-1 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-white/10 text-white'
                    : 'text-white/50'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setSelectedPlan('annual')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  selectedPlan === 'annual'
                    ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white'
                    : 'text-white/50'
                }`}
              >
                Anual
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px]">-40%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Básico',
                price: selectedPlan === 'monthly' ? '97' : '697',
                period: selectedPlan === 'monthly' ? '/mês' : '/ano',
                savings: selectedPlan === 'annual' ? 'Economize R$ 467/ano' : null,
                features: [
                  'Acesso a todos os módulos',
                  'Atualizações mensais',
                  'Comunidade exclusiva',
                  'Suporte por email'
                ],
                popular: false
              },
              {
                name: 'Premium',
                price: selectedPlan === 'monthly' ? '197' : '1.397',
                period: selectedPlan === 'monthly' ? '/mês' : '/ano',
                savings: selectedPlan === 'annual' ? 'Economize R$ 967/ano' : null,
                features: [
                  'Tudo do plano Básico',
                  'Sessões de mentoria em grupo',
                  'Templates e ferramentas extras',
                  'Certificado de conclusão',
                  'Suporte prioritário'
                ],
                popular: true
              },
              {
                name: 'VIP',
                price: selectedPlan === 'monthly' ? '397' : '2.897',
                period: selectedPlan === 'monthly' ? '/mês' : '/ano',
                savings: selectedPlan === 'annual' ? 'Economize R$ 1.867/ano' : null,
                features: [
                  'Tudo do plano Premium',
                  '1 sessão individual/mês',
                  'Análise personalizada',
                  'Acesso antecipado a novos conteúdos',
                  'Grupo VIP exclusivo',
                  'Suporte via WhatsApp'
                ],
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[var(--accent-primary)]/10 to-transparent border-2 border-[var(--accent-primary)]'
                    : 'bg-white/5 backdrop-blur-xl border border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full">
                    <p className="text-white text-xs font-black uppercase">Mais Popular</p>
                  </div>
                )}

                <h3 className="text-white text-xl font-black mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-white text-5xl font-black">R$ {plan.price}</span>
                  <span className="text-white/50 text-lg">{plan.period}</span>
                </div>
                {plan.savings && (
                  <p className="text-green-400 text-xs font-bold mb-6">{plan.savings}</p>
                )}

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white hover:scale-105 shadow-xl'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Começar Agora
                </button>
              </motion.div>
            ))}
          </div>

          {/* Money-back guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-white text-xl font-black mb-1">Garantia de 30 Dias</h3>
              <p className="text-white/70 text-sm">
                Se você não estiver 100% satisfeito, devolvemos seu dinheiro sem perguntas. Risco zero para você.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {[
              {
                question: 'Como funciona o acesso?',
                answer: 'Após a compra, você recebe acesso imediato à plataforma completa. Basta fazer login e começar. Todo o conteúdo está disponível 24/7.'
              },
              {
                question: 'Posso cancelar a qualquer momento?',
                answer: 'Sim! Não há período de fidelidade. Você pode cancelar quando quiser e manter acesso até o final do período pago.'
              },
              {
                question: 'Quanto tempo leva para ver resultados?',
                answer: 'A maioria dos membros relata resultados visíveis nas primeiras 2-4 semanas aplicando o método. Resultados variam conforme dedicação e aplicação.'
              },
              {
                question: 'Preciso de conhecimento prévio?',
                answer: 'Não! O método foi desenvolvido para pessoas de todos os níveis, desde iniciantes absolutos até avançados. Começamos do básico e avançamos gradualmente.'
              },
              {
                question: 'Como funciona a garantia?',
                answer: 'Você tem 30 dias para testar tudo. Se não gostar por qualquer motivo, basta enviar um email e devolvemos 100% do valor investido.'
              },
              {
                question: 'O conteúdo é atualizado?',
                answer: 'Sim! Adicionamos conteúdo novo todo mês sem custo adicional. Você sempre tem acesso às estratégias mais atualizadas.'
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-bold pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform ${
                      expandedFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-white/70 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-gradient-to-br from-[var(--accent-primary)]/20 via-transparent to-[var(--accent-secondary)]/20 backdrop-blur-xl rounded-3xl border border-white/10 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Pronto Para Começar Sua Transformação?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 15.000 membros que já estão alcançando resultados extraordinários
            </p>

            <button className="px-12 py-5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-black rounded-xl text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-2xl shadow-[var(--accent-primary)]/30 mb-6">
              Garantir Minha Vaga Agora
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Pagamento 100% seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Garantia de 30 dias</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--glass-surface-1)] border border-white/10 rounded-2xl p-6 max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-xl font-bold">Vídeo de Apresentação</h3>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
              <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white/50 mb-4 mx-auto" />
                  <p className="text-white/50 text-sm">Vídeo de demonstração</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
