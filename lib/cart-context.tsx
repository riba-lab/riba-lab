'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { PRODUCTS, type Product } from './products';

export interface CartItem extends Product {
  qty: number;
}

type AddResult = 'added' | 'sold_out' | 'max_stock';

interface CartContextValue {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: number) => AddResult;
  changeQty: (id: number, delta: number) => void;
  totalCount: number;
  subtotal: number;
  toastMsg: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const t = useTranslations('products');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMsg) return;
    const id = setTimeout(() => setToastMsg(null), 2300);
    return () => clearTimeout(id);
  }, [toastMsg]);

  const addToCart = (id: number): AddResult => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product || product.stock <= 0) {
      setToastMsg(t('sold_out'));
      return 'sold_out';
    }
    const existing = cart.find((x) => x.id === id);
    const inCart = existing?.qty ?? 0;
    if (inCart >= product.stock) {
      setToastMsg(t('max_stock'));
      return 'max_stock';
    }
    if (existing) {
      setCart(cart.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setToastMsg(t('added'));
    return 'added';
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + delta } : x)).filter((x) => x.qty > 0)
    );
  };

  const totalCount = cart.reduce((s, x) => s + x.qty, 0);
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        changeQty,
        totalCount,
        subtotal,
        toastMsg,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
