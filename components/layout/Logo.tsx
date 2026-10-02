import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

/**
 * The nolla wordmark.
 * Placeholder: set in the soft serif. When the real asset is ready,
 * set `site.logo.src` in data/site.ts and this renders the image instead.
 */
export function Logo({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  const text = size === 'lg' ? 'text-[3.25rem] sm:text-[4rem]' : 'text-[1.9rem]';
  return (
    <Link href="/" aria-label="nolla home" className={cn('inline-flex items-center leading-none text-charcoal', className)}>
      {site.logo.src ? (
        <Image src={site.logo.src} alt="nolla" width={site.logo.width} height={site.logo.height} priority />
      ) : (
        <span className={cn('font-serif font-normal lowercase tracking-[-0.045em]', text)} style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 72" }}>
          nolla
        </span>
      )}
    </Link>
  );
}
