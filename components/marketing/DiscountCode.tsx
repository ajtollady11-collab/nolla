'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { discount } from '@/data/marketing';
import { cn } from '@/lib/cn';

/** "10% OFF · Code: NOLLA10 · [Copy code]". Display only; nothing is applied automatically. */
export function DiscountCode({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(discount.code);
    } catch {
      // Fallback for browsers that block the clipboard API
      const el = document.createElement('textarea');
      el.value = discount.code;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
      } catch {
        /* user can still select the code manually */
      }
      el.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between gap-4 border-y border-charcoal/10 py-5">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mocha">{discount.label}</p>
          <p className="mt-1 text-xs text-charcoal/55">Your code</p>
        </div>
        <p className="select-all font-sans text-[1.6rem] font-semibold tracking-[0.12em] text-charcoal" aria-label={`Discount code ${discount.code.split('').join(' ')}`}>
          {discount.code}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border text-[0.74rem] font-semibold uppercase tracking-[0.08em] transition-[background-color,color,border-color,transform] duration-300 ease-soft active:scale-[0.98]',
          copied ? 'border-charcoal bg-charcoal text-cream' : 'border-charcoal/20 bg-transparent text-charcoal hover:border-charcoal/50',
        )}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        {copied ? 'Copied' : 'Copy code'}
      </button>
      <p className="mt-3 text-center text-[0.72rem] text-charcoal/50" aria-live="polite">
        {copied ? `${discount.code} copied. ${discount.howToUse}` : discount.howToUse}
      </p>
    </div>
  );
}
