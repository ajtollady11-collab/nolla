import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { heroCopy, homeImages } from '@/data/home';

/**
 * Full-screen editorial hero.
 * Desktop (lg+): the photo fills the first screen and sits under the floating
 * navigation; copy lives on the clear wall on the left, with an almost invisible
 * cream wash behind the text only (the photo itself is never darkened).
 * Phones/tablet: a deliberate crop anchored to the right so her face and the whole
 * blanket stay in frame, with the copy directly beneath.
 */
export function HomeHero() {
  const img = homeImages.hero;
  return (
    <section className="relative lg:-mt-[4.75rem] lg:h-[calc(100svh-2.25rem)] lg:max-h-[1100px] lg:min-h-[640px]">
      {/* Image */}
      <div className="relative aspect-[7/6] w-full overflow-hidden bg-oat-soft sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
        <SmartImage
          src={img.src}
          alt={img.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="animate-settle object-cover [object-position:var(--focus-m)] lg:[object-position:var(--focus-d)]"
          style={{ ['--focus-m' as string]: img.focusMobile, ['--focus-d' as string]: img.focusDesktop }}
        />
        {/* Readability: a whisper of cream behind the left-hand copy only */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-cream/45 via-cream/15 to-transparent lg:block"
        />
      </div>

      {/* Copy */}
      <div className="container-soft relative lg:absolute lg:inset-0 lg:flex lg:items-center">
        <div className="pb-2 pt-7 sm:pt-9 lg:max-w-[36rem] lg:pb-0 lg:pt-16 xl:max-w-[40rem]">
          <p className="animate-rise text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mocha">{heroCopy.eyebrow}</p>
          <h1
            className="mt-3 animate-rise text-balance font-serif text-[2.6rem] font-light leading-[0.95] tracking-[-0.045em] text-charcoal min-[400px]:text-[2.85rem] sm:text-display-md lg:mt-5 lg:text-display-lg xl:text-display-xl"
            style={{ animationDelay: '80ms' }}
          >
            {heroCopy.headline}
          </h1>
          <p
            className="mt-4 max-w-[34ch] animate-rise text-[1rem] leading-relaxed text-charcoal/75 sm:text-lg lg:mt-6 lg:text-charcoal/80"
            style={{ animationDelay: '160ms' }}
          >
            {heroCopy.body}
          </p>
          <div className="mt-6 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-9" style={{ animationDelay: '240ms' }}>
            <Button href="/shop" size="lg" className="sm:px-10">
              {heroCopy.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover/btn:translate-x-1" aria-hidden />
            </Button>
            <Button href="#nest" size="lg" variant="secondary" className="sm:px-9">
              {heroCopy.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
