import 'server-only';
import { randomUUID } from 'node:crypto';
import type { PricedOrder } from './order';

/**
 * Square Checkout API: creates a Square-hosted payment page for an order.
 * SERVER ONLY. Reads secrets from environment variables (set in Vercel):
 *   SQUARE_ACCESS_TOKEN   your access token (Sandbox or Production)
 *   SQUARE_LOCATION_ID    the location that takes the payments
 *   SQUARE_ENVIRONMENT    "sandbox" (testing) or "production" (real money)
 * Optional: SQUARE_API_BASE_URL overrides the API host (used for local testing).
 */

const SQUARE_VERSION = '2024-01-18';

export function squareConfigured(): boolean {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);
}

function apiBase(): string {
  if (process.env.SQUARE_API_BASE_URL) return process.env.SQUARE_API_BASE_URL.replace(/\/$/, '');
  return process.env.SQUARE_ENVIRONMENT === 'production' ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com';
}

const gbp = (amount: number) => ({ amount, currency: 'GBP' });

export function buildPaymentLinkBody(order: PricedOrder, opts: { redirectUrl: string; supportEmail?: string; includeGift?: boolean }) {
  const includeGift = opts.includeGift ?? true;
  const items = order.lines.filter((l) => includeGift || !l.isGift);
  return {
    idempotency_key: randomUUID(),
    order: {
      location_id: process.env.SQUARE_LOCATION_ID,
      line_items: items.map((l) => ({
        // Name includes the variant so it's obvious what to order from CJ
        name: l.variant ? `${l.name} (${l.variant})` : l.name,
        quantity: String(l.quantity),
        base_price_money: gbp(l.unitPrice),
      })),
      ...(order.discount && {
        discounts: [
          { uid: 'code', name: `${order.discount.code} (${order.discount.percent}% off)`, percentage: String(order.discount.percent), scope: 'ORDER' },
        ],
      }),
    },
    checkout_options: {
      redirect_url: opts.redirectUrl,
      ask_for_shipping_address: true,
      accepted_payment_methods: { apple_pay: true, google_pay: true },
      ...(order.shipping.price > 0 && { shipping_fee: { name: order.shipping.label, charge: gbp(order.shipping.price) } }),
      ...(opts.supportEmail && { merchant_support_email: opts.supportEmail }),
    },
    // Shown in your Square dashboard: the delivery option the customer picked
    payment_note: `Nolla order · ${order.shipping.label}${includeGift ? '' : ' · + FREE Nimbus cloud pillow'}`,
  };
}

export type PaymentLinkResult = { ok: true; url: string; orderId?: string } | { ok: false; status: number; detail: string };

async function post(body: unknown): Promise<PaymentLinkResult> {
  const res = await fetch(`${apiBase()}/v2/online-checkout/payment-links`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Square-Version': SQUARE_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const json = (await res.json().catch(() => ({}))) as {
    payment_link?: { url?: string; order_id?: string };
    errors?: { code?: string; detail?: string; field?: string }[];
  };
  if (res.ok && json.payment_link?.url) return { ok: true, url: json.payment_link.url, orderId: json.payment_link.order_id };
  const detail = json.errors?.map((e) => [e.code, e.field, e.detail].filter(Boolean).join(': ')).join(' | ') || `HTTP ${res.status}`;
  return { ok: false, status: res.status, detail };
}

export async function createPaymentLink(order: PricedOrder, opts: { redirectUrl: string; supportEmail?: string }): Promise<PaymentLinkResult> {
  const first = await post(buildPaymentLinkBody(order, { ...opts, includeGift: true }));
  if (first.ok || first.status >= 500) return first;
  // If Square refuses the £0 gift line, retry with the gift noted on the payment instead
  if (/line_items|base_price_money|amount/i.test(first.detail)) {
    return post(buildPaymentLinkBody(order, { ...opts, includeGift: false }));
  }
  return first;
}
