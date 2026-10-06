import { announcementItems } from '@/data/site';

/**
 * Sliding announcement bar (top of every page).
 * Seamless loop: the track holds two identical halves and slides exactly -50%,
 * so the end of the animation lines up pixel-perfectly with the start.
 * Each half repeats the messages enough times to be wider than any screen.
 * Pure CSS (GPU transform), pauses on hover, static for reduced-motion users.
 */
const REPEATS_PER_HALF = 4;

export function PromoBar() {
  const half = Array.from({ length: REPEATS_PER_HALF }, () => announcementItems).flat();
  return (
    <div className="relative overflow-hidden bg-charcoal text-cream" role="region" aria-label="Offers">
      {/* Screen readers hear the messages once, not on a loop */}
      <p className="sr-only">{announcementItems.join('. ')}.</p>
      <div className="marquee-track flex w-max" aria-hidden>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {half.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className="flex h-9 items-center whitespace-nowrap px-6 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-cream/90 sm:px-8 sm:text-[0.68rem]"
              >
                <span>{item}</span>
                <span className="ml-12 text-cream/35 sm:ml-16">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
