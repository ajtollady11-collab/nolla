/**
 * ─────────────────────────────────────────────────────────────
 *  IMAGE REGISTRY
 *  Every image on the site is referenced from here.
 *  Product photos live in /public/images/nuv and /public/images/nook.
 *  To change a photo: replace the file, or change its path below.
 * ─────────────────────────────────────────────────────────────
 */

export type ImageAsset = {
  src: string;
  alt: string;
};

const nuv = (colour: string, label: string, scenes: [string, string][]): ImageAsset[] =>
  scenes.map(([scene, desc]) => ({ src: `/images/nuv/nuv-${colour}-${scene}.webp`, alt: `The Nolla Nuv blanket in ${label}, ${desc}.` }));

const nook = (colour: string, label: string): ImageAsset[] => [
  { src: `/images/nook/nook-${colour}-standing.webp`, alt: `Someone wearing the Nolla Nook hooded blanket in ${label}.` },
  { src: `/images/nook/nook-${colour}-sofa.webp`, alt: `Someone curled up on the sofa in the ${label} Nolla Nook.` },
  { src: `/images/nook/nook-${colour}-folded.webp`, alt: `The ${label} Nolla Nook folded on a wooden bench.` },
];

const NUV_SCENES: [string, string][] = [
  ['draped', 'draped over an armchair'],
  ['wrapped', 'wrapped around someone in an armchair'],
  ['bed', 'thrown over a bed'],
];

/**
 * Nuv™ photos per colour, keyed by the colour's `value` in data/products.ts.
 * The first photo is the main one (cards, cart, first slide).
 */
export const NUV_COLOUR_IMAGES: Record<string, ImageAsset[]> = {
  'tosca-white': nuv('tosca-white', 'Tosca White', [
    ['draped', 'draped over an armchair'],
    ['wrapped', 'wrapped around someone in an armchair'],
    ['snuggled', 'with someone snuggled up inside it'],
    ['bed', 'thrown over a bed'],
  ]),
  grey: nuv('grey', 'Grey', NUV_SCENES),
  charcoal: nuv('charcoal', 'Charcoal', NUV_SCENES),
  coffee: nuv('coffee', 'Coffee', NUV_SCENES),
  sage: nuv('sage', 'Sage', NUV_SCENES),
  pink: nuv('pink', 'Pink', NUV_SCENES),
};

/** Nook™ photos per colour */
export const NOOK_COLOUR_IMAGES: Record<string, ImageAsset[]> = {
  'light-grey': nook('light-grey', 'Light Grey'),
  navy: nook('navy', 'Navy'),
  pink: nook('pink', 'Pink'),
};

const NIMBUS: ImageAsset = { src: '/images/placeholders/nimbus.svg', alt: 'The Nimbus cloud pillow, free with every order.' };

export const IMAGES = {
  /** Home hero */
  hero: { src: '/images/nuv/nuv-tosca-white-wrapped.webp', alt: 'Someone smiling, wrapped up in the Tosca White Nolla Nuv blanket in a sunny armchair.' },
  /** "Or get the whole setup." block */
  nestFeature: { src: '/images/nook/nook-light-grey-sofa.webp', alt: 'Someone curled up on the sofa in the Nolla Nook hooded blanket.' },
  /** Extra photos shown for every colour (after the colour's own photos). Empty: every photo is colour-specific. */
  nest: [] as ImageAsset[],
  nuv: [] as ImageAsset[],
  nook: [] as ImageAsset[],
  nimbus: [NIMBUS],
} satisfies Record<string, ImageAsset | ImageAsset[]>;
