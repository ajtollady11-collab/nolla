import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';

type Props = {
  price: number;
  compareAtPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const priceSizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-[2rem] sm:text-[2.25rem]',
};

/** Price, struck-through original, and a "Save" pill, all derived from pence values. */
export function PriceTag({ price, compareAtPrice, size = 'md', className }: Props) {
  const saving = compareAtPrice && compareAtPrice > price ? compareAtPrice - price : 0;
  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-2', className)}>
      <span className={cn('font-sans font-semibold tracking-tight text-charcoal', priceSizes[size])}>{formatPrice(price)}</span>
      {saving > 0 && (
        <>
          <s className={cn('text-charcoal/45 decoration-charcoal/40', size === 'sm' ? 'text-sm' : 'text-base')}>
            <span className="sr-only">Was </span>
            {formatPrice(compareAtPrice!)}
          </s>
          <span className="rounded-full bg-mocha px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-cream">
            Save {formatPrice(saving)}
          </span>
        </>
      )}
    </div>
  );
}
