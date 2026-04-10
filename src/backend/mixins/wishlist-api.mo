import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import WishlistLib "../lib/wishlist";

mixin (
  accessControlState : AccessControl.AccessControlState,
  wishlists : WishlistLib.UserWishlist,
) {
  public shared ({ caller }) func addToWishlist(productId : CommonTypes.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use wishlist");
    };
    WishlistLib.addToWishlist(wishlists, caller, productId);
  };

  public shared ({ caller }) func removeFromWishlist(productId : CommonTypes.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use wishlist");
    };
    WishlistLib.removeFromWishlist(wishlists, caller, productId);
  };

  public query ({ caller }) func getWishlist() : async [CommonTypes.ProductId] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view wishlist");
    };
    WishlistLib.getWishlist(wishlists, caller)
  };
};
