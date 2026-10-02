import Link from 'next/link';
import { Gift } from 'lucide-react';
import { giftPromo } from '@/data/site';

/** Thin announcement bar above the header, on every page. */
export function PromoBar() {
  return (
    <div className="bg-charcoal text-cream">
      <Link
        href="/#gift"
        className="mx-auto flex min-h-9 max-w-[1320px] items-center justify-center gap-2 px-4 py-2 text-center text-[0.74rem] font-medium tracking-[0.02em] transition-opacity hover:opacity-80 sm:text-[0.8rem]"
      >
        <Gift className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{giftPromo.bar}</span>
        <span className="hidden text-cream/50 sm:inline">·</span>
        <span className="hidden text-cream/70 sm:inline">Free UK delivery</span>
      </Link>
    </div>
  );
}
