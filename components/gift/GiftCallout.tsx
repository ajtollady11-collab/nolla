import { Gift } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { TM } from '@/components/ui/TM';
import { GIFT } from '@/data/products';
import { cn } from '@/lib/cn';

/** "Free Cloud Pillow, included with every …" card shown right above the buy buttons. */
export function GiftCallout({ className, productShortName }: { className?: string; productShortName?: string }) {
  const img = GIFT.images[0];
  return (
    <div className={cn('flex items-center gap-4 rounded-[1.5rem] bg-charcoal p-2.5 pr-5 text-cream', className)}>
      <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[1.1rem] bg-oat sm:h-20 sm:w-20">
        <SmartImage src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-oat">
          <Gift className="h-3.5 w-3.5" aria-hidden />
          Free gift
        </p>
        <p className="mt-0.5 font-serif text-[1.3rem] font-light leading-tight tracking-[-0.02em]">
          <TM>{`${GIFT.name} Cloud Pillow`}</TM>
        </p>
        <p className="mt-0.5 text-[0.8rem] leading-snug text-cream/70">
          {productShortName ? (
            <>
              Included with every <TM>{productShortName}</TM>. No code needed.
            </>
          ) : (
            'Included with every order. No code needed.'
          )}
        </p>
      </div>
    </div>
  );
}
