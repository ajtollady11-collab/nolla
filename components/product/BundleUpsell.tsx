import { SmartImage } from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import { NEST, NEST_SAVING, primaryImage } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';

type Props = {
  title: string;
  body: string;
  /** Page variant: links to the Nest. Cart variant: runs onAction. */
  variant?: 'page' | 'cart';
  action?: string;
  onAction?: () => void;
  className?: string;
};

/** "Complete your Nolla" nudge towards the Nest™. Deliberately quiet. */
export function BundleUpsell({ title, body, variant = 'page', action = 'Shop the Nest', onAction, className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-4xl border border-mocha/15 bg-mocha-soft/70 p-3 pr-4',
        variant === 'page' && 'sm:p-4 sm:pr-5',
        className,
      )}
    >
      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-3xl bg-oat sm:h-24 sm:w-20">
        <SmartImage src={primaryImage(NEST).src} alt="" fill sizes="80px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-[1.15rem] font-normal leading-tight tracking-[-0.02em]">{title}</p>
        <p className="mt-1 text-[0.8rem] leading-snug text-charcoal/65">{body}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          {variant === 'page' ? (
            <Button href={`/products/${NEST.slug}`} size="sm" variant="secondary">
              {action}
            </Button>
          ) : (
            <Button onClick={onAction} size="sm" variant="secondary">
              {action}
            </Button>
          )}
          <span className="text-[0.72rem] text-mocha">Save {formatPrice(NEST_SAVING)}</span>
        </div>
      </div>
    </div>
  );
}
