import { e as useWishlist, j as jsxRuntimeExports, H as Heart, f as Button, L as Link, B as Badge, d as useCart, S as ShoppingCart } from "./index-B0MCdo7A.js";
import { S as StarRating } from "./StarRating-DCZRtOlR.js";
import { T as Trash2 } from "./trash-2-Dlbp3aYw.js";
function WishlistCard({ item }) {
  const { product } = item;
  const { removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-smooth group overflow-hidden flex flex-col",
      "data-ocid": "wishlist-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-square bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ) }),
          discount && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5", children: [
            "-",
            discount,
            "%"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => removeFromWishlist(product.id),
              "aria-label": "Remove from wishlist",
              className: "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-destructive/90 text-destructive-foreground hover:bg-destructive transition-smooth shadow-sm",
              "data-ocid": "wishlist-remove",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col flex-1 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground leading-tight hover:text-primary transition-colors line-clamp-2", children: product.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: product.brand })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              rating: product.rating,
              size: "sm",
              showValue: true,
              reviewCount: product.reviewCount
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-base text-foreground", children: [
              "$",
              product.price.toFixed(2)
            ] }),
            product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
              "$",
              product.originalPrice.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => addToCart(product),
              size: "sm",
              className: "w-full font-semibold text-xs gap-1.5 transition-smooth",
              variant: inCart ? "secondary" : "default",
              "data-ocid": "wishlist-move-to-cart",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5" }),
                inCart ? "In Cart" : "Move to Cart"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function WishlistPage() {
  const { wishlistItems, totalItems } = useWishlist();
  if (wishlistItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "My Wishlist" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 text-center",
          "data-ocid": "wishlist-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Your wishlist is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: "Save your favourite products here and come back when you're ready to buy — your pets will thank you!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "wishlist-browse-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Browse Products" }) })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "My Wishlist" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "text-xs",
          "data-ocid": "wishlist-count",
          children: [
            totalItems,
            " ",
            totalItems === 1 ? "item" : "items"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4",
        "data-ocid": "wishlist-grid",
        children: wishlistItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistCard, { item }, item.product.id))
      }
    )
  ] });
}
export {
  WishlistPage as default
};
