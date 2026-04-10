import CommonTypes "common";

module {
  public type Product = {
    id : CommonTypes.ProductId;
    name : Text;
    description : Text;
    price : Nat;
    category : CommonTypes.Category;
    imageUrl : Text;
    stock : Nat;
    averageRating : Float;
    reviewCount : Nat;
  };
};
