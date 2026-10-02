'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { products, type ProductSlug } from '@/data/products';
import { discountCodes } from '@/data/marketing';
import { normaliseCode } from '@/lib/order';
import { shippingRegions, type ShippingMethodId, type ShippingRegion } from '@/data/site';
import {
  bundleSuggestion,
  cartCount,
  cartReducer,
  cartSubtotal,
  lineKey,
  type BundleSuggestion,
  type CartLine,
  type CartState,
} from '@/lib/cart';

/**
 * Client-side cart for Phase 1. Persisted to localStorage so the cart
 * survives a refresh. In Phase 2 this can sync to a Supabase `carts`
 * table (keyed by session) without changing the consuming components.
 */

// Bumped when the catalogue changes so old carts don't carry retired products
const STORAGE_KEY = 'nolla-cart-v2';

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shippingRegion: ShippingRegion;
  setShippingRegion: (region: ShippingRegion) => void;
  shippingMethod: ShippingMethodId;
  setShippingMethod: (id: ShippingMethodId) => void;
  shippingCost: number;
  discountCode: string | null;
  /** Returns false if the code isn't valid */
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  discountAmount: number;
  total: number;
  clear: () => void;
  /** True once the saved cart has been loaded */
  ready: boolean;
  suggestion: BundleSuggestion | null;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: ProductSlug, selections: Record<string, string>, opts?: { quantity?: number; openCart?: boolean }) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  upgradeToNest: () => void;
  /** Key of the most recently added line, used for a gentle highlight */
  lastAddedKey: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] } satisfies CartState);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [shippingRegion, setRegionState] = useState<ShippingRegion>('uk');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>('uk-free');
  const setShippingRegion = useCallback((region: ShippingRegion) => {
    setRegionState(region);
    setShippingMethod(shippingRegions[region].methods[0].id);
  }, []);
  const hydrated = useRef(false);
  const [ready, setReady] = useState(false);

  // Load persisted cart once on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (Array.isArray(parsed?.lines)) {
          const lines = parsed.lines.filter((l) => l.slug in products && !products[l.slug].isGift);
          dispatch({ type: 'hydrate', state: { lines } });
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    hydrated.current = true;
    setReady(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [state]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback<CartContextValue['add']>((slug, selections, opts) => {
    dispatch({ type: 'add', slug, selections, quantity: opts?.quantity });
    setLastAddedKey(lineKey(slug, selections));
    if (opts?.openCart !== false) setIsOpen(true);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => dispatch({ type: 'setQuantity', key, quantity }), []);
  const remove = useCallback((key: string) => dispatch({ type: 'remove', key }), []);
  const upgradeToNest = useCallback(() => {
    dispatch({ type: 'upgradeToNest' });
    setLastAddedKey(null);
  }, []);

  const subtotal = cartSubtotal(state.lines);
  const method = shippingRegions[shippingRegion].methods.find((m) => m.id === shippingMethod) ?? shippingRegions[shippingRegion].methods[0];
  const shippingCost = state.lines.length ? method.price : 0;
  const discountAmount = discountCode ? Math.round((subtotal * discountCodes[discountCode].percent) / 100) : 0;

  const applyDiscountCode = useCallback((code: string) => {
    const valid = normaliseCode(code);
    if (valid) setDiscountCode(valid);
    return Boolean(valid);
  }, []);
  const removeDiscountCode = useCallback(() => setDiscountCode(null), []);
  const clear = useCallback(() => {
    dispatch({ type: 'clear' });
    setDiscountCode(null);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      count: cartCount(state.lines),
      subtotal,
      shippingRegion,
      setShippingRegion,
      shippingMethod: method.id,
      setShippingMethod,
      shippingCost,
      discountCode,
      applyDiscountCode,
      removeDiscountCode,
      discountAmount,
      total: subtotal - discountAmount + shippingCost,
      clear,
      ready,
      suggestion: bundleSuggestion(state.lines),
      isOpen,
      open,
      close,
      add,
      setQuantity,
      remove,
      upgradeToNest,
      lastAddedKey,
    }),
    [state.lines, subtotal, discountCode, discountAmount, applyDiscountCode, removeDiscountCode, clear, ready, shippingRegion, setShippingRegion, method.id, shippingCost, isOpen, open, close, add, setQuantity, remove, upgradeToNest, lastAddedKey],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
