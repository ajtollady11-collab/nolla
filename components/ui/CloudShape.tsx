import { cn } from '@/lib/cn';

/**
 * An organic, pillow-like blob used behind imagery and CTA sections.
 * Pure SVG path (no cartoon clouds), blurred very slightly so its edge reads as soft.
 */
const paths = {
  a: 'M421 58c96 18 172 98 196 190 26 100-8 214-92 272-86 60-212 64-314 30C114 518 32 446 14 348-6 244 42 132 128 82 214 30 330 40 421 58Z',
  b: 'M393 34c104 10 196 82 218 180 24 108-24 222-116 276-96 56-226 54-322 4C80 446 16 356 22 252 30 148 104 62 204 36c62-16 124-8 189-2Z',
  c: 'M318 26c120-12 250 34 290 138 38 98-16 214-96 282-82 70-204 104-304 66C106 474 30 378 20 276 10 172 70 78 160 46c52-18 104-14 158-20Z',
};

export function CloudShape({
  variant = 'a',
  className,
  color = '#E6D9C9',
  blur = 2,
}: {
  variant?: keyof typeof paths;
  className?: string;
  color?: string;
  /** Edge softness in px (0 = crisp) */
  blur?: number;
}) {
  return (
    <svg
      viewBox="0 0 632 560"
      aria-hidden
      focusable="false"
      className={cn('pointer-events-none select-none overflow-visible', className)}
      preserveAspectRatio="none"
    >
      <path d={paths[variant]} fill={color} style={blur ? { filter: `blur(${blur}px)` } : undefined} />
    </svg>
  );
}
