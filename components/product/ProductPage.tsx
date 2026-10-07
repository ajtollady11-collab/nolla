import { ProductHero } from './ProductHero';
import { TextureFeel } from './TextureFeel';
import { FamilyMoments } from './FamilyMoments';
import { ProductBenefits } from './ProductBenefits';
import { ProductDetails } from './ProductDetails';
import { WhatsInside } from './WhatsInside';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { FAQ } from '@/components/faq/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA';
import { NestFeature } from '@/components/home/NestFeature';
import { faqsById } from '@/data/faqs';
import type { Product } from '@/data/products';

const faqIdsFor: Partial<Record<Product['slug'], string[]>> = {
  'nolla-nest': ['what-is-nest', 'whats-included', 'free-gift', 'delivery', 'separate'],
  'nolla-nuv': ['nuv-material', 'nuv-sizes', 'free-gift', 'colours', 'delivery', 'returns'],
  'nolla-nook': ['nook-size', 'free-gift', 'colours', 'delivery', 'returns'],
};

/**
 * One layout for every product. Bundle-only sections switch on via `product.isBundle`.
 */
export function ProductPage({ product }: { product: Product }) {
  return (
    <>
      <section className="container-soft pb-8 pt-4 sm:pt-8">
        <ProductHero product={product} />
      </section>

      {/* Story sections (Nuv™): texture → family → benefits */}
      {product.storySections && (
        <>
          <TextureFeel product={product} />
          <FamilyMoments product={product} />
        </>
      )}
      <ProductBenefits product={product} />

      <ProductDetails product={product} />

      {product.isBundle && product.includes && <WhatsInside includes={product.includes} />}

      {!product.isBundle && (
        <section className="container-soft py-8 sm:py-12">
          <NestFeature heading="Better together." />
        </section>
      )}

      <ReviewSection product={product.slug} limit={product.isBundle ? 6 : 3} />

      <FAQ items={faqsById(faqIdsFor[product.slug] ?? [])} showAllLink />

      <FinalCTA />
    </>
  );
}
