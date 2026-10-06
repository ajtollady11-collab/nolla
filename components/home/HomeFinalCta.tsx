import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { finalCtaCopy } from '@/data/home';

/** The emotional close: big lifestyle image, one line, one button. */
export function HomeFinalCta() {
  return (
    <section className="px-3 pb-10 pt-6 sm:px-5 sm:pb-16">
      <Reveal className="mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[2rem] bg-oat lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:rounded-[2.5rem]">
        <div className="relative aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-[560px]">
          <SmartImage
            src={finalCtaCopy.image.src}
            alt={finalCtaCopy.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: '50% 35%' }}
          />
        </div>
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:order-1 lg:px-16 lg:py-20">
          <h2 className="max-w-[14ch] text-balance font-serif text-[2.6rem] font-light leading-[0.96] tracking-[-0.045em] sm:text-display-md lg:text-display-lg">
            {finalCtaCopy.headline}
          </h2>
          <p className="mt-5 text-lg text-charcoal/70">{finalCtaCopy.body}</p>
          <Button href="/shop" size="lg" className="group mt-8 w-full sm:w-fit sm:px-12">
            {finalCtaCopy.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
