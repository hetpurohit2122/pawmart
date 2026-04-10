import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import CartTypes "../types/cart";

module {
  public type CartItem = CartTypes.CartItem;
  public type UserCart = Map.Map<Principal, List.List<CartItem>>;

  public func addToCart(carts : UserCart, user : Principal, productId : CommonTypes.ProductId, quantity : Nat) {
    switch (carts.get(user)) {
      case (?userCart) {
        let existing = userCart.find(func(item : CartItem) : Bool { item.productId == productId });
        switch (existing) {
          case (?_item) {
            userCart.mapInPlace(func(i : CartItem) : CartItem {
              if (i.productId == productId) { { i with quantity = i.quantity + quantity } }
              else { i }
            });
          };
          case null {
            userCart.add({ productId; quantity });
          };
        };
      };
      case null {
        let newCart = List.empty<CartItem>();
        newCart.add({ productId; quantity });
        carts.add(user, newCart);
      };
    };
  };

  public func removeFromCart(carts : UserCart, user : Principal, productId : CommonTypes.ProductId) {
    switch (carts.get(user)) {
      case (?userCart) {
        let kept = userCart.filter(func(item : CartItem) : Bool { item.productId != productId });
        carts.add(user, kept);
      };
      case null {};
    };
  };

  public func updateCartQuantity(carts : UserCart, user : Principal, productId : CommonTypes.ProductId, quantity : Nat) {
    switch (carts.get(user)) {
      case (?userCart) {
        if (quantity == 0) {
          let kept = userCart.filter(func(item : CartItem) : Bool { item.productId != productId });
          carts.add(user, kept);
        } else {
          userCart.mapInPlace(func(i : CartItem) : CartItem {
            if (i.productId == productId) { { i with quantity } }
            else { i }
          });
        };
      };
      case null {};
    };
  };

  public func getCartItems(carts : UserCart, user : Principal) : [CartItem] {
    switch (carts.get(user)) {
      case (?userCart) { userCart.toArray() };
      case null { [] };
    };
  };

  public func clearCart(carts : UserCart, user : Principal) {
    switch (carts.get(user)) {
      case (?userCart) { userCart.clear() };
      case null {};
    };
  };
};
