import { Button } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal } from '@/components/ui/Reveal';
import { NEST, NEST_SAVING } from '@/data/products';
import { IMAGES } from '@/data/images';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import { TM } from '@/components/ui/TM';

/** The dominant Nest™ block, shown under the individual pieces. */
export function NestFeature({ heading = 'Or get the whole setup.', className }: { heading?: string; className?: string }) {
  return (
    <Reveal className={cn('relative', className)}>
      <div className="grid overflow-hidden rounded-6xl bg-oat lg:grid-cols-[1.1fr_1fr]">
        <div className="order-2 flex flex-col justify-center px-6 pb-9 pt-2 sm:px-12 sm:pb-12 lg:order-2 lg:px-14 lg:py-16 xl:px-20">
          <h2 className="hidden font-serif font-light tracking-[-0.04em] lg:block lg:text-display-lg lg:leading-[0.95]">
            {heading}
          </h2>
          <div className="lg:mt-10">
            <p className="font-serif text-[2.2rem] font-light leading-none tracking-[-0.03em] sm:text-[2.6rem]">
              <TM>{NEST.name}</TM>
            </p>
            <p className="mt-2 text-charcoal/65">Nuv™ blanket + Nook™ hooded blanket</p>
          </div>
          <PriceTag price={NEST.price} compareAtPrice={NEST.compareAtPrice} size="lg" className="mt-6" />
          <p className="mt-2 text-xs text-charcoal/55">Both in our largest sizes. {formatPrice(NEST_SAVING)} less than buying separately.</p>
          <Button href={`/products/${NEST.slug}`} size="lg" className="mt-8 w-full sm:w-fit sm:px-12">
            Build your nest
          </Button>
        </div>

        <div className="order-1 p-3 sm:p-4 lg:order-1">
          {/* Mobile heading sits above the image */}
          <h2 className="px-3 pb-6 pt-7 font-serif text-[2.6rem] font-light leading-[0.95] tracking-[-0.04em] sm:px-8 sm:pt-10 sm:text-display-md lg:hidden">
            {heading}
          </h2>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-5xl bg-oat-soft lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <SmartImage
              src={IMAGES.nestFeature.src}
              alt={IMAGES.nestFeature.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
