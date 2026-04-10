import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { StarRating } from "../components/StarRating";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import type { WishlistItem } from "../types";

function WishlistCard({ item }: { item: WishlistItem }) {
  const { product } = item;
  const { removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const inCart = isInCart(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-smooth group overflow-hidden flex flex-col"
      data-ocid="wishlist-card"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-muted/30">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </Link>
        {discount && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5">
              -{discount}%
            </Badge>
          </div>
        )}
        <button
          type="button"
          onClick={() => removeFromWishlist(product.id)}
          aria-label="Remove from wishlist"
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-destructive/90 text-destructive-foreground hover:bg-destructive transition-smooth shadow-sm"
          data-ocid="wishlist-remove"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div className="flex-1">
          <Link to="/product/$id" params={{ id: product.id }}>
            <h3 className="font-display font-semibold text-sm text-foreground leading-tight hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">
            {product.brand}
          </p>
        </div>

        <StarRating
          rating={product.rating}
          size="sm"
          showValue
          reviewCount={product.reviewCount}
        />

        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-base text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          onClick={() => addToCart(product)}
          size="sm"
          className="w-full font-semibold text-xs gap-1.5 transition-smooth"
          variant={inCart ? "secondary" : "default"}
          data-ocid="wishlist-move-to-cart"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {inCart ? "In Cart" : "Move to Cart"}
        </Button>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { wishlistItems, totalItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-display font-bold text-xl text-foreground">
            My Wishlist
          </h1>
        </div>
        <div
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="wishlist-empty"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-5">
            <Heart className="w-10 h-10 text-accent" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">
            Save your favourite products here and come back when you're ready to
            buy — your pets will thank you!
          </p>
          <Button asChild data-ocid="wishlist-browse-cta">
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-display font-bold text-xl text-foreground">
          My Wishlist
        </h1>
        <Badge
          variant="secondary"
          className="text-xs"
          data-ocid="wishlist-count"
        >
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </Badge>
      </div>

      {/* Grid — matches Shop page layout */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
        data-ocid="wishlist-grid"
      >
        {wishlistItems.map((item) => (
          <WishlistCard key={item.product.id} item={item} />
        ))}
      </div>
    </div>
  );
}
