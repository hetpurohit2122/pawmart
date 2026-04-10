import { useQuery } from "@tanstack/react-query";
import type {
  PetType,
  Product,
  ProductCategory,
  ProductFilter,
} from "../types";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Acme Gourmet Dog Food – Salmon",
    description:
      "Premium grain-free salmon recipe packed with omega-3 for a healthy coat and strong immune system. Made with real wild-caught salmon and fresh vegetables.",
    price: 48.99,
    originalPrice: 59.99,
    imageUrl:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
    category: "food",
    petType: "dog",
    brand: "Acme Pet",
    rating: 4.7,
    reviewCount: 124,
    inStock: true,
    tags: ["grain-free", "salmon", "adult"],
  },
  {
    id: "p2",
    name: "BarkBox Durable Chew Toy",
    description:
      "Ultra-durable natural rubber chew toy designed for aggressive chewers. Satisfies natural chewing instincts while promoting dental health.",
    price: 12.5,
    imageUrl:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=400&fit=crop",
    category: "toys",
    petType: "dog",
    brand: "BarkBox",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ["chew", "durable", "dental"],
  },
  {
    id: "p3",
    name: "Plush Velvet Pet Bed – Teal",
    description:
      "Orthopedic memory foam base with ultra-soft velvet cover. Perfect for dogs and cats who need joint support and a cozy retreat.",
    price: 74.99,
    imageUrl:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "all",
    brand: "CozyPaws",
    rating: 4.8,
    reviewCount: 203,
    inStock: true,
    tags: ["bed", "orthopedic", "velvet"],
  },
  {
    id: "p4",
    name: "Adjustable Leather Dog Leash",
    description:
      "Genuine full-grain leather leash with brass hardware. Soft on your hands and durable enough for daily walks. Available in multiple lengths.",
    price: 24.0,
    imageUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    category: "belts",
    petType: "dog",
    brand: "EarthBorn",
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    tags: ["leather", "leash", "adjustable"],
  },
  {
    id: "p5",
    name: "Premium Grain-Free Cat Food",
    description:
      "High-protein cat food made with real chicken and turkey. No fillers, no artificial colors. Supports lean muscle and digestive health.",
    price: 55.99,
    originalPrice: 64.99,
    imageUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
    category: "food",
    petType: "cat",
    brand: "Purrina",
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    tags: ["grain-free", "chicken", "cat"],
  },
  {
    id: "p6",
    name: "Cozy Fleece Pet Sweater – Teal",
    description:
      "Soft fleece sweater keeps your pet warm on chilly walks. Machine washable, stretch-fit design with easy slip-on style.",
    price: 21.5,
    imageUrl:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
    category: "clothes",
    petType: "dog",
    brand: "PawStyle",
    rating: 4.4,
    reviewCount: 58,
    inStock: true,
    tags: ["sweater", "fleece", "winter"],
  },
  {
    id: "p7",
    name: "Interactive Feather Wand Cat Toy",
    description:
      "Stimulate your cat's natural hunting instincts with this colorful feather wand. Telescoping handle for extended reach and endless play.",
    price: 9.99,
    imageUrl:
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=400&fit=crop",
    category: "toys",
    petType: "cat",
    brand: "BarkBox",
    rating: 4.3,
    reviewCount: 145,
    inStock: true,
    tags: ["feather", "wand", "interactive"],
  },
  {
    id: "p8",
    name: "Stainless Steel Pet Bowl Set",
    description:
      "Double-bowl set with non-slip rubber base. Food-grade stainless steel — dishwasher safe and rust-resistant. Perfect for food and water.",
    price: 18.99,
    imageUrl:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "all",
    brand: "EarthBorn",
    rating: 4.5,
    reviewCount: 98,
    inStock: true,
    tags: ["bowl", "stainless", "dishwasher-safe"],
  },
  {
    id: "p9",
    name: "Bird Cage Playtop Deluxe",
    description:
      "Spacious wrought-iron birdcage with built-in play top, multiple perches, and stainless steel food cups. Assembly included.",
    price: 129.99,
    originalPrice: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "bird",
    brand: "WingHouse",
    rating: 4.6,
    reviewCount: 41,
    inStock: true,
    tags: ["cage", "bird", "playtop"],
  },
  {
    id: "p10",
    name: "Natural Hemp Dog Collar",
    description:
      "Eco-friendly hemp collar with brushed nickel buckle and D-ring. Gentle on sensitive skin, available in 5 earthy colors.",
    price: 16.5,
    imageUrl:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop",
    category: "belts",
    petType: "dog",
    brand: "EarthBorn",
    rating: 4.7,
    reviewCount: 73,
    inStock: true,
    tags: ["hemp", "eco-friendly", "collar"],
  },
  {
    id: "p11",
    name: "Small Pet Habitat Starter Kit",
    description:
      "Complete habitat kit for hamsters, gerbils, and mice. Includes wheel, water bottle, hide house, and bedding — everything your small pet needs.",
    price: 44.99,
    imageUrl:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "small-pet",
    brand: "MiniPaws",
    rating: 4.4,
    reviewCount: 29,
    inStock: true,
    tags: ["habitat", "hamster", "starter"],
  },
  {
    id: "p12",
    name: "Dog Rain Jacket – Caramel",
    description:
      "Waterproof yet breathable rain jacket with reflective strips for evening walks. Easy velcro closure, machine washable.",
    price: 34.99,
    originalPrice: 42.0,
    imageUrl:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
    category: "clothes",
    petType: "dog",
    brand: "PawStyle",
    rating: 4.2,
    reviewCount: 37,
    inStock: true,
    tags: ["jacket", "waterproof", "rain"],
  },
  {
    id: "p13",
    name: "Organic Cat Treats – Tuna Bites",
    description:
      "100% natural freeze-dried tuna cat treats with no preservatives or additives. Perfect as a reward or meal topper for finicky cats.",
    price: 8.49,
    imageUrl:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop",
    category: "food",
    petType: "cat",
    brand: "Purrina",
    rating: 4.8,
    reviewCount: 176,
    inStock: true,
    tags: ["treats", "tuna", "organic"],
  },
  {
    id: "p14",
    name: "Dog Puzzle Feeder – Slow Bowl",
    description:
      "Stimulating puzzle feeder that slows eating, reduces bloat, and entertains your dog. BPA-free, dishwasher safe, works with kibble or wet food.",
    price: 15.99,
    imageUrl:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
    category: "toys",
    petType: "dog",
    brand: "MindPaw",
    rating: 4.6,
    reviewCount: 88,
    inStock: true,
    tags: ["puzzle", "feeder", "slow-eating"],
  },
  {
    id: "p15",
    name: "Premium Cat Collar – Breakaway",
    description:
      "Safety breakaway buckle collar with engraved ID tag slot. Soft nylon with comfortable fit. Reflective stitching for low-light visibility.",
    price: 11.99,
    imageUrl:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
    category: "belts",
    petType: "cat",
    brand: "CozyPaws",
    rating: 4.5,
    reviewCount: 54,
    inStock: true,
    tags: ["collar", "breakaway", "reflective"],
  },
  {
    id: "p16",
    name: "Hamster Exercise Wheel – Silent Spinner",
    description:
      "Whisper-quiet ball-bearing wheel for hamsters and small rodents. Solid running surface prevents foot injuries. Easy to clean.",
    price: 14.5,
    imageUrl:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=400&fit=crop",
    category: "toys",
    petType: "small-pet",
    brand: "MiniPaws",
    rating: 4.7,
    reviewCount: 62,
    inStock: true,
    tags: ["wheel", "hamster", "silent"],
  },
  {
    id: "p17",
    name: "Bird Seed Mix – Premium Blend",
    description:
      "Nutritious blend of sunflower seeds, millet, safflower, and dried fruit. Formulated for parakeets, cockatiels, and finches.",
    price: 12.99,
    imageUrl:
      "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=400&h=400&fit=crop",
    category: "food",
    petType: "bird",
    brand: "WingHouse",
    rating: 4.4,
    reviewCount: 33,
    inStock: true,
    tags: ["seed", "blend", "parakeet"],
  },
  {
    id: "p18",
    name: "Dog Grooming Glove – Deshedding",
    description:
      "Five-finger design removes loose fur during petting. Works on short and long coats. Machine washable silicone bristles.",
    price: 17.0,
    imageUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    category: "grooming",
    petType: "dog",
    brand: "Acme Pet",
    rating: 4.3,
    reviewCount: 115,
    inStock: true,
    tags: ["grooming", "deshedding", "glove"],
  },
  {
    id: "p19",
    name: "Cat Window Perch – Suction Mount",
    description:
      "Strong suction cup window seat holds up to 25 lbs. Plush washable cover lets your cat watch the world outside in comfort.",
    price: 27.99,
    originalPrice: 33.0,
    imageUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "cat",
    brand: "CozyPaws",
    rating: 4.5,
    reviewCount: 79,
    inStock: true,
    tags: ["window", "perch", "suction"],
  },
  {
    id: "p20",
    name: "Reflective Dog Harness – No-Pull",
    description:
      "Front-clip no-pull harness with padded chest plate. Reflective stitching and three adjustment points for a custom, secure fit.",
    price: 29.95,
    imageUrl:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "dog",
    brand: "EarthBorn",
    rating: 4.8,
    reviewCount: 192,
    inStock: true,
    tags: ["harness", "no-pull", "reflective"],
  },
  {
    id: "p21",
    name: "Cat Self-Grooming Corner Brush",
    description:
      "Attach to any wall corner. Flexible bristles give cats the brushing and scratching satisfaction they crave. Infused with catnip.",
    price: 7.99,
    imageUrl:
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=400&fit=crop",
    category: "grooming",
    petType: "cat",
    brand: "Purrina",
    rating: 4.2,
    reviewCount: 47,
    inStock: true,
    tags: ["grooming", "brush", "catnip"],
  },
  {
    id: "p22",
    name: "Puppy Starter Harness & Leash Set",
    description:
      "Soft mesh harness and matching leash set designed for puppies 4–15 lbs. Adjustable with quick-release buckle. Comes in 6 color options.",
    price: 19.99,
    originalPrice: 24.99,
    imageUrl:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=400&fit=crop",
    category: "belts",
    petType: "dog",
    brand: "PawStyle",
    rating: 4.6,
    reviewCount: 101,
    inStock: true,
    tags: ["puppy", "harness", "set"],
  },
];

export function useProducts(filter?: ProductFilter) {
  return useQuery<Product[]>({
    queryKey: ["products", filter],
    queryFn: async () => {
      // Simulate async fetch
      await new Promise((r) => setTimeout(r, 150));
      let results = [...SAMPLE_PRODUCTS];

      if (filter?.searchQuery) {
        const q = filter.searchQuery.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.tags.some((t) => t.includes(q)),
        );
      }
      if (filter?.category && filter.category !== "all") {
        results = results.filter((p) => p.category === filter.category);
      }
      if (filter?.petType && filter.petType !== "all") {
        results = results.filter(
          (p) => p.petType === filter.petType || p.petType === "all",
        );
      }
      if (filter?.priceMin !== undefined) {
        results = results.filter((p) => p.price >= (filter.priceMin ?? 0));
      }
      if (filter?.priceMax !== undefined) {
        results = results.filter((p) => p.price <= (filter.priceMax ?? 999));
      }
      if (filter?.brand) {
        results = results.filter((p) => p.brand === filter.brand);
      }
      if (filter?.minRating) {
        results = results.filter((p) => p.rating >= (filter.minRating ?? 0));
      }

      return results;
    },
    staleTime: 60_000,
  });
}

export function useProduct(id: string) {
  return useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 100));
      return SAMPLE_PRODUCTS.find((p) => p.id === id);
    },
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useAllBrands() {
  return [...new Set(SAMPLE_PRODUCTS.map((p) => p.brand))].sort();
}

export { SAMPLE_PRODUCTS };
