interface Props {
  rating: number | null;
  reviewCount?: number | null;
  size?: 'sm' | 'md';
}

export default function RatingStars({ rating, reviewCount, size = 'md' }: Props) {
  if (rating === null || rating === undefined) return null;
  const full = Math.round(rating);
  const cls = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <span className={`inline-flex items-center gap-1 ${cls}`} aria-label={`Rated ${rating} out of 5`}>
      <span className="tracking-tight text-amber-400">
        {'★'.repeat(full)}
        <span className="text-slate-300">{'★'.repeat(Math.max(0, 5 - full))}</span>
      </span>
      <span className="font-semibold text-night-900">{rating.toFixed(1)}</span>
      {typeof reviewCount === 'number' && (
        <span className="text-slate-500">({reviewCount.toLocaleString('en-US')} reviews)</span>
      )}
    </span>
  );
}
