import { useStore } from "../store";
import type { Product } from "../types";

export function useWishlist() {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useStore();

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({ product, addedAt: Date.now() });
  };

  const toggleWishlist = (product: Product) => {
    const inWishlist = wishlistItems.some((w) => w.product.id === product.id);
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      handleAddToWishlist(product);
    }
  };

  const isInWishlist = (productId: string) =>
    wishlistItems.some((w) => w.product.id === productId);

  return {
    wishlistItems,
    totalItems: wishlistItems.length,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
}
