import { Gift } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { GIFT } from '@/data/products';
import { cn } from '@/lib/cn';

/** Prominent "free gift with every order" card for product pages. */
export function GiftCallout({ className }: { className?: string }) {
  const img = GIFT.images[0];
  return (
    <div className={cn('relative flex items-center gap-4 overflow-hidden rounded-4xl bg-charcoal p-3 pr-5 text-cream shadow-lift', className)}>
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl bg-oat sm:h-24 sm:w-24">
        <SmartImage src={img.src} alt={img.alt} fill sizes="96px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-oat">
          <Gift className="h-3.5 w-3.5" aria-hidden />
          Free gift with your order
        </p>
        <p className="mt-1 font-serif text-[1.35rem] font-light leading-tight tracking-[-0.02em]">{GIFT.name} cloud pillow</p>
        <p className="mt-1 text-[0.8rem] leading-snug text-cream/70">Added automatically. No code needed.</p>
      </div>
    </div>
  );
}
