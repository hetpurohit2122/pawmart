import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Check,
  ChevronRight,
  Heart,
  Lock,
  LogIn,
  LogOut,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useUserProfile } from "../hooks/useUserProfile";
import { useWishlist } from "../hooks/useWishlist";

function getInitials(name: string, fallback: string): string {
  const trimmed = name.trim();
  if (!trimmed) return fallback.slice(0, 2).toUpperCase();
  const words = trimmed.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function truncatePrincipal(id: string): string {
  if (id.length <= 16) return id;
  return `${id.slice(0, 8)}...${id.slice(-8)}`;
}

/* ── Guest view ─────────────────────────────────────────────── */
function GuestView({ onLogin }: { onLogin: () => void }) {
  return (
    <motion.div
      className="max-w-md mx-auto px-4 sm:px-6 py-20 text-center"
      data-ocid="account-guest"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 ring-4 ring-primary/20">
        <User className="w-12 h-12 text-primary" />
      </div>
      <h1 className="font-display font-bold text-3xl text-foreground mb-3">
        Welcome to PawMart
      </h1>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-xs mx-auto">
        Sign in to manage your orders, wishlist, and personalize your shopping
        experience for your furry friends.
      </p>

      <Button
        onClick={onLogin}
        size="lg"
        className="gap-2 font-semibold px-10 rounded-full w-full"
        data-ocid="sign-in-btn"
      >
        <LogIn className="w-5 h-5" />
        Sign In with Internet Identity
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        Secure, passwordless login — no email required.
      </p>

      <div className="mt-10 grid grid-cols-3 gap-4 text-center">
        {[
          { icon: "🛒", label: "Track Orders" },
          { icon: "❤️", label: "Save Wishlist" },
          { icon: "🐾", label: "Pet Profiles" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-card rounded-xl border border-border p-4 flex flex-col items-center gap-2"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs text-muted-foreground font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Avatar badge ─────────────────────────────────────────────── */
function AvatarBadge({ initials }: { initials: string }) {
  return (
    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto ring-4 ring-primary/25 shadow-md">
      <span className="font-display font-bold text-primary-foreground text-2xl select-none">
        {initials}
      </span>
    </div>
  );
}

/* ── Settings item row ─────────────────────────────────────────── */
function SettingsRow({
  icon,
  label,
  description,
  badge,
  ocid,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  badge?: string;
  ocid?: string;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors text-left group"
      data-ocid={ocid}
    >
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      {badge && (
        <Badge variant="secondary" className="text-xs shrink-0">
          {badge}
        </Badge>
      )}
      <ChevronRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-foreground transition-colors shrink-0" />
    </button>
  );
}

/* ── Logged-in view ───────────────────────────────────────────── */
function AccountView() {
  const { logout, principal } = useAuth();
  const { totalItems: cartCount, subtotal } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { displayName, save, isSaving, savedAt } = useUserProfile();
  const navigate = useNavigate();

  const principalStr = principal?.toString() ?? "";
  const initials = getInitials(displayName, principalStr || "U");

  const [nameInput, setNameInput] = useState(displayName);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  // Sync local input when displayName loads from storage
  useEffect(() => {
    setNameInput(displayName);
  }, [displayName]);

  // Show saved feedback
  useEffect(() => {
    if (savedAt) {
      setShowSavedFeedback(true);
      const t = setTimeout(() => setShowSavedFeedback(false), 2500);
      return () => clearTimeout(t);
    }
  }, [savedAt]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(nameInput);
  };

  const stats = [
    {
      icon: <Package className="w-4 h-4 text-primary" />,
      label: "Cart Items",
      value: cartCount,
    },
    {
      icon: <Heart className="w-4 h-4 text-primary" />,
      label: "Wishlist",
      value: wishlistCount,
    },
    {
      icon: <ShoppingBag className="w-4 h-4 text-primary" />,
      label: "Cart Value",
      value: `$${subtotal.toFixed(2)}`,
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        My Account
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Left sidebar ─── */}
        <div className="space-y-4">
          {/* Profile card */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-6 text-center shadow-subtle"
            data-ocid="profile-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <AvatarBadge initials={initials} />
            <h2 className="font-display font-semibold text-foreground mt-3 text-lg">
              {displayName || "Pet Lover"}
            </h2>
            <p
              className="text-xs text-muted-foreground mt-1 font-mono break-all px-2"
              title={principalStr}
              data-ocid="principal-id"
            >
              {truncatePrincipal(principalStr)}
            </p>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="mt-5 w-full gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
              data-ocid="logout-btn"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-4 shadow-subtle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">
              Quick Stats
            </h3>
            <div className="space-y-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {stat.icon}
                    {stat.label}
                  </div>
                  <span className="font-semibold text-foreground text-sm">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Right content ─── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Edit profile form */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-6 shadow-subtle"
            data-ocid="profile-form-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Profile Information
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="display-name" className="text-sm font-medium">
                  Display Name
                </Label>
                <Input
                  id="display-name"
                  type="text"
                  placeholder="e.g. Emma Johnson"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="h-10"
                  data-ocid="profile-name-input"
                />
                <p className="text-xs text-muted-foreground">
                  This is how we'll address you throughout the app.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-muted-foreground">
                  Principal ID
                </Label>
                <div
                  className="h-10 px-3 flex items-center bg-muted/50 rounded-md border border-border text-sm text-muted-foreground font-mono overflow-hidden"
                  data-ocid="principal-display"
                >
                  <span className="truncate">
                    {truncatePrincipal(principalStr)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your unique Internet Identity identifier. Read-only.
                </p>
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="gap-2 font-semibold px-6 min-w-[140px]"
                  data-ocid="save-profile-btn"
                >
                  {isSaving ? (
                    <Skeleton className="h-4 w-20" />
                  ) : showSavedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved!
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Order history */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-6 shadow-subtle"
            data-ocid="order-history-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Order History
            </h2>
            <Separator className="mb-5" />
            <div
              className="flex flex-col items-center justify-center py-10 text-center"
              data-ocid="order-history-empty"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-1">No orders yet</p>
              <p className="text-sm text-muted-foreground">
                Start shopping — your order history will appear here.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => navigate({ to: "/" })}
                data-ocid="start-shopping-btn"
              >
                Start Shopping
              </Button>
            </div>
          </motion.div>

          {/* Account settings */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-6 shadow-subtle"
            data-ocid="account-settings-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Account Settings
            </h2>
            <div className="space-y-1">
              <SettingsRow
                icon={<Bell className="w-4 h-4 text-primary" />}
                label="Notifications"
                description="Manage your email and push preferences"
                badge="Soon"
                ocid="settings-notifications"
              />
              <SettingsRow
                icon={<Heart className="w-4 h-4 text-primary" />}
                label="Pet Preferences"
                description="Customize recommendations for your pets"
                badge="Soon"
                ocid="settings-preferences"
              />
              <SettingsRow
                icon={<Lock className="w-4 h-4 text-primary" />}
                label="Privacy & Security"
                description="Control your data and account security"
                badge="Soon"
                ocid="settings-privacy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page export ──────────────────────────────────────────────── */
export default function AccountPage() {
  const { isLoggedIn, login } = useAuth();
  return isLoggedIn ? <AccountView /> : <GuestView onLogin={login} />;
}
