import { useState } from 'react';
import { FileText, Link as LinkIcon, File, Download, Check } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'link' | 'file';
}

interface MaterialsCardProps {
  materials: Material[];
}

export function MaterialsCard({ materials }: MaterialsCardProps) {
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  const getIcon = (type: Material['type']) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'link':
        return LinkIcon;
      case 'file':
        return File;
    }
  };

  const handleDownload = (id: string) => {
    setDownloadedIds(new Set([...downloadedIds, id]));
  };

  return (
    <div className="px-6 mb-6">
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4">
        <h3 className="text-white font-medium text-sm mb-3">
          Materiais complementares
        </h3>
        <div className="space-y-2">
          {materials.map((material) => {
            const Icon = getIcon(material.type);
            const isDownloaded = downloadedIds.has(material.id);

            return (
              <div
                key={material.id}
                className="flex items-center justify-between py-2.5 px-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white/60" />
                  </div>
                  <span className="text-white/80 text-sm">{material.name}</span>
                </div>
                <button
                  onClick={() => handleDownload(material.id)}
                  disabled={isDownloaded}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isDownloaded
                      ? 'bg-white/5 text-white/40 cursor-default'
                      : 'bg-[#7c5dfa]/10 text-[#7c5dfa] hover:bg-[#7c5dfa]/15'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Baixado</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
