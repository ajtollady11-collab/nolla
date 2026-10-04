import { socialProof } from '@/data/site';
import { cn } from '@/lib/cn';
import { StarRating } from './StarRating';
import { hasReviews } from '@/data/reviews';

/**
 * ★★★★★ Loved by [customer count] people
 * The count comes from `socialProof.customerCount` in data/site.ts.
 * While that is null, it reads "Loved by Nolla customers" (no invented numbers).
 */
export function TrustBadge({
  count = socialProof.customerCount,
  className,
  tone = 'plain',
}: {
  count?: string | null;
  className?: string;
  tone?: 'plain' | 'chip';
}) {
  // Only show stars once there are real reviews (or a real customer count)
  if (!hasReviews && !count) return null;
  const label = count ? `Loved by ${count} people` : 'Loved by Nolla customers';
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 text-[0.8rem] text-charcoal/70',
        tone === 'chip' && 'rounded-full bg-white/85 px-4 py-2 shadow-pillow backdrop-blur',
        className,
      )}
    >
      <StarRating rating={socialProof.rating} size={13} />
      <span>{label}</span>
    </div>
  );
}
