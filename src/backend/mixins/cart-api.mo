import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartTypes "../types/cart";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : CartLib.UserCart,
) {
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.addToCart(carts, caller, productId, quantity);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.removeFromCart(carts, caller, productId);
  };

  public shared ({ caller }) func updateCartItem(productId : Nat, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.updateCartQuantity(carts, caller, productId, quantity);
  };

  public query ({ caller }) func getCart() : async [CartTypes.CartItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view cart");
    };
    CartLib.getCartItems(carts, caller)
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.clearCart(carts, caller);
  };
};
