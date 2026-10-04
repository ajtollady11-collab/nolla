# nolla

*make staying in feel better.*

Phase 1 frontend for Nolla: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS and Lucide icons.
There is no backend, auth or payments yet. The code is structured so Supabase and Square can be connected later without redesigning anything.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript only
```

Deploy by importing the repo into Vercel. No environment variables are needed for Phase 1.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, pieces + Nest, reviews, final CTA |
| `/shop` | Nest first, then the individual pieces |
| `/products/nolla-nest` | Bundle page (hero product) |
| `/products/nolla-nuv` | Blanket page |
| `/products/nolla-nook` | Beanbag page |
| `/faq` | Full FAQ |
| `/contact`, `/shipping-returns`, `/privacy`, `/terms` | Placeholder pages so no link is broken |

All three product pages share one layout, `components/product/ProductPage.tsx`. Bundle-only sections switch on through `product.isBundle`.

## Where to change things

You should almost never need to edit a component to change content.

| To change… | Edit |
| --- | --- |
| Product names, copy, variants, details | `data/products.ts` |
| **Prices by size** | `data/products.ts` → `nuvSizes`, `nookSizes`; Nest™ price → `NEST_PRICE` |
| "Was" prices on/off | `data/site.ts` → `showCompareAtPrices` (uplift: `COMPARE_AT_UPLIFT` in products.ts) |
| Free gift wording | `data/site.ts` → `giftPromo` |
| Delivery options and prices (UK / international) | `data/site.ts` → `shippingRegions` |
| Any image | `data/images.ts` (all image paths live here) |
| Photo for each colour | `data/images.ts` → `NUV_COLOUR_IMAGES`, `NOOK_COLOUR_IMAGES` (key = colour value) |
| Reviews | `data/reviews.ts` |
| FAQ questions and answers | `data/faqs.ts` |
| Customer count, star rating | `data/site.ts` → `socialProof` |
| Logo | `data/site.ts` → `logo.src` |
| Footer links, socials, nav | `data/site.ts` |
| Colours, radii, shadows, type scale | `tailwind.config.ts` |
| Fonts | `app/fonts.ts` |

### Things that are placeholders on purpose

- **Images.** Everything in `public/images/placeholders` is a placeholder drawing (regenerate with `python3 scripts/generate-placeholders.py`). Add real photos to `public/images` and update the paths in `data/images.ts`.
- **Logo.** The text wordmark is the placeholder. Add the real file (for example `public/brand/nolla-logo.svg`) and set `site.logo.src`.
- **Customer count.** `socialProof.customerCount` is `null`, so the badge reads "Loved by Nolla customers". Set it to a real figure, such as `'2,400'`, and it becomes "Loved by 2,400 people" everywhere.
- **Reviews.** The six reviews are samples for layout only and are flagged `placeholder: true`. While any sample is showing, a small "Sample reviews shown for design preview" note appears. It disappears once you replace them with real reviews.
- **Variants.** Nuv™: 6 colours, 6 sizes. Nook™: 3 colours, 3 lengths. Nest™: largest size of each, colours chosen. Nimbus™: free gift (25 cm, white) added to every order.
- **Product details and FAQ answers.** Supplier-dependent answers (dimensions, care, delivery, returns) are marked `// PLACEHOLDER` in the data files.
- **Social links** point at the platform home pages.

## Project structure

```
app/                 routes, layout, fonts
components/
  ui/                Button, PriceTag, TrustBadge, StarRating, Accordion, Reveal, CloudShape, TM…
  layout/            Header, Footer, Logo, InfoPage
  home/              Hero, MeetThePieces, NestFeature, FinalCTA
  product/           ProductPage, ProductGallery, ProductPurchase, VariantSelector, BundleUpsell,
                     ProductCard, ProductDetails, WhatsInside
  cart/              CartProvider (context), CartDrawer, CartButton
  reviews/           ReviewCard, ReviewSection
  faq/               FAQ
data/                products, images, reviews, faqs, site settings
lib/                 cart logic (pure), price formatting, checkout stub
public/images/       product photography (WebP)
styles/globals.css   base styles
```

## Cart

- The cart is a slide-in drawer on desktop and a bottom sheet on mobile. It persists to `localStorage`.
- **Smart Nest upsell:**
  - Nuv only → "Complete your Nolla Nest™ — Add the Nook™…"
  - Nook only → "…Add the Nuv™…"
  - Both → offer to switch them to the Nest™ and save £29.99.
- Accepting the upsell replaces the single piece(s) with one Nest™ line and carries over the colours already chosen.
- All cart rules live in `lib/cart.ts`. It's plain TypeScript with no React, so the same logic can validate carts server-side later.
- Prices are stored in **pence** (integers), matching Square's `amount` convention.

## Phase 2 integration notes

- **Square checkout.** Replace the body of `startCheckout()` in `lib/checkout.ts`. Every Checkout button already calls it. A typical flow is a server action that creates a Square Payment Link from the cart lines and returns its URL.
- **Square catalogue IDs.** `Product.externalIds.square` and `OptionValue.externalId` are ready for catalogue item and variation IDs.
- **Supabase products and stock.** Load products server-side in the page components and pass them in the same `Product` shape. `OptionValue.available = false` already renders a disabled variant.
- **Real reviews and counts.** Fetch reviews into the `Review[]` shape and pass `reviews={…}` to `<ReviewSection />`. Feed the count into `socialProof.customerCount` or the `count` prop of `<TrustBadge />`.
- **Remote images.** If photography moves to Supabase Storage, add the host to `images.remotePatterns` in `next.config.mjs`.

## Accessibility and motion

- Visible keyboard focus throughout.
- A skip link.
- Escape closes the cart and menu, and the page behind them stops scrolling while they're open.
- Accordions and variant selectors are labelled for screen readers.
- Every animation is switched off when `prefers-reduced-motion` is set.
- The hero entrance is the only animation that plays without user action (apart from gentle fade-ins as sections scroll into view).

## 10% popup with the cosy quiz built in

- **Flow:** popup intro → 4 quiz questions (one at a time) → email (only after the quiz) → personality result, "Your perfect Nolla" and the NOLLA10 code with a copy button.
- **Where:** `components/marketing/EmailPopup.tsx` (the popup, mounted once in `app/layout.tsx`) hosts `CosyQuiz.tsx`. All wording, questions, scoring and the four personalities are in `data/marketing.ts`.
- **When it appears:** 3 seconds after landing, no scrolling needed (waits if the cart or menu is open). Tune `delayMs` in `popupTriggers`.
- **Suppression:** once an email is submitted it never shows again on that browser; closing it hides it for the rest of the visit; never shown over the cart or menu.
- **Testing:** visit `/?popup=reset` to make your own browser forget all of that and see the popup again (or use a private window).
- **Emails are not stored until you connect Klaviyo:** set `emailPlatform.klaviyoPublicKey` and `klaviyoListId` in `data/marketing.ts` (public key only, never a private key). Sign-ups are tagged with their quiz personality.
- **Discount:** `NOLLA10` is displayed only. Checkout isn't live, so nothing applies it automatically. Create a matching 10% discount in Square when checkout is built.

## Checkout (Square)

- **Flow:** cart → **/checkout** (our own delivery details page: email, name, phone, address, country) → `POST /api/checkout` → server re-prices the cart from `data/products.ts`, validates the details, and checks the delivery option matches the country → creates a Square payment page (card / Apple Pay / Google Pay only; Square's own address step is switched off) → `/checkout/success` empties the cart.
- **Why our own details page:** Square's hosted shipping-address step blocked payment ("enter a valid address to see shipping methods"), and UK sellers report the same problem widely. Collecting details ourselves also means the country decides the delivery price.
- **What Square receives:** one line per product with colour/size in the name, the free Nimbus™ (£0), NOLLA10 as a discount, international delivery as a service charge, and the customer's name/address/email/phone as a SHIPMENT fulfilment. A one-line "SHIP TO: …" summary is always in the payment note too.
- **Fallbacks:** if Square rejects an optional part (fulfilment, service charge, email prefill, £0 gift line) the server drops just that part and retries, so checkout keeps working; the payment note still has everything.
- **Files:** `app/checkout/page.tsx`, `components/checkout/CheckoutForm.tsx`, `lib/order.ts` (pricing + delivery validation), `lib/square.ts`, `app/api/checkout/route.ts`, `data/countries.ts` (countries we deliver to).
- **Discount codes:** `discountCodes` in `data/marketing.ts`. Not yet limited to one use per customer.
- **Environment variables** (see `.env.example`): `SQUARE_ENVIRONMENT`, `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, `NEXT_PUBLIC_SITE_URL`, `SUPPORT_EMAIL`.
- **Deploying:** push to GitHub; Vercel rebuilds automatically.
