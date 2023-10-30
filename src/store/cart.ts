// cartStore.ts
'use client';
import { convertVndStringToNumber } from '@/utils/number-formater';
import { create } from 'zustand';
interface CartStore {
  cart: { items: CartItem[]; total: number };
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemCode: string) => void;
  clearCart: () => void;
  updateCart: (itemCode: string, cartValue: Partial<CartItem>) => void;
}

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  slug: string;
  price: string;
  code: string;
  thumbnail: string;
}

const initCartFromLocalStorage = (): { items: CartItem[]; total: number } => {
  if (typeof window === 'undefined') return { items: [], total: 0 };
  try {
    return (
      JSON.parse(window.localStorage.getItem('cart') || 'null') || {
        items: [],
        total: 0,
      }
    );
  } catch (error) {
    window.localStorage.removeItem('cart');
    return { items: [], total: 0 };
  }
};

const updateLocalStorageAndReturn = (newCart: {
  items: CartItem[];
  total: number;
}) => {
  window.localStorage.setItem('cart', JSON.stringify(newCart));
  return { cart: newCart };
};

const useCartStore = create<CartStore>((set) => ({
  cart: initCartFromLocalStorage(),
  addToCart: (item) =>
    set((state) => {
      const total = state.cart.total + convertVndStringToNumber(item.price);
      const itemInCartIndex = state.cart.items.findIndex(
        (cartItem) => cartItem.code === item.code
      );

      if (itemInCartIndex !== -1) {
        state.cart.items[itemInCartIndex].quantity += item.quantity;
      } else {
        state.cart.items.push({ ...item });
      }

      const newCart = { ...state.cart, total };
      return updateLocalStorageAndReturn(newCart);
    }),
  removeFromCart: (itemCode) =>
    set((state) => {
      const updatedCart = state.cart.items.filter(
        (cartItem) => cartItem.code !== itemCode
      );
      const total = updatedCart.reduce(
        (acc, cartItem) =>
          acc + convertVndStringToNumber(cartItem.price) * cartItem.quantity,
        0
      );
      const newCart = { items: updatedCart, total };

      return updateLocalStorageAndReturn(newCart);
    }),
  updateCart: (itemCode: string, cartValue: Partial<CartItem>) =>
    set((state) => {
      const updatedItems = state.cart.items.map((cartItem) =>
        cartItem.code === itemCode ? { ...cartItem, ...cartValue } : cartItem
      );
      const total = updatedItems.reduce(
        (acc, cartItem) =>
          acc + convertVndStringToNumber(cartItem.price) * cartItem.quantity,
        0
      );
      const newCart = { items: updatedItems, total };
      return updateLocalStorageAndReturn(newCart);
    }),
  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: { items: [], total: 0 } });
  },
}));

export default useCartStore;
