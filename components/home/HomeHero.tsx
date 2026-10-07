import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { heroCopy, homeImages } from '@/data/home';

/**
 * Full-screen editorial hero with the copy overlaid on the photo at every size.
 * Desktop (lg+): copy on the clear wall on the left; the navigation floats over the
 *   photo; an almost invisible cream wash sits behind the text only.
 * Phones/tablet: portrait crop that keeps her face and the top of the blanket clear in
 *   the upper half; copy sits over the lower half on a soft cream fade (the blanket is
 *   cream, so it blends). The nav stays above the photo here so the cart icon never
 *   lands on her head.
 */
export function HomeHero() {
  const img = homeImages.hero;
  return (
    <section className="relative h-[calc(100svh-7rem)] max-h-[60rem] min-h-[34rem] overflow-hidden lg:-mt-[4.75rem] lg:h-[calc(100svh-2.25rem)] lg:max-h-[1100px] lg:min-h-[640px]">
      {/* Image */}
      <div className="absolute inset-0 bg-oat-soft">
        <SmartImage
          src={img.src}
          alt={img.alt}
          fill
          priority
          quality={90}
          // Phones: the full-height crop renders the photo ~1.8× the hero height wide, not 100vw
          sizes="(min-width: 1024px) 100vw, 180vh"
          className="animate-settle object-cover [object-position:var(--focus-m)] lg:[object-position:var(--focus-d)]"
          style={{ ['--focus-m' as string]: img.focusMobile, ['--focus-d' as string]: img.focusDesktop }}
        />
        {/* Phones/tablet: soft cream fade under the copy at the bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-cream via-cream/85 to-transparent lg:hidden"
        />
        {/* Desktop: a whisper of cream behind the left-hand copy only */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-cream/45 via-cream/15 to-transparent lg:block"
        />
      </div>

      {/* Copy */}
      <div className="container-soft absolute inset-x-0 bottom-0 pb-6 sm:pb-10 lg:inset-0 lg:flex lg:items-center lg:pb-0">
        <div className="lg:max-w-[36rem] lg:pt-16 xl:max-w-[40rem]">
          <p className="animate-rise text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mocha sm:text-[0.7rem]">{heroCopy.eyebrow}</p>
          <h1
            className="mt-2.5 animate-rise text-balance font-serif text-[2.55rem] font-light leading-[0.95] tracking-[-0.045em] text-charcoal min-[400px]:text-[2.8rem] sm:mt-3 sm:text-display-md lg:mt-5 lg:text-display-lg xl:text-display-xl"
            style={{ animationDelay: '80ms' }}
          >
            {heroCopy.headline}
          </h1>
          <p
            className="mt-3 max-w-[34ch] animate-rise text-[0.98rem] leading-relaxed text-charcoal/80 sm:mt-4 sm:text-lg lg:mt-6"
            style={{ animationDelay: '160ms' }}
          >
            {heroCopy.body}
          </p>
          <div className="mt-5 flex animate-rise gap-2.5 sm:gap-4 lg:mt-9" style={{ animationDelay: '240ms' }}>
            <Button href="/shop" size="lg" className="min-w-0 flex-1 !px-3 sm:flex-none sm:!px-10">
              {heroCopy.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover/btn:translate-x-1" aria-hidden />
            </Button>
            <Button href="#nest" size="lg" variant="secondary" className="min-w-0 flex-1 !px-3 sm:flex-none sm:!px-9">
              {heroCopy.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
