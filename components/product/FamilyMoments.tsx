'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { TM } from '@/components/ui/TM';
import type { Product } from '@/data/products';
import { cn } from '@/lib/cn';

/**
 * "More than a blanket.": one large editorial family photo; the swatches below
 * swap it to the same moment in each colour (no repetitive grid of near-identical photos).
 */
export function FamilyMoments({ product }: { product: Product }) {
  const colours = product.options.find((o) => o.id === 'colour')?.values.filter((v) => v.lifestyle) ?? [];
  const [active, setActive] = useState(colours[0]?.value);
  if (colours.length === 0) return null;
  const current = colours.find((c) => c.value === active) ?? colours[0];

  return (
    <section className="bg-white/55 py-16 sm:py-24" aria-labelledby="family-heading">
      <div className="container-soft grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-oat-soft lg:rounded-[2.25rem]">
          {colours.map((c) => (
            <SmartImage
              key={c.value}
              src={c.lifestyle!.src}
              alt={c.lifestyle!.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn('object-cover transition-opacity duration-700 ease-soft', c.value === current.value ? 'opacity-100' : 'opacity-0')}
              aria-hidden={c.value !== current.value}
            />
          ))}
        </Reveal>

        <Reveal delay={80}>
          <h2 id="family-heading" className="font-serif text-[2.6rem] font-light leading-[0.96] tracking-[-0.045em] sm:text-display-md lg:text-display-lg">
            More than a blanket.
          </h2>
          <p className="mt-5 max-w-[34ch] font-serif text-[1.35rem] font-light leading-snug text-charcoal/80">
            Some of the best moments happen when there’s nowhere else to be.
          </p>
          <p className="mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed text-charcoal/70">
            The <TM>Nuv™</TM> is made to be shared. In the bigger sizes there’s room for the whole sofa, and it’s soft enough that
            everyone wants their corner of it. Film nights, lazy Sundays, long winter evenings and everything in between.
          </p>

          <div className="mt-8">
            <p className="text-sm text-charcoal/55">
              See it in <span className="font-medium text-charcoal">{current.label}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Show the photo in a colour">
              {colours.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  role="radio"
                  aria-checked={c.value === current.value}
                  aria-label={c.label}
                  title={c.label}
                  onClick={() => setActive(c.value)}
                  className={cn(
                    'h-9 w-9 rounded-full ring-inset transition-[box-shadow,transform] duration-300 ease-soft hover:scale-105',
                    c.value === current.value ? 'ring-[1.5px] ring-charcoal ring-offset-[3px] ring-offset-cream' : 'ring-1 ring-charcoal/15',
                  )}
                  style={{ backgroundColor: c.swatch }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
