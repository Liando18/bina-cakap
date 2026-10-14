export function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch animate-pulse">
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between min-h-[220px]">
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="h-6 w-32 rounded-full skeleton-shimmer"></div>
            <div className="h-6 w-24 rounded-lg skeleton-shimmer"></div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full skeleton-shimmer shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 w-3/4 rounded-md skeleton-shimmer"></div>
              <div className="h-4 w-1/2 rounded-md skeleton-shimmer"></div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg skeleton-shimmer shrink-0"></div>
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-1/3 rounded-md skeleton-shimmer"></div>
              <div className="h-4 w-2/3 rounded-md skeleton-shimmer"></div>
            </div>
          </div>
        </div>
        <div className="pt-4 flex items-center justify-between">
          <div className="h-4 w-28 rounded-md skeleton-shimmer"></div>
          <div className="h-4 w-20 rounded-md skeleton-shimmer"></div>
        </div>
      </div>
      <div className="lg:col-span-7 bg-[#1b5e20]/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-7 w-48 rounded-md bg-white/20 skeleton-shimmer"></div>
            <div className="h-6 w-24 rounded-full bg-white/20 skeleton-shimmer"></div>
          </div>
          <div className="h-4 w-5/6 rounded-md bg-white/20 skeleton-shimmer"></div>
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="h-16 rounded-xl bg-white/15 skeleton-shimmer"></div>
            <div className="h-16 rounded-xl bg-white/15 skeleton-shimmer"></div>
            <div className="h-16 rounded-xl bg-white/15 skeleton-shimmer"></div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 w-40 rounded-md bg-white/20 skeleton-shimmer"></div>
          <div className="h-11 w-44 rounded-xl bg-white/30 skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1.5">
          <div className="h-3.5 w-24 rounded-md skeleton-shimmer"></div>
          <div className="h-5 w-40 rounded-md skeleton-shimmer"></div>
        </div>
        <div className="w-8 h-8 rounded-lg skeleton-shimmer"></div>
      </div>
      <div className="flex items-center gap-6 my-2">
        <div className="w-24 h-24 rounded-full skeleton-shimmer shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-7 w-28 rounded-md skeleton-shimmer"></div>
          <div className="h-4 w-full rounded-md skeleton-shimmer"></div>
          <div className="h-3 w-32 rounded-md skeleton-shimmer"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="h-3.5 w-28 rounded-md skeleton-shimmer"></div>
        <div className="h-3.5 w-20 rounded-md skeleton-shimmer"></div>
      </div>
    </div>
  );
}

export function ModuleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between animate-pulse min-h-[320px]">
      <div className="space-y-3">
        <div className="w-full h-36 rounded-xl skeleton-shimmer"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 rounded-md skeleton-shimmer"></div>
          <div className="h-4 w-16 rounded-md skeleton-shimmer"></div>
        </div>
        <div className="h-5 w-3/4 rounded-md skeleton-shimmer"></div>
        <div className="h-3.5 w-full rounded-md skeleton-shimmer"></div>
        <div className="h-3.5 w-5/6 rounded-md skeleton-shimmer"></div>
      </div>
      <div className="space-y-2 pt-4 mt-auto">
        <div className="h-2 w-full rounded-full skeleton-shimmer"></div>
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-20 rounded-md skeleton-shimmer"></div>
          <div className="h-9 w-28 rounded-xl skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

export function AssessmentSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto py-4 space-y-6 animate-pulse">
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="h-6 w-32 rounded-full skeleton-shimmer"></div>
            <div className="h-6 w-24 rounded-full skeleton-shimmer"></div>
          </div>
          <div className="h-6 w-20 rounded-md skeleton-shimmer"></div>
        </div>
        <div className="h-7 w-2/3 rounded-md skeleton-shimmer"></div>
        <div className="h-2.5 w-full rounded-full skeleton-shimmer"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex justify-between">
            <div className="h-5 w-40 rounded-md skeleton-shimmer"></div>
            <div className="h-5 w-20 rounded-md skeleton-shimmer"></div>
          </div>
          <div className="w-full h-44 rounded-xl skeleton-shimmer"></div>
          <div className="h-10 w-full rounded-xl skeleton-shimmer"></div>
          <div className="grid grid-cols-5 gap-2 pt-2">
            <div className="h-12 rounded-lg skeleton-shimmer"></div>
            <div className="h-12 rounded-lg skeleton-shimmer"></div>
            <div className="h-12 rounded-lg skeleton-shimmer"></div>
            <div className="h-12 rounded-lg skeleton-shimmer"></div>
            <div className="h-12 rounded-lg skeleton-shimmer"></div>
          </div>
        </div>
        <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="h-5 w-28 rounded-md skeleton-shimmer"></div>
          <div className="h-6 w-full rounded-md skeleton-shimmer"></div>
          <div className="h-4 w-4/5 rounded-md skeleton-shimmer"></div>
          <div className="space-y-3 pt-2">
            <div className="h-14 w-full rounded-xl skeleton-shimmer"></div>
            <div className="h-14 w-full rounded-xl skeleton-shimmer"></div>
            <div className="h-14 w-full rounded-xl skeleton-shimmer"></div>
            <div className="h-14 w-full rounded-xl skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileReportSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto py-4 space-y-6 animate-pulse">
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-36 rounded-full skeleton-shimmer"></div>
          <div className="h-4 w-28 rounded-md skeleton-shimmer"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full skeleton-shimmer shrink-0"></div>
          <div className="space-y-2 flex-1">
            <div className="h-6 w-48 rounded-md skeleton-shimmer"></div>
            <div className="h-4 w-64 rounded-md skeleton-shimmer"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-20 rounded-xl skeleton-shimmer"></div>
          <div className="h-20 rounded-xl skeleton-shimmer"></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="h-6 w-44 rounded-md skeleton-shimmer"></div>
        <div className="space-y-3">
          <div className="h-12 w-full rounded-xl skeleton-shimmer"></div>
          <div className="h-12 w-full rounded-xl skeleton-shimmer"></div>
          <div className="h-12 w-full rounded-xl skeleton-shimmer"></div>
          <div className="h-12 w-full rounded-xl skeleton-shimmer"></div>
          <div className="h-12 w-full rounded-xl skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

export function ContentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between animate-pulse min-h-[260px]">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 rounded-full skeleton-shimmer"></div>
          <div className="h-4 w-16 rounded-md skeleton-shimmer"></div>
        </div>
        <div className="h-5 w-4/5 rounded-md skeleton-shimmer"></div>
        <div className="h-3.5 w-full rounded-md skeleton-shimmer"></div>
        <div className="h-3.5 w-3/4 rounded-md skeleton-shimmer"></div>
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="h-4 w-28 rounded-md skeleton-shimmer"></div>
        <div className="h-8 w-20 rounded-lg skeleton-shimmer"></div>
      </div>
    </div>
  );
}
