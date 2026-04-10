import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductFilter {
    sortOrder?: SortOrder;
    maxPrice?: bigint;
    category?: Category;
    keyword?: string;
    minPrice?: bigint;
}
export type UserId = Principal;
export type Timestamp = bigint;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    averageRating: number;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
    reviewCount: bigint;
}
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export interface UserProfile {
    name: string;
}
export interface Review {
    createdAt: Timestamp;
    productId: ProductId;
    comment: string;
    rating: bigint;
    reviewer: UserId;
}
export enum Category {
    Accessories = "Accessories",
    Toys = "Toys",
    Belts = "Belts",
    PetFood = "PetFood",
    Clothing = "Clothing"
}
export enum SortOrder {
    PriceDesc = "PriceDesc",
    PriceAsc = "PriceAsc"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(productId: ProductId, rating: bigint, comment: string): Promise<boolean>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    addToWishlist(productId: ProductId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getReviews(productId: ProductId): Promise<Array<Review>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<ProductId>>;
    isCallerAdmin(): Promise<boolean>;
    listProducts(filter: ProductFilter): Promise<Array<Product>>;
    removeFromCart(productId: bigint): Promise<void>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(keyword: string): Promise<Array<Product>>;
    updateCartItem(productId: bigint, quantity: bigint): Promise<void>;
}
