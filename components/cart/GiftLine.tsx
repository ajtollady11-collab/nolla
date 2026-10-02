import { Gift } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { GIFT } from '@/data/products';

/** The free Nimbus™ cloud pillow, shown as its own line in every non-empty cart. */
export function GiftLine() {
  const img = GIFT.images[0];
  return (
    <div className="flex items-center gap-4 rounded-4xl border border-dashed border-mocha/40 bg-mocha-soft/60 p-3 pr-4">
      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-3xl bg-oat">
        <SmartImage src={img.src} alt={img.alt} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1 rounded-full bg-mocha px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-cream">
          <Gift className="h-3 w-3" aria-hidden />
          Free gift
        </span>
        <p className="mt-1.5 font-medium leading-tight">{GIFT.name} cloud pillow</p>
        <p className="mt-0.5 text-xs text-charcoal/55">Added to your order automatically</p>
      </div>
      <div className="text-right">
        <span className="text-sm font-semibold text-mocha">FREE</span>
      </div>
    </div>
  );
}
