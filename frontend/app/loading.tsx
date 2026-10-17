export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16" aria-busy="true" aria-label="Loading">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-2/3 rounded-lg bg-slate-200" />
        <div className="h-4 w-1/3 rounded bg-slate-200" />
        <div className="aspect-[21/9] w-full rounded-3xl bg-slate-200" />
        <div className="space-y-3">
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 w-11/12 rounded bg-slate-200" />
          <div className="h-4 w-4/5 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
