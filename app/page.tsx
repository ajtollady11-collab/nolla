import { HomeHero } from '@/components/home/HomeHero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { NestIntro } from '@/components/home/NestIntro';
import { Lifestyle } from '@/components/home/Lifestyle';
import { WhyNolla } from '@/components/home/WhyNolla';
import { ProductLineup } from '@/components/home/ProductLineup';
import { TextureSection } from '@/components/home/TextureSection';
import { RealLife } from '@/components/home/RealLife';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { GiftFeature } from '@/components/gift/GiftFeature';
import { BrandStory } from '@/components/home/BrandStory';
import { FAQ } from '@/components/faq/FAQ';
import { HomeFinalCta } from '@/components/home/HomeFinalCta';
import { faqsById } from '@/data/faqs';
import { homeFaqIds } from '@/data/home';

/**
 * Homepage, in strategic order:
 * hero → reassurance → signature product → lifestyle → benefits → line-up →
 * texture → real life (hidden until genuine content) → reviews (hidden until genuine) →
 * gift → story → FAQ → emotional close.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <NestIntro />
      <Lifestyle />
      <WhyNolla />
      <ProductLineup />
      <TextureSection />
      <RealLife />
      <ReviewSection />
      <GiftFeature />
      <BrandStory />
      <FAQ items={faqsById(homeFaqIds)} heading="Questions, answered." showAllLink />
      <HomeFinalCta />
    </>
  );
}
