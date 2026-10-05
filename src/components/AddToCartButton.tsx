'use client';

import { useState } from 'react';
import type { Drink } from '@/lib/types';
import { useCart } from './CartProvider';

export default function AddToCartButton({ drink }: { drink: Drink }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        addToCart(drink);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 900);
      }}
    >
      {added ? 'Added ✓' : 'Add to cart'}
    </button>
  );
}
