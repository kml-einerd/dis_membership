export function StoreSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] animate-pulse pb-8">
      {/* Header */}
      <div className="px-6 mb-6">
        <div className="h-8 bg-white/5 rounded-lg w-32 mb-4" />
        <div className="flex gap-2">
          <div className="h-10 bg-white/5 rounded-xl w-20" />
          <div className="h-10 bg-white/5 rounded-xl w-24" />
          <div className="h-10 bg-white/5 rounded-xl w-32" />
          <div className="h-10 bg-white/5 rounded-xl w-28" />
        </div>
      </div>

      {/* Destaques section */}
      <div className="px-6 mb-6">
        <div className="h-5 bg-white/5 rounded-lg w-24 mb-3" />
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-[2/3] bg-white/5 rounded-2xl" />
          <div className="aspect-[2/3] bg-white/5 rounded-2xl" />
        </div>
      </div>

      {/* Upgrade banner */}
      <div className="px-6 mb-6">
        <div className="h-5 bg-white/5 rounded-lg w-32 mb-3" />
        <div className="bg-white/5 rounded-3xl p-6 space-y-4">
          <div className="h-6 bg-white/5 rounded-lg w-3/4" />
          <div className="h-4 bg-white/5 rounded-lg w-full" />
          <div className="space-y-2">
            <div className="h-3 bg-white/5 rounded-lg w-5/6" />
            <div className="h-3 bg-white/5 rounded-lg w-4/5" />
            <div className="h-3 bg-white/5 rounded-lg w-5/6" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-white/5 rounded-lg w-24" />
            <div className="h-11 bg-white/5 rounded-xl w-40" />
          </div>
        </div>
      </div>

      {/* Quick addons */}
      <div className="px-6">
        <div className="h-5 bg-white/5 rounded-lg w-40 mb-3" />
        <div className="space-y-2">
          <div className="h-20 bg-white/5 rounded-xl" />
          <div className="h-20 bg-white/5 rounded-xl" />
          <div className="h-20 bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
}