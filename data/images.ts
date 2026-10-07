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
 * ─────────────────────────────────────────────────────────────
 *  NUV™ COLOURWAYS: the two hero photos for each colour
 *  lifestyle = the family-on-the-sofa photo, texture = the close-up.
 *  Keyed by the colour's `value` in data/products.ts. Swap files here.
 * ─────────────────────────────────────────────────────────────
 */
const NUV_LABELS: Record<string, string> = {
  'tosca-white': 'Tosca White',
  grey: 'Grey',
  charcoal: 'Charcoal',
  coffee: 'Coffee',
  sage: 'Sage',
  pink: 'Pink',
};

export const NUV_COLOURWAYS: Record<string, { lifestyle: ImageAsset; texture: ImageAsset }> = Object.fromEntries(
  Object.entries(NUV_LABELS).map(([value, label]) => [
    value,
    {
      lifestyle: { src: `/images/nuv/nuv-${value}-family.webp`, alt: `A family laughing together on the sofa under the ${label} Nolla Nuv blanket.` },
      texture: { src: `/images/nuv/nuv-${value}-texture.webp`, alt: `Close-up of the thick, rippled faux fur of the ${label} Nolla Nuv blanket.` },
    },
  ]),
);

/**
 * Full Nuv™ gallery per colour: lifestyle → texture → the other photos of that colour.
 * The first photo is the main one (cards, cart, first slide).
 */
const withColourway = (value: string, rest: ImageAsset[]): ImageAsset[] => [NUV_COLOURWAYS[value].lifestyle, NUV_COLOURWAYS[value].texture, ...rest];

export const NUV_COLOUR_IMAGES: Record<string, ImageAsset[]> = {
  'tosca-white': withColourway(
    'tosca-white',
    nuv('tosca-white', 'Tosca White', [
      ['draped', 'draped over an armchair'],
      ['wrapped', 'wrapped around someone in an armchair'],
      ['snuggled', 'with someone snuggled up inside it'],
      ['bed', 'thrown over a bed'],
    ]),
  ),
  grey: withColourway('grey', nuv('grey', 'Grey', NUV_SCENES)),
  charcoal: withColourway('charcoal', nuv('charcoal', 'Charcoal', NUV_SCENES)),
  coffee: withColourway('coffee', nuv('coffee', 'Coffee', NUV_SCENES)),
  sage: withColourway('sage', nuv('sage', 'Sage', NUV_SCENES)),
  pink: withColourway('pink', nuv('pink', 'Pink', NUV_SCENES)),
};

/** Nook™ photos per colour */
export const NOOK_COLOUR_IMAGES: Record<string, ImageAsset[]> = {
  'light-grey': nook('light-grey', 'Light Grey'),
  navy: nook('navy', 'Navy'),
  pink: nook('pink', 'Pink'),
};

const NIMBUS: ImageAsset = {
  src: '/images/nimbus/nimbus-cloud-pillow.webp',
  alt: 'The Nimbus cloud pillow: a fluffy white cloud with a little smile and two dangling legs, sitting on a wooden bench.',
};

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
