import type { Metadata } from 'next';
import { Plus } from 'lucide-react';
import { NestFeature } from '@/components/home/NestFeature';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { NUV, NOOK } from '@/data/products';
import { GiftFeature } from '@/components/gift/GiftFeature';

export const metadata: Metadata = { title: 'Shop' };

export default function ShopPage() {
  return (
    <>
      <section className="container-soft pb-10 pt-8 sm:pt-14">
        <h1 className="max-w-[14ch] font-serif text-[3.2rem] font-light leading-[0.95] tracking-[-0.045em] sm:text-display-lg">
          Everything for staying in.
        </h1>
        <p className="mt-5 max-w-[46ch] text-lg text-charcoal/70">
          Two ways to switch off, or both together as the Nest™. Every order comes with a free Nimbus™ cloud pillow.
        </p>
        <NestFeature heading="The whole setup." className="mt-12" />
      </section>

      <section id="pieces" className="container-soft scroll-mt-24 pb-24 pt-10">
        <SectionHeading size="sm">Or shop the pieces.</SectionHeading>
        <div className="relative mt-10 grid gap-12 sm:grid-cols-2 sm:gap-6 lg:gap-10">
          <Reveal>
            <ProductCard product={NUV} cta="Shop Nuv" />
          </Reveal>
          <Reveal delay={120}>
            <ProductCard product={NOOK} cta="Shop Nook" />
          </Reveal>
          <span
            aria-hidden
            className="absolute left-1/2 top-[40%] z-10 hidden h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-cream shadow-pillow sm:grid"
          >
            <Plus className="h-5 w-5" strokeWidth={1.6} />
          </span>
        </div>
      </section>
      <GiftFeature className="pb-24" />
    </>
  );
}
