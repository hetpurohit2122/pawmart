import List "mo:core/List";
import Float "mo:core/Float";
import Text "mo:core/Text";
import Order "mo:core/Order";
import CommonTypes "../types/common";
import ProductTypes "../types/products";

module {
  public type Product = ProductTypes.Product;
  public type ProductFilter = CommonTypes.ProductFilter;

  public func seedProducts(products : List.List<Product>, nextId : { var value : Nat }) {
    if (products.size() > 0) return; // already seeded

    let sampleProducts : [Product] = [
      // Pet Food (6)
      {
        id = 0;
        name = "Premium Salmon Cat Food";
        description = "High-protein salmon recipe for adult cats. Rich in Omega-3 fatty acids for a shiny coat.";
        price = 2499;
        category = #PetFood;
        imageUrl = "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80";
        stock = 100;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 1;
        name = "Grain-Free Dog Kibble";
        description = "Wholesome grain-free kibble for dogs of all sizes. Made with real chicken and sweet potato.";
        price = 3999;
        category = #PetFood;
        imageUrl = "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80";
        stock = 80;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 2;
        name = "Organic Puppy Starter Pack";
        description = "Specially formulated for puppies. Supports healthy growth with DHA and essential vitamins.";
        price = 2799;
        category = #PetFood;
        imageUrl = "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80";
        stock = 60;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 3;
        name = "Senior Cat Wellness Blend";
        description = "Tailored nutrition for senior cats. Low phosphorus formula supporting kidney health.";
        price = 2199;
        category = #PetFood;
        imageUrl = "https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&q=80";
        stock = 70;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 4;
        name = "Wild Bird Seed Mix";
        description = "Premium blend of sunflower seeds, millet and safflower. Attracts a wide variety of wild birds.";
        price = 1299;
        category = #PetFood;
        imageUrl = "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80";
        stock = 150;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 5;
        name = "Freeze-Dried Raw Dog Treats";
        description = "Single-ingredient freeze-dried beef liver treats. No additives, no preservatives — pure nutrition.";
        price = 1599;
        category = #PetFood;
        imageUrl = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80";
        stock = 120;
        averageRating = 0.0;
        reviewCount = 0;
      },
      // Clothing (4)
      {
        id = 6;
        name = "Cozy Winter Dog Sweater";
        description = "Soft knitted sweater for dogs. Keeps your pup warm and stylish during cold months.";
        price = 3499;
        category = #Clothing;
        imageUrl = "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80";
        stock = 45;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 7;
        name = "Waterproof Dog Raincoat";
        description = "Lightweight waterproof coat for rainy days. Adjustable fit for all breeds.";
        price = 4599;
        category = #Clothing;
        imageUrl = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80";
        stock = 35;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 8;
        name = "Fancy Cat Halloween Costume";
        description = "Adorable pumpkin costume for cats. Soft, non-restrictive material for comfortable wear.";
        price = 1999;
        category = #Clothing;
        imageUrl = "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=400&q=80";
        stock = 30;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 9;
        name = "Dog Summer Sun Shirt";
        description = "UV-protection shirt for dogs. Breathable fabric ideal for outdoor adventures.";
        price = 2799;
        category = #Clothing;
        imageUrl = "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=400&q=80";
        stock = 50;
        averageRating = 0.0;
        reviewCount = 0;
      },
      // Belts (3)
      {
        id = 10;
        name = "Reflective Dog Collar Belt";
        description = "Heavy-duty nylon collar with reflective stitching for night visibility. Adjustable sizing.";
        price = 1299;
        category = #Belts;
        imageUrl = "https://images.unsplash.com/photo-1601758124096-519ed9f20078?w=400&q=80";
        stock = 90;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 11;
        name = "Leather Dog Harness Belt";
        description = "Premium leather harness with brass buckles. Durable and stylish for medium to large dogs.";
        price = 5999;
        category = #Belts;
        imageUrl = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80";
        stock = 25;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 12;
        name = "Adjustable Cat Safety Collar";
        description = "Breakaway safety collar for cats. Quick-release buckle prevents accidents.";
        price = 899;
        category = #Belts;
        imageUrl = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80";
        stock = 110;
        averageRating = 0.0;
        reviewCount = 0;
      },
      // Toys (4)
      {
        id = 13;
        name = "Interactive Puzzle Dog Toy";
        description = "Level 3 difficulty puzzle toy. Hides treats to engage your dog's natural foraging instincts.";
        price = 2999;
        category = #Toys;
        imageUrl = "https://images.unsplash.com/photo-1546532936863-b7573e26a7a3?w=400&q=80";
        stock = 55;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 14;
        name = "Catnip Feather Wand";
        description = "Telescoping wand with feathers and catnip attachment. Promotes active play and exercise.";
        price = 1199;
        category = #Toys;
        imageUrl = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80";
        stock = 85;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 15;
        name = "Squeaky Plush Toy Set";
        description = "Set of 5 squeaky plush animals in assorted designs. Durable and safe for all dog sizes.";
        price = 1799;
        category = #Toys;
        imageUrl = "https://images.unsplash.com/photo-1601758177266-bc599de87707?w=400&q=80";
        stock = 70;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 16;
        name = "Automatic Laser Cat Toy";
        description = "Battery-powered rotating laser that keeps cats entertained for hours. 3 speed settings.";
        price = 3499;
        category = #Toys;
        imageUrl = "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=400&q=80";
        stock = 40;
        averageRating = 0.0;
        reviewCount = 0;
      },
      // Accessories (4)
      {
        id = 17;
        name = "Stainless Steel Pet Bowl Set";
        description = "Set of 2 stainless steel bowls with non-slip rubber base. Dishwasher safe.";
        price = 1999;
        category = #Accessories;
        imageUrl = "https://images.unsplash.com/photo-1609172271512-a3b8e58e7e8e?w=400&q=80";
        stock = 95;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 18;
        name = "Orthopedic Dog Bed";
        description = "Memory foam orthopedic bed with removable washable cover. Ideal for senior dogs.";
        price = 8999;
        category = #Accessories;
        imageUrl = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80";
        stock = 20;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 19;
        name = "Pet GPS Tracker";
        description = "Real-time GPS tracking device for cats and dogs. Lightweight, waterproof and long battery life.";
        price = 7499;
        category = #Accessories;
        imageUrl = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80";
        stock = 30;
        averageRating = 0.0;
        reviewCount = 0;
      },
      {
        id = 20;
        name = "Grooming Kit for Dogs";
        description = "Complete 7-piece grooming kit: brush, comb, nail clipper, ear cleaner and more.";
        price = 4299;
        category = #Accessories;
        imageUrl = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80";
        stock = 65;
        averageRating = 0.0;
        reviewCount = 0;
      },
    ];

    for (p in sampleProducts.vals()) {
      products.add(p);
    };
    nextId.value := sampleProducts.size();
  };

  public func listProducts(products : List.List<Product>, filter : ProductFilter) : [Product] {
    let result = products.filter(func(p : Product) : Bool {
      let categoryMatch = switch (filter.category) {
        case (?cat) { p.category == cat };
        case null { true };
      };
      let minMatch = switch (filter.minPrice) {
        case (?min) { p.price >= min };
        case null { true };
      };
      let maxMatch = switch (filter.maxPrice) {
        case (?max) { p.price <= max };
        case null { true };
      };
      let keywordMatch = switch (filter.keyword) {
        case (?kw) {
          let lower = kw.toLower();
          p.name.toLower().contains(#text lower)
        };
        case null { true };
      };
      categoryMatch and minMatch and maxMatch and keywordMatch
    });

    let arr = result.toArray();
    switch (filter.sortOrder) {
      case (? #PriceAsc) {
        arr.sort(func(a : Product, b : Product) : Order.Order {
          if (a.price < b.price) #less
          else if (a.price > b.price) #greater
          else #equal
        })
      };
      case (? #PriceDesc) {
        arr.sort(func(a : Product, b : Product) : Order.Order {
          if (a.price > b.price) #less
          else if (a.price < b.price) #greater
          else #equal
        })
      };
      case null { arr };
    };
  };

  public func getProduct(products : List.List<Product>, id : CommonTypes.ProductId) : ?Product {
    products.find(func(p : Product) : Bool { p.id == id })
  };

  public func updateAverageRating(products : List.List<Product>, productId : CommonTypes.ProductId, newAvg : Float, newCount : Nat) {
    products.mapInPlace(func(p : Product) : Product {
      if (p.id == productId) {
        { p with averageRating = newAvg; reviewCount = newCount }
      } else { p }
    });
  };
};
