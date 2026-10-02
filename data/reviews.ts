import type { ProductSlug } from './products';

/**
 * ─────────────────────────────────────────────────────────────
 *  PLACEHOLDER REVIEWS: for layout only.
 *  These are NOT real customers. Replace this array with real
 *  reviews (e.g. from a Supabase `reviews` table) before launch.
 *  Keep the same shape and every component will keep working.
 * ─────────────────────────────────────────────────────────────
 */

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number; // 1–5
  text: string;
  product?: ProductSlug;
  /** true = sample content for the design preview; shows a small notice in the UI */
  placeholder?: boolean;
};

export const reviews: Review[] = [
  {
    id: 'sample-1',
    name: 'Sophie M.',
    location: 'Manchester, UK',
    rating: 5,
    text: 'I genuinely never want to leave it.',
    product: 'nolla-nest',
    placeholder: true,
  },
  {
    id: 'sample-2',
    name: 'Jess T.',
    location: 'Leeds, UK',
    rating: 5,
    text: 'Film nights are a whole event now.',
    product: 'nolla-nest',
    placeholder: true,
  },
  {
    id: 'sample-3',
    name: 'Amira K.',
    location: 'London, UK',
    rating: 5,
    text: 'The blanket is so thick and soft. Heavier than I expected, in a good way.',
    product: 'nolla-nuv',
    placeholder: true,
  },
  {
    id: 'sample-4',
    name: 'Callum R.',
    location: 'Glasgow, UK',
    rating: 5,
    text: 'Wearing the hoodie blanket as I type this. Not taking it off.',
    product: 'nolla-nook',
    placeholder: true,
  },
  {
    id: 'sample-5',
    name: 'Hannah P.',
    location: 'Bristol, UK',
    rating: 5,
    text: 'The little cloud pillow was such a cute surprise. My daughter stole it.',
    product: 'nolla-nest',
    placeholder: true,
  },
  {
    id: 'sample-6',
    name: 'Ella W.',
    location: 'Cardiff, UK',
    rating: 5,
    text: 'Softest thing I own. No contest.',
    product: 'nolla-nuv',
    placeholder: true,
  },
];

export function reviewsFor(slug?: ProductSlug): Review[] {
  if (!slug) return reviews;
  const matching = reviews.filter((r) => r.product === slug);
  // Fall back to all reviews so the section never looks empty during design.
  return matching.length >= 3 ? matching : reviews;
}
