import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  LogOut,
  Menu,
  PawPrint,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useStore } from "../store";

export function Header() {
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isLoggedIn, login, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:bg-primary/90 transition-colors">
              <PawPrint className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight hidden sm:block">
              PawMart
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl mx-auto hidden sm:flex"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search all pet products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input rounded-full h-10 text-sm"
                data-ocid="search-input"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto sm:ml-0">
            {/* Cart */}
            <Link to="/cart" aria-label={`Cart (${cartCount} items)`}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-muted transition-colors"
                data-ocid="cart-icon"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-[10px] rounded-full border-2 border-card">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-muted transition-colors"
                data-ocid="wishlist-icon"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-[10px] rounded-full border-2 border-card">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Account */}
            {isLoggedIn ? (
              <div className="flex items-center gap-1">
                <Link to="/account">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted transition-colors"
                    aria-label="Account"
                    data-ocid="account-icon"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="hover:bg-muted transition-colors"
                  aria-label="Logout"
                  data-ocid="logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={login}
                size="sm"
                className="ml-1 font-semibold rounded-full px-4 hidden sm:flex"
                data-ocid="login-btn"
              >
                Sign In
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileMenuOpen && (
          <div className="sm:hidden pb-3 pt-1">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search pet products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-input rounded-full h-9 text-sm w-full"
                />
              </div>
            </form>
            {!isLoggedIn && (
              <Button
                onClick={login}
                size="sm"
                className="w-full mt-2 font-semibold rounded-full"
                data-ocid="login-btn-mobile"
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
