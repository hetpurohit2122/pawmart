import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import type { Product } from "../types";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-smooth group overflow-hidden flex flex-col"
      data-ocid="product-card"
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
          onClick={() => toggleWishlist(product)}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-smooth shadow-sm ${
            inWishlist
              ? "bg-accent text-accent-foreground"
              : "bg-card/90 text-muted-foreground hover:text-accent hover:bg-card"
          }`}
          data-ocid="wishlist-toggle"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
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
          data-ocid="add-to-cart"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {inCart ? "In Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
