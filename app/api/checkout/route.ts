import { NextResponse, type NextRequest } from 'next/server';
import { priceOrder, type OrderInputLine } from '@/lib/order';
import { createPaymentLink, squareConfigured } from '@/lib/square';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/checkout
 * Body: { lines: [{slug, selections, quantity}], shippingMethod, discountCode? }
 * Re-prices everything server-side, then creates a Square payment link
 * and returns { url } for the browser to go to.
 */
export async function POST(req: NextRequest) {
  if (!squareConfigured()) {
    return NextResponse.json({ error: 'Checkout isn’t connected yet. Please try again soon.' }, { status: 503 });
  }

  let body: { lines?: OrderInputLine[]; shippingMethod?: string; discountCode?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 400 });
  }

  const priced = priceOrder(body.lines ?? [], body.shippingMethod ?? '', body.discountCode);
  if (!priced.ok) return NextResponse.json({ error: priced.error }, { status: 400 });

  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || req.nextUrl.origin;
  const result = await createPaymentLink(priced.order, {
    redirectUrl: `${origin}/checkout/success`,
    supportEmail: process.env.SUPPORT_EMAIL || undefined,
  });

  if (!result.ok) {
    console.error('[checkout] Square error:', result.status, result.detail);
    return NextResponse.json({ error: 'We couldn’t start checkout. Please try again in a moment.' }, { status: 502 });
  }
  return NextResponse.json({ url: result.url });
}
