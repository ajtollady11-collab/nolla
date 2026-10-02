'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import type { ImageAsset } from '@/data/images';
import { cn } from '@/lib/cn';

/**
 * Swipeable gallery: native scroll-snap (feels right on phones, no library),
 * with thumbnails + arrows from md up.
 */
export function ProductGallery({
  images,
  name,
  focusIndex = 0,
}: {
  images: ImageAsset[];
  name: string;
  /** Slide to show when the image set changes (e.g. the picked colour's photo) */
  focusIndex?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
  }, [images.length]);

  // When the photos change (a new colour was picked), glide to that colour's photo
  const signature = images.map((i) => i.src).join('|');
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    goTo(Math.min(focusIndex, images.length - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(track.scrollLeft / track.clientWidth)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-6xl bg-oat-soft shadow-pillow"
          role="region"
          aria-roledescription="carousel"
          aria-label={`${name} images`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') goTo(index + 1);
            if (e.key === 'ArrowLeft') goTo(index - 1);
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative h-full w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <SmartImage
                key={img.src}
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="animate-fade object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dots (mobile) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5 md:hidden" aria-hidden>
          {images.map((_, i) => (
            <span
              key={i}
              className={cn('h-1.5 rounded-full bg-white transition-all duration-500 ease-soft', i === index ? 'w-6 opacity-100' : 'w-1.5 opacity-60')}
            />
          ))}
        </div>

        {/* Arrows (desktop) */}
        <div className="pointer-events-none absolute inset-x-4 top-1/2 hidden -translate-y-1/2 justify-between md:flex">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous image"
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-white/90 opacity-0 shadow-pillow backdrop-blur transition-[opacity,transform] duration-300 ease-soft hover:scale-105 group-hover:opacity-100 disabled:!opacity-0"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Next image"
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-white/90 opacity-0 shadow-pillow backdrop-blur transition-[opacity,transform] duration-300 ease-soft hover:scale-105 group-hover:opacity-100 disabled:!opacity-0"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="hidden gap-3 md:flex">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={cn(
              'relative aspect-square w-20 overflow-hidden rounded-3xl bg-oat-soft transition-[opacity,box-shadow,transform] duration-300 ease-soft hover:-translate-y-0.5',
              i === index ? 'opacity-100 ring-2 ring-charcoal ring-offset-2 ring-offset-cream' : 'opacity-60 hover:opacity-100',
            )}
          >
            <SmartImage src={img.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
