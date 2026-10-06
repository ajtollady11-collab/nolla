import { Gift, Lock, RotateCcw, Truck } from 'lucide-react';
import { trustItems } from '@/data/home';

const icons = { truck: Truck, returns: RotateCcw, lock: Lock, gift: Gift };

/** Quiet reassurance row under the hero. Only claims the business actually offers. */
export function TrustStrip() {
  return (
    <section aria-label="Why it’s easy to order" className="container-soft">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-4 border-y border-charcoal/10 py-5 sm:py-6 lg:grid-cols-4">
        {trustItems.map((t) => {
          const Icon = icons[t.icon];
          return (
            <li key={t.label} className="flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-charcoal/75 sm:text-[0.75rem] lg:justify-center">
              <Icon className="h-4 w-4 shrink-0 text-mocha" strokeWidth={1.6} aria-hidden />
              <span>{t.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
