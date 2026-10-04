import type { ProductSlug } from './products';


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

/**
 * REAL customer reviews only. Paste them in like this:
 *   { id: 'r1', name: 'Sophie M.', location: 'Manchester, UK', rating: 5, text: '…', product: 'nolla-nuv' },
 * While this list is empty, the site shows a "Be one of the first" section
 * instead of reviews, and hides the star badges.
 */
export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;

export function reviewsFor(slug?: ProductSlug): Review[] {
  if (!slug) return reviews;
  const matching = reviews.filter((r) => r.product === slug);
  // Fall back to all reviews so the section never looks empty during design.
  return matching.length >= 3 ? matching : reviews;
}
