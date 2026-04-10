import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Review } from "../types";

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userId: "u1",
    userName: "Sarah M.",
    rating: 5,
    comment:
      "My golden retriever absolutely loves this food! His coat has never been shinier and he finishes every bowl. Highly recommend for picky eaters.",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "r2",
    productId: "p1",
    userId: "u2",
    userName: "James T.",
    rating: 4,
    comment:
      "Great quality ingredients. A bit pricey but you get what you pay for. My vet approved it too.",
    createdAt: Date.now() - 86400000 * 12,
  },
  {
    id: "r3",
    productId: "p2",
    userId: "u3",
    userName: "Emily R.",
    rating: 5,
    comment:
      "Survived 3 weeks with our aggressive chewer — that's a record! Very impressed.",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "r4",
    productId: "p5",
    userId: "u4",
    userName: "Lucas K.",
    rating: 5,
    comment:
      "Our Persian cat went crazy for this food on day one. We tried 4 brands before and this is the only one she eats without complaints.",
    createdAt: Date.now() - 86400000 * 7,
  },
];

const localReviews = [...MOCK_REVIEWS];

export function useReviews(productId: string) {
  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 100));
      return localReviews.filter((r) => r.productId === productId);
    },
    enabled: !!productId,
    staleTime: 30_000,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: Omit<Review, "id" | "createdAt">) => {
      await new Promise((r) => setTimeout(r, 300));
      const newReview: Review = {
        ...review,
        id: `r${Date.now()}`,
        createdAt: Date.now(),
      };
      localReviews.push(newReview);
      return newReview;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", data.productId] });
    },
  });
}
