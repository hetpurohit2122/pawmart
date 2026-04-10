import CommonTypes "common";

module {
  public type CartItem = {
    productId : CommonTypes.ProductId;
    quantity : Nat;
  };
};
