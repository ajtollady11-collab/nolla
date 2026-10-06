import { Reveal } from '@/components/ui/Reveal';
import { brandStoryCopy } from '@/data/home';

export function BrandStory() {
  return (
    <section className="container-soft py-16 sm:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mocha">{brandStoryCopy.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-[16ch] text-balance font-serif text-[2.4rem] font-light leading-[1] tracking-[-0.04em] sm:text-display-md">
          {brandStoryCopy.headline}
        </h2>
        <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-charcoal/70">
          {brandStoryCopy.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-8 font-serif text-xl font-light italic text-charcoal/80">{brandStoryCopy.signoff}</p>
      </Reveal>
    </section>
  );
}
