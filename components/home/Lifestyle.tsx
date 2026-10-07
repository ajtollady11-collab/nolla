import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { lifestyleCopy, moments } from '@/data/home';

/** Product → emotion: the moments Nolla is for. Swipeable row on phones, grid on desktop. */
export function Lifestyle() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-soft">
        <Reveal className="max-w-2xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mocha">{lifestyleCopy.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[2.5rem] font-light leading-[0.98] tracking-[-0.04em] sm:text-display-md">{lifestyleCopy.headline}</h2>
          <p className="mt-4 text-[1.05rem] text-charcoal/70">{lifestyleCopy.body}</p>
        </Reveal>
      </div>

      <ul
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:scroll-px-8 sm:px-8 lg:mx-auto lg:grid lg:max-w-[1320px] lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-12"
        aria-label="Moments made for Nolla"
      >
        {moments.map((m, i) => (
          <li key={m.label} className="w-[62%] shrink-0 snap-start min-[480px]:w-[42%] sm:w-[30%] lg:w-auto">
            <Reveal delay={i * 60}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-oat-soft">
                <SmartImage
                  src={m.image.src}
                  alt={m.image.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 62vw"
                  className="object-cover transition-transform duration-[1200ms] ease-soft hover:scale-[1.03]"
                  style={m.focus ? { objectPosition: m.focus } : undefined}
                />
              </div>
              <p className="mt-3 font-serif text-[1.2rem] font-light tracking-[-0.01em]">{m.label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
