import type { Metadata } from 'next';
import { InfoPage } from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Terms' };

export default function Page() {
  return <InfoPage title="Terms." intro="The terms that apply when you shop with nolla." />;
}
