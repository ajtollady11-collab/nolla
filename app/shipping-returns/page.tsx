import type { Metadata } from 'next';
import { InfoPage } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Shipping & Returns' };

export default function Page() {
  return <InfoPage title="Shipping & returns." intro="How your Nolla gets to you, and what to do if it isn’t right." />;
}
