import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { Callout } from './Callout';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MarkdownContentProps {
  content: React.ReactNode;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="px-6 mb-8">
      <article className="prose-custom">{content}</article>
    </div>
  );
}

// Article Image Component with zoom
interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ArticleImage({ src, alt, caption }: ArticleImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <figure className="my-6">
        <button
          onClick={() => setIsZoomed(true)}
          className="relative w-full rounded-xl overflow-hidden group"
        >
          <ImageWithFallback
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 transition-all flex items-center justify-center">
              <ZoomIn className="w-5 h-5 text-transparent group-hover:text-black transition-colors" />
            </div>
          </div>
        </button>
        {caption && (
          <figcaption className="text-white/40 text-xs mt-2 text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        >
          <ImageWithFallback
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}

// Table wrapper with horizontal scroll
interface ArticleTableProps {
  children: React.ReactNode;
}

export function ArticleTable({ children }: ArticleTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border border-white/[0.08] rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
