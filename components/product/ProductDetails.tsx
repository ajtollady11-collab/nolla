import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Product } from '@/data/products';

export function ProductDetails({ product }: { product: Product }) {
  return (
    <section className="container-soft py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading>The details.</SectionHeading>
          <ul className="mt-8 flex flex-wrap gap-2">
            {product.highlights.map((h) => (
              <li key={h} className="rounded-full bg-oat/70 px-4 py-2 text-sm text-charcoal/80">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <Accordion
          tone="line"
          defaultOpen={product.details[0]?.title}
          items={product.details.map((d) => ({ id: d.title, title: d.title, body: d.body }))}
        />
      </div>
    </section>
  );
}
