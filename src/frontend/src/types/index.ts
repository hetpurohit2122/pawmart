export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: ProductCategory;
  petType: PetType;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

export type ProductCategory =
  | "food"
  | "clothes"
  | "toys"
  | "belts"
  | "accessories"
  | "grooming";
export type PetType = "dog" | "cat" | "bird" | "small-pet" | "all";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export interface UserProfile {
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface ProductFilter {
  category?: ProductCategory | "all";
  petType?: PetType | "all";
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  searchQuery?: string;
  minRating?: number;
}
