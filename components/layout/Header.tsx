'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { CartButton } from '@/components/cart/CartButton';
import { navLinks } from '@/data/site';
import { NEST } from '@/data/products';
import { cn } from '@/lib/cn';
import { TM } from '@/components/ui/TM';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock scroll + Escape to close while the menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
        <div
          className={cn(
            'mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-full pl-6 pr-2.5 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-soft sm:pl-8',
            scrolled ? 'bg-cream/80 shadow-pillow backdrop-blur-xl' : 'bg-transparent',
          )}
        >
          <Logo />

          {/* Desktop */}
          <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium text-charcoal/75 transition-colors hover:bg-white/70 hover:text-charcoal',
                  pathname === l.href && 'text-charcoal',
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button href={`/products/${NEST.slug}`} size="sm" className="ml-2">
              Shop the Nest
            </Button>
            <CartButton className="ml-1" />
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full text-charcoal transition-colors hover:bg-white/70"
            >
              <Menu className="h-5 w-5" strokeWidth={1.7} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn('fixed inset-0 z-50 md:hidden', menuOpen ? 'pointer-events-auto' : 'pointer-events-none')}
        inert={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn('absolute inset-0 bg-charcoal/25 backdrop-blur-sm transition-opacity duration-500', menuOpen ? 'opacity-100' : 'opacity-0')}
        />
        <div
          className={cn(
            'absolute inset-x-2 top-2 flex flex-col rounded-5xl bg-cream p-6 pb-8 shadow-cloud transition-[transform,opacity] duration-500 ease-soft',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-pillow"
            >
              <X className="h-5 w-5" strokeWidth={1.7} aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">
            {[{ label: 'Nolla Nest™', href: '/products/nolla-nest' }, ...navLinks].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-3xl px-2 py-3 font-serif text-[2.1rem] font-light leading-none tracking-[-0.03em] text-charcoal transition-colors active:bg-white/70"
              >
                <TM>{l.label}</TM>
              </Link>
            ))}
          </nav>
          <Button href={`/products/${NEST.slug}`} size="lg" fullWidth className="mt-10">
            Shop the Nest
          </Button>
        </div>
      </div>
    </>
  );
}
