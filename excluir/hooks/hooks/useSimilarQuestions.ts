import { useMemo } from 'react';
import type { Question } from '../components/community/types';

/**
 * Hook para encontrar perguntas similares
 * Algoritmo simplificado para demo - em produção usaria NLP/ML
 *
 * Filosofia Jobs: simplicidade que funciona
 * Filosofia Musk: resolver o problema de forma eficiente
 */

interface SimilarityConfig {
  titleWeight: number;
  contentWeight: number;
  originWeight: number;
  threshold: number;
}

const DEFAULT_CONFIG: SimilarityConfig = {
  titleWeight: 0.4,
  contentWeight: 0.3,
  originWeight: 0.3,
  threshold: 0.6, // 60% de similaridade para considerar similar
};

// Extrai palavras-chave removendo stop words
function extractKeywords(text: string): Set<string> {
  const stopWords = new Set([
    'o', 'a', 'os', 'as', 'de', 'da', 'do', 'das', 'dos',
    'em', 'no', 'na', 'nos', 'nas', 'para', 'com', 'por',
    'que', 'é', 'e', 'um', 'uma', 'como', 'não', 'se',
  ]);

  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word))
  );
}

// Calcula overlap entre dois sets
function calculateOverlap(set1: Set<string>, set2: Set<string>): number {
  if (set1.size === 0 || set2.size === 0) return 0;

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
}

// Calcula similaridade entre duas perguntas
function calculateSimilarity(
  q1: Question,
  q2: Question,
  config: SimilarityConfig = DEFAULT_CONFIG
): number {
  // Mesmo lesson = +30% de base
  const sameLesson =
    q1.origin.lessonId === q2.origin.lessonId ? config.originWeight : 0;

  // Palavras-chave em comum no título
  const titleKeywords1 = extractKeywords(q1.title);
  const titleKeywords2 = extractKeywords(q2.title);
  const titleOverlap = calculateOverlap(titleKeywords1, titleKeywords2);

  // Palavras-chave em comum no conteúdo
  const contentKeywords1 = extractKeywords(q1.content);
  const contentKeywords2 = extractKeywords(q2.content);
  const contentOverlap = calculateOverlap(contentKeywords1, contentKeywords2);

  return (
    sameLesson +
    titleOverlap * config.titleWeight +
    contentOverlap * config.contentWeight
  );
}

export function useSimilarQuestions(
  currentQuestion: Partial<Question>,
  allQuestions: Question[],
  config?: Partial<SimilarityConfig>
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const similarQuestions = useMemo(() => {
    if (!currentQuestion.title || !currentQuestion.content) {
      return [];
    }

    // Cria uma pergunta temporária para comparação
    const tempQuestion: Question = {
      id: 'temp',
      type: 'question',
      title: currentQuestion.title,
      content: currentQuestion.content,
      origin: currentQuestion.origin || ({} as any),
      user: {} as any,
      attachments: [],
      reactions: [],
      createdAt: new Date(),
      status: 'pending',
      viewCount: 0,
      helpfulCount: 0,
    };

    return allQuestions
      .filter((q) => q.id !== currentQuestion.id) // Não incluir a própria pergunta
      .map((q) => ({
        question: q,
        similarity: calculateSimilarity(tempQuestion, q, finalConfig),
      }))
      .filter((item) => item.similarity >= finalConfig.threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3) // Máximo 3 sugestões
      .map((item) => item.question);
  }, [currentQuestion, allQuestions, finalConfig]);

  return similarQuestions;
}

// Hook para agrupar perguntas similares (usado no FAQ)
export function useQuestionGroups(questions: Question[]) {
  return useMemo(() => {
    // TODO: Implementar lógica de agrupamento
    // Por ora, retorna os dados mockados
    return [];
  }, [questions]);
}

export default useSimilarQuestions;
