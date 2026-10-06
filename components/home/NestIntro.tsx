import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { TM } from '@/components/ui/TM';
import { homeImages, nestCopy } from '@/data/home';
import { NEST, NEST_NOOK_SIZE, NEST_NUV_SIZE, NEST_SAVING, NOOK, NUV } from '@/data/products';
import { formatPrice } from '@/lib/format';

/** Introduces the Nest™ as the signature set. Every price comes from data/products.ts. */
export function NestIntro() {
  const img = homeImages.nest;
  const nuvColours = NUV.options.find((o) => o.id === 'colour')?.values.length ?? 0;
  const nookColours = NOOK.options.find((o) => o.id === 'colour')?.values.length ?? 0;
  const rows = [
    { name: 'Nuv™ blanket', detail: NEST_NUV_SIZE.label, price: formatPrice(NEST_NUV_SIZE.price!) },
    { name: 'Nook™ hooded blanket', detail: NEST_NOOK_SIZE.label, price: formatPrice(NEST_NOOK_SIZE.price!) },
    { name: 'Nimbus™ cloud pillow', detail: '25 cm', price: 'Free' },
  ];

  return (
    <section id="nest" className="container-soft scroll-mt-24 py-16 sm:py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-oat-soft lg:rounded-[2.25rem]">
          <SmartImage src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </Reveal>

        <Reveal delay={80}>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mocha">{nestCopy.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[2.5rem] font-light leading-[0.98] tracking-[-0.04em] sm:text-display-md">
            <TM>{nestCopy.headline}</TM>
          </h2>
          <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-charcoal/70">{nestCopy.body}</p>

          {/* What's in it */}
          <ul className="mt-8 border-t border-charcoal/10">
            {rows.map((r) => (
              <li key={r.name} className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 py-3.5">
                <span className="text-[0.95rem]">
                  <span className="font-medium">{r.name}</span>
                  <span className="ml-2 text-charcoal/50">{r.detail}</span>
                </span>
                <span className={r.price === 'Free' ? 'text-sm font-semibold text-mocha' : 'text-sm text-charcoal/50'}>{r.price}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="text-[2rem] font-semibold tracking-tight">{formatPrice(NEST.price)}</span>
            <s className="text-charcoal/45">{formatPrice(NEST.compareAtPrice!)}</s>
            <span className="rounded-full bg-mocha px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-cream">
              Save {formatPrice(NEST_SAVING)}
            </span>
          </div>
          <p className="mt-2 text-sm text-charcoal/55">
            {formatPrice(NEST_SAVING)} less than buying the pieces separately. Choose from {nuvColours} Nuv™ and {nookColours} Nook™ colours.
          </p>

          <Button href={`/products/${NEST.slug}`} size="lg" className="group mt-8 w-full sm:w-fit sm:px-12">
            {nestCopy.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
