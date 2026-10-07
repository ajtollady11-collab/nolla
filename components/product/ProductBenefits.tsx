import { Reveal } from '@/components/ui/Reveal';
import type { Product } from '@/data/products';

/** Four short, true benefit cards (from product.benefits). */
export function ProductBenefits({ product }: { product: Product }) {
  if (!product.benefits?.length) return null;
  return (
    <section className="container-soft pt-16 sm:pt-24" aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="font-serif text-[2.4rem] font-light leading-[0.98] tracking-[-0.04em] sm:text-display-sm">
        Why you’ll love it.
      </h2>
      <ol className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {product.benefits.map((b, i) => (
          <Reveal as="li" key={b.title} delay={i * 70} className="border-t border-charcoal/15 pt-5">
            <span className="text-xs tabular-nums text-mocha">0{i + 1}</span>
            <h3 className="mt-3 font-serif text-[1.5rem] font-light leading-tight tracking-[-0.02em]">{b.title}</h3>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-charcoal/70">{b.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
