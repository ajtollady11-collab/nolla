import Link from 'next/link';
import { SmartImage } from '@/components/ui/SmartImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { products, primaryImage, NEST_NUV_SIZE, NEST_NOOK_SIZE, type ProductSlug } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { TM } from '@/components/ui/TM';

/** "What's inside?" for bundle pages: one soft card per included piece. */
export function WhatsInside({ includes }: { includes: ProductSlug[] }) {
  return (
    <section className="container-soft py-16 sm:py-24">
      <SectionHeading>What’s inside?</SectionHeading>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
        {includes.map((slug, i) => {
          const p = products[slug];
          return (
            <Reveal key={slug} delay={i * 120}>
              <Link
                href={`/products/${slug}`}
                className="group flex items-center gap-5 rounded-6xl bg-white p-3 pr-6 shadow-pillow transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift sm:gap-6"
              >
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-5xl bg-oat-soft sm:w-40">
                  <SmartImage
                    src={primaryImage(p).src}
                    alt={primaryImage(p).alt}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="font-serif text-[1.7rem] font-light leading-none tracking-[-0.03em] sm:text-[2rem]">
                    <TM>{p.name}</TM>
                  </p>
                  <p className="mt-2 text-sm text-charcoal/60">{p.kind}</p>
                  <p className="mt-3 text-sm text-charcoal/45">
                    {(slug === 'nolla-nuv' ? NEST_NUV_SIZE : NEST_NOOK_SIZE).label} ·{' '}
                    {formatPrice((slug === 'nolla-nuv' ? NEST_NUV_SIZE : NEST_NOOK_SIZE).price!)} on its own
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
