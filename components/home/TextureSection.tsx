import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { textureCopy, textureImages } from '@/data/home';
import type { ImageAsset } from '@/data/images';

/**
 * Tactility: zoomed crops of the real product photos so the fabric fills the frame.
 * Swap in true close-up photography via data/home.ts → textureImages.
 */
export function TextureSection() {
  if (textureImages.length === 0) return null;
  const [main, ...rest] = textureImages;
  return (
    <section className="container-soft py-16 sm:py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <Reveal>
          <h2 className="max-w-[14ch] font-serif text-[2.5rem] font-light leading-[0.98] tracking-[-0.04em] sm:text-display-md">{textureCopy.headline}</h2>
          <p className="mt-5 max-w-[38ch] text-[1.02rem] leading-relaxed text-charcoal/70">{textureCopy.body}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Zoomed item={main} className="col-span-2 aspect-[16/10]" />
          {rest.slice(0, 2).map((r, i) => (
            <Zoomed key={r.image.src} item={r} className="aspect-square" delay={(i + 1) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Zoomed({ item, className, delay = 0 }: { item: { image: ImageAsset; zoom: number; origin: string }; className: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={`relative overflow-hidden rounded-[1.25rem] bg-oat-soft ${className}`}>
      <SmartImage
        src={item.image.src}
        alt={item.image.alt}
        fill
        // Zoomed crops need the full-resolution original to stay sharp
        unoptimized
        className="object-cover"
        style={{ transform: `scale(${item.zoom})`, transformOrigin: item.origin }}
      />
    </Reveal>
  );
}
