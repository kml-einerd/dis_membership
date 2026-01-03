import { useState, useRef } from 'react';
import { ImagePlus, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/cn';
import type { MediaAttachment as MediaAttachmentType, MediaAttachmentProps } from './types';

export function MediaAttachment({
  attachments,
  onAdd,
  onRemove,
  editable = false,
  maxAttachments = 3,
}: MediaAttachmentProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onAdd) {
      // Filter only images
      const imageFiles = files.filter((f) => f.type.startsWith('image/'));
      onAdd(imageFiles);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canAddMore = editable && attachments.length < maxAttachments;

  return (
    <div className="space-y-3">
      {/* Attachment grid */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {attachments.map((attachment) => (
            <motion.div
              key={attachment.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              <div
                className={cn(
                  'relative w-20 h-20 rounded-xl overflow-hidden',
                  'border-2 border-white/10 bg-[var(--glass-surface-2)]',
                  'cursor-pointer hover:border-white/20 transition-all'
                )}
                onClick={() => setPreviewUrl(attachment.url)}
              >
                <img
                  src={attachment.thumbnailUrl}
                  alt={attachment.caption || 'Anexo'}
                  className="w-full h-full object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Remove button */}
              {editable && onRemove && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(attachment.id);
                  }}
                  className={cn(
                    'absolute -top-2 -right-2 w-6 h-6 rounded-full',
                    'bg-red-500 text-white',
                    'flex items-center justify-center',
                    'opacity-0 group-hover:opacity-100 transition-opacity',
                    'hover:bg-red-600'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}

              {/* Type badge */}
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 text-[10px] font-bold uppercase bg-black/60 text-white/80 rounded">
                {attachment.type}
              </span>
            </motion.div>
          ))}

          {/* Add button */}
          {canAddMore && (
            <motion.button
              layout
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'w-20 h-20 rounded-xl',
                'border-2 border-dashed border-white/20',
                'bg-[var(--glass-surface-1)]',
                'flex flex-col items-center justify-center gap-1',
                'text-white/40 hover:text-white/60 hover:border-white/30',
                'transition-all'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ImagePlus className="w-5 h-5" />
              <span className="text-[10px] font-medium">Anexar</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Help text */}
      {editable && (
        <p className="text-xs text-white/40">
          Anexe até {maxAttachments} imagens (prints, screenshots)
        </p>
      )}

      {/* Fullscreen preview modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPreviewUrl(null)}
          >
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact version for display only (in cards)
export function MediaAttachmentCompact({
  attachments,
}: {
  attachments: MediaAttachmentType[];
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (attachments.length === 0) return null;

  return (
    <div className="flex gap-1.5">
      {attachments.slice(0, 2).map((attachment) => (
        <motion.div
          key={attachment.id}
          className="relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer border border-white/10"
          onClick={() => setPreviewUrl(attachment.url)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={attachment.thumbnailUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {attachments.length > 2 && (
        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-xs font-semibold text-white/60">
            +{attachments.length - 2}
          </span>
        </div>
      )}

      {/* Preview modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPreviewUrl(null)}
          >
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MediaAttachment;
