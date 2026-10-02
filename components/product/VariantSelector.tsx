'use client';

import type { ProductOption } from '@/data/products';
import { cn } from '@/lib/cn';

/** Renders one product option as swatches or pills. Controlled. */
export function VariantSelector({
  option,
  value,
  onChange,
}: {
  option: ProductOption;
  value: string;
  onChange: (value: string) => void;
}) {
  const selected = option.values.find((v) => v.value === value);
  return (
    <fieldset>
      <legend className="mb-3 flex items-baseline gap-2 text-sm">
        <span className="text-charcoal/60">{option.name}</span>
        <span className="font-medium text-charcoal">{selected?.label}</span>
      </legend>
      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={option.name}>
        {option.values.map((v) => {
          const isSelected = v.value === value;
          const disabled = v.available === false;
          if (option.display === 'swatch') {
            return (
              <button
                key={v.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={v.label}
                title={v.label}
                disabled={disabled}
                onClick={() => onChange(v.value)}
                className={cn(
                  'relative grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 ease-soft hover:scale-105 disabled:opacity-30',
                  isSelected ? 'ring-[1.5px] ring-charcoal ring-offset-[3px] ring-offset-cream' : 'ring-1 ring-charcoal/10',
                )}
              >
                <span className="h-full w-full rounded-full shadow-inner" style={{ backgroundColor: v.swatch }} />
              </button>
            );
          }
          return (
            <button
              key={v.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(v.value)}
              className={cn(
                'flex min-h-11 items-center gap-2 rounded-full px-5 text-sm transition-[background-color,color,box-shadow] duration-300 ease-soft disabled:opacity-30',
                isSelected ? 'bg-charcoal text-cream shadow-pillow' : 'bg-white text-charcoal hover:shadow-pillow',
              )}
            >
              {v.label}
              {v.note && <span className={cn('text-xs', isSelected ? 'text-cream/60' : 'text-charcoal/45')}>{v.note}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
