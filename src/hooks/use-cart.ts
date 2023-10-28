import { convertVndStringToNumber } from '@/utils/number-formater';
import useLocalStorage from './use-local-storage';

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  slug: string;
  price: string;
  code: string;
  thumbnail: string;
}

const useCart = (): {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  calculateTotalPrice: () => number;
} => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (item: CartItem): void => {
    const exitedItem = cart.find(
      (it) => it.id === item.id && it.code === item.code
    );
    if (exitedItem) {
      setCart((pre: CartItem[]) =>
        pre.map((cartItem) => {
          if (
            cartItem.code === exitedItem.code &&
            cartItem.id === exitedItem.id
          ) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        })
      );
    } else setCart([...cart, item]);
  };

  const removeFromCart = (itemId: number): void => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = (): void => {
    setCart([]);
  };

  const calculateTotalPrice = (): number => {
    // Calculate the total price by summing the price of each item in the cart
    return cart.reduce(
      (total, item) =>
        total + convertVndStringToNumber(item.price) * item.quantity,
      0
    );
  };

  return { cart, addToCart, removeFromCart, clearCart, calculateTotalPrice };
};

export default useCart;
