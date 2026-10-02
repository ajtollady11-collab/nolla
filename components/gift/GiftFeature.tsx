import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal } from '@/components/ui/Reveal';
import { GIFT, NEST } from '@/data/products';
import { giftPromo } from '@/data/site';
import { cn } from '@/lib/cn';

/** Home/shop section promoting the free Nimbus™ cloud pillow. */
export function GiftFeature({ className }: { className?: string }) {
  const img = GIFT.images[0];
  return (
    <section id="gift" className={cn('container-soft scroll-mt-28 py-10 sm:py-16', className)}>
      <Reveal>
        <div className="grid items-center overflow-hidden rounded-6xl bg-charcoal text-cream sm:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[5/4] sm:order-2 sm:aspect-auto sm:h-full sm:min-h-[420px]">
            <SmartImage src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-7 pb-10 pt-8 sm:px-12 sm:py-14 lg:px-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-oat">
              <Gift className="h-3.5 w-3.5" aria-hidden />
              Free with every order
            </p>
            <h2 className="mt-5 font-serif text-[2.6rem] font-light leading-[0.95] tracking-[-0.04em] sm:text-display-md">
              A little cloud,
              <br />
              on us.
            </h2>
            <p className="mt-5 max-w-[38ch] text-[1.02rem] leading-relaxed text-cream/75">{giftPromo.long}</p>
            <Button href={`/products/${NEST.slug}`} size="lg" variant="secondary" className="mt-8 w-full sm:w-fit">
              Build your nest
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
