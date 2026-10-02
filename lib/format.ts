import { site } from '@/data/site';

const formatter = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  minimumFractionDigits: 2,
});

/** Format an integer amount in pence, e.g. 9999 → "£99.99" */
export function formatPrice(pence: number): string {
  return formatter.format(pence / 100);
}
