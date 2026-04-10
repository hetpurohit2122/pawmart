import CommonTypes "common";

module {
  public type Review = {
    productId : CommonTypes.ProductId;
    reviewer : CommonTypes.UserId;
    rating : Nat;
    comment : Text;
    createdAt : CommonTypes.Timestamp;
  };
};
