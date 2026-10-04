import { ReviewCard } from './ReviewCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { reviewsFor, type Review } from '@/data/reviews';
import type { ProductSlug } from '@/data/products';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { NEST } from '@/data/products';

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

  // No real reviews yet: an honest launch message instead of an empty or fake section
  if (list.length === 0) {
    return (
      <section id="reviews" className={cn('scroll-mt-24 py-16 sm:py-24', className)}>
        <div className="container-soft">
          <Reveal className="mx-auto max-w-2xl rounded-6xl bg-white/60 px-7 py-14 text-center sm:px-12 sm:py-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-mocha">Just opened</p>
            <h2 className="mx-auto mt-4 max-w-[16ch] font-serif text-[2.4rem] font-light leading-[1] tracking-[-0.035em] sm:text-display-sm">
              Be one of the first to get cosy.
            </h2>
            <p className="mx-auto mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-charcoal/70">
              We’ve only just opened our doors. Build your nest, tell us what you think, and your review could be the first one here.
            </p>
            <Button href={`/products/${NEST.slug}`} size="lg" className="mt-8">
              Build your nest
            </Button>
          </Reveal>
        </div>
      </section>
    );
  }

  const hasSamples = list.some((r) => r.placeholder);
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

        {hasSamples && (
          <p className="mt-10 text-center text-xs text-charcoal/40">Sample reviews shown for design preview.</p>
        )}
      </div>
    </section>
  );
}
