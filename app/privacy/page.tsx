import type { Metadata } from 'next';
import { InfoPage } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function Page() {
  return <InfoPage title="Privacy policy." intro="How we collect, use and look after your information." />;
}
