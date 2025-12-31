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
        {/* Title */}
        <h1 className="text-white font-medium text-2xl leading-tight mb-3">
          Como Transformar Sua Carreira em Marketing Digital (Mesmo Começando do Zero)
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          Por que 5.000+ profissionais escolheram este método para mudar de carreira
        </p>

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
            <strong className="text-white">Módulo 1: Fundamentos Estratégicos</strong><br />
            Aprenda a pensar como um estrategista de marketing. Você vai entender comportamento do 
            consumidor, jornada de compra e como criar mensagens que vendem.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 2: Tráfego e Aquisição</strong><br />
            Domine Google Ads, Facebook Ads e tráfego orgânico. Você vai saber exatamente quanto investir 
            e como calcular ROI de cada campanha.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 3: Conversão e Vendas</strong><br />
            Crie funis que convertem visitantes em clientes. Landing pages, email marketing, automação - 
            tudo conectado em um sistema que funciona.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            <strong className="text-white">Módulo 4: Analytics e Otimização</strong><br />
            Aprenda a ler dados e tomar decisões baseadas em métricas reais. Você vai saber o que está 
            funcionando e o que precisa melhorar.
          </p>

          {/* Callout - Results */}
          <div className="relative my-6 p-5 bg-white/[0.03] border border-white/[0.08] rounded-xl">
            <p className="text-white/60 text-xs uppercase tracking-wide mb-2 m-0">Resultados reais</p>
            <p className="text-white/80 text-sm leading-relaxed m-0 mb-3">
              "Consegui meu primeiro emprego como analista de marketing 6 semanas após começar o curso. 
              Salário: R$ 4.500. Valeu cada centavo."
            </p>
            <p className="text-white/50 text-xs m-0">— Beatriz M., São Paulo</p>
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

          <p className="text-white/70 text-base leading-relaxed">
            O valor da formação completa é R$ 497 (ou 12x de R$ 49). Menos que o preço de um jantar 
            por mês para mudar sua carreira.
          </p>

          <p className="text-white/70 text-base leading-relaxed">
            E tem mais: você tem 30 dias de garantia incondicional. Se não gostar, basta pedir reembolso. 
            Sem perguntas, sem burocracia.
          </p>

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
