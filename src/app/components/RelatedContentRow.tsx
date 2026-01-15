import { CompactArticleCard } from './CompactArticleCard';
import { MediumVideoCard } from './MediumVideoCard';

interface RelatedItem {
  id: string;
  type: 'article' | 'video';
  title: string;
  imageUrl: string;
  readTime?: string;
  duration?: string;
}

interface RelatedContentRowProps {
  items: RelatedItem[];
}

export function RelatedContentRow({ items }: RelatedContentRowProps) {
  return (
    <div className="mb-8">
      <h3 className="text-white font-medium text-base px-6 mb-3.5">
        Continuar aprendendo
      </h3>
      <div className="flex gap-2.5 overflow-x-auto px-6 scrollbar-hide">
        {items.map((item) =>
          item.type === 'article' ? (
            <CompactArticleCard
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              readTime={item.readTime!}
            />
          ) : (
            <MediumVideoCard
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              duration={item.duration!}
            />
          )
        )}
      </div>
    </div>
  );
}
