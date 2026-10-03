import { IMAGES, NUV_COLOUR_IMAGES, NOOK_COLOUR_IMAGES, type ImageAsset } from './images';
import { showCompareAtPrices } from './site';

/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCT CATALOGUE
 *  The single source of product truth for the frontend.
 *
 *  Prices are stored in pence (integers) to avoid float rounding —
 *  the same convention Square uses (`amount` in the smallest unit).
 *
 *  Future integration: `externalIds.square` will hold the Square
 *  catalog object ID, and each option value can carry its Square
 *  variation ID. Supabase can then override stock/price at runtime
 *  without any component changes.
 * ─────────────────────────────────────────────────────────────
 */

export type ProductSlug = 'nolla-nest' | 'nolla-nuv' | 'nolla-nook' | 'nolla-nimbus';

export type OptionValue = {
  value: string;
  label: string;
  /** Hex colour for swatch-style options */
  swatch?: string;
  /** Small helper text shown next to the label */
  note?: string;
  /** Price in pence when this value sets the price (see Product.priceOptionId) */
  price?: number;
  compareAtPrice?: number;
  /** Photos shown in the gallery when this value is selected (first = main photo) */
  images?: ImageAsset[];
  /** Future: Square variation ID */
  externalId?: string;
  available?: boolean;
};

export type ProductOption = {
  id: string;
  name: string;
  display: 'swatch' | 'pill';
  values: OptionValue[];
  /** Pre-selected value; defaults to the first */
  defaultValue?: string;
};

export type ProductDetail = {
  title: string;
  body: string;
};

export type Product = {
  slug: ProductSlug;
  /** Display name, including trademark */
  name: string;
  /** Short name used in compact UI (cart upsells, chips) */
  shortName: string;
  /** What it is, in two words: "The blanket." */
  kind: string;
  subtitle: string;
  positioning: string;
  /** Default ("hero") price in pence: the price shown before any option is picked */
  price: number;
  compareAtPrice?: number;
  /** If set, the chosen value of this option decides the price */
  priceOptionId?: string;
  shortDescription: string;
  images: ImageAsset[];
  options: ProductOption[];
  highlights: string[];
  details: ProductDetail[];
  /** Label for the primary button on this product's page */
  primaryCta: string;
  isBundle: boolean;
  /** Free gift: added to every order automatically, never sold on its own */
  isGift?: boolean;
  includes?: ProductSlug[];
  externalIds?: { square?: string };
};

/* ─────────────────────────────────────────────────────────────
 *  SUPPLIER VARIANTS (CJdropshipping)
 *  Nuv™:    "Rex Rabbit Velvet Blanket" (CJZW217296206FU), 6 colours, 6 sizes
 *  Nook™:   "Winter Blanket Flannel Hooded Pajamas" (CJJT165317703CX), 3 colours, 3 lengths
 *  Nimbus™: "Plush cloud pillow" (CJJJJFZT00537-White-25cm), free gift
 * ───────────────────────────────────────────────────────────── */

/**
 * Reference ("was") prices are this much above the selling price.
 * Toggle them off site-wide with `showCompareAtPrices` in data/site.ts.
 */
const COMPARE_AT_UPLIFT = 2000;

const nuvColours: OptionValue[] = [
  { value: 'tosca-white', label: 'Tosca White', swatch: '#EFE8DD' },
  { value: 'grey', label: 'Grey', swatch: '#A8A7A3' },
  { value: 'charcoal', label: 'Charcoal', swatch: '#46484A' },
  { value: 'coffee', label: 'Coffee', swatch: '#C4A485' },
  { value: 'sage', label: 'Sage', swatch: '#BCC8AA' },
  { value: 'pink', label: 'Pink', swatch: '#D9AFA9' },
].map((c) => ({ ...c, images: NUV_COLOUR_IMAGES[c.value] }));

const nookColours: OptionValue[] = [
  { value: 'light-grey', label: 'Light Grey', swatch: '#5F5D5C' },
  { value: 'navy', label: 'Navy', swatch: '#27304A' },
  { value: 'pink', label: 'Pink', swatch: '#DDB1AE' },
].map((c) => ({ ...c, images: NOOK_COLOUR_IMAGES[c.value] }));

/** One row per size. Edit prices here. */
const nuvSizes: OptionValue[] = [
  { value: '100x150', label: '100 × 150 cm', price: 3999 },
  { value: '130x160', label: '130 × 160 cm', price: 4499 },
  { value: '120x200', label: '120 × 200 cm', price: 4999 },
  { value: '150x200', label: '150 × 200 cm', price: 5499 },
  { value: '180x200', label: '180 × 200 cm', price: 6499 },
  { value: '200x230', label: '200 × 230 cm', price: 7499 },
].map((s) => ({ ...s, compareAtPrice: s.price + COMPARE_AT_UPLIFT }));

const nookSizes: OptionValue[] = [
  { value: '120', label: '120 cm', price: 2999 },
  { value: '150', label: '150 cm', price: 4299 },
  { value: '180', label: '180 cm', price: 4999 },
].map((s) => ({ ...s, compareAtPrice: s.price + COMPARE_AT_UPLIFT }));

/** The Nest™ always contains the largest size of each piece. */
const NEST_NUV_SIZE = nuvSizes[nuvSizes.length - 1];
const NEST_NOOK_SIZE = nookSizes[nookSizes.length - 1];
const NEST_PRICE = 10999;
/** What the same two pieces cost bought separately (their real selling prices) */
const NEST_SEPARATE_PRICE = NEST_NUV_SIZE.price! + NEST_NOOK_SIZE.price!;

export const products: Record<ProductSlug, Product> = {
  'nolla-nest': {
    slug: 'nolla-nest',
    name: 'Nolla Nest™',
    shortName: 'Nest™',
    kind: 'The bundle.',
    subtitle: 'Nuv™ Blanket + Nook™ Hooded Blanket',
    positioning: 'Your new favourite place.',
    price: NEST_PRICE,
    compareAtPrice: NEST_SEPARATE_PRICE,
    shortDescription: `Everything you need to switch off: our largest Nuv™ faux-fur blanket (${NEST_NUV_SIZE.label}) and our largest Nook™ hooded blanket (${NEST_NOOK_SIZE.label}), in the colours you choose.`,
    images: IMAGES.nest,
    options: [
      { id: 'nuv-colour', name: 'Nuv™ colour', display: 'swatch', values: nuvColours },
      { id: 'nook-colour', name: 'Nook™ colour', display: 'swatch', values: nookColours },
    ],
    highlights: [
      `Nuv™ blanket, ${NEST_NUV_SIZE.label}`,
      `Nook™ hooded blanket, ${NEST_NOOK_SIZE.label}`,
      'Free Nimbus™ cloud pillow',
    ],
    details: [
      {
        title: 'What you get',
        body: `One Nolla Nuv™ blanket (${NEST_NUV_SIZE.label}) and one Nolla Nook™ hooded blanket (${NEST_NOOK_SIZE.label}), each in the colour you choose. Plus your free Nimbus™ cloud pillow.`,
      },
      {
        title: 'The Nuv™ blanket',
        body: 'Thick faux rabbit fur with a soft, rippled surface. Heavy enough to feel like a hug, about 2.8 kg in this size.',
      },
      {
        title: 'The Nook™ hooded blanket',
        body: 'A wearable flannel blanket with a big, soft hood. Pull it on, sink into the sofa, stay there.',
      },
      {
        title: 'Delivery',
        body: 'Free UK delivery, usually 5–11 working days. Each piece ships separately, so they may arrive on different days.',
      },
    ],
    primaryCta: 'Build your nest',
    isBundle: true,
    includes: ['nolla-nuv', 'nolla-nook'],
  },

  'nolla-nuv': {
    slug: 'nolla-nuv',
    name: 'Nolla Nuv™',
    shortName: 'Nuv™',
    kind: 'The blanket.',
    subtitle: 'The blanket you won’t want to get out of.',
    positioning: 'The blanket you won’t want to get out of.',
    price: 5499,
    compareAtPrice: 5499 + COMPARE_AT_UPLIFT,
    priceOptionId: 'size',
    shortDescription:
      'Thick faux rabbit fur with a soft, rippled surface. Heavy enough to feel like a hug, soft enough that you’ll keep finding reasons to stay under it.',
    images: IMAGES.nuv,
    options: [
      { id: 'colour', name: 'Colour', display: 'swatch', values: nuvColours },
      { id: 'size', name: 'Size', display: 'pill', values: nuvSizes, defaultValue: '150x200' },
    ],
    highlights: ['Thick faux rabbit fur', '6 colours, 6 sizes', 'Free Nimbus™ cloud pillow'],
    details: [
      {
        title: 'Feel',
        body: 'Dense faux rabbit-fur velvet with a soft, rippled surface. Warm and weighty without feeling stiff.',
      },
      {
        title: 'Sizes',
        body: '100 × 150 cm is a sofa throw (about 1.1 kg). 120 × 200 and 130 × 160 cm suit a single bed. 150 × 200 and 180 × 200 cm cover a double. 200 × 230 cm (about 2.8 kg) is big enough to share.',
      },
      // PLACEHOLDER: confirm material and washing instructions with the supplier
      { title: 'Care', body: 'Full care instructions will be confirmed before launch.' },
    ],
    primaryCta: 'Add to cart',
    isBundle: false,
  },

  'nolla-nook': {
    slug: 'nolla-nook',
    name: 'Nolla Nook™',
    shortName: 'Nook™',
    kind: 'The hooded blanket.',
    subtitle: 'Your personal place to switch off.',
    positioning: 'Your personal place to switch off.',
    price: 4299,
    compareAtPrice: 4299 + COMPARE_AT_UPLIFT,
    priceOptionId: 'size',
    shortDescription:
      'A blanket you wear. Soft flannel, a big cosy hood, and enough room to curl up inside. Your own little nook, wherever you are.',
    images: IMAGES.nook,
    options: [
      { id: 'colour', name: 'Colour', display: 'swatch', values: nookColours },
      { id: 'size', name: 'Length', display: 'pill', values: nookSizes, defaultValue: '150' },
    ],
    highlights: ['Soft flannel', 'Big cosy hood', 'Free Nimbus™ cloud pillow'],
    details: [
      {
        title: 'Feel',
        body: 'Soft, warm flannel with a roomy hood. Loose enough to pull your knees up inside.',
      },
      {
        // PLACEHOLDER: add a height guide once confirmed with the supplier
        title: 'Lengths',
        body: 'Comes in 120, 150 and 180 cm lengths. The 180 cm is about 1.2 kg. A height guide will be added before launch.',
      },
      // PLACEHOLDER
      { title: 'Care', body: 'Full care instructions will be confirmed before launch.' },
    ],
    primaryCta: 'Add to cart',
    isBundle: false,
  },

  'nolla-nimbus': {
    slug: 'nolla-nimbus',
    name: 'Nimbus™',
    shortName: 'Nimbus™',
    kind: 'The free gift.',
    subtitle: 'A cloud pillow, free with every order.',
    positioning: 'A little cloud to come home to.',
    price: 0,
    shortDescription: 'A soft, squishy little 25 cm cloud pillow. Added free to every order, no code needed.',
    images: IMAGES.nimbus,
    options: [],
    highlights: [],
    details: [],
    primaryCta: '',
    isBundle: false,
    isGift: true,
  },
};

/** Products that are sold (the gift is excluded: no page, can't be bought). */
export const productList = Object.values(products).filter((p) => !p.isGift);
export const productSlugs = productList.map((p) => p.slug);

export function getProduct(slug: string): Product | undefined {
  return products[slug as ProductSlug];
}

export const NEST = products['nolla-nest'];
export const NUV = products['nolla-nuv'];
export const NOOK = products['nolla-nook'];
export const GIFT = products['nolla-nimbus'];
export { NEST_NUV_SIZE, NEST_NOOK_SIZE };

/** Bundle savings, derived so it can never drift out of sync with prices. */
export const NEST_SAVING = (NEST.compareAtPrice ?? NEST.price) - NEST.price;

/** Default selections: each option's defaultValue, else its first value. */
export function defaultSelections(product: Product): Record<string, string> {
  return Object.fromEntries(product.options.map((o) => [o.id, o.defaultValue ?? o.values[0].value]));
}

/**
 * Gallery for the current selections: the photos of each selected variant
 * (e.g. the chosen colour), then any shared product photos.
 * Bundles show the first photo of each piece up front, then the rest.
 */
export function galleryFor(product: Product, selections: Record<string, string>): ImageAsset[] {
  const sets = product.options
    .map((o) => o.values.find((v) => v.value === selections[o.id])?.images ?? [])
    .filter((imgs) => imgs.length > 0);
  const variantImages = product.isBundle
    ? [...sets.map((imgs) => imgs[0]), ...sets.flatMap((imgs) => imgs.slice(1))]
    : sets.flat();
  const all = [...variantImages, ...product.images];
  return all.length ? all : [IMAGES.hero];
}

/** Where the selected value of an option sits in the gallery (to jump there when it changes). */
export function galleryIndexFor(product: Product, selections: Record<string, string>, optionId: string): number {
  const opt = product.options.find((o) => o.id === optionId);
  const first = opt?.values.find((v) => v.value === selections[optionId])?.images?.[0];
  if (!first) return 0;
  return Math.max(0, galleryFor(product, selections).findIndex((img) => img.src === first.src));
}

/** The main photo for a product in its default state (cards, upsells). */
export function primaryImage(product: Product, selections?: Record<string, string>): ImageAsset {
  return galleryFor(product, selections ?? defaultSelections(product))[0];
}

/** Price (and compare-at price) for a given set of selections. */
export function priceFor(product: Product, selections: Record<string, string>): { price: number; compareAtPrice?: number } {
  let result: { price: number; compareAtPrice?: number } = { price: product.price, compareAtPrice: product.compareAtPrice };
  if (product.priceOptionId) {
    const opt = product.options.find((o) => o.id === product.priceOptionId);
    const v = opt?.values.find((x) => x.value === selections[product.priceOptionId!]);
    if (v?.price !== undefined) result = { price: v.price, compareAtPrice: v.compareAtPrice };
  }
  // The bundle's comparison is the real separate price; individual "was" prices are optional
  if (!product.isBundle && !showCompareAtPrices) result.compareAtPrice = undefined;
  return result;
}

/** Lowest price across all variants: for "from £X" labels. */
export function fromPrice(product: Product): number {
  const opt = product.options.find((o) => o.id === product.priceOptionId);
  const prices = opt?.values.map((v) => v.price).filter((p): p is number => p !== undefined) ?? [];
  return prices.length ? Math.min(...prices) : product.price;
}

/** True if the product's price changes with the options chosen. */
export function hasPriceRange(product: Product): boolean {
  return fromPrice(product) !== product.price;
}

/** "Milk White / 180 × 200 cm" style label for a selection. */
export function describeSelections(product: Product, selections: Record<string, string>): string {
  return product.options
    .map((o) => {
      const label = o.values.find((x) => x.value === selections[o.id])?.label;
      if (!label) return null;
      // Bundles: say which piece each colour belongs to ("Nuv™ Sage")
      return product.isBundle ? `${o.name.replace(' colour', '')} ${label}` : label;
    })
    .filter(Boolean)
    .join(' / ');
}
