import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, ShoppingCart, Store, User } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Shop", to: "/", icon: Store },
  { label: "Cart", to: "/cart", icon: ShoppingCart },
  { label: "Wishlist", to: "/wishlist", icon: Heart },
  { label: "Account", to: "/account", icon: User },
];

export function Layout({ children }: LayoutProps) {
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const getBadge = (to: string) => {
    if (to === "/cart" && cartCount > 0) return cartCount;
    if (to === "/wishlist" && wishlistCount > 0) return wishlistCount;
    return null;
  };

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Navigation Tabs */}
      <nav
        className="bg-card border-b border-border/60 sticky top-16 z-40"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map(({ label, to, icon: Icon }) => {
              const badge = getBadge(to);
              const active = isActive(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                  data-ocid={`nav-${label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {badge !== null && (
                    <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {badge > 99 ? "99+" : badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">
                  🐾
                </span>
              </div>
              <span className="font-display font-semibold text-sm text-foreground">
                PawMart
              </span>
              <span className="text-muted-foreground text-xs">
                — Premium pet products for your beloved companions
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
