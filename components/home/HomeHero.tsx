import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { heroCopy, homeImages } from '@/data/home';
import { NEST, NOOK, NUV, fromPrice } from '@/data/products';
import { formatPrice } from '@/lib/format';

/**
 * Hero: the approved 16:9 Nuv™ image dominates; copy sits beside it (desktop)
 * or around it (mobile) — never in a box on top of the photo.
 * Mobile order: headline → image → line → CTAs, so the first screen shows
 * what Nolla is, the product, and where to tap.
 */
export function HomeHero() {
  const img = homeImages.hero;
  return (
    <section className="container-soft pb-10 pt-3 sm:pb-14 sm:pt-6 lg:pb-16 lg:pt-6">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-y-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-x-14 xl:gap-x-20">
        {/* Headline */}
        <div className="order-1 lg:order-1 lg:row-span-2 lg:self-center">
          <p className="animate-rise text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mocha">{heroCopy.eyebrow}</p>
          <h1
            className="mt-3 animate-rise text-balance font-serif text-[2.75rem] font-light leading-[0.95] tracking-[-0.045em] text-charcoal min-[400px]:text-[3rem] sm:text-display-md lg:mt-5 lg:text-display-lg xl:text-display-xl"
            style={{ animationDelay: '60ms' }}
          >
            {heroCopy.headline}
          </h1>

          {/* Desktop: copy + CTAs live in the text column */}
          <div className="hidden lg:block">
            <HeroBody />
          </div>
        </div>

        {/* Image */}
        <div className="order-2 lg:order-2 lg:row-span-2">
          <div className="relative aspect-[5/4] animate-settle overflow-hidden rounded-[1.75rem] bg-oat-soft sm:aspect-[16/10] lg:aspect-[16/12] lg:max-h-[78svh] lg:rounded-[2.25rem]">
            <SmartImage
              src={img.src}
              alt={img.alt}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              style={{ objectPosition: img.focus }}
            />
          </div>
        </div>

        {/* Mobile/tablet: copy + CTAs under the image */}
        <div className="order-3 lg:hidden">
          <HeroBody />
        </div>
      </div>
    </section>
  );
}

function HeroBody() {
  return (
    <>
      <p className="max-w-[34ch] animate-rise text-[1.02rem] leading-relaxed text-charcoal/70 sm:text-lg lg:mt-6" style={{ animationDelay: '140ms' }}>
        {heroCopy.body}
      </p>
      <div className="mt-6 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-8" style={{ animationDelay: '220ms' }}>
        <Button href="/shop" size="lg" className="group sm:px-10">
          {heroCopy.primaryCta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
        </Button>
        <Button href="#nest" size="lg" variant="secondary" className="sm:px-9">
          {heroCopy.secondaryCta}
        </Button>
      </div>
      <p className="mt-5 animate-rise text-[0.78rem] text-charcoal/55" style={{ animationDelay: '300ms' }}>
        Nuv™ blankets from {formatPrice(fromPrice(NUV))} · Nook™ from {formatPrice(fromPrice(NOOK))} · Nest™ {formatPrice(NEST.price)}
      </p>
    </>
  );
}
