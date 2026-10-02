/**
 * Site-wide settings. Edit these values rather than hunting through components.
 */
export const site = {
  name: 'nolla',
  tagline: 'make staying in feel better.',
  description: 'Nolla makes the Nest: a beanbag and blanket set for switching off at home.',
  url: 'https://nolla.co.uk', // PLACEHOLDER: set to the live domain

  /**
   * Logo. Leave `logoSrc` as null to use the text wordmark placeholder.
   * When the real asset arrives, put it in /public/brand and set e.g. '/brand/nolla-logo.svg'.
   */
  logo: {
    src: null as string | null,
    width: 120,
    height: 40,
  },

  currency: 'GBP',
  locale: 'en-GB',
};

/**
 * ─────────────────────────────────────────────────────────────
 *  SOCIAL PROOF: single source of truth
 *  These are deliberately empty until there is real data behind them.
 *  • customerCount: e.g. '2,400' → renders "Loved by 2,400 people".
 *    While null, the badge reads "Loved by Nolla customers".
 *  • Later this can be fed from Supabase (orders/customers count).
 * ─────────────────────────────────────────────────────────────
 */
export const socialProof = {
  customerCount: null as string | null,
  /** Displayed star rating (out of 5). Replace with the real average once reviews exist. */
  rating: 5,
};

export const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'FAQ', href: '/faq' },
];

export const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop', href: '/shop' },
      { label: 'Nolla Nest', href: '/products/nolla-nest' },
      { label: 'Nolla Nuv', href: '/products/nolla-nuv' },
      { label: 'Nolla Nook', href: '/products/nolla-nook' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

/** PLACEHOLDER handles: replace with the real accounts. */
export const socials = [
  { name: 'TikTok', href: 'https://www.tiktok.com/', icon: 'tiktok' },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Pinterest', href: 'https://www.pinterest.com/', icon: 'pinterest' },
] as const;

/**
 * Show struck-through "was" prices on individual products.
 * UK pricing rules: a "was" price should be one you genuinely charged
 * for a meaningful period. Set to false to hide them everywhere
 * (the Nest™ bundle saving is a real comparison and always shows).
 */
export const showCompareAtPrices = true;

/** Free gift promotion: wording used across the site */
export const giftPromo = {
  bar: 'Free Nimbus™ cloud pillow with every order',
  short: 'Free Nimbus™ cloud pillow',
  long: 'Every order comes with a free Nimbus™ cloud pillow. No code needed, it’s added automatically.',
};

/**
 * ─────────────────────────────────────────────────────────────
 *  DELIVERY
 *  UK: free standard only.
 *  Everywhere else: standard or express insured.
 *  UK estimate is based on CJ's figures (1–4 days processing + 4–7 days delivery).
 * ─────────────────────────────────────────────────────────────
 */
export type ShippingRegion = 'uk' | 'international';
export type ShippingMethodId = 'uk-free' | 'intl-standard' | 'intl-express';

export type ShippingMethod = { id: ShippingMethodId; label: string; price: number; estimate: string };

export const shippingRegions: Record<ShippingRegion, { id: ShippingRegion; label: string; methods: ShippingMethod[] }> = {
  uk: {
    id: 'uk',
    label: 'United Kingdom',
    methods: [{ id: 'uk-free', label: 'Free UK delivery', price: 0, estimate: 'Usually 5–11 working days' }],
  },
  international: {
    id: 'international',
    label: 'Outside the UK',
    methods: [
      // PLACEHOLDER: confirm international delivery times with the supplier
      { id: 'intl-standard', label: 'Standard delivery', price: 671, estimate: 'Tracked' },
      { id: 'intl-express', label: 'Express insured shipping', price: 1113, estimate: 'Faster, tracked and insured' },
    ],
  },
};

export const INTERNATIONAL_FROM = shippingRegions.international.methods[0].price;
