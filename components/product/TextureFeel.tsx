import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import type { Product } from '@/data/products';

const CLAIMS = ['Ultra-soft plush texture', 'Thick, cloud-like feel', 'Made for slow mornings & cosy nights'];

/** "Feel the difference.": every colour's texture close-up, large and swipeable. */
export function TextureFeel({ product }: { product: Product }) {
  const colours = product.options.find((o) => o.id === 'colour')?.values.filter((v) => v.texture) ?? [];
  if (colours.length === 0) return null;
  return (
    <section className="py-16 sm:py-24" aria-labelledby="feel-heading">
      <div className="container-soft grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <Reveal>
          <h2 id="feel-heading" className="font-serif text-[2.6rem] font-light leading-[0.96] tracking-[-0.045em] sm:text-display-md lg:text-display-lg">
            Feel the difference.
          </h2>
          <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed text-charcoal/70">
            Made for the moments when you want to disappear into something soft, warm and ridiculously comfortable.
          </p>
        </Reveal>
        <Reveal as="div" delay={80}>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {CLAIMS.map((c) => (
              <li key={c} className="rounded-full border border-charcoal/10 bg-white/60 px-4 py-2 text-sm text-charcoal/80">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <ul
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:gap-4 sm:px-8 lg:mx-auto lg:max-w-[1320px] lg:px-12"
        aria-label="Nuv™ texture in every colour"
      >
        {colours.map((c, i) => (
          <li key={c.value} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[31%]">
            <Reveal delay={Math.min(i, 3) * 70}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-oat-soft">
                <SmartImage
                  src={c.texture!.src}
                  alt={c.texture!.alt}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 44vw, 78vw"
                  className="object-cover transition-transform duration-[1400ms] ease-soft hover:scale-[1.04]"
                />
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-charcoal/70">
                <span className="h-3 w-3 rounded-full ring-1 ring-inset ring-charcoal/15" style={{ backgroundColor: c.swatch }} aria-hidden />
                {c.label}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
