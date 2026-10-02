import { Button } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { SmartImage } from '@/components/ui/SmartImage';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { CloudShape } from '@/components/ui/CloudShape';
import { IMAGES } from '@/data/images';
import { Gift } from 'lucide-react';
import { NEST, NEST_SAVING } from '@/data/products';
import { giftPromo } from '@/data/site';
import { formatPrice } from '@/lib/format';
import { TM } from '@/components/ui/TM';

/**
 * The page's one orchestrated moment: headline rises, the Nest settles
 * into its pillow-shaped frame. Everything else on the site stays calm.
 */
export function Hero() {
  return (
    <section className="container-soft relative pb-16 pt-2 sm:pt-10 lg:pb-24 lg:pt-8">
      <div className="hero-grid gap-x-12 xl:gap-x-20 lg:min-h-[calc(100svh-7rem)]">
        {/* Headline */}
        <div className="[grid-area:head] lg:self-end">
          <h1 className="animate-rise text-balance font-serif text-[3.1rem] font-light leading-[0.92] tracking-[-0.045em] text-charcoal min-[420px]:text-[3.9rem] sm:text-display-lg xl:text-display-xl">
            Your new favourite place.
          </h1>
        </div>

        {/* Image in its soft frame */}
        <div className="relative mt-6 [grid-area:media] lg:mt-0 lg:w-full lg:max-w-[calc(80svh*0.8)] lg:self-center lg:justify-self-end">
          <CloudShape
            variant="b"
            className="absolute -bottom-8 -left-6 h-[70%] w-[80%] opacity-80 sm:-left-10 lg:-bottom-10 lg:-left-12"
          />
          <CloudShape variant="c" color="#FFFFFF" className="absolute -right-4 -top-6 h-[40%] w-[50%] opacity-60 lg:-right-8 lg:-top-8" />
          <div
            className="relative aspect-[4/3] animate-settle overflow-hidden bg-oat-soft shadow-cloud sm:aspect-[3/2] lg:aspect-[4/5] lg:max-h-[80svh]"
            style={{ borderRadius: '4.5rem 3rem 5rem 3.5rem / 4rem 3.5rem 4.5rem 3rem', animationDelay: '150ms' }}
          >
            <SmartImage
              src={IMAGES.hero.src}
              alt={IMAGES.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* The one floating element */}
          <div
            className="absolute -bottom-5 left-5 animate-rise sm:left-auto sm:right-8 lg:-left-8 lg:bottom-16 lg:right-auto"
            style={{ animationDelay: '700ms' }}
          >
            <div className="animate-drift rounded-4xl bg-white/90 px-5 py-3.5 shadow-lift backdrop-blur">
              <p className="font-serif text-lg leading-none tracking-[-0.02em]">
                <TM>{NEST.name}</TM>
              </p>
              <p className="mt-1.5 text-xs text-charcoal/60">Nuv™ blanket + Nook™ hooded blanket</p>
            </div>
          </div>
        </div>

        {/* Offer */}
        <div className="mt-8 [grid-area:offer] lg:mt-8 lg:self-start">
          <p className="max-w-[40ch] animate-rise text-[1.05rem] leading-relaxed text-charcoal/75 sm:text-lg" style={{ animationDelay: '120ms' }}>
            Meet the Nolla Nest™: our Nuv™ faux-fur blanket and Nook™ hooded blanket, made for switching off.
          </p>

          <div className="animate-rise" style={{ animationDelay: '220ms' }}>
            <PriceTag price={NEST.price} compareAtPrice={NEST.compareAtPrice} size="lg" className="mt-5 sm:mt-7" />
            <p className="mt-2 text-xs text-charcoal/55">Both in our largest sizes. {formatPrice(NEST_SAVING)} less than buying separately.</p>
          </div>

          <div
            className="mt-6 flex animate-rise flex-col sm:mt-7 items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6"
            style={{ animationDelay: '320ms' }}
          >
            <Button href={`/products/${NEST.slug}`} size="lg" className="sm:px-11">
              Build your nest
            </Button>
            <Button href="/shop#pieces" variant="ghost" className="self-center">
              Shop individually
            </Button>
          </div>

          <div className="mt-7 animate-rise" style={{ animationDelay: '420ms' }}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-charcoal px-3.5 py-1.5 text-[0.72rem] font-medium text-cream">
                <Gift className="h-3.5 w-3.5" aria-hidden />
                + {giftPromo.short}
              </p>
              <TrustBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
