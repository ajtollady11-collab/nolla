'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export type AccordionItem = { id: string; title: string; body: React.ReactNode };

/**
 * Smooth accordion using the CSS grid-rows 0fr → 1fr trick
 * (animates to the content's natural height, no JS measuring).
 */
export function Accordion({
  items,
  defaultOpen,
  className,
  tone = 'card',
}: {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
  tone?: 'card' | 'line';
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <div className={cn(tone === 'card' ? 'space-y-3' : 'divide-y divide-charcoal/10 border-y border-charcoal/10', className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        return (
          <div
            key={item.id}
            className={cn(
              tone === 'card' &&
                'rounded-4xl bg-white/70 shadow-inner transition-[background-color,box-shadow] duration-500 ease-soft',
              tone === 'card' && isOpen && 'bg-white shadow-pillow',
            )}
          >
            <h3 className="font-sans">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className={cn(
                  'flex w-full items-center justify-between gap-6 text-left text-[0.98rem] font-medium text-charcoal transition-colors hover:text-mocha',
                  tone === 'card' ? 'rounded-4xl px-6 py-5 sm:px-7' : 'py-5',
                )}
              >
                <span>{item.title}</span>
                <span
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream transition-transform duration-500 ease-soft',
                    isOpen && 'rotate-45 bg-oat',
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-soft',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className={cn('max-w-[62ch] text-[0.95rem] leading-relaxed text-charcoal/70', tone === 'card' ? 'px-6 pb-6 sm:px-7' : 'pb-6')}>
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
