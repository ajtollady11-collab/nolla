'use client';

import { useEffect, useRef } from 'react';

/**
 * A silent, looping clip that only plays while it's on screen.
 * Always muted, no controls, no sound button. Loads nothing until it's near
 * the viewport. For reduced-motion users it stays on its poster frame.
 */
export function SilentVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // belt and braces: some browsers ignore the attribute
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'auto';
          video.play().catch(() => {
            /* autoplay blocked: poster stays visible */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      aria-label={label}
      className="h-full w-full object-cover"
    />
  );
}
