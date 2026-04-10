import { create } from "zustand";
import type {
  CartItem,
  PetType,
  ProductCategory,
  ProductFilter,
  WishlistItem,
} from "../types";

interface AppState {
  // Cart
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;

  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory | "all";
  setSelectedCategory: (c: ProductCategory | "all") => void;
  selectedPetType: PetType | "all";
  setSelectedPetType: (p: PetType | "all") => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  selectedBrand: string;
  setSelectedBrand: (b: string) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  sortOrder: "relevance" | "price-asc" | "price-desc";
  setSortOrder: (s: "relevance" | "price-asc" | "price-desc") => void;
}

export const useStore = create<AppState>((set) => ({
  // Cart
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find(
        (c) => c.product.id === item.product.id,
      );
      if (existing) {
        return {
          cartItems: state.cartItems.map((c) =>
            c.product.id === item.product.id
              ? { ...c, quantity: c.quantity + item.quantity }
              : c,
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((c) => c.product.id !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems:
        quantity <= 0
          ? state.cartItems.filter((c) => c.product.id !== productId)
          : state.cartItems.map((c) =>
              c.product.id === productId ? { ...c, quantity } : c,
            ),
    })),
  clearCart: () => set({ cartItems: [] }),

  // Wishlist
  wishlistItems: [],
  addToWishlist: (item) =>
    set((state) => {
      if (state.wishlistItems.find((w) => w.product.id === item.product.id))
        return state;
      return { wishlistItems: [...state.wishlistItems, item] };
    }),
  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlistItems: state.wishlistItems.filter(
        (w) => w.product.id !== productId,
      ),
    })),

  // Filters
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedCategory: "all",
  setSelectedCategory: (c) => set({ selectedCategory: c }),
  selectedPetType: "all",
  setSelectedPetType: (p) => set({ selectedPetType: p }),
  priceRange: [0, 150],
  setPriceRange: (r) => set({ priceRange: r }),
  selectedBrand: "",
  setSelectedBrand: (b) => set({ selectedBrand: b }),
  minRating: 0,
  setMinRating: (r) => set({ minRating: r }),
  sortOrder: "relevance",
  setSortOrder: (s) => set({ sortOrder: s }),
}));
