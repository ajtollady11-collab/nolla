import Link from 'next/link';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { fromPrice, hasPriceRange, primaryImage, type Product } from '@/data/products';
import { cn } from '@/lib/cn';
import { TM } from '@/components/ui/TM';

/** Card for an individual piece (Nuv™ / Nook™). The whole card is clickable; the pill is the visible affordance. */
export function ProductCard({ product, cta, className, priority }: { product: Product; cta: string; className?: string; priority?: boolean }) {
  const href = `/products/${product.slug}`;
  const image = primaryImage(product);
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-6xl bg-oat-soft shadow-pillow transition-shadow duration-700 ease-soft group-hover:shadow-cloud">
        <SmartImage
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.035]"
        />
      </div>
      <div className="flex items-end justify-between gap-4 px-2 pt-5 sm:px-3">
        <div>
          <h3 className="font-serif text-[1.9rem] font-light leading-none tracking-[-0.03em]">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-6xl focus-visible:outline-none">
              <TM>{product.name}</TM>
            </Link>
          </h3>
          <p className="mt-2 text-[0.95rem] text-charcoal/65">
            {product.kind} <span className="ml-1 font-semibold text-charcoal">
              {hasPriceRange(product) && <span className="font-normal text-charcoal/60">from </span>}
              {formatPrice(fromPrice(product))}
            </span>
          </p>
        </div>
        {/* Visual pill; the stretched title link above handles the click */}
        <Button href={href} variant="secondary" size="sm" className="relative z-10 shrink-0" tabIndex={-1} aria-hidden>
          {cta}
        </Button>
      </div>
    </article>
  );
}
