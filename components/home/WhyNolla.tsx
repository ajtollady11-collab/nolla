import { Reveal } from '@/components/ui/Reveal';
import { whyNolla } from '@/data/home';

/** Four benefits, each true of the actual products. Typographic, no icon soup. */
export function WhyNolla() {
  return (
    <section className="bg-white/55 py-16 sm:py-20">
      <div className="container-soft">
        <h2 className="sr-only">Why Nolla</h2>
        <ol className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyNolla.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 70} className="border-t border-charcoal/15 pt-5">
              <span className="text-xs tabular-nums text-mocha">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-[1.6rem] font-light leading-tight tracking-[-0.02em]">{w.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-charcoal/70">{w.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
