export function ArticleSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] animate-pulse">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="w-9 h-9 rounded-full bg-white/5" />
        <div className="flex gap-2">
          <div className="w-9 h-9 rounded-full bg-white/5" />
          <div className="w-9 h-9 rounded-full bg-white/5" />
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 mb-6">
        <div className="h-8 bg-white/5 rounded-lg mb-3 w-3/4" />
        <div className="h-5 bg-white/5 rounded-lg mb-4 w-full" />
        <div className="h-4 bg-white/5 rounded-lg mb-6 w-1/3" />
        <div className="aspect-video bg-white/5 rounded-2xl" />
      </div>

      {/* TOC */}
      <div className="px-6 mb-6">
        <div className="h-14 bg-white/5 rounded-2xl" />
      </div>

      {/* Content blocks */}
      <div className="px-6 space-y-4 mb-8">
        <div className="h-4 bg-white/5 rounded-lg w-full" />
        <div className="h-4 bg-white/5 rounded-lg w-5/6" />
        <div className="h-4 bg-white/5 rounded-lg w-4/5" />
        <div className="h-4 bg-white/5 rounded-lg w-full" />
        <div className="h-4 bg-white/5 rounded-lg w-3/4" />
      </div>

      {/* Materials card */}
      <div className="px-6 mb-8">
        <div className="bg-white/5 rounded-2xl p-5">
          <div className="h-5 bg-white/5 rounded-lg mb-4 w-1/3" />
          <div className="space-y-2.5">
            <div className="h-12 bg-white/5 rounded-xl" />
            <div className="h-12 bg-white/5 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Related content */}
      <div className="px-6 mb-8">
        <div className="h-5 bg-white/5 rounded-lg mb-4 w-1/4" />
        <div className="flex gap-2.5">
          <div className="flex-shrink-0 w-[160px]">
            <div className="aspect-video bg-white/5 rounded-xl mb-2" />
            <div className="h-4 bg-white/5 rounded-lg" />
          </div>
          <div className="flex-shrink-0 w-[160px]">
            <div className="aspect-video bg-white/5 rounded-xl mb-2" />
            <div className="h-4 bg-white/5 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
