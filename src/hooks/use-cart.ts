import { convertVndStringToNumber } from '@/utils/number-formater';
import useLocalStorage from './use-local-storage';

export interface CartItem {
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
  removeFromCart: (itemCode: string) => void;
  clearCart: () => void;
  calculateTotalPrice: () => number;
  updateCartItem: (id: number, value: Partial<CartItem>) => void;
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

  const updateCartItem = (itemId: number, update: Partial<CartItem>): void => {
    setCart((prevCart: CartItem[]) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === itemId) {
          return { ...cartItem, ...update };
        }
        return cartItem;
      });
    });
  };

  const removeFromCart = (itemCode: string): void => {
    const updatedCart = cart.filter((item) => item.code !== itemCode);
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

  return {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    calculateTotalPrice,
  };
};

export default useCart;
