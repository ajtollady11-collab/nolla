'use client';

import { useState } from 'react';
import { ProductGallery } from './ProductGallery';
import { ProductPurchase } from './ProductPurchase';
import { defaultSelections, galleryFor, galleryIndexFor, type Product } from '@/data/products';

/**
 * Top of every product page: gallery + buy column, sharing one selection
 * so picking a colour swaps in that colour's photo.
 */
export function ProductHero({ product }: { product: Product }) {
  const [selections, setSelections] = useState(() => defaultSelections(product));
  const [lastChanged, setLastChanged] = useState<string | null>(null);
  const images = galleryFor(product, selections);
  // When a colour changes, glide to that colour's first photo
  const focusIndex = lastChanged ? galleryIndexFor(product, selections, lastChanged) : 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-24">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductGallery images={images} name={product.name} focusIndex={focusIndex} />
      </div>
      <div className="lg:py-6">
        <ProductPurchase
          product={product}
          selections={selections}
          onSelect={(id, value) => {
            setLastChanged(id);
            setSelections((s) => ({ ...s, [id]: value }));
          }}
        />
      </div>
    </div>
  );
}
