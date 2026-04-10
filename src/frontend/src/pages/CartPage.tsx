import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";

const CATEGORY_LABELS: Record<string, string> = {
  food: "Food",
  clothes: "Clothes",
  toys: "Toys",
  belts: "Belts & Collars",
  accessories: "Accessories",
  grooming: "Grooming",
};

export default function CartPage() {
  const {
    cartItems,
    totalItems,
    subtotal,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  } = useCart();

  const [showConfirm, setShowConfirm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setOrderPlaced(false);
    setShowConfirm(true);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const handleCloseDialog = () => {
    setShowConfirm(false);
    setOrderPlaced(false);
  };

  // ── Empty State ──────────────────────────────────────────────────────────────
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center"
        data-ocid="cart-empty"
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground mb-3">
          Your cart is empty
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Browse our premium pet products and treat your furry family member to
          something special!
        </p>
        <Link to="/">
          <Button
            size="lg"
            className="gap-2 font-semibold px-8 rounded-full"
            data-ocid="shop-now-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Shop
          </Button>
        </Link>
      </div>
    );
  }

  // ── Cart Page ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl text-foreground">
            Your Cart{" "}
            <span className="text-muted-foreground font-normal text-lg">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            data-ocid="clear-cart"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Items List ─────────────────────────────────────────────────── */}
          <div className="flex-1 space-y-3" data-ocid="cart-items-list">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-card rounded-xl border border-border p-4 flex gap-4 hover:shadow-subtle transition-smooth"
                data-ocid="cart-item"
              >
                {/* Thumbnail */}
                <Link
                  to="/product/$id"
                  params={{ id: product.id }}
                  className="shrink-0"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-muted/30"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link to="/product/$id" params={{ id: product.id }}>
                        <h3 className="font-display font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          {product.brand}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0 rounded-full"
                          data-ocid="cart-item-category"
                        >
                          {CATEGORY_LABELS[product.category] ??
                            product.category}
                        </Badge>
                      </div>
                      {/* Unit price */}
                      <p
                        className="text-xs text-muted-foreground mt-1"
                        data-ocid="cart-item-unit-price"
                      >
                        ${product.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1 rounded-md hover:bg-destructive/10"
                      aria-label={`Remove ${product.name} from cart`}
                      data-ocid="remove-cart-item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Qty + Item total */}
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty control */}
                    <div
                      className="flex items-center border border-border rounded-lg overflow-hidden"
                      data-ocid="qty-control"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(product.id, quantity - 1)
                        }
                        className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                        data-ocid="qty-decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span
                        className="px-3 py-1.5 text-sm font-medium border-x border-border min-w-[2.5rem] text-center"
                        data-ocid="qty-value"
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(product.id, quantity + 1)
                        }
                        className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                        data-ocid="qty-increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Item total */}
                    <span
                      className="font-display font-bold text-base text-foreground"
                      data-ocid="cart-item-total"
                    >
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ───────────────────────────────────────────────── */}
          <div className="lg:w-72 shrink-0">
            <div
              className="bg-card rounded-xl border border-border p-5 sticky top-32"
              data-ocid="order-summary"
            >
              <h2 className="font-display font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}
                    )
                  </span>
                  <span data-ocid="summary-subtotal">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax (10%)</span>
                  <span data-ocid="summary-tax">${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-display font-bold text-base text-foreground">
                  <span>Total</span>
                  <span data-ocid="summary-total">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-5 font-semibold gap-2 rounded-xl"
                onClick={handleCheckout}
                data-ocid="checkout-btn"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-muted-foreground"
                  data-ocid="continue-shopping-btn"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Checkout Confirmation Dialog ─────────────────────────────────────── */}
      <Dialog open={showConfirm} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md" data-ocid="checkout-dialog">
          {!orderPlaced ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  Confirm Your Order
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Please review your order details before placing.
                </DialogDescription>
              </DialogHeader>

              {/* Mini order breakdown */}
              <div className="space-y-2 py-2 max-h-48 overflow-y-auto pr-1">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-foreground line-clamp-1 flex-1 min-w-0 mr-2">
                      {product.name}{" "}
                      <span className="text-muted-foreground">
                        × {quantity}
                      </span>
                    </span>
                    <span className="font-medium shrink-0">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-display font-bold text-base text-foreground pt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCloseDialog}
                  data-ocid="dialog-cancel-btn"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 font-semibold"
                  onClick={handlePlaceOrder}
                  data-ocid="dialog-place-order-btn"
                >
                  Place Order
                </Button>
              </div>
            </>
          ) : (
            /* ── Success State ── */
            <div className="text-center py-4" data-ocid="order-success">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9 text-primary" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                Order Placed!
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Thank you for your order. Your furry friend's goodies are on
                their way soon!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-4 py-2.5 mb-6">
                <Package className="w-4 h-4 shrink-0" />
                <span>Estimated delivery: 3–5 business days</span>
              </div>
              <Link to="/" onClick={handleCloseDialog}>
                <Button
                  className="w-full font-semibold gap-2"
                  data-ocid="continue-after-order-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
