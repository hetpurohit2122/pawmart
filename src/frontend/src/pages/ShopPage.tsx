import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";
import { useAllBrands, useProducts } from "../hooks/useProducts";
import { useStore } from "../store";
import type { PetType, ProductCategory } from "../types";

const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "food", label: "Food & Nutrition" },
  { value: "toys", label: "Toys" },
  { value: "clothes", label: "Clothes" },
  { value: "belts", label: "Collars & Leashes" },
  { value: "accessories", label: "Accessories" },
  { value: "grooming", label: "Grooming" },
];

const PET_TYPES: { value: PetType | "all"; label: string; count: string }[] = [
  { value: "all", label: "All Pets", count: "248" },
  { value: "dog", label: "Dog", count: "64" },
  { value: "cat", label: "Cat", count: "49" },
  { value: "bird", label: "Bird", count: "12" },
  { value: "small-pet", label: "Small Pet", count: "23" },
];

const SORT_OPTIONS: {
  value: "relevance" | "price-asc" | "price-desc";
  label: string;
}[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function SidebarSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border/60 pb-4 mb-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {open && children}
    </div>
  );
}

export default function ShopPage() {
  const {
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPetType,
    setSelectedPetType,
    priceRange,
    setPriceRange,
    selectedBrand,
    setSelectedBrand,
    minRating,
    setMinRating,
    sortOrder,
    setSortOrder,
  } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const allBrands = useAllBrands();

  const { data: rawProducts, isLoading } = useProducts({
    searchQuery,
    category: selectedCategory === "all" ? undefined : selectedCategory,
    petType: selectedPetType === "all" ? undefined : selectedPetType,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    brand: selectedBrand || undefined,
    minRating: minRating || undefined,
  });

  const products = useMemo(() => {
    if (!rawProducts) return [];
    if (sortOrder === "price-asc")
      return [...rawProducts].sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc")
      return [...rawProducts].sort((a, b) => b.price - a.price);
    return rawProducts;
  }, [rawProducts, sortOrder]);

  const activeFilterCount = [
    selectedCategory !== "all",
    selectedPetType !== "all",
    priceRange[0] > 0 || priceRange[1] < 150,
    !!selectedBrand,
    minRating > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedPetType("all");
    setPriceRange([0, 150]);
    setSelectedBrand("");
    setMinRating(0);
    setSortOrder("relevance");
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-foreground">
          Refine Search
        </h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <SidebarSection title="Pet Type">
        <div className="space-y-1.5">
          {PET_TYPES.map(({ value, label, count }) => (
            <button
              type="button"
              key={value}
              onClick={() => setSelectedPetType(value)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedPetType === value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
              data-ocid={`pet-filter-${value}`}
            >
              <span>{label}</span>
              <span className="text-xs text-muted-foreground">({count})</span>
            </button>
          ))}
        </div>
      </SidebarSection>

      <SidebarSection title="Categories">
        <div className="space-y-1.5">
          {CATEGORIES.map(({ value, label }) => (
            <button
              type="button"
              key={value}
              onClick={() => setSelectedCategory(value)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedCategory === value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
              data-ocid={`category-filter-${value}`}
            >
              {label}
            </button>
          ))}
        </div>
      </SidebarSection>

      <SidebarSection title="Price Range">
        <div className="px-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={150}
            step={5}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-primary"
            aria-label="Maximum price"
            data-ocid="price-range-max"
          />
          <input
            type="range"
            min={0}
            max={150}
            step={5}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full accent-primary mt-1"
            aria-label="Minimum price"
            data-ocid="price-range-min"
          />
        </div>
      </SidebarSection>

      <SidebarSection title="Brand">
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setSelectedBrand("")}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
              !selectedBrand
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted"
            }`}
          >
            All Brands
          </button>
          {allBrands.map((brand) => (
            <button
              type="button"
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedBrand === brand
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
              data-ocid={`brand-filter-${brand}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </SidebarSection>

      <SidebarSection title="Customer Rating">
        <div className="space-y-1.5">
          {[4, 3, 2, 0].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setMinRating(r)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                minRating === r
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
              data-ocid={`rating-filter-${r}`}
            >
              {r > 0 ? (
                <>
                  <StarRating rating={r} size="sm" />
                  <span>& up</span>
                </>
              ) : (
                <span>All Ratings</span>
              )}
            </button>
          ))}
        </div>
      </SidebarSection>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-xl text-foreground">
            {searchQuery ? `Results for "${searchQuery}"` : "All Pet Products"}
          </h1>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {isLoading ? "Loading..." : `${products.length} products`}
          </span>
          {/* Sort dropdown */}
          <Select
            value={sortOrder}
            onValueChange={(v) =>
              setSortOrder(v as "relevance" | "price-asc" | "price-desc")
            }
          >
            <SelectTrigger className="w-44 text-sm h-9" data-ocid="sort-select">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden gap-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-ocid="filter-toggle"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-primary text-primary-foreground">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-card rounded-xl border border-border p-4 sticky top-32">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              role="button"
              tabIndex={0}
              aria-label="Close filters"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
            />
            <div className="relative w-72 bg-card h-full overflow-y-auto p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold">Filters</h2>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => `loader-${i}`).map((key) => (
                <div key={key} className="flex flex-col gap-3">
                  <Skeleton className="aspect-square w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-8 w-full rounded" />
                </div>
              ))}
            </div>
          ) : !products.length ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="empty-state"
            >
              <div className="text-6xl mb-4">🐾</div>
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                No products found
              </h2>
              <p className="text-muted-foreground text-sm mb-5 max-w-xs">
                Try adjusting your filters or search query to find what your pet
                needs.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                data-ocid="clear-filters-cta"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
