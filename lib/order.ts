import { countries, UK_CODE } from '@/data/countries';
import { products, priceFor, describeSelections, GIFT, type ProductSlug } from '@/data/products';
import { shippingRegions, type ShippingMethodId } from '@/data/site';
import { discountCodes } from '@/data/marketing';
import { MAX_QTY } from './cart';

/**
 * Builds a priced order from cart lines, using ONLY the prices in
 * data/products.ts. Used by the cart (to display totals) and by the
 * checkout API (to charge), so what customers see is what Square charges.
 * Anything sent from the browser is treated as untrusted and validated here.
 */

export type OrderInputLine = { slug: string; selections: Record<string, string>; quantity: number };

export type PricedLine = {
  slug: ProductSlug;
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  isGift?: boolean;
};

export type PricedOrder = {
  lines: PricedLine[];
  subtotal: number;
  discount: { code: string; percent: number; amount: number } | null;
  shipping: { id: ShippingMethodId; label: string; price: number };
  total: number;
};

export type OrderResult = { ok: true; order: PricedOrder } | { ok: false; error: string };

export function normaliseCode(code: string | null | undefined): string | null {
  const c = (code ?? '').trim().toUpperCase();
  return c && discountCodes[c] ? c : null;
}

function findShipping(id: string) {
  for (const region of Object.values(shippingRegions)) {
    const m = region.methods.find((x) => x.id === id);
    if (m) return m;
  }
  return null;
}

export function priceOrder(inputLines: OrderInputLine[], shippingId: string, code?: string | null): OrderResult {
  if (!Array.isArray(inputLines) || inputLines.length === 0) return { ok: false, error: 'Your cart is empty.' };
  if (inputLines.length > 20) return { ok: false, error: 'Too many items in the cart.' };

  const lines: PricedLine[] = [];
  for (const l of inputLines) {
    const product = products[l?.slug as ProductSlug];
    if (!product || product.isGift) return { ok: false, error: 'An item in your cart is no longer available.' };
    const qty = Number(l.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return { ok: false, error: 'Invalid quantity.' };
    const selections: Record<string, string> = {};
    for (const option of product.options) {
      const value = l.selections?.[option.id];
      if (!option.values.some((v) => v.value === value)) {
        return { ok: false, error: `Please choose a ${option.name.toLowerCase()} for the ${product.name}.` };
      }
      selections[option.id] = value;
    }
    lines.push({
      slug: product.slug,
      name: product.name,
      variant: describeSelections(product, selections),
      quantity: qty,
      unitPrice: priceFor(product, selections).price,
    });
  }

  const shippingMethod = findShipping(shippingId);
  if (!shippingMethod) return { ok: false, error: 'Please choose a delivery option.' };

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const validCode = normaliseCode(code);
  const discount = validCode
    ? { code: validCode, percent: discountCodes[validCode].percent, amount: Math.round((subtotal * discountCodes[validCode].percent) / 100) }
    : null;

  // The free gift rides along on every order
  lines.push({ slug: GIFT.slug, name: `FREE GIFT: ${GIFT.name} cloud pillow`, variant: 'White, 50 cm', quantity: 1, unitPrice: 0, isGift: true });

  return {
    ok: true,
    order: {
      lines,
      subtotal,
      discount,
      shipping: { id: shippingMethod.id, label: shippingMethod.label, price: shippingMethod.price },
      total: subtotal - (discount?.amount ?? 0) + shippingMethod.price,
    },
  };
}

/* ───────────────────────── Delivery details ───────────────────────── */


export type DeliveryDetails = {
  email: string;
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  region?: string;
  postcode: string;
  country: string;
};

export type DeliveryResult = { ok: true; delivery: DeliveryDetails } | { ok: false; error: string; field?: keyof DeliveryDetails };

const clip = (v: unknown, max = 120) => String(v ?? '').trim().slice(0, max);

/** Validates delivery details and that the delivery option matches the country. */
export function validateDelivery(input: Partial<DeliveryDetails> | undefined, shippingId: string): DeliveryResult {
  const d: DeliveryDetails = {
    email: clip(input?.email, 160).toLowerCase(),
    name: clip(input?.name),
    phone: clip(input?.phone, 40),
    address1: clip(input?.address1),
    address2: clip(input?.address2),
    city: clip(input?.city, 80),
    region: clip(input?.region, 80),
    postcode: clip(input?.postcode, 20).toUpperCase(),
    country: clip(input?.country, 2).toUpperCase(),
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) return { ok: false, error: 'Please enter a valid email address.', field: 'email' };
  if (d.name.length < 2) return { ok: false, error: 'Please enter your full name.', field: 'name' };
  if (d.phone.replace(/\D/g, '').length < 7) return { ok: false, error: 'Please enter a phone number for the courier.', field: 'phone' };
  if (!countries.some((c) => c.code === d.country)) return { ok: false, error: 'Please choose your country.', field: 'country' };
  if (d.address1.length < 3) return { ok: false, error: 'Please enter your address.', field: 'address1' };
  if (d.city.length < 2) return { ok: false, error: 'Please enter your town or city.', field: 'city' };
  if (d.postcode.length < 2) return { ok: false, error: 'Please enter your postcode.', field: 'postcode' };

  const isUK = d.country === UK_CODE;
  if (isUK && shippingId !== 'uk-free') return { ok: false, error: 'Please choose a UK delivery option.' };
  if (!isUK && !shippingId.startsWith('intl-')) return { ok: false, error: 'Please choose an international delivery option.' };
  return { ok: true, delivery: d };
}
