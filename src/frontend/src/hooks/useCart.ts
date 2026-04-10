import { useStore } from "../store";
import type { Product } from "../types";

export function useCart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  } = useStore();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleAddToCart = (product: Product, quantity = 1) => {
    addToCart({ product, quantity });
  };

  const isInCart = (productId: string) =>
    cartItems.some((item) => item.product.id === productId);

  const getQuantity = (productId: string) =>
    cartItems.find((item) => item.product.id === productId)?.quantity ?? 0;

  return {
    cartItems,
    totalItems,
    subtotal,
    addToCart: handleAddToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    isInCart,
    getQuantity,
  };
}
