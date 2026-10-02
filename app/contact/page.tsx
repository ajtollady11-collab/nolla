import type { Metadata } from 'next';
import { InfoPage } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Contact' };

export default function Page() {
  return (
    <InfoPage title="Say hello." intro="Questions about an order, the Nest™ or anything else.">
      {/* PLACEHOLDER: replace with the real support email / form */}
      <p>Our contact details will be added here before launch.</p>
    </InfoPage>
  );
}
