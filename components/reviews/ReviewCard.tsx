import { StarRating } from '@/components/ui/StarRating';
import type { Review } from '@/data/reviews';
import { cn } from '@/lib/cn';

/**
 * A review as a soft speech bubble: fully rounded, with one tucked corner
 * that points towards the reviewer's name, like a comment.
 */
export function ReviewCard({ review, className, tail = 'left' }: { review: Review; className?: string; tail?: 'left' | 'right' }) {
  return (
    <figure className={cn('flex flex-col', tail === 'right' && 'items-end text-right', className)}>
      <blockquote
        className={cn(
          'relative w-full rounded-[2.25rem] bg-white px-6 pb-6 pt-5 shadow-pillow sm:px-7',
          tail === 'left' ? 'rounded-bl-lg' : 'rounded-br-lg',
        )}
      >
        <StarRating rating={review.rating} size={13} />
        <p className="mt-3 font-serif text-[1.35rem] font-light leading-[1.3] tracking-[-0.015em] text-charcoal sm:text-[1.45rem]">
          “{review.text}”
        </p>
      </blockquote>
      <figcaption className={cn('mt-3 flex items-baseline gap-2 px-3 text-sm', tail === 'right' && 'flex-row-reverse')}>
        <span className="font-medium text-charcoal">{review.name}</span>
        <span className="text-charcoal/50">{review.location}</span>
      </figcaption>
    </figure>
  );
}
