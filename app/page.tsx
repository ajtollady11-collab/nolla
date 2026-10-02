import { Hero } from '@/components/home/Hero';
import { MeetThePieces } from '@/components/home/MeetThePieces';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { GiftFeature } from '@/components/gift/GiftFeature';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MeetThePieces />
      <GiftFeature />
      <ReviewSection />
      <FinalCTA />
    </>
  );
}
