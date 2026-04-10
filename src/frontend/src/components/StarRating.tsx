import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StarRating({
  rating,
  maxStars = 5,
  size = "sm",
  showValue = false,
  reviewCount,
  interactive = false,
  onRate,
}: StarRatingProps) {
  const starSize = sizeMap[size];
  const textSize = textSizeMap[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => i).map((i) => {
          const filled = i + 1 <= Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <button
              key={`star-${i + 1}`}
              type="button"
              disabled={!interactive}
              onClick={() => onRate?.(i + 1)}
              className={
                interactive
                  ? "cursor-pointer hover:scale-110 transition-transform"
                  : "cursor-default"
              }
              aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
            >
              <Star
                className={`${starSize} ${
                  filled || half
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted-foreground/40"
                }`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className={`font-semibold text-foreground ${textSize}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={`text-muted-foreground ${textSize}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
