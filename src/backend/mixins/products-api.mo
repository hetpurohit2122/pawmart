import List "mo:core/List";
import CommonTypes "../types/common";
import ProductTypes "../types/products";
import ProductsLib "../lib/products";

mixin (
  products : List.List<ProductTypes.Product>,
  nextProductId : { var value : Nat },
) {
  public query func listProducts(filter : CommonTypes.ProductFilter) : async [ProductTypes.Product] {
    ProductsLib.listProducts(products, filter)
  };

  public query func getProduct(id : CommonTypes.ProductId) : async ?ProductTypes.Product {
    ProductsLib.getProduct(products, id)
  };

  public query func searchProducts(keyword : Text) : async [ProductTypes.Product] {
    let filter : CommonTypes.ProductFilter = {
      category = null;
      minPrice = null;
      maxPrice = null;
      keyword = ?keyword;
      sortOrder = null;
    };
    ProductsLib.listProducts(products, filter)
  };
};
