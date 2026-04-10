import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import ProductTypes "types/products";
import ProfileTypes "types/profile";
import CartLib "lib/cart";
import WishlistLib "lib/wishlist";
import ReviewLib "lib/reviews";
import ProductsLib "lib/products";
import ProductsApi "mixins/products-api";
import CartApi "mixins/cart-api";
import WishlistApi "mixins/wishlist-api";
import ReviewsApi "mixins/reviews-api";
import ProfileApi "mixins/profile-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Product catalog state
  let products = List.empty<ProductTypes.Product>();
  let nextProductId = { var value : Nat = 0 };

  // Per-user cart, wishlist, reviews state
  let carts : CartLib.UserCart = Map.empty<Principal, List.List<CartLib.CartItem>>();
  let wishlists : WishlistLib.UserWishlist = Map.empty<Principal, Set.Set<Nat>>();
  let reviews : ReviewLib.ProductReviews = Map.empty<Nat, List.List<ReviewLib.Review>>();

  // User profiles
  let userProfiles = Map.empty<Principal, ProfileTypes.UserProfile>();

  // Seed products on first run
  ProductsLib.seedProducts(products, nextProductId);

  // Mixins
  include ProductsApi(products, nextProductId);
  include CartApi(accessControlState, carts);
  include WishlistApi(accessControlState, wishlists);
  include ReviewsApi(accessControlState, reviews, products);
  include ProfileApi(accessControlState, userProfiles);
};
