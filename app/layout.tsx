import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { serif, sans } from './fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PromoBar } from '@/components/gift/PromoBar';
import { EmailPopup } from '@/components/marketing/EmailPopup';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `nolla | ${site.tagline}`,
    template: '%s | nolla',
  },
  description: site.description,
  openGraph: {
    title: 'nolla',
    description: site.description,
    siteName: 'nolla',
    locale: 'en_GB',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-cream"
          >
            Skip to content
          </a>
          <PromoBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <EmailPopup />
        </CartProvider>
      </body>
    </html>
  );
}
