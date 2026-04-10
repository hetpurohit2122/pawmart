module {
  public type ProductId = Nat;
  public type UserId = Principal;
  public type Timestamp = Int;

  public type Category = {
    #PetFood;
    #Clothing;
    #Belts;
    #Toys;
    #Accessories;
  };

  public type SortOrder = {
    #PriceAsc;
    #PriceDesc;
  };

  public type ProductFilter = {
    category : ?Category;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    keyword : ?Text;
    sortOrder : ?SortOrder;
  };
};
