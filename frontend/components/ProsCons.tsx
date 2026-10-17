export default function ProsCons({
  pros,
  cons,
  compact = false,
}: {
  pros: string[];
  cons: string[];
  compact?: boolean;
}) {
  if (pros.length === 0 && cons.length === 0) return null;
  return (
    <div className={`grid gap-4 ${compact ? 'mt-3 text-sm' : 'mt-6'} md:grid-cols-2`}>
      {pros.length > 0 && (
        <div className="rounded-xl bg-emerald-50 p-4">
          <p className="mb-2 font-bold text-emerald-800">✓ Pros</p>
          <ul className="space-y-1 text-slate-700">
            {pros.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}
      {cons.length > 0 && (
        <div className="rounded-xl bg-rose-50 p-4">
          <p className="mb-2 font-bold text-rose-800">✕ Cons</p>
          <ul className="space-y-1 text-slate-700">
            {cons.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
