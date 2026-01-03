import { useState, useCallback } from 'react';
import type { Reaction, ReactionType } from '../components/community/types';

/**
 * Hook para gerenciar reações em comentários e perguntas
 * Filosofia Musk: simplicidade e eficiência
 */
export function useReactions(initialReactions: Reaction[]) {
  const [reactions, setReactions] = useState<Reaction[]>(initialReactions);

  const toggleReaction = useCallback((type: ReactionType) => {
    setReactions((prev) =>
      prev.map((reaction) => {
        if (reaction.type === type) {
          // Toggle: se já reagiu, remove; se não, adiciona
          return {
            ...reaction,
            count: reaction.hasReacted
              ? Math.max(0, reaction.count - 1)
              : reaction.count + 1,
            hasReacted: !reaction.hasReacted,
          };
        }
        // Remove reação de outros tipos (usuário pode ter apenas 1 reação)
        return {
          ...reaction,
          count: reaction.hasReacted
            ? Math.max(0, reaction.count - 1)
            : reaction.count,
          hasReacted: false,
        };
      })
    );
  }, []);

  const getTotalReactions = useCallback(() => {
    return reactions.reduce((sum, r) => sum + r.count, 0);
  }, [reactions]);

  const getUserReaction = useCallback(() => {
    return reactions.find((r) => r.hasReacted)?.type || null;
  }, [reactions]);

  return {
    reactions,
    toggleReaction,
    getTotalReactions,
    getUserReaction,
  };
}

export default useReactions;
