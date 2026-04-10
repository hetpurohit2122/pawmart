import Map "mo:core/Map";
import List "mo:core/List";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import ReviewTypes "../types/reviews";

module {
  public type Review = ReviewTypes.Review;
  public type ProductReviews = Map.Map<CommonTypes.ProductId, List.List<Review>>;

  public func submitReview(
    reviews : ProductReviews,
    productId : CommonTypes.ProductId,
    reviewer : Principal,
    rating : Nat,
    comment : Text,
    timestamp : CommonTypes.Timestamp,
  ) : Bool {
    // rating must be 1-5
    if (rating < 1 or rating > 5) return false;

    let newReview : Review = {
      productId;
      reviewer;
      rating;
      comment;
      createdAt = timestamp;
    };

    switch (reviews.get(productId)) {
      case (?productList) {
        // prevent duplicate review from same user
        let alreadyReviewed = productList.find(func(r : Review) : Bool {
          Principal.equal(r.reviewer, reviewer)
        });
        switch (alreadyReviewed) {
          case (?_) { return false };
          case null {
            productList.add(newReview);
            true
          };
        };
      };
      case null {
        let newList = List.empty<Review>();
        newList.add(newReview);
        reviews.add(productId, newList);
        true
      };
    };
  };

  public func getReviews(reviews : ProductReviews, productId : CommonTypes.ProductId) : [Review] {
    switch (reviews.get(productId)) {
      case (?productList) { productList.toArray() };
      case null { [] };
    };
  };

  public func computeAverageRating(reviews : ProductReviews, productId : CommonTypes.ProductId) : (Float, Nat) {
    switch (reviews.get(productId)) {
      case (?productList) {
        let count = productList.size();
        if (count == 0) return (0.0, 0);
        let total = productList.foldLeft(0 : Nat, func(acc : Nat, r : Review) : Nat { acc + r.rating });
        let avg = total.toInt().toFloat() / count.toInt().toFloat();
        (avg, count)
      };
      case null { (0.0, 0) };
    };
  };
};
