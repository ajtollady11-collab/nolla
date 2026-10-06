import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { TM } from '@/components/ui/TM';
import { lineupCopy } from '@/data/home';
import { GIFT, NOOK, NUV, fromPrice, primaryImage, type Product } from '@/data/products';
import { formatPrice } from '@/lib/format';

/** The three Nolla pieces. Nimbus™ is presented as the gift, with a quieter link instead of a buy button. */
export function ProductLineup() {
  return (
    <section className="container-soft py-16 sm:py-24">
      <Reveal className="max-w-2xl">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mocha">{lineupCopy.eyebrow}</p>
        <h2 className="mt-3 font-serif text-[2.5rem] font-light leading-[0.98] tracking-[-0.04em] sm:text-display-md">{lineupCopy.headline}</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        <Piece product={NUV} copy={lineupCopy.nuv} price={`From ${formatPrice(fromPrice(NUV))}`} />
        <Piece product={NOOK} copy={lineupCopy.nook} price={`From ${formatPrice(fromPrice(NOOK))}`} delay={90} />
        <Piece product={GIFT} copy={lineupCopy.nimbus} price="Free with every order" delay={180} gift />
      </div>
    </section>
  );
}

function Piece({
  product,
  copy,
  price,
  delay = 0,
  gift = false,
}: {
  product: Product;
  copy: { tagline: string; body: string; cta: string };
  price: string;
  delay?: number;
  gift?: boolean;
}) {
  const img = primaryImage(product);
  const href = gift ? '#gift' : `/products/${product.slug}`;
  return (
    <Reveal delay={delay} as="article" className="group flex flex-col">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-oat-soft" tabIndex={-1} aria-hidden>
        <SmartImage
          src={img.src}
          alt=""
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]"
        />
      </Link>
      <h3 className="mt-5 font-serif text-[1.9rem] font-light leading-none tracking-[-0.03em]">
        <TM>{product.shortName}</TM>
      </h3>
      <p className="mt-2 text-[0.98rem] font-medium text-charcoal/85">{copy.tagline}</p>
      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/65">{copy.body}</p>
      <p className={gift ? 'mt-3 text-sm font-semibold text-mocha' : 'mt-3 text-sm font-semibold'}>{price}</p>
      <div className="mt-5">
        {gift ? (
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-charcoal/70 underline decoration-charcoal/25 underline-offset-[6px] transition-colors hover:text-charcoal"
          >
            {copy.cta}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        ) : (
          <Button href={href} variant="secondary" size="md" className="w-full sm:w-auto">
            <span>
              <TM>{copy.cta}</TM>
            </span>
          </Button>
        )}
      </div>
    </Reveal>
  );
}
