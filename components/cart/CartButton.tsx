'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';
import { cn } from '@/lib/cn';

export function CartButton({ className }: { className?: string }) {
  const { count, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={count ? `Open cart, ${count} item${count === 1 ? '' : 's'}` : 'Open cart'}
      className={cn(
        'relative grid h-11 w-11 place-items-center rounded-full bg-white text-charcoal shadow-pillow transition-transform duration-300 ease-soft hover:-translate-y-0.5 active:scale-95',
        className,
      )}
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden />
      {count > 0 && (
        <span
          key={count}
          className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 animate-rise place-items-center rounded-full bg-mocha px-1 text-[0.65rem] font-semibold text-cream"
        >
          {count}
        </span>
      )}
    </button>
  );
}
