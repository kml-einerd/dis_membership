import { ArrowLeft } from 'lucide-react';
import { StickyPurchaseCTA } from './components/StickyPurchaseCTA';

export default function SalesArticleScreen() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-32">
      {/* Header */}
      <div className="px-6 py-4 mb-2">
        <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-white/80" />
        </button>
      </div>

      <div className="px-6">
        {/* URGENCY BANNER */}
        <div className="mb-4 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-orange-400 text-xs font-bold">OFERTA EXPIRA EM BREVE</p>
            </div>
            <div className="flex gap-1.5">
              {[{ v: '08', l: 'H' }, { v: '47', l: 'M' }].map((t, i) => (
                <div key={i} className="text-center">
                  <div className="bg-white/10 rounded px-1.5 py-0.5 min-w-[28px]">
                    <span className="text-white text-xs font-black">{t.v}</span>
                  </div>
                  <span className="text-white/40 text-[8px]">{t.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white font-bold text-2xl leading-tight mb-3">
          Como Viajar o Mundo Gastando 70% Menos (Mesmo Sem Experiência)
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          O método usado por +12.000 viajantes para economizar R$ 5,2 milhões
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="p-2 bg-white/5 rounded-lg text-center border border-white/10">
            <p className="text-white text-base font-black">12.847</p>
            <p className="text-white/50 text-[9px] uppercase">Alunos</p>
          </div>
          <div className="p-2 bg-white/5 rounded-lg text-center border border-white/10">
            <p className="text-white text-base font-black">4.9★</p>
            <p className="text-white/50 text-[9px] uppercase">Rating</p>
          </div>
          <div className="p-2 bg-white/5 rounded-lg text-center border border-white/10">
            <p className="text-orange-400 text-base font-black">R$ 5.2M</p>
            <p className="text-white/50 text-[9px] uppercase">Economizado</p>
          </div>
        </div>

        {/* Article Content - Rich Reader Style */}
        <article className="prose-custom mb-24">
          <p className="text-white/70 text-base leading-relaxed">
            Você provavelmente já percebeu: o mercado de trabalho mudou. As profissões tradicionais 
            estão saturadas, e as empresas estão desesperadas por profissionais que entendem de verdade 
            como atrair e converter clientes online.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            Mas aqui está o problema: a maioria dos cursos te ensina teoria desatualizada, ferramentas 
            que ninguém usa, e não te prepara para o mercado real.
          </p>

          {/* Callout - Premium style */}
          <div className="relative my-6 p-5 bg-[#7c5dfa]/5 border-l-2 border-[#7c5dfa] rounded-r-xl">
            <p className="text-white/80 text-sm leading-relaxed m-0">
              <strong className="text-white">A verdade é:</strong> você não precisa de mais informação. 
              Você precisa de um método claro, testado e comprovado que te leve do zero a profissional 
              contratável em semanas, não anos.
            </p>
          </div>

          <h2 className="text-white font-medium text-xl mt-8 mb-4">
            Por que este método é diferente
          </h2>

          <p className="text-white/70 text-base leading-relaxed">
            Criei esta formação depois de trabalhar com mais de 200 empresas e treinar milhares de 
            profissionais. O que descobri? <strong className="text-white">80% do sucesso vem de 20% das estratégias.</strong>
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            Esta formação foca exatamente nesses 20%. Você aprende apenas o que realmente importa, 
            sem enrolação, sem conteúdo de enchimento.
          </p>

          <h2 className="text-white font-medium text-xl mt-8 mb-4">
            O que você vai dominar
          </h2>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 1: Sistema de Passagens Baratas (8h 45min)</strong><br />
            O método completo para encontrar passagens até 70% mais baratas. Você vai aprender os sites certos,
            horários ideais para comprar, como usar alertas automáticos e evitar os erros que fazem você pagar mais caro.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 2: Milhas e Pontos - Do Zero ao Primeira Classe (10h 40min)</strong><br />
            Sistema completo de milhagem: melhores cartões, como acumular sem viajar, transferências estratégicas
            e sweet spots para resgatar passagens que valeriam R$ 50.000 por apenas 25.000 milhas. Voe de primeira
            classe pagando economia.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 3: Destinos Específicos com Orçamento Real (12h 30min)</strong><br />
            Guias completos de 50+ destinos com orçamentos reais dia a dia. Europa, Ásia, Américas, Caribe -
            você vai saber exatamente quanto gastar em hospedagem, alimentação, transporte e passeios. Inclui
            roteiros otimizados e dicas de locais.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 4: Ferramentas e Automação (3h 40min)</strong><br />
            Rastreadores de preço, extensões Chrome, alertas automáticos, planilhas inteligentes. Você vai
            ter um arsenal completo de ferramentas que fazem o trabalho pesado por você.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 5: Técnicas Avançadas (6h 20min)</strong><br />
            Erros de tarifa, stopover estratégico, positioning flights, open jaw tickets e outras técnicas
            que só os profissionais usam para economizar ainda mais.
          </p>

          {/* INLINE CTA - Meio do artigo */}
          <div className="my-8 p-5 bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Pronto para começar a economizar?
                </h3>
                <p className="text-white/60 text-sm">
                  Mais de 300 pessoas garantiram acesso nas últimas 24h
                </p>
              </div>
            </div>
            <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-lg transition-colors">
              GARANTIR ACESSO COM 60% OFF
            </button>
            <p className="text-white/40 text-xs text-center mt-2">✓ Garantia de 30 dias • ✓ Acesso vitalício</p>
          </div>

          {/* Callout - Results - EXPANDIDO */}
          <div className="space-y-4 my-8">
            <h3 className="text-white font-bold text-lg mb-4">O que nossos alunos estão dizendo</h3>

            <div className="relative p-5 bg-white/[0.03] border border-white/[0.08] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?img=5" className="w-12 h-12 rounded-full border-2 border-orange-500" />
                <div>
                  <p className="text-white font-bold text-sm">Beatriz M.</p>
                  <p className="text-white/50 text-xs">São Paulo • Verificado em 15/12/2024</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <span key={i} className="text-orange-400 text-sm">★</span>)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed m-0 mb-2">
                "Comprei passagem SP-Paris por R$ 2.100 usando as técnicas. O normal era R$ 6.950.
                Economizei R$ 4.850 em UMA viagem! O curso se pagou 12x."
              </p>
              <div className="mt-3 inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
                <span className="text-orange-400 text-xs font-bold">✓ Economizou R$ 4.850</span>
              </div>
            </div>

            <div className="relative p-5 bg-white/[0.03] border border-white/[0.08] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?img=7" className="w-12 h-12 rounded-full border-2 border-orange-500" />
                <div>
                  <p className="text-white font-bold text-sm">Ricardo T.</p>
                  <p className="text-white/50 text-xs">Curitiba • Verificado em 10/12/2024</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <span key={i} className="text-orange-400 text-sm">★</span>)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed m-0 mb-2">
                "Aprendi a usar milhas e voei primeira classe para Dubai por 45k pontos.
                A passagem custaria R$ 28.000 se eu comprasse. Surreal!"
              </p>
              <div className="mt-3 inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
                <span className="text-purple-400 text-xs font-bold">✓ Voou 1ª Classe</span>
              </div>
            </div>

            <div className="relative p-5 bg-white/[0.03] border border-white/[0.08] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?img=9" className="w-12 h-12 rounded-full border-2 border-orange-500" />
                <div>
                  <p className="text-white font-bold text-sm">Juliana S.</p>
                  <p className="text-white/50 text-xs">Brasília • Verificado em 08/12/2024</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <span key={i} className="text-orange-400 text-sm">★</span>)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed m-0 mb-2">
                "Viajei 90 dias pelo Sudeste Asiático gastando R$ 4.500 total.
                Tailândia, Vietnã, Camboja, Indonésia. Melhor decisão da minha vida."
              </p>
              <div className="mt-3 inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                <span className="text-green-400 text-xs font-bold">✓ 90 dias por R$ 4.500</span>
              </div>
            </div>
          </div>

          <h2 className="text-white font-medium text-xl mt-8 mb-4">
            Isso é para você se...
          </h2>

          <p className="text-white/70 text-base leading-relaxed">
            ✓ Você quer mudar de carreira mas não sabe por onde começar<br />
            ✓ Já tentou aprender sozinho mas se sentiu perdido<br />
            ✓ Quer uma profissão com alta demanda e bons salários<br />
            ✓ Prefere aprender com projetos práticos, não só teoria<br />
            ✓ Busca flexibilidade para trabalhar de onde quiser
          </p>

          <h2 className="text-white font-medium text-xl mt-8 mb-4">
            Investimento e garantia
          </h2>

          <p className="text-white/70 text-base leading-relaxed mb-4">
            O valor da formação completa é <strong className="text-white">R$ 397</strong> (60% OFF do valor original de R$ 997).
            Você pode parcelar em até 12x de R$ 39,70 no cartão.
          </p>

          {/* COMPARISON TABLE */}
          <div className="my-6 p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-white font-bold text-base mb-4 text-center">Compare com outras alternativas</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Agência de viagens (comissão média)</span>
                <span className="text-white text-sm">R$ 800</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Consultoria individual (1 hora)</span>
                <span className="text-white text-sm">R$ 500</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Este curso completo (vitalício)</span>
                <span className="text-green-400 text-sm font-bold">R$ 397</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-xs font-bold text-center">
                ✓ Economize R$ 4.850+ na primeira viagem = ROI de 1.200%
              </p>
            </div>
          </div>

          <p className="text-white/70 text-base leading-relaxed mb-4">
            E tem mais: você tem <strong className="text-white">30 dias de garantia incondicional</strong>.
            Se não gostar, basta pedir reembolso. Sem perguntas, sem burocracia.
          </p>

          <div className="my-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Garantia de Satisfação Total</h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  Você tem 30 dias completos para testar o curso. Se por qualquer motivo não ficar satisfeito,
                  devolvemos 100% do seu dinheiro. É justo, certo? Todo o risco é nosso.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA Callout */}
          <div className="relative my-8 p-6 bg-gradient-to-br from-[#7c5dfa]/10 to-transparent border border-[#7c5dfa]/20 rounded-2xl">
            <h3 className="text-white font-medium text-lg mb-2 m-0">
              Pronto para começar?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed m-0">
              Mais de 5.000 alunos já transformaram suas carreiras. Você é o próximo.
            </p>
          </div>
        </article>
      </div>

      {/* Sticky CTA */}
      <StickyPurchaseCTA
        price="R$ 497"
        originalPrice="R$ 1.247"
      />
    </div>
  );
}
