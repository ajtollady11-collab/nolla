import { Button } from '@/components/ui/Button';
import { CloudShape } from '@/components/ui/CloudShape';
import { Reveal } from '@/components/ui/Reveal';
import { NEST } from '@/data/products';

export function FinalCTA({
  heading = 'Stay in. Switch off.',
  subheading = 'Your new favourite place is waiting.',
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="px-3 py-10 sm:px-5 sm:py-16">
      <Reveal className="relative mx-auto max-w-[1320px] overflow-hidden rounded-6xl bg-oat px-6 py-24 text-center sm:py-32">
        <CloudShape
          variant="a"
          color="#F7F3EC"
          blur={48}
          className="absolute left-1/2 top-1/2 h-[110%] w-[min(100%,820px)] -translate-x-1/2 -translate-y-1/2 opacity-80"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-[12ch] text-balance font-serif text-[3rem] font-light leading-[0.95] tracking-[-0.045em] sm:text-display-lg lg:text-display-xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[34ch] text-lg text-charcoal/70">{subheading}</p>
          <Button href={`/products/${NEST.slug}`} size="lg" className="mt-9 px-12">
            Build your nest
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
