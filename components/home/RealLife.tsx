import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { ugcItems } from '@/data/home';

/**
 * "See Nolla in real life": GENUINE customer/creator content only.
 * Hidden entirely until data/home.ts → ugcItems has real content.
 */
export function RealLife() {
  if (ugcItems.length === 0) return null;
  return (
    <section className="py-16 sm:py-24">
      <div className="container-soft">
        <h2 className="font-serif text-[2.5rem] font-light leading-[0.98] tracking-[-0.04em] sm:text-display-md">See Nolla in real life.</h2>
      </div>
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:px-8 lg:mx-auto lg:max-w-[1320px] lg:px-12">
        {ugcItems.map((u, i) => (
          <li key={u.src} className="w-[62%] shrink-0 snap-start sm:w-[30%] lg:w-[22%]">
            <Reveal delay={i * 60}>
              <a href={u.href ?? undefined} target={u.href ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] bg-oat-soft">
                  {u.type === 'video' ? (
                    <video src={u.src} poster={u.poster} muted playsInline loop autoPlay className="h-full w-full object-cover" aria-label={u.alt} />
                  ) : (
                    <SmartImage src={u.src} alt={u.alt} fill sizes="(min-width: 1024px) 22vw, 62vw" className="object-cover" />
                  )}
                </div>
                {u.credit && <p className="mt-2 text-sm text-charcoal/60">{u.credit}</p>}
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
