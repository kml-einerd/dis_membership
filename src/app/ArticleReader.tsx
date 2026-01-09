import { useState, useEffect } from 'react';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { ArticleTopBar } from './components/ArticleTopBar';
import { ArticleHero } from './components/ArticleHero';
import { TableOfContents } from './components/TableOfContents';
import { MarkdownContent, ArticleImage, ArticleTable } from './components/MarkdownContent';
import { Callout } from './components/Callout';
import { ArticleMaterialsCard } from './components/ArticleMaterialsCard';
import { RelatedContentRow } from './components/RelatedContentRow';
import { ArticleSkeleton } from './components/ArticleSkeleton';
import { LessonInteractionBlock } from '../components/community';
import { mockComments, mockQuestions, mockOrigins } from '../data/mockCommunityData';
import type { CommentFormData, QuestionFormData } from '../components/community/types';

export default function ArticleReader() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const tocItems = [
    { id: 'intro', title: 'Introdução', level: 1 },
    { id: 'fundamentos', title: 'Fundamentos de Marketing Digital', level: 1 },
    { id: 'metricas', title: 'Principais Métricas', level: 2 },
    { id: 'ferramentas', title: 'Ferramentas Essenciais', level: 2 },
    { id: 'estrategias', title: 'Estratégias de Implementação', level: 1 },
    { id: 'cases', title: 'Cases de Sucesso', level: 2 },
    { id: 'conclusao', title: 'Conclusão', level: 1 },
  ];

  const resources = [
    { id: '1', name: 'Checklist de Métricas.pdf', type: 'pdf' as const },
    { id: '2', name: 'Template de Dashboard', type: 'link' as const },
    { id: '3', name: 'Planilha de Análise.xlsx', type: 'file' as const },
  ];

  const relatedItems = [
    {
      id: '1',
      type: 'article' as const,
      title: 'Como Aumentar sua Taxa de Conversão',
      imageUrl: 'https://images.unsplash.com/photo-1709715357528-1d3d78ed6cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBzdHJhdGVneSUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjcwOTk1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '4 min',
    },
    {
      id: '2',
      type: 'video' as const,
      title: 'Google Analytics na Prática',
      imageUrl: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvdXJzZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc2NzA5OTU3MXww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '15:30',
    },
    {
      id: '3',
      type: 'article' as const,
      title: 'ROI e Métricas Avançadas',
      imageUrl: 'https://images.unsplash.com/photo-1652177217044-4f62dacf0ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2NzA4MTYzMXww&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '6 min',
    },
    {
      id: '4',
      type: 'video' as const,
      title: 'Dashboard de Performance',
      imageUrl: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBzY3JlZW58ZW58MXx8fHwxNzY3MDg2Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '12:15',
    },
  ];

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-12">
      <ReadingProgressBar />
      <ArticleTopBar onBack={() => console.log('Navigate back clicked')} />
      
      <ArticleHero
        title="10 Estratégias de Marketing que Funcionam em 2024"
        subtitle="Descubra as táticas mais eficazes para alcançar seu público-alvo e aumentar suas conversões de forma consistente"
        readTime="8 min"
        updatedDate="Atualizado hoje"
        coverImageUrl="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvdXJzZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc2NzA5OTU3MXww&ixlib=rb-4.1.0&q=80&w=1080"
      />

      <TableOfContents items={tocItems} />

      <MarkdownContent
        content={
          <>
            <h2 id="intro">Introdução</h2>
            <p>
              O marketing digital está em constante evolução, e 2024 trouxe mudanças significativas 
              na forma como nos conectamos com audiências. Neste guia completo, você descobrirá as 
              estratégias mais eficazes testadas por profissionais do mercado.
            </p>

            <Callout type="tip">
              As estratégias apresentadas neste artigo foram validadas por mais de 50 empresas 
              em diferentes segmentos, com resultados comprovados de aumento de conversão entre 
              30% e 150%.
            </Callout>

            <h2 id="fundamentos">Fundamentos de Marketing Digital</h2>
            <p>
              Antes de mergulhar nas estratégias específicas, é fundamental compreender os pilares 
              que sustentam qualquer campanha de sucesso. O marketing digital moderno se baseia em 
              três princípios fundamentais:
            </p>

            <ul>
              <li><strong>Conhecimento profundo do público-alvo:</strong> Entender não apenas dados demográficos, mas comportamentos, dores e aspirações</li>
              <li><strong>Mensuração constante:</strong> Tomar decisões baseadas em dados reais, não em intuições</li>
              <li><strong>Otimização contínua:</strong> Testar, aprender e melhorar constantemente suas estratégias</li>
            </ul>

            <h3 id="metricas">Principais Métricas</h3>
            <p>
              Para avaliar o sucesso de suas campanhas, você precisa acompanhar as métricas certas. 
              Aqui estão as mais importantes:
            </p>

            <ArticleTable>
              <table>
                <thead>
                  <tr>
                    <th>Métrica</th>
                    <th>Descrição</th>
                    <th>Objetivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CAC</td>
                    <td>Custo de Aquisição de Cliente</td>
                    <td>&lt; 30% LTV</td>
                  </tr>
                  <tr>
                    <td>Taxa de Conversão</td>
                    <td>Visitantes que se tornam clientes</td>
                    <td>&gt; 3%</td>
                  </tr>
                  <tr>
                    <td>ROI</td>
                    <td>Retorno sobre Investimento</td>
                    <td>&gt; 300%</td>
                  </tr>
                  <tr>
                    <td>LTV</td>
                    <td>Valor do Cliente no Tempo</td>
                    <td>3x CAC</td>
                  </tr>
                </tbody>
              </table>
            </ArticleTable>

            <Callout type="note">
              Os benchmarks apresentados na tabela são médias do mercado. Seu setor específico 
              pode ter valores diferentes. Use-os como referência, não como regra absoluta.
            </Callout>

            <h3 id="ferramentas">Ferramentas Essenciais</h3>
            <p>
              Para implementar essas estratégias com eficiência, você precisará dominar algumas 
              ferramentas fundamentais. As mais recomendadas incluem:
            </p>

            <ol>
              <li>Google Analytics 4 para análise de tráfego e comportamento</li>
              <li>Google Tag Manager para gerenciamento de tags</li>
              <li>Hotjar ou Microsoft Clarity para mapas de calor</li>
              <li>SEMrush ou Ahrefs para SEO e análise competitiva</li>
            </ol>

            <ArticleImage
              src="https://images.unsplash.com/photo-1709715357528-1d3d78ed6cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBzdHJhdGVneSUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjcwOTk1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dashboard de análise de marketing"
              caption="Exemplo de dashboard integrado mostrando métricas em tempo real"
            />

            <h2 id="estrategias">Estratégias de Implementação</h2>
            <p>
              Agora que você compreende os fundamentos, vamos às estratégias práticas que você 
              pode começar a implementar hoje mesmo:
            </p>

            <blockquote>
              "O sucesso no marketing digital não vem de fazer muitas coisas ao mesmo tempo, 
              mas de fazer as coisas certas de forma consistente." — Neil Patel
            </blockquote>

            <p>
              Foque em implementar uma estratégia por vez, meça os resultados e só então avance 
              para a próxima. A pressa é inimiga da perfeição quando se trata de construir 
              presença digital sustentável.
            </p>

            <Callout type="warning">
              Evite o erro comum de tentar implementar todas as estratégias simultaneamente. 
              Isso geralmente resulta em execução superficial e resultados medíocres. Escolha 
              2-3 táticas para começar e execute-as com excelência.
            </Callout>

            <h3 id="cases">Cases de Sucesso</h3>
            <p>
              Para ilustrar o potencial dessas estratégias, vejamos alguns casos reais de empresas 
              que obtiveram resultados expressivos. Uma startup de SaaS conseguiu reduzir seu CAC 
              em 45% ao otimizar suas landing pages usando <code>A/B testing</code> sistemático.
            </p>

            <p>
              Outro exemplo notável é de um e-commerce que aumentou seu LTV em 120% implementando 
              um programa de email marketing segmentado, focando em aumentar a frequência de compra 
              dos clientes existentes.
            </p>

            <hr />

            <h2 id="conclusao">Conclusão</h2>
            <p>
              O marketing digital em 2024 exige uma abordagem equilibrada entre dados e criatividade. 
              As estratégias apresentadas aqui são testadas e comprovadas, mas lembre-se: o contexto 
              do seu negócio é único.
            </p>

            <p>
              Use este guia como ponto de partida, adapte as táticas à sua realidade e, principalmente, 
              mantenha o foco na entrega de valor genuíno ao seu público. O sucesso sustentável vem 
              de construir relacionamentos autênticos, não apenas de otimizar números.
            </p>
          </>
        }
      />

      <ArticleMaterialsCard resources={resources} />

      {/* Community Interaction Block */}
      <div className="px-4 lg:px-8 max-w-3xl mx-auto">
        <LessonInteractionBlock
          origin={mockOrigins[2]} // Article origin
          comments={mockComments.filter(c => c.origin.lessonType === 'article')}
          questions={mockQuestions}
          onCommentSubmit={(data: CommentFormData) => {
            console.log('Comment submitted:', data);
          }}
          onQuestionSubmit={(data: QuestionFormData) => {
            console.log('Question submitted:', data);
          }}
          onNavigateToForum={() => {
            // TODO: Navigate to forum
            console.log('Navigate to forum');
          }}
        />
      </div>

      <RelatedContentRow items={relatedItems} />
    </div>
  );
}
