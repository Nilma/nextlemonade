'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Drink } from '@/lib/types';

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (drink: Drink) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('nextlemonade-cart');
    if (saved) {
      try {
        // Restore the browser-only cart after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem('nextlemonade-cart');
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem('nextlemonade-cart', JSON.stringify(items));
    }
  }, [items, loaded]);

  function addToCart(drink: Drink) {
    setItems((current) => {
      const existing = current.find((item) => item.id === drink.id);
      if (existing) {
        return current.map((item) =>
          item.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...drink, quantity: 1 }];
    });
  }

  function increase(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrease(id: string) {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function remove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({ items, itemCount, total, addToCart, increase, decrease, remove, clearCart }),
    [items, itemCount, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
