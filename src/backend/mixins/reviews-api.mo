import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import ReviewTypes "../types/reviews";
import ReviewLib "../lib/reviews";
import ProductTypes "../types/products";
import ProductsLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : ReviewLib.ProductReviews,
  products : List.List<ProductTypes.Product>,
) {
  public shared ({ caller }) func addReview(productId : CommonTypes.ProductId, rating : Nat, comment : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to leave a review");
    };
    let submitted = ReviewLib.submitReview(reviews, productId, caller, rating, comment, Time.now());
    if (submitted) {
      let (newAvg, newCount) = ReviewLib.computeAverageRating(reviews, productId);
      ProductsLib.updateAverageRating(products, productId, newAvg, newCount);
    };
    submitted
  };

  public query func getReviews(productId : CommonTypes.ProductId) : async [ReviewTypes.Review] {
    ReviewLib.getReviews(reviews, productId)
  };
};
