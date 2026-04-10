import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Lock,
  Package,
  ShoppingCart,
  Star,
  Tag,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { StarRating } from "../components/StarRating";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useReviews, useSubmitReview } from "../hooks/useReviews";
import { useWishlist } from "../hooks/useWishlist";
import type { Product } from "../types";

const CATEGORY_LABELS: Record<string, string> = {
  food: "Food & Nutrition",
  toys: "Toys",
  clothes: "Clothes",
  belts: "Collars & Leashes",
  accessories: "Accessories",
  grooming: "Grooming",
};

function RelatedProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-smooth"
      data-ocid="related-product-card"
    >
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {discount && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
              -{discount}%
            </Badge>
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full border flex items-center justify-center transition-smooth ${
            inWishlist
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-card/80 text-muted-foreground hover:border-accent hover:text-accent"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3 h-3 ${inWishlist ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
          {product.name}
        </p>
        <StarRating
          rating={product.rating}
          size="sm"
          reviewCount={product.reviewCount}
        />
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant={inCart ? "secondary" : "default"}
          className="w-full gap-1.5 text-xs font-semibold mt-1"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1);
            toast.success(`${product.name} added to cart!`);
          }}
          data-ocid="related-add-cart"
        >
          <ShoppingCart className="w-3 h-3" />
          {inCart ? "In Cart" : "Add to Cart"}
        </Button>
      </div>
    </Link>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews } = useReviews(id);
  const { addToCart, isInCart, getQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const submitReview = useSubmitReview();
  const { isLoggedIn, login, principal } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Related products from same category
  const { data: relatedRaw } = useProducts(
    product ? { category: product.category } : undefined,
  );
  const relatedProducts = relatedRaw
    ? relatedRaw.filter((p) => p.id !== id).slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-[420px] aspect-square rounded-2xl shrink-0" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-display font-bold text-2xl text-foreground mb-3">
          Product not found
        </h1>
        <p className="text-muted-foreground mb-6">
          This product may no longer be available.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const userId = principal?.toText() ?? "guest";
  const alreadyReviewed = reviews
    ? reviews.some((r) => r.userId === userId && userId !== "guest")
    : false;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (alreadyReviewed) {
      toast.error("You have already reviewed this product.");
      return;
    }
    await submitReview.mutateAsync({
      productId: product.id,
      userId,
      userName: "You",
      rating: reviewRating,
      comment: reviewComment,
    });
    toast.success("Review submitted! Thank you.");
    setReviewRating(0);
    setReviewComment("");
    setShowReviewForm(false);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb bar */}
      <div className="border-b border-border bg-card/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Shop
          </Link>
          <span>/</span>
          <span className="capitalize">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </span>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Product Hero */}
        <motion.div
          className="flex flex-col md:flex-row gap-8 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image */}
          <div className="relative w-full md:w-[420px] shrink-0">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted/30 border border-border shadow-subtle">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            </div>
            {discount && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1 shadow-md">
                  -{discount}% OFF
                </Badge>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 rounded-2xl bg-background/60 flex items-center justify-center">
                <span className="font-display font-bold text-lg text-foreground bg-card border border-border px-5 py-2.5 rounded-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Badge
                  variant="secondary"
                  className="mb-2.5 text-xs capitalize font-semibold"
                >
                  {CATEGORY_LABELS[product.category] ?? product.category}
                </Badge>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  by {product.brand}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-smooth shrink-0 ${
                  inWishlist
                    ? "border-accent bg-accent text-accent-foreground shadow-md"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10"
                }`}
                aria-label={
                  inWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
                data-ocid="detail-wishlist-btn"
              >
                <Heart
                  className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <StarRating
                rating={product.rating}
                size="md"
                showValue
                reviewCount={product.reviewCount}
              />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-border">
              <span className="font-display font-bold text-3xl sm:text-4xl text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount && (
                <span className="text-sm text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-primary/70" />
                <span>{product.tags.slice(0, 3).join(" · ")}</span>
              </div>
              <Separator
                orientation="vertical"
                className="h-4 hidden sm:block"
              />
              <div
                className={`flex items-center gap-1.5 font-semibold ${
                  product.inStock ? "text-green-600" : "text-destructive"
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            <Separator className="my-5" />

            {/* Quantity + Cart */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center border-2 border-border rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-muted transition-colors text-muted-foreground font-bold text-lg leading-none"
                  aria-label="Decrease quantity"
                  data-ocid="detail-qty-decrease"
                  disabled={!product.inStock}
                >
                  −
                </button>
                <span
                  className="px-5 py-3 text-sm font-bold border-x border-border min-w-[3.5rem] text-center"
                  data-ocid="detail-qty-value"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-muted transition-colors text-muted-foreground font-bold text-lg leading-none"
                  aria-label="Increase quantity"
                  data-ocid="detail-qty-increase"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 min-w-[160px] font-semibold gap-2 shadow-md"
                variant={inCart ? "secondary" : "default"}
                disabled={!product.inStock}
                data-ocid="detail-add-to-cart"
              >
                <ShoppingCart className="w-4 h-4" />
                {inCart
                  ? `In Cart (${getQuantity(product.id)})`
                  : "Add to Cart"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="bg-muted/20 rounded-2xl border border-border p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-foreground">
              Customer Reviews
              {reviews && reviews.length > 0 && (
                <span className="text-muted-foreground font-normal text-base ml-2">
                  ({reviews.length})
                </span>
              )}
            </h2>
            {!alreadyReviewed && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!isLoggedIn) {
                    toast.info("Sign in to write a review", {
                      action: { label: "Sign In", onClick: login },
                    });
                    return;
                  }
                  setShowReviewForm(!showReviewForm);
                }}
                className="gap-2 font-medium"
                data-ocid="write-review-btn"
              >
                <Star className="w-4 h-4" />
                Write a Review
              </Button>
            )}
          </div>

          {/* Already reviewed badge */}
          {alreadyReviewed && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 mb-5 w-fit">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              You have already reviewed this product.
            </div>
          )}

          {/* Login prompt */}
          {!isLoggedIn && !alreadyReviewed && (
            <div className="bg-card border border-border rounded-xl p-4 mb-5 flex items-center gap-3 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 shrink-0 text-primary" />
              <span>
                <button
                  type="button"
                  onClick={login}
                  className="text-primary font-semibold hover:underline"
                  data-ocid="review-login-link"
                >
                  Sign in
                </button>{" "}
                to write a review and share your experience.
              </span>
            </div>
          )}

          {/* Review Form */}
          <AnimatePresence>
            {showReviewForm && isLoggedIn && !alreadyReviewed && (
              <motion.div
                key="review-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div
                  className="bg-card rounded-xl border border-border p-5 mb-6"
                  data-ocid="review-form"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">
                      Share Your Experience
                    </h3>
                  </div>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Rating <span className="text-destructive">*</span>
                      </Label>
                      <StarRating
                        rating={reviewRating}
                        size="lg"
                        interactive
                        onRate={setReviewRating}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">Your Review</Label>
                      <Textarea
                        placeholder="Tell others what you think about this product..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        className="resize-none"
                        data-ocid="review-comment-input"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        className="font-semibold gap-2"
                        disabled={submitReview.isPending || reviewRating === 0}
                        data-ocid="submit-review-btn"
                      >
                        {submitReview.isPending
                          ? "Submitting…"
                          : "Submit Review"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Review List */}
          {!reviews || reviews.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="reviews-empty"
            >
              <Star className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-semibold text-foreground">No reviews yet</p>
              <p className="text-sm mt-1">
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-card rounded-xl border border-border p-4 sm:p-5"
                  data-ocid="review-item"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground leading-tight">
                          {review.userName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed pl-10">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-xl text-foreground">
                Related Products
              </h2>
              <Link
                to="/"
                className="text-sm text-primary hover:underline font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <RelatedProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
