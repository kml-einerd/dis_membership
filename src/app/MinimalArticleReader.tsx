import { useState } from 'react';
import { MinimalArticleTopBar } from './components/MinimalArticleTopBar';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Bookmark, CheckCircle } from 'lucide-react';

export default function MinimalArticleReader() {
  const [isSaved, setIsSaved] = useState(false);
  const [isRead, setIsRead] = useState(false);

  // Example: showing both action types - you'd typically show only one
  const showSaveAction = true;
  const showReadAction = false;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-12">
      <MinimalArticleTopBar />

      <div className="px-6">
        {/* Title */}
        <h1 className="text-white font-medium text-xl leading-tight mb-6">
          5 Dicas Rápidas para Melhorar sua Produtividade Hoje
        </h1>

        {/* Optional Image */}
        <div className="mb-6">
          <div className="rounded-2xl overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1652177217044-4f62dacf0ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2NzA4MTYzMXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Produtividade"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Markdown Content */}
        <article className="prose-custom mb-8">
          <p>
            A produtividade não é sobre fazer mais coisas, mas sim fazer as coisas certas 
            de forma eficiente. Aqui estão 5 estratégias práticas que você pode começar 
            a aplicar imediatamente.
          </p>

          <h2>1. Bloqueie tempo para trabalho profundo</h2>
          <p>
            Reserve períodos ininterruptos de 90 minutos para tarefas que exigem concentração. 
            Desligue notificações e comunique sua indisponibilidade à equipe.
          </p>

          <h2>2. Use a regra dos 2 minutos</h2>
          <p>
            Se uma tarefa leva menos de 2 minutos, faça imediatamente. Essa prática evita 
            o acúmulo de pequenas pendências que consomem energia mental.
          </p>

          <h2>3. Planeje o dia anterior</h2>
          <p>
            Termine cada dia definindo as 3 prioridades do dia seguinte. Você começará 
            com clareza em vez de perder tempo decidindo por onde começar.
          </p>

          <h2>4. Batching de tarefas similares</h2>
          <p>
            Agrupe atividades semelhantes: responda todos os emails de uma vez, faça todas 
            as ligações em sequência. A troca de contexto é cara.
          </p>

          <h2>5. Respeite seus ritmos naturais</h2>
          <p>
            Identifique quando você tem mais energia e reserve esse horário para o trabalho 
            mais importante. Use momentos de menor energia para tarefas administrativas.
          </p>

          <p>
            <strong>Lembre-se:</strong> produtividade sustentável vem de sistemas consistentes, 
            não de esforço heroico ocasional. Comece com uma dessas dicas e incorpore 
            gradualmente as outras.
          </p>
        </article>

        {/* Optional Action Button */}
        {showSaveAction && (
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-200 ${
              isSaved
                ? 'bg-white/5 text-white/60 border border-white/10'
                : 'bg-[#7c5dfa]/10 text-[#7c5dfa] border border-[#7c5dfa]/20 hover:bg-[#7c5dfa]/15'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
            />
            <span>{isSaved ? 'Salvo' : 'Salvar'}</span>
          </button>
        )}

        {showReadAction && (
          <button
            onClick={() => setIsRead(!isRead)}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-200 ${
              isRead
                ? 'bg-white/5 text-white/60 border border-white/10'
                : 'bg-[#7c5dfa]/10 text-[#7c5dfa] border border-[#7c5dfa]/20 hover:bg-[#7c5dfa]/15'
            }`}
          >
            <CheckCircle
              className={`w-4 h-4 ${isRead ? 'fill-current' : ''}`}
            />
            <span>{isRead ? 'Marcado como lido' : 'Marcar como lido'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
