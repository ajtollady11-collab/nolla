/**
 * ─────────────────────────────────────────────────────────────
 *  IMAGE REGISTRY
 *  Every image on the site is referenced from here.
 *  The current files are PLACEHOLDERS (public/images/placeholders).
 *  To add real photos: put them in /public/images and change the
 *  paths below. No component needs to change.
 * ─────────────────────────────────────────────────────────────
 */

export type ImageAsset = {
  src: string;
  alt: string;
};

const ph = (name: string) => `/images/placeholders/${name}.svg`;

const NEST_SET: ImageAsset = { src: ph('nest'), alt: 'The Nolla Nest: the Nuv faux-fur blanket and the Nook hooded blanket together.' };
const NIMBUS: ImageAsset = { src: ph('nimbus'), alt: 'The Nimbus cloud pillow, free with every order.' };

export const IMAGES = {
  /** Home hero */
  hero: NEST_SET,
  /** "Or get the whole setup." block */
  nestFeature: NEST_SET,
  /** Bundle photos; the chosen Nuv™ and Nook™ colour photos are slotted in after the first */
  nest: [NEST_SET],
  /** Nuv™ photos shown for every colour (after the colour's own photo). Add lifestyle shots here. */
  nuv: [] as ImageAsset[],
  /** Nook™ photos shown for every colour. Add lifestyle shots here. */
  nook: [] as ImageAsset[],
  nimbus: [NIMBUS],
} satisfies Record<string, ImageAsset | ImageAsset[]>;

/** Nuv™ photo per colour, keyed by the colour's `value` in data/products.ts */
export const NUV_COLOUR_IMAGES: Record<string, ImageAsset> = {
  'tosca-white': { src: ph('nuv-tosca-white'), alt: 'The Nolla Nuv blanket in Tosca White.' },
  grey: { src: ph('nuv-grey'), alt: 'The Nolla Nuv blanket in Grey.' },
  charcoal: { src: ph('nuv-charcoal'), alt: 'The Nolla Nuv blanket in Charcoal.' },
  coffee: { src: ph('nuv-coffee'), alt: 'The Nolla Nuv blanket in Coffee.' },
  sage: { src: ph('nuv-sage'), alt: 'The Nolla Nuv blanket in Sage.' },
  pink: { src: ph('nuv-pink'), alt: 'The Nolla Nuv blanket in Pink.' },
};

/** Nook™ photo per colour */
export const NOOK_COLOUR_IMAGES: Record<string, ImageAsset> = {
  'light-grey': { src: ph('nook-light-grey'), alt: 'The Nolla Nook hooded blanket in Light Grey.' },
  navy: { src: ph('nook-navy'), alt: 'The Nolla Nook hooded blanket in Navy.' },
  pink: { src: ph('nook-pink'), alt: 'The Nolla Nook hooded blanket in Pink.' },
};
