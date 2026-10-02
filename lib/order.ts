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
