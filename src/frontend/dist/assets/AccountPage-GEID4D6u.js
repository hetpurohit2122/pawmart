import { c as createLucideIcon, k as useAuth, r as reactExports, j as jsxRuntimeExports, d as useCart, e as useWishlist, l as useNavigate, H as Heart, f as Button, m as LogOut, U as User, I as Input, h as Skeleton, B as Badge } from "./index-B0MCdo7A.js";
import { m as motion, L as Label, a as Lock } from "./proxy-DFJVkvX7.js";
import { P as Package, S as Separator } from "./separator-BLzyZrXi.js";
import { S as ShoppingBag } from "./shopping-bag-DuAN96js.js";
import { C as Check } from "./check-DYCG5MFO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
const STORAGE_KEY = "petnest_user_profile";
function loadProfile(principalId) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${principalId}`);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { displayName: "" };
}
function saveProfile(principalId, data) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${principalId}`, JSON.stringify(data));
  } catch {
  }
}
function useUserProfile() {
  const { principal, isLoggedIn } = useAuth();
  const principalId = (principal == null ? void 0 : principal.toString()) ?? "";
  const [displayName, setDisplayName] = reactExports.useState("");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [savedAt, setSavedAt] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isLoggedIn && principalId) {
      const stored = loadProfile(principalId);
      setDisplayName(stored.displayName);
    } else {
      setDisplayName("");
    }
  }, [isLoggedIn, principalId]);
  const save = async (newName) => {
    if (!principalId) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    saveProfile(principalId, { displayName: newName });
    setDisplayName(newName);
    setIsSaving(false);
    setSavedAt(Date.now());
  };
  return { displayName, setDisplayName, save, isSaving, savedAt };
}
function getInitials(name, fallback) {
  const trimmed = name.trim();
  if (!trimmed) return fallback.slice(0, 2).toUpperCase();
  const words = trimmed.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
function truncatePrincipal(id) {
  if (id.length <= 16) return id;
  return `${id.slice(0, 8)}...${id.slice(-8)}`;
}
function GuestView({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "max-w-md mx-auto px-4 sm:px-6 py-20 text-center",
      "data-ocid": "account-guest",
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 ring-4 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-3", children: "Welcome to PawMart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 leading-relaxed max-w-xs mx-auto", children: "Sign in to manage your orders, wishlist, and personalize your shopping experience for your furry friends." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onLogin,
            size: "lg",
            className: "gap-2 font-semibold px-10 rounded-full w-full",
            "data-ocid": "sign-in-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
              "Sign In with Internet Identity"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4", children: "Secure, passwordless login — no email required." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-3 gap-4 text-center", children: [
          { icon: "🛒", label: "Track Orders" },
          { icon: "❤️", label: "Save Wishlist" },
          { icon: "🐾", label: "Pet Profiles" }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border border-border p-4 flex flex-col items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: item.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: item.label })
            ]
          },
          item.label
        )) })
      ]
    }
  );
}
function AvatarBadge({ initials }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto ring-4 ring-primary/25 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary-foreground text-2xl select-none", children: initials }) });
}
function SettingsRow({
  icon,
  label,
  description,
  badge,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors text-left group",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: description })
        ] }),
        badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: badge }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/60 group-hover:text-foreground transition-colors shrink-0" })
      ]
    }
  );
}
function AccountView() {
  const { logout, principal } = useAuth();
  const { totalItems: cartCount, subtotal } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { displayName, save, isSaving, savedAt } = useUserProfile();
  const navigate = useNavigate();
  const principalStr = (principal == null ? void 0 : principal.toString()) ?? "";
  const initials = getInitials(displayName, principalStr || "U");
  const [nameInput, setNameInput] = reactExports.useState(displayName);
  const [showSavedFeedback, setShowSavedFeedback] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setNameInput(displayName);
  }, [displayName]);
  reactExports.useEffect(() => {
    if (savedAt) {
      setShowSavedFeedback(true);
      const t = setTimeout(() => setShowSavedFeedback(false), 2500);
      return () => clearTimeout(t);
    }
  }, [savedAt]);
  const handleSave = async (e) => {
    e.preventDefault();
    await save(nameInput);
  };
  const stats = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
      label: "Cart Items",
      value: cartCount
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-primary" }),
      label: "Wishlist",
      value: wishlistCount
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 text-primary" }),
      label: "Cart Value",
      value: `$${subtotal.toFixed(2)}`
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 py-8",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "My Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "bg-card rounded-2xl border border-border p-6 text-center shadow-subtle",
                "data-ocid": "profile-card",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.05 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarBadge, { initials }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mt-3 text-lg", children: displayName || "Pet Lover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-muted-foreground mt-1 font-mono break-all px-2",
                      title: principalStr,
                      "data-ocid": "principal-id",
                      children: truncatePrincipal(principalStr)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: logout,
                      variant: "outline",
                      size: "sm",
                      className: "mt-5 w-full gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors",
                      "data-ocid": "logout-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                        "Sign Out"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "bg-card rounded-2xl border border-border p-4 shadow-subtle",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Quick Stats" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between py-2 border-b border-border/50 last:border-0",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                          stat.icon,
                          stat.label
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: stat.value })
                      ]
                    },
                    stat.label
                  )) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "bg-card rounded-2xl border border-border p-6 shadow-subtle",
                "data-ocid": "profile-form-card",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.08 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
                    "Profile Information"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "display-name", className: "text-sm font-medium", children: "Display Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "display-name",
                          type: "text",
                          placeholder: "e.g. Emma Johnson",
                          value: nameInput,
                          onChange: (e) => setNameInput(e.target.value),
                          className: "h-10",
                          "data-ocid": "profile-name-input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This is how we'll address you throughout the app." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-muted-foreground", children: "Principal ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-10 px-3 flex items-center bg-muted/50 rounded-md border border-border text-sm text-muted-foreground font-mono overflow-hidden",
                          "data-ocid": "principal-display",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: truncatePrincipal(principalStr) })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your unique Internet Identity identifier. Read-only." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        disabled: isSaving,
                        className: "gap-2 font-semibold px-6 min-w-[140px]",
                        "data-ocid": "save-profile-btn",
                        children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) : showSavedFeedback ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                          "Saved!"
                        ] }) : "Save Changes"
                      }
                    ) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "bg-card rounded-2xl border border-border p-6 shadow-subtle",
                "data-ocid": "order-history-card",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.12 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
                    "Order History"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex flex-col items-center justify-center py-10 text-center",
                      "data-ocid": "order-history-empty",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-muted-foreground" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No orders yet" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Start shopping — your order history will appear here." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "outline",
                            size: "sm",
                            className: "mt-4",
                            onClick: () => navigate({ to: "/" }),
                            "data-ocid": "start-shopping-btn",
                            children: "Start Shopping"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "bg-card rounded-2xl border border-border p-6 shadow-subtle",
                "data-ocid": "account-settings-card",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.16 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-primary" }),
                    "Account Settings"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SettingsRow,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
                        label: "Notifications",
                        description: "Manage your email and push preferences",
                        badge: "Soon",
                        ocid: "settings-notifications"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SettingsRow,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-primary" }),
                        label: "Pet Preferences",
                        description: "Customize recommendations for your pets",
                        badge: "Soon",
                        ocid: "settings-preferences"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SettingsRow,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-primary" }),
                        label: "Privacy & Security",
                        description: "Control your data and account security",
                        badge: "Soon",
                        ocid: "settings-privacy"
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function AccountPage() {
  const { isLoggedIn, login } = useAuth();
  return isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccountView, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(GuestView, { onLogin: login });
}
export {
  AccountPage as default
};
