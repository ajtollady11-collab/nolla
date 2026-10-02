'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { StarRating } from '@/components/ui/StarRating';
import { VariantSelector } from './VariantSelector';
import { BundleUpsell } from './BundleUpsell';
import { priceFor, NEST_SAVING, type Product } from '@/data/products';
import { INTERNATIONAL_FROM } from '@/data/site';
import { GiftCallout } from '@/components/gift/GiftCallout';
import { Truck } from 'lucide-react';
import { socialProof } from '@/data/site';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import { TM } from '@/components/ui/TM';

/** Everything in the right-hand buy column, plus the mobile sticky bar. */
export function ProductPurchase({
  product,
  selections,
  onSelect,
}: {
  product: Product;
  selections: Record<string, string>;
  onSelect: (optionId: string, value: string) => void;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Show the sticky mobile bar once the main CTA has scrolled out of view (upwards)
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function handleAdd() {
    add(product.slug, selections);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const { price, compareAtPrice } = priceFor(product, selections);
  const ctaLabel = added ? 'Added' : product.primaryCta;

  return (
    <div className="flex flex-col">
      <p className="text-sm text-charcoal/55">{product.kind}</p>
      <h1 className="mt-2 font-serif text-[3rem] font-light leading-[0.95] tracking-[-0.04em] sm:text-display-md lg:text-display-lg">
        <TM>{product.name}</TM>
      </h1>
      <p className="mt-3 text-pretty font-serif text-xl font-light text-charcoal/75 sm:text-2xl">{product.subtitle}</p>

      {/* Rating placeholder: wire to real review average later */}
      <a href="#reviews" className="mt-5 inline-flex w-fit items-center gap-2 text-sm text-charcoal/60 transition-colors hover:text-charcoal">
        <StarRating rating={socialProof.rating} />
        <span className="underline decoration-charcoal/20 underline-offset-4">Read reviews</span>
      </a>

      <PriceTag price={price} compareAtPrice={compareAtPrice} size="lg" className="mt-6" />

      <p className="mt-6 max-w-[48ch] text-[1.02rem] leading-relaxed text-charcoal/75">{product.shortDescription}</p>

      <div className="mt-8 space-y-7">
        {product.options.map((option) => (
          <VariantSelector
            key={option.id}
            option={option}
            value={selections[option.id]}
            onChange={(value) => onSelect(option.id, value)}
          />
        ))}
      </div>

      <div ref={ctaRef} className="mt-9">
        <Button onClick={handleAdd} size="lg" fullWidth className={cn(product.isBundle && 'h-16 text-[0.85rem]')}>
          {added && <Check className="h-4 w-4 animate-rise" aria-hidden />}
          {ctaLabel}
        </Button>
        <p className="mt-4 flex items-start gap-2.5 text-sm text-charcoal/70">
          <Truck className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden />
          <span>
            Free UK delivery. International from {formatPrice(INTERNATIONAL_FROM)}.
            {product.isBundle && ' Each piece ships separately.'}
          </span>
        </p>
      </div>

      <GiftCallout className="mt-6" />

      {product.isBundle ? (
        <ul className="mt-6 space-y-2.5">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-center gap-3 text-[0.95rem] text-charcoal/80">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-oat">
                <Check className="h-3.5 w-3.5 text-charcoal" strokeWidth={2.2} aria-hidden />
              </span>
              {h}
            </li>
          ))}
        </ul>
      ) : (
        <BundleUpsell
          className="mt-4"
          title="Complete your Nolla."
          body={
            product.slug === 'nolla-nuv'
              ? `Pair your Nuv™ with the Nook™ hooded blanket as the Nolla Nest™ and save ${formatPrice(NEST_SAVING)}.`
              : `Add the Nuv™ blanket and turn your Nook™ into the Nolla Nest™. Save ${formatPrice(NEST_SAVING)}.`
          }
          action="Shop the Nest"
        />
      )}

      {/* Mobile sticky buy bar */}
      <div
        className={cn(
          'fixed inset-x-3 bottom-3 z-30 flex items-center gap-3 rounded-full bg-white/90 p-2 pl-5 shadow-cloud backdrop-blur-xl transition-[transform,opacity] duration-500 ease-soft md:hidden',
          showSticky ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[150%] opacity-0',
        )}
        aria-hidden={!showSticky}
        inert={!showSticky}
      >
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-sm text-charcoal/60">{formatPrice(price)}</p>
        </div>
        <Button onClick={handleAdd} size="md" className="shrink-0">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
