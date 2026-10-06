'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from './CartProvider';
import { BundleUpsell } from '@/components/product/BundleUpsell';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { products, describeSelections, galleryFor, NEST } from '@/data/products';
import { deliveryCopy, shippingRegions, type ShippingRegion } from '@/data/site';
import { GiftLine } from './GiftLine';
import { DiscountField } from './DiscountField';
import { formatPrice } from '@/lib/format';
import { MAX_QTY, linePrice } from '@/lib/cart';
import { cn } from '@/lib/cn';

/**
 * Right-hand drawer on desktop, bottom sheet on mobile.
 * One element, two transforms: translate-y on small screens, translate-x from md up.
 */
export function CartDrawer() {
  const {
    lines, isOpen, close, subtotal, setQuantity, remove, suggestion, upgradeToNest, lastAddedKey,
    shippingRegion, setShippingRegion, shippingMethod, setShippingMethod, shippingCost, total,
    discountCode, discountAmount,
  } = useCart();
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setNotice(null);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [isOpen, close]);



  const empty = lines.length === 0;

  return (
    <div
      className={cn('fixed inset-0 z-[60]', isOpen ? 'pointer-events-auto' : 'pointer-events-none')}
      inert={!isOpen}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={cn(
          'absolute inset-0 bg-charcoal/30 backdrop-blur-[3px] transition-opacity duration-500 ease-soft',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={cn(
          'absolute flex flex-col bg-cream shadow-cloud transition-transform duration-[650ms] ease-soft',
          // Mobile: bottom sheet
          'inset-x-0 bottom-0 max-h-[90dvh] rounded-t-5xl',
          // Desktop: floating right drawer
          'md:inset-y-3 md:left-auto md:right-3 md:max-h-none md:w-[440px] md:rounded-5xl',
          isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-[calc(100%+1.5rem)] md:translate-y-0',
        )}
      >
        {/* Grab handle (mobile only) */}
        <div className="flex justify-center pt-3 md:hidden" aria-hidden>
          <span className="h-1.5 w-12 rounded-full bg-charcoal/15" />
        </div>

        <div className="flex items-center justify-between px-6 pb-4 pt-4 md:px-7 md:pt-7">
          <h2 className="font-serif text-[1.9rem] font-light tracking-[-0.03em]">Your cart</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-pillow transition-transform duration-300 ease-soft hover:rotate-90"
          >
            <X className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          </button>
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10 pt-6 text-center">
            <p className="font-serif text-2xl font-light tracking-[-0.02em]">Nothing here yet.</p>
            <p className="mt-2 max-w-[28ch] text-sm text-charcoal/60">
              The Nolla Nest™ is a good place to start: the Nuv™ and Nook™ together for {formatPrice(NEST.price)}.
            </p>
            <div className="mt-7 flex w-full flex-col items-center gap-3">
              <Button href={`/products/${NEST.slug}`} onClick={close} size="lg" fullWidth>
                Build your nest
              </Button>
              <Button variant="ghost" onClick={close}>
                Continue shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 pb-4 md:px-5">
              {lines.map((line) => {
                const p = products[line.slug];
                const justAdded = line.key === lastAddedKey;
                return (
                  <li
                    key={line.key}
                    className={cn(
                      'flex gap-4 rounded-4xl bg-white p-3 pr-4 transition-shadow duration-700',
                      justAdded ? 'shadow-lift' : 'shadow-pillow',
                    )}
                  >
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={close}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-3xl bg-oat-soft"
                    >
                      <SmartImage src={galleryFor(p, line.selections)[0].src} alt="" fill sizes="80px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium leading-tight">{p.name}</p>
                          <p className="mt-1 truncate text-xs text-charcoal/55">{describeSelections(p, line.selections)}</p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold">{formatPrice(linePrice(line) * line.quantity)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full bg-cream">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity - 1)}
                            aria-label={`Decrease quantity of ${p.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-oat"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity + 1)}
                            disabled={line.quantity >= MAX_QTY}
                            aria-label={`Increase quantity of ${p.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-oat disabled:opacity-40"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          className="text-xs text-charcoal/50 underline-offset-4 transition-colors hover:text-charcoal hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}

              <li className="list-none">
                <GiftLine />
              </li>

              {suggestion && (
                <li className="list-none pt-1">
                  <BundleUpsell
                    variant="cart"
                    title={suggestion.title}
                    body={suggestion.body}
                    action={suggestion.action}
                    onAction={upgradeToNest}
                  />
                </li>
              )}

              <li className="list-none px-1 pt-1">
                <DiscountField />
              </li>

              <li className="list-none px-1 pt-3">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-charcoal/65">Delivering to</span>
                  <div className="flex rounded-full bg-white/70 p-1" role="radiogroup" aria-label="Delivering to">
                    {(Object.keys(shippingRegions) as ShippingRegion[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        role="radio"
                        aria-checked={shippingRegion === r}
                        onClick={() => setShippingRegion(r)}
                        className={cn(
                          'rounded-full px-3.5 py-1.5 text-xs font-medium transition-[background-color,color,box-shadow] duration-300 ease-soft',
                          shippingRegion === r ? 'bg-charcoal text-cream shadow-pillow' : 'text-charcoal/70 hover:text-charcoal',
                        )}
                      >
                        {r === 'uk' ? 'UK' : 'Outside UK'}
                      </button>
                    ))}
                  </div>
                </div>
                <fieldset>
                  <legend className="sr-only">Delivery</legend>
                  <div className="space-y-2" role="radiogroup" aria-label="Delivery">
                    {shippingRegions[shippingRegion].methods.map((m) => {
                      const selected = m.id === shippingMethod;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setShippingMethod(m.id)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left transition-[background-color,box-shadow] duration-300 ease-soft',
                            selected ? 'bg-white shadow-pillow' : 'bg-white/40 hover:bg-white/70',
                          )}
                        >
                          <span
                            className={cn(
                              'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors',
                              selected ? 'border-charcoal bg-charcoal' : 'border-charcoal/25',
                            )}
                            aria-hidden
                          >
                            {selected && <span className="h-1.5 w-1.5 rounded-full bg-cream" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">{m.label}</span>
                            <span className="block text-xs text-charcoal/55">{m.estimate}</span>
                          </span>
                          <span className="text-sm font-medium">{m.price === 0 ? 'Free' : formatPrice(m.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <p className="mt-2.5 px-1 text-[0.7rem] leading-relaxed text-charcoal/50">
                  {deliveryCopy.multiplePackages}
                </p>
              </li>

            </ul>

            <div className="border-t border-charcoal/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 md:px-7 md:pb-7">

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-charcoal/65">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-mocha">
                    <dt>Discount ({discountCode})</dt>
                    <dd>−{formatPrice(discountAmount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/65">
                  <dt>Delivery</dt>
                  <dd>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</dd>
                </div>
                <div className="flex items-baseline justify-between pt-1.5">
                  <dt className="font-medium">Total</dt>
                  <dd className="text-xl font-semibold tracking-tight">{formatPrice(total)}</dd>
                </div>
              </dl>

              {notice && (
                <p role="status" className="mt-4 rounded-3xl bg-oat-soft px-4 py-3 text-xs leading-relaxed text-charcoal/75">
                  {notice}
                </p>
              )}

              <Button href="/checkout" onClick={close} size="lg" fullWidth className="mt-5">
                Checkout
              </Button>
              <p className="mt-2 text-center text-[0.68rem] text-charcoal/45">Secure payment by Square · Apple Pay & Google Pay accepted</p>
              <div className="mt-2 flex justify-center">
                <Button variant="ghost" onClick={close}>
                  Continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
