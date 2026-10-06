import { ReviewCard } from './ReviewCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { reviewsFor, type Review } from '@/data/reviews';
import type { ProductSlug } from '@/data/products';
import { cn } from '@/lib/cn';

/**
 * Reviews laid out as loosely staggered bubbles (desktop) that stack
 * naturally on mobile. Pass `reviews` directly once real data exists.
 */
export function ReviewSection({
  product,
  reviews,
  heading = 'People are getting comfortable.',
  limit = 6,
  className,
}: {
  product?: ProductSlug;
  reviews?: Review[];
  heading?: string;
  limit?: number;
  className?: string;
}) {
  const list = (reviews ?? reviewsFor(product)).slice(0, limit);

  // No real reviews yet: render nothing (real reviews in data/reviews.ts bring the section back)
  if (list.length === 0) return null;

  // Three soft columns; each column starts at a different height so the bubbles float.
  const columns: Review[][] = [[], [], []];
  list.forEach((r, i) => columns[i % 3].push(r));
  const offsets = ['lg:pt-0', 'lg:pt-16', 'lg:pt-6'];

  return (
    <section id="reviews" className={cn('scroll-mt-24 py-16 sm:py-24', className)}>
      <div className="container-soft">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading className="max-w-[14ch]">{heading}</SectionHeading>
          <TrustBadge tone="chip" />
        </div>

        {/* Mobile / tablet: simple stack (2-up on tablet) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:hidden">
          {list.map((r, i) => (
            <Reveal key={r.id} delay={(i % 2) * 80}>
              <ReviewCard review={r} tail={i % 2 === 0 ? 'left' : 'right'} className={i % 2 ? 'pl-6 sm:pl-0' : 'pr-6 sm:pr-0'} />
            </Reveal>
          ))}
        </div>

        {/* Desktop: staggered floating columns */}
        <div className="mt-14 hidden grid-cols-3 gap-8 lg:grid">
          {columns.map((col, c) => (
            <div key={c} className={cn('flex flex-col gap-8', offsets[c])}>
              {col.map((r, i) => (
                <Reveal key={r.id} delay={c * 100 + i * 60}>
                  <ReviewCard review={r} tail={(c + i) % 2 === 0 ? 'left' : 'right'} />
                </Reveal>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
