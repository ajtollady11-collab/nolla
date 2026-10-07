import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { TM } from '@/components/ui/TM';
import { ugcCopy, ugcItems } from '@/data/home';
import { products } from '@/data/products';
import { SilentVideo } from './SilentVideo';

/**
 * "See Nolla in real life": up to 5 vertical, TikTok-style clips.
 * Renders nothing until data/home.ts → ugcItems has genuine videos
 * (the homepage then shows it in place of the "Staying in" section).
 */
export function RealLife() {
  if (ugcItems.length === 0) return null;
  const items = ugcItems.slice(0, 5);
  return (
    <section className="py-16 sm:py-24" aria-labelledby="real-life-heading">
      <div className="container-soft">
        <Reveal className="max-w-2xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mocha">{ugcCopy.eyebrow}</p>
          <h2 id="real-life-heading" className="mt-3 font-serif text-[2.5rem] font-light leading-[0.98] tracking-[-0.04em] sm:text-display-md">
            {ugcCopy.headline}
          </h2>
          <p className="mt-4 text-[1.05rem] text-charcoal/70">{ugcCopy.body}</p>
        </Reveal>
      </div>

      <ul
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:scroll-px-8 sm:px-8 lg:mx-auto lg:grid lg:max-w-[1320px] lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-12"
        aria-label="Nolla videos"
      >
        {items.map((v, i) => {
          const product = v.product ? products[v.product] : null;
          return (
            <li key={v.src} className="w-[62%] shrink-0 snap-start min-[480px]:w-[42%] sm:w-[30%] lg:w-auto">
              <Reveal delay={i * 60}>
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] bg-oat-soft">
                  <SilentVideo src={v.src} poster={v.poster} label={v.alt} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  {product ? (
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-charcoal/75 underline decoration-charcoal/20 underline-offset-[6px] transition-colors hover:text-charcoal"
                    >
                      Shop <TM>{product.shortName}</TM>
                      <ArrowRight className="h-3 w-3" aria-hidden />
                    </Link>
                  ) : (
                    <span />
                  )}
                  {v.credit && <span className="truncate text-xs text-charcoal/50">{v.credit}</span>}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
