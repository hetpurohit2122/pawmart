# Design Brief

**Purpose:** Premium pet products ecommerce platform for business owners. Builds trust and confidence through clean, warm professional aesthetic.

**Tone & Aesthetic:** Warm professional — approachable trust without corporate coldness. Earthy modern with personality.

**Differentiation:** Warm beige/cream backgrounds, teal accent system, strong card-based hierarchy with visible depth, and intentional whitespace create premium pet retail environment.

## Color Palette

| Token              | Light OKLCH      | Dark OKLCH       | Purpose                             |
| :----------------- | :--------------- | :--------------- | :---------------------------------- |
| background         | 0.98 0.02 40     | 0.15 0.02 40     | Primary page background             |
| foreground         | 0.25 0.04 40     | 0.94 0.01 40     | Body text                           |
| card               | 0.99 0.01 40     | 0.19 0.02 40     | Product cards, inputs               |
| primary (teal)     | 0.58 0.12 195    | 0.72 0.11 195    | CTAs, filters, active states        |
| accent (brown)     | 0.55 0.14 25     | 0.65 0.14 25     | Highlights, secondary actions       |
| destructive (red)  | 0.55 0.22 25     | 0.65 0.19 22     | Warnings, remove/delete actions     |
| border             | 0.92 0.02 40     | 0.28 0.02 40     | Dividers, card edges                |
| muted              | 0.92 0.03 40     | 0.28 0.03 40     | Section backgrounds, secondary UI   |

## Typography

| Tier      | Font           | Size | Weight | Usage                           |
| :-------- | :------------- | :--- | :----- | :------------------------------ |
| Display   | General Sans   | 32   | 700    | Page headers, hero titles       |
| Heading   | General Sans   | 24   | 700    | Section headings, card titles   |
| Body      | DM Sans        | 16   | 400    | Product descriptions, UI text   |
| Small     | DM Sans        | 14   | 400    | Labels, metadata, helpers       |
| Mono      | Geist Mono     | 13   | 400    | Prices (if needed), codes       |

## Structural Zones

| Zone       | Background        | Border         | Shadow        | Spacing |
| :--------- | :---------------- | :------------- | :------------ | :------ |
| Header     | card (0.99 0...)  | border 0.92... | card shadow   | p-4     |
| Hero       | muted 0.92...     | none           | none          | py-8    |
| Content    | background 0.98.. | none           | none          | p-6     |
| Product    | card + box-shadow | border subtle  | card shadow   | p-4     |
| Footer     | muted 0.92...     | border-t       | none          | py-6    |

## Component Patterns

- **Buttons:** Primary (teal) for major CTAs (Add to Cart), secondary (muted) for filters, accent (brown) for wishlist/reviews
- **Cards:** 8px radius, visible border (border token), `shadow-card` for depth, hover:shadow-hover transition-smooth
- **Inputs:** 8px radius, border token, focus:ring primary, light bg-input
- **Navigation Tabs:** Border-bottom underline on active, text-foreground weight change, no background fill

## Motion & Interaction

- **Transition default:** all 0.3s cubic-bezier(0.4, 0, 0.2, 1) for interactive elements
- **Shadows:** card/hover layers create perceived depth for product interactions
- **Entrance:** Subtle fade-in for product grids, staggered if possible

## Constraints & Anti-Patterns

- No rainbow palettes — stick to warm neutral + teal + brown
- No generic blue buttons — use primary teal or accent brown intentionally
- Product images always visible; cards never collapse text
- Every section has intentional background or border treatment — never ghost text on matching background
- No bright whites or pure blacks — maintain warmth through OKLCH saturation and hue

## Signature Detail

Warm beige card backgrounds (not white) paired with teal accents create memorable premium pet retail aesthetic — distinctly warm and trustworthy, never corporate cold or chaotic pet-themed.
