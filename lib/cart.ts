import { products, NEST, NEST_SAVING, NEST_NUV_SIZE, NEST_NOOK_SIZE, priceFor, defaultSelections, type ProductSlug } from '@/data/products';
import { formatPrice } from './format';

/**
 * Pure cart logic. No React in here, so it can later be reused
 * server-side (e.g. to validate a cart before creating a Square order).
 */

export type CartLine = {
  /** slug + selections; identical items merge into one line */
  key: string;
  slug: ProductSlug;
  selections: Record<string, string>;
  quantity: number;
};

export type CartState = {
  lines: CartLine[];
};

export type CartAction =
  | { type: 'add'; slug: ProductSlug; selections: Record<string, string>; quantity?: number }
  | { type: 'setQuantity'; key: string; quantity: number }
  | { type: 'remove'; key: string }
  | { type: 'upgradeToNest' }
  | { type: 'hydrate'; state: CartState }
  | { type: 'clear' };

export const MAX_QTY = 10;

export function lineKey(slug: ProductSlug, selections: Record<string, string>): string {
  const parts = Object.keys(selections)
    .sort()
    .map((k) => `${k}=${selections[k]}`);
  return [slug, ...parts].join('|');
}

function addLine(lines: CartLine[], slug: ProductSlug, selections: Record<string, string>, qty: number): CartLine[] {
  const key = lineKey(slug, selections);
  const existing = lines.find((l) => l.key === key);
  if (existing) {
    return lines.map((l) => (l.key === key ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + qty) } : l));
  }
  return [...lines, { key, slug, selections, quantity: Math.min(MAX_QTY, qty) }];
}

function decrementFirst(lines: CartLine[], slug: ProductSlug): { lines: CartLine[]; taken?: CartLine } {
  const idx = lines.findIndex((l) => l.slug === slug);
  if (idx === -1) return { lines };
  const taken = lines[idx];
  const next = taken.quantity > 1
    ? lines.map((l, i) => (i === idx ? { ...l, quantity: l.quantity - 1 } : l))
    : lines.filter((_, i) => i !== idx);
  return { lines: next, taken };
}

/**
 * Turn a Nuv™ and/or Nook™ in the cart into one Nest™.
 * Colours the customer already chose are carried over.
 */
function upgradeToNest(lines: CartLine[]): CartLine[] {
  const nuv = decrementFirst(lines, 'nolla-nuv');
  const nook = decrementFirst(nuv.lines, 'nolla-nook');
  if (!nuv.taken && !nook.taken) return lines;

  // Carry over the colours the customer already chose (the Nest uses the largest sizes)
  const selections = defaultSelections(NEST);
  if (nuv.taken?.selections.colour) selections['nuv-colour'] = nuv.taken.selections.colour;
  if (nook.taken?.selections.colour) selections['nook-colour'] = nook.taken.selections.colour;

  return addLine(nook.lines, 'nolla-nest', selections, 1);
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add':
      return { lines: addLine(state.lines, action.slug, action.selections, action.quantity ?? 1) };
    case 'setQuantity':
      if (action.quantity <= 0) return { lines: state.lines.filter((l) => l.key !== action.key) };
      return {
        lines: state.lines.map((l) =>
          l.key === action.key ? { ...l, quantity: Math.min(MAX_QTY, action.quantity) } : l,
        ),
      };
    case 'remove':
      return { lines: state.lines.filter((l) => l.key !== action.key) };
    case 'upgradeToNest':
      return { lines: upgradeToNest(state.lines) };
    case 'hydrate':
      return action.state;
    case 'clear':
      return { lines: [] };
    default:
      return state;
  }
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

/** Unit price of a cart line, based on its selections (size can change the price). */
export function linePrice(line: CartLine): number {
  return priceFor(products[line.slug], line.selections).price;
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + linePrice(l) * l.quantity, 0);
}

export type BundleSuggestion =
  | { kind: 'add-nook'; title: string; body: string; action: string }
  | { kind: 'add-nuv'; title: string; body: string; action: string }
  | { kind: 'combine'; title: string; body: string; action: string };

/** Which Nest™ nudge (if any) to show for the current cart. */
export function bundleSuggestion(lines: CartLine[]): BundleSuggestion | null {
  const nuvLine = lines.find((l) => l.slug === 'nolla-nuv');
  const nookLine = lines.find((l) => l.slug === 'nolla-nook');
  const sizes = `${NEST_NUV_SIZE.label} Nuv™ + ${NEST_NOOK_SIZE.label} Nook™`;

  if (nuvLine && nookLine) {
    const separately = linePrice(nuvLine) + linePrice(nookLine);
    const body =
      separately > NEST.price
        ? `Switch your Nuv™ and Nook™ to the Nolla Nest™ and save ${formatPrice(separately - NEST.price)}.`
        : `Upgrade to our largest sizes (${sizes}) as the Nest™ for ${formatPrice(NEST.price)}.`;
    return { kind: 'combine', title: 'Make it a Nest™', body, action: 'Switch to the Nest™' };
  }
  if (nuvLine) {
    return {
      kind: 'add-nook',
      title: 'Complete your Nolla Nest™',
      body: `Add the Nook™ and get the Nest™ (${sizes}) for ${formatPrice(NEST.price)}. Save ${formatPrice(NEST_SAVING)}.`,
      action: 'Add the Nook™',
    };
  }
  if (nookLine) {
    return {
      kind: 'add-nuv',
      title: 'Complete your Nolla Nest™',
      body: `Add the Nuv™ and get the Nest™ (${sizes}) for ${formatPrice(NEST.price)}. Save ${formatPrice(NEST_SAVING)}.`,
      action: 'Add the Nuv™',
    };
  }
  return null;
}

export const BUNDLE_SAVING = NEST_SAVING;
