'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { CosyQuiz, QUIZ_TITLE_ID } from './CosyQuiz';
import { popupTriggers } from '@/data/marketing';
import { hasSubmittedEmail, markPopupDismissed, resetEmailState, wasPopupDismissed } from '@/lib/emailState';
import { cn } from '@/lib/cn';

/**
 * The 10% popup, with the cosy quiz built in:
 * intro → 4 questions → email → personality + NOLLA10.
 *
 * Appears 3 seconds after landing (or earlier on deep scroll / desktop exit intent). Never shown again once an email is submitted,
 * not again this visit once closed, and never over the cart or menu.
 */
export function EmailPopup() {
  const pathname = usePathname();
  const { isOpen: cartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // drives the enter/exit transition
  const shown = useRef(false);
  const startedAt = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const excluded = popupTriggers.excludePaths.some((p) => pathname?.startsWith(p));

  const show = useCallback(() => {
    if (shown.current || hasSubmittedEmail() || wasPopupDismissed()) return;
    // Don't interrupt: another overlay (cart, menu) has locked the page
    if (document.body.style.overflow === 'hidden') return;
    shown.current = true;
    setOpen(true);
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Testing: yoursite.com/?popup=reset forgets this browser's sign-up / dismissal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('popup') === 'reset') {
      resetEmailState();
      params.delete('popup');
      const qs = params.toString();
      window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash);
    }
  }, []);

  // Triggers
  useEffect(() => {
    if (excluded || shown.current) return;
    if (hasSubmittedEmail() || wasPopupDismissed()) return;
    if (!startedAt.current) startedAt.current = Date.now();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= popupTriggers.scrollDepth) show();
    };
    // Checked every half second, so if the cart/menu is open at the 3 s mark it shows once they close
    const timer = window.setInterval(() => {
      if (Date.now() - startedAt.current >= popupTriggers.delayMs) show();
    }, 500);
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && e.clientY <= 0 && Date.now() - startedAt.current >= popupTriggers.exitIntentMinMs) show();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseout', onMouseOut);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onMouseOut);
      window.clearInterval(timer);
    };
  }, [excluded, show, pathname]);

  const close = useCallback(() => {
    setMounted(false);
    // Closed without signing up → leave them alone for the rest of this visit
    if (!hasSubmittedEmail()) markPopupDismissed();
    window.setTimeout(() => setOpen(false), 400);
  }, []);

  // Escape closes; lock page scroll while open; focus the dialog for screen readers
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  // If the cart opens on top, step aside
  useEffect(() => {
    if (cartOpen && open) close();
  }, [cartOpen, open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[55] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div
        onClick={close}
        aria-hidden
        className={cn(
          'absolute inset-0 bg-charcoal/20 backdrop-blur-[2px] transition-opacity duration-500 ease-soft',
          mounted ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={QUIZ_TITLE_ID}
        className={cn(
          'relative w-full max-w-[420px] overflow-hidden rounded-4xl bg-cream shadow-cloud outline-none transition-[opacity,transform] duration-500 ease-soft',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close offer"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-charcoal/50 transition-colors hover:bg-white hover:text-charcoal"
        >
          <X className="h-4 w-4" strokeWidth={1.8} aria-hidden />
        </button>
        <div ref={scrollRef} className="max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain px-7 pb-7 pt-9 sm:max-h-[calc(100dvh-3rem)] sm:px-9 sm:pb-8">
          <CosyQuiz scrollRef={scrollRef} onClose={close} />
        </div>
      </div>
    </div>
  );
}
