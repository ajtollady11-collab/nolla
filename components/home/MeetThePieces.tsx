import { Plus } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { NestFeature } from './NestFeature';
import { NUV, NOOK } from '@/data/products';

export function MeetThePieces() {
  return (
    <section id="pieces" className="container-soft scroll-mt-24 py-16 sm:py-24">
      <SectionHeading>Meet the pieces.</SectionHeading>

      <div className="relative mt-10 grid gap-12 sm:grid-cols-2 sm:gap-6 lg:gap-10">
        <Reveal>
          <ProductCard product={NUV} cta="Shop Nuv" />
        </Reveal>
        <Reveal delay={120}>
          <ProductCard product={NOOK} cta="Shop Nook" />
        </Reveal>
        {/* The two pieces add up to the Nest */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[40%] z-10 hidden h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-cream text-charcoal shadow-pillow sm:grid"
        >
          <Plus className="h-5 w-5" strokeWidth={1.6} />
        </span>
      </div>

      <NestFeature className="mt-16 sm:mt-20" />
    </section>
  );
}
