import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";

module {
  public type UserWishlist = Map.Map<Principal, Set.Set<CommonTypes.ProductId>>;

  public func addToWishlist(wishlists : UserWishlist, user : Principal, productId : CommonTypes.ProductId) {
    switch (wishlists.get(user)) {
      case (?userSet) {
        userSet.add(productId);
      };
      case null {
        let newSet = Set.empty<CommonTypes.ProductId>();
        newSet.add(productId);
        wishlists.add(user, newSet);
      };
    };
  };

  public func removeFromWishlist(wishlists : UserWishlist, user : Principal, productId : CommonTypes.ProductId) {
    switch (wishlists.get(user)) {
      case (?userSet) { userSet.remove(productId) };
      case null {};
    };
  };

  public func getWishlist(wishlists : UserWishlist, user : Principal) : [CommonTypes.ProductId] {
    switch (wishlists.get(user)) {
      case (?userSet) { userSet.toArray() };
      case null { [] };
    };
  };
};
