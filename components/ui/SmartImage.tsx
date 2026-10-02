import Image, { type ImageProps } from 'next/image';

/**
 * Thin wrapper around next/image.
 * Placeholder SVGs skip optimisation; real photography (jpg/webp) is optimised.
 */
export function SmartImage(props: ImageProps) {
  const src = typeof props.src === 'string' ? props.src : '';
  return <Image {...props} alt={props.alt} unoptimized={props.unoptimized ?? src.endsWith('.svg')} />;
}
