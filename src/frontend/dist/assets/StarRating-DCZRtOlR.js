import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-B0MCdo7A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5"
};
const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
function StarRating({
  rating,
  maxStars = 5,
  size = "sm",
  showValue = false,
  reviewCount,
  interactive = false,
  onRate
}) {
  const starSize = sizeMap[size];
  const textSize = textSizeMap[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: maxStars }, (_, i) => i).map((i) => {
      const filled = i + 1 <= Math.floor(rating);
      const half = !filled && i < rating;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          disabled: !interactive,
          onClick: () => onRate == null ? void 0 : onRate(i + 1),
          className: interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default",
          "aria-label": interactive ? `Rate ${i + 1} stars` : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: `${starSize} ${filled || half ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground/40"}`
            }
          )
        },
        `star-${i + 1}`
      );
    }) }),
    showValue && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold text-foreground ${textSize}`, children: rating.toFixed(1) }),
    reviewCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-muted-foreground ${textSize}`, children: [
      "(",
      reviewCount,
      ")"
    ] })
  ] });
}
export {
  StarRating as S,
  Star as a
};
