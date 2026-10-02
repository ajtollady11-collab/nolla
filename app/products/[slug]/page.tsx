import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductPage } from '@/components/product/ProductPage';
import { getProduct, primaryImage, productSlugs } from '@/data/products';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return productSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { images: [{ url: primaryImage(product).src }] },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}
