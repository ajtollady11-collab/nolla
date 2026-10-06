import type { ImageAsset } from './images';

/**
 * ─────────────────────────────────────────────────────────────
 *  HOMEPAGE CONTENT
 *  All homepage copy and section imagery lives here.
 *  Prices are NOT written here: they come from data/products.ts.
 * ─────────────────────────────────────────────────────────────
 */

export const homeImages = {
  /** Approved hero (16:9). focus = where to keep in frame when cropped on phones */
  /**
   * Approved full-screen hero. The woman + blanket sit on the RIGHT; the wall on the
   * LEFT is left clear for copy. focusDesktop/focusMobile control the crop.
   */
  hero: {
    src: '/images/home/hero-nuv-faux-fur-2k.webp',
    alt: 'A woman wrapped in the cream Nolla Nuv blanket, smiling softly in an armchair by a sunny window.',
    width: 2752,
    height: 1536,
    focusDesktop: '72% 50%',
    focusMobile: '100% 50%',
  },
  /** Approved Nolla Nest image */
  nest: {
    src: '/images/home/nest-set.webp',
    alt: 'The cream Nolla Nuv blanket and the charcoal Nolla Nook hooded blanket together on a boucle armchair.',
    width: 1122,
    height: 1402,
  },
};

export const heroCopy = {
  eyebrow: 'Comfort, reimagined.',
  headline: 'Make staying in feel better.',
  body: 'Soft, oversized comfort made for slow mornings, movie nights and everything in between.',
  primaryCta: 'Shop Nolla',
  secondaryCta: 'Explore Nest™',
};

export const trustItems = [
  { icon: 'truck', label: 'Free UK delivery' },
  { icon: 'returns', label: '14-day returns' },
  { icon: 'lock', label: 'Secure checkout' },
  { icon: 'gift', label: 'Free Nimbus™ with every order' },
] as const;

export const nestCopy = {
  eyebrow: 'The signature set',
  headline: 'Meet the Nolla Nest™',
  body: 'Everything you need to make staying in feel better. Our biggest blanket, our biggest hooded blanket and a little cloud to rest your head on, together for less.',
  cta: 'Shop the Nest',
};

/** "Staying in isn't doing nothing": the moments Nolla is for */
export const lifestyleCopy = {
  eyebrow: 'Made for staying in',
  headline: 'Staying in isn’t doing nothing.',
  body: 'It’s the bit of the day that’s just yours.',
};

export const moments: { label: string; image: ImageAsset; focus?: string }[] = [
  { label: 'Slow mornings', image: { src: '/images/nuv/nuv-tosca-white-bed.webp', alt: 'A cream Nuv blanket thrown over a bed in soft morning light.' } },
  { label: 'Movie nights', image: { src: '/images/nook/nook-light-grey-sofa.webp', alt: 'Someone curled up on the sofa in a grey Nook hooded blanket.' }, focus: '50% 30%' },
  { label: 'A good book', image: { src: '/images/nuv/nuv-coffee-wrapped.webp', alt: 'Someone smiling, wrapped in a coffee-coloured Nuv blanket in an armchair.' }, focus: '50% 35%' },
  { label: 'Gaming till late', image: { src: '/images/nook/nook-navy-sofa.webp', alt: 'Someone relaxing on the sofa in a navy Nook hooded blanket.' }, focus: '50% 30%' },
  { label: 'Sunday resets', image: { src: '/images/nuv/nuv-sage-bed.webp', alt: 'A sage Nuv blanket across a freshly made bed.' } },
  { label: 'Switching off', image: { src: '/images/nuv/nuv-tosca-white-snuggled.webp', alt: 'Someone with eyes closed, snuggled into a cream Nuv blanket.' }, focus: '50% 30%' },
];

/** Why Nolla: benefits only, each one true of the actual products */
export const whyNolla = [
  {
    title: 'Softness you notice',
    body: 'Thick faux rabbit fur on the Nuv™, soft flannel on the Nook™. The kind of soft you keep reaching out to touch.',
  },
  {
    title: 'Oversized on purpose',
    body: 'Blankets up to 200 × 230 cm and a hooded blanket with room to pull your knees up inside.',
  },
  {
    title: 'An everyday escape',
    body: 'Wrap up, pull the hood on, and the rest of the day can wait.',
  },
  {
    title: 'Made for staying in',
    body: 'Sofa, bed, armchair, floor. Made to be used every day, not saved for best.',
  },
];

/** Product line-up taglines (names and prices come from data/products.ts) */
export const lineupCopy = {
  eyebrow: 'The collection',
  headline: 'Pick your kind of cosy.',
  nuv: {
    tagline: 'The blanket you’ll never want to leave.',
    body: 'Thick faux rabbit fur with a soft, rippled surface. Six colours, six sizes.',
    cta: 'Shop Nuv™',
  },
  nook: {
    tagline: 'Your comfort zone, wherever you sit.',
    body: 'A blanket you wear: soft flannel, a big hood and room to curl up inside.',
    cta: 'Shop Nook™',
  },
  nimbus: {
    tagline: 'A little cloud, on us.',
    body: 'A soft 25 cm cloud pillow, included free with every order.',
    cta: 'How the gift works',
  },
};

/**
 * Texture section. These are crops of real product photos, zoomed in on the fabric.
 * Add true close-up photography here later (first item is the large one).
 */
export const textureCopy = {
  headline: 'You can almost feel it through the screen.',
  body: 'Deep, rippled faux fur that holds its shape. Soft flannel that drapes. Made to be touched.',
};

export const textureImages: { image: ImageAsset; zoom: number; origin: string }[] = [
  { image: { src: '/images/nuv/nuv-tosca-white-bed.webp', alt: 'Close-up of the rippled faux-fur texture of the cream Nuv blanket.' }, zoom: 1.6, origin: '35% 68%' },
  { image: { src: '/images/nuv/nuv-charcoal-draped.webp', alt: 'Close-up of the charcoal Nuv blanket’s deep faux-fur folds.' }, zoom: 1.55, origin: '45% 70%' },
  { image: { src: '/images/nook/nook-pink-folded.webp', alt: 'Close-up of the soft flannel of a folded pink Nook.' }, zoom: 1.45, origin: '50% 55%' },
];

/**
 * Real-life / UGC. GENUINE customer or creator content only.
 * The section stays hidden while this list is empty.
 * Example:
 *   { type: 'image', src: '/images/ugc/sophie.webp', alt: '…', credit: '@sophie', href: 'https://www.tiktok.com/@…' }
 */
export type UgcItem = { type: 'image' | 'video'; src: string; alt: string; credit?: string; href?: string; poster?: string };
export const ugcItems: UgcItem[] = [];

export const brandStoryCopy = {
  eyebrow: 'Why Nolla',
  headline: 'Home should be the best part of the day.',
  body: [
    'Most of life happens at home: the slow mornings, the late films, the evenings you finally get to yourself.',
    'Nolla is about making those hours something to look forward to. Things that are soft, generous and made to be lived in.',
  ],
  signoff: 'Make staying in feel better.',
};

/** FAQ questions shown on the homepage (ids from data/faqs.ts), most purchase-blocking first */
export const homeFaqIds = ['delivery', 'returns', 'nuv-material', 'nuv-sizes', 'nook-size', 'whats-included', 'free-gift', 'separate'];

export const finalCtaCopy = {
  headline: 'Make staying in the best part of your day.',
  body: 'Find your new favourite way to switch off.',
  cta: 'Shop Nolla',
  image: { src: '/images/nuv/nuv-sage-wrapped.webp', alt: 'Someone smiling, wrapped up in a sage Nuv blanket in a sunny armchair.' },
};
